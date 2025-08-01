import React, { useState } from 'react';
import { HelpCircle, MessageSquare, Phone, Mail, FileText, Search, ChevronRight, Book, Video, Headphones, Clock } from 'lucide-react';
import { AccountManager } from '../utils/accountManager';
import Breadcrumb from '../components/Breadcrumb';
import RoleBasedLayout from '../components/RoleBasedLayout';

const Support: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'faq' | 'contact' | 'tutorials' | 'guides'>('faq');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const currentUser = AccountManager.getCurrentUser();
  const userRole = currentUser?.role || 'student';

  // الأسئلة الشائعة حسب نوع المستخدم
  const faqData = {
    student: [
      {
        question: 'كيف أقوم بتسليم واجباتي؟',
        answer: 'يمكنك تسليم واجباتك من خلال صفحة "واجباتي" ثم الضغط على "تسليم الواجب" وتحميل الملفات المطلوبة.'
      },
      {
        question: 'كيف أتابع نقاطي ودناني المعرفية؟',
        answer: 'يمكنك متابعة نقاطك من خلال صفحة "الدينار المعرفي" حيث ستجد تفاصيل النقاط المكتسبة والمكافآت المتاحة.'
      },
      {
        question: 'كيف أحمل المواد الدراسية؟',
        answer: 'يمكنك الوصول لجميع موادك من صفحة "موادي الدراسية" وتحميل المحتوى المطلوب.'
      },
      {
        question: 'كيف أغير كلمة المرور؟',
        answer: 'اذهب إلى "ملفي الشخصي" ثم "إعدادات الأمان" لتغيير كلمة المرور.'
      },
      {
        question: 'كيف أستخدم متجر المستكشف؟',
        answer: 'يمكنك استخدام النقاط المكتسبة لشراء الأفاتار والعناصر من متجر المستكشف.'
      }
    ],
    teacher: [
      {
        question: 'كيف أضيف واجبات جديدة؟',
        answer: 'من صفحة "الواجبات والاختبارات" يمكنك إضافة واجبات جديدة وتحديد مواعيد التسليم.'
      },
      {
        question: 'كيف أدير درجات الطلاب؟',
        answer: 'استخدم صفحة "الدرجات" لإدخال وتعديل درجات الطلاب وإنشاء التقارير.'
      },
      {
        question: 'كيف أتواصل مع أولياء الأمور؟',
        answer: 'يمكنك إرسال رسائل لأولياء الأمور من خلال صفحة "الرسائل".'
      },
      {
        question: 'كيف أضيف محتوى تعليمي؟',
        answer: 'استخدم "مكتبة المحتوى" لإضافة وتنظيم المواد التعليمية.'
      }
    ],
    parent: [
      {
        question: 'كيف أتابع تقدم طفلي؟',
        answer: 'من صفحة "تقدم الطفل" يمكنك مراجعة الدرجات والتقدم الأكاديمي.'
      },
      {
        question: 'كيف أتواصل مع المعلمين؟',
        answer: 'استخدم صفحة "الرسائل" للتواصل المباشر مع معلمي طفلك.'
      },
      {
        question: 'كيف أحصل على التقارير الدورية؟',
        answer: 'التقارير متاحة في صفحة "التقارير" ويمكن تحميلها كملفات PDF.'
      }
    ],
    admin: [
      {
        question: 'كيف أضيف مستخدمين جدد؟',
        answer: 'من صفحة "إدارة المستخدمين" يمكنك إضافة معلمين وطلاب جدد.'
      },
      {
        question: 'كيف أنشئ فصول دراسية؟',
        answer: 'استخدم صفحة "إدارة الفصول" لإنشاء وتنظيم الفصول الدراسية.'
      },
      {
        question: 'كيف أحصل على التقارير الإدارية؟',
        answer: 'التقارير الشاملة متاحة في صفحة "التقارير الإدارية".'
      }
    ]
  };

  const currentFaqs = faqData[userRole as keyof typeof faqData] || faqData.student;

  const tutorials = [
    {
      title: 'جولة في النظام للطلاب',
      description: 'تعلم كيفية استخدام جميع ميزات النظام',
      duration: '10 دقائق',
      type: 'video',
      icon: Video
    },
    {
      title: 'دليل المعلم الشامل',
      description: 'كل ما تحتاج معرفته كمعلم',
      duration: '15 دقيقة', 
      type: 'guide',
      icon: Book
    },
    {
      title: 'إدارة الواجبات والاختبارات',
      description: 'تعلم كيفية إنشاء وإدارة الواجبات',
      duration: '8 دقائق',
      type: 'video',
      icon: Video
    },
    {
      title: 'نظام النقاط والمكافآت',
      description: 'فهم آلية عمل النقاط والدنانير المعرفية',
      duration: '5 دقائق',
      type: 'guide',
      icon: Book
    }
  ];

  const filteredFaqs = currentFaqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <RoleBasedLayout showQuickActions={false} showFloatingButton={false}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'الرئيسية', path: `/${userRole}-dashboard`, icon: '🏠' },
          { label: 'الدعم والمساعدة', icon: '❓' }
        ]} />

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="container mx-auto">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">❓ مركز الدعم والمساعدة</h1>
              <p className="text-blue-100">نحن هنا لنساعدك في استخدام النظام بأفضل طريقة</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Quick Access Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow cursor-pointer">
              <MessageSquare className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">دردشة مباشرة</h3>
              <p className="text-sm text-gray-600">متاح 24/7</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow cursor-pointer">
              <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">اتصل بنا</h3>
              <p className="text-sm text-gray-600">0123456789</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow cursor-pointer">
              <Mail className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">البريد الإلكتروني</h3>
              <p className="text-sm text-gray-600">support@nibrass.edu.dz</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow cursor-pointer">
              <FileText className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">تذكرة دعم</h3>
              <p className="text-sm text-gray-600">إنشاء طلب جديد</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-lg">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 rtl:space-x-reverse px-6">
                {[
                  { id: 'faq', label: 'الأسئلة الشائعة', icon: HelpCircle },
                  { id: 'tutorials', label: 'الدروس التعليمية', icon: Video },
                  { id: 'guides', label: 'الأدلة', icon: Book },
                  { id: 'contact', label: 'اتصل بنا', icon: Headphones }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSection(tab.id as any)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 rtl:space-x-reverse ${
                      activeSection === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeSection === 'faq' && (
                <div>
                  {/* Search */}
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        placeholder="ابحث في الأسئلة الشائعة..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* FAQ List */}
                  <div className="space-y-4">
                    {filteredFaqs.map((faq, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg">
                        <button
                          onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
                          className="w-full px-6 py-4 text-right flex items-center justify-between hover:bg-gray-50"
                        >
                          <span className="font-medium text-gray-800">{faq.question}</span>
                          <ChevronRight 
                            className={`h-5 w-5 text-gray-400 transform transition-transform ${
                              selectedFaq === index ? 'rotate-90' : ''
                            }`} 
                          />
                        </button>
                        {selectedFaq === index && (
                          <div className="px-6 pb-4 text-gray-600 border-t border-gray-100">
                            <p className="pt-4">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'tutorials' && (
                <div className="grid md:grid-cols-2 gap-6">
                  {tutorials.map((tutorial, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-4 rtl:space-x-reverse">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <tutorial.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-2">{tutorial.title}</h4>
                          <p className="text-gray-600 text-sm mb-3">{tutorial.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 flex items-center">
                              <Clock className="h-3 w-3 ml-1" />
                              {tutorial.duration}
                            </span>
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              مشاهدة →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'contact' && (
                <div className="max-w-2xl mx-auto">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">تواصل معنا</h3>
                    <p className="text-gray-600">نحن هنا لمساعدتك. لا تتردد في التواصل معنا</p>
                  </div>

                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">الاسم</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          defaultValue={currentUser?.name || ''}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          defaultValue={currentUser?.email || ''}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الموضوع</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="موضوع الرسالة"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الرسالة</label>
                      <textarea
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="وصف مشكلتك أو استفسارك بالتفصيل..."
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      إرسال الرسالة
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </RoleBasedLayout>
  );
};

export default Support;