import React, { useState } from 'react';
import { Trophy, BarChart3, Users, BookOpen, Target, Play, Download, ChevronDown, ChevronUp } from 'lucide-react';

const Features: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFeature = (feature: string) => {
    setActiveFeature(activeFeature === feature ? null : feature);
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const features = [
    {
      id: 'algerian-curriculum',
      title: 'المنهاج الجزائري الرسمي 2024-2025',
      icon: BookOpen,
      color: 'green',
      description: 'تطبيق كامل للمنهاج الجزائري الحقيقي مع جميع المواد الدراسية',
      details: [
        'جميع الولايات الجزائرية الـ58 مع مدارسها الحقيقية',
        'المواد الدراسية الرسمية للطور الابتدائي',
        'اللغة الإنجليزية الجديدة للسنة الخامسة ابتدائي',
        'أسماء المدارس الحقيقية بأسماء شهداء الثورة'
      ]
    },
    {
      id: 'registration-system',
      title: 'نظام التسجيل المتقدم',
      icon: Users,
      color: 'blue',
      description: 'نظام تسجيل متدرج بأربع خطوات يحاكي النظام التعليمي الحكومي',
      details: [
        'خمسة أنواع مستخدمين: تلميذ، معلم، ولي أمر، مدير، مفتش',
        'تسجيل متدرج بأربع خطوات شاملة',
        'إنشاء معرفات تلقائية حسب النظام الرسمي',
        'حسابات تجريبية محدثة للاختبار السريع'
      ]
    },
    {
      id: 'gamification',
      title: 'التلعيب والمحتوى التفاعلي',
      icon: Trophy,
      color: 'yellow',
      description: 'نظام نقاط وشارات و"الدينار المعرفي" لتحفيز التعلم',
      details: [
        'نظام النقاط والشارات التحفيزية',
        'الدينار المعرفي كعملة تعليمية',
        'تحديات ومسابقات تفاعلية',
        'رحلة المستكشف الجزائري'
      ]
    },
    {
      id: 'analytics',
      title: 'لوحات التحكم والتحليلات',
      icon: BarChart3,
      color: 'purple',
      description: 'تحليلات شاملة ولوحات تحكم مخصصة لكل دور',
      details: [
        'لوحة تحكم للطلاب مع تتبع التقدم',
        'تحليلات متقدمة للمعلمين',
        'تقارير إدارية شاملة للمدارس',
        'إحصائيات الأداء في الوقت الفعلي'
      ]
    }
  ];

  const faqs = [
    {
      question: 'كيف يعمل نظام التعلم التكيفي؟',
      answer: 'يستخدم الذكاء الاصطناعي لتحليل أداء كل طالب وتخصيص المحتوى والتمارين حسب مستواه وسرعة تعلمه.'
    },
    {
      question: 'ما هو الدينار المعرفي؟',
      answer: 'عملة تعليمية افتراضية يكسبها الطلاب من خلال إنجاز المهام والتفوق، ويمكن استخدامها لفتح محتوى إضافي.'
    },
    {
      question: 'هل المنصة متوافقة مع المناهج الجزائرية؟',
      answer: 'نعم، المنصة مصممة خصيصاً للمناهج الجزائرية وتغطي جميع المراحل التعليمية.'
    },
    {
      question: 'ما هي متطلبات النظام للاستخدام؟',
      answer: 'المنصة تعمل على أي جهاز متصل بالإنترنت، سواء كان حاسوب أو جهاز لوحي أو هاتف ذكي.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">ميزات منصة نبراس الجزائر</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            اكتشف القوة التقنية والتربوية لمنصة نبراس الجزائر - حلول تعليمية متطورة مصممة خصيصاً للبيئة التعليمية الجزائرية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
              <Play className="h-5 w-5 ml-2" />
              شاهد العرض التوضيحي
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center">
              <Download className="h-5 w-5 ml-2" />
              تحميل الكتيب التقني
            </button>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">الميزات الأساسية</h2>
          <div className="space-y-12">
            {features.map((feature, index) => (
              <div key={feature.id} className={`bg-gradient-to-r from-${feature.color}-50 to-${feature.color}-100 rounded-2xl p-8 shadow-lg`}>
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center mb-6">
                      <div className={`bg-${feature.color}-600 w-16 h-16 rounded-full flex items-center justify-center ml-4`}>
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-800">{feature.title}</h3>
                    </div>
                    <p className="text-lg text-gray-700 mb-6">{feature.description}</p>
                    <ul className="space-y-3">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <Target className={`h-5 w-5 text-${feature.color}-600 mt-1 ml-3 flex-shrink-0`} />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <button 
                      onClick={() => toggleFeature(feature.id)}
                      className={`mt-6 bg-${feature.color}-600 text-white px-6 py-3 rounded-lg hover:bg-${feature.color}-700 transition-colors`}
                    >
                      {activeFeature === feature.id ? 'إخفاء التفاصيل' : 'عرض المزيد'}
                    </button>
                  </div>
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className={`bg-${feature.color}-200 rounded-xl p-8 h-64 flex items-center justify-center`}>
                      <feature.icon className={`h-32 w-32 text-${feature.color}-600`} />
                    </div>
                  </div>
                </div>
                
                {activeFeature === feature.id && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="text-xl font-semibold mb-4">كيف يعمل؟</h4>
                        <p className="text-gray-600">شرح تفصيلي لآلية عمل هذه الميزة وكيفية استفادة المستخدمين منها في العملية التعليمية.</p>
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="text-xl font-semibold mb-4">الفوائد المحققة</h4>
                        <p className="text-gray-600">النتائج الملموسة التي تحققها هذه الميزة في تحسين جودة التعليم وزيادة مشاركة الطلاب.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">مقارنة مع الطرق التقليدية</h2>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-right">الميزة</th>
                    <th className="px-6 py-4 text-center">الطريقة التقليدية</th>
                    <th className="px-6 py-4 text-center">منصة نبراس الجزائر</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-semibold">تخصيص التعلم</td>
                    <td className="px-6 py-4 text-center text-red-600">محدود</td>
                    <td className="px-6 py-4 text-center text-green-600">ذكي ومتقدم</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-semibold">تتبع التقدم</td>
                    <td className="px-6 py-4 text-center text-red-600">يدوي</td>
                    <td className="px-6 py-4 text-center text-green-600">تلقائي ومستمر</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold">التحفيز</td>
                    <td className="px-6 py-4 text-center text-red-600">تقليدي</td>
                    <td className="px-6 py-4 text-center text-green-600">تلعيب متطور</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-semibold">التحليلات</td>
                    <td className="px-6 py-4 text-center text-red-600">بسيطة</td>
                    <td className="px-6 py-4 text-center text-green-600">شاملة ومتقدمة</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Technical FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">الأسئلة التقنية الشائعة</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg shadow-md">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-right flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-600" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">جاهز لتجربة المستقبل؟</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            انضم إلى المدارس الرائدة في الجزائر واكتشف كيف يمكن لمنصة نبراس تحويل تجربة التعلم
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              اطلب عرضاً توضيحياً
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold">
              تواصل مع فريق المبيعات
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;