import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { BookOpen, Search, Filter, Download, Eye, Heart, Star, ArrowLeft, Play, FileText, Headphones, Video, Image } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import RoleBasedLayout from '../components/RoleBasedLayout';

const StudentLibrary: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showBookModal, setShowBookModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);

  const categories = [
    { id: 'all', name: 'جميع الفئات', count: 120 },
    { id: 'arabic', name: 'اللغة العربية', count: 25 },
    { id: 'math', name: 'الرياضيات', count: 20 },
    { id: 'islamic', name: 'التربية الإسلامية', count: 18 },
    { id: 'science', name: 'التربية العلمية والتكنولوجية', count: 16 },
    { id: 'civic', name: 'التربية المدنية', count: 12 },
    { id: 'history-geo', name: 'التاريخ والجغرافيا', count: 14 },
    { id: 'english', name: 'اللغة الإنجليزية', count: 8 },
    { id: 'french', name: 'اللغة الفرنسية', count: 7 }
  ];

  const types = [
    { id: 'all', name: 'جميع الأنواع', icon: BookOpen },
    { id: 'book', name: 'كتب', icon: BookOpen },
    { id: 'video', name: 'فيديوهات', icon: Video },
    { id: 'audio', name: 'ملفات صوتية', icon: Headphones },
    { id: 'document', name: 'مستندات', icon: FileText },
    { id: 'image', name: 'صور', icon: Image }
  ];

  const [books] = useState([
    {
      id: 1,
      title: 'كتاب اللغة العربية - السنة الخامسة ابتدائي',
      author: 'وزارة التربية الوطنية',
      category: 'arabic',
      type: 'book',
      description: 'كتاب اللغة العربية المقرر للسنة الخامسة ابتدائي، يحتوي على دروس القراءة والكتابة والنحو',
      pages: 120,
      size: '12.5 MB',
      rating: 4.9,
      downloads: 2850,
      thumbnail: '📚',
      isFavorite: true,
      isDownloaded: true,
      publishDate: '2024-09-01',
      tags: ['قراءة', 'كتابة', 'نحو', 'إملاء']
    },
    {
      id: 2,
      title: 'دروس الرياضيات التفاعلية',
      author: 'أ. محمد علي',
      category: 'math',
      type: 'video',
      description: 'مجموعة من الدروس التفاعلية في الرياضيات تشمل الجبر والهندسة',
      duration: '2:30:00',
      size: '450 MB',
      rating: 4.9,
      downloads: 890,
      thumbnail: '🎥',
      isFavorite: false,
      isDownloaded: false,
      publishDate: '2023-10-15',
      tags: ['جبر', 'هندسة', 'تفاعلي', 'شرح']
    },
    {
      id: 3,
      title: 'تجارب الفيزياء العملية',
      author: 'أ. سارة حسن',
      category: 'science',
      type: 'video',
      description: 'مجموعة من التجارب العملية في الفيزياء مع الشرح المفصل',
      duration: '1:45:00',
      size: '320 MB',
      rating: 4.7,
      downloads: 654,
      thumbnail: '🔬',
      isFavorite: true,
      isDownloaded: true,
      publishDate: '2023-11-01',
      tags: ['تجارب', 'فيزياء', 'عملي', 'مختبر']
    },
    {
      id: 4,
      title: 'ملخص التاريخ الإسلامي',
      author: 'أ. أحمد بن علي',
      category: 'history',
      type: 'document',
      description: 'ملخص شامل للتاريخ الإسلامي من البعثة النبوية حتى العصر الحديث',
      pages: 95,
      size: '8.5 MB',
      rating: 4.6,
      downloads: 432,
      thumbnail: '📜',
      isFavorite: false,
      isDownloaded: false,
      publishDate: '2023-09-20',
      tags: ['تاريخ', 'إسلامي', 'ملخص', 'شامل']
    },
    {
      id: 5,
      title: 'أطلس الجغرافيا التفاعلي',
      author: 'أ. عمر يوسف',
      category: 'geography',
      type: 'image',
      description: 'مجموعة من الخرائط والصور الجغرافية التفاعلية',
      images: 120,
      size: '75 MB',
      rating: 4.5,
      downloads: 321,
      thumbnail: '🗺️',
      isFavorite: false,
      isDownloaded: true,
      publishDate: '2023-10-05',
      tags: ['خرائط', 'جغرافيا', 'أطلس', 'تفاعلي']
    },
    {
      id: 6,
      title: 'قواعد اللغة الإنجليزية',
      author: 'أ. نور الدين',
      category: 'english',
      type: 'audio',
      description: 'دروس صوتية لتعلم قواعد اللغة الإنجليزية مع النطق الصحيح',
      duration: '3:15:00',
      size: '180 MB',
      rating: 4.4,
      downloads: 567,
      thumbnail: '🎧',
      isFavorite: true,
      isDownloaded: false,
      publishDate: '2023-11-10',
      tags: ['قواعد', 'إنجليزية', 'نطق', 'صوتي']
    }
  ]);

  const [recentlyViewed] = useState([
    { id: 1, title: 'كتاب اللغة العربية', thumbnail: '📚', viewedAt: '2024-01-15' },
    { id: 3, title: 'تجارب الفيزياء العملية', thumbnail: '🔬', viewedAt: '2024-01-14' },
    { id: 5, title: 'أطلس الجغرافيا التفاعلي', thumbnail: '🗺️', viewedAt: '2024-01-13' }
  ]);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    const matchesType = selectedType === 'all' || book.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleBookClick = (book: any) => {
    setSelectedBook(book);
    setShowBookModal(true);
  };

  const handleDownload = (book: any) => {
    showInfo('إشعار', `بدء تحميل: ${book.title}`);
  };

  const handleToggleFavorite = (bookId: number) => {
    showInfo('إشعار', `تم ${books.find(b => b.id === bookId)?.isFavorite ? 'إزالة من' : 'إضافة إلى'} المفضلة`);
  };

  const handleRead = (book: any) => {
    showInfo('إشعار', `فتح للقراءة: ${book.title}`);
  };

  const handlePlay = (book: any) => {
    showInfo('إشعار', `بدء تشغيل: ${book.title}`);
  };

  const getTypeIcon = (type: string) => {
    const typeObj = types.find(t => t.id === type);
    if (typeObj) {
      const Icon = typeObj.icon;
      return <Icon className="h-4 w-4" />;
    }
    return <BookOpen className="h-4 w-4" />;
  };

  const getFileInfo = (book: any) => {
    switch (book.type) {
      case 'book':
      case 'document':
        return `${book.pages} صفحة`;
      case 'video':
      case 'audio':
        return book.duration;
      case 'image':
        return `${book.images} صورة`;
      default:
        return book.size;
    }
  };

  const getActionButton = (book: any) => {
    switch (book.type) {
      case 'video':
      case 'audio':
        return (
          <button
            onClick={() => handlePlay(book)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <Play className="h-4 w-4 ml-2" />
            تشغيل
          </button>
        );
      case 'book':
      case 'document':
      case 'image':
        return (
          <button
            onClick={() => handleRead(book)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Eye className="h-4 w-4 ml-2" />
            عرض
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <RoleBasedLayout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'الرئيسية', path: '/student-dashboard', icon: '🏠' },
          { label: 'المكتبة', icon: '📖' }
        ]} />
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white p-6">
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
                <h1 className="text-3xl font-bold mb-2">📚 المكتبة الرقمية</h1>
                <p className="text-emerald-100">مكتبة شاملة من الكتب والموارد التعليمية</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{books.length}</div>
              <div className="text-sm">مورد متاح</div>
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
                  placeholder="البحث في المكتبة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                {types.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              عرض {filteredBooks.length} من {books.length} مورد
            </div>
            
            <div className="flex space-x-2 rtl:space-x-reverse">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Filter className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <BookOpen className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <div key={book.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="p-6">
                      <div className="text-center mb-4">
                        <div className="text-6xl mb-3">{book.thumbnail}</div>
                        <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-2">
                          {getTypeIcon(book.type)}
                          <span className="text-sm text-gray-600 capitalize">{book.type}</span>
                        </div>
                      </div>

                      <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{book.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                      <p className="text-xs text-gray-500 mb-4 line-clamp-2">{book.description}</p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 ml-1" />
                          <span className="text-sm font-medium">{book.rating}</span>
                        </div>
                        <div className="text-xs text-gray-500">{getFileInfo(book)}</div>
                      </div>

                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <button
                          onClick={() => handleBookClick(book)}
                          className="flex-1 bg-emerald-600 text-white py-2 px-3 rounded-lg hover:bg-emerald-700 transition-colors text-sm"
                        >
                          تفاصيل
                        </button>
                        <button
                          onClick={() => handleToggleFavorite(book.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            book.isFavorite ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${book.isFavorite ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          onClick={() => handleDownload(book)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBooks.map((book) => (
                  <div key={book.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-start space-x-4 rtl:space-x-reverse">
                      <div className="text-4xl">{book.thumbnail}</div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-gray-800 text-lg mb-1">{book.title}</h3>
                            <p className="text-gray-600 mb-2">{book.author}</p>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 ml-1" />
                            <span className="text-sm font-medium">{book.rating}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{book.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500">
                            <div className="flex items-center">
                              {getTypeIcon(book.type)}
                              <span className="mr-1">{getFileInfo(book)}</span>
                            </div>
                            <div>{book.downloads} تحميل</div>
                            <div>{book.size}</div>
                          </div>
                          
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            {getActionButton(book)}
                            <button
                              onClick={() => handleToggleFavorite(book.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                book.isFavorite ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              <Heart className={`h-4 w-4 ${book.isFavorite ? 'fill-current' : ''}`} />
                            </button>
                            <button
                              onClick={() => handleDownload(book)}
                              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                            >
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredBooks.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">لا توجد نتائج</h3>
                <p className="text-gray-600">لم يتم العثور على موارد تطابق معايير البحث</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recently Viewed */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">المشاهدة الأخيرة</h3>
              <div className="space-y-3">
                {recentlyViewed.map((item) => (
                  <div key={item.id} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="text-2xl ml-3">{item.thumbnail}</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 text-sm line-clamp-2">{item.title}</div>
                      <div className="text-xs text-gray-500">{item.viewedAt}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Categories */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">الفئات الشائعة</h3>
              <div className="space-y-2">
                {categories.slice(1, 6).map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-right p-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-sm text-gray-500">{category.count}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">إحصائيات سريعة</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">إجمالي الموارد</span>
                  <span className="font-bold text-emerald-600">{books.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">المفضلة</span>
                  <span className="font-bold text-red-600">{books.filter(b => b.isFavorite).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">المحملة</span>
                  <span className="font-bold text-blue-600">{books.filter(b => b.isDownloaded).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">إجمالي التحميلات</span>
                  <span className="font-bold text-purple-600">{books.reduce((sum, book) => sum + book.downloads, 0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Book Details Modal */}
      {showBookModal && selectedBook && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">تفاصيل المورد</h3>
              <button
                onClick={() => setShowBookModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="flex items-start space-x-6 rtl:space-x-reverse mb-6">
              <div className="text-8xl">{selectedBook.thumbnail}</div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-800 mb-2">{selectedBook.title}</h4>
                <p className="text-gray-600 mb-2">{selectedBook.author}</p>
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500 ml-2" />
                  <span className="font-medium">{selectedBook.rating}</span>
                  <span className="text-gray-500 mr-2">({selectedBook.downloads} تحميل)</span>
                </div>
                <p className="text-gray-700">{selectedBook.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">النوع</div>
                <div className="font-medium flex items-center">
                  {getTypeIcon(selectedBook.type)}
                  <span className="mr-2 capitalize">{selectedBook.type}</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">الحجم</div>
                <div className="font-medium">{selectedBook.size}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">تاريخ النشر</div>
                <div className="font-medium">{new Date(selectedBook.publishDate).toLocaleDateString('ar-SA')}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">المعلومات</div>
                <div className="font-medium">{getFileInfo(selectedBook)}</div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-2">الكلمات المفتاحية</div>
              <div className="flex flex-wrap gap-2">
                {selectedBook.tags.map((tag: string, index: number) => (
                  <span key={index} className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-4 rtl:space-x-reverse">
              <button
                onClick={() => setShowBookModal(false)}
                className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إغلاق
              </button>
              {getActionButton(selectedBook)}
              <button
                onClick={() => handleDownload(selectedBook)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Download className="h-4 w-4 ml-2" />
                تحميل
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </RoleBasedLayout>
  );
};

export default StudentLibrary;