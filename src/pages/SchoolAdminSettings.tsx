import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { Settings, School, Users, Database, Shield, Bell, Globe, Save, ArrowLeft, Upload, Download, RefreshCw, AlertTriangle } from 'lucide-react';

const SchoolAdminSettings: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo, showConfirm } = useNotification();
  const [activeTab, setActiveTab] = useState('school');
  const [isLoading, setIsLoading] = useState(false);

  const [schoolInfo, setSchoolInfo] = useState({
    name: 'مدرسة النبراس النموذجية',
    address: 'شارع الاستقلال، الجزائر العاصمة',
    phone: '021-555-0123',
    email: 'info@nibras-school.edu.dz',
    website: 'www.nibras-school.edu.dz',
    logo: '🏫',
    establishedYear: 2010,
    studentCapacity: 1200,
    teacherCapacity: 80,
    principalName: 'د. أحمد بن محمد',
    principalEmail: 'principal@nibras-school.edu.dz',
    academicYear: '2023-2024',
    semester: 'الفصل الأول'
  });

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
    enableTwoFactor: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    passwordRequireSpecial: true,
    autoBackup: true,
    backupFrequency: 'daily',
    dataRetentionPeriod: 365,
    enableAuditLog: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    emergencyAlerts: true,
    systemAlerts: true,
    performanceAlerts: true,
    securityAlerts: true,
    maintenanceNotifications: true,
    reportDelivery: 'email',
    alertThreshold: 80
  });

  const [academicSettings, setAcademicSettings] = useState({
    gradingScale: '20',
    passingGrade: 10,
    attendanceThreshold: 75,
    maxAbsences: 15,
    examDuration: 120,
    homeworkDeadlineDays: 7,
    gradeSubmissionDeadline: 3,
    reportCardFrequency: 'quarterly',
    parentMeetingFrequency: 'monthly',
    enableOnlineExams: true,
    enableHomeworkSubmission: true,
    enableGradePortal: true
  });

  const tabs = [
    { id: 'school', name: 'معلومات المدرسة', icon: School },
    { id: 'users', name: 'إدارة المستخدمين', icon: Users },
    { id: 'academic', name: 'الإعدادات الأكاديمية', icon: Database },
    { id: 'security', name: 'الأمان', icon: Shield },
    { id: 'notifications', name: 'الإشعارات', icon: Bell },
    { id: 'system', name: 'النظام', icon: Settings }
  ];

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    showInfo('إشعار', 'تم حفظ الإعدادات بنجاح!');
  };

  const handleBackup = () => {
    showInfo('إشعار', 'بدء عملية النسخ الاحتياطي...');
  };

  const handleRestore = async () => {
    const confirmed = await showConfirm(
      'تأكيد الاستعادة',
      'هل أنت متأكد من استعادة النسخة الاحتياطية؟ سيتم فقدان البيانات الحالية.'
    );
    if (confirmed) {
      showInfo('إشعار', 'بدء عملية الاستعادة...');
    }
  };

  const handleMaintenanceMode = () => {
    const newMode = !systemSettings.maintenanceMode;
    setSystemSettings({ ...systemSettings, maintenanceMode: newMode });
    showInfo('إشعار', newMode ? 'تم تفعيل وضع الصيانة' : 'تم إلغاء وضع الصيانة');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
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
                <h1 className="text-3xl font-bold mb-2">⚙️ إعدادات النظام</h1>
                <p className="text-indigo-100">إدارة إعدادات المدرسة والنظام</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg hover:bg-white/30 transition-colors flex items-center disabled:opacity-50"
            >
              {isLoading ? (
                <RefreshCw className="h-5 w-5 ml-2 animate-spin" />
              ) : (
                <Save className="h-5 w-5 ml-2" />
              )}
              {isLoading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
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
                <div className="text-6xl mb-3">{schoolInfo.logo}</div>
                <h3 className="text-lg font-bold text-gray-800">{schoolInfo.name}</h3>
                <p className="text-gray-600">إعدادات النظام</p>
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
                          ? 'bg-indigo-100 text-indigo-800 border-r-4 border-indigo-500'
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
              
              {/* School Info Tab */}
              {activeTab === 'school' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">معلومات المدرسة</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">اسم المدرسة</label>
                      <input
                        type="text"
                        value={schoolInfo.name}
                        onChange={(e) => setSchoolInfo({...schoolInfo, name: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">سنة التأسيس</label>
                      <input
                        type="number"
                        value={schoolInfo.establishedYear}
                        onChange={(e) => setSchoolInfo({...schoolInfo, establishedYear: parseInt(e.target.value)})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
                      <input
                        type="text"
                        value={schoolInfo.address}
                        onChange={(e) => setSchoolInfo({...schoolInfo, address: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                      <input
                        type="tel"
                        value={schoolInfo.phone}
                        onChange={(e) => setSchoolInfo({...schoolInfo, phone: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                      <input
                        type="email"
                        value={schoolInfo.email}
                        onChange={(e) => setSchoolInfo({...schoolInfo, email: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الموقع الإلكتروني</label>
                      <input
                        type="url"
                        value={schoolInfo.website}
                        onChange={(e) => setSchoolInfo({...schoolInfo, website: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">اسم المدير</label>
                      <input
                        type="text"
                        value={schoolInfo.principalName}
                        onChange={(e) => setSchoolInfo({...schoolInfo, principalName: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">السعة الاستيعابية للطلاب</label>
                      <input
                        type="number"
                        value={schoolInfo.studentCapacity}
                        onChange={(e) => setSchoolInfo({...schoolInfo, studentCapacity: parseInt(e.target.value)})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">عدد المعلمين المطلوب</label>
                      <input
                        type="number"
                        value={schoolInfo.teacherCapacity}
                        onChange={(e) => setSchoolInfo({...schoolInfo, teacherCapacity: parseInt(e.target.value)})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">السنة الدراسية</label>
                      <input
                        type="text"
                        value={schoolInfo.academicYear}
                        onChange={(e) => setSchoolInfo({...schoolInfo, academicYear: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الفصل الدراسي</label>
                      <select
                        value={schoolInfo.semester}
                        onChange={(e) => setSchoolInfo({...schoolInfo, semester: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="الفصل الأول">الفصل الأول</option>
                        <option value="الفصل الثاني">الفصل الثاني</option>
                        <option value="الفصل الثالث">الفصل الثالث</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Academic Settings Tab */}
              {activeTab === 'academic' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">الإعدادات الأكاديمية</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">نظام التقييم</label>
                      <select
                        value={academicSettings.gradingScale}
                        onChange={(e) => setAcademicSettings({...academicSettings, gradingScale: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="20">من 20</option>
                        <option value="100">من 100</option>
                        <option value="letter">أحرف (A, B, C, D, F)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">درجة النجاح</label>
                      <input
                        type="number"
                        value={academicSettings.passingGrade}
                        onChange={(e) => setAcademicSettings({...academicSettings, passingGrade: parseInt(e.target.value)})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">نسبة الحضور المطلوبة (%)</label>
                      <input
                        type="number"
                        value={academicSettings.attendanceThreshold}
                        onChange={(e) => setAcademicSettings({...academicSettings, attendanceThreshold: parseInt(e.target.value)})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        min="0"
                        max="100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأقصى للغياب</label>
                      <input
                        type="number"
                        value={academicSettings.maxAbsences}
                        onChange={(e) => setAcademicSettings({...academicSettings, maxAbsences: parseInt(e.target.value)})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">مدة الامتحان (دقيقة)</label>
                      <input
                        type="number"
                        value={academicSettings.examDuration}
                        onChange={(e) => setAcademicSettings({...academicSettings, examDuration: parseInt(e.target.value)})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">مهلة تسليم الواجبات (أيام)</label>
                      <input
                        type="number"
                        value={academicSettings.homeworkDeadlineDays}
                        onChange={(e) => setAcademicSettings({...academicSettings, homeworkDeadlineDays: parseInt(e.target.value)})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">تكرار كشف الدرجات</label>
                      <select
                        value={academicSettings.reportCardFrequency}
                        onChange={(e) => setAcademicSettings({...academicSettings, reportCardFrequency: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="monthly">شهري</option>
                        <option value="quarterly">ربع سنوي</option>
                        <option value="semester">نصف سنوي</option>
                        <option value="annual">سنوي</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">تكرار اجتماعات أولياء الأمور</label>
                      <select
                        value={academicSettings.parentMeetingFrequency}
                        onChange={(e) => setAcademicSettings({...academicSettings, parentMeetingFrequency: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="weekly">أسبوعي</option>
                        <option value="monthly">شهري</option>
                        <option value="quarterly">ربع سنوي</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">الميزات الأكاديمية</h4>
                    {Object.entries(academicSettings).filter(([key]) => 
                      ['enableOnlineExams', 'enableHomeworkSubmission', 'enableGradePortal'].includes(key)
                    ).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {key === 'enableOnlineExams' ? 'تفعيل الامتحانات الإلكترونية' :
                             key === 'enableHomeworkSubmission' ? 'تفعيل تسليم الواجبات إلكترونياً' :
                             'تفعيل بوابة الدرجات'}
                          </h4>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value as boolean}
                            onChange={(e) => setAcademicSettings({
                              ...academicSettings,
                              [key]: e.target.checked
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">إعدادات الأمان</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">مهلة انتهاء الجلسة (دقيقة)</label>
                      <input
                        type="number"
                        value={systemSettings.sessionTimeout}
                        onChange={(e) => setSystemSettings({...systemSettings, sessionTimeout: parseInt(e.target.value)})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأقصى لمحاولات تسجيل الدخول</label>
                      <input
                        type="number"
                        value={systemSettings.maxLoginAttempts}
                        onChange={(e) => setSystemSettings({...systemSettings, maxLoginAttempts: parseInt(e.target.value)})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأدنى لطول كلمة المرور</label>
                      <input
                        type="number"
                        value={systemSettings.passwordMinLength}
                        onChange={(e) => setSystemSettings({...systemSettings, passwordMinLength: parseInt(e.target.value)})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        min="6"
                        max="20"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">فترة الاحتفاظ بالبيانات (يوم)</label>
                      <input
                        type="number"
                        value={systemSettings.dataRetentionPeriod}
                        onChange={(e) => setSystemSettings({...systemSettings, dataRetentionPeriod: parseInt(e.target.value)})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">إعدادات الأمان</h4>
                    {Object.entries(systemSettings).filter(([key]) => 
                      ['allowRegistration', 'requireEmailVerification', 'enableTwoFactor', 'passwordRequireSpecial', 'enableAuditLog'].includes(key)
                    ).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {key === 'allowRegistration' ? 'السماح بالتسجيل الجديد' :
                             key === 'requireEmailVerification' ? 'طلب تأكيد البريد الإلكتروني' :
                             key === 'enableTwoFactor' ? 'تفعيل المصادقة الثنائية' :
                             key === 'passwordRequireSpecial' ? 'طلب رموز خاصة في كلمة المرور' :
                             'تفعيل سجل المراجعة'}
                          </h4>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value as boolean}
                            onChange={(e) => setSystemSettings({
                              ...systemSettings,
                              [key]: e.target.checked
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* System Tab */}
              {activeTab === 'system' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">إعدادات النظام</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 ml-2" />
                        <h4 className="font-medium text-yellow-800">وضع الصيانة</h4>
                      </div>
                      <p className="text-sm text-yellow-700 mb-3">
                        {systemSettings.maintenanceMode ? 'النظام في وضع الصيانة حالياً' : 'النظام يعمل بشكل طبيعي'}
                      </p>
                      <button
                        onClick={handleMaintenanceMode}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          systemSettings.maintenanceMode
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-yellow-600 text-white hover:bg-yellow-700'
                        }`}
                      >
                        {systemSettings.maintenanceMode ? 'إلغاء وضع الصيانة' : 'تفعيل وضع الصيانة'}
                      </button>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <Database className="h-5 w-5 text-blue-600 ml-2" />
                        <h4 className="font-medium text-blue-800">النسخ الاحتياطي</h4>
                      </div>
                      <div className="space-y-2 mb-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={systemSettings.autoBackup}
                            onChange={(e) => setSystemSettings({...systemSettings, autoBackup: e.target.checked})}
                            className="ml-2"
                          />
                          <span className="text-sm">النسخ الاحتياطي التلقائي</span>
                        </label>
                        <select
                          value={systemSettings.backupFrequency}
                          onChange={(e) => setSystemSettings({...systemSettings, backupFrequency: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                        >
                          <option value="hourly">كل ساعة</option>
                          <option value="daily">يومي</option>
                          <option value="weekly">أسبوعي</option>
                          <option value="monthly">شهري</option>
                        </select>
                      </div>
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <button
                          onClick={handleBackup}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                          نسخ احتياطي
                        </button>
                        <button
                          onClick={handleRestore}
                          className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
                        >
                          استعادة
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">أدوات النظام</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button className="bg-green-50 border border-green-200 rounded-lg p-4 hover:bg-green-100 transition-colors">
                        <Upload className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <div className="text-sm font-medium text-green-800">رفع البيانات</div>
                      </button>
                      
                      <button className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition-colors">
                        <Download className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-sm font-medium text-blue-800">تصدير البيانات</div>
                      </button>
                      
                      <button className="bg-purple-50 border border-purple-200 rounded-lg p-4 hover:bg-purple-100 transition-colors">
                        <RefreshCw className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                        <div className="text-sm font-medium text-purple-800">إعادة تشغيل النظام</div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">إعدادات الإشعارات</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">طريقة تسليم التقارير</label>
                      <select
                        value={notificationSettings.reportDelivery}
                        onChange={(e) => setNotificationSettings({...notificationSettings, reportDelivery: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="email">البريد الإلكتروني</option>
                        <option value="sms">رسائل نصية</option>
                        <option value="both">كلاهما</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">عتبة التنبيه (%)</label>
                      <input
                        type="number"
                        value={notificationSettings.alertThreshold}
                        onChange={(e) => setNotificationSettings({...notificationSettings, alertThreshold: parseInt(e.target.value)})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">أنواع الإشعارات</h4>
                    {Object.entries(notificationSettings).filter(([key]) => 
                      ['emailNotifications', 'smsNotifications', 'pushNotifications', 'emergencyAlerts', 'systemAlerts', 'performanceAlerts', 'securityAlerts', 'maintenanceNotifications'].includes(key)
                    ).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {key === 'emailNotifications' ? 'إشعارات البريد الإلكتروني' :
                             key === 'smsNotifications' ? 'الرسائل النصية' :
                             key === 'pushNotifications' ? 'الإشعارات الفورية' :
                             key === 'emergencyAlerts' ? 'تنبيهات الطوارئ' :
                             key === 'systemAlerts' ? 'تنبيهات النظام' :
                             key === 'performanceAlerts' ? 'تنبيهات الأداء' :
                             key === 'securityAlerts' ? 'تنبيهات الأمان' :
                             'إشعارات الصيانة'}
                          </h4>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value as boolean}
                            onChange={(e) => setNotificationSettings({
                              ...notificationSettings,
                              [key]: e.target.checked
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                    ))}
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

export default SchoolAdminSettings;