// بيانات المدارس والولايات الجزائرية
// تم إنشاء هذا الملف ليحتوي على معلومات شاملة عن جميع الولايات والمدارس

import { GraduationCap, Users, User, UserCheck, Shield, Zap } from 'lucide-react';

export interface School {
  id: string;
  name: string;
  wilayaCode: string;
  wilayaName: string;
  address: string;
  phone: string;
  totalStudents: number;
  totalTeachers: number;
  grades: Grade[];
}

export interface Grade {
  id: string;
  name: string;
  arabicName: string;
  classes: Class[];
}

export interface Class {
  id: string;
  name: string;
  arabicName: string;
  studentCount: number;
  teacherId?: string;
}

// الولايات الجزائرية الـ58 الكاملة
export const wilayas = [
  // الولايات الأصلية (1-48)
  { code: '01', name: 'أدرار' },
  { code: '02', name: 'الشلف' },
  { code: '03', name: 'الأغواط' },
  { code: '04', name: 'أم البواقي' },
  { code: '05', name: 'باتنة' },
  { code: '06', name: 'بجاية' },
  { code: '07', name: 'بسكرة' },
  { code: '08', name: 'بشار' },
  { code: '09', name: 'البليدة' },
  { code: '10', name: 'البويرة' },
  { code: '11', name: 'تمنراست' },
  { code: '12', name: 'تبسة' },
  { code: '13', name: 'تلمسان' },
  { code: '14', name: 'تيارت' },
  { code: '15', name: 'تيزي وزو' },
  { code: '16', name: 'الجزائر' },
  { code: '17', name: 'الجلفة' },
  { code: '18', name: 'جيجل' },
  { code: '19', name: 'سطيف' },
  { code: '20', name: 'سعيدة' },
  { code: '21', name: 'سكيكدة' },
  { code: '22', name: 'سيدي بلعباس' },
  { code: '23', name: 'عنابة' },
  { code: '24', name: 'قالمة' },
  { code: '25', name: 'قسنطينة' },
  { code: '26', name: 'المدية' },
  { code: '27', name: 'مستغانم' },
  { code: '28', name: 'المسيلة' },
  { code: '29', name: 'معسكر' },
  { code: '30', name: 'ورقلة' },
  { code: '31', name: 'وهران' },
  { code: '32', name: 'البيض' },
  { code: '33', name: 'إليزي' },
  { code: '34', name: 'برج بوعريريج' },
  { code: '35', name: 'بومرداس' },
  { code: '36', name: 'الطارف' },
  { code: '37', name: 'تندوف' },
  { code: '38', name: 'تسمسيلت' },
  { code: '39', name: 'الوادي' },
  { code: '40', name: 'خنشلة' },
  { code: '41', name: 'سوق أهراس' },
  { code: '42', name: 'تيبازة' },
  { code: '43', name: 'ميلة' },
  { code: '44', name: 'عين الدفلى' },
  { code: '45', name: 'النعامة' },
  { code: '46', name: 'عين تموشنت' },
  { code: '47', name: 'غرداية' },
  { code: '48', name: 'غليزان' },
  
  // الولايات الجديدة (49-58)
  { code: '49', name: 'تيميمون' },
  { code: '50', name: 'برج باجي مختار' },
  { code: '51', name: 'أولاد جلال' },
  { code: '52', name: 'بني عباس' },
  { code: '53', name: 'عين صالح' },
  { code: '54', name: 'عين قزام' },
  { code: '55', name: 'تقرت' },
  { code: '56', name: 'جانت' },
  { code: '57', name: 'المغير' },
  { code: '58', name: 'المنيعة' }
];

import { realAlgerianSchoolNames, algerianNeighborhoods } from './realSchoolNames';

