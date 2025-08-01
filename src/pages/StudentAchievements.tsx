import React, { useState, useEffect } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { Trophy, Star, Award, TrendingUp, Calendar, Coins, Zap, BookOpen, Users, Brain, MapPin, Crown, ShoppingCart } from 'lucide-react';
import { AccountManager } from '../utils/accountManager';
import { PRIMARY_GRADES } from '../data/algerianEducationSystem';
import Breadcrumb from '../components/Breadcrumb';
import RoleBasedLayout from '../components/RoleBasedLayout';

const StudentAchievements: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [activeTab, setActiveTab] = useState<'badges' | 'stats' | 'avatar'>('badges');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'academic' | 'behavior' | 'creativity' | 'persistence'>('all');
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<any>(null);

  const [selectedShopItem, setSelectedShopItem] = useState<any>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [studentData, setStudentData] = useState<any>(null);

  useEffect(() => {
    const currentUser = AccountManager.getCurrentUser();
    if (currentUser && currentUser.role === 'student' && currentUser.studentData) {
      const grade = PRIMARY_GRADES.find(g => g.id === currentUser.studentData!.grade);
      
      setStudentData({
        name: currentUser.name,
        grade: currentUser.studentData.gradeName,
        school: currentUser.schoolName,
        level: Math.floor(Math.random() * 10 + 10),
        totalPoints: Math.floor(Math.random() * 2000 + 1000),
        dinarsEarned: Math.floor(Math.random() * 200 + 50),
        nextLevelPoints: Math.floor(Math.random() * 500 + 2500),
        subjects: grade?.subjects || [],
        avatarItems: {
          hat: 'قبعة الطالب المجتهد',
          shirt: `قميص ${currentUser.studentData.gradeName}`,
          background: `خلفية ${currentUser.wilaya}`
        }
      });
    }
  }, []);

  const badges = [
    {
      id: 1,
      title: 'مستكشف الجزائر',
      description: 'أكمل 10 دروس في التاريخ والجغرافيا',
      icon: MapPin,
      color: 'green',
      category: 'academic',
      earned: true,
      earnedDate: '2024-01-10',
      rarity: 'common',
      points: 50
    },
    {
      id: 2,
      title: 'عالم الرياضيات',
      description: 'حل 50 مسألة رياضية بنجاح',
      icon: Brain,
      color: 'blue',
      category: 'academic',
      earned: true,
      earnedDate: '2024-01-08',
      rarity: 'rare',
      points: 100
    },
    {
      id: 3,
      title: 'محب اللغة العربية',
      description: 'أكمل 20 درساً في اللغة العربية',
      icon: BookOpen,
      color: 'red',
      category: 'academic',
      earned: true,
      earnedDate: '2024-01-05',
      rarity: 'common',
      points: 75
    },
    {
      id: 4,
      title: 'رائد الإنجليزية',
      description: 'أول من يتعلم اللغة الإنجليزية الجديدة',
      icon: Star,
      color: 'purple',
      category: 'academic',
      earned: Math.random() > 0.5,
      earnedDate: '2024-01-12',
      rarity: 'legendary',
      points: 200
    },
    {
      id: 5,
      title: 'عالم صغير',
      description: 'أكمل 15 تجربة في التربية العلمية والتكنولوجية',
      icon: Zap,
      color: 'yellow',
      category: 'academic',
      earned: Math.random() > 0.3,
      earnedDate: '2024-01-15',
      rarity: 'rare',
      points: 120
    },
    {
      id: 6,
      title: 'مؤمن صالح',
      description: 'حفظ 10 سور قرآنية في التربية الإسلامية',
      icon: Award,
      color: 'emerald',
      category: 'academic',
      earned: true,
      earnedDate: '2024-01-03',
      rarity: 'rare',
      points: 150
    },
    {
      id: 7,
      title: 'مواطن صالح',
      description: 'أكمل جميع دروس التربية المدنية',
      icon: Users,
      color: 'orange',
      category: 'behavior',
      earned: Math.random() > 0.4,
      earnedDate: '2024-01-18',
      rarity: 'common',
      points: 80
    },
    {
      id: 8,
      title: 'فنان مبدع',
      description: 'أكمل 10 أعمال في التربية الفنية',
      icon: Award,
      color: 'pink',
      category: 'creativity',
      earned: Math.random() > 0.6,
      earnedDate: '2024-01-20',
      rarity: 'common',
      points: 60
    },
    {
      id: 9,
      title: 'رياضي نشيط',
      description: 'شارك في 15 حصة تربية بدنية',
      icon: Trophy,
      color: 'cyan',
      category: 'behavior',
      earned: true,
      earnedDate: '2024-01-14',
      rarity: 'common',
      points: 70
    }
  ];

  const handleViewBadge = (badge: any) => {
    setSelectedBadge(badge);
    setShowBadgeModal(true);
  };

  const handlePurchaseItem = (item: any) => {
    if (studentData && studentData.dinarsEarned >= item.price) {
      showSuccess('تم بنجاح', `تم شراء ${item.name} بنجاح!`);
      setStudentData({
        ...studentData,
        dinarsEarned: studentData.dinarsEarned - item.price
      });
    } else {
      showError('خطأ', 'ليس لديك دنانير كافية لشراء هذا العنصر!');
    }
    setShowPurchaseModal(false);
  };

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل الإنجازات...</p>
        </div>
      </div>
    );
  }

  return (
    <RoleBasedLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'الرئيسية', path: '/student-dashboard', icon: '🏠' },
          { label: 'إنجازاتي', icon: '🏆' }
        ]} />

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">🏆 إنجازاتي</h1>
              <p className="text-blue-100">{studentData.name} - {studentData.grade}</p>
              <p className="text-blue-200 text-sm">{studentData.school}</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">المستوى {studentData.level}</div>
                <div className="text-sm">
                  {studentData.totalPoints}/{studentData.nextLevelPoints} نقطة
                </div>
                <div className="w-24 bg-white/30 rounded-full h-2 mt-2">
                  <div 
                    className="bg-white h-2 rounded-full"
                    style={{ width: `${(studentData.totalPoints / studentData.nextLevelPoints) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Achievement Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge) => (
            <div
              key={badge.id}
              onClick={() => handleViewBadge(badge)}
              className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                badge.earned ? 'border-2 border-green-300' : 'border-2 border-gray-200 opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`text-4xl p-3 rounded-full bg-${badge.color}-100`}>
                  <badge.icon className={`h-8 w-8 text-${badge.color}-600`} />
                </div>
                {badge.earned && (
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    مُحقق
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2">{badge.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{badge.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {badge.points} نقطة
                </div>
                {badge.earned && (
                  <div className="text-sm text-green-600 font-medium">
                    {badge.earnedDate}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </RoleBasedLayout>
  );
};

export default StudentAchievements;