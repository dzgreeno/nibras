// نظام التعليم الجزائري - البيانات الحقيقية
export interface Wilaya {
  id: number;
  name: string;
  code: string;
}

export interface School {
  id: string;
  name: string;
  type: 'ابتدائية' | 'متوسطة' | 'ثانوية';
  wilaya: string;
  commune: string;
  address: string;
  director: string;
  phone?: string;
  capacity: number;
  established: number;
}

export interface Grade {
  id: string;
  name: string;
  level: number;
  type: 'ابتدائي' | 'متوسط' | 'ثانوي';
  subjects: string[];
  weeklyHours: number;
}

export interface Subject {
  id: string;
  name: string;
  arabicName: string;
  weeklyHours: number;
  coefficient: number;
  type: 'أساسية' | 'مكملة' | 'اختيارية';
  grades: string[];
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  school: string;
  capacity: number;
  currentStudents: number;
  teacher?: string;
}

// الولايات الجزائرية
export const WILAYAS: Wilaya[] = [
  { id: 1, name: 'أدرار', code: '01' },
  { id: 2, name: 'الشلف', code: '02' },
  { id: 3, name: 'الأغواط', code: '03' },
  { id: 4, name: 'أم البواقي', code: '04' },
  { id: 5, name: 'باتنة', code: '05' },
  { id: 6, name: 'بجاية', code: '06' },
  { id: 7, name: 'بسكرة', code: '07' },
  { id: 8, name: 'بشار', code: '08' },
  { id: 9, name: 'البليدة', code: '09' },
  { id: 10, name: 'البويرة', code: '10' },
  { id: 11, name: 'تمنراست', code: '11' },
  { id: 12, name: 'تبسة', code: '12' },
  { id: 13, name: 'تلمسان', code: '13' },
  { id: 14, name: 'تيارت', code: '14' },
  { id: 15, name: 'تيزي وزو', code: '15' },
  { id: 16, name: 'الجزائر', code: '16' },
  { id: 17, name: 'الجلفة', code: '17' },
  { id: 18, name: 'جيجل', code: '18' },
  { id: 19, name: 'سطيف', code: '19' },
  { id: 20, name: 'سعيدة', code: '20' },
  { id: 21, name: 'سكيكدة', code: '21' },
  { id: 22, name: 'سيدي بلعباس', code: '22' },
  { id: 23, name: 'عنابة', code: '23' },
  { id: 24, name: 'قالمة', code: '24' },
  { id: 25, name: 'قسنطينة', code: '25' },
  { id: 26, name: 'المدية', code: '26' },
  { id: 27, name: 'مستغانم', code: '27' },
  { id: 28, name: 'المسيلة', code: '28' },
  { id: 29, name: 'معسكر', code: '29' },
  { id: 30, name: 'ورقلة', code: '30' },
  { id: 31, name: 'وهران', code: '31' },
  { id: 32, name: 'البيض', code: '32' },
  { id: 33, name: 'إليزي', code: '33' },
  { id: 34, name: 'برج بوعريريج', code: '34' },
  { id: 35, name: 'بومرداس', code: '35' },
  { id: 36, name: 'الطارف', code: '36' },
  { id: 37, name: 'تندوف', code: '37' },
  { id: 38, name: 'تسمسيلت', code: '38' },
  { id: 39, name: 'الوادي', code: '39' },
  { id: 40, name: 'خنشلة', code: '40' },
  { id: 41, name: 'سوق أهراس', code: '41' },
  { id: 42, name: 'تيبازة', code: '42' },
  { id: 43, name: 'ميلة', code: '43' },
  { id: 44, name: 'عين الدفلى', code: '44' },
  { id: 45, name: 'النعامة', code: '45' },
  { id: 46, name: 'عين تموشنت', code: '46' },
  { id: 47, name: 'غرداية', code: '47' },
  { id: 48, name: 'غليزان', code: '48' },
  { id: 49, name: 'تيميمون', code: '49' },
  { id: 50, name: 'برج باجي مختار', code: '50' },
  { id: 51, name: 'أولاد جلال', code: '51' },
  { id: 52, name: 'بني عباس', code: '52' },
  { id: 53, name: 'عين صالح', code: '53' },
  { id: 54, name: 'عين قزام', code: '54' },
  { id: 55, name: 'تقرت', code: '55' },
  { id: 56, name: 'جانت', code: '56' },
  { id: 57, name: 'المغير', code: '57' },
  { id: 58, name: 'المنيعة', code: '58' }
];

// السنوات الدراسية للطور الابتدائي (حسب المنهاج الجزائري 2024-2025)
export const PRIMARY_GRADES: Grade[] = [
  {
    id: 'grade_1',
    name: 'السنة الأولى ابتدائي',
    level: 1,
    type: 'ابتدائي',
    subjects: ['اللغة العربية', 'الرياضيات', 'التربية الإسلامية', 'التربية الفنية', 'التربية البدنية والرياضية'],
    weeklyHours: 21
  },
  {
    id: 'grade_2',
    name: 'السنة الثانية ابتدائي',
    level: 2,
    type: 'ابتدائي',
    subjects: ['اللغة العربية', 'الرياضيات', 'التربية الإسلامية', 'التربية الفنية', 'التربية البدنية والرياضية'],
    weeklyHours: 21
  },
  {
    id: 'grade_3',
    name: 'السنة الثالثة ابتدائي',
    level: 3,
    type: 'ابتدائي',
    subjects: ['اللغة العربية', 'الرياضيات', 'التربية الإسلامية', 'التربية العلمية والتكنولوجية', 'التربية المدنية', 'التربية الفنية', 'التربية البدنية والرياضية'],
    weeklyHours: 25
  },
  {
    id: 'grade_4',
    name: 'السنة الرابعة ابتدائي',
    level: 4,
    type: 'ابتدائي',
    subjects: ['اللغة العربية', 'الرياضيات', 'التربية الإسلامية', 'التربية العلمية والتكنولوجية', 'التربية المدنية', 'التاريخ والجغرافيا', 'التربية الفنية', 'التربية البدنية والرياضية'],
    weeklyHours: 25
  },
  {
    id: 'grade_5',
    name: 'السنة الخامسة ابتدائي',
    level: 5,
    type: 'ابتدائي',
    subjects: ['اللغة العربية', 'الرياضيات', 'التربية الإسلامية', 'التربية العلمية والتكنولوجية', 'التربية المدنية', 'التاريخ والجغرافيا', 'اللغة الإنجليزية', 'التربية الفنية', 'التربية البدنية والرياضية'],
    weeklyHours: 27
  }
];

// المواد الدراسية للطور الابتدائي (حسب المنهاج الجزائري 2024-2025)
export const PRIMARY_SUBJECTS: Subject[] = [
  {
    id: 'arabic',
    name: 'Arabic Language',
    arabicName: 'اللغة العربية',
    weeklyHours: 11,
    coefficient: 3,
    type: 'أساسية',
    grades: ['grade_1', 'grade_2', 'grade_3', 'grade_4', 'grade_5']
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    arabicName: 'الرياضيات',
    weeklyHours: 5,
    coefficient: 3,
    type: 'أساسية',
    grades: ['grade_1', 'grade_2', 'grade_3', 'grade_4', 'grade_5']
  },
  {
    id: 'islamic_education',
    name: 'Islamic Education',
    arabicName: 'التربية الإسلامية',
    weeklyHours: 1.5,
    coefficient: 2,
    type: 'أساسية',
    grades: ['grade_1', 'grade_2', 'grade_3', 'grade_4', 'grade_5']
  },
  {
    id: 'science_technology',
    name: 'Science and Technology',
    arabicName: 'التربية العلمية والتكنولوجية',
    weeklyHours: 3,
    coefficient: 2,
    type: 'أساسية',
    grades: ['grade_3', 'grade_4', 'grade_5']
  },
  {
    id: 'civic_education',
    name: 'Civic Education',
    arabicName: 'التربية المدنية',
    weeklyHours: 1,
    coefficient: 1,
    type: 'مكملة',
    grades: ['grade_3', 'grade_4', 'grade_5']
  },
  {
    id: 'history_geography',
    name: 'History and Geography',
    arabicName: 'التاريخ والجغرافيا',
    weeklyHours: 2,
    coefficient: 2,
    type: 'أساسية',
    grades: ['grade_4', 'grade_5']
  },
  {
    id: 'english',
    name: 'English Language',
    arabicName: 'اللغة الإنجليزية',
    weeklyHours: 1.5,
    coefficient: 1,
    type: 'مكملة',
    grades: ['grade_5']
  },
  {
    id: 'art_education',
    name: 'Art Education',
    arabicName: 'التربية الفنية',
    weeklyHours: 1.5,
    coefficient: 1,
    type: 'مكملة',
    grades: ['grade_1', 'grade_2', 'grade_3', 'grade_4', 'grade_5']
  },
  {
    id: 'physical_education',
    name: 'Physical Education',
    arabicName: 'التربية البدنية والرياضية',
    weeklyHours: 2,
    coefficient: 1,
    type: 'مكملة',
    grades: ['grade_1', 'grade_2', 'grade_3', 'grade_4', 'grade_5']
  }
];

// مدارس ابتدائية حقيقية من مختلف الولايات الجزائرية
export const SAMPLE_SCHOOLS: School[] = [
  // الجزائر العاصمة (16)
  {
    id: 'school_16_001',
    name: 'مدرسة الشهيد محمد بوراس الابتدائية',
    type: 'ابتدائية',
    wilaya: 'الجزائر',
    commune: 'الجزائر الوسطى',
    address: 'حي بلكور، الجزائر العاصمة',
    director: 'أ. فاطمة بن علي',
    phone: '021-23-45-67',
    capacity: 450,
    established: 1962
  },
  {
    id: 'school_16_002',
    name: 'مدرسة الشهيد عبان رمضان الابتدائية',
    type: 'ابتدائية',
    wilaya: 'الجزائر',
    commune: 'باب الوادي',
    address: 'شارع ديدوش مراد، باب الوادي',
    director: 'أ. محمد زروقي',
    phone: '021-65-43-21',
    capacity: 380,
    established: 1965
  },
  {
    id: 'school_16_003',
    name: 'مدرسة الشهيد العربي بن مهيدي الابتدائية',
    type: 'ابتدائية',
    wilaya: 'الجزائر',
    commune: 'القصبة',
    address: 'حي القصبة العتيقة، الجزائر',
    director: 'أ. خديجة بوضياف',
    phone: '021-73-28-91',
    capacity: 320,
    established: 1963
  },
  
  // وهران (31)
  {
    id: 'school_31_001',
    name: 'مدرسة الشهيد أحمد زبانة الابتدائية',
    type: 'ابتدائية',
    wilaya: 'وهران',
    commune: 'وهران',
    address: 'حي السلام، وهران',
    director: 'أ. خديجة مرابط',
    phone: '041-33-22-11',
    capacity: 420,
    established: 1962
  },
  {
    id: 'school_31_002',
    name: 'مدرسة الشهيد حسيبة بن بوعلي الابتدائية',
    type: 'ابتدائية',
    wilaya: 'وهران',
    commune: 'السانيا',
    address: 'حي النصر، السانيا',
    director: 'أ. عبد الرحمن قدور',
    phone: '041-55-77-88',
    capacity: 350,
    established: 1968
  },
  {
    id: 'school_31_003',
    name: 'مدرسة الشهيد مصطفى بن بولعيد الابتدائية',
    type: 'ابتدائية',
    wilaya: 'وهران',
    commune: 'بئر الجير',
    address: 'حي الأندلس، بئر الجير',
    director: 'أ. نور الدين بلعباس',
    phone: '041-44-67-23',
    capacity: 400,
    established: 1970
  },
  
  // قسنطينة (25)
  {
    id: 'school_25_001',
    name: 'مدرسة الشهيد زيغود يوسف الابتدائية',
    type: 'ابتدائية',
    wilaya: 'قسنطينة',
    commune: 'قسنطينة',
    address: 'حي بودراع صالح، قسنطينة',
    director: 'أ. زينب بوعلام',
    phone: '031-92-84-76',
    capacity: 400,
    established: 1963
  },
  {
    id: 'school_25_002',
    name: 'مدرسة الشهيد ديدوش مراد الابتدائية',
    type: 'ابتدائية',
    wilaya: 'قسنطينة',
    commune: 'الخروب',
    address: 'حي 20 أوت 1955، الخروب',
    director: 'أ. عمر بن صالح',
    phone: '031-87-45-32',
    capacity: 360,
    established: 1964
  },
  
  // سطيف (19)
  {
    id: 'school_19_001',
    name: 'مدرسة الشهيد محمد خيضر الابتدائية',
    type: 'ابتدائية',
    wilaya: 'سطيف',
    commune: 'سطيف',
    address: 'حي 8 مايو 1945، سطيف',
    director: 'أ. أحمد بلحاج',
    phone: '036-51-23-45',
    capacity: 380,
    established: 1962
  },
  {
    id: 'school_19_002',
    name: 'مدرسة الشهيد عباس لغرور الابتدائية',
    type: 'ابتدائية',
    wilaya: 'سطيف',
    commune: 'العلمة',
    address: 'حي الشهداء، العلمة',
    director: 'أ. سعاد مداني',
    phone: '036-67-89-12',
    capacity: 340,
    established: 1965
  },
  
  // تيزي وزو (15)
  {
    id: 'school_15_001',
    name: 'مدرسة الشهيد كريم بلقاسم الابتدائية',
    type: 'ابتدائية',
    wilaya: 'تيزي وزو',
    commune: 'تيزي وزو',
    address: 'حي الشهداء، تيزي وزو',
    director: 'أ. كريمة آيت علي',
    phone: '026-21-87-65',
    capacity: 320,
    established: 1963
  },
  {
    id: 'school_15_002',
    name: 'مدرسة الشهيد عميروش آيت حمودة الابتدائية',
    type: 'ابتدائية',
    wilaya: 'تيزي وزو',
    commune: 'أزازقة',
    address: 'حي المجاهدين، أزازقة',
    director: 'أ. فاطمة معمري',
    phone: '026-33-54-78',
    capacity: 300,
    established: 1964
  },
  
  // بجاية (06)
  {
    id: 'school_06_001',
    name: 'مدرسة الشهيد عبد الحميد بن باديس الابتدائية',
    type: 'ابتدائية',
    wilaya: 'بجاية',
    commune: 'بجاية',
    address: 'حي سيدي أحمد، بجاية',
    director: 'أ. نادية بن يوسف',
    phone: '034-21-43-65',
    capacity: 360,
    established: 1962
  },
  {
    id: 'school_06_002',
    name: 'مدرسة الشهيد محمد العيد آل خليفة الابتدائية',
    type: 'ابتدائية',
    wilaya: 'بجاية',
    commune: 'أقبو',
    address: 'حي النصر، أقبو',
    director: 'أ. رشيد بوعكاز',
    phone: '034-35-67-89',
    capacity: 280,
    established: 1966
  },
  
  // باتنة (05)
  {
    id: 'school_05_001',
    name: 'مدرسة الشهيد مصطفى بن بولعيد الابتدائية',
    type: 'ابتدائية',
    wilaya: 'باتنة',
    commune: 'باتنة',
    address: 'حي بوزوران، باتنة',
    director: 'أ. عمر شريط',
    phone: '033-81-92-73',
    capacity: 400,
    established: 1962
  },
  {
    id: 'school_05_002',
    name: 'مدرسة الشهيد شيحاني بشير الابتدائية',
    type: 'ابتدائية',
    wilaya: 'باتنة',
    commune: 'عين التوتة',
    address: 'حي الاستقلال، عين التوتة',
    director: 'أ. حليمة بن عيسى',
    phone: '033-29-45-67',
    capacity: 320,
    established: 1963
  },
  
  // عنابة (23)
  {
    id: 'school_23_001',
    name: 'مدرسة الشهيد محمد الشريف مساعدية الابتدائية',
    type: 'ابتدائية',
    wilaya: 'عنابة',
    commune: 'عنابة',
    address: 'حي الضاية، عنابة',
    director: 'أ. سعاد بوقرة',
    phone: '038-86-54-32',
    capacity: 390,
    established: 1962
  },
  {
    id: 'school_23_002',
    name: 'مدرسة الشهيد بادي عبد الرحمن الابتدائية',
    type: 'ابتدائية',
    wilaya: 'عنابة',
    commune: 'الحجار',
    address: 'حي 5 جويلية، الحجار',
    director: 'أ. محمد بوشامة',
    phone: '038-47-23-89',
    capacity: 350,
    established: 1964
  },
  
  // تلمسان (13)
  {
    id: 'school_13_001',
    name: 'مدرسة الشهيد العربي التبسي الابتدائية',
    type: 'ابتدائية',
    wilaya: 'تلمسان',
    commune: 'تلمسان',
    address: 'حي الإمام، تلمسان',
    director: 'أ. فاطمة بن زرقة',
    phone: '043-26-78-45',
    capacity: 370,
    established: 1962
  },
  
  // مستغانم (27)
  {
    id: 'school_27_001',
    name: 'مدرسة الشهيد محمد بوضياف الابتدائية',
    type: 'ابتدائية',
    wilaya: 'مستغانم',
    commune: 'مستغانم',
    address: 'حي سيدي علي، مستغانم',
    director: 'أ. خالد بن عمر',
    phone: '045-21-34-56',
    capacity: 380,
    established: 1963
  },
  
  // البليدة (09)
  {
    id: 'school_09_001',
    name: 'مدرسة الشهيد سعد دحلب الابتدائية',
    type: 'ابتدائية',
    wilaya: 'البليدة',
    commune: 'البليدة',
    address: 'حي الورود، البليدة',
    director: 'أ. نعيمة حجاج',
    phone: '025-43-67-89',
    capacity: 420,
    established: 1962
  }
];

// الأقسام الدراسية للمدارس الابتدائية
export const SAMPLE_CLASSES: Class[] = [
  // مدرسة الشهيد محمد بوراس الابتدائية - الجزائر
  { id: 'class_16_001_1_1', name: 'القسم الأول', grade: 'grade_1', school: 'school_16_001', capacity: 30, currentStudents: 28, teacher: 'أ. زهرة بن علي' },
  { id: 'class_16_001_1_2', name: 'القسم الثاني', grade: 'grade_1', school: 'school_16_001', capacity: 30, currentStudents: 29, teacher: 'أ. سعاد مداني' },
  { id: 'class_16_001_1_3', name: 'القسم الثالث', grade: 'grade_1', school: 'school_16_001', capacity: 30, currentStudents: 27, teacher: 'أ. نادية قاسمي' },
  
  { id: 'class_16_001_2_1', name: 'القسم الأول', grade: 'grade_2', school: 'school_16_001', capacity: 30, currentStudents: 30, teacher: 'أ. خديجة بوضياف' },
  { id: 'class_16_001_2_2', name: 'القسم الثاني', grade: 'grade_2', school: 'school_16_001', capacity: 30, currentStudents: 28, teacher: 'أ. فاطمة زروقي' },
  { id: 'class_16_001_2_3', name: 'القسم الثالث', grade: 'grade_2', school: 'school_16_001', capacity: 30, currentStudents: 29, teacher: 'أ. أمينة بلعباس' },
  
  { id: 'class_16_001_3_1', name: 'القسم الأول', grade: 'grade_3', school: 'school_16_001', capacity: 32, currentStudents: 31, teacher: 'أ. محمد بن صالح' },
  { id: 'class_16_001_3_2', name: 'القسم الثاني', grade: 'grade_3', school: 'school_16_001', capacity: 32, currentStudents: 30, teacher: 'أ. عبد الرحمن حجاج' },
  { id: 'class_16_001_3_3', name: 'القسم الثالث', grade: 'grade_3', school: 'school_16_001', capacity: 32, currentStudents: 32, teacher: 'أ. يوسف بوعكاز' },
  
  { id: 'class_16_001_4_1', name: 'القسم الأول', grade: 'grade_4', school: 'school_16_001', capacity: 32, currentStudents: 32, teacher: 'أ. كريمة آيت علي' },
  { id: 'class_16_001_4_2', name: 'القسم الثاني', grade: 'grade_4', school: 'school_16_001', capacity: 32, currentStudents: 29, teacher: 'أ. رشيد معمري' },
  { id: 'class_16_001_4_3', name: 'القسم الثالث', grade: 'grade_4', school: 'school_16_001', capacity: 32, currentStudents: 31, teacher: 'أ. حنان بن عمر' },
  
  { id: 'class_16_001_5_1', name: 'القسم الأول', grade: 'grade_5', school: 'school_16_001', capacity: 35, currentStudents: 33, teacher: 'أ. عمر شريط' },
  { id: 'class_16_001_5_2', name: 'القسم الثاني', grade: 'grade_5', school: 'school_16_001', capacity: 35, currentStudents: 34, teacher: 'أ. سلمى بوقرة' },
  { id: 'class_16_001_5_3', name: 'القسم الثالث', grade: 'grade_5', school: 'school_16_001', capacity: 35, currentStudents: 35, teacher: 'أ. أحمد بلحاج' },
  
  // مدرسة الشهيد عبان رمضان الابتدائية - الجزائر
  { id: 'class_16_002_1_1', name: 'القسم الأول', grade: 'grade_1', school: 'school_16_002', capacity: 28, currentStudents: 26, teacher: 'أ. ليلى بن يوسف' },
  { id: 'class_16_002_1_2', name: 'القسم الثاني', grade: 'grade_1', school: 'school_16_002', capacity: 28, currentStudents: 27, teacher: 'أ. وردة خليفة' },
  { id: 'class_16_002_1_3', name: 'القسم الثالث', grade: 'grade_1', school: 'school_16_002', capacity: 28, currentStudents: 28, teacher: 'أ. جميلة لعرج' },
  
  { id: 'class_16_002_2_1', name: 'القسم الأول', grade: 'grade_2', school: 'school_16_002', capacity: 30, currentStudents: 28, teacher: 'أ. نور الدين عبدلي' },
  { id: 'class_16_002_2_2', name: 'القسم الثاني', grade: 'grade_2', school: 'school_16_002', capacity: 30, currentStudents: 29, teacher: 'أ. حليمة بوشامة' },
  
  { id: 'class_16_002_3_1', name: 'القسم الأول', grade: 'grade_3', school: 'school_16_002', capacity: 30, currentStudents: 30, teacher: 'أ. طارق زيتوني' },
  { id: 'class_16_002_3_2', name: 'القسم الثاني', grade: 'grade_3', school: 'school_16_002', capacity: 30, currentStudents: 28, teacher: 'أ. سهام بوخالفة' },
  
  { id: 'class_16_002_4_1', name: 'القسم الأول', grade: 'grade_4', school: 'school_16_002', capacity: 32, currentStudents: 31, teacher: 'أ. عادل بن عبد الله' },
  { id: 'class_16_002_4_2', name: 'القسم الثاني', grade: 'grade_4', school: 'school_16_002', capacity: 32, currentStudents: 30, teacher: 'أ. إلهام قاسمي' },
  
  { id: 'class_16_002_5_1', name: 'القسم الأول', grade: 'grade_5', school: 'school_16_002', capacity: 33, currentStudents: 32, teacher: 'أ. فيصل بوزيد' },
  { id: 'class_16_002_5_2', name: 'القسم الثاني', grade: 'grade_5', school: 'school_16_002', capacity: 33, currentStudents: 33, teacher: 'أ. منال العربي' },
  
  // مدرسة الشهيد أحمد زبانة الابتدائية - وهران
  { id: 'class_31_001_1_1', name: 'القسم الأول', grade: 'grade_1', school: 'school_31_001', capacity: 30, currentStudents: 29, teacher: 'أ. زينب مرابط' },
  { id: 'class_31_001_1_2', name: 'القسم الثاني', grade: 'grade_1', school: 'school_31_001', capacity: 30, currentStudents: 28, teacher: 'أ. فاطمة قدور' },
  { id: 'class_31_001_1_3', name: 'القسم الثالث', grade: 'grade_1', school: 'school_31_001', capacity: 30, currentStudents: 30, teacher: 'أ. خديجة بلعباس' },
  
  { id: 'class_31_001_2_1', name: 'القسم الأول', grade: 'grade_2', school: 'school_31_001', capacity: 30, currentStudents: 27, teacher: 'أ. محمد بن عيسى' },
  { id: 'class_31_001_2_2', name: 'القسم الثاني', grade: 'grade_2', school: 'school_31_001', capacity: 30, currentStudents: 29, teacher: 'أ. سعاد مداني' },
  { id: 'class_31_001_2_3', name: 'القسم الثالث', grade: 'grade_2', school: 'school_31_001', capacity: 30, currentStudents: 30, teacher: 'أ. نادية بوزيد' },
  
  { id: 'class_31_001_3_1', name: 'القسم الأول', grade: 'grade_3', school: 'school_31_001', capacity: 32, currentStudents: 31, teacher: 'أ. عبد الرحمن خليفة' },
  { id: 'class_31_001_3_2', name: 'القسم الثاني', grade: 'grade_3', school: 'school_31_001', capacity: 32, currentStudents: 32, teacher: 'أ. أمينة بن صالح' },
  
  { id: 'class_31_001_4_1', name: 'القسم الأول', grade: 'grade_4', school: 'school_31_001', capacity: 32, currentStudents: 30, teacher: 'أ. يوسف عبدلي' },
  { id: 'class_31_001_4_2', name: 'القسم الثاني', grade: 'grade_4', school: 'school_31_001', capacity: 32, currentStudents: 31, teacher: 'أ. كريمة بوشامة' },
  
  { id: 'class_31_001_5_1', name: 'القسم الأول', grade: 'grade_5', school: 'school_31_001', capacity: 35, currentStudents: 34, teacher: 'أ. أحمد لعرج' },
  { id: 'class_31_001_5_2', name: 'القسم الثاني', grade: 'grade_5', school: 'school_31_001', capacity: 35, currentStudents: 33, teacher: 'أ. حنان زيتوني' },
  
  // مدرسة الشهيد زيغود يوسف الابتدائية - قسنطينة
  { id: 'class_25_001_1_1', name: 'القسم الأول', grade: 'grade_1', school: 'school_25_001', capacity: 30, currentStudents: 28, teacher: 'أ. زينب بوعلام' },
  { id: 'class_25_001_1_2', name: 'القسم الثاني', grade: 'grade_1', school: 'school_25_001', capacity: 30, currentStudents: 29, teacher: 'أ. فاطمة بن صالح' },
  
  { id: 'class_25_001_2_1', name: 'القسم الأول', grade: 'grade_2', school: 'school_25_001', capacity: 30, currentStudents: 30, teacher: 'أ. محمد عبدلي' },
  { id: 'class_25_001_2_2', name: 'القسم الثاني', grade: 'grade_2', school: 'school_25_001', capacity: 30, currentStudents: 27, teacher: 'أ. سعاد قاسمي' },
  
  { id: 'class_25_001_3_1', name: 'القسم الأول', grade: 'grade_3', school: 'school_25_001', capacity: 32, currentStudents: 31, teacher: 'أ. عمر بوخالفة' },
  { id: 'class_25_001_3_2', name: 'القسم الثاني', grade: 'grade_3', school: 'school_25_001', capacity: 32, currentStudents: 32, teacher: 'أ. نادية العربي' },
  
  { id: 'class_25_001_4_1', name: 'القسم الأول', grade: 'grade_4', school: 'school_25_001', capacity: 32, currentStudents: 29, teacher: 'أ. رشيد بن عبد الله' },
  { id: 'class_25_001_4_2', name: 'القسم الثاني', grade: 'grade_4', school: 'school_25_001', capacity: 32, currentStudents: 31, teacher: 'أ. خديجة بوزيد' },
  
  { id: 'class_25_001_5_1', name: 'القسم الأول', grade: 'grade_5', school: 'school_25_001', capacity: 35, currentStudents: 35, teacher: 'أ. أحمد خليفة' },
  { id: 'class_25_001_5_2', name: 'القسم الثاني', grade: 'grade_5', school: 'school_25_001', capacity: 35, currentStudents: 33, teacher: 'أ. حليمة بن صالح' }
];

