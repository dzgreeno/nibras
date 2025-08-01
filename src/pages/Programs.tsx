import React from 'react';
import { BookOpen, Users, GraduationCap, Clock, Calendar, Target, Lightbulb, Globe, Calculator, Palette, Music } from 'lucide-react';

const Programs: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">برامجنا التعليمية</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نقدم برامج تعليمية متكاملة تغطي جميع المراحل الدراسية بأحدث المناهج والطرق التعليمية
          </p>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Elementary */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <div className="flex items-center mb-4">
                  <BookOpen className="h-8 w-8 ml-3" />
                  <h3 className="text-2xl font-bold">المرحلة الابتدائية</h3>
                </div>
                <p className="text-blue-100">الصفوف 1-6 | الأعمار 6-12 سنة</p>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-800">أهداف المرحلة:</h4>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Target className="h-5 w-5 text-blue-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span className="text-gray-600">تأسيس قوي في القراءة والكتابة والحساب</span>
                  </li>
                  <li className="flex items-start">
                    <Target className="h-5 w-5 text-blue-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span className="text-gray-600">تنمية المهارات الاجتماعية والعاطفية</span>
                  </li>
                  <li className="flex items-start">
                    <Target className="h-5 w-5 text-blue-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span className="text-gray-600">غرس القيم الإسلامية والأخلاق الحميدة</span>
                  </li>
                </ul>
                
                <h4 className="text-lg font-semibold mb-4 text-gray-800">المواد الدراسية:</h4>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 text-blue-500 ml-2" />
                    <span className="text-sm text-gray-600">اللغة العربية</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 text-blue-500 ml-2" />
                    <span className="text-sm text-gray-600">اللغة الإنجليزية</span>
                  </div>
                  <div className="flex items-center">
                    <Calculator className="h-4 w-4 text-blue-500 ml-2" />
                    <span className="text-sm text-gray-600">الرياضيات</span>
                  </div>
                  <div className="flex items-center">
                    <Lightbulb className="h-4 w-4 text-blue-500 ml-2" />
                    <span className="text-sm text-gray-600">العلوم</span>
                  </div>
                  <div className="flex items-center">
                    <Palette className="h-4 w-4 text-blue-500 ml-2" />
                    <span className="text-sm text-gray-600">التربية الفنية</span>
                  </div>
                  <div className="flex items-center">
                    <Music className="h-4 w-4 text-blue-500 ml-2" />
                    <span className="text-sm text-gray-600">التربية الموسيقية</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-blue-600 ml-2" />
                    <span className="font-semibold text-blue-800">ساعات الدراسة</span>
                  </div>
                  <p className="text-blue-700 text-sm">7:30 ص - 2:30 م (35 ساعة أسبوعياً)</p>
                </div>
              </div>
            </div>

            {/* Middle School */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 ml-3" />
                  <h3 className="text-2xl font-bold">المرحلة المتوسطة</h3>
                </div>
                <p className="text-green-100">الصفوف 7-9 | الأعمار 12-15 سنة</p>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-800">أهداف المرحلة:</h4>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Target className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span className="text-gray-600">تطوير المهارات النقدية والتحليلية</span>
                  </li>
                  <li className="flex items-start">
                    <Target className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span className="text-gray-600">تنمية التفكير الإبداعي والابتكاري</span>
                  </li>
                  <li className="flex items-start">
                    <Target className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span className="text-gray-600">إعداد الطلاب للمرحلة الثانوية</span>
                  </li>
                </ul>
                
                <h4 className="text-lg font-semibold mb-4 text-gray-800">المواد الدراسية:</h4>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 text-green-500 ml-2" />
                    <span className="text-sm text-gray-600">اللغة العربية</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 text-green-500 ml-2" />
                    <span className="text-sm text-gray-600">اللغة الإنجليزية</span>
                  </div>
                  <div className="flex items-center">
                    <Calculator className="h-4 w-4 text-green-500 ml-2" />
                    <span className="text-sm text-gray-600">الرياضيات</span>
                  </div>
                  <div className="flex items-center">
                    <Lightbulb className="h-4 w-4 text-green-500 ml-2" />
                    <span className="text-sm text-gray-600">العلوم</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 text-green-500 ml-2" />
                    <span className="text-sm text-gray-600">الدراسات الاجتماعية</span>
                  </div>
                  <div className="flex items-center">
                    <Lightbulb className="h-4 w-4 text-green-500 ml-2" />
                    <span className="text-sm text-gray-600">الحاسوب</span>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-green-600 ml-2" />
                    <span className="font-semibold text-green-800">ساعات الدراسة</span>
                  </div>
                  <p className="text-green-700 text-sm">7:30 ص - 3:00 م (40 ساعة أسبوعياً)</p>
                </div>
              </div>
            </div>

            {/* High School */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white">
                <div className="flex items-center mb-4">
                  <GraduationCap className="h-8 w-8 ml-3" />
                  <h3 className="text-2xl font-bold">المرحلة الثانوية</h3>
                </div>
                <p className="text-purple-100">الصفوف 10-12 | الأعمار 15-18 سنة</p>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-800">أهداف المرحلة:</h4>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Target className="h-5 w-5 text-purple-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span className="text-gray-600">إعداد الطلاب للجامعة والحياة المهنية</span>
                  </li>
                  <li className="flex items-start">
                    <Target className="h-5 w-5 text-purple-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span className="text-gray-600">تطوير مهارات البحث والتحليل</span>
                  </li>
                  <li className="flex items-start">
                    <Target className="h-5 w-5 text-purple-500 mt-0.5 ml-2 flex-shrink-0" />
                    <span className="text-gray-600">بناء الشخصية القيادية المسؤولة</span>
                  </li>
                </ul>
                
                <h4 className="text-lg font-semibold mb-4 text-gray-800">المسارات المتاحة:</h4>
                <div className="space-y-3 mb-6">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <h5 className="font-semibold text-purple-800 mb-1">المسار العلمي</h5>
                    <p className="text-sm text-purple-600">الرياضيات، الفيزياء، الكيمياء، الأحياء</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <h5 className="font-semibold text-purple-800 mb-1">المسار الأدبي</h5>
                    <p className="text-sm text-purple-600">التاريخ، الجغرافيا، علم النفس، الفلسفة</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <h5 className="font-semibold text-purple-800 mb-1">مسار إدارة الأعمال</h5>
                    <p className="text-sm text-purple-600">المحاسبة، الاقتصاد، إدارة الأعمال</p>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-purple-600 ml-2" />
                    <span className="font-semibold text-purple-800">ساعات الدراسة</span>
                  </div>
                  <p className="text-purple-700 text-sm">7:30 ص - 3:30 م (45 ساعة أسبوعياً)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Programs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">البرامج الخاصة</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">برنامج اللغات</h4>
              <p className="text-gray-600 text-sm">تعلم اللغة الإنجليزية والفرنسية مع معلمين متخصصين</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">برنامج STEM</h4>
              <p className="text-gray-600 text-sm">العلوم والتكنولوجيا والهندسة والرياضيات</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">برنامج الفنون</h4>
              <p className="text-gray-600 text-sm">الرسم والموسيقى والمسرح لتنمية المواهب الإبداعية</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">برنامج القيادة</h4>
              <p className="text-gray-600 text-sm">تطوير المهارات القيادية والشخصية للطلاب</p>
            </div>
          </div>
        </div>
      </section>

      {/* Extracurricular Activities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">الأنشطة اللاصفية</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-blue-800">الأنشطة الرياضية</h4>
              <ul className="space-y-2">
                <li className="text-blue-700">• كرة القدم</li>
                <li className="text-blue-700">• كرة السلة</li>
                <li className="text-blue-700">• السباحة</li>
                <li className="text-blue-700">• ألعاب القوى</li>
                <li className="text-blue-700">• الجمباز</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-green-800">الأنشطة الثقافية</h4>
              <ul className="space-y-2">
                <li className="text-green-700">• المناظرات</li>
                <li className="text-green-700">• الشعر والأدب</li>
                <li className="text-green-700">• المسرح المدرسي</li>
                <li className="text-green-700">• الصحافة المدرسية</li>
                <li className="text-green-700">• النادي العلمي</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-purple-800">الأنشطة الاجتماعية</h4>
              <ul className="space-y-2">
                <li className="text-purple-700">• العمل التطوعي</li>
                <li className="text-purple-700">• الرحلات التعليمية</li>
                <li className="text-purple-700">• المعارض المدرسية</li>
                <li className="text-purple-700">• اليوم المفتوح</li>
                <li className="text-purple-700">• المسابقات الثقافية</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Calendar */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">التقويم الأكاديمي</h3>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                  <Calendar className="h-6 w-6 text-blue-600 ml-2" />
                  الفصل الدراسي الأول
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">بداية الفصل</span>
                    <span className="text-blue-600">28 أغسطس 2024</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">إجازة منتصف الفصل</span>
                    <span className="text-blue-600">19-23 أكتوبر 2024</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">نهاية الفصل</span>
                    <span className="text-blue-600">16 نوفمبر 2024</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                  <Calendar className="h-6 w-6 text-green-600 ml-2" />
                  الفصل الدراسي الثاني
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">بداية الفصل</span>
                    <span className="text-green-600">26 نوفمبر 2024</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">إجازة منتصف الفصل</span>
                    <span className="text-green-600">18-22 يناير 2025</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">نهاية الفصل</span>
                    <span className="text-green-600">2 مارس 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;