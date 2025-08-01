import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { Search, BookOpen, Users, Settings, MessageSquare, ChevronDown, ChevronUp, Play, ThumbsUp, ThumbsDown, HelpCircle, Phone, Mail, Clock } from 'lucide-react';

const SupportCenter: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);

  const categories = [
    {
      id: 'getting-started',
      title: 'دليل البدء السريع',
      icon: BookOpen,
      color: 'blue',
      description: 'تعلم كيفية استخدام المنصة للمرة الأولى',
      articleCount: 8
    },
    {
      id: 'classroom-management',
      title: 'إدارة الفصول والطلاب',
      icon: Users,
      color: 'green',
      description: 'كل ما تحتاجه لإدارة فصلك الدراسي',
      articleCount: 12
    },
    {
      id: 'homework-tests',
      title: 'الواجبات والاختبارات',
      icon: Settings,
      color: 'purple',
      description: 'إنشاء وإدارة الواجبات والاختبارات',
      articleCount: 10
    },
    {
      id: 'account-settings',
      title: 'حسابي وإعداداتي',
      icon: Settings,
      color: 'orange',
      description: 'إدارة حسابك الشخصي والإعدادات',
      articleCount: 6
    },
    {
      id: 'technical-issues',
      title: 'المشاكل التقنية الشائعة',
      icon: HelpCircle,
      color: 'red',
      description: 'حلول للمشاكل التقنية الشائعة',
      articleCount: 15
    }
  ];

  const popularArticles = [
    {
      id: 1,
      title: 'كيفية إنشاء واجب جديد',
      category: 'homework-tests',
      views: 1250,
      helpful: 95,
      description: 'دليل شامل لإنشاء وتخصيص الواجبات للطلاب'
    },
    {
      id: 2,
      title: 'إضافة طلاب جدد إلى الفصل',
      category: 'classroom-management',
      views: 980,
      helpful: 92,
      description: 'خطوات إضافة وإدارة الطلاب في فصلك الدراسي'
    },
    {
      id: 3,
      title: 'تسجيل الدخول لأول مرة',
      category: 'getting-started',
      views: 2100,
      helpful: 98,
      description: 'دليل المبتدئين لتسجيل الدخول واستكشاف المنصة'
    },
    {
      id: 4,
      title: 'حل مشكلة عدم ظهور الدرجات',
      category: 'technical-issues',
      views: 750,
      helpful: 88,
      description: 'خطوات حل مشكلة عدم ظهور الدرجات للطلاب'
    }
  ];

  const faqs = [
    {
      id: 1,
      question: 'كيف يمكنني إعادة تعيين كلمة المرور؟',
      answer: 'يمكنك إعادة تعيين كلمة المرور من خلال النقر على "نسيت كلمة المرور" في صفحة تسجيل الدخول، ثم إدخال بريدك الإلكتروني. ستصلك رسالة تحتوي على رابط لإعادة تعيين كلمة المرور.',
      category: 'account-settings'
    },
    {
      id: 2,
      question: 'لماذا لا يمكنني رؤية فصلي الدراسي؟',
      answer: 'تأكد من أنك سجلت الدخول بالحساب الصحيح وأن مدير المدرسة قد أضافك إلى الفصل. إذا استمرت المشكلة، تواصل مع الدعم الفني.',
      category: 'classroom-management'
    },
    {
      id: 3,
      question: 'كيف يمكنني تحميل المحتوى التعليمي؟',
      answer: 'انتقل إلى مكتبة المحتوى، اختر المادة المطلوبة، ثم انقر على زر "تحميل" بجانب المحتوى الذي تريد تحميله.',
      category: 'getting-started'
    },
    {
      id: 4,
      question: 'ما هو الحد الأقصى لحجم الملف المرفق؟',
      answer: 'الحد الأقصى لحجم الملف المرفق هو 50 ميجابايت. يمكنك رفع ملفات PDF، Word، PowerPoint، والصور.',
      category: 'homework-tests'
    },
    {
      id: 5,
      question: 'كيف يمكنني التواصل مع أولياء الأمور؟',
      answer: 'يمكنك إرسال رسائل لأولياء الأمور من خلال صفحة الطالب، أو إرسال رسالة جماعية من إعدادات الفصل.',
      category: 'classroom-management'
    }
  ];

  const videos = [
    {
      id: 1,
      title: 'جولة سريعة في المنصة',
      duration: '3:45',
      thumbnail: '/api/placeholder/300/200',
      description: 'تعرف على الميزات الأساسية للمنصة'
    },
    {
      id: 2,
      title: 'إنشاء أول واجب',
      duration: '2:30',
      thumbnail: '/api/placeholder/300/200',
      description: 'خطوات إنشاء واجب تفاعلي'
    },
    {
      id: 3,
      title: 'تتبع أداء الطلاب',
      duration: '4:15',
      thumbnail: '/api/placeholder/300/200',
      description: 'كيفية مراقبة تقدم طلابك'
    }
  ];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleFaqToggle = (faqId: number) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  const handleVideoPlay = (video: any) => {
    showInfo('إشعار', `🎥 تشغيل الفيديو: ${video.title}\nالمدة: ${video.duration}`);
  };

  const handleArticleRead = (article: any) => {
    showInfo('جاري التحميل', `قراءة المقال: ${article.title}\n${article.description}`);
  };

  const handleContactSubmit = () => {
    showSuccess('تم الإرسال', 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
    setShowContactForm(false);
  };

  const handleFeedback = (type: 'helpful' | 'not-helpful', itemId: number) => {
    const feedbackText = type === 'helpful' ? 'مفيد' : 'غير مفيد';
    showSuccess('تم بنجاح', `شكراً لك! تم تسجيل تقييمك: ${feedbackText}`);
  };

  const filteredArticles = popularArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">مركز الدعم والمساعدة</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
            مرحباً، كيف يمكننا مساعدتك اليوم؟ ابحث عن إجابات لأسئلتك أو تصفح مقالات المساعدة
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute right-4 top-4 h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن مقال أو سؤال..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-12 pl-6 py-4 text-lg border-0 rounded-xl shadow-lg focus:ring-4 focus:ring-white/30 focus:outline-none text-gray-800"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {!searchTerm ? (
          <>
            {/* Categories */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">تصفح حسب الفئة</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                  >
                    <div className={`bg-${category.color}-100 w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                      <category.icon className={`h-8 w-8 text-${category.color}-600`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{category.title}</h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{category.articleCount} مقال</span>
                      <span className={`text-${category.color}-600 font-semibold`}>تصفح →</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Popular Articles */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">المقالات الأكثر شعبية</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {popularArticles.map((article) => (
                  <div key={article.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{article.title}</h3>
                    <p className="text-gray-600 mb-4">{article.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{article.views} مشاهدة</span>
                      <span>{article.helpful}% مفيد</span>
                    </div>
                    <button 
                      onClick={() => handleArticleRead(article)}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      قراءة المقال →
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Video Tutorials */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">فيديوهات تعليمية</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {videos.map((video) => (
                  <div key={video.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative bg-gray-200 h-48 flex items-center justify-center">
                      <Play 
                        onClick={() => handleVideoPlay(video)}
                        className="h-16 w-16 text-white bg-blue-600 rounded-full p-4 cursor-pointer hover:bg-blue-700 transition-colors" 
                      />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{video.title}</h3>
                      <p className="text-gray-600 text-sm">{video.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">الأسئلة الشائعة</h2>
              <div className="max-w-4xl mx-auto space-y-4">
                {faqs.slice(0, 5).map((faq) => (
                  <div key={faq.id} className="bg-white rounded-lg shadow-md">
                    <button
                      onClick={() => handleFaqToggle(faq.id)}
                      className="w-full px-6 py-4 text-right flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                      {expandedFaq === faq.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-600" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                          <span className="text-sm text-gray-500 ml-4">هل كان هذا مفيداً؟</span>
                          <button 
                            onClick={() => handleFeedback('helpful', faq.id)}
                            className="flex items-center text-green-600 hover:text-green-700 ml-2"
                          >
                            <ThumbsUp className="h-4 w-4 ml-1" />
                            نعم
                          </button>
                          <button 
                            onClick={() => handleFeedback('not-helpful', faq.id)}
                            className="flex items-center text-red-600 hover:text-red-700"
                          >
                            <ThumbsDown className="h-4 w-4 ml-1" />
                            لا
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          /* Search Results */
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              نتائج البحث عن "{searchTerm}"
            </h2>
            
            {filteredArticles.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">المقالات</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredArticles.map((article) => (
                    <div key={article.id} className="bg-white rounded-lg shadow-md p-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{article.title}</h4>
                      <p className="text-gray-600 mb-4">{article.description}</p>
                      <button className="text-blue-600 hover:text-blue-800 font-semibold">
                        قراءة المقال →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filteredFaqs.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">الأسئلة الشائعة</h3>
                <div className="space-y-4">
                  {filteredFaqs.map((faq) => (
                    <div key={faq.id} className="bg-white rounded-lg shadow-md">
                      <button
                        onClick={() => handleFaqToggle(faq.id)}
                        className="w-full px-6 py-4 text-right flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                        {expandedFaq === faq.id ? (
                          <ChevronUp className="h-5 w-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-600" />
                        )}
                      </button>
                      {expandedFaq === faq.id && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filteredArticles.length === 0 && filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">لم نجد نتائج</h3>
                <p className="text-gray-500 mb-6">جرب كلمات مختلفة أو تصفح الفئات أعلاه</p>
                <button
                  onClick={() => setShowContactForm(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  تواصل مع الدعم
                </button>
              </div>
            )}
          </div>
        )}

        {/* Contact Support */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">لم تجد إجابتك؟</h2>
          <p className="text-xl mb-8 opacity-90">
            فريق الدعم الفني جاهز لمساعدتك على مدار الساعة
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <MessageSquare className="h-8 w-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">دردشة مباشرة</h3>
              <p className="text-sm opacity-80 mb-4">متاح من 8 ص إلى 6 م</p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                ابدأ المحادثة
              </button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Mail className="h-8 w-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">البريد الإلكتروني</h3>
              <p className="text-sm opacity-80 mb-4">رد خلال 24 ساعة</p>
              <button
                onClick={() => setShowContactForm(true)}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                إرسال رسالة
              </button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Phone className="h-8 w-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">الهاتف</h3>
              <p className="text-sm opacity-80 mb-4">+213 23 XX XX XX</p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                اتصل بنا
              </button>
            </div>
          </div>
        </section>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">تواصل مع الدعم</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">الاسم</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="اسمك الكامل"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">البريد الإلكتروني</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">الموضوع</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>مشكلة تقنية</option>
                    <option>استفسار عام</option>
                    <option>طلب ميزة جديدة</option>
                    <option>مشكلة في الحساب</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">الرسالة</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="اشرح مشكلتك أو استفسارك بالتفصيل..."
                  ></textarea>
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    onClick={handleContactSubmit}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    إرسال الرسالة
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportCenter;