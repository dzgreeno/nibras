// بيانات مدرسية موسعة وحسابات تجريبية إضافية
import { UserAccount } from '../utils/accountManager';
import { GraduationCap, Users, User, UserCheck, Shield, Zap } from 'lucide-react';
import { generateAllSchools, wilayas, algerianNames, algerianFamilyNames, primarySubjects } from './schoolsData';
import { getRandomNeighborhood, getRandomProfession } from './realSchoolNames';

// دالة لتوليد حسابات تجريبية شاملة لجميع الولايات والمدارس
export const generateComprehensiveDemoAccounts = (): UserAccount[] => {
  const allSchools = generateAllSchools();
  const comprehensiveAccounts: UserAccount[] = [];
  
  // إحصائيات لتتبع الحسابات المنشأة
  let studentCount = 0;
  let teacherCount = 0;
  let parentCount = 0;
  let adminCount = 0;
  
  // إنشاء حسابات لكل ولاية
  wilayas.forEach((wilaya, wilayaIndex) => {
    const wilayaSchools = allSchools.filter(school => school.wilayaCode === wilaya.code);
    
    // إنشاء حسابات لكل مدرسة في الولاية
    wilayaSchools.forEach((school, schoolIndex) => {
      // حساب إداري لكل مدرسة
      adminCount++;
      const adminAccount: UserAccount = {
        id: `demo_admin_${wilaya.code}_${(schoolIndex + 1).toString().padStart(3, '0')}`,
        role: 'admin',
        name: `د. ${algerianNames.male[adminCount % algerianNames.male.length]} ${algerianFamilyNames[adminCount % algerianFamilyNames.length]} - مدير`,
        email: `admin${wilaya.code}${(schoolIndex + 1).toString().padStart(2, '0')}@demo.com`,
        password: '123456',
        dashboard: '/school-admin-dashboard',
        icon: UserCheck,
        color: 'orange',
        description: `مدير ${school.name}`,
        wilaya: wilaya.name,
        school: school.id,
        schoolName: school.name,
        adminData: {
          adminId: `A${wilaya.code}${new Date().getFullYear()}${(schoolIndex + 1).toString().padStart(2, '0')}`,
          position: 'مدير',
          managedGrades: school.grades.map(g => g.id),
          totalStudents: school.totalStudents,
          totalTeachers: school.totalTeachers,
          appointmentDate: `${Math.floor(Math.random() * 8) + 2016}-09-01`
        }
      };
      comprehensiveAccounts.push(adminAccount);
      
      // إنشاء معلمين (2-3 معلمين لكل مدرسة)
      const numTeachers = Math.floor(Math.random() * 2) + 2;
      for (let t = 0; t < numTeachers; t++) {
        teacherCount++;
        const teacherName = `أ. ${algerianNames.female[teacherCount % algerianNames.female.length]} ${algerianFamilyNames[teacherCount % algerianFamilyNames.length]}`;
        const assignedClasses = school.grades.slice(t, t + 2).flatMap(g => g.classes.map(c => c.id));
        
        const teacherAccount: UserAccount = {
          id: `demo_teacher_${wilaya.code}_${(schoolIndex + 1).toString().padStart(3, '0')}_${(t + 1).toString().padStart(2, '0')}`,
          role: 'teacher',
          name: teacherName,
          email: `teacher${wilaya.code}${(schoolIndex + 1).toString().padStart(2, '0')}t${(t + 1).toString().padStart(2, '0')}@demo.com`,
          password: '123456',
          dashboard: '/teacher-dashboard',
          icon: Users,
          color: 'green',
          description: `معلمة في ${school.name}`,
          wilaya: wilaya.name,
          school: school.id,
          schoolName: school.name,
          teacherData: {
            teacherId: `T${wilaya.code}${new Date().getFullYear()}${teacherCount.toString().padStart(3, '0')}`,
            specialization: 'تعليم ابتدائي',
            subjects: primarySubjects.slice(0, Math.floor(Math.random() * 4) + 3),
            classes: assignedClasses,
            experience: Math.floor(Math.random() * 20) + 2,
            qualification: ['ليسانس تعليم ابتدائي', 'ماستر تربية', 'ليسانس + شهادة تكوين'][Math.floor(Math.random() * 3)],
            hireDate: `${Math.floor(Math.random() * 12) + 2012}-09-01`
          }
        };
        comprehensiveAccounts.push(teacherAccount);
      }
      
      // إنشاء طلاب وأولياء أمور (2-4 طلاب لكل مدرسة)
      const numStudents = Math.floor(Math.random() * 3) + 2;
      for (let s = 0; s < numStudents; s++) {
        studentCount++;
        parentCount++;
        
        const studentGender = Math.random() > 0.5 ? 'female' : 'male';
        const studentName = `${algerianNames[studentGender][studentCount % algerianNames[studentGender].length]} ${algerianFamilyNames[studentCount % algerianFamilyNames.length]}`;
        const parentName = `${algerianNames.male[parentCount % algerianNames.male.length]} ${algerianFamilyNames[parentCount % algerianFamilyNames.length]}`;
        
        const randomGrade = school.grades[Math.floor(Math.random() * school.grades.length)];
        const randomClass = randomGrade.classes[Math.floor(Math.random() * randomGrade.classes.length)];
        
        // حساب الطالب
        const studentAccount: UserAccount = {
          id: `demo_student_${wilaya.code}_${(schoolIndex + 1).toString().padStart(3, '0')}_${(s + 1).toString().padStart(3, '0')}`,
          role: 'student',
          name: studentName,
          email: `student${wilaya.code}${(schoolIndex + 1).toString().padStart(2, '0')}s${(s + 1).toString().padStart(2, '0')}@demo.com`,
          password: '123456',
          dashboard: '/student-dashboard',
          icon: GraduationCap,
          color: 'blue',
          description: `${studentGender === 'male' ? 'تلميذ' : 'تلميذة'} ${randomGrade.arabicName}`,
          wilaya: wilaya.name,
          school: school.id,
          schoolName: school.name,
          studentData: {
            studentId: `${wilaya.code}${(schoolIndex + 1).toString().padStart(3, '0')}${new Date().getFullYear()}${studentCount.toString().padStart(6, '0')}`,
            grade: randomGrade.id,
            gradeName: randomGrade.arabicName,
            class: randomClass.id,
            className: randomClass.arabicName,
            birthDate: `${2024 - (parseInt(randomGrade.id.split('_')[1]) + 5)}-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`.padStart(10, '0'),
            parentName: parentName,
            parentPhone: `055${Math.floor(Math.random() * 9000000) + 1000000}`,
            address: `${getRandomNeighborhood()}، ${wilaya.name}`,
            subjects: primarySubjects
          }
        };
        comprehensiveAccounts.push(studentAccount);
        
        // حساب ولي الأمر
        const parentAccount: UserAccount = {
          id: `demo_parent_${wilaya.code}_${(schoolIndex + 1).toString().padStart(3, '0')}_${(s + 1).toString().padStart(3, '0')}`,
          role: 'parent',
          name: `${parentName} والد ${studentName.split(' ')[0]}`,
          email: `parent${wilaya.code}${(schoolIndex + 1).toString().padStart(2, '0')}p${(s + 1).toString().padStart(2, '0')}@demo.com`,
          password: '123456',
          dashboard: '/parent-dashboard',
          icon: User,
          color: 'purple',
          description: `ولي أمر في ${school.name}`,
          wilaya: wilaya.name,
          school: school.id,
          schoolName: school.name,
          parentData: {
            children: [
              {
                name: studentName,
                studentId: studentAccount.studentData!.studentId,
                grade: randomGrade.id,
                gradeName: randomGrade.arabicName,
                class: randomClass.id,
                school: school.id,
                schoolName: school.name
              }
            ],
            profession: getRandomProfession(),
            address: studentAccount.studentData!.address
          }
        };
        comprehensiveAccounts.push(parentAccount);
      }
    });
  });
  
  // إضافة مفتشين تربويين (مفتش لكل 5 ولايات)
  for (let i = 0; i < wilayas.length; i += 5) {
    const supervisedWilayas = wilayas.slice(i, i + 5);
    const supervisorAccount: UserAccount = {
      id: `demo_supervisor_region_${Math.floor(i / 5) + 1}`,
      role: 'supervisor',
      name: `د. ${algerianNames.male[i % algerianNames.male.length]} ${algerianFamilyNames[i % algerianFamilyNames.length]} - مفتش تربوي`,
      email: `supervisor_region${Math.floor(i / 5) + 1}@demo.com`,
      password: '123456',
      dashboard: '/educational-supervisor-analytics',
      icon: Shield,
      color: 'red',
      description: `مفتش تربوي للمنطقة ${Math.floor(i / 5) + 1}`,
      wilaya: supervisedWilayas[0].name,
      school: 'multiple',
      schoolName: `مدارس المنطقة ${Math.floor(i / 5) + 1}`,
      supervisorData: {
        supervisorId: `S${Math.floor(i / 5) + 1}${new Date().getFullYear()}`,
        zone: `المنطقة التربوية ${Math.floor(i / 5) + 1}`,
        specialization: 'تفتيش تربوي عام',
        supervisedSchools: allSchools.filter(s => supervisedWilayas.some(w => w.code === s.wilayaCode)).map(s => s.id),
        supervisedSubjects: ['جميع المواد'],
        appointmentDate: `${Math.floor(Math.random() * 6) + 2018}-09-01`
      }
    };
    comprehensiveAccounts.push(supervisorAccount);
  }
  
  return comprehensiveAccounts;
};

