import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { Calendar, Clock, MapPin, Users, Star, ArrowLeft, Filter, Search, Heart, Share2, Trophy, Music, Palette, BookOpen, Zap } from 'lucide-react';

interface Activity {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  organizer: string;
  participants: number;
  maxParticipants: number;
  image: string;
  status: string;
  difficulty: string;
  prizes: string[];
  requirements: string[];
  tags: string[];
  rating: number;
  isRegistered: boolean;
  isFavorite?: boolean;
}

const Activities: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const categories = [
    { id: 'all', name: 'جميع الأنشطة', icon: Calendar, color: 'gray' },
    { id: 'sports', name: 'رياضية', icon: Trophy, color: 'green' },
    { id: 'cultural', name: 'ثقافية', icon: BookOpen, color: 'blue' },
    { id: 'artistic', name: 'فنية', icon: Palette, color: 'purple' },
    { id: 'musical', name: 'موسيقية', icon: Music, color: 'pink' },
    { id: 'scientific', name: 'علمية', icon: Zap, color: 'yellow' },
    { id: 'social', name: 'اجتماعية', icon: Users, color: 'indigo' }
  ];

  const [activities] = useState([
    {
      id: 1,
      title: 'مسابقة الرياضيات الكبرى',
      description: 'مسابقة سنوية في الرياضيات لجميع المستويات مع جوائز قيمة',
      category: 'scientific',
      date: '2024-02-15',
      time: '09:00',
      duration: '3 ساعات',
      location: 'القاعة الكبرى',
      organizer: 'قسم الرياضيات',
      participants: 120,
      maxParticipants: 150,
      image: '🧮',
      status: 'upcoming',
      difficulty: 'متوسط',
      prizes: ['الأول: 50,000 دج', 'الثاني: 30,000 دج', 'الثالث: 20,000 دج'],
      requirements: ['طالب مسجل', 'مستوى متوسط أو ثانوي'],
      tags: ['مسابقة', 'رياضيات', 'جوائز'],
      rating: 4.8,
      isRegistered: false,
      isFavorite: true
    },
    {
      id: 2,
      title: 'معرض الفنون التشكيلية',
      description: 'معرض لعرض أعمال الطلاب الفنية والإبداعية',
      category: 'artistic',
      date: '2024-02-20',
      time: '14:00',
      duration: '5 أيام',
      location: 'قاعة المعارض',
      organizer: 'نادي الفنون',
      participants: 45,
      maxParticipants: 60,
      image: '🎨',
      status: 'upcoming',
      difficulty: 'مبتدئ',
      prizes: ['شهادات تقدير', 'مواد فنية'],
      requirements: ['عمل فني أصلي', 'موافقة ولي الأمر'],
      tags: ['فن', 'معرض', 'إبداع'],
      rating: 4.6,
      isRegistered: true,
      isFavorite: false
    },
    {
      id: 3,
      title: 'بطولة كرة القدم المدرسية',
      description: 'بطولة كرة القدم السنوية بين فرق المدرسة',
      category: 'sports',
      date: '2024-02-25',
      time: '15:30',
      duration: 'أسبوع',
      location: 'الملعب الرئيسي',
      organizer: 'قسم التربية البدنية',
      participants: 200,
      maxParticipants: 240,
      image: '⚽',
      status: 'upcoming',
      difficulty: 'متقدم',
      prizes: ['كأس البطولة', 'ميداليات', 'شهادات'],
      requirements: ['لياقة بدنية جيدة', 'فحص طبي'],
      tags: ['رياضة', 'كرة قدم', 'بطولة'],
      rating: 4.9,
      isRegistered: false,
      isFavorite: true
    },
    {
      id: 4,
      title: 'حفل الموسيقى والإنشاد',
      description: 'أمسية موسيقية مع عروض الطلاب في الإنشاد والعزف',
      category: 'musical',
      date: '2024-03-01',
      time: '19:00',
      duration: '3 ساعات',
      location: 'المسرح المدرسي',
      organizer: 'نادي الموسيقى',
      participants: 80,
      maxParticipants: 100,
      image: '🎵',
      status: 'upcoming',
      difficulty: 'متوسط',
      prizes: ['شهادات مشاركة', 'آلات موسيقية'],
      requirements: ['موهبة موسيقية', 'تدريب مسبق'],
      tags: ['موسيقى', 'إنشاد', 'عرض'],
      rating: 4.7,
      isRegistered: true,
      isFavorite: true
    },
    {
      id: 5,
      title: 'ورشة الروبوتيك والبرمجة',
      description: 'ورشة تعليمية في الروبوتيك والبرمجة للمبتدئين',
      category: 'scientific',
      date: '2024-03-05',
      time: '10:00',
      duration: 'يومين',
      location: 'مختبر الحاسوب',
      organizer: 'نادي العلوم والتكنولوجيا',
      participants: 30,
      maxParticipants: 40,
      image: '🤖',
      status: 'upcoming',
      difficulty: 'مبتدئ',
      prizes: ['شهادات إتمام', 'مجموعات روبوتيك'],
      requirements: ['اهتمام بالتكنولوجيا', 'حاسوب محمول'],
      tags: ['روبوتيك', 'برمجة', 'تكنولوجيا'],
      rating: 4.5,
      isRegistered: false,
      isFavorite: false
    },
    {
      id: 6,
      title: 'يوم التراث الثقافي',
      description: 'احتفالية بالتراث الجزائري مع عروض تراثية ومأكولات شعبية',
      category: 'cultural',
      date: '2024-03-10',
      time: '08:00',
      duration: 'يوم كامل',
      location: 'الساحة الرئيسية',
      organizer: 'نادي التراث',
      participants: 300,
      maxParticipants: 400,
      image: '🏛️',
      status: 'upcoming',
      difficulty: 'مبتدئ',
      prizes: ['هدايا تراثية', 'شهادات مشاركة'],
      requirements: ['زي تراثي (اختياري)'],
      tags: ['تراث', 'ثقافة', 'احتفال'],
      rating: 4.8,
      isRegistered: true,
      isFavorite: true
    }
  ]);

  const [upcomingEvents] = useState([
    { id: 1, title: 'مسابقة الرياضيات', date: '2024-02-15', time: '09:00' },
    { id: 2, title: 'معرض الفنون', date: '2024-02-20', time: '14:00' },
    { id: 3, title: 'بطولة كرة القدم', date: '2024-02-25', time: '15:30' }
  ]);

  const filteredActivities = activities.filter(activity => {
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setShowActivityModal(true);
  };

  const handleRegister = (activityId: number) => {
    const activity = activities.find(a => a.id === activityId);
    showInfo('إشعار', `تم التسجيل في النشاط "${activity?.title}" بنجاح!`);
  };

  const handleToggleFavorite = (activityId: number) => {
    showInfo('إشعار', `تم ${activities.find(a => a.id === activityId)?.isFavorite ? 'إزالة من' : 'إضافة إلى'} المفضلة`);
  };

  const handleShare = (activity: Activity) => {
    showInfo('إشعار', `مشاركة: ${activity.title}`);
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      const Icon = category.icon;
      return <Icon className="h-4 w-4" />;
    }
    return <Calendar className="h-4 w-4" />;
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || 'gray';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'مبتدئ': return 'bg-green-100 text-green-800';
      case 'متوسط': return 'bg-yellow-100 text-yellow-800';
      case 'متقدم': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
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
                <h1 className="text-3xl font-bold mb-2">🎯 الأنشطة والفعاليات</h1>
                <p className="text-blue-100">اكتشف وشارك في الأنشطة المدرسية المتنوعة</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{activities.length}</div>
              <div className="text-sm">نشاط متاح</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="البحث في الأنشطة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">جميع التواريخ</option>
                <option value="today">اليوم</option>
                <option value="week">هذا الأسبوع</option>
                <option value="month">هذا الشهر</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              عرض {filteredActivities.length} من {activities.length} نشاط
            </div>
            
            <div className="flex space-x-2 rtl:space-x-reverse">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Filter className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Calendar className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredActivities.map((activity) => (
                  <div key={activity.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-4xl">{activity.image}</div>
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <button
                            onClick={() => handleToggleFavorite(activity.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              activity.isFavorite ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            <Heart className={`h-4 w-4 ${activity.isFavorite ? 'fill-current' : ''}`} />
                          </button>
                          <button
                            onClick={() => handleShare(activity)}
                            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                        {getCategoryIcon(activity.category)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${getCategoryColor(activity.category)}-100 text-${getCategoryColor(activity.category)}-800`}>
                          {categories.find(c => c.id === activity.category)?.name}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
                          {activity.difficulty}
                        </span>
                      </div>

                      <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2">{activity.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{activity.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 ml-2" />
                          {new Date(activity.date).toLocaleDateString('ar-SA')} - {activity.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 ml-2" />
                          {activity.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 ml-2" />
                          {activity.participants}/{activity.maxParticipants} مشارك
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 ml-1" />
                          <span className="text-sm font-medium">{activity.rating}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mx-4">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(activity.participants / activity.maxParticipants) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <button
                          onClick={() => handleActivityClick(activity)}
                          className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          تفاصيل
                        </button>
                        {!activity.isRegistered ? (
                          <button
                            onClick={() => handleRegister(activity.id)}
                            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            تسجيل
                          </button>
                        ) : (
                          <span className="bg-gray-100 text-gray-600 py-2 px-4 rounded-lg text-sm">
                            مسجل
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredActivities.map((activity) => (
                  <div key={activity.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-start space-x-4 rtl:space-x-reverse">
                      <div className="text-5xl">{activity.image}</div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                              {getCategoryIcon(activity.category)}
                              <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${getCategoryColor(activity.category)}-100 text-${getCategoryColor(activity.category)}-800`}>
                                {categories.find(c => c.id === activity.category)?.name}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
                                {activity.difficulty}
                              </span>
                            </div>
                            <h3 className="font-bold text-gray-800 text-xl mb-1">{activity.title}</h3>
                            <p className="text-gray-600 mb-3">{activity.description}</p>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 ml-1" />
                            <span className="text-sm font-medium">{activity.rating}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 ml-2" />
                            {new Date(activity.date).toLocaleDateString('ar-SA')}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 ml-2" />
                            {activity.time}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 ml-2" />
                            {activity.location}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Users className="h-4 w-4 ml-2" />
                            {activity.participants}/{activity.maxParticipants}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            {activity.tags.slice(0, 3).map((tag, index) => (
                              <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <button
                              onClick={() => handleActivityClick(activity)}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                            >
                              تفاصيل
                            </button>
                            {!activity.isRegistered ? (
                              <button
                                onClick={() => handleRegister(activity.id)}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                              >
                                تسجيل
                              </button>
                            ) : (
                              <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm">
                                مسجل
                              </span>
                            )}
                            <button
                              onClick={() => handleToggleFavorite(activity.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                activity.isFavorite ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              <Heart className={`h-4 w-4 ${activity.isFavorite ? 'fill-current' : ''}`} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredActivities.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">لا توجد أنشطة</h3>
                <p className="text-gray-600">لم يتم العثور على أنشطة تطابق معايير البحث</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">الفئات</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-right p-3 rounded-lg transition-colors flex items-center ${
                        selectedCategory === category.id
                          ? `bg-${category.color}-100 text-${category.color}-800`
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-4 w-4 ml-3" />
                      <span className="flex-1">{category.name}</span>
                      <span className="text-sm text-gray-500">
                        {activities.filter(a => category.id === 'all' || a.category === category.id).length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">الأحداث القادمة</h3>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-800 text-sm">{event.title}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {new Date(event.date).toLocaleDateString('ar-SA')} - {event.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Activities */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">أنشطتي</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">المسجل فيها</span>
                  <span className="font-bold text-blue-600">{activities.filter(a => a.isRegistered).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">المفضلة</span>
                  <span className="font-bold text-red-600">{activities.filter(a => a.isFavorite).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">المكتملة</span>
                  <span className="font-bold text-green-600">5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Details Modal */}
      {showActivityModal && selectedActivity && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">تفاصيل النشاط</h3>
              <button
                onClick={() => setShowActivityModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="flex items-start space-x-6 rtl:space-x-reverse mb-6">
              <div className="text-8xl">{selectedActivity.image}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                  {getCategoryIcon(selectedActivity.category)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium bg-${getCategoryColor(selectedActivity.category)}-100 text-${getCategoryColor(selectedActivity.category)}-800`}>
                    {categories.find(c => c.id === selectedActivity.category)?.name}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedActivity.difficulty)}`}>
                    {selectedActivity.difficulty}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">{selectedActivity.title}</h4>
                <p className="text-gray-700 mb-4">{selectedActivity.description}</p>
                <div className="flex items-center mb-2">
                  <Star className="h-5 w-5 text-yellow-500 ml-2" />
                  <span className="font-medium">{selectedActivity.rating}</span>
                  <span className="text-gray-500 mr-2">({selectedActivity.participants} مشارك)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">التاريخ والوقت</div>
                <div className="font-medium">{new Date(selectedActivity.date).toLocaleDateString('ar-SA')} - {selectedActivity.time}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">المدة</div>
                <div className="font-medium">{selectedActivity.duration}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">المكان</div>
                <div className="font-medium">{selectedActivity.location}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">المنظم</div>
                <div className="font-medium">{selectedActivity.organizer}</div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-2">الجوائز</div>
              <div className="space-y-1">
                {selectedActivity.prizes.map((prize: string, index: number) => (
                  <div key={index} className="bg-yellow-50 text-yellow-800 px-3 py-1 rounded-lg text-sm">
                    {prize}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-2">المتطلبات</div>
              <div className="space-y-1">
                {selectedActivity.requirements.map((req: string, index: number) => (
                  <div key={index} className="bg-blue-50 text-blue-800 px-3 py-1 rounded-lg text-sm">
                    {req}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-2">الكلمات المفتاحية</div>
              <div className="flex flex-wrap gap-2">
                {selectedActivity.tags.map((tag: string, index: number) => (
                  <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-4 rtl:space-x-reverse">
              <button
                onClick={() => setShowActivityModal(false)}
                className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إغلاق
              </button>
              {!selectedActivity.isRegistered ? (
                <button
                  onClick={() => handleRegister(selectedActivity.id)}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  تسجيل في النشاط
                </button>
              ) : (
                <span className="bg-gray-100 text-gray-600 px-6 py-2 rounded-lg">
                  مسجل بالفعل
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;