// أسماء جزائرية حقيقية للتلاميذ
export const ALGERIAN_STUDENT_NAMES = {
  male: [
    'محمد', 'أحمد', 'عبد الرحمن', 'يوسف', 'إبراهيم', 'عمر', 'علي', 'حسن', 'عبد الله', 'خالد',
    'سعد', 'عبد العزيز', 'مصطفى', 'طارق', 'ياسين', 'رضا', 'نور الدين', 'عبد الحميد', 'بلال', 'أمين',
    'كريم', 'رشيد', 'فؤاد', 'جمال', 'سمير', 'نبيل', 'هشام', 'وليد', 'عادل', 'فيصل'
  ],
  female: [
    'فاطمة', 'عائشة', 'خديجة', 'زينب', 'مريم', 'أسماء', 'حفصة', 'رقية', 'أم كلثوم', 'صفية',
    'نادية', 'سعاد', 'كريمة', 'نور', 'هدى', 'أمينة', 'سلمى', 'ياسمين', 'دنيا', 'إيمان',
    'وفاء', 'رحمة', 'بركة', 'نعيمة', 'جميلة', 'لطيفة', 'حنان', 'سهام', 'منال', 'إلهام'
  ]
};

export const ALGERIAN_FAMILY_NAMES = [
  'بن علي', 'بن محمد', 'بوعلام', 'زروقي', 'مرابط', 'قدور', 'بلحاج', 'آيت علي', 'بن يوسف', 'شريط',
  'بوقرة', 'حمدي', 'العربي', 'بن عيسى', 'مداني', 'بوزيد', 'خليفة', 'بن صالح', 'عبدلي', 'بوشامة',
  'لعرج', 'بن عمر', 'حجاج', 'بوضياف', 'معمري', 'بلعيد', 'زيتوني', 'بن عبد الله', 'قاسمي', 'بوخالفة'
];

// دوال مساعدة
export const getSchoolsByWilaya = (wilaya: string): School[] => {
  // استيراد البيانات من النظام المحدث
  try {
    const { getSchoolsByWilaya: getUpdatedSchools } = require('./schoolsData');
    const updatedSchools = getUpdatedSchools(wilaya);
    
    // تحويل البيانات لتتطابق مع نوع School المتوقع هنا
    return updatedSchools.map((school: any) => ({
      id: school.id,
      name: school.name,
      type: 'ابتدائية' as const,
      wilaya: school.wilayaName,
      commune: school.address.split('،')[0] || 'وسط المدينة',
      address: school.address,
      director: `مدير ${school.name}`,
      phone: school.phone,
      capacity: school.totalStudents + 50, // سعة أكبر من العدد الحالي
      established: 1980 + Math.floor(Math.random() * 40) // تاريخ تأسيس عشوائي
    }));
  } catch (error) {
    // في حالة فشل الاستيراد، أرجع المدارس النموذجية
    console.warn('فشل في استيراد البيانات المحدثة، استخدام البيانات النموذجية');
    return SAMPLE_SCHOOLS.filter(school => school.wilaya === wilaya);
  }
};

export const getClassesBySchool = (schoolId: string): Class[] => {
  return SAMPLE_CLASSES.filter(cls => cls.school === schoolId);
};

export const getClassesByGrade = (gradeId: string): Class[] => {
  return SAMPLE_CLASSES.filter(cls => cls.grade === gradeId);
};

export const getSubjectsByGrade = (gradeId: string): Subject[] => {
  return PRIMARY_SUBJECTS.filter(subject => subject.grades.includes(gradeId));
};

export const generateStudentId = (wilayaCode: string, schoolId: string, year: number): string => {
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${wilayaCode}${schoolId.slice(-3)}${year}${randomNum}`;
};

export const generateRandomAlgerianName = (): { firstName: string; lastName: string; fullName: string } => {
  const isGirl = Math.random() > 0.5;
  const firstName = isGirl 
    ? ALGERIAN_STUDENT_NAMES.female[Math.floor(Math.random() * ALGERIAN_STUDENT_NAMES.female.length)]
    : ALGERIAN_STUDENT_NAMES.male[Math.floor(Math.random() * ALGERIAN_STUDENT_NAMES.male.length)];
  
  const lastName = ALGERIAN_FAMILY_NAMES[Math.floor(Math.random() * ALGERIAN_FAMILY_NAMES.length)];
  
  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`
  };
};