// دالة للحصول على إحصائيات الحسابات
export const getAccountStatistics = () => {
  const accounts = generateComprehensiveDemoAccounts();
  const stats = {
    total: accounts.length,
    students: accounts.filter(acc => acc.role === 'student').length,
    teachers: accounts.filter(acc => acc.role === 'teacher').length,
    parents: accounts.filter(acc => acc.role === 'parent').length,
    admins: accounts.filter(acc => acc.role === 'admin').length,
    supervisors: accounts.filter(acc => acc.role === 'supervisor').length,
    byWilaya: {} as Record<string, number>
  };
  
  // إحصائيات حسب الولاية
  accounts.forEach(account => {
    if (account.wilaya) {
      stats.byWilaya[account.wilaya] = (stats.byWilaya[account.wilaya] || 0) + 1;
    }
  });
  
  return stats;
};

// دالة للبحث في الحسابات حسب الولاية
export const getAccountsByWilaya = (wilayaName: string): UserAccount[] => {
  const allAccounts = generateComprehensiveDemoAccounts();
  return allAccounts.filter(account => account.wilaya === wilayaName);
};

// دالة للبحث في الحسابات حسب المدرسة
export const getAccountsBySchool = (schoolId: string): UserAccount[] => {
  const allAccounts = generateComprehensiveDemoAccounts();
  return allAccounts.filter(account => account.school === schoolId);
};

// دالة للبحث في الحسابات حسب النوع
export const getAccountsByRole = (role: UserAccount['role']): UserAccount[] => {
  const allAccounts = generateComprehensiveDemoAccounts();
  return allAccounts.filter(account => account.role === role);
};