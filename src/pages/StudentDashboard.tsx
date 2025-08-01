import React, { useState, useEffect } from 'react';
import { MapPin, Star, Trophy, Coins, BookOpen, Target, Clock, Play, Zap, Brain, Gift, ShoppingCart } from 'lucide-react';
import { AccountManager } from '../utils/accountManager';
import { PRIMARY_SUBJECTS, PRIMARY_GRADES } from '../data/algerianEducationSystem';
import QuickActions from '../components/QuickActions';
import { studentQuickActions } from '../data/quickActions';
import { useNotification } from '../contexts/NotificationContext';
import LessonModal, { LessonData } from '../components/LessonModal';

// Types
interface Achievement {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
}

interface Province {
  name: string;
  completed: boolean;
  lessons: number;
  current?: boolean;
  description: string;
  landmarks: string[];
}

interface Reward {
  name: string;
  cost: number;
}

interface StudentData {
  name: string;
  grade: string;
  school: string;
  currentLocation: string;
  studentId: string;
  class: string;
  subjects: string[];
  totalPoints: number;
  dinarsEarned: number;
  completedLessons: number;
  currentStreak: number;
  nextLesson: {
    subject: string;
    title: string;
    duration: string;
    difficulty: string;
  };
  recentAchievements: Achievement[];
  weeklyProgress: Array<{
    day: string;
    lessons: number;
    points: number;
  }>;
}

// دالة مساعدة لإنتاج عناوين الدروس حسب المادة والصف
const getNextLessonTitle = (subject: string, grade: string) => {
  const lessonTitles: { [key: string]: { [key: string]: string } } = {
    'اللغة العربية': {
      'grade_1': 'تعلم الحروف الهجائية',
      'grade_2': 'قراءة الكلمات البسيطة',
      'grade_3': 'قواعد اللغة الأساسية',
      'grade_4': 'التعبير الكتابي',
      'grade_5': 'النصوص الأدبية'
    },
    'الرياضيات': {
      'grade_1': 'الأعداد من 0 إلى 9',
      'grade_2': 'الجمع والطرح',
      'grade_3': 'الضرب والقسمة',
      'grade_4': 'الكسور العادية',
      'grade_5': 'الهندسة والقياس'
    },
    'التربية الإسلامية': {
      'grade_1': 'أركان الإسلام',
      'grade_2': 'السيرة النبوية',
      'grade_3': 'الوضوء والصلاة',
      'grade_4': 'قصص الأنبياء',
      'grade_5': 'الأخلاق الإسلامية'
    }
  };
  
  return lessonTitles[subject]?.[grade] || 'الدرس القادم';
};

const StudentDashboard: React.FC = () => {
  const { showSuccess, showError, showInfo } = useNotification();
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [showProvinceModal, setShowProvinceModal] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [showRewardModal, setShowRewardModal] = useState(false);
  
  const [studentData, setStudentData] = useState<StudentData | null>(null);

  useEffect(() => {
    const currentUser = AccountManager.getCurrentUser();
    if (currentUser && currentUser.role === 'student' && currentUser.studentData) {
      const grade = PRIMARY_GRADES.find(g => g.id === currentUser.studentData!.grade);
      const subjects = grade ? grade.subjects : [];
      
      setStudentData({
        name: currentUser.name,
        grade: currentUser.studentData.gradeName,
        school: currentUser.schoolName,
        currentLocation: currentUser.wilaya,
        studentId: currentUser.studentData.studentId,
        class: currentUser.studentData.className,
        subjects: subjects,
        totalPoints: 2450,
        dinarsEarned: 180,
        completedLessons: 45,
        currentStreak: 7,
        nextLesson: {
          subject: subjects[0] || 'اللغة العربية',
          title: getNextLessonTitle(subjects[0] || 'اللغة العربية', currentUser.studentData.grade),
          duration: '25 دقيقة',
          difficulty: 'متوسط'
        },
        recentAchievements: [
          { id: 1, title: 'مستكشف الجزائر', icon: MapPin, color: 'green', description: 'أكمل 10 دروس في الجغرافيا' },
          { id: 2, title: 'عالم الرياضيات', icon: Brain, color: 'blue', description: 'حل 50 مسألة رياضية' },
          { id: 3, title: 'نجم الأسبوع', icon: Star, color: 'yellow', description: 'الأول في الفصل هذا الأسبوع' }
        ],
        weeklyProgress: [
          { day: 'الأحد', lessons: 3, points: 150 },
          { day: 'الاثنين', lessons: 2, points: 100 },
          { day: 'الثلاثاء', lessons: 4, points: 200 },
          { day: 'الأربعاء', lessons: 3, points: 150 },
          { day: 'الخميس', lessons: 5, points: 250 },
          { day: 'الجمعة', lessons: 0, points: 0 },
          { day: 'السبت', lessons: 1, points: 50 }
        ]
      });
    }
  }, []);

  const algeriaProvinces = [
    { name: 'الجزائر العاصمة', completed: true, lessons: 12, description: 'عاصمة الجزائر وأكبر مدنها', landmarks: ['مقام الشهيد', 'القصبة', 'الحديقة النباتية'] },
    { name: 'وهران', completed: true, lessons: 8, description: 'عاصمة الغرب الجزائري', landmarks: ['قلعة سانتا كروز', 'المسرح الجهوي', 'واجهة البحر'] },
    { name: 'قسنطينة', completed: false, lessons: 3, current: true, description: 'مدينة الجسور المعلقة', landmarks: ['جسر سيدي مسيد', 'قصر الباي', 'مسجد الأمير عبد القادر'] },
    { name: 'عنابة', completed: false, lessons: 0, description: 'ميناء الحديد والصلب', landmarks: ['كنيسة القديس أوغسطين', 'المتحف الأثري', 'شاطئ عنابة'] },
    { name: 'سطيف', completed: false, lessons: 0, description: 'عاصمة الهضاب العليا', landmarks: ['متنزه التسلية', 'مسجد أبو بكر الصديق', 'عين الفوارة'] }
  ];

  const handleStartLesson = () => {
    setShowLessonModal(true);
  };

  const handleCompleteLesson = (points: number, dinars: number) => {
    setStudentData(prev => prev ? ({
      ...prev,
      totalPoints: prev.totalPoints + points,
      dinarsEarned: prev.dinarsEarned + dinars,
      completedLessons: prev.completedLessons + 1
    }) : null);
    setShowLessonModal(false);
    showSuccess(
      'تهانينا! تم إكمال المهمة بنجاح! 🎉',
      `لقد حصلت على ${points} نقطة و ${dinars} دينار معرفي!`
    );
  };

  const handleViewAchievement = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setShowAchievementModal(true);
  };

  const handleViewProvince = (province: Province) => {
    setSelectedProvince(province);
    setShowProvinceModal(true);
  };

  const handleClaimReward = (reward: Reward) => {
    if (studentData && studentData.dinarsEarned >= reward.cost) {
      setStudentData(prev => prev ? ({
        ...prev,
        dinarsEarned: prev.dinarsEarned - reward.cost
      }) : null);
      showSuccess('تم استلام المكافأة!', `تهانينا! تم استلام ${reward.name}!`);
    } else if (studentData) {
      showError(
        'دنانير غير كافية',
        `تحتاج إلى ${reward.cost - studentData.dinarsEarned} دينار معرفي إضافي!`
      );
    }
  };

  const handleClaimDailyReward = () => {
    setStudentData(prev => prev ? ({
      ...prev,
      totalPoints: prev.totalPoints + 100,
      dinarsEarned: prev.dinarsEarned + 10
    }) : null);
    setShowRewardModal(false);
    showSuccess(
      'تهانينا! تم استلام المكافأة اليومية!',
      '+100 نقطة و +10 دنانير معرفية'
    );
  };

  const handleViewAllSubjects = () => {
    showInfo('جاري التحميل', 'جاري الانتقال إلى صفحة المواد الدراسية...');
  };

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل بيانات الطالب...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-red-600 text-white p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">مرحباً {studentData.name}! 👋</h1>
              <p className="text-green-100">{studentData.grade} - {studentData.school}</p>
              <p className="text-green-200 text-sm mt-1">
                {studentData.class} | رقم التلميذ: {studentData.studentId}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="h-6 w-6 text-yellow-300 ml-2" />
                  <span className="text-2xl font-bold">{studentData.currentStreak}</span>
                </div>
                <p className="text-sm">أيام متتالية</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Algeria Map Journey */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <MapPin className="h-8 w-8 text-green-600 ml-3" />
                <h2 className="text-2xl font-bold text-gray-800">رحلة المستكشف الجزائري</h2>
              </div>
              
              <div className="bg-gradient-to-br from-green-100 to-red-100 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">موقعك الحالي</h3>
                    <p className="text-gray-600">{studentData.currentLocation}</p>
                  </div>
                  <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {algeriaProvinces.map((province, index) => (
                    <button
                      key={index}
                      onClick={() => handleViewProvince(province)}
                      className={`p-3 rounded-lg text-center transition-all hover:scale-105 ${
                        province.completed
                          ? 'bg-green-200 text-green-800 hover:bg-green-300'
                          : province.current
                          ? 'bg-yellow-200 text-yellow-800 ring-2 ring-yellow-400 hover:bg-yellow-300'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      <div className="text-sm font-medium mb-1">{province.name}</div>
                      <div className="text-xs">
                        {province.completed ? '✅ مكتملة' : `${province.lessons} دروس`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">التقدم الإجمالي</h4>
                <div className="w-full bg-blue-200 rounded-full h-3 mb-2">
                  <div className="bg-blue-600 h-3 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="text-sm text-blue-700">23 من 48 ولاية مكتملة (45%)</p>
              </div>
            </div>

            {/* Next Lesson */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">المهمة التالية</h2>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  موصى به
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{studentData.nextLesson.title}</h3>
                    <p className="text-gray-600 mb-2">{studentData.nextLesson.subject}</p>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 ml-1" />
                        {studentData.nextLesson.duration}
                      </div>
                      <div className="flex items-center">
                        <Target className="h-4 w-4 ml-1" />
                        {studentData.nextLesson.difficulty}
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <button 
                  onClick={handleStartLesson}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center font-semibold"
                >
                  <Play className="h-5 w-5 ml-2" />
                  ابدأ الدرس الآن
                </button>
              </div>
            </div>

            {/* Subjects */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">المواد الدراسية</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {studentData.subjects.map((subject: string, index: number) => {
                  const subjectData = PRIMARY_SUBJECTS.find(s => s.arabicName === subject);
                  const progress = Math.floor(Math.random() * 100); // تقدم عشوائي للعرض
                  
                  return (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="text-center">
                        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                          <BookOpen className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-800 text-sm mb-2">{subject}</h3>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600">{progress}% مكتمل</p>
                        {subjectData && (
                          <p className="text-xs text-gray-500 mt-1">{subjectData.weeklyHours} ساعة/أسبوع</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <button
                onClick={handleViewAllSubjects}
                className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                عرض جميع المواد
              </button>
            </div>

            {/* Weekly Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">تقدمك هذا الأسبوع</h2>
              
              <div className="grid grid-cols-7 gap-2">
                {studentData.weeklyProgress.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm font-medium text-gray-600 mb-2">{day.day}</div>
                    <div className={`h-20 rounded-lg flex flex-col items-center justify-center ${
                      day.lessons > 0 ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <div className={`text-lg font-bold ${
                        day.lessons > 0 ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        {day.lessons}
                      </div>
                      <div className="text-xs text-gray-500">دروس</div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{day.points} نقطة</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{studentData.totalPoints}</div>
                <div className="text-sm text-gray-600">نقطة إجمالية</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Coins className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{studentData.dinarsEarned}</div>
                <div className="text-sm text-gray-600">دينار معرفي</div>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">إنجازات حديثة</h3>
              <div className="space-y-4">
                {studentData.recentAchievements.map((achievement) => (
                  <button
                    key={achievement.id}
                    onClick={() => handleViewAchievement(achievement)}
                    className="w-full flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className={`bg-${achievement.color}-100 w-10 h-10 rounded-full flex items-center justify-center ml-3 flex-shrink-0`}>
                      <achievement.icon className={`h-5 w-5 text-${achievement.color}-600`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">{achievement.title}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">إجراءات سريعة</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => showInfo('جاري التحميل', 'جاري تحميل الدروس السابقة...')}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center"
                >
                  <BookOpen className="h-4 w-4 ml-2" />
                  مراجعة الدروس السابقة
                </button>
                <button 
                  onClick={() => handleClaimReward({ name: 'المكافأة اليومية', cost: 0 })}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center justify-center"
                >
                  <Gift className="h-4 w-4 ml-2" />
                  المكافأة اليومية
                </button>
                <button 
                  onClick={() => showInfo('قريباً', 'متجر الدينار المعرفي قريباً!')}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm flex items-center justify-center"
                >
                  <ShoppingCart className="h-4 w-4 ml-2" />
                  متجر الدينار المعرفي
                </button>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">ترتيب الفصل</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-yellow-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ml-2">1</div>
                    <span className="text-sm font-medium">أنت</span>
                  </div>
                  <span className="text-sm text-gray-600">2450 نقطة</span>
                </div>
                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center">
                    <div className="bg-gray-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ml-2">2</div>
                    <span className="text-sm">فاطمة</span>
                  </div>
                  <span className="text-sm text-gray-600">2380 نقطة</span>
                </div>
                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center">
                    <div className="bg-orange-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ml-2">3</div>
                    <span className="text-sm">محمد</span>
                  </div>
                  <span className="text-sm text-gray-600">2250 نقطة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <QuickActions actions={studentQuickActions} />

      {/* Lesson Modal */}
      {showLessonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{studentData.nextLesson.title}</h3>
              <p className="text-gray-600">{studentData.nextLesson.subject}</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">محتوى الدرس:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• مقدمة عن المعادلات</li>
                  <li>• حل المعادلات البسيطة</li>
                  <li>• تمارين تطبيقية</li>
                  <li>• اختبار قصير</li>
                </ul>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 ml-1" />
                  {studentData.nextLesson.duration}
                </div>
                <div className="flex items-center">
                  <Target className="h-4 w-4 ml-1" />
                  {studentData.nextLesson.difficulty}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 rtl:space-x-reverse">
              <button
                onClick={() => setShowLessonModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={handleCompleteLesson}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                إكمال الدرس
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Achievement Modal */}
      {showAchievementModal && selectedAchievement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className={`bg-${selectedAchievement.color}-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <selectedAchievement.icon className={`h-8 w-8 text-${selectedAchievement.color}-600`} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedAchievement.title}</h3>
              <p className="text-gray-600">{selectedAchievement.description}</p>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center mb-2">
                <Trophy className="h-6 w-6 text-yellow-600 ml-2" />
                <span className="font-semibold text-gray-800">مكافأة الإنجاز</span>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">+100 نقطة</div>
                <div className="text-sm text-gray-600">+10 دنانير معرفية</div>
              </div>
            </div>
            
            <button
              onClick={() => setShowAchievementModal(false)}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              رائع!
            </button>
          </div>
        </div>
      )}

      {/* Province Modal */}
      {showProvinceModal && selectedProvince && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedProvince.name}</h3>
              <p className="text-gray-600">{selectedProvince.description}</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">المعالم الشهيرة:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {selectedProvince.landmarks?.map((landmark: string, index: number) => (
                    <li key={index}>• {landmark}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">التقدم:</span>
                <span className={`text-sm font-semibold ${
                  selectedProvince.completed ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {selectedProvince.completed ? 'مكتملة ✅' : `${selectedProvince.lessons} دروس متاحة`}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-3 rtl:space-x-reverse">
              <button
                onClick={() => setShowProvinceModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إغلاق
              </button>
              {!selectedProvince.completed && (
                <button
                  onClick={() => {
                    setShowProvinceModal(false);
                    showSuccess('بدء الرحلة!', `🚀 بدء رحلة استكشاف ${selectedProvince.name}!`);
                  }}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  ابدأ الرحلة
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reward Modal */}
      {showRewardModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">المكافأة اليومية</h3>
              <p className="text-gray-600">استلم مكافأتك اليومية واستمر في التعلم!</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6 text-center">
              <div className="text-3xl mb-2">🎁</div>
              <div className="text-2xl font-bold text-green-600 mb-1">+100 نقطة</div>
              <div className="text-lg font-semibold text-blue-600">+10 دنانير معرفية</div>
            </div>
            
            <div className="flex space-x-3 rtl:space-x-reverse">
              <button
                onClick={() => setShowRewardModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                لاحقاً
              </button>
              <button
                onClick={handleClaimDailyReward}
                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-green-700 hover:to-blue-700 transition-colors"
              >
                استلام المكافأة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lesson Modal */}
      <LessonModal
        isOpen={showLessonModal}
        onClose={() => setShowLessonModal(false)}
        onComplete={handleCompleteLesson}
        lessonData={{
          id: 'math_addition_5',
          title: studentData?.nextLesson.title || 'مهمة فريق الأبطال الخمسة!',
          subject: studentData?.nextLesson.subject || 'الرياضيات',
          duration: studentData?.nextLesson.duration || '25 دقيقة',
          difficulty: studentData?.nextLesson.difficulty || 'متوسط',
          description: 'تعلم الجمع بإضافة العدد 5 من خلال مغامرة فضائية مثيرة مع فريق الأبطال الخمسة',
          objectives: [
            'إتقان عملية الجمع بإضافة العدد 5',
            'استخدام استراتيجية العد التصاعدي',
            'حل المسائل الرياضية بثقة',
            'تطبيق المفهوم في مواقف مختلفة'
          ],
          activities: [
            {
              id: 1,
              type: 'drag-drop',
              title: 'شاحن الطاقة',
              description: 'اسحب كبسولة طاقة الأبطال (+5) إلى الشاحن',
              content: {
                baseNumber: 4,
                targetNumber: 9,
                options: [7, 9, 11]
              },
              completed: false
            },
            {
              id: 2,
              type: 'multiple-choice',
              title: 'تدمير الكويكبات',
              description: 'اختر الكويكب الذي يحمل الإجابة الصحيحة',
              content: {
                equation: '6 + 5 = ?',
                options: [10, 11, 12],
                correct: 11
              },
              completed: false
            },
            {
              id: 3,
              type: 'input',
              title: 'تفعيل الدرع',
              description: 'أدخل العدد الإجمالي لوحدات الطاقة',
              content: {
                baseNumber: 7,
                addNumber: 5,
                correctAnswer: 12
              },
              completed: false
            },
            {
              id: 4,
              type: 'matching',
              title: 'توصيل خطوط الطاقة',
              description: 'صل كل محطة طاقة بمحطة الاستقبال الصحيحة',
              content: {
                pairs: [
                  { left: 2, right: 7 },
                  { left: 8, right: 13 },
                  { left: 1, right: 6 }
                ]
              },
              completed: false
            },
            {
              id: 5,
              type: 'simulation',
              title: 'ضبط سرعة السفينة',
              description: 'استخدم أزرار التحكم للوصول إلى السرعة المطلوبة',
              content: {
                currentSpeed: 1,
                targetSpeed: 11,
                boostValue: 5
              },
              completed: false
            }
          ],
          rewards: {
            points: 250,
            dinars: 25,
            badges: ['خبير طاقة الأبطال الخمسة', 'مستكشف الفضاء', 'بطل الرياضيات']
          }
        }}
      />
    </div>
  );
};

export default StudentDashboard;