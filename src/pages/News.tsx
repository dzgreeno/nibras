import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { Newspaper, Calendar, User, Eye, Heart, Share2, ArrowLeft, Search, Bell, Bookmark, MessageCircle, Clock, Tag } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  summary: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  image: string;
  views: number;
  likes: number;
  comments: number;
  tags: string[];
  isBookmarked?: boolean;
  isLiked?: boolean;
  priority: string;
}

const News: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const categories = [
    { id: 'all', name: 'جميع الأخبار', color: 'gray' },
    { id: 'academic', name: 'أكاديمية', color: 'blue' },
    { id: 'events', name: 'فعاليات', color: 'green' },
    { id: 'announcements', name: 'إعلانات', color: 'yellow' },
    { id: 'achievements', name: 'إنجازات', color: 'purple' },
    { id: 'sports', name: 'رياضة', color: 'red' },
    { id: 'cultural', name: 'ثقافية', color: 'indigo' }
  ];

  const [news] = useState([
    {
      id: 1,
      title: 'بداية التسجيل للسنة الدراسية الجديدة 2024-2025',
      summary: 'تعلن إدارة المدرسة عن بداية فترة التسجيل للطلاب الجدد للسنة الدراسية القادمة',
      content: `تعلن إدارة مدرسة النبراس النموذجية عن بداية فترة التسجيل للطلاب الجدد للسنة الدراسية 2024-2025.

      **تواريخ مهمة:**
      - بداية التسجيل: 15 فبراير 2024
      - نهاية التسجيل: 30 مارس 2024
      - إعلان النتائج: 15 أبريل 2024
      
      **المستندات المطلوبة:**
      - شهادة الميلاد
      - شهادة السنة السابقة
      - صور شخصية
      - ملف طبي
      
      **رسوم التسجيل:**
      - المرحلة الابتدائية: 15,000 دج
      - المرحلة المتوسطة: 20,000 دج
      - المرحلة الثانوية: 25,000 دج
      
      للمزيد من المعلومات، يرجى زيارة مكتب الإدارة أو الاتصال على الرقم: 021-555-0123`,
      category: 'announcements',
      author: 'إدارة المدرسة',
      publishDate: '2024-01-15',
      readTime: '3 دقائق',
      views: 1250,
      likes: 89,
      comments: 23,
      image: '📢',
      isBookmarked: false,
      isLiked: false,
      priority: 'high',
      tags: ['تسجيل', 'سنة دراسية', 'طلاب جدد']
    },
    {
      id: 2,
      title: 'فوز فريق المدرسة في مسابقة الرياضيات الوطنية',
      summary: 'حقق فريق مدرسة النبراس المركز الأول في المسابقة الوطنية للرياضيات',
      content: `حقق فريق مدرسة النبراس النموذجية إنجازاً رائعاً بفوزه بالمركز الأول في المسابقة الوطنية للرياضيات التي أقيمت في العاصمة.

      **تفاصيل الإنجاز:**
      - المركز الأول على مستوى الوطن
      - مشاركة 150 مدرسة من جميع الولايات
      - فريق مكون من 5 طلاب متميزين
      
      **أعضاء الفريق الفائز:**
      - أحمد بن علي (السنة الثالثة ثانوي)
      - فاطمة محمد (السنة الثانية ثانوي)
      - يوسف حسن (السنة الثالثة ثانوي)
      - مريم أحمد (السنة الثانية ثانوي)
      - خالد عمر (السنة الثالثة ثانوي)
      
      **الجوائز:**
      - كأس المسابقة الذهبي
      - شهادات تقدير لجميع الأعضاء
      - منح دراسية جامعية
      - أجهزة حاسوب محمولة
      
      نتقدم بأحر التهاني للطلاب المتفوقين وللأستاذ محمد علي مدرب الفريق على هذا الإنجاز المميز.`,
      category: 'achievements',
      author: 'قسم الرياضيات',
      publishDate: '2024-01-12',
      readTime: '4 دقائق',
      views: 2100,
      likes: 156,
      comments: 45,
      image: '🏆',
      isBookmarked: true,
      isLiked: true,
      priority: 'high',
      tags: ['رياضيات', 'مسابقة', 'فوز', 'إنجاز']
    },
    {
      id: 3,
      title: 'معرض العلوم والتكنولوجيا السنوي',
      summary: 'دعوة لحضور معرض العلوم والتكنولوجيا السنوي الذي سيقام الأسبوع القادم',
      content: `تدعو إدارة المدرسة جميع الطلاب وأولياء الأمور لحضور معرض العلوم والتكنولوجيا السنوي.

      **تفاصيل المعرض:**
      - التاريخ: 25-27 فبراير 2024
      - الوقت: 9:00 صباحاً - 4:00 مساءً
      - المكان: القاعة الكبرى والساحة الرئيسية
      
      **أقسام المعرض:**
      - الفيزياء والكيمياء
      - علوم الحاسوب والروبوتيك
      - علوم الطبيعة والبيئة
      - الرياضيات التطبيقية
      - الابتكارات الطلابية
      
      **فعاليات خاصة:**
      - ورش عمل تفاعلية
      - عروض تجارب علمية
      - مسابقات للزوار
      - جوائز للمشاريع المتميزة
      
      **جوائز المعرض:**
      - الأول: 100,000 دج + شهادة
      - الثاني: 75,000 دج + شهادة
      - الثالث: 50,000 دج + شهادة
      - جوائز تشجيعية متنوعة
      
      الدخول مجاني للجميع. نتطلع لرؤيتكم!`,
      category: 'events',
      author: 'نادي العلوم',
      publishDate: '2024-01-10',
      readTime: '5 دقائق',
      views: 890,
      likes: 67,
      comments: 18,
      image: '🔬',
      isBookmarked: false,
      isLiked: false,
      priority: 'medium',
      tags: ['معرض', 'علوم', 'تكنولوجيا', 'مشاريع']
    },
    {
      id: 4,
      title: 'تغيير في جدول الامتحانات النهائية',
      summary: 'إعلان هام حول تعديل مواعيد بعض الامتحانات النهائية للفصل الأول',
      content: `تعلن إدارة المدرسة عن تعديل في جدول الامتحانات النهائية للفصل الأول نظراً لظروف استثنائية.

      **التعديلات:**
      - امتحان الرياضيات: من 20/2 إلى 22/2
      - امتحان الفيزياء: من 21/2 إلى 23/2
      - امتحان الكيمياء: من 22/2 إلى 24/2
      
      **الجدول الجديد:**
      - الأحد 18/2: اللغة العربية
      - الاثنين 19/2: اللغة الإنجليزية
      - الثلاثاء 20/2: التاريخ والجغرافيا
      - الأربعاء 21/2: التربية الإسلامية
      - الخميس 22/2: الرياضيات
      - السبت 23/2: الفيزياء
      - الأحد 24/2: الكيمياء
      
      **ملاحظات مهمة:**
      - جميع الامتحانات تبدأ في الساعة 8:00 صباحاً
      - مدة كل امتحان: ساعتان
      - يجب الحضور قبل 30 دقيقة من بداية الامتحان
      - إحضار بطاقة الطالب إجباري
      
      نعتذر عن أي إزعاج قد يسببه هذا التغيير.`,
      category: 'academic',
      author: 'شؤون الطلاب',
      publishDate: '2024-01-08',
      readTime: '2 دقائق',
      views: 1850,
      likes: 45,
      comments: 67,
      image: '📅',
      isBookmarked: true,
      isLiked: false,
      priority: 'high',
      tags: ['امتحانات', 'جدول', 'تغيير', 'مهم']
    },
    {
      id: 5,
      title: 'ورشة تدريبية في البرمجة للطلاب',
      summary: 'دورة مجانية في البرمجة وتطوير التطبيقات للطلاب المهتمين بالتكنولوجيا',
      content: `ينظم نادي الحاسوب ورشة تدريبية مجانية في البرمجة وتطوير التطبيقات.

      **تفاصيل الورشة:**
      - المدة: 4 أسابيع (16 ساعة تدريبية)
      - الأيام: السبت والأحد
      - الوقت: 2:00 - 4:00 مساءً
      - المكان: مختبر الحاسوب
      
      **محتوى الورشة:**
      - أساسيات البرمجة
      - لغة Python للمبتدئين
      - تطوير تطبيقات بسيطة
      - مشروع تطبيقي نهائي
      
      **المتطلبات:**
      - اهتمام بالبرمجة والتكنولوجيا
      - حاسوب محمول (اختياري)
      - حضور جميع الجلسات
      
      **المدرب:**
      الأستاذ رانيا محمد - مهندسة برمجيات
      
      **التسجيل:**
      - عدد المقاعد محدود (20 طالب)
      - التسجيل في مكتب نادي الحاسوب
      - آخر موعد للتسجيل: 30 يناير
      
      **الشهادة:**
      شهادة إتمام معتمدة لجميع المشاركين`,
      category: 'academic',
      author: 'نادي الحاسوب',
      publishDate: '2024-01-05',
      readTime: '3 دقائق',
      views: 650,
      likes: 78,
      comments: 12,
      image: '💻',
      isBookmarked: false,
      isLiked: true,
      priority: 'medium',
      tags: ['برمجة', 'ورشة', 'تدريب', 'مجاني']
    },
    {
      id: 6,
      title: 'احتفالية اليوم الوطني للمدرسة',
      summary: 'برنامج احتفالي متنوع بمناسبة اليوم الوطني مع فقرات ثقافية وفنية',
      content: `تحتفل مدرسة النبراس النموذجية باليوم الوطني من خلال برنامج احتفالي متميز.

      **برنامج الاحتفالية:**
      - التاريخ: 1 نوفمبر 2024
      - الوقت: 9:00 صباحاً - 3:00 مساءً
      - المكان: الساحة الرئيسية والقاعة الكبرى
      
      **الفقرات:**
      - حفل رفع العلم الوطني
      - عروض فولكلورية تراثية
      - مسرحية تاريخية
      - معرض للتراث الجزائري
      - مسابقات ثقافية
      - عرض للأطباق الشعبية
      
      **المشاركون:**
      - جميع طلاب المدرسة
      - أولياء الأمور
      - ضيوف من المجتمع المحلي
      
      **الأنشطة التفاعلية:**
      - ورش الحرف التراثية
      - ألعاب شعبية
      - مسابقة أجمل زي تراثي
      - عرض للخط العربي
      
      **الجوائز:**
      - جوائز للمسابقات الثقافية
      - شهادات تقدير للمشاركين
      - هدايا تذكارية
      
      ندعو الجميع للمشاركة في هذا الاحتفال الوطني المميز.`,
      category: 'cultural',
      author: 'اللجنة الثقافية',
      publishDate: '2024-01-03',
      readTime: '4 دقائق',
      views: 1200,
      likes: 95,
      comments: 28,
      image: '🇩🇿',
      isBookmarked: true,
      isLiked: true,
      priority: 'medium',
      tags: ['يوم وطني', 'احتفال', 'تراث', 'ثقافة']
    }
  ]);

  const [trendingNews] = useState([
    { id: 1, title: 'فوز فريق المدرسة في مسابقة الرياضيات', views: 2100 },
    { id: 4, title: 'تغيير في جدول الامتحانات النهائية', views: 1850 },
    { id: 1, title: 'بداية التسجيل للسنة الدراسية الجديدة', views: 1250 }
  ]);

  const filteredNews = news.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleNewsClick = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
    setShowNewsModal(true);
  };

  const handleToggleBookmark = (newsId: number) => {
    showInfo('إشعار', `تم ${news.find(n => n.id === newsId)?.isBookmarked ? 'إزالة من' : 'إضافة إلى'} المحفوظات`);
  };

  const handleToggleLike = (newsId: number) => {
    showInfo('إشعار', `تم ${news.find(n => n.id === newsId)?.isLiked ? 'إلغاء' : ''} الإعجاب`);
  };

  const handleShare = (newsItem: NewsItem) => {
    showInfo('إشعار', `مشاركة: ${newsItem.title}`);
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || 'gray';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'أمس';
    if (diffDays < 7) return `منذ ${diffDays} أيام`;
    return date.toLocaleDateString('ar-SA');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
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
                <h1 className="text-3xl font-bold mb-2">📰 الأخبار والإعلانات</h1>
                <p className="text-orange-100">آخر الأخبار والإعلانات المدرسية</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{news.length}</div>
              <div className="text-sm">خبر وإعلان</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="البحث في الأخبار..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              عرض {filteredNews.length} من {news.length} خبر
            </div>
            
            <div className="flex space-x-2 rtl:space-x-reverse">
              <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center">
                <Bell className="h-4 w-4 ml-2" />
                تفعيل الإشعارات
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {filteredNews.map((newsItem) => (
                <div key={newsItem.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="text-4xl">{newsItem.image}</div>
                        <div>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${getCategoryColor(newsItem.category)}-100 text-${getCategoryColor(newsItem.category)}-800`}>
                              {categories.find(c => c.id === newsItem.category)?.name}
                            </span>
                            <span className={`px-2 py-1 rounded border text-xs font-medium ${getPriorityColor(newsItem.priority)}`}>
                              {newsItem.priority === 'high' ? 'عاجل' : newsItem.priority === 'medium' ? 'مهم' : 'عادي'}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 space-x-4 rtl:space-x-reverse">
                            <div className="flex items-center">
                              <User className="h-4 w-4 ml-1" />
                              {newsItem.author}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 ml-1" />
                              {formatDate(newsItem.publishDate)}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 ml-1" />
                              {newsItem.readTime}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <button
                          onClick={() => handleToggleBookmark(newsItem.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            newsItem.isBookmarked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          <Bookmark className={`h-4 w-4 ${newsItem.isBookmarked ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          onClick={() => handleShare(newsItem)}
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{newsItem.title}</h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">{newsItem.summary}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {newsItem.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs flex items-center">
                          <Tag className="h-3 w-3 ml-1" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 rtl:space-x-reverse text-sm text-gray-600">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 ml-1" />
                          {newsItem.views}
                        </div>
                        <button
                          onClick={() => handleToggleLike(newsItem.id)}
                          className={`flex items-center transition-colors ${
                            newsItem.isLiked ? 'text-red-600' : 'hover:text-red-600'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ml-1 ${newsItem.isLiked ? 'fill-current' : ''}`} />
                          {newsItem.likes}
                        </button>
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 ml-1" />
                          {newsItem.comments}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleNewsClick(newsItem)}
                        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                      >
                        قراءة المزيد
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredNews.length === 0 && (
              <div className="text-center py-12">
                <Newspaper className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">لا توجد أخبار</h3>
                <p className="text-gray-600">لم يتم العثور على أخبار تطابق معايير البحث</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">الفئات</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-right p-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? `bg-${category.color}-100 text-${category.color}-800`
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-sm text-gray-500">
                        {news.filter(n => category.id === 'all' || n.category === category.id).length}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending News */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">الأكثر قراءة</h3>
              <div className="space-y-3">
                {trendingNews.map((item, index) => (
                  <div key={item.id} className="flex items-start space-x-3 rtl:space-x-reverse p-3 bg-gray-50 rounded-lg">
                    <div className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 text-sm line-clamp-2">{item.title}</div>
                      <div className="text-xs text-gray-500 mt-1">{item.views} مشاهدة</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">إحصائيات سريعة</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">إجمالي الأخبار</span>
                  <span className="font-bold text-orange-600">{news.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">المحفوظة</span>
                  <span className="font-bold text-blue-600">{news.filter(n => n.isBookmarked).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">المعجب بها</span>
                  <span className="font-bold text-red-600">{news.filter(n => n.isLiked).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">إجمالي المشاهدات</span>
                  <span className="font-bold text-purple-600">{news.reduce((sum, item) => sum + item.views, 0)}</span>
                </div>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">النشرة الإخبارية</h3>
              <p className="text-orange-100 text-sm mb-4">اشترك لتصلك آخر الأخبار والإعلانات</p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  className="w-full p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="w-full bg-white text-orange-600 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                  اشتراك
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News Details Modal */}
      {showNewsModal && selectedNews && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">تفاصيل الخبر</h3>
              <button
                onClick={() => setShowNewsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
              <div className="text-6xl">{selectedNews.image}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium bg-${getCategoryColor(selectedNews.category)}-100 text-${getCategoryColor(selectedNews.category)}-800`}>
                    {categories.find(c => c.id === selectedNews.category)?.name}
                  </span>
                  <span className={`px-2 py-1 rounded border text-sm font-medium ${getPriorityColor(selectedNews.priority)}`}>
                    {selectedNews.priority === 'high' ? 'عاجل' : selectedNews.priority === 'medium' ? 'مهم' : 'عادي'}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">{selectedNews.title}</h4>
                <div className="flex items-center text-sm text-gray-600 space-x-4 rtl:space-x-reverse">
                  <div className="flex items-center">
                    <User className="h-4 w-4 ml-1" />
                    {selectedNews.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 ml-1" />
                    {formatDate(selectedNews.publishDate)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 ml-1" />
                    {selectedNews.readTime}
                  </div>
                </div>
              </div>
            </div>

            <div className="prose max-w-none mb-6">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedNews.content}
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-2">الكلمات المفتاحية</div>
              <div className="flex flex-wrap gap-2">
                {selectedNews.tags.map((tag: string, index: number) => (
                  <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center">
                    <Tag className="h-3 w-3 ml-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6 rtl:space-x-reverse text-sm text-gray-600">
                <div className="flex items-center">
                  <Eye className="h-4 w-4 ml-1" />
                  {selectedNews.views} مشاهدة
                </div>
                <div className="flex items-center">
                  <Heart className="h-4 w-4 ml-1" />
                  {selectedNews.likes} إعجاب
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 ml-1" />
                  {selectedNews.comments} تعليق
                </div>
              </div>
            </div>

            <div className="flex space-x-4 rtl:space-x-reverse">
              <button
                onClick={() => setShowNewsModal(false)}
                className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إغلاق
              </button>
              <button
                onClick={() => handleToggleLike(selectedNews.id)}
                className={`px-6 py-2 rounded-lg transition-colors flex items-center ${
                  selectedNews.isLiked 
                    ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                <Heart className={`h-4 w-4 ml-2 ${selectedNews.isLiked ? 'fill-current' : ''}`} />
                {selectedNews.isLiked ? 'إلغاء الإعجاب' : 'إعجاب'}
              </button>
              <button
                onClick={() => handleShare(selectedNews)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Share2 className="h-4 w-4 ml-2" />
                مشاركة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;