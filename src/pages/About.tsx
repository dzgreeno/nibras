import React from 'react';
import { Target, Eye, Heart, Users, Award, BookOpen, Star, Shield, MapPin, Lightbulb, TrendingUp, Calendar } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-red-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MapPin className="h-4 w-4 ml-2" />
            صنع في الجزائر، للجزائر
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-6">من نحن</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            منصة نبراس الجزائر - رحلة تعليمية رقمية تجمع بين التكنولوجيا المتقدمة والهوية الجزائرية الأصيلة
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">قصة نبراس الجزائر</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                وُلدت فكرة منصة "نبراس الجزائر" من إيمان عميق بأن التعليم هو المحرك الأساسي لتقدم الأمم. 
                في عام 2023، انطلقنا برؤية طموحة: تطوير منصة تعليمية رقمية تجمع بين أحدث التقنيات العالمية والهوية الجزائرية الأصيلة.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                نحن نؤمن بأن كل طالب جزائري يستحق تعليماً متميزاً يواكب العصر ويحافظ على جذوره. 
                لذلك، طورنا منصة تفاعلية تحول التعلم إلى رحلة ممتعة عبر ربوع الجزائر الحبيبة.
              </p>
              <p className="text-gray-600 leading-relaxed">
                اليوم، نفخر بأن منصتنا تخدم آلاف الطلاب في جميع أنحاء الوطن، وتساهم في بناء جيل متعلم ومبدع قادر على مواجهة تحديات المستقبل.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-red-100 p-8 rounded-lg shadow-lg">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-green-600 ml-2" />
                  <div className="text-2xl font-bold text-gray-800">الجزائر</div>
                </div>
                <div className="text-gray-700 mb-6">منصة تعليمية 100% جزائرية</div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">58</div>
                    <div className="text-sm text-gray-600">ولاية جزائرية</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">500+</div>
                    <div className="text-sm text-gray-600">مدرسة ابتدائية</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">9</div>
                    <div className="text-sm text-gray-600">مواد دراسية</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">2024-2025</div>
                    <div className="text-sm text-gray-600">المنهاج الرسمي</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-full ml-4">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">رسالتنا</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                نسعى لتطوير التعليم في الجزائر من خلال منصة رقمية متطورة تجمع بين التكنولوجيا الحديثة والمناهج الجزائرية الأصيلة. 
                نهدف إلى تمكين كل طالب جزائري من الوصول إلى تعليم تفاعلي وممتع يحفز الإبداع ويبني المعرفة بطريقة مبتكرة.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <div className="bg-red-100 p-3 rounded-full ml-4">
                  <Eye className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">رؤيتنا</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                أن نكون المنصة التعليمية الرائدة في الجزائر والمغرب العربي، ونساهم في بناء جيل متعلم ومبدع قادر على 
                مواجهة تحديات القرن الواحد والعشرين. نطمح لأن نكون جسر التواصل بين التراث الجزائري العريق والتقنيات التعليمية المستقبلية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">قيمنا</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800">التميز الأكاديمي</h4>
              <p className="text-gray-600">نسعى للوصول إلى أعلى معايير الجودة في التعليم والتعلم</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800">الرعاية والاهتمام</h4>
              <p className="text-gray-600">نوفر بيئة آمنة ومحبة تدعم نمو الطلاب الشامل</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800">العمل الجماعي</h4>
              <p className="text-gray-600">نؤمن بقوة التعاون بين الطلاب والمعلمين وأولياء الأمور</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-gray-800">النزاهة والأمانة</h4>
              <p className="text-gray-600">نلتزم بأعلى معايير الأخلاق والشفافية في جميع أعمالنا</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">الفريق الأساسي</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">ك.ب</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">كريم بن علي</h4>
              <p className="text-green-600 mb-3">المؤسس والمدير التنفيذي</p>
              <p className="text-gray-600 text-sm">مهندس في علوم الحاسوب، خبرة 15 عاماً في التكنولوجيا التعليمية</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">أ.س</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">د. أمينة سعيدي</h4>
              <p className="text-blue-600 mb-3">مديرة المحتوى التعليمي</p>
              <p className="text-gray-600 text-sm">دكتوراه في علوم التربية، خبرة 20 عاماً في المناهج الجزائرية</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">ي.م</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">يوسف مرادي</h4>
              <p className="text-red-600 mb-3">مدير التطوير التقني</p>
              <p className="text-gray-600 text-sm">مهندس في الذكاء الاصطناعي، خبرة 12 عاماً في تطوير المنصات التعليمية</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">رحلة التطوير</h3>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ml-6">
                  <Calendar className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="text-xl font-semibold text-green-800 mb-2">2023 - البداية</h4>
                    <p className="text-gray-700">انطلاق فكرة المشروع وتشكيل الفريق الأساسي</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ml-6">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="text-xl font-semibold text-blue-800 mb-2">2024 - التطوير</h4>
                    <p className="text-gray-700">تطوير النسخة الأولى من المنصة وإطلاق البرنامج التجريبي</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ml-6">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="bg-red-50 p-6 rounded-lg">
                    <h4 className="text-xl font-semibold text-red-800 mb-2">2024 - الإطلاق</h4>
                    <p className="text-gray-700">الإطلاق الرسمي للمنصة وبداية الشراكات مع المدارس</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">إنجازاتنا</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">جائزة التميز التعليمي</h4>
              <p className="text-gray-600 text-sm">2023</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Star className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">أفضل مدرسة في المنطقة</h4>
              <p className="text-gray-600 text-sm">2022</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">جائزة الأنشطة الطلابية</h4>
              <p className="text-gray-600 text-sm">2023</p>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <Shield className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">شهادة الجودة التعليمية</h4>
              <p className="text-gray-600 text-sm">2024</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;