// الصفوف الدراسية للطور الابتدائي
const grades: Grade[] = [
  {
    id: 'grade_1',
    name: 'Grade 1',
    arabicName: 'السنة الأولى ابتدائي',
    classes: [
      { id: 'class_1_1', name: 'Class 1-1', arabicName: 'القسم الأول', studentCount: 25 },
      { id: 'class_1_2', name: 'Class 1-2', arabicName: 'القسم الثاني', studentCount: 26 }
    ]
  },
  {
    id: 'grade_2',
    name: 'Grade 2',
    arabicName: 'السنة الثانية ابتدائي',
    classes: [
      { id: 'class_2_1', name: 'Class 2-1', arabicName: 'القسم الأول', studentCount: 24 },
      { id: 'class_2_2', name: 'Class 2-2', arabicName: 'القسم الثاني', studentCount: 23 }
    ]
  },
  {
    id: 'grade_3',
    name: 'Grade 3',
    arabicName: 'السنة الثالثة ابتدائي',
    classes: [
      { id: 'class_3_1', name: 'Class 3-1', arabicName: 'القسم الأول', studentCount: 22 },
      { id: 'class_3_2', name: 'Class 3-2', arabicName: 'القسم الثاني', studentCount: 21 }
    ]
  },
  {
    id: 'grade_4',
    name: 'Grade 4',
    arabicName: 'السنة الرابعة ابتدائي',
    classes: [
      { id: 'class_4_1', name: 'Class 4-1', arabicName: 'القسم الأول', studentCount: 20 },
      { id: 'class_4_2', name: 'Class 4-2', arabicName: 'القسم الثاني', studentCount: 19 }
    ]
  },
  {
    id: 'grade_5',
    name: 'Grade 5',
    arabicName: 'السنة الخامسة ابتدائي',
    classes: [
      { id: 'class_5_1', name: 'Class 5-1', arabicName: 'القسم الأول', studentCount: 18 },
      { id: 'class_5_2', name: 'Class 5-2', arabicName: 'القسم الثاني', studentCount: 17 }
    ]
  }
];

// توليد مدارس لكل ولاية (مدرستين على الأقل مضمونة)
export const generateAllSchools = (): School[] => {
  const allSchools: School[] = [];
  
  wilayas.forEach((wilaya, wilayaIndex) => {
    // ضمان عدد المدارس لكل ولاية بناءً على رقم الولاية (مدرستين على الأقل)
    // استخدام رقم الولاية لضمان ثبات النتائج
    const wilayaNumber = parseInt(wilaya.code);
    const schoolCount = 2 + (wilayaNumber % 4); // من 2 إلى 5 مدارس، ثابت لكل ولاية
    
    for (let i = 1; i <= schoolCount; i++) {
      const schoolId = `school_${wilaya.code}_${i.toString().padStart(3, '0')}`;
      const schoolName = realAlgerianSchoolNames[(parseInt(wilaya.code) * 5 + i - 1) % realAlgerianSchoolNames.length];
      
      // إنشاء الصفوف مع معرفات فريدة لكل مدرسة
      const schoolGrades: Grade[] = grades.map(grade => {
        // كل سنة دراسية تحتوي على قسمين على الأقل
        let gradeClasses = grade.classes.map((cls, classIndex) => ({
          ...cls,
          id: `${schoolId}_${cls.id}`,
          // عدد طلاب ثابت بناءً على معرف المدرسة والصف
          studentCount: 15 + ((wilayaNumber + i + classIndex) % 11) // بين 15-25 طالب
        }));

        // إضافة قسم ثالث في مدارس معينة (ثابت بناءً على معرف المدرسة)
        const shouldAddThirdClass = (wilayaNumber + i) % 3 === 0; // ثلث المدارس تقريباً
        if (shouldAddThirdClass) {
          gradeClasses.push({
            id: `${schoolId}_${grade.id.replace('grade', 'class')}_3`,
            name: `${grade.name.replace('Grade', 'Class')}-3`,
            arabicName: 'القسم الثالث',
            studentCount: 12 + ((wilayaNumber + i) % 9) // بين 12-20 طالب
          });
        }

        return {
          ...grade,
          id: `${schoolId}_${grade.id}`,
          classes: gradeClasses
        };
      });
      
      const totalStudents = schoolGrades.reduce((total, grade) => 
        total + grade.classes.reduce((gradeTotal, cls) => gradeTotal + cls.studentCount, 0), 0
      );
      
      const school: School = {
        id: schoolId,
        name: schoolName,
        wilayaCode: wilaya.code,
        wilayaName: wilaya.name,
        address: `${algerianNeighborhoods[Math.floor(Math.random() * algerianNeighborhoods.length)]}، ${wilaya.name}`,
        phone: `0${Math.floor(Math.random() * 9) + 1}${Math.floor(Math.random() * 8) + 1}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}`,
        totalStudents,
        totalTeachers: Math.floor(totalStudents / 20) + 5, // حوالي 20 طالب لكل معلم + 5 معلمين إضافيين
        grades: schoolGrades
      };
      
      allSchools.push(school);
    }
  });
  
  return allSchools;
};

