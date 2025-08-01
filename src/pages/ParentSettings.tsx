import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { User, Bell, Shield, Palette, Users, Save, ArrowLeft, Camera, Mail, Phone, MapPin, Calendar, UserPlus, Trash2 } from 'lucide-react';

const ParentSettings: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo, showConfirm } = useNotification();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'محمد أحمد علي',
    email: 'mohamed.ahmed@parent.edu.dz',
    phone: '0555-999-000',
    address: 'الجزائر العاصمة، الجزائر',
    occupation: 'مهندس',
    avatar: '👨‍💼',
    emergencyContact: '0555-888-777',
    relationship: 'والد'
  });

  const [children, setChildren] = useState([
    {
      id: 1,
      name: 'أحمد محمد',
      grade: 'السنة الثالثة متوسط',
      class: 'فوج أ',
      avatar: '👦',
      notifications: {
        grades: true,
        homework: true,
        attendance: true,
        behavior: true,
        meetings: true
      }
    },
    {
      id: 2,
      name: 'فاطمة محمد',
      grade: 'السنة الأولى متوسط',
      class: 'فوج ب',
      avatar: '👧',
      notifications: {
        grades: true,
        homework: false,
        attendance: true,
        behavior: true,
        meetings: true
      }
    }
  ]);

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'ar',
    timezone: 'Africa/Algiers',
    dateFormat: 'dd/mm/yyyy',
    notifications: {
      email: true,
      sms: false,
      push: true,
      weeklyReports: true,
      monthlyReports: true,
      emergencyAlerts: true,
      meetingReminders: true,
      paymentReminders: true
    },
    privacy: {
      shareContactInfo: false,
      allowTeacherMessages: true,
      showInDirectory: false,
      shareEmergencyContact: true
    },
    reports: {
      frequency: 'weekly',
      includeGrades: true,
      includeAttendance: true,
      includeBehavior: true,
      includeHomework: true,
      emailDelivery: true
    }
  });

  const tabs = [
    { id: 'profile', name: 'الملف الشخصي', icon: User },
    { id: 'children', name: 'الأطفال', icon: Users },
    { id: 'notifications', name: 'الإشعارات', icon: Bell },
    { id: 'privacy', name: 'الخصوصية', icon: Shield },
    { id: 'reports', name: 'التقارير', icon: Calendar },
    { id: 'appearance', name: 'المظهر', icon: Palette }
  ];

  const handleSave = () => {
    showSuccess('تم الحفظ', 'تم حفظ الإعدادات بنجاح!');
    setIsEditing(false);
  };

  const handleAvatarChange = () => {
    const avatars = ['👨‍💼', '👩‍💼', '👨', '👩', '🧑', '😊', '🌟', '👤'];
    const currentIndex = avatars.indexOf(profileData.avatar);
    const nextIndex = (currentIndex + 1) % avatars.length;
    setProfileData({ ...profileData, avatar: avatars[nextIndex] });
  };

  const handleChildAvatarChange = (childId: number) => {
    const avatars = ['👦', '👧', '🧒', '😊', '🌟', '👤'];
    const child = children.find(c => c.id === childId);
    if (child) {
      const currentIndex = avatars.indexOf(child.avatar);
      const nextIndex = (currentIndex + 1) % avatars.length;
      setChildren(children.map(c => 
        c.id === childId ? { ...c, avatar: avatars[nextIndex] } : c
      ));
    }
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

  const handleChildNotificationChange = (childId: number, key: string) => {
    setChildren(children.map(child => 
      child.id === childId 
        ? {
            ...child,
            notifications: {
              ...child.notifications,
              [key]: !child.notifications[key as keyof typeof child.notifications]
            }
          }
        : child
    ));
  };

  const handleAddChild = () => {
    const newChild = {
      id: Date.now(),
      name: 'طفل جديد',
      grade: 'السنة الأولى متوسط',
      class: 'فوج أ',
      avatar: '👤',
      notifications: {
        grades: true,
        homework: true,
        attendance: true,
        behavior: true,
        meetings: true
      }
    };
    setChildren([...children, newChild]);
  };

  const handleRemoveChild = async (childId: number) => {
    const confirmed = await showConfirm(
      'تأكيد الحذف',
      'هل أنت متأكد من حذف هذا الطفل؟'
    );
    if (confirmed) {
      setChildren(children.filter(child => child.id !== childId));
      showSuccess('تم الحذف', 'تم حذف الطفل من القائمة');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
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
                <p className="text-purple-100">إدارة إعداداتك وإعدادات أطفالك</p>
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
                    className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors"
                  >
                    <Camera className="h-3 w-3" />
                  </button>
                </div>
                <h3 className="text-lg font-bold text-gray-800">{profileData.name}</h3>
                <p className="text-gray-600">{profileData.relationship}</p>
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
                          ? 'bg-purple-100 text-purple-800 border-r-4 border-purple-500'
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
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
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
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg flex items-center">
                          <Phone className="h-4 w-4 text-gray-600 ml-2" />
                          {profileData.phone}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">المهنة</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.occupation}
                          onChange={(e) => setProfileData({...profileData, occupation: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          {profileData.occupation}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">رقم الطوارئ</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={profileData.emergencyContact}
                          onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg flex items-center">
                          <Phone className="h-4 w-4 text-gray-600 ml-2" />
                          {profileData.emergencyContact}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">صلة القرابة</label>
                      {isEditing ? (
                        <select
                          value={profileData.relationship}
                          onChange={(e) => setProfileData({...profileData, relationship: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="والد">والد</option>
                          <option value="والدة">والدة</option>
                          <option value="وصي">وصي</option>
                          <option value="جد">جد</option>
                          <option value="جدة">جدة</option>
                        </select>
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          {profileData.relationship}
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
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg flex items-center">
                          <MapPin className="h-4 w-4 text-gray-600 ml-2" />
                          {profileData.address}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Children Tab */}
              {activeTab === 'children' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">إدارة الأطفال</h2>
                    <button
                      onClick={handleAddChild}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                    >
                      <UserPlus className="h-4 w-4 ml-2" />
                      إضافة طفل
                    </button>
                  </div>

                  <div className="space-y-6">
                    {children.map((child) => (
                      <div key={child.id} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="relative">
                              <div className="text-4xl ml-4">{child.avatar}</div>
                              <button
                                onClick={() => handleChildAvatarChange(child.id)}
                                className="absolute bottom-0 right-0 bg-purple-600 text-white p-1 rounded-full hover:bg-purple-700 transition-colors"
                              >
                                <Camera className="h-2 w-2" />
                              </button>
                            </div>
                            <div>
                              <input
                                type="text"
                                value={child.name}
                                onChange={(e) => setChildren(children.map(c => 
                                  c.id === child.id ? { ...c, name: e.target.value } : c
                                ))}
                                className="text-lg font-bold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-2"
                              />
                              <p className="text-gray-600">{child.grade} - {child.class}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveChild(child.id)}
                            className="text-red-600 hover:text-red-800 p-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">إعدادات الإشعارات</h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {Object.entries(child.notifications).map(([key, value]) => (
                              <label key={key} className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={value}
                                  onChange={() => handleChildNotificationChange(child.id, key)}
                                  className="ml-2"
                                />
                                <span className="text-sm">
                                  {key === 'grades' ? 'الدرجات' :
                                   key === 'homework' ? 'الواجبات' :
                                   key === 'attendance' ? 'الحضور' :
                                   key === 'behavior' ? 'السلوك' :
                                   'الاجتماعات'}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
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
                            {key === 'email' ? 'إشعارات البريد الإلكتروني' :
                             key === 'sms' ? 'إشعارات الرسائل النصية' :
                             key === 'push' ? 'الإشعارات الفورية' :
                             key === 'weeklyReports' ? 'التقارير الأسبوعية' :
                             key === 'monthlyReports' ? 'التقارير الشهرية' :
                             key === 'emergencyAlerts' ? 'تنبيهات الطوارئ' :
                             key === 'meetingReminders' ? 'تذكيرات الاجتماعات' :
                             'تذكيرات الدفع'}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {key === 'email' ? 'استقبال الإشعارات عبر البريد الإلكتروني' :
                             key === 'sms' ? 'استقبال الإشعارات عبر الرسائل النصية' :
                             key === 'push' ? 'إشعارات فورية على الجهاز' :
                             key === 'weeklyReports' ? 'تقرير أسبوعي عن أداء الأطفال' :
                             key === 'monthlyReports' ? 'تقرير شهري مفصل' :
                             key === 'emergencyAlerts' ? 'تنبيهات عاجلة في حالات الطوارئ' :
                             key === 'meetingReminders' ? 'تذكير بمواعيد الاجتماعات' :
                             'تذكير بمواعيد الدفع والرسوم'}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={() => handleNotificationChange(key)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
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
                            {key === 'shareContactInfo' ? 'مشاركة معلومات الاتصال' :
                             key === 'allowTeacherMessages' ? 'السماح برسائل المعلمين' :
                             key === 'showInDirectory' ? 'الظهور في دليل أولياء الأمور' :
                             'مشاركة رقم الطوارئ'}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {key === 'shareContactInfo' ? 'السماح للمعلمين برؤية معلومات الاتصال' :
                             key === 'allowTeacherMessages' ? 'السماح للمعلمين بإرسال رسائل مباشرة' :
                             key === 'showInDirectory' ? 'إظهار اسمك في دليل أولياء الأمور' :
                             'مشاركة رقم الطوارئ مع إدارة المدرسة'}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={() => handlePrivacyChange(key)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reports Tab */}
              {activeTab === 'reports' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">إعدادات التقارير</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">تكرار التقارير</label>
                      <select
                        value={preferences.reports.frequency}
                        onChange={(e) => setPreferences({
                          ...preferences,
                          reports: { ...preferences.reports, frequency: e.target.value }
                        })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="daily">يومي</option>
                        <option value="weekly">أسبوعي</option>
                        <option value="monthly">شهري</option>
                        <option value="quarterly">ربع سنوي</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">طريقة التسليم</label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={preferences.reports.emailDelivery}
                            onChange={(e) => setPreferences({
                              ...preferences,
                              reports: { ...preferences.reports, emailDelivery: e.target.checked }
                            })}
                            className="ml-2"
                          />
                          <span>البريد الإلكتروني</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">محتوى التقارير</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(preferences.reports).filter(([key]) => 
                        ['includeGrades', 'includeAttendance', 'includeBehavior', 'includeHomework'].includes(key)
                      ).map(([key, value]) => (
                        <label key={key} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={value as boolean}
                            onChange={(e) => setPreferences({
                              ...preferences,
                              reports: { ...preferences.reports, [key]: e.target.checked }
                            })}
                            className="ml-2"
                          />
                          <span className="text-sm">
                            {key === 'includeGrades' ? 'الدرجات' :
                             key === 'includeAttendance' ? 'الحضور' :
                             key === 'includeBehavior' ? 'السلوك' :
                             'الواجبات'}
                          </span>
                        </label>
                      ))}
                    </div>
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="dd/mm/yyyy">يوم/شهر/سنة</option>
                        <option value="mm/dd/yyyy">شهر/يوم/سنة</option>
                        <option value="yyyy-mm-dd">سنة-شهر-يوم</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentSettings;