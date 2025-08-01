import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Lock, Phone, MapPin, School, GraduationCap, 
  Users, ChevronRight, ChevronLeft, 
  Check, AlertCircle, BookOpen, UserCheck
} from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';
import { 
  WILAYAS, SAMPLE_SCHOOLS, PRIMARY_GRADES, SAMPLE_CLASSES, PRIMARY_SUBJECTS,
  getClassesBySchool,
  generateStudentId, generateRandomAlgerianName
} from '../data/algerianEducationSystem';
import { getSchoolsByWilaya, getSchoolById } from '../data/schoolsData';
import { AccountManager, UserAccount } from '../utils/accountManager';

interface RegistrationData {
  // بيانات أساسية
  role: 'student' | 'teacher' | 'parent' | 'admin' | 'supervisor';
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  
  // بيانات الموقع
  wilaya: string;
  school: string;
  
  // بيانات خاصة بكل دور
  studentData?: {
    grade: string;
    class: string;
    birthDate: string;
    parentName: string;
    parentPhone: string;
    address: string;
  };
  
  teacherData?: {
    specialization: string;
    subjects: string[];
    experience: number;
    qualification: string;
  };
  
  parentData?: {
    children: Array<{
      name: string;
      grade: string;
      class: string;
    }>;
    profession: string;
    address: string;
  };
  
  adminData?: {
    position: 'مدير' | 'مدير مساعد' | 'ناظر';
  };
  
  supervisorData?: {
    zone: string;
    specialization: string;
    supervisedSubjects: string[];
  };
}

const AdvancedRegistration: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const navigate = useNavigate();
  const { showError } = useNotification();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationData>({
    role: 'student',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    wilaya: '',
    school: ''
  });
  
  const [availableSchools, setAvailableSchools] = useState(SAMPLE_SCHOOLS);
  const [availableClasses, setAvailableClasses] = useState(SAMPLE_CLASSES);
  const [selectedSchoolInfo, setSelectedSchoolInfo] = useState<any>(null);
  const [gradeClasses, setGradeClasses] = useState<any[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = 4;

  useEffect(() => {
    if (formData.wilaya) {
      // البحث عن كود الولاية من الاسم
      const selectedWilaya = WILAYAS.find(w => w.name === formData.wilaya);
      if (selectedWilaya) {
        const schools = getSchoolsByWilaya(selectedWilaya.code);
        
        // أسماء مديرين جزائريين
        const directorNames = [
          'فاطمة بن علي', 'محمد بوعلام', 'عائشة قدور', 'أحمد زروقي', 'خديجة مرابط',
          'عبد الرحمن بلحاج', 'نادية آيت علي', 'يوسف بن يوسف', 'سعاد شريط', 'عمر بوقرة',
          'كريمة حمدي', 'العربي مداني', 'نور بوزيد', 'صالح خليفة', 'هدى عبدلي'
        ];

        // تحويل البيانات لتتطابق مع نوع School المتوقع
        const formattedSchools = schools.map((school, index) => ({
          id: school.id,
          name: school.name,
          type: 'ابتدائية' as const,
          wilaya: school.wilayaName,
          commune: school.address.split('،')[0] || 'وسط المدينة',
          address: school.address,
          director: directorNames[index % directorNames.length],
          phone: school.phone || `021-${(20 + index).toString().padStart(2, '0')}-${(40 + index * 2).toString().padStart(2, '0')}-${(60 + index * 3).toString().padStart(2, '0')}`,
          capacity: school.totalStudents + 50,
          established: 1962 + Math.floor(index * 3) // تواريخ متنوعة
        }));
        
        setAvailableSchools(formattedSchools);
        setFormData(prev => ({ ...prev, school: '' }));
        
        // طباعة تشخيصية
        console.log(`🏫 تم العثور على ${schools.length} مدرسة في ${selectedWilaya.name}:`, 
          schools.map(s => s.name)
        );
      }
    }
  }, [formData.wilaya]);

  // تحديث معلومات المدرسة المختارة
  useEffect(() => {
    if (formData.school) {
      const school = availableSchools.find(s => s.name === formData.school);
      if (school) {
        setSelectedSchoolInfo(school);
        
        // إعادة تعيين السنة والقسم عند تغيير المدرسة
        setFormData(prev => ({
          ...prev,
          studentData: prev.studentData ? {
            ...prev.studentData,
            grade: '',
            class: ''
          } : prev.studentData
        }));
        setGradeClasses([]);
      }
    } else {
      setSelectedSchoolInfo(null);
      setGradeClasses([]);
    }
  }, [formData.school, availableSchools]);

  // تحديث الأقسام عند اختيار السنة الدراسية
  useEffect(() => {
    if (formData.studentData?.grade && selectedSchoolInfo) {
      try {
        // محاولة جلب البيانات الفعلية من النظام المحدث
        const selectedWilaya = WILAYAS.find(w => w.name === formData.wilaya);
        if (selectedWilaya) {
          const schools = getSchoolsByWilaya(selectedWilaya.code);
          const fullSchoolData = schools.find(s => s.name === selectedSchoolInfo.name);
          
          if (fullSchoolData && fullSchoolData.grades) {
            const gradeData = fullSchoolData.grades.find(g => g.arabicName === formData.studentData?.grade);
            if (gradeData && gradeData.classes && gradeData.classes.length > 0) {
              setGradeClasses(gradeData.classes);
              
              console.log(`📚 تم جلب ${gradeData.classes.length} أقسام للسنة ${formData.studentData?.grade} في ${selectedSchoolInfo.name}`);
            } else {
              // إذا لم توجد أقسام، أنشئ أقسام مضمونة
              createDefaultClasses();
            }
          } else {
            // إذا لم توجد بيانات كاملة، أنشئ أقسام مضمونة  
            createDefaultClasses();
          }
        } else {
          createDefaultClasses();
        }
      } catch (error) {
        console.warn('فشل في جلب بيانات الأقسام، إنشاء أقسام افتراضية');
        createDefaultClasses();
      }
      
      // إعادة تعيين القسم عند تغيير السنة
      setFormData(prev => ({
        ...prev,
        studentData: prev.studentData ? {
          ...prev.studentData,
          class: ''
        } : prev.studentData
      }));
    } else {
      setGradeClasses([]);
    }

    // دالة إنشاء أقسام افتراضية
    function createDefaultClasses() {
      const schoolIdNumber = selectedSchoolInfo?.id ? 
        parseInt(selectedSchoolInfo.id.split('_')[1] || '1') : Math.random() * 100;
      
      const gradeClassesData = [
        {
          id: `${selectedSchoolInfo?.id || 'default'}_class_1`,
          arabicName: 'القسم الأول',
          studentCount: 20 + Math.floor(schoolIdNumber % 11) // 20-30 طالب
        },
        {
          id: `${selectedSchoolInfo?.id || 'default'}_class_2`, 
          arabicName: 'القسم الثاني',
          studentCount: 18 + Math.floor((schoolIdNumber * 2) % 13) // 18-30 طالب
        }
      ];
      
      // إضافة قسم ثالث في بعض المدارس
      if (schoolIdNumber % 3 === 0) {
        gradeClassesData.push({
          id: `${selectedSchoolInfo?.id || 'default'}_class_3`,
          arabicName: 'القسم الثالث', 
          studentCount: 15 + Math.floor((schoolIdNumber * 3) % 11) // 15-25 طالب
        });
      }
      
      setGradeClasses(gradeClassesData);
      console.log(`✨ تم إنشاء ${gradeClassesData.length} أقسام افتراضية للسنة ${formData.studentData?.grade}`);
    }
  }, [formData.studentData?.grade, selectedSchoolInfo, formData.wilaya]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [field]: value
      };

      // Initialize nested data structures when role changes
      if (field === 'role') {
        switch (value) {
          case 'student':
            if (!newData.studentData) {
              newData.studentData = {
                grade: '',
                class: '',
                birthDate: '',
                parentName: '',
                parentPhone: '',
                address: ''
              };
            }
            break;
          case 'teacher':
            if (!newData.teacherData) {
              newData.teacherData = {
                specialization: '',
                subjects: [],
                experience: 0,
                qualification: ''
              };
            }
            break;
          case 'parent':
            if (!newData.parentData) {
              newData.parentData = {
                children: [],
                profession: '',
                address: ''
              };
            }
            break;
          case 'admin':
            if (!newData.adminData) {
              newData.adminData = {
                position: 'مدير'
              };
            }
            break;
          case 'supervisor':
            if (!newData.supervisorData) {
              newData.supervisorData = {
                zone: '',
                specialization: '',
                supervisedSubjects: []
              };
            }
            break;
        }
      }

      return newData;
    });
    setErrors([]);
  };

  const handleNestedInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof RegistrationData] as any),
        [field]: value
      }
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: string[] = [];

    switch (step) {
      case 1:
        if (!formData.role) newErrors.push('يرجى اختيار نوع المستخدم');
        if (!formData.name.trim()) newErrors.push('يرجى إدخال الاسم الكامل');
        if (formData.name.trim().length < 3) newErrors.push('الاسم يجب أن يحتوي على 3 أحرف على الأقل');
        break;
        
      case 2:
        if (!formData.email.trim()) newErrors.push('يرجى إدخال البريد الإلكتروني');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.push('البريد الإلكتروني غير صحيح');
        if (!formData.password) newErrors.push('يرجى إدخال كلمة المرور');
        if (formData.password.length < 6) newErrors.push('كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل');
        if (formData.password !== formData.confirmPassword) newErrors.push('كلمات المرور غير متطابقة');
        if (!formData.phone.trim()) newErrors.push('يرجى إدخال رقم الهاتف');
        if (!/^(05|06|07)\d{8}$/.test(formData.phone.replace(/\s/g, ''))) newErrors.push('رقم الهاتف غير صحيح (يجب أن يبدأ بـ 05، 06، أو 07)');
        break;
        
      case 3:
        if (!formData.wilaya) newErrors.push('يرجى اختيار الولاية');
        if (!formData.school) newErrors.push('يرجى اختيار المدرسة');
        break;
        
      case 4:
        // التحقق من البيانات الخاصة بكل دور
        if (formData.role === 'student') {
          if (!formData.studentData?.grade) newErrors.push('يرجى اختيار السنة الدراسية');
          if (!formData.studentData?.class) newErrors.push('يرجى اختيار القسم');
          if (!formData.studentData?.birthDate) newErrors.push('يرجى إدخال تاريخ الميلاد');
          if (!formData.studentData?.parentName?.trim()) newErrors.push('يرجى إدخال اسم ولي الأمر');
          if (!formData.studentData?.parentPhone?.trim()) newErrors.push('يرجى إدخال رقم هاتف ولي الأمر');
          if (!formData.studentData?.address?.trim()) newErrors.push('يرجى إدخال العنوان');
        } else if (formData.role === 'teacher') {
          if (!formData.teacherData?.specialization?.trim()) newErrors.push('يرجى إدخال التخصص');
          if (!formData.teacherData?.subjects?.length) newErrors.push('يرجى اختيار المواد المدرسة');
          if (!formData.teacherData?.qualification?.trim()) newErrors.push('يرجى إدخال المؤهل العلمي');
        } else if (formData.role === 'parent') {
          if (!formData.parentData?.children?.length) newErrors.push('يرجى إضافة بيانات الأطفال');
          if (!formData.parentData?.address?.trim()) newErrors.push('يرجى إدخال العنوان');
        }
        break;
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const generateSampleData = () => {
    const randomName = generateRandomAlgerianName();
    const randomWilaya = WILAYAS[Math.floor(Math.random() * WILAYAS.length)];
    const schoolsInWilaya = getSchoolsByWilaya(randomWilaya.name);
    const randomSchool = schoolsInWilaya[Math.floor(Math.random() * schoolsInWilaya.length)];
    
    setFormData(prev => ({
      ...prev,
      name: randomName.fullName,
      email: `${randomName.firstName.toLowerCase()}.${randomName.lastName.toLowerCase().replace(' ', '')}@example.com`,
      phone: `05${Math.floor(Math.random() * 90000000 + 10000000)}`,
      wilaya: randomWilaya.name,
      school: randomSchool?.id || ''
    }));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsLoading(true);
    
    try {
      const selectedSchool = SAMPLE_SCHOOLS.find(s => s.id === formData.school);
      const selectedWilaya = WILAYAS.find(w => w.name === formData.wilaya);
      
      const newAccount: UserAccount = {
        id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
        role: formData.role,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        dashboard: getDashboardRoute(formData.role),
        icon: getRoleIcon(formData.role),
        color: getRoleColor(formData.role),
        description: getRoleDescription(formData.role),
        wilaya: formData.wilaya,
        school: formData.school,
        schoolName: selectedSchool?.name || '',
        createdAt: new Date().toISOString(),
        isActive: true
      };

      // إضافة البيانات الخاصة بكل دور
      if (formData.role === 'student' && formData.studentData) {
        const selectedGrade = PRIMARY_GRADES.find(g => g.id === formData.studentData?.grade);
        const selectedClass = SAMPLE_CLASSES.find(c => c.id === formData.studentData?.class);
        
        newAccount.studentData = {
          studentId: generateStudentId(selectedWilaya?.code || '01', formData.school, new Date().getFullYear()),
          grade: formData.studentData.grade,
          gradeName: selectedGrade?.name || '',
          class: formData.studentData.class,
          className: selectedClass?.name || '',
          birthDate: formData.studentData.birthDate,
          parentName: formData.studentData.parentName,
          parentPhone: formData.studentData.parentPhone,
          address: formData.studentData.address,
          subjects: selectedGrade?.subjects || []
        };
      } else if (formData.role === 'teacher' && formData.teacherData) {
        newAccount.teacherData = {
          teacherId: `T${selectedWilaya?.code || '01'}${formData.school.slice(-3)}${Date.now().toString().slice(-4)}`,
          specialization: formData.teacherData.specialization,
          subjects: formData.teacherData.subjects,
          classes: [],
          experience: formData.teacherData.experience || 0,
          qualification: formData.teacherData.qualification,
          hireDate: new Date().toISOString()
        };
      } else if (formData.role === 'parent' && formData.parentData) {
        newAccount.parentData = {
          children: (formData.parentData.children || []).map(child => {
            const selectedGrade = PRIMARY_GRADES.find(g => g.id === child.grade);
            return {
              name: child.name,
              studentId: generateStudentId(selectedWilaya?.code || '01', formData.school, new Date().getFullYear()),
              grade: child.grade,
              gradeName: selectedGrade?.name || '',
              class: child.class,
              school: formData.school,
              schoolName: selectedSchool?.name || ''
            };
          }),
          profession: formData.parentData.profession || '',
          address: formData.parentData.address || ''
        };
      } else if (formData.role === 'admin' && formData.adminData) {
        newAccount.adminData = {
          adminId: `A${selectedWilaya?.code || '01'}${formData.school.slice(-3)}${Date.now().toString().slice(-4)}`,
          position: formData.adminData.position,
          managedGrades: PRIMARY_GRADES.map(g => g.id),
          totalStudents: Math.floor(Math.random() * 400 + 200),
          totalTeachers: Math.floor(Math.random() * 25 + 15),
          appointmentDate: new Date().toISOString()
        };
      } else if (formData.role === 'supervisor' && formData.supervisorData) {
        newAccount.supervisorData = {
          supervisorId: `S${selectedWilaya?.code || '01'}${Date.now().toString().slice(-4)}`,
          zone: formData.supervisorData.zone,
          specialization: formData.supervisorData.specialization,
          supervisedSchools: [formData.school],
          supervisedSubjects: formData.supervisorData.supervisedSubjects,
          appointmentDate: new Date().toISOString()
        };
      }

      const success = AccountManager.saveAccount(newAccount);
      
      if (!success) {
        setErrors(['يوجد حساب مسجل بهذا البريد الإلكتروني بالفعل']);
        setIsLoading(false);
        return;
      }

      // تسجيل الدخول التلقائي
      AccountManager.setCurrentUser(newAccount);
      
      // توجيه المستخدم إلى صفحة الترحيب
      navigate('/welcome', { 
        state: { 
          userType: formData.role, 
          userName: formData.name 
        } 
      });
      
    } catch (error) {
      console.error('خطأ في إنشاء الحساب:', error);
      showError('خطأ في إنشاء الحساب', 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
      setErrors(['حدث خطأ في إنشاء الحساب. يرجى المحاولة مرة أخرى.']);
    } finally {
      setIsLoading(false);
    }
  };

  const getDashboardRoute = (role: string) => {
    switch (role) {
      case 'student': return '/student-dashboard';
      case 'teacher': return '/teacher-dashboard';
      case 'parent': return '/parent-dashboard';
      case 'admin': return '/school-admin-dashboard';
      case 'supervisor': return '/supervisor-dashboard';
      default: return '/student-dashboard';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student': return GraduationCap;
      case 'teacher': return Users;
      case 'parent': return User;
      case 'admin': return UserCheck;
      case 'supervisor': return BookOpen;
      default: return User;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'blue';
      case 'teacher': return 'green';
      case 'parent': return 'purple';
      case 'admin': return 'orange';
      case 'supervisor': return 'red';
      default: return 'gray';
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'student': return 'تلميذ في الطور الابتدائي';
      case 'teacher': return 'معلم في الطور الابتدائي';
      case 'parent': return 'ولي أمر تلميذ ابتدائي';
      case 'admin': return 'مدير مدرسة ابتدائية';
      case 'supervisor': return 'مفتش تربوي';
      default: return 'مستخدم جديد';
    }
  };

  const getSelectedRoleClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'border-blue-500 bg-blue-50 shadow-md';
      case 'green': return 'border-green-500 bg-green-50 shadow-md';
      case 'purple': return 'border-purple-500 bg-purple-50 shadow-md';
      case 'orange': return 'border-orange-500 bg-orange-50 shadow-md';
      case 'red': return 'border-red-500 bg-red-50 shadow-md';
      default: return 'border-gray-500 bg-gray-50 shadow-md';
    }
  };

  const getRoleIconColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-600';
      case 'green': return 'text-green-600';
      case 'purple': return 'text-purple-600';
      case 'orange': return 'text-orange-600';
      case 'red': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRoleLabelColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-800';
      case 'green': return 'text-green-800';
      case 'purple': return 'text-purple-800';
      case 'orange': return 'text-orange-800';
      case 'red': return 'text-red-800';
      default: return 'text-gray-800';
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return null;
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">اختر نوع المستخدم</h3>
        <p className="text-gray-600">حدد دورك في النظام التعليمي</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { value: 'student', label: 'تلميذ ابتدائي', icon: GraduationCap, color: 'blue', desc: 'للتلاميذ من السنة الأولى إلى الخامسة ابتدائي' },
          { value: 'teacher', label: 'معلم ابتدائي', icon: Users, color: 'green', desc: 'للمعلمين في المدارس الابتدائية' },
          { value: 'parent', label: 'ولي أمر', icon: User, color: 'purple', desc: 'لأولياء أمور التلاميذ' },
          { value: 'admin', label: 'مدير مدرسة', icon: UserCheck, color: 'orange', desc: 'لمديري المدارس الابتدائية' },
          { value: 'supervisor', label: 'مفتش تربوي', icon: BookOpen, color: 'red', desc: 'للمفتشين التربويين' }
        ].map((role) => (
          <button
            key={role.value}
            type="button"
            onClick={() => handleInputChange('role', role.value)}
            className={`p-4 rounded-xl border-2 transition-all text-right ${
              formData.role === role.value
                ? getSelectedRoleClasses(role.color)
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <div className="flex items-start space-x-3 rtl:space-x-reverse">
              <role.icon className={`h-8 w-8 ${
                formData.role === role.value ? getRoleIconColor(role.color) : 'text-gray-400'
              }`} />
              <div className="flex-1">
                <div className={`font-semibold ${
                  formData.role === role.value ? getRoleLabelColor(role.color) : 'text-gray-700'
                }`}>
                  {role.label}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {role.desc}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">الاسم الكامل *</label>
        <div className="relative">
          <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="أدخل اسمك الكامل"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={generateSampleData}
        className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
      >
        🎲 إنشاء بيانات تجريبية
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">بيانات الاتصال والأمان</h3>
        <p className="text-gray-600">أدخل بيانات تسجيل الدخول</p>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">البريد الإلكتروني *</label>
        <div className="relative">
          <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="example@email.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">كلمة المرور *</label>
        <div className="relative">
          <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="أدخل كلمة المرور"
          />
        </div>
        <div className="text-xs text-gray-500 mt-1">
          يجب أن تحتوي على 6 أحرف على الأقل
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">تأكيد كلمة المرور *</label>
        <div className="relative">
          <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="أعد إدخال كلمة المرور"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">رقم الهاتف *</label>
        <div className="relative">
          <Phone className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="05xxxxxxxx"
          />
        </div>
        <div className="text-xs text-gray-500 mt-1">
          يجب أن يبدأ بـ 05، 06، أو 07
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">الموقع والمدرسة</h3>
        <p className="text-gray-600">حدد الولاية والمدرسة</p>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">الولاية *</label>
        <div className="relative">
          <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          <select
            value={formData.wilaya}
            onChange={(e) => handleInputChange('wilaya', e.target.value)}
            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">اختر الولاية</option>
            {WILAYAS.map((wilaya) => (
              <option key={wilaya.id} value={wilaya.name}>
                {wilaya.code} - {wilaya.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">المدرسة *</label>
        <div className="relative">
          <School className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          <select
            value={formData.school}
            onChange={(e) => handleInputChange('school', e.target.value)}
            disabled={!formData.wilaya}
            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          >
            <option value="">اختر المدرسة</option>
            {availableSchools.map((school) => (
              <option key={school.id} value={school.name}>
                {school.name}
              </option>
            ))}
          </select>
        </div>
        {formData.wilaya && availableSchools.length === 0 && (
          <div className="text-sm text-amber-600 mt-1">
            لا توجد مدارس متاحة في هذه الولاية حالياً
          </div>
        )}
      </div>

      {selectedSchoolInfo && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">معلومات المدرسة</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p><strong>المدير:</strong> أ. {selectedSchoolInfo.director}</p>
            <p><strong>العنوان:</strong> {selectedSchoolInfo.address}</p>
            <p><strong>الهاتف:</strong> {selectedSchoolInfo.phone || '021-23-45-67'}</p>
            <p><strong>السعة:</strong> {selectedSchoolInfo.capacity} تلميذ</p>
            <p><strong>تأسست:</strong> {selectedSchoolInfo.established}</p>
          </div>
        </div>
      )}
    </div>
  );

  const renderStep4 = () => {
    switch (formData.role) {
      case 'student':
        return renderStudentForm();
      case 'teacher':
        return renderTeacherForm();
      case 'parent':
        return renderParentForm();
      case 'admin':
        return renderAdminForm();
      case 'supervisor':
        return renderSupervisorForm();
      default:
        return null;
    }
  };

  const renderStudentForm = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">بيانات التلميذ</h3>
        <p className="text-gray-600">أكمل بيانات التسجيل</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">السنة الدراسية *</label>
          <select
            value={formData.studentData?.grade || ''}
            onChange={(e) => handleNestedInputChange('studentData', 'grade', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">اختر السنة الدراسية</option>
            {PRIMARY_GRADES.map((grade) => (
              <option key={grade.id} value={grade.id}>
                {grade.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">القسم *</label>
          <select
            value={formData.studentData?.class || ''}
            onChange={(e) => handleNestedInputChange('studentData', 'class', e.target.value)}
            disabled={!formData.studentData?.grade || gradeClasses.length === 0}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="">اختر القسم</option>
            {gradeClasses.map((cls) => (
              <option key={cls.id} value={cls.arabicName}>
                {cls.arabicName} ({cls.studentCount}/30)
              </option>
            ))}
          </select>
          {formData.studentData?.grade && gradeClasses.length === 0 && (
            <div className="text-sm text-amber-600 mt-1">
              لا توجد أقسام متاحة لهذه السنة الدراسية
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">تاريخ الميلاد *</label>
        <input
          type="date"
          value={formData.studentData?.birthDate || ''}
          onChange={(e) => handleNestedInputChange('studentData', 'birthDate', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">اسم ولي الأمر *</label>
          <input
            type="text"
            value={formData.studentData?.parentName || ''}
            onChange={(e) => handleNestedInputChange('studentData', 'parentName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="اسم الأب أو الأم"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">هاتف ولي الأمر *</label>
          <input
            type="tel"
            value={formData.studentData?.parentPhone || ''}
            onChange={(e) => handleNestedInputChange('studentData', 'parentPhone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="05xxxxxxxx"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">العنوان *</label>
        <textarea
          value={formData.studentData?.address || ''}
          onChange={(e) => handleNestedInputChange('studentData', 'address', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="العنوان الكامل"
        />
      </div>
    </div>
  );

  const renderTeacherForm = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">بيانات المعلم</h3>
        <p className="text-gray-600">أكمل بيانات التسجيل المهنية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">التخصص *</label>
          <input
            type="text"
            value={formData.teacherData?.specialization || ''}
            onChange={(e) => handleNestedInputChange('teacherData', 'specialization', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="مثل: تعليم ابتدائي، رياضيات، لغة عربية"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">المؤهل العلمي *</label>
          <select
            value={formData.teacherData?.qualification || ''}
            onChange={(e) => handleNestedInputChange('teacherData', 'qualification', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">اختر المؤهل</option>
            <option value="ليسانس">ليسانس</option>
            <option value="ماستر">ماستر</option>
            <option value="دكتوراه">دكتوراه</option>
            <option value="معهد تكوين المعلمين">معهد تكوين المعلمين</option>
            <option value="المدرسة العليا للأساتذة">المدرسة العليا للأساتذة</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">سنوات الخبرة</label>
        <input
          type="number"
          min="0"
          max="40"
          value={formData.teacherData?.experience || 0}
          onChange={(e) => handleNestedInputChange('teacherData', 'experience', parseInt(e.target.value) || 0)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="عدد سنوات الخبرة"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">المواد المدرسة *</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {PRIMARY_SUBJECTS.map((subject) => (
            <label key={subject.id} className="flex items-center space-x-2 rtl:space-x-reverse">
              <input
                type="checkbox"
                checked={formData.teacherData?.subjects?.includes(subject.arabicName) || false}
                onChange={(e) => {
                  const currentSubjects = formData.teacherData?.subjects || [];
                  const newSubjects = e.target.checked
                    ? [...currentSubjects, subject.arabicName]
                    : currentSubjects.filter(s => s !== subject.arabicName);
                  handleNestedInputChange('teacherData', 'subjects', newSubjects);
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{subject.arabicName}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderParentForm = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">بيانات ولي الأمر</h3>
        <p className="text-gray-600">أدخل بيانات الأطفال</p>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">المهنة</label>
        <input
          type="text"
          value={formData.parentData?.profession || ''}
          onChange={(e) => handleNestedInputChange('parentData', 'profession', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="مهنتك"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">العنوان *</label>
        <textarea
          value={formData.parentData?.address || ''}
          onChange={(e) => handleNestedInputChange('parentData', 'address', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="العنوان الكامل"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-gray-700 font-medium">الأطفال *</label>
          <button
            type="button"
            onClick={() => {
              const currentChildren = formData.parentData?.children || [];
              const newChildren = [...currentChildren, { name: '', grade: '', class: '' }];
              handleNestedInputChange('parentData', 'children', newChildren);
            }}
            className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
          >
            إضافة طفل
          </button>
        </div>

        {(formData.parentData?.children || []).map((child, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-700">الطفل {index + 1}</h4>
              <button
                type="button"
                onClick={() => {
                  const currentChildren = formData.parentData?.children || [];
                  const newChildren = currentChildren.filter((_, i) => i !== index);
                  handleNestedInputChange('parentData', 'children', newChildren);
                }}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                حذف
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                value={child.name}
                onChange={(e) => {
                  const currentChildren = formData.parentData?.children || [];
                  const newChildren = [...currentChildren];
                  newChildren[index] = { ...newChildren[index], name: e.target.value };
                  handleNestedInputChange('parentData', 'children', newChildren);
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="اسم الطفل"
              />

              <select
                value={child.grade}
                onChange={(e) => {
                  const currentChildren = formData.parentData?.children || [];
                  const newChildren = [...currentChildren];
                  newChildren[index] = { ...newChildren[index], grade: e.target.value, class: '' };
                  handleNestedInputChange('parentData', 'children', newChildren);
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">اختر السنة</option>
                {PRIMARY_GRADES.map((grade) => (
                  <option key={grade.id} value={grade.id}>
                    {grade.name}
                  </option>
                ))}
              </select>

              <select
                value={child.class}
                onChange={(e) => {
                  const currentChildren = formData.parentData?.children || [];
                  const newChildren = [...currentChildren];
                  newChildren[index] = { ...newChildren[index], class: e.target.value };
                  handleNestedInputChange('parentData', 'children', newChildren);
                }}
                disabled={!child.grade}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              >
                <option value="">اختر القسم</option>
                {availableClasses
                  .filter(cls => cls.grade === child.grade && cls.school === formData.school)
                  .map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        ))}

        {(!formData.parentData?.children || formData.parentData.children.length === 0) && (
          <div className="text-center py-8 text-gray-500">
            لم تتم إضافة أي طفل بعد
          </div>
        )}
      </div>
    </div>
  );

  const renderAdminForm = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">بيانات المدير</h3>
        <p className="text-gray-600">أكمل بيانات المنصب الإداري</p>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">المنصب *</label>
        <select
          value={formData.adminData?.position || ''}
          onChange={(e) => handleNestedInputChange('adminData', 'position', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">اختر المنصب</option>
          <option value="مدير">مدير</option>
          <option value="مدير مساعد">مدير مساعد</option>
          <option value="ناظر">ناظر</option>
        </select>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-semibold text-green-800 mb-2">صلاحيات المدير</h4>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• إدارة جميع التلاميذ والمعلمين</li>
          <li>• مراقبة الأداء الأكاديمي</li>
          <li>• إنشاء التقارير الإدارية</li>
          <li>• إدارة الجداول والأقسام</li>
          <li>• التواصل مع أولياء الأمور</li>
        </ul>
      </div>
    </div>
  );

  const renderSupervisorForm = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">بيانات المفتش التربوي</h3>
        <p className="text-gray-600">أكمل بيانات التفتيش</p>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">المنطقة التفتيشية *</label>
        <input
          type="text"
          value={formData.supervisorData?.zone || ''}
          onChange={(e) => handleNestedInputChange('supervisorData', 'zone', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="مثل: منطقة الجزائر الشرق"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">التخصص *</label>
        <select
          value={formData.supervisorData?.specialization || ''}
          onChange={(e) => handleNestedInputChange('supervisorData', 'specialization', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">اختر التخصص</option>
          <option value="التعليم الابتدائي">التعليم الابتدائي</option>
          <option value="اللغة العربية">اللغة العربية</option>
          <option value="الرياضيات">الرياضيات</option>
          <option value="العلوم">العلوم</option>
          <option value="التربية الإسلامية">التربية الإسلامية</option>
          <option value="التربية البدنية">التربية البدنية</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">المواد المشرف عليها *</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {PRIMARY_SUBJECTS.map((subject) => (
            <label key={subject.id} className="flex items-center space-x-2 rtl:space-x-reverse">
              <input
                type="checkbox"
                checked={formData.supervisorData?.supervisedSubjects?.includes(subject.arabicName) || false}
                onChange={(e) => {
                  const currentSubjects = formData.supervisorData?.supervisedSubjects || [];
                  const newSubjects = e.target.checked
                    ? [...currentSubjects, subject.arabicName]
                    : currentSubjects.filter(s => s !== subject.arabicName);
                  handleNestedInputChange('supervisorData', 'supervisedSubjects', newSubjects);
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{subject.arabicName}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h4 className="font-semibold text-red-800 mb-2">صلاحيات المفتش</h4>
        <ul className="text-sm text-red-700 space-y-1">
          <li>• تفتيش المدارس في المنطقة</li>
          <li>• تقييم أداء المعلمين</li>
          <li>• مراقبة تطبيق المناهج</li>
          <li>• إعداد التقارير التفتيشية</li>
          <li>• تقديم التوجيهات التربوية</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-red-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">إنشاء حساب جديد</h2>
              <p className="text-green-100">منصة نبراس الجزائر - النظام التعليمي الرسمي</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              الخطوة {currentStep} من {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-600 to-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {errors.length > 0 && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 ml-2" />
                <div>
                  <h4 className="text-red-800 font-medium mb-1">يرجى تصحيح الأخطاء التالية:</h4>
                  <ul className="text-red-700 text-sm space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4 ml-1" />
            السابق
          </button>

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i + 1 <= currentStep ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {currentStep < totalSteps ? (
            <button
              onClick={nextStep}
              className="flex items-center px-6 py-2 bg-gradient-to-r from-green-600 to-red-600 text-white rounded-lg hover:from-green-700 hover:to-red-700 transition-colors"
            >
              التالي
              <ChevronRight className="h-4 w-4 mr-1" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex items-center px-6 py-2 bg-gradient-to-r from-green-600 to-red-600 text-white rounded-lg hover:from-green-700 hover:to-red-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2" />
                  جاري الإنشاء...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 ml-2" />
                  إنشاء الحساب
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedRegistration;