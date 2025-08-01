import React, { useState, useEffect } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { Settings, User, Bell, Shield, Palette, Globe, Save, ArrowLeft, Camera, Mail, Phone, MapPin, Calendar, BookOpen, Clock } from 'lucide-react';
import { AccountManager } from '../utils/accountManager';
import Breadcrumb from '../components/Breadcrumb';
import RoleBasedLayout from '../components/RoleBasedLayout';

const TeacherSettings: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const currentUser = AccountManager.getCurrentUser();
    if (currentUser && currentUser.role === 'teacher' && currentUser.teacherData) {
      setProfileData({
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
        address: `${currentUser.wilaya}, الجزائر`,
        birthDate: '1985-03-20', // بيانات افتراضية
        specialization: currentUser.teacherData.specialization,
        subjects: currentUser.teacherData.subjects,
        experience: currentUser.teacherData.experience,
        qualification: currentUser.teacherData.qualification,
        teacherId: currentUser.teacherData.teacherId,
        school: currentUser.schoolName,
        wilaya: currentUser.wilaya,
        joinDate: '2020-09-01', // بيانات افتراضية
        avatar: currentUser.name.split(' ')[0][0] + currentUser.name.split(' ')[1]?.[0] || '',
        bio: `معلم ${currentUser.teacherData.specialization} في مدرسة ${currentUser.schoolName}، أسعى لتطوير مهارات الطلاب التعليمية.`
      });
    }
  }, []);

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'ar',
    timezone: 'Africa/Algiers',
    dateFormat: 'dd/mm/yyyy',
    notifications: {
      newMessages: true,
      gradeReminders: true,
      meetingAlerts: true,
      systemUpdates: false,
      parentRequests: true,
      assignmentDeadlines: true
    },
    privacy: {
      showProfile: true,
      showContactInfo: false,
      allowParentMessages: true,
      showSchedule: true
    },
    teaching: {
      autoSaveGrades: true,
      showStudentPhotos: true,
      enableQuickGrading: true,
      defaultGradingScale: '20',
      homeworkReminders: true,
      attendanceAlerts: true
    }
  });

  const [classSettings, setClassSettings] = useState({
    defaultClassDuration: 45,
    breakDuration: 15,
    maxStudentsPerClass: 30,
    gradingDeadline: 7,
    homeworkSubmissionTime: '23:59',
    lateSubmissionPenalty: 10,
    attendanceGracePeriod: 10
  });

  const tabs = [
    { id: 'profile', name: 'الملف الشخصي', icon: User },
    { id: 'notifications', name: 'الإشعارات', icon: Bell },
    { id: 'privacy', name: 'الخصوصية', icon: Shield },
    { id: 'teaching', name: 'إعدادات التدريس', icon: BookOpen },
    { id: 'appearance', name: 'المظهر', icon: Palette },
    { id: 'system', name: 'النظام', icon: Settings }
  ];

  const handleSave = () => {
    showSuccess('تم الحفظ', 'تم حفظ الإعدادات بنجاح!');
    setIsEditing(false);
  };

  const handleAvatarChange = () => {
    const avatars = ['👩‍🏫', '👨‍🏫', '🧑‍🏫', '👩‍💼', '👨‍💼', '🤓', '😊', '🌟'];
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

  const handleTeachingChange = (key: string) => {
    setPreferences({
      ...preferences,
      teaching: {
        ...preferences.teaching,
        [key]: !preferences.teaching[key as keyof typeof preferences.teaching]
      }
    });
  };

  return (
    <RoleBasedLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'الرئيسية', path: '/teacher-dashboard', icon: '🏠' },
          { label: 'الإعدادات', icon: '⚙️' }
        ]} />
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
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
                <h1 className="text-3xl font-bold mb-2">⚙️ الإعدادات</h1>
                <p className="text-green-100">إدارة إعداداتك الشخصية والمهنية</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg hover:bg-white/30 transition-colors flex items-center"
            >
              <Save className="h-5 w-5 ml-2" />
              حفظ التغييرات
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="text-6xl mb-3">{profileData.avatar}</div>
                  <button
                    onClick={handleAvatarChange}
                    className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
                  >
                    <Camera className="h-3 w-3" />
                  </button>
                </div>
                <h3 className="text-lg font-bold text-gray-800">{profileData.name}</h3>
                <p className="text-gray-600">{profileData.subject}</p>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-right p-3 rounded-lg transition-colors flex items-center ${
                        activeTab === tab.id
                          ? 'bg-green-100 text-green-800 border-r-4 border-green-500'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <Icon className="h-4 w-4 ml-3" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">الملف الشخصي</h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      {isEditing ? 'إلغاء' : 'تعديل'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
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
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
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
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg flex items-center">
                          <Phone className="h-4 w-4 text-gray-600 ml-2" />
                          {profileData.phone}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">المادة التدريسية</label>
                      {isEditing ? (
                        <select
                          value={profileData.subject}
                          onChange={(e) => setProfileData({...profileData, subject: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        >
                          <option value="اللغة العربية">اللغة العربية</option>
                          <option value="الرياضيات">الرياضيات</option>
                          <option value="الفيزياء">الفيزياء</option>
                          <option value="التاريخ">التاريخ</option>
                          <option value="الجغرافيا">الجغرافيا</option>
                        </select>
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg flex items-center">
                          <BookOpen className="h-4 w-4 text-gray-600 ml-2" />
                          {profileData.subject}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">سنوات الخبرة</label>
                      {isEditing ? (
                        <input
                          type="number"
                          value={profileData.experience}
                          onChange={(e) => setProfileData({...profileData, experience: parseInt(e.target.value)})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          {profileData.experience} سنة
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">المؤهل العلمي</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.qualification}
                          onChange={(e) => setProfileData({...profileData, qualification: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          {profileData.qualification}
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
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          {profileData.bio}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">إعدادات الإشعارات</h2>
                  
                  <div className="space-y-4">
                    {Object.entries(preferences.notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {key === 'newMessages' ? 'الرسائل الجديدة' :
                             key === 'gradeReminders' ? 'تذكيرات الدرجات' :
                             key === 'meetingAlerts' ? 'تنبيهات الاجتماعات' :
                             key === 'systemUpdates' ? 'تحديثات النظام' :
                             key === 'parentRequests' ? 'طلبات أولياء الأمور' :
                             'مواعيد تسليم الواجبات'}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {key === 'newMessages' ? 'إشعار عند وصول رسائل جديدة' :
                             key === 'gradeReminders' ? 'تذكير بمواعيد رصد الدرجات' :
                             key === 'meetingAlerts' ? 'تنبيه قبل الاجتماعات' :
                             key === 'systemUpdates' ? 'إشعارات تحديثات النظام' :
                             key === 'parentRequests' ? 'إشعار بطلبات أولياء الأمور' :
                             'تذكير بمواعيد تسليم الواجبات'}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={() => handleNotificationChange(key)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">إعدادات الخصوصية</h2>
                  
                  <div className="space-y-4">
                    {Object.entries(preferences.privacy).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {key === 'showProfile' ? 'إظهار الملف الشخصي' :
                             key === 'showContactInfo' ? 'إظهار معلومات الاتصال' :
                             key === 'allowParentMessages' ? 'السماح برسائل أولياء الأمور' :
                             'إظهار الجدول الزمني'}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {key === 'showProfile' ? 'السماح للطلاب برؤية ملفك الشخصي' :
                             key === 'showContactInfo' ? 'إظهار رقم الهاتف والبريد الإلكتروني' :
                             key === 'allowParentMessages' ? 'السماح لأولياء الأمور بإرسال رسائل مباشرة' :
                             'إظهار جدولك الزمني للطلاب'}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={() => handlePrivacyChange(key)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Teaching Settings Tab */}
              {activeTab === 'teaching' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">إعدادات التدريس</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">مدة الحصة الافتراضية (دقيقة)</label>
                      <input
                        type="number"
                        value={classSettings.defaultClassDuration}
                        onChange={(e) => setClassSettings({...classSettings, defaultClassDuration: parseInt(e.target.value)})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">مقياس التقييم الافتراضي</label>
                      <select
                        value={preferences.teaching.defaultGradingScale}
                        onChange={(e) => setPreferences({
                          ...preferences,
                          teaching: {...preferences.teaching, defaultGradingScale: e.target.value}
                        })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      >
                        <option value="20">من 20</option>
                        <option value="100">من 100</option>
                        <option value="letter">أحرف (A, B, C, D, F)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">موعد تسليم الواجبات</label>
                      <input
                        type="time"
                        value={classSettings.homeworkSubmissionTime}
                        onChange={(e) => setClassSettings({...classSettings, homeworkSubmissionTime: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">خصم التأخير (%)</label>
                      <input
                        type="number"
                        value={classSettings.lateSubmissionPenalty}
                        onChange={(e) => setClassSettings({...classSettings, lateSubmissionPenalty: parseInt(e.target.value)})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {Object.entries(preferences.teaching).filter(([key]) => typeof preferences.teaching[key as keyof typeof preferences.teaching] === 'boolean').map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {key === 'autoSaveGrades' ? 'حفظ الدرجات تلقائياً' :
                             key === 'showStudentPhotos' ? 'إظهار صور الطلاب' :
                             key === 'enableQuickGrading' ? 'تفعيل التقييم السريع' :
                             key === 'homeworkReminders' ? 'تذكيرات الواجبات' :
                             'تنبيهات الحضور'}
                          </h4>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value as boolean}
                            onChange={() => handleTeachingChange(key)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">إعدادات المظهر</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">المظهر</label>
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
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="theme"
                            value="auto"
                            checked={preferences.theme === 'auto'}
                            onChange={(e) => setPreferences({...preferences, theme: e.target.value})}
                            className="ml-2"
                          />
                          <span>تلقائي</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">اللغة</label>
                      <select
                        value={preferences.language}
                        onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      >
                        <option value="ar">العربية</option>
                        <option value="en">English</option>
                        <option value="fr">Français</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">المنطقة الزمنية</label>
                      <select
                        value={preferences.timezone}
                        onChange={(e) => setPreferences({...preferences, timezone: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      >
                        <option value="Africa/Algiers">الجزائر (GMT+1)</option>
                        <option value="Africa/Tunis">تونس (GMT+1)</option>
                        <option value="Africa/Casablanca">المغرب (GMT+1)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">تنسيق التاريخ</label>
                      <select
                        value={preferences.dateFormat}
                        onChange={(e) => setPreferences({...preferences, dateFormat: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      >
                        <option value="dd/mm/yyyy">يوم/شهر/سنة</option>
                        <option value="mm/dd/yyyy">شهر/يوم/سنة</option>
                        <option value="yyyy-mm-dd">سنة-شهر-يوم</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* System Tab */}
              {activeTab === 'system' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">إعدادات النظام</h2>
                  
                  <div className="space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-medium text-yellow-800 mb-2">تصدير البيانات</h4>
                      <p className="text-sm text-yellow-700 mb-3">تحميل نسخة من جميع بياناتك</p>
                      <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                        تصدير البيانات
                      </button>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-800 mb-2">النسخ الاحتياطي</h4>
                      <p className="text-sm text-blue-700 mb-3">إنشاء نسخة احتياطية من إعداداتك</p>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        إنشاء نسخة احتياطية
                      </button>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-medium text-red-800 mb-2">إعادة تعيين الإعدادات</h4>
                      <p className="text-sm text-red-700 mb-3">إعادة جميع الإعدادات إلى القيم الافتراضية</p>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                        إعادة تعيين
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
      </div>
    </RoleBasedLayout>
  );
};

export default TeacherSettings;