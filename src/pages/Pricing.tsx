import React, { useState } from 'react';
import { Check, Calculator, Phone, Mail, Users, Star } from 'lucide-react';

const Pricing: React.FC = () => {
  const [studentCount, setStudentCount] = useState(100);
  const [billingCycle, setBillingCycle] = useState<'annual' | 'semester'>('annual');

  const calculatePrice = (basePrice: number, students: number, cycle: 'annual' | 'semester') => {
    let price = basePrice * students;
    if (cycle === 'semester') {
      price = price * 0.6; // 60% of annual price for semester
    }
    
    // Volume discounts
    if (students >= 500) price *= 0.8; // 20% discount
    else if (students >= 200) price *= 0.9; // 10% discount
    
    return Math.round(price);
  };

  const plans = [
    {
      name: 'الباقة الأساسية',
      description: 'مثالية للمدارس الصغيرة والمتوسطة',
      basePrice: 50, // DZD per student per year
      color: 'blue',
      popular: false,
      features: [
        'منصة التعلم التفاعلي',
        'نظام النقاط والشارات',
        'تقارير أساسية للأداء',
        'دعم فني عبر البريد الإلكتروني',
        'تحديثات المحتوى التعليمي',
        'لوحة تحكم للمعلمين',
        'تطبيق الهاتف المحمول'
      ],
      limitations: [
        'حتى 300 طالب',
        'تخزين 10 جيجابايت',
        'دعم فني محدود'
      ]
    },
    {
      name: 'الباقة المتقدمة',
      description: 'الأنسب للمدارس الكبيرة والشبكات التعليمية',
      basePrice: 75, // DZD per student per year
      color: 'green',
      popular: true,
      features: [
        'جميع ميزات الباقة الأساسية',
        'التعلم التكيفي بالذكاء الاصطناعي',
        'تحليلات متقدمة ولوحات تحكم شاملة',
        'نظام إدارة المحتوى المتقدم',
        'تكامل مع الأنظمة الخارجية',
        'دعم فني على مدار الساعة',
        'تدريب مخصص للمعلمين',
        'تقارير مخصصة للإدارة'
      ],
      limitations: [
        'حتى 1000 طالب',
        'تخزين 50 جيجابايت',
        'أولوية في الدعم الفني'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">أسعار منصة نبراس الجزائر</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            أسعار شفافة ومرنة تناسب جميع أحجام المدارس والمؤسسات التعليمية في الجزائر
          </p>
          <div className="inline-flex bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-md transition-colors ${
                billingCycle === 'annual'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              سنوي (وفر 40%)
            </button>
            <button
              onClick={() => setBillingCycle('semester')}
              className={`px-6 py-2 rounded-md transition-colors ${
                billingCycle === 'semester'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              فصلي
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-center mb-6">
                <Calculator className="h-8 w-8 text-blue-600 ml-3" />
                <h2 className="text-2xl font-bold text-gray-800">حاسبة التكلفة التفاعلية</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    عدد الطلاب: {studentCount}
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="10"
                    value={studentCount}
                    onChange={(e) => setStudentCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>50</span>
                    <span>1000</span>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {plans.map((plan) => (
                    <div key={plan.name} className={`bg-white rounded-lg border-2 border-${plan.color}-200 p-4`}>
                      <h3 className="font-semibold text-gray-800 mb-2">{plan.name}</h3>
                      <div className="text-2xl font-bold text-gray-800">
                        {calculatePrice(plan.basePrice, studentCount, billingCycle).toLocaleString()} دج
                      </div>
                      <div className="text-sm text-gray-600">
                        {billingCycle === 'annual' ? 'سنوياً' : 'فصلياً'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">اختر الباقة المناسبة</h2>
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden ${
                  plan.popular ? 'ring-4 ring-green-500 ring-opacity-50' : ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-green-500 text-white text-center py-2 font-semibold">
                    الأكثر شعبية
                  </div>
                )}
                
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <div className="text-4xl font-bold text-gray-800">
                        {plan.basePrice} دج
                      </div>
                      <div className="text-gray-600">لكل طالب سنوياً</div>
                      <div className="text-sm text-gray-500 mt-2">
                        * الأسعار تشمل جميع الميزات المذكورة
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h4 className="font-semibold text-gray-800 flex items-center">
                      <Check className="h-5 w-5 text-green-500 ml-2" />
                      الميزات المتضمنة:
                    </h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mt-0.5 ml-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h4 className="font-semibold text-gray-800">الحدود والقيود:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 ml-3 flex-shrink-0"></div>
                          <span className="text-gray-600 text-sm">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    className={`w-full py-4 px-6 rounded-lg font-semibold transition-colors ${
                      plan.popular
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    اطلب عرضاً مخصصاً
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volume Discounts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">خصومات الكميات الكبيرة</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">200-499 طالب</h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">10%</div>
                <p className="text-gray-600">خصم على السعر الأساسي</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">500+ طالب</h3>
                <div className="text-3xl font-bold text-green-600 mb-2">20%</div>
                <p className="text-gray-600">خصم على السعر الأساسي</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <Star className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">شبكات المدارس</h3>
                <div className="text-3xl font-bold text-purple-600 mb-2">خاص</div>
                <p className="text-gray-600">أسعار مخصصة للشراكات</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">مقارنة التكاليف</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-right">البند</th>
                      <th className="px-6 py-4 text-center">الطريقة التقليدية</th>
                      <th className="px-6 py-4 text-center">منصة نبراس الجزائر</th>
                      <th className="px-6 py-4 text-center">الوفورات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 font-semibold">الكتب والمواد التعليمية</td>
                      <td className="px-6 py-4 text-center">15,000 دج/طالب</td>
                      <td className="px-6 py-4 text-center">مشمول</td>
                      <td className="px-6 py-4 text-center text-green-600 font-semibold">15,000 دج</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-semibold">أدوات التقييم</td>
                      <td className="px-6 py-4 text-center">5,000 دج/طالب</td>
                      <td className="px-6 py-4 text-center">مشمول</td>
                      <td className="px-6 py-4 text-center text-green-600 font-semibold">5,000 دج</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-semibold">التدريب والدعم</td>
                      <td className="px-6 py-4 text-center">10,000 دج/معلم</td>
                      <td className="px-6 py-4 text-center">مشمول</td>
                      <td className="px-6 py-4 text-center text-green-600 font-semibold">10,000 دج</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-semibold">إجمالي التكلفة السنوية</td>
                      <td className="px-6 py-4 text-center font-bold">30,000 دج/طالب</td>
                      <td className="px-6 py-4 text-center font-bold text-green-600">75 دج/طالب</td>
                      <td className="px-6 py-4 text-center font-bold text-green-600">29,925 دج</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Sales */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">هل تحتاج عرضاً مخصصاً؟</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            تواصل مع فريق المبيعات للحصول على عرض سعر مخصص يناسب احتياجات مدرستك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center font-semibold">
              <Phone className="h-5 w-5 ml-2" />
              اتصل بنا: 023 XX XX XX
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center font-semibold">
              <Mail className="h-5 w-5 ml-2" />
              sales@nibras-algeria.dz
            </button>
          </div>
          
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">شروط الاشتراك الأساسية</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>الحد الأدنى:</strong> 50 طالب
                </div>
                <div>
                  <strong>مدة الاشتراك:</strong> سنة واحدة كحد أدنى
                </div>
                <div>
                  <strong>طريقة الدفع:</strong> تحويل بنكي أو شيك
                </div>
                <div>
                  <strong>الإلغاء:</strong> إشعار مسبق 30 يوم
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;