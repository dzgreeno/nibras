import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, GraduationCap, Users, UserCheck, Shield, MapPin, Zap } from 'lucide-react';
import { AccountManager, UserAccount } from '../utils/accountManager';
import AdvancedRegistration from '../components/AdvancedRegistration';
import { useNotification } from '../contexts/NotificationContext';
import { basicDemoAccounts, generateDemoAccounts } from '../data/demoAccounts';
import { getEducationStats } from '../data/schoolsData';
import { generateComprehensiveDemoAccounts, getAccountStatistics } from '../data/extendedSchoolsData';
import { getSystemSummary } from '../data/systemSummary';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { showError } = useNotification();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showAdvancedRegistration, setShowAdvancedRegistration] = useState(false);
  const [showFullDemoList, setShowFullDemoList] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // الحصول على إحصائيات النظام التعليمي
  const educationStats = getEducationStats();
  const systemSummary = getSystemSummary();

  // الحسابات التجريبية - النسخة الأساسية للعرض السريع
  const demoAccounts: UserAccount[] = basicDemoAccounts;
  
  // الحسابات التجريبية المطورة - عينة من الولايات
  const allDemoAccounts: UserAccount[] = generateDemoAccounts();
  
  // الحسابات الشاملة - جميع الولايات والمدارس (تحميل عند الطلب)
  const [comprehensiveAccounts, setComprehensiveAccounts] = useState<UserAccount[]>([]);
  const [showComprehensiveStats, setShowComprehensiveStats] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // البحث عن الحساب في الحسابات التجريبية الأساسية
    let demoAccount = demoAccounts.find(acc => 
      acc.email === formData.email && acc.password === formData.password
    );
    
    // البحث في الحسابات التجريبية المطورة إذا لم نجد في الأساسية
    if (!demoAccount) {
      demoAccount = allDemoAccounts.find(acc => 
        acc.email === formData.email && acc.password === formData.password
      );
    }
    
    // البحث في الحسابات الشاملة إذا لم نجد في المطورة
    if (!demoAccount && comprehensiveAccounts.length > 0) {
      demoAccount = comprehensiveAccounts.find(acc => 
        acc.email === formData.email && acc.password === formData.password
      );
    }
    
    // البحث في الحسابات المحفوظة محلياً
    const savedAccount = AccountManager.findAccount(formData.email, formData.password);
    
    const userAccount = demoAccount || savedAccount;
    
    if (userAccount) {
      // حفظ بيانات المستخدم الحالي
      AccountManager.setCurrentUser(userAccount);
      navigate(userAccount.dashboard);
    } else {
      showError(
        'بيانات تسجيل الدخول غير صحيحة',
        'تأكد من البريد الإلكتروني وكلمة المرور أو جرب الحسابات التجريبية.'
      );
    }
  };
  



  const handleDemoLogin = (account: typeof demoAccounts[0]) => {
    // حفظ بيانات المستخدم الحالي
    AccountManager.setCurrentUser(account);
    navigate(account.dashboard);
  };

  // تحميل الحسابات الشاملة عند الطلب
  const loadComprehensiveAccounts = () => {
    if (comprehensiveAccounts.length === 0) {
      const accounts = generateComprehensiveDemoAccounts();
      setComprehensiveAccounts(accounts);
    }
    setShowComprehensiveStats(!showComprehensiveStats);
  };





  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-green-600 to-red-600 w-16 h-16 rounded-full flex items-center justify-center">
              <MapPin className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">نبراس الجزائر</h1>
          <p className="text-gray-600 mt-2">منصة التعلم التفاعلي</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tab Switcher */}
          <div className="flex">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                isLogin
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => setShowAdvancedRegistration(true)}
              className="flex-1 py-4 px-6 text-center font-semibold transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              إنشاء حساب
            </button>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">البريد الإلكتروني *</label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="example@email.com"
                  />
                </div>
              </div>



              {/* Password Field */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">كلمة المرور *</label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pr-10 pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="أدخل كلمة المرور"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me / Forgot Password for Login */}
              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="mr-2 text-sm text-gray-600">تذكرني</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    نسيت كلمة المرور؟
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-red-600 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-red-700 transition-colors font-semibold"
              >
                تسجيل الدخول
              </button>
            </form>

            {/* Demo Accounts Section */}
            {isLogin && (
              <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="flex items-center justify-center mb-4">
                  <Zap className="h-5 w-5 text-yellow-500 ml-2" />
                  <h3 className="text-lg font-semibold text-gray-800">تجريب سريع</h3>
                </div>
                <p className="text-sm text-gray-600 text-center mb-4">
                  اختر نوع المستخدم للدخول مباشرة وتجريب منصة التعليم الابتدائي
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  {demoAccounts.map((account) => (
                    <button
                      key={account.role}
                      onClick={() => handleDemoLogin(account)}
                      className={`p-4 rounded-lg border-2 border-${account.color}-200 bg-${account.color}-50 hover:bg-${account.color}-100 transition-colors text-center group`}
                    >
                      <account.icon className={`h-6 w-6 mx-auto mb-2 text-${account.color}-600 group-hover:scale-110 transition-transform`} />
                      <div className={`text-sm font-semibold text-${account.color}-800 mb-1`}>
                        {account.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {account.description}
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* إحصائيات النظام التعليمي */}
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="text-sm font-semibold text-green-800 mb-2 text-center">إحصائيات النظام التعليمي الجزائري</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-green-700">
                    <div className="text-center">
                      <div className="font-bold">{educationStats.totalWilayas}</div>
                      <div>ولاية</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold">{educationStats.totalSchools}</div>
                      <div>مدرسة</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold">{educationStats.totalStudents.toLocaleString()}</div>
                      <div>تلميذ</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold">{educationStats.totalTeachers.toLocaleString()}</div>
                      <div>معلم</div>
                    </div>
                  </div>
                </div>

                {/* خيار عرض الحسابات المطورة */}
                <div className="mt-4">
                  <button
                    onClick={() => setShowFullDemoList(!showFullDemoList)}
                    className="w-full py-2 px-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-blue-700 text-sm font-medium"
                  >
                    {showFullDemoList ? 'إخفاء' : 'عرض'} الحسابات التجريبية من جميع الولايات ({allDemoAccounts.length} حساب)
                  </button>
                </div>

                {/* قائمة الحسابات المطورة */}
                {showFullDemoList && (
                  <div className="mt-4 max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-1 gap-2 p-3">
                      {allDemoAccounts.map((account) => (
                        <button
                          key={account.id}
                          onClick={() => handleDemoLogin(account)}
                          className={`p-3 rounded-lg border border-${account.color}-200 bg-${account.color}-50 hover:bg-${account.color}-100 transition-colors text-right group`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <account.icon className={`h-5 w-5 text-${account.color}-600`} />
                            </div>
                            <div className="flex-1 mr-3">
                              <div className={`text-sm font-semibold text-${account.color}-800`}>
                                {account.name}
                              </div>
                              <div className="text-xs text-gray-600">
                                {account.wilaya} - {account.schoolName}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* النظام الشامل - جميع الولايات والمدارس */}
                <div className="mt-4">
                  <button
                    onClick={loadComprehensiveAccounts}
                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-lg hover:from-purple-100 hover:to-indigo-100 transition-colors text-purple-700 font-medium"
                  >
                    <div className="flex items-center justify-center mb-1">
                      <Zap className="h-5 w-5 ml-2" />
                      <span>النظام الشامل - جميع الولايات الجزائرية</span>
                    </div>
                    <div className="text-xs text-purple-600">
                      {comprehensiveAccounts.length > 0 
                        ? `${comprehensiveAccounts.length} حساب تجريبي من 48 ولاية` 
                        : 'تحميل البيانات الكاملة'}
                    </div>
                  </button>
                </div>

                {/* إحصائيات النظام الشامل */}
                {showComprehensiveStats && comprehensiveAccounts.length > 0 && (
                  <div className="mt-4 border border-purple-200 rounded-lg overflow-hidden">
                    <div className="bg-purple-50 p-3 border-b border-purple-200">
                      <h4 className="text-sm font-semibold text-purple-800 text-center">
                        إحصائيات النظام التعليمي الشامل
                      </h4>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">
                            {getAccountStatistics().students}
                          </div>
                          <div className="text-xs text-gray-600">طالب</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {getAccountStatistics().teachers}
                          </div>
                          <div className="text-xs text-gray-600">معلم</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">
                            {getAccountStatistics().admins}
                          </div>
                          <div className="text-xs text-gray-600">مدير</div>
                        </div>
                      </div>
                      
                      {/* عينة من الحسابات الشاملة */}
                      <div className="max-h-48 overflow-y-auto">
                        <div className="grid grid-cols-1 gap-2">
                          {comprehensiveAccounts.slice(0, 10).map((account) => (
                            <button
                              key={account.id}
                              onClick={() => handleDemoLogin(account)}
                              className={`p-2 rounded border border-${account.color}-200 bg-${account.color}-50 hover:bg-${account.color}-100 transition-colors text-right text-xs`}
                            >
                              <div className="flex items-center justify-between">
                                <account.icon className={`h-4 w-4 text-${account.color}-600`} />
                                <div className="flex-1 mr-2">
                                  <div className={`font-semibold text-${account.color}-800 truncate`}>
                                    {account.name}
                                  </div>
                                  <div className="text-gray-600 truncate">
                                    {account.wilaya} - {account.role}
                                  </div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                        {comprehensiveAccounts.length > 10 && (
                          <div className="mt-2 text-center text-xs text-gray-500">
                            وعرض {comprehensiveAccounts.length - 10} حساب إضافي...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* معلومات النظام المطور */}
                <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                  <div className="text-center mb-3">
                    <div className="flex items-center justify-center mb-2">
                      <Zap className="h-5 w-5 text-blue-600 ml-2" />
                      <h4 className="text-sm font-bold text-blue-800">نظام نبراس الجزائر المطور</h4>
                    </div>
                    <div className="text-xs text-blue-600 mb-2">الإصدار {systemSummary.version} - {systemSummary.developmentDate}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-center p-2 bg-white bg-opacity-50 rounded">
                      <div className="font-bold text-blue-800">{systemSummary.totalSchools}</div>
                      <div className="text-blue-600">مدرسة</div>
                    </div>
                    <div className="text-center p-2 bg-white bg-opacity-50 rounded">
                      <div className="font-bold text-green-800">{systemSummary.totalWilayas}</div>
                      <div className="text-green-600">ولاية</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-xs text-blue-700 text-center">
                    🚀 <strong>جديد:</strong> نظام شامل يغطي جميع الولايات الجزائرية
                    <br />
                    📚 بيانات حقيقية ومناهج معتمدة من وزارة التربية
                  </div>
                </div>

                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-800 text-center">
                    💡 <strong>نصيحة:</strong> يمكنك أيضاً تسجيل الدخول يدوياً باستخدام:
                    <br />
                    البريد: أي من الحسابات أعلاه@demo.com | كلمة المرور: 123456
                  </p>
                </div>
              </div>
            )}

            {/* Additional Links */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                ليس لديك حساب؟{' '}
                <button
                  onClick={() => setShowAdvancedRegistration(true)}
                  className="text-green-600 hover:text-green-700 font-semibold"
                >
                  إنشاء حساب جديد
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Admin Login Link */}
        <div className="mt-6 text-center">
          <Link
            to="/admin-login"
            className="inline-flex items-center text-gray-600 hover:text-gray-800 text-sm"
          >
            <Shield className="h-4 w-4 ml-1" />
            دخول الأدمين العام
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2024 نبراس الجزائر. جميع الحقوق محفوظة.</p>
          <div className="mt-2 space-x-4 rtl:space-x-reverse">
            <Link to="/privacy" className="hover:text-gray-700">سياسة الخصوصية</Link>
            <Link to="/terms" className="hover:text-gray-700">شروط الاستخدام</Link>
          </div>
        </div>
      </div>

      {/* Advanced Registration Modal */}
      {showAdvancedRegistration && (
        <AdvancedRegistration onClose={() => setShowAdvancedRegistration(false)} />
      )}
    </div>
  );
};

export default Login;