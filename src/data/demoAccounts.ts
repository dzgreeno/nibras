// الحسابات التجريبية المطورة للنظام التعليمي الجزائري
import { GraduationCap, Users, User, UserCheck, Shield, Zap } from 'lucide-react';
import { UserAccount } from '../utils/accountManager';
import { generateAllSchools, wilayas, algerianNames, algerianFamilyNames, primarySubjects } from './schoolsData';
import { getRandomNeighborhood, getRandomProfession } from './realSchoolNames';

// دالة لتوليد رقم هاتف جزائري عشوائي
const generatePhoneNumber = (): string => {
  const prefixes = ['055', '056', '057', '066', '077', '078', '079'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const number = Math.floor(Math.random() * 9000000) + 1000000;
  return `${prefix}${number}`;
};

// دالة لتوليد رقم طالب
const generateStudentId = (wilayaCode: string, schoolNumber: number, year: number): string => {
  const randomId = Math.floor(Math.random() * 999999) + 1;
  return `${wilayaCode}${schoolNumber.toString().padStart(3, '0')}${year}${randomId.toString().padStart(6, '0')}`;
};

// دالة لتوليد عنوان
const generateAddress = (wilayaName: string): string => {
  return `${getRandomNeighborhood()}، ${wilayaName}`;
};

// دالة لتوليد اسم كامل
const generateFullName = (gender: 'male' | 'female'): string => {
  const firstName = algerianNames[gender][Math.floor(Math.random() * algerianNames[gender].length)];
  const familyName = algerianFamilyNames[Math.floor(Math.random() * algerianFamilyNames.length)];
  return `${firstName} ${familyName}`;
};

// توليد الحسابات التجريبية المطورة
export const generateDemoAccounts = (): UserAccount[] => {
  const allSchools = generateAllSchools();
  const demoAccounts: UserAccount[] = [];
  
  // اختيار 20 ولاية لإنشاء حسابات تجريبية أكثر شمولية
  const selectedWilayas = wilayas.slice(0, 20);
  
  selectedWilayas.forEach((wilaya, wilayaIndex) => {
    // اختيار أول مدرسة في الولاية
    const school = allSchools.find(s => s.wilayaCode === wilaya.code);
    if (!school) return;
    
    // حساب طالب
    const studentName = generateFullName('female');
    const studentGrade = school.grades[Math.floor(Math.random() * school.grades.length)];
    const studentClass = studentGrade.classes[0];
    const parentName = generateFullName('male');
    
    const studentAccount: UserAccount = {
      id: `demo_student_${wilaya.code}_001`,
      role: 'student',
      name: studentName,
      email: `student${wilaya.code}@demo.com`,
      password: '123456',
      dashboard: '/student-dashboard',
      icon: GraduationCap,
      color: 'blue',
      description: `تلميذة ${studentGrade.arabicName}`,
      wilaya: wilaya.name,
      school: school.id,
      schoolName: school.name,
      studentData: {
        studentId: generateStudentId(wilaya.code, 1, 2024),
        grade: studentGrade.id,
        gradeName: studentGrade.arabicName,
        class: studentClass.id,
        className: studentClass.arabicName,
        birthDate: `${2024 - (parseInt(studentGrade.id.split('_')[1]) + 5)}-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
        parentName: parentName,
        parentPhone: generatePhoneNumber(),
        address: generateAddress(wilaya.name),
        subjects: primarySubjects
      }
    };
    
    // حساب معلم
    const teacherName = `أ. ${generateFullName('female')}`;
    const teacherClasses = school.grades.slice(0, 2).map(g => g.classes[0].id);
    
    const teacherAccount: UserAccount = {
      id: `demo_teacher_${wilaya.code}_001`,
      role: 'teacher',
      name: teacherName,
      email: `teacher${wilaya.code}@demo.com`,
      password: '123456',
      dashboard: '/teacher-dashboard',
      icon: Users,
      color: 'green',
      description: 'معلمة الطور الابتدائي',
      wilaya: wilaya.name,
      school: school.id,
      schoolName: school.name,
      teacherData: {
        teacherId: `T${wilaya.code}${new Date().getFullYear()}`,
        specialization: 'تعليم ابتدائي',
        subjects: primarySubjects.slice(0, 3),
        classes: teacherClasses,
        experience: Math.floor(Math.random() * 15) + 3,
        qualification: 'ليسانس تعليم ابتدائي',
        hireDate: `${Math.floor(Math.random() * 10) + 2014}-09-01`
      }
    };
    
    // حساب ولي أمر
    const parentAccount: UserAccount = {
      id: `demo_parent_${wilaya.code}_001`,
      role: 'parent',
      name: `${parentName} والد ${studentName.split(' ')[0]}`,
      email: `parent${wilaya.code}@demo.com`,
      password: '123456',
      dashboard: '/parent-dashboard',
      icon: User,
      color: 'purple',
      description: 'ولي أمر تلميذة ابتدائي',
      wilaya: wilaya.name,
      school: school.id,
      schoolName: school.name,
      parentData: {
        children: [
          {
            name: studentName,
            studentId: studentAccount.studentData!.studentId,
            grade: studentGrade.id,
            gradeName: studentGrade.arabicName,
            class: studentClass.id,
            school: school.id,
            schoolName: school.name
          }
        ],
        profession: getRandomProfession(),
        address: generateAddress(wilaya.name)
      }
    };
    
    // حساب مدير مدرسة
    const adminName = `د. ${generateFullName('male')} مدير المدرسة`;
    const adminAccount: UserAccount = {
      id: `demo_admin_${wilaya.code}_001`,
      role: 'admin',
      name: adminName,
      email: `admin${wilaya.code}@demo.com`,
      password: '123456',
      dashboard: '/school-admin-dashboard',
      icon: UserCheck,
      color: 'orange',
      description: `مدير ${school.name}`,
      wilaya: wilaya.name,
      school: school.id,
      schoolName: school.name,
      adminData: {
        adminId: `A${wilaya.code}${new Date().getFullYear()}`,
        position: 'مدير',
        managedGrades: school.grades.map(g => g.id),
        totalStudents: school.totalStudents,
        totalTeachers: school.totalTeachers,
        appointmentDate: `${Math.floor(Math.random() * 5) + 2019}-09-01`
      }
    };
    
    // إضافة الحسابات
    demoAccounts.push(studentAccount, teacherAccount, parentAccount, adminAccount);
  });
  
  // حساب مفتش تربوي عام
  const supervisorAccount: UserAccount = {
    id: 'demo_supervisor_001',
    role: 'supervisor',
    name: 'د. خالد المفتش التربوي',
    email: 'supervisor@demo.com',
    password: '123456',
    dashboard: '/educational-supervisor-analytics',
    icon: Shield,
    color: 'red',
    description: 'مفتش تربوي عام',
    wilaya: 'الجزائر',
    school: 'multiple',
    schoolName: 'جميع مدارس الولايات',
    supervisorData: {
      supervisorId: 'S160012024',
      zone: 'الجزائر العاصمة ونواحيها',
      specialization: 'تفتيش تربوي عام',
      supervisedSchools: selectedWilayas.slice(0, 5).map(w => allSchools.find(s => s.wilayaCode === w.code)?.id || ''),
      supervisedSubjects: ['جميع المواد'],
      appointmentDate: '2018-09-01'
    }
  };
  
  // حساب الأدمين العام
  const superAdminAccount: UserAccount = {
    id: 'demo_superadmin_001',
    role: 'superadmin',
    name: 'م. يوسف الأدمين العام',
    email: 'superadmin@demo.com',
    password: '123456',
    dashboard: '/admin-content-management',
    icon: Zap,
    color: 'purple',
    description: 'أدمين عام لمنصة نبراس الجزائر',
    wilaya: 'الجزائر',
    school: 'all',
    schoolName: 'جميع المدارس',
    superAdminData: {
      adminId: 'SA2024001',
      permissions: ['all'],
      managedRegions: selectedWilayas.map(w => w.name),
      totalUsers: demoAccounts.length + 2,
      appointmentDate: '2024-01-01'
    }
  };
  
  demoAccounts.push(supervisorAccount, superAdminAccount);
  
  return demoAccounts;
};

// حسابات أساسية للعرض السريع (6 حسابات رئيسية)
export const basicDemoAccounts: UserAccount[] = [
  {
    id: 'demo_student_001',
    role: 'student',
    name: 'كريمة بنت عمر',
    email: 'student@demo.com',
    password: '123456',
    dashboard: '/student-dashboard',
    icon: GraduationCap,
    color: 'blue',
    description: 'تلميذة السنة الخامسة ابتدائي',
    wilaya: 'الجزائر',
    school: 'school_16_001',
    schoolName: 'مدرسة الشهيد محمد بوراس الابتدائية',
    studentData: {
      studentId: '16001202400001',
      grade: 'grade_5',
      gradeName: 'السنة الخامسة ابتدائي',
      class: 'class_16_001_5_1',
      className: 'القسم الأول',
      birthDate: '2013-05-15',
      parentName: 'عمر بن علي',
      parentPhone: '0555123456',
      address: 'حي بلكور، الجزائر العاصمة',
      subjects: primarySubjects
    }
  },
  {
    id: 'demo_teacher_001',
    role: 'teacher',
    name: 'أ. خديجة بن علي',
    email: 'teacher@demo.com',
    password: '123456',
    dashboard: '/teacher-dashboard',
    icon: Users,
    color: 'green',
    description: 'معلمة الطور الابتدائي',
    wilaya: 'الجزائر',
    school: 'school_16_001',
    schoolName: 'مدرسة الشهيد محمد بوراس الابتدائية',
    teacherData: {
      teacherId: 'T160012024',
      specialization: 'تعليم ابتدائي',
      subjects: ['اللغة العربية', 'الرياضيات', 'التربية الإسلامية'],
      classes: ['class_16_001_5_1', 'class_16_001_5_2'],
      experience: 8,
      qualification: 'ليسانس تعليم ابتدائي',
      hireDate: '2016-09-01'
    }
  },
  {
    id: 'demo_parent_001',
    role: 'parent',
    name: 'عمر والد كريمة',
    email: 'parent@demo.com',
    password: '123456',
    dashboard: '/parent-dashboard',
    icon: User,
    color: 'purple',
    description: 'ولي أمر تلميذة ابتدائي',
    wilaya: 'الجزائر',
    school: 'school_16_001',
    schoolName: 'مدرسة الشهيد محمد بوراس الابتدائية',
    parentData: {
      children: [
        {
          name: 'كريمة بنت عمر',
          studentId: '16001202400001',
          grade: 'grade_5',
          gradeName: 'السنة الخامسة ابتدائي',
          class: 'class_16_001_5_1',
          school: 'school_16_001',
          schoolName: 'مدرسة الشهيد محمد بوراس الابتدائية'
        }
      ],
      profession: 'موظف',
      address: 'حي بلكور، الجزائر العاصمة'
    }
  },
  {
    id: 'demo_admin_001',
    role: 'admin',
    name: 'د. أمينة مديرة المدرسة',
    email: 'admin@demo.com',
    password: '123456',
    dashboard: '/school-admin-dashboard',
    icon: UserCheck,
    color: 'orange',
    description: 'مديرة مدرسة الشهيد محمد بوراس الابتدائية',
    wilaya: 'الجزائر',
    school: 'school_16_001',
    schoolName: 'مدرسة الشهيد محمد بوراس الابتدائية',
    adminData: {
      adminId: 'A160012024',
      position: 'مدير',
      managedGrades: ['grade_1', 'grade_2', 'grade_3', 'grade_4', 'grade_5'],
      totalStudents: 450,
      totalTeachers: 22,
      appointmentDate: '2020-09-01'
    }
  },
  {
    id: 'demo_supervisor_001',
    role: 'supervisor',
    name: 'د. خالد المفتش التربوي',
    email: 'supervisor@demo.com',
    password: '123456',
    dashboard: '/educational-supervisor-analytics',
    icon: Shield,
    color: 'red',
    description: 'مفتش تربوي للولايات الشرقية',
    wilaya: 'الجزائر',
    school: 'multiple',
    schoolName: 'جميع مدارس المنطقة',
    supervisorData: {
      supervisorId: 'S160012024',
      zone: 'المنطقة الوسطى',
      specialization: 'تفتيش تربوي عام',
      supervisedSchools: ['school_16_001', 'school_16_002', 'school_16_003'],
      supervisedSubjects: ['جميع المواد'],
      appointmentDate: '2018-09-01'
    }
  },
  {
    id: 'demo_superadmin_001',
    role: 'superadmin',
    name: 'م. يوسف الأدمين العام',
    email: 'superadmin@demo.com',
    password: '123456',
    dashboard: '/admin-content-management',
    icon: Zap,
    color: 'purple',
    description: 'أدمين عام لمنصة نبراس الجزائر',
    wilaya: 'الجزائر',
    school: 'all',
    schoolName: 'جميع المدارس',
    superAdminData: {
      adminId: 'SA2024001',
      permissions: ['all'],
      managedRegions: ['الجزائر', 'وهران', 'قسنطينة', 'عنابة'],
      totalUsers: 50000,
      appointmentDate: '2024-01-01'
    }
  }
];