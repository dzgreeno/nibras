import React, { useState } from 'react';
import { Search, Filter, Plus, Upload, Download, Eye, Edit, Trash2, Star, BookOpen, FileText, Video, Image, Music, Archive } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import RoleBasedLayout from '../components/RoleBasedLayout';

interface ContentItem {
  id: string;
  title: string;
  type: 'document' | 'video' | 'audio' | 'image' | 'presentation';
  subject: string;
  grade: string;
  size: string;
  uploadDate: string;
  downloads: number;
  isFavorite: boolean;
  description: string;
  tags: string[];
}

const TeacherContentLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const contentItems: ContentItem[] = [
    {
      id: '1',
      title: 'درس الحروف الهجائية - الجزء الأول',
      type: 'presentation',
      subject: 'اللغة العربية',
      grade: 'الأول',
      size: '2.5 MB',
      uploadDate: '2024-01-15',
      downloads: 45,
      isFavorite: true,
      description: 'عرض تقديمي تفاعلي لتعليم الحروف الهجائية للصف الأول',
      tags: ['حروف', 'تفاعلي', 'أساسيات']
    },
    {
      id: '2',
      title: 'فيديو تعليمي - العمليات الحسابية',
      type: 'video',
      subject: 'الرياضيات',
      grade: 'الثاني',
      size: '15.2 MB',
      uploadDate: '2024-01-12',
      downloads: 32,
      isFavorite: false,
      description: 'فيديو يشرح العمليات الحسابية الأساسية بطريقة مبسطة',
      tags: ['جمع', 'طرح', 'فيديو']
    },
    {
      id: '3',
      title: 'ورقة عمل - التربية الإسلامية',
      type: 'document',
      subject: 'التربية الإسلامية',
      grade: 'الثالث',
      size: '1.8 MB',
      uploadDate: '2024-01-10',
      downloads: 28,
      isFavorite: true,
      description: 'ورقة عمل تفاعلية حول آداب الطعام في الإسلام',
      tags: ['آداب', 'ورقة عمل', 'تطبيق']
    },
    {
      id: '4',
      title: 'صور تعليمية - النباتات',
      type: 'image',
      subject: 'التربية العلمية',
      grade: 'الرابع',
      size: '5.1 MB',
      uploadDate: '2024-01-08',
      downloads: 19,
      isFavorite: false,
      description: 'مجموعة صور تعليمية عن أجزاء النبات ووظائفها',
      tags: ['نباتات', 'صور', 'علوم']
    },
    {
      id: '5',
      title: 'تسجيل صوتي - نشيد تعليمي',
      type: 'audio',
      subject: 'التربية الفنية',
      grade: 'الخامس',
      size: '3.7 MB',
      uploadDate: '2024-01-05',
      downloads: 15,
      isFavorite: false,
      description: 'نشيد تعليمي عن حب الوطن',
      tags: ['نشيد', 'وطن', 'موسيقى']
    }
  ];

  const subjects = ['اللغة العربية', 'الرياضيات', 'التربية الإسلامية', 'التربية العلمية', 'التربية الفنية'];
  const grades = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس'];
  const types = [
    { value: 'document', label: 'مستندات', icon: FileText },
    { value: 'video', label: 'فيديو', icon: Video },
    { value: 'audio', label: 'صوتيات', icon: Music },
    { value: 'image', label: 'صور', icon: Image },
    { value: 'presentation', label: 'عروض', icon: BookOpen }
  ];

  const filteredItems = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesSubject = selectedSubject === 'all' || item.subject === selectedSubject;
    const matchesGrade = selectedGrade === 'all' || item.grade === selectedGrade;
    
    return matchesSearch && matchesType && matchesSubject && matchesGrade;
  });

  const getTypeIcon = (type: string) => {
    const typeMap = {
      document: FileText,
      video: Video,
      audio: Music,
      image: Image,
      presentation: BookOpen
    };
    const Icon = typeMap[type as keyof typeof typeMap] || FileText;
    return <Icon className="w-5 h-5" />;
  };

  const getTypeColor = (type: string) => {
    const colorMap = {
      document: 'text-blue-600 bg-blue-50',
      video: 'text-red-600 bg-red-50',
      audio: 'text-green-600 bg-green-50',
      image: 'text-purple-600 bg-purple-50',
      presentation: 'text-orange-600 bg-orange-50'
    };
    return colorMap[type as keyof typeof colorMap] || 'text-gray-600 bg-gray-50';
  };

  const toggleFavorite = (id: string) => {
    // Toggle favorite logic here
    console.log('Toggle favorite for item:', id);
  };

  const handleDownload = (item: ContentItem) => {
    console.log('Download item:', item.title);
  };

  const handleEdit = (item: ContentItem) => {
    console.log('Edit item:', item.title);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المحتوى؟')) {
      console.log('Delete item:', id);
    }
  };

  return (
    <RoleBasedLayout>
      <div className="min-h-screen bg-gray-50" dir="rtl">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'الرئيسية', path: '/teacher-dashboard', icon: '🏠' },
          { label: 'مكتبة المحتوى', icon: '📚' }
        ]} />
        
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">📚 مكتبة المحتوى</h1>
                <p className="text-gray-600 mt-1">إدارة وتنظيم المواد التعليمية</p>
              </div>
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                رفع محتوى جديد
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">البحث</label>
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="البحث في المحتوى..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">النوع</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">جميع الأنواع</option>
                  {types.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المادة</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">جميع المواد</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الصف</label>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">جميع الصفوف</option>
                  {grades.map(grade => (
                    <option key={grade} value={grade}>الصف {grade}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <div className="flex rounded-md shadow-sm w-full">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-2 text-sm font-medium rounded-r-md border ${
                      viewMode === 'grid'
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    شبكة
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-2 text-sm font-medium rounded-l-md border-t border-b border-l ${
                      viewMode === 'list'
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    قائمة
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                        {getTypeIcon(item.type)}
                      </div>
                      <button
                        onClick={() => toggleFavorite(item.id)}
                        className={`p-1 rounded ${item.isFavorite ? 'text-yellow-600' : 'text-gray-400 hover:text-yellow-600'}`}
                      >
                        <Star className={`w-5 h-5 ${item.isFavorite ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{item.subject} - الصف {item.grade}</span>
                      <span>{item.size}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{new Date(item.uploadDate).toLocaleDateString('ar-SA')}</span>
                      <span>{item.downloads} تحميل</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDownload(item)}
                        className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded text-sm font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
                      >
                        <Download className="w-4 h-4" />
                        تحميل
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المحتوى
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      النوع
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المادة/الصف
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحجم
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      التحميلات
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredItems.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-lg ${getTypeColor(item.type)} ml-3`}>
                            {getTypeIcon(item.type)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                            <div className="text-sm text-gray-500">{item.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(item.type)}`}>
                          {types.find(t => t.value === item.type)?.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.subject}<br />
                        <span className="text-gray-500">الصف {item.grade}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.downloads}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleFavorite(item.id)}
                            className={`p-1 rounded ${item.isFavorite ? 'text-yellow-600' : 'text-gray-400 hover:text-yellow-600'}`}
                          >
                            <Star className={`w-4 h-4 ${item.isFavorite ? 'fill-current' : ''}`} />
                          </button>
                          <button
                            onClick={() => handleDownload(item)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-green-600 hover:text-green-900 p-1 rounded"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Archive className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">لا يوجد محتوى</h3>
              <p className="mt-1 text-sm text-gray-500">لم يتم العثور على محتوى يطابق معايير البحث</p>
            </div>
          )}
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">رفع محتوى جديد</h3>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">عنوان المحتوى</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="أدخل عنوان المحتوى"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">النوع</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                      {types.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">المادة</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الصف</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                      {grades.map(grade => (
                        <option key={grade} value={grade}>الصف {grade}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="وصف مختصر للمحتوى"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الملف</label>
                    <input
                      type="file"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      رفع المحتوى
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowUploadModal(false)}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                    >
                      إلغاء
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </RoleBasedLayout>
  );
};

export default TeacherContentLibrary;