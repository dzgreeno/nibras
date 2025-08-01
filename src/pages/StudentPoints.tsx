import React, { useState, useEffect } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { Coins, Star, TrendingUp, Calendar, Award, Target, Zap, Gift, BarChart3, Clock, ArrowLeft, Trophy, BookOpen, CheckCircle } from 'lucide-react';
import { AccountManager } from '../utils/accountManager';
import Breadcrumb from '../components/Breadcrumb';
import RoleBasedLayout from '../components/RoleBasedLayout';

const StudentPoints: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState<any>(null);

  const [studentData, setStudentData] = useState<any>(null);

  useEffect(() => {
    const currentUser = AccountManager.getCurrentUser();
    if (currentUser && currentUser.role === 'student' && currentUser.studentData) {
      setStudentData({
        name: currentUser.name,
        grade: currentUser.studentData.gradeName,
        school: currentUser.schoolName,
        studentId: currentUser.studentData.studentId,
        totalPoints: 2450,
        dinarsEarned: 180,
        weeklyPoints: 350,
        monthlyPoints: 1200,
        rank: 3,
        totalStudents: 156,
        pointsToNextLevel: 550,
        currentLevel: 8,
        streak: 7
      });
    }
  }, []);

  const pointsHistory = {
    week: [
      { date: '2024-01-15', activity: 'إكمال درس الرياضيات', points: 50, dinars: 5, type: 'lesson' },
      { date: '2024-01-15', activity: 'حل واجب اللغة العربية', points: 30, dinars: 3, type: 'homework' },
      { date: '2024-01-14', activity: 'اختبار الفيزياء - درجة ممتازة', points: 100, dinars: 10, type: 'exam' },
      { date: '2024-01-14', activity: 'مشاركة في النقاش', points: 20, dinars: 2, type: 'participation' },
      { date: '2024-01-13', activity: 'إكمال درس التاريخ', points: 50, dinars: 5, type: 'lesson' },
      { date: '2024-01-13', activity: 'مكافأة الحضور المنتظم', points: 25, dinars: 2, type: 'bonus' },
      { date: '2024-01-12', activity: 'حل تمارين الكيمياء', points: 40, dinars: 4, type: 'exercise' },
      { date: '2024-01-11', activity: 'إكمال درس الجغرافيا', points: 35, dinars: 3, type: 'lesson' }
    ],
    month: [
      { week: 'الأسبوع الأول', points: 280, dinars: 28 },
      { week: 'الأسبوع الثاني', points: 320, dinars: 32 },
      { week: 'الأسبوع الثالثة', points: 250, dinars: 25 },
      { week: 'الأسبوع الحالي', points: 350, dinars: 35 }
    ]
  };

  const achievements = [
    { id: 1, title: 'مستكشف المعرفة', description: 'أكمل 50 درساً', icon: BookOpen, color: 'blue', progress: 45, target: 50, reward: 100 },
    { id: 2, title: 'عاشق الرياضيات', description: 'احصل على 20 درجة ممتازة في الرياضيات', icon: Target, color: 'green', progress: 15, target: 20, reward: 150 },
    { id: 3, title: 'النجم المتألق', description: 'احصل على 1000 نقطة في شهر واحد', icon: Star, color: 'yellow', progress: 800, target: 1000, reward: 200 },
    { id: 4, title: 'المثابر', description: 'حافظ على سلسلة 30 يوم متتالي', icon: Zap, color: 'purple', progress: 7, target: 30, reward: 300 }
  ];

  const rewards = [
    { id: 1, name: 'قلم ذهبي', cost: 100, description: 'قلم مميز للكتابة', icon: '✒️', available: true },
    { id: 2, name: 'دفتر خاص', cost: 80, description: 'دفتر بتصميم جميل', icon: '📔', available: true },
    { id: 3, name: 'شارة التميز', cost: 150, description: 'شارة تظهر على ملفك الشخصي', icon: '🏆', available: true },
    { id: 4, name: 'ساعة إضافية للاختبار', cost: 200, description: 'وقت إضافي في الاختبارات', icon: '⏰', available: true },
    { id: 5, name: 'لقب خاص', cost: 300, description: 'لقب مميز يظهر باسمك', icon: '👑', available: false },
    { id: 6, name: 'رحلة تعليمية', cost: 500, description: 'رحلة مع الفصل', icon: '🚌', available: false }
  ];

  const levelBenefits = [
    { level: 1, title: 'المبتدئ', benefits: ['الوصول للدروس الأساسية'] },
    { level: 5, title: 'الطالب النشط', benefits: ['فتح المتجر', 'مكافآت يومية'] },
    { level: 10, title: 'الباحث', benefits: ['دروس متقدمة', 'مضاعف النقاط x1.2'] },
    { level: 15, title: 'العالم الصغير', benefits: ['اختبارات خاصة', 'مضاعف النقاط x1.5'] },
    { level: 20, title: 'النجم المتألق', benefits: ['محتوى حصري', 'مضاعف النقاط x2'] }
  ];

  const handleClaimReward = (reward: any) => {
    if (studentData.dinarsEarned >= reward.cost) {
      setSelectedReward(reward);
      setShowRewardModal(true);
    }
  };

  const confirmRewardClaim = () => {
    if (selectedReward && studentData.dinarsEarned >= selectedReward.cost) {
      setStudentData(prev => ({
        ...prev,
        dinarsEarned: prev.dinarsEarned - selectedReward.cost
      }));
      setShowRewardModal(false);
      showSuccess('مكافأة!', `تم استلام ${selectedReward.name} بنجاح!`);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lesson': return <BookOpen className="h-4 w-4" />;
      case 'homework': return <CheckCircle className="h-4 w-4" />;
      case 'exam': return <Award className="h-4 w-4" />;
      case 'participation': return <Star className="h-4 w-4" />;
      case 'bonus': return <Gift className="h-4 w-4" />;
      case 'exercise': return <Target className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'lesson': return 'blue';
      case 'homework': return 'green';
      case 'exam': return 'purple';
      case 'participation': return 'yellow';
      case 'bonus': return 'pink';
      case 'exercise': return 'indigo';
      default: return 'gray';
    }
  };

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل النقاط...</p>
        </div>
      </div>
    );
  }

  return (
    <RoleBasedLayout>
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-green-50">
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'الرئيسية', path: '/student-dashboard', icon: '🏠' },
        { label: 'الدينار المعرفي', icon: '💰' }
      ]} />

      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-green-600 text-white p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => window.history.back()}
                className="ml-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-3xl font-bold mb-2">💰 النقاط والدنانير المعرفية</h1>
                <p className="text-yellow-100">{studentData.name} - {studentData.grade}</p>
                <p className="text-yellow-200 text-sm">{studentData.school}</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold mb-1">المستوى {studentData.currentLevel}</div>
                <div className="text-sm">🔥 {studentData.streak} أيام متتالية</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{studentData.totalPoints}</div>
                <div className="text-sm text-gray-600">إجمالي النقاط</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Coins className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{studentData.dinarsEarned}</div>
                <div className="text-sm text-gray-600">دينار معرفي</div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">#{studentData.rank}</div>
                <div className="text-sm text-gray-600">الترتيب</div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{studentData.weeklyPoints}</div>
                <div className="text-sm text-gray-600">نقاط الأسبوع</div>
              </div>
            </div>

            {/* Level Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">تقدم المستوى</h2>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">المستوى {studentData.currentLevel}</h3>
                    <p className="text-gray-600">تحتاج {studentData.pointsToNextLevel} نقطة للمستوى التالي</p>
                  </div>
                  <div className="text-4xl">🎯</div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${((3000 - studentData.pointsToNextLevel) / 3000) * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{3000 - studentData.pointsToNextLevel} نقطة</span>
                  <span>3000 نقطة</span>
                </div>
              </div>

              {/* Level Benefits */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-700 mb-4">مزايا المستويات:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {levelBenefits.map((level, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        studentData.currentLevel >= level.level
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <span className={`text-lg font-bold ${
                          studentData.currentLevel >= level.level ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          {level.level}
                        </span>
                        <span className="mr-2 font-medium">{level.title}</span>
                        {studentData.currentLevel >= level.level && (
                          <CheckCircle className="h-4 w-4 text-green-600 mr-auto" />
                        )}
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {level.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center">
                            <span className="w-2 h-2 bg-gray-400 rounded-full ml-2"></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Points History */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">سجل النقاط</h2>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setSelectedPeriod('week')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedPeriod === 'week'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    الأسبوع
                  </button>
                  <button
                    onClick={() => setSelectedPeriod('month')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedPeriod === 'month'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    الشهر
                  </button>
                </div>
              </div>

              {selectedPeriod === 'week' ? (
                <div className="space-y-4">
                  {pointsHistory.week.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg bg-${getActivityColor(activity.type)}-100 text-${getActivityColor(activity.type)}-600 ml-4`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{activity.activity}</h4>
                          <p className="text-sm text-gray-500">{activity.date}</p>
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="flex items-center text-yellow-600 mb-1">
                          <Star className="h-4 w-4 ml-1" />
                          <span className="font-bold">+{activity.points}</span>
                        </div>
                        <div className="flex items-center text-green-600">
                          <Coins className="h-4 w-4 ml-1" />
                          <span className="font-bold">+{activity.dinars}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {pointsHistory.month.map((week, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="p-2 rounded-lg bg-blue-100 text-blue-600 ml-4">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{week.week}</h4>
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="flex items-center text-yellow-600 mb-1">
                          <Star className="h-4 w-4 ml-1" />
                          <span className="font-bold">{week.points}</span>
                        </div>
                        <div className="flex items-center text-green-600">
                          <Coins className="h-4 w-4 ml-1" />
                          <span className="font-bold">{week.dinars}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">الإنجازات القريبة</h3>
              <div className="space-y-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  const progress = (achievement.progress / achievement.target) * 100;
                  
                  return (
                    <div key={achievement.id} className="border rounded-lg p-4">
                      <div className="flex items-start mb-3">
                        <div className={`p-2 rounded-lg bg-${achievement.color}-100 text-${achievement.color}-600 ml-3`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>{achievement.progress}/{achievement.target}</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`bg-${achievement.color}-600 h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">المكافأة:</span>
                        <div className="flex items-center text-yellow-600">
                          <Star className="h-4 w-4 ml-1" />
                          <span className="font-bold">{achievement.reward}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rewards Store */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">متجر المكافآت</h3>
              <div className="space-y-3">
                {rewards.slice(0, 4).map((reward) => (
                  <div key={reward.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <span className="text-2xl ml-3">{reward.icon}</span>
                      <div>
                        <h4 className="font-medium text-gray-800">{reward.name}</h4>
                        <p className="text-xs text-gray-500">{reward.description}</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="flex items-center text-green-600 mb-1">
                        <Coins className="h-3 w-3 ml-1" />
                        <span className="text-sm font-bold">{reward.cost}</span>
                      </div>
                      <button
                        onClick={() => handleClaimReward(reward)}
                        disabled={!reward.available || studentData.dinarsEarned < reward.cost}
                        className={`text-xs px-2 py-1 rounded ${
                          reward.available && studentData.dinarsEarned >= reward.cost
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {reward.available ? 'استلام' : 'مغلق'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                عرض المزيد
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reward Modal */}
      {showRewardModal && selectedReward && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">استلام المكافأة</h3>
            
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{selectedReward.icon}</div>
              <h4 className="text-lg font-semibold text-gray-800">{selectedReward.name}</h4>
              <p className="text-gray-600 mt-2">{selectedReward.description}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span>التكلفة:</span>
                <div className="flex items-center">
                  <Coins className="h-4 w-4 text-green-600 ml-1" />
                  <span className="font-bold">{selectedReward.cost}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span>رصيدك الحالي:</span>
                <div className="flex items-center">
                  <Coins className="h-4 w-4 text-green-600 ml-1" />
                  <span className="font-bold">{studentData.dinarsEarned}</span>
                </div>
              </div>
              <hr className="my-2" />
              <div className="flex items-center justify-between font-bold">
                <span>الرصيد بعد الاستلام:</span>
                <div className="flex items-center">
                  <Coins className="h-4 w-4 text-green-600 ml-1" />
                  <span>{studentData.dinarsEarned - selectedReward.cost}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 rtl:space-x-reverse">
              <button
                onClick={() => setShowRewardModal(false)}
                className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={confirmRewardClaim}
                className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                استلام المكافأة
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </RoleBasedLayout>
  );
};

export default StudentPoints;