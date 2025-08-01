import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { BookOpen, Calendar, Plus, Edit, Trash2, Eye, ArrowLeft, Search, FileText, X } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import RoleBasedLayout from '../components/RoleBasedLayout';

interface Assignment {
  id: string;
  title: string;
  type: 'assignment' | 'exam';
  class: string;
  subject: string;
  dueDate: string;
  createdDate: string;
  status: 'active' | 'scheduled' | 'completed' | 'overdue';
  totalStudents: number;
  submitted: number;
  graded: number;
  description: string;
  maxGrade: number;
  attachments?: string[];
  instructions?: string;
  duration?: number;
  topics?: string[];
  isGroup?: boolean;
  groupSize?: number;
}

interface NewItem {
  title: string;
  description: string;
  dueDate: string;
  maxGrade: number;
  instructions: string;
  duration: number;
  topics: string[];
  attachments: string[];
  isGroup: boolean;
  groupSize: number;
}

const TeacherAssignments: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo, showConfirm } = useNotification();
  const [activeTab, setActiveTab] = useState('assignments');
  const [selectedClass, setSelectedClass] = useState('3A');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Assignment | null>(null);
  const [createType, setCreateType] = useState<'assignment' | 'exam'>('assignment');

  const classes = [
    { id: '3A', name: 'السنة الثالثة - فوج أ', students: 28 },
    { id: '3B', name: 'السنة الثالثة - فوج ب', students: 26 },
    { id: '2A', name: 'السنة الثانية - فوج أ', students: 30 }
  ];

  const [assignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'واجب النحو - الفعل والفاعل',
      type: 'assignment',
      class: '3A',
      subject: 'اللغة العربية',
      dueDate: '2024-01-20',
      createdDate: '2024-01-15',
      status: 'active',
      totalStudents: 28,
      submitted: 15,
      graded: 8,
      description: 'حل التمارين من الصفحة 45 إلى 50 في كتاب النحو',
      attachments: ['تمارين_النحو.pdf'],
      maxGrade: 20,
      instructions: 'يرجى حل جميع التمارين وكتابة الإجابات بخط واضح'
    },
    {
      id: '2',
      title: 'اختبار شهري - الأدب الجاهلي',
      type: 'exam',
      class: '3A',
      subject: 'اللغة العربية',
      dueDate: '2024-01-25',
      createdDate: '2024-01-10',
      status: 'scheduled',
      totalStudents: 28,
      submitted: 0,
      graded: 0,
      description: 'اختبار شامل حول الأدب الجاهلي والشعراء المشهورين',
      duration: 90,
      maxGrade: 20,
      topics: ['المعلقات', 'الشعر الجاهلي', 'النثر الجاهلي']
    },
    {
      id: '3',
      title: 'مشروع البحث - تاريخ الجزائر',
      type: 'assignment',
      class: '3B',
      subject: 'التاريخ',
      dueDate: '2024-02-01',
      createdDate: '2024-01-12',
      status: 'active',
      totalStudents: 26,
      submitted: 12,
      graded: 5,
      description: 'بحث مفصل حول فترة معينة من تاريخ الجزائر',
      maxGrade: 20,
      isGroup: true,
      groupSize: 3
    }
  ]);

  const [newItem, setNewItem] = useState<NewItem>({
    title: '',
    description: '',
    dueDate: '',
    maxGrade: 20,
    instructions: '',
    duration: 60,
    topics: [],
    attachments: [],
    isGroup: false,
    groupSize: 1
  });

  const filteredAssignments: Assignment[] = assignments.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || item.class === selectedClass;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesType = activeTab === 'all' || 
                       (activeTab === 'assignments' && item.type === 'assignment') ||
                       (activeTab === 'exams' && item.type === 'exam');
    
    return matchesSearch && matchesClass && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'scheduled': return 'مجدول';
      case 'completed': return 'مكتمل';
      case 'overdue': return 'متأخر';
      default: return 'غير محدد';
    }
  };

  const handleCreateItem = () => {
    if (newItem.title && newItem.dueDate) {
      showSuccess('تم الإنشاء', `تم إنشاء ${createType === 'assignment' ? 'الواجب' : 'الاختبار'}: ${newItem.title}`);
      setShowCreateModal(false);
      setNewItem({
        title: '',
        description: '',
        dueDate: '',
        maxGrade: 20,
        instructions: '',
        duration: 60,
        topics: [],
        attachments: [],
        isGroup: false,
        groupSize: 1
      });
    }
  };

  const handleViewDetails = (item: Assignment) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
  };

  const handleDeleteItem = async () => {
    const confirmed = await showConfirm(
      'تأكيد الحذف',
      'هل أنت متأكد من حذف هذا العنصر؟'
    );
    if (confirmed) {
      showSuccess('تم الحذف', 'تم حذف العنصر بنجاح');
    }
  };

  const getSubmissionProgress = (submitted: number, total: number) => {
    return (submitted / total) * 100;
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <RoleBasedLayout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'الرئيسية', path: '/teacher-dashboard', icon: '🏠' },
          { label: 'الواجبات والاختبارات', icon: '📋' }
        ]} />
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
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
                <h1 className="text-3xl font-bold mb-2">📚 إدارة الواجبات والاختبارات</h1>
                <p className="text-indigo-100">إنشاء ومتابعة الواجبات والاختبارات</p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg hover:bg-white/30 transition-colors flex items-center"
            >
              <Plus className="h-5 w-5 ml-2" />
              إنشاء جديد
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          {/* Tabs */}
          <div className="flex space-x-1 rtl:space-x-reverse bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setActiveTab('assignments')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'assignments'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              الواجبات المنزلية
            </button>
            <button
              onClick={() => setActiveTab('exams')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'exams'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              الاختبارات
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الفصل</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">جميع الفصول</option>
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">جميع الحالات</option>
                <option value="active">نشط</option>
                <option value="scheduled">مجدول</option>
                <option value="completed">مكتمل</option>
                <option value="overdue">متأخر</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">البحث</label>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="ابحث في العنوان أو الوصف..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAssignments.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Header */}
              <div className={`p-4 ${item.type === 'assignment' ? 'bg-blue-50' : 'bg-purple-50'}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    {item.type === 'assignment' ? (
                      <BookOpen className="h-5 w-5 text-blue-600 ml-2" />
                    ) : (
                      <FileText className="h-5 w-5 text-purple-600 ml-2" />
                    )}
                    <span className={`text-sm font-medium ${
                      item.type === 'assignment' ? 'text-blue-600' : 'text-purple-600'
                    }`}>
                      {item.type === 'assignment' ? 'واجب منزلي' : 'اختبار'}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {getStatusText(item.status)}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.class} - {item.subject}</p>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">{item.totalStudents}</div>
                    <div className="text-xs text-gray-500">طالب</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{item.submitted}</div>
                    <div className="text-xs text-gray-500">مُسلم</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{item.graded}</div>
                    <div className="text-xs text-gray-500">مُصحح</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>التقدم</span>
                    <span>{Math.round(getSubmissionProgress(item.submitted, item.totalStudents))}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getSubmissionProgress(item.submitted, item.totalStudents)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Due Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 ml-1" />
                    <span>موعد التسليم: {item.dueDate}</span>
                  </div>
                  <div className={`text-sm font-medium ${
                    getDaysUntilDue(item.dueDate) < 0 ? 'text-red-600' :
                    getDaysUntilDue(item.dueDate) <= 3 ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {getDaysUntilDue(item.dueDate) < 0 
                      ? `متأخر ${Math.abs(getDaysUntilDue(item.dueDate))} يوم`
                      : getDaysUntilDue(item.dueDate) === 0
                      ? 'اليوم'
                      : `${getDaysUntilDue(item.dueDate)} يوم متبقي`
                    }
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <button
                    onClick={() => handleViewDetails(item)}
                    className="flex-1 bg-indigo-600 text-white py-2 px-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center text-sm"
                  >
                    <Eye className="h-4 w-4 ml-1" />
                    عرض
                  </button>
                  <button
                    onClick={() => showInfo('إشعار', 'فتح محرر العنصر')}
                    className="bg-gray-200 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleDeleteItem}
                    className="bg-red-100 text-red-600 py-2 px-3 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAssignments.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">لا توجد عناصر</h3>
            <p className="text-gray-600">لم يتم العثور على واجبات أو اختبارات تطابق المعايير المحددة</p>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              إنشاء {createType === 'assignment' ? 'واجب منزلي' : 'اختبار'} جديد
            </h3>
            
            {/* Type Selection */}
            <div className="flex space-x-4 rtl:space-x-reverse mb-6">
              <button
                onClick={() => setCreateType('assignment')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                  createType === 'assignment'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <BookOpen className="h-5 w-5 mx-auto mb-1" />
                <div className="text-sm font-medium">واجب منزلي</div>
              </button>
              <button
                onClick={() => setCreateType('exam')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                  createType === 'exam'
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <FileText className="h-5 w-5 mx-auto mb-1" />
                <div className="text-sm font-medium">اختبار</div>
              </button>
            </div>

            <div className="space-y-4">
              {/* Basic Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder={`عنوان ${createType === 'assignment' ? 'الواجب' : 'الاختبار'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="وصف مفصل للمحتوى والمتطلبات"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">موعد التسليم</label>
                  <input
                    type="date"
                    value={newItem.dueDate}
                    onChange={(e) => setNewItem({...newItem, dueDate: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الدرجة القصوى</label>
                  <input
                    type="number"
                    value={newItem.maxGrade}
                    onChange={(e) => setNewItem({...newItem, maxGrade: parseInt(e.target.value)})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    min="1"
                    max="100"
                  />
                </div>
              </div>

              {createType === 'exam' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">مدة الاختبار (دقيقة)</label>
                  <input
                    type="number"
                    value={newItem.duration}
                    onChange={(e) => setNewItem({...newItem, duration: parseInt(e.target.value)})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    min="15"
                    max="180"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">التعليمات</label>
                <textarea
                  value={newItem.instructions}
                  onChange={(e) => setNewItem({...newItem, instructions: e.target.value})}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="تعليمات مفصلة للطلاب"
                />
              </div>

              {createType === 'assignment' && (
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newItem.isGroup}
                      onChange={(e) => setNewItem({...newItem, isGroup: e.target.checked})}
                      className="ml-2"
                    />
                    <span className="text-sm font-medium text-gray-700">عمل جماعي</span>
                  </label>
                  {newItem.isGroup && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">حجم المجموعة</label>
                      <input
                        type="number"
                        value={newItem.groupSize}
                        onChange={(e) => setNewItem({...newItem, groupSize: parseInt(e.target.value)})}
                        className="w-20 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        min="2"
                        max="6"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex space-x-4 rtl:space-x-reverse mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={handleCreateItem}
                className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                إنشاء {createType === 'assignment' ? 'الواجب' : 'الاختبار'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">{selectedItem.title}</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-2">معلومات أساسية</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">النوع: </span>
                    <span className="font-medium">{selectedItem.type === 'assignment' ? 'واجب منزلي' : 'اختبار'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">الفصل: </span>
                    <span className="font-medium">{selectedItem.class}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">المادة: </span>
                    <span className="font-medium">{selectedItem.subject}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">الدرجة القصوى: </span>
                    <span className="font-medium">{selectedItem.maxGrade}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">الوصف</h4>
                <p className="text-gray-600">{selectedItem.description}</p>
              </div>

              {selectedItem.instructions && (
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">التعليمات</h4>
                  <p className="text-gray-600">{selectedItem.instructions}</p>
                </div>
              )}

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-2">إحصائيات التسليم</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{selectedItem.totalStudents}</div>
                    <div className="text-sm text-gray-600">إجمالي الطلاب</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{selectedItem.submitted}</div>
                    <div className="text-sm text-gray-600">تم التسليم</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{selectedItem.graded}</div>
                    <div className="text-sm text-gray-600">تم التصحيح</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 rtl:space-x-reverse mt-6">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إغلاق
              </button>
              <button
                onClick={() => showInfo('إشعار', 'فتح صفحة التصحيح')}
                className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                بدء التصحيح
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </RoleBasedLayout>
  );
};

export default TeacherAssignments;