// الحصول على المدارس حسب الولاية مع ضمان وجود مدارس
export const getSchoolsByWilaya = (wilayaCode: string): School[] => {
  const allSchools = generateAllSchools();
  const wilayaSchools = allSchools.filter(school => school.wilayaCode === wilayaCode);
  
  // إذا لم توجد مدارس، أنشئ مدرستين تلقائياً (طبقة حماية إضافية)
  if (wilayaSchools.length === 0) {
    console.warn(`⚠️ لم توجد مدارس للولاية ${wilayaCode}، سيتم إنشاء مدارس تلقائياً`);
    
    const wilaya = wilayas.find(w => w.code === wilayaCode);
    if (wilaya) {
      const emergencySchools = createEmergencySchools(wilaya);
      return emergencySchools;
    }
  }
  
  return wilayaSchools;
};

// دالة طوارئ لإنشاء مدارس إذا لم توجد
const createEmergencySchools = (wilaya: { code: string; name: string }): School[] => {
  const emergencySchools: School[] = [];
  
  for (let i = 1; i <= 2; i++) {
    const schoolId = `emergency_school_${wilaya.code}_${i}`;
    const schoolName = `مدرسة ${wilaya.name} الابتدائية رقم ${i}`;
    
    // إنشاء أقسام مضمونة لكل سنة دراسية
    const schoolGrades: Grade[] = grades.map(grade => {
      // كل سنة تحتوي على قسمين مضمونين
      const gradeClasses = [
        {
          id: `${schoolId}_${grade.id}_class_1`,
          name: `${grade.name}-Class-1`,
          arabicName: 'القسم الأول',
          studentCount: 20 + (i * 2)
        },
        {
          id: `${schoolId}_${grade.id}_class_2`,
          name: `${grade.name}-Class-2`,
          arabicName: 'القسم الثاني',
          studentCount: 18 + (i * 3)
        }
      ];
      
      // إضافة قسم ثالث في بعض الحالات
      if (i === 1) {
        gradeClasses.push({
          id: `${schoolId}_${grade.id}_class_3`,
          name: `${grade.name}-Class-3`,
          arabicName: 'القسم الثالث',
          studentCount: 15 + (i * 2)
        });
      }
      
      return {
        ...grade,
        id: `${schoolId}_${grade.id}`,
        classes: gradeClasses
      };
    });
    
    const totalStudents = schoolGrades.reduce((total, grade) => 
      total + grade.classes.reduce((gradeTotal, cls) => gradeTotal + cls.studentCount, 0), 0
    );
    
    emergencySchools.push({
      id: schoolId,
      name: schoolName,
      wilayaCode: wilaya.code,
      wilayaName: wilaya.name,
      address: `وسط مدينة ${wilaya.name}`,
      phone: `025${wilaya.code}${i}000`,
      totalStudents,
      totalTeachers: Math.floor(totalStudents / 20) + 3,
      grades: schoolGrades
    });
  }
  
  return emergencySchools;
};

// دالة للتحقق من وجود أقسام في مدرسة معينة
export const validateSchoolHasClasses = (schoolId: string): boolean => {
  try {
    const school = getSchoolById(schoolId);
    if (!school || !school.grades) return false;
    
    // التحقق من أن كل سنة دراسية تحتوي على قسم واحد على الأقل
    return school.grades.every(grade => 
      grade.classes && grade.classes.length > 0
    );
  } catch {
    return false;
  }
};

// الحصول على مدرسة بالمعرف
export const getSchoolById = (schoolId: string): School | undefined => {
  const allSchools = generateAllSchools();
  return allSchools.find(school => school.id === schoolId);
};

// التحقق من أن جميع الولايات تحتوي على مدارس (مع طبقة حماية)
export const validateAllWilayasHaveSchools = (): { isValid: boolean; missingWilayas: string[]; details: any } => {
  // فحص كل ولاية على حدة باستخدام getSchoolsByWilaya التي تضمن وجود مدارس
  const wilayaSchoolCount = wilayas.map(wilaya => {
    const schools = getSchoolsByWilaya(wilaya.code);
    return {
      code: wilaya.code,
      name: wilaya.name,
      schoolCount: schools.length,
      schools: schools.map(s => s.name)
    };
  });
  
  const missingWilayas = wilayaSchoolCount.filter(w => w.schoolCount === 0);
  
  return {
    isValid: missingWilayas.length === 0,
    missingWilayas: missingWilayas.map(w => `${w.code} - ${w.name}`),
    details: {
      totalWilayas: wilayas.length,
      wilayasWithSchools: wilayaSchoolCount.filter(w => w.schoolCount > 0).length,
      wilayaSchoolCount,
      averageSchoolsPerWilaya: Math.round(wilayaSchoolCount.reduce((sum, w) => sum + w.schoolCount, 0) / wilayas.length),
      totalSchools: wilayaSchoolCount.reduce((sum, w) => sum + w.schoolCount, 0)
    }
  };
};

// إحصائيات عامة
export const getEducationStats = () => {
  const allSchools = generateAllSchools();
  const totalSchools = allSchools.length;
  const totalStudents = allSchools.reduce((sum, school) => sum + school.totalStudents, 0);
  const totalTeachers = allSchools.reduce((sum, school) => sum + school.totalTeachers, 0);
  const totalClasses = allSchools.reduce((sum, school) => 
    sum + school.grades.reduce((gradeSum, grade) => gradeSum + grade.classes.length, 0), 0
  );
  
  // التحقق من صحة البيانات
  const validation = validateAllWilayasHaveSchools();
  
  return {
    totalWilayas: wilayas.length,
    totalSchools,
    totalStudents,
    totalTeachers,
    totalClasses,
    averageStudentsPerSchool: Math.round(totalStudents / totalSchools),
    averageStudentsPerClass: Math.round(totalStudents / totalClasses),
    validation
  };
};

// المواد الدراسية للطور الابتدائي
export const primarySubjects = [
  'اللغة العربية',
  'الرياضيات', 
  'التربية الإسلامية',
  'التربية العلمية والتكنولوجية',
  'التربية المدنية',
  'التاريخ والجغرافيا',
  'اللغة الإنجليزية',
  'التربية الفنية',
  'التربية البدنية'
];

// أسماء جزائرية للطلاب
export const algerianNames = {
  male: [
    'محمد', 'أحمد', 'يوسف', 'علي', 'عمر', 'إبراهيم', 'خالد', 'حسام', 'كريم', 'أمين',
    'زين العابدين', 'عبد الرحمن', 'عبد الله', 'مراد', 'رضا', 'فؤاد', 'سفيان', 'إلياس', 'أنس', 'هشام'
  ],
  female: [
    'فاطمة', 'عائشة', 'خديجة', 'مريم', 'زينب', 'أسماء', 'حليمة', 'صفية', 'نادية', 'سعاد',
    'كريمة', 'أمينة', 'حسيبة', 'جميلة', 'نورا', 'هدى', 'سارة', 'لينا', 'ياسمين', 'رانيا'
  ]
};

// أسماء عائلات جزائرية
export const algerianFamilyNames = [
  'بن علي', 'بن محمد', 'بن عمر', 'بن يوسف', 'بن إبراهيم', 'بن خالد', 'بن أحمد',
  'بوعلام', 'بوراس', 'بوضياف', 'بن بلة', 'بن جدو', 'بن عيسى', 'بن صالح',
  'قاسمي', 'زروقي', 'مرابطي', 'شريف', 'عزوزي', 'حمادي', 'خليل', 'نجار'
];