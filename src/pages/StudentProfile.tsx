import React, { useState, useEffect } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { User, Camera, Edit, Save, ArrowLeft, Mail, Phone, MapPin, Calendar, BookOpen, Award, Settings, Shield, Bell, Palette } from 'lucide-react';
import { AccountManager } from '../utils/accountManager';
import { PRIMARY_GRADES } from '../data/algerianEducationSystem';
import Breadcrumb from '../components/Breadcrumb';
import RoleBasedLayout from '../components/RoleBasedLayout';

const StudentProfile: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const currentUser = AccountManager.getCurrentUser();
    if (currentUser && currentUser.role === 'student' && currentUser.studentData) {
      setProfileData({
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
        address: currentUser.studentData.address || `${currentUser.wilaya}, الجزائر`,
        birthDate: currentUser.studentData.birthDate,
        grade: currentUser.studentData.gradeName,
        class: currentUser.studentData.className,
        studentId: currentUser.studentData.studentId,
        parentName: currentUser.studentData.parentName,
        parentPhone: currentUser.studentData.parentPhone,
        school: currentUser.schoolName,
        wilaya: currentUser.wilaya,
        avatar: currentUser.name.split(' ')[0][0] + currentUser.name.split(' ')[1]?.[0] || '',
        bio: `طالب في ${currentUser.studentData.gradeName} بمدرسة ${currentUser.schoolName}، أسعى لتحقيق أفضل النتائج الأكاديمية.`
      });
    }
  }, []);

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'ar',
    notifications: {
      homework: true,
      grades: true,
      messages: true,
      achievements: false
    },
    privacy: {
      showProfile: true,
      showGrades: false,
      showAchievements: true
    }
  });

  const [achievements] = useState([
    { id: 1, name: 'طالب الشهر', icon: '🏆', date: '2024-01-15', description: 'حصل على لقب طالب الشهر' },
    { id: 2, name: 'متفوق في الرياضيات', icon: '🔢', date: '2024-01-10', description: 'حصل على أعلى درجة في الرياضيات' },
    { id: 3, name: 'مشارك نشط', icon: '🎯', date: '2024-01-05', description: 'شارك في جميع الأنشطة المدرسية' }
  ]);

  const [stats] = useState({
    totalPoints: 2450,
    currentLevel: 15,
    completedAssignments: 48,
    averageGrade: 16.5,
    attendanceRate: 95,
    achievementsCount: 12
  });

  const handleSave = () => {
    showInfo('إشعار', 'تم حفظ التغييرات بنجاح!');
    setIsEditing(false);
  };

  const handleAvatarChange = () => {
    const avatars = ['👦', '👧', '🧑', '👨‍🎓', '👩‍🎓', '🤓', '😊', '🌟'];
    const currentIndex = avatars.indexOf(profileData.avatar);
    const nextIndex = (currentIndex + 1) % avatars.length;
    setProfileData({ ...profileData, avatar: avatars[nextIndex] });
  };

  const handleNotificationChange = (key: string) => {
    setPreferences({
      ...preferences,
      notifications: {
        ...preferences.notifications,
        [key]: !preferences.notifications[key as keyof typeof preferences.notifications]
      }
    });
  };

  const handlePrivacyChange = (key: string) => {
    setPreferences({
      ...preferences,
      privacy: {
        ...preferences.privacy,
        [key]: !preferences.privacy[key as keyof typeof preferences.privacy]
      }
    });
  };

  const tabs = [
    { id: 'personal', name: 'المعلومات الشخصية', icon: User },
    { id: 'academic', name: 'المعلومات الأكاديمية', icon: BookOpen },
    { id: 'achievements', name: 'الإنجازات', icon: Award },
    { id: 'settings', name: 'الإعدادات', icon: Settings }
  ];

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل الملف الشخصي...</p>
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
          { label: 'ملفي الشخصي', icon: '👤' }
        ]} />

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
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
                <h1 className="text-3xl font-bold mb-2">👤 الملف الشخصي</h1>
                <p className="text-blue-100">إدارة معلوماتك الشخصية والإعدادات</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg hover:bg-white/30 transition-colors flex items-center"
            >
              {isEditing ? <Save className="h-5 w-5 ml-2" /> : <Edit className="h-5 w-5 ml-2" />}
              {isEditing ? 'حفظ' : 'تعديل'}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="relative inline-block mb-4">
                <div className="text-8xl mb-4">{profileData.avatar}</div>
                {isEditing && (
                  <button
                    onClick={handleAvatarChange}
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{profileData.name}</h2>
              <p className="text-gray-600 mb-4">{profileData.grade} - {profileData.class}</p>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="text-2xl font-bold text-blue-600">{stats.totalPoints}</div>
                <div className="text-sm text-gray-600">النقاط الإجمالية</div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-green-600">{stats.averageGrade}</div>
                  <div className="text-xs text-gray-600">المعدل</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-purple-600">{stats.attendanceRate}%</div>
                  <div className="text-xs text-gray-600">الحضور</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg mb-8">
              <div className="flex border-b border-gray-200">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-4 px-6 text-center transition-colors flex items-center justify-center ${
                        activeTab === tab.id
                          ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-4 w-4 ml-2" />
                      {tab.name}
                    </button>
                  );
                })}
              </div>

              <div className="p-6">
                {/* Personal Information Tab */}
                {activeTab === 'personal' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">المعلومات الشخصية</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profileData.name}
                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-lg flex items-center">
                            <User className="h-4 w-4 text-gray-600 ml-2" />
                            {profileData.name}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-lg flex items-center">
                            <Mail className="h-4 w-4 text-gray-600 ml-2" />
                            {profileData.email}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-lg flex items-center">
                            <Phone className="h-4 w-4 text-gray-600 ml-2" />
                            {profileData.phone}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الميلاد</label>
                        {isEditing ? (
                          <input
                            type="date"
                            value={profileData.birthDate}
                            onChange={(e) => setProfileData({...profileData, birthDate: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-lg flex items-center">
                            <Calendar className="h-4 w-4 text-gray-600 ml-2" />
                            {new Date(profileData.birthDate).toLocaleDateString('ar-SA')}
                          </div>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profileData.address}
                            onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-lg flex items-center">
                            <MapPin className="h-4 w-4 text-gray-600 ml-2" />
                            {profileData.address}
                          </div>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">نبذة شخصية</label>
                        {isEditing ? (
                          <textarea
                            value={profileData.bio}
                            onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-lg">
                            {profileData.bio}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-semibold text-gray-800 mb-4">معلومات ولي الأمر</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">اسم ولي الأمر</label>
                          <div className="p-3 bg-gray-50 rounded-lg flex items-center">
                            <User className="h-4 w-4 text-gray-600 ml-2" />
                            {profileData.parentName}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">هاتف ولي الأمر</label>
                          <div className="p-3 bg-gray-50 rounded-lg flex items-center">
                            <Phone className="h-4 w-4 text-gray-600 ml-2" />
                            {profileData.parentPhone}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Academic Information Tab */}
                {activeTab === 'academic' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">المعلومات الأكاديمية</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-blue-600">{profileData.grade}</div>
                        <div className="text-sm text-gray-600">المستوى الدراسي</div>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-4 text-center">
                        <User className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-green-600">{profileData.class}</div>
                        <div className="text-sm text-gray-600">الفوج</div>
                      </div>

                      <div className="bg-purple-50 rounded-lg p-4 text-center">
                        <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <div className="text-lg font-bold text-purple-600">{profileData.studentId}</div>
                        <div className="text-sm text-gray-600">رقم الطالب</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white border rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-gray-800">{stats.completedAssignments}</div>
                        <div className="text-sm text-gray-600">واجب مكتمل</div>
                      </div>
                      
                      <div className="bg-white border rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-gray-800">{stats.averageGrade}</div>
                        <div className="text-sm text-gray-600">المعدل العام</div>
                      </div>

                      <div className="bg-white border rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-gray-800">{stats.attendanceRate}%</div>
                        <div className="text-sm text-gray-600">نسبة الحضور</div>
                      </div>

                      <div className="bg-white border rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-gray-800">{stats.currentLevel}</div>
                        <div className="text-sm text-gray-600">المستوى الحالي</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Achievements Tab */}
                {activeTab === 'achievements' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">الإنجازات والجوائز</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {achievements.map((achievement) => (
                        <div key={achievement.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
                          <div className="text-center mb-3">
                            <div className="text-4xl mb-2">{achievement.icon}</div>
                            <h4 className="font-bold text-gray-800">{achievement.name}</h4>
                          </div>
                          <p className="text-sm text-gray-600 text-center mb-2">{achievement.description}</p>
                          <div className="text-xs text-gray-500 text-center">
                            {new Date(achievement.date).toLocaleDateString('ar-SA')}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-50 rounded-lg p-6 text-center">
                      <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h4 className="text-lg font-bold text-gray-800 mb-2">إجمالي الإنجازات</h4>
                      <div className="text-3xl font-bold text-blue-600">{stats.achievementsCount}</div>
                      <p className="text-gray-600 mt-2">استمر في العمل الجاد لكسب المزيد من الإنجازات!</p>
                    </div>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">الإعدادات</h3>
                    
                    {/* Theme Settings */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <Palette className="h-4 w-4 ml-2" />
                        المظهر
                      </h4>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="theme"
                            value="light"
                            checked={preferences.theme === 'light'}
                            onChange={(e) => setPreferences({...preferences, theme: e.target.value})}
                            className="ml-2"
                          />
                          <span>المظهر الفاتح</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="theme"
                            value="dark"
                            checked={preferences.theme === 'dark'}
                            onChange={(e) => setPreferences({...preferences, theme: e.target.value})}
                            className="ml-2"
                          />
                          <span>المظهر الداكن</span>
                        </label>
                      </div>
                    </div>

                    {/* Notification Settings */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <Bell className="h-4 w-4 ml-2" />
                        الإشعارات
                      </h4>
                      <div className="space-y-3">
                        {Object.entries(preferences.notifications).map(([key, value]) => (
                          <label key={key} className="flex items-center justify-between">
                            <span>
                              {key === 'homework' ? 'إشعارات الواجبات' :
                               key === 'grades' ? 'إشعارات الدرجات' :
                               key === 'messages' ? 'إشعارات الرسائل' :
                               'إشعارات الإنجازات'}
                            </span>
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={() => handleNotificationChange(key)}
                              className="toggle"
                            />
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Privacy Settings */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <Shield className="h-4 w-4 ml-2" />
                        الخصوصية
                      </h4>
                      <div className="space-y-3">
                        {Object.entries(preferences.privacy).map(([key, value]) => (
                          <label key={key} className="flex items-center justify-between">
                            <span>
                              {key === 'showProfile' ? 'إظهار الملف الشخصي' :
                               key === 'showGrades' ? 'إظهار الدرجات' :
                               'إظهار الإنجازات'}
                            </span>
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={() => handlePrivacyChange(key)}
                              className="toggle"
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="text-center">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
                >
                  <Save className="h-5 w-5 ml-2" />
                  حفظ التغييرات
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </RoleBasedLayout>
  );
};

export default StudentProfile;