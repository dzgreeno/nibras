import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, Star, GraduationCap, Play, MapPin, TrendingUp, Shield, Zap, Brain, Trophy, Target } from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';

const Home: React.FC = () => {
  const { showSuccess } = useNotification();
  const [demoForm, setDemoForm] = useState({
    name: '',
    position: '',
    school: '',
    email: ''
  });

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess(
      'تم إرسال طلبك بنجاح!', 
      'سنتواصل معك قريباً لتحديد موعد العرض التوضيحي.'
    );
    setDemoForm({ name: '', position: '', school: '', email: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - رحلة المستكشف الجزائري */}
      <section className="bg-gradient-to-br from-green-50 via-white to-red-50 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-red-600/5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-8">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <MapPin className="h-4 w-4 ml-2" />
              منصة تعليمية جزائرية 100%
            </div>
          </div>
          <h1 className="text-6xl font-bold text-gray-800 mb-6">
            <span className="text-green-600">نبراس الجزائر</span>
          </h1>
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">
            تعلم ممتع، ومستقبل واعد
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            انطلق في رحلة المستكشف الجزائري واكتشف عالماً من التعلم التفاعلي والممتع. 
            منصة تعليمية ذكية تجمع بين التكنولوجيا المتقدمة والهوية الجزائرية الأصيلة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => document.getElementById('demo-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center text-lg font-semibold shadow-lg"
            >
              <Play className="ml-2 h-6 w-6" />
              اطلب عرضاً توضيحياً
            </button>
            <Link 
              to="/features"
              className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg hover:bg-green-600 hover:text-white transition-colors text-lg font-semibold"
            >
              استكشف الميزات
            </Link>
          </div>
          
          {/* Algeria Map Visual Element */}
          <div className="relative max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-green-100 to-red-100 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <div className="text-right">
                  <h3 className="text-xl font-bold text-gray-800">ابدأ رحلتك التعليمية</h3>
                  <p className="text-gray-600">من الجزائر العاصمة إلى كل ولايات الوطن</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Different Users */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-16">فوائد منصة نبراس الجزائر</h3>
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* للتلاميذ */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-6 text-center text-blue-800">للتلاميذ</h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Brain className="h-5 w-5 text-blue-600 mt-1 ml-3 flex-shrink-0" />
                  <span className="text-gray-700">تعلم تكيفي مخصص لكل طالب</span>
                </li>
                <li className="flex items-start">
                  <Trophy className="h-5 w-5 text-blue-600 mt-1 ml-3 flex-shrink-0" />
                  <span className="text-gray-700">نظام نقاط و"الدينار المعرفي"</span>
                </li>
                <li className="flex items-start">
                  <Target className="h-5 w-5 text-blue-600 mt-1 ml-3 flex-shrink-0" />
                  <span className="text-gray-700">رحلة تعليمية تفاعلية عبر الجزائر</span>
                </li>
                <li className="flex items-start">
                  <Star className="h-5 w-5 text-blue-600 mt-1 ml-3 flex-shrink-0" />
                  <span className="text-gray-700">شارات وإنجازات محفزة</span>
                </li>
              </ul>
            </div>

            {/* للمعلمين */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-6 text-center text-green-800">للمعلمين</h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-1 ml-3 flex-shrink-0" />
                  <span className="text-gray-700">تحليلات متقدمة لأداء الطلاب</span>
                </li>
                <li className="flex items-start">
                  <BookOpen className="h-5 w-5 text-green-600 mt-1 ml-3 flex-shrink-0" />
                  <span className="text-gray-700">مكتبة محتوى تعليمي ثرية</span>
                </li>
                <li className="flex items-start">
                  <Zap className="h-5 w-5 text-green-600 mt-1 ml-3 flex-shrink-0" />
                  <span className="text-gray-700">أدوات تدريس تفاعلية</span>
                </li>
                <li className="flex items-start">
                  <Shield className="h-5 w-5 text-green-600 mt-1 ml-3 flex-shrink-0" />
                  <span className="text-gray-700">إدارة الفصل الذكية</span>
                </li>
              </ul>
            </div>

            {/* للمدارس */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold mb-6 text-center text-purple-800">للمدارس</h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <TrendingUp className="h-5 w-5 text-purple-600 mt-1 ml-3 flex-shrink-0" />
                  <span className="text-gray-700">تقارير شاملة عن الأداء</span>
                </li>
                <li className="flex items-start">
                  <Users className="h-5 w-5 text-purple-600 mt-1 ml-3 flex-shrink-0" />
                  <span className="text-gray-700">إدارة متكاملة للطلاب والمعلمين</span>
                </li>
                <li className="flex items-start">
                  <Shield className="h-5 w-5 text-purple-600 mt-1 ml-3 flex-shrink-0" />
                  <span className="text-gray-700">أمان وحماية البيانات</span>
                </li>
                <li className="flex items-start">
                  <Target className="h-5 w-5 text-purple-600 mt-1 ml-3 flex-shrink-0" />
                  <span className="text-gray-700">تحسين النتائج الأكاديمية</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">أرقام مؤثرة</h3>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-5xl font-bold mb-2">1000+</div>
              <div className="text-green-100">درس تفاعلي</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-green-100">مدرسة مسجلة</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-5xl font-bold mb-2">85%</div>
              <div className="text-green-100">تحسن في الأداء</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-5xl font-bold mb-2">48</div>
              <div className="text-green-100">ولاية مغطاة</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Demo Access */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">🚀 جرب المنصة الآن</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              اختبر جميع ميزات المنصة مجاناً باستخدام الحسابات الوهمية
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <Link
              to="/login"
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group text-center"
            >
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="h-10 w-10 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-blue-800 mb-3">تلميذ</h4>
              <p className="text-gray-600 mb-4">أحمد بن محمد</p>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <div>• رحلة المستكشف الجزائري</div>
                <div>• الدينار المعرفي والنقاط</div>
                <div>• الشارات والإنجازات</div>
              </div>
              <div className="bg-blue-600 text-white py-3 px-6 rounded-lg group-hover:bg-blue-700 transition-colors">
                دخول كتلميذ
              </div>
            </Link>

            <Link
              to="/login"
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group text-center"
            >
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-10 w-10 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-green-800 mb-3">معلم</h4>
              <p className="text-gray-600 mb-4">أ. فاطمة أحمد</p>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <div>• إدارة الفصول والطلاب</div>
                <div>• إنشاء الواجبات والاختبارات</div>
                <div>• تحليلات الأداء</div>
              </div>
              <div className="bg-green-600 text-white py-3 px-6 rounded-lg group-hover:bg-green-700 transition-colors">
                دخول كمعلم
              </div>
            </Link>

            <Link
              to="/login"
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group text-center"
            >
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-10 w-10 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold text-purple-800 mb-3">ولي أمر</h4>
              <p className="text-gray-600 mb-4">محمد والد أحمد</p>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <div>• متابعة تقدم الأطفال</div>
                <div>• التواصل مع المعلمين</div>
                <div>• تقارير الأداء</div>
              </div>
              <div className="bg-purple-600 text-white py-3 px-6 rounded-lg group-hover:bg-purple-700 transition-colors">
                دخول كولي أمر
              </div>
            </Link>

            <Link
              to="/login"
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group text-center"
            >
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-10 w-10 text-orange-600" />
              </div>
              <h4 className="text-xl font-bold text-orange-800 mb-3">مدير</h4>
              <p className="text-gray-600 mb-4">د. خالد مدير المدرسة</p>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <div>• إدارة المدرسة الشاملة</div>
                <div>• تقارير وإحصائيات</div>
                <div>• متابعة المعلمين</div>
              </div>
              <div className="bg-orange-600 text-white py-3 px-6 rounded-lg group-hover:bg-orange-700 transition-colors">
                دخول كمدير
              </div>
            </Link>
          </div>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Zap className="h-8 w-8 ml-3" />
              <h4 className="text-2xl font-bold">معلومات الدخول السريع</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <h5 className="font-bold mb-2">📧 البريد الإلكتروني:</h5>
                <div className="space-y-1 text-sm">
                  <div>• student@demo.com (تلميذ)</div>
                  <div>• teacher@demo.com (معلم)</div>
                  <div>• parent@demo.com (ولي أمر)</div>
                  <div>• admin@demo.com (مدير)</div>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <h5 className="font-bold mb-2">🔑 كلمة المرور:</h5>
                <div className="text-2xl font-bold">123456</div>
                <div className="text-sm mt-2">لجميع الحسابات</div>
              </div>
            </div>
            <div className="mt-6">
              <Link
                to="/test"
                className="bg-white text-orange-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-bold inline-flex items-center"
              >
                <Play className="h-5 w-5 ml-2" />
                عرض جميع الصفحات
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Request Form */}
      <section id="demo-form" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">اطلب عرضاً توضيحياً مجانياً</h3>
                <p className="text-gray-600">اكتشف كيف يمكن لمنصة نبراس الجزائر تحويل تجربة التعلم في مدرستك</p>
              </div>
              
              <form onSubmit={handleDemoSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">الاسم الكامل *</label>
                    <input
                      type="text"
                      value={demoForm.name}
                      onChange={(e) => setDemoForm({...demoForm, name: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">المسمى الوظيفي *</label>
                    <input
                      type="text"
                      value={demoForm.position}
                      onChange={(e) => setDemoForm({...demoForm, position: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="مدير، مشرف تربوي، معلم..."
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">اسم المدرسة/المؤسسة *</label>
                  <input
                    type="text"
                    value={demoForm.school}
                    onChange={(e) => setDemoForm({...demoForm, school: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="أدخل اسم المدرسة أو المؤسسة"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">البريد الإلكتروني *</label>
                  <input
                    type="email"
                    value={demoForm.email}
                    onChange={(e) => setDemoForm({...demoForm, email: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="example@school.dz"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center text-lg font-semibold shadow-lg"
                >
                  <Play className="h-5 w-5 ml-2" />
                  احجز العرض التوضيحي المجاني
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">شهادات المدارس الشريكة</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-md">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">"منصة نبراس الجزائر غيرت طريقة تعلم طلابنا بشكل جذري. النتائج مذهلة!"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold ml-3">
                  م.ع
                </div>
                <div>
                  <div className="font-semibold">مدير مدرسة الأمل</div>
                  <div className="text-sm text-gray-600">الجزائر العاصمة</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-md">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">"التحليلات والتقارير ساعدتنا في فهم احتياجات كل طالب بشكل أفضل"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold ml-3">
                  ف.ب
                </div>
                <div>
                  <div className="font-semibold">مشرفة تربوية</div>
                  <div className="text-sm text-gray-600">وهران</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-md">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">"الطلاب أصبحوا أكثر حماساً للتعلم مع نظام النقاط والشارات"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold ml-3">
                  ك.س
                </div>
                <div>
                  <div className="font-semibold">معلمة رياضيات</div>
                  <div className="text-sm text-gray-600">قسنطينة</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">أسئلة شائعة</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">ما هي منصة نبراس الجزائر؟</h4>
              <p className="text-gray-600">منصة تعليمية رقمية تفاعلية مصممة خصيصاً للمناهج الجزائرية، تجمع بين التكنولوجيا المتقدمة والهوية الوطنية.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">كيف يعمل نظام التلعيب؟</h4>
              <p className="text-gray-600">يكسب الطلاب نقاطاً وشارات من خلال إكمال الدروس والتفاعل، مع عملة "الدينار المعرفي" لتحفيز التعلم.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">هل المنصة آمنة للطلاب؟</h4>
              <p className="text-gray-600">نعم، نوفر أعلى مستويات الأمان وحماية البيانات مع بيئة تعلم آمنة ومراقبة.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">كيف يمكن للمدارس الانضمام؟</h4>
              <p className="text-gray-600">يمكن طلب عرض توضيحي مجاني والتواصل مع فريق المبيعات لمناقشة احتياجات المدرسة.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">جاهز لتحويل تجربة التعلم؟</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            انضم إلى آلاف الطلاب والمعلمين الذين يستخدمون منصة نبراس الجزائر لتحقيق نتائج تعليمية متميزة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('demo-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-green-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              احجز عرضاً توضيحياً مجانياً
            </button>
            <Link 
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-green-600 transition-colors font-semibold text-lg"
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;