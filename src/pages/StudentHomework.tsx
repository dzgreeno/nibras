import React, { useState, useEffect } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { BookOpen, Clock, Calendar, AlertCircle, CheckCircle, Play, Filter, Search, Star, Target, TrendingUp, Upload, FileText, Home, HelpCircle } from 'lucide-react';
import { AccountManager } from '../utils/accountManager';
import { PRIMARY_GRADES } from '../data/algerianEducationSystem';
import Breadcrumb from '../components/Breadcrumb';
import FloatingActionButton from '../components/FloatingActionButton';

interface Homework {
  id: number;
  title: string;
  subject: string;
  teacher: string;
  dueDate: string;
  estimatedTime: string;
  difficulty: string;
  priority: 'high' | 'medium' | 'low';
  description: string;
  progress?: number;
  grade?: number;
  maxGrade?: number;
  completedDate?: string;
  submittedDate?: string;
  feedback?: string;
  startedDate?: string;
}

interface HomeworkData {
  new: Homework[];
  'in-progress': Homework[];
  completed: Homework[];
}

const StudentHomework: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [activeTab, setActiveTab] = useState<'new' | 'in-progress' | 'completed'>('new');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [showHomeworkModal, setShowHomeworkModal] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState<Homework | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [homeworkData, setHomeworkData] = useState<HomeworkData>({ new: [], 'in-progress': [], completed: [] });
  // Removed unused studentSubjects state

  useEffect(() => {
    const currentUser = AccountManager.getCurrentUser();
    if (currentUser && currentUser.role === 'student' && currentUser.studentData) {
      const grade = PRIMARY_GRADES.find(g => g.id === currentUser.studentData!.grade);
      if (grade) {
        // إنشاء واجبات تجريبية بناءً على مواد الطالب
        const generateHomework = () => {
          const teachers = ['أ. محمد العلي', 'أ. فاطمة أحمد', 'أ. خالد السعد', 'أ. سارة بن علي', 'أ. عائشة محمد'];
          const difficulties = ['سهل', 'متوسط', 'صعب'];
          const priorities: ('high' | 'medium' | 'low')[] = ['high', 'medium', 'low'];
          
          const homeworkTitles: { [key: string]: string[] } = {
            'اللغة العربية': ['تطبيق درس النعت', 'كتابة موضوع تعبير', 'حفظ النص الشعري', 'تمارين الإملاء'],
            'الرياضيات': ['تمارين الجمع والطرح', 'حل مسائل الضرب', 'تمارين الهندسة', 'مسائل القسمة'],
            'التربية الإسلامية': ['حفظ سورة قصيرة', 'قراءة قصة نبوية', 'تطبيق آداب الطعام', 'كتابة عن الصلاة'],
            'التربية العلمية والتكنولوجية': ['بحث عن النباتات', 'تجربة علمية بسيطة', 'رسم دورة الماء', 'مشاهدة فيديو علمي'],
            'التربية المدنية': ['كتابة عن حقوق الطفل', 'رسم العلم الجزائري', 'بحث عن الوطن', 'قراءة عن التاريخ'],
            'التاريخ والجغرافيا': ['رسم خريطة الجزائر', 'بحث عن شخصية تاريخية', 'كتابة عن المناخ', 'قراءة عن الحضارات'],
            'اللغة الإنجليزية': ['كتابة فقرة بسيطة', 'حفظ كلمات جديدة', 'تمارين الحروف', 'قراءة نص قصير'],
            'التربية الفنية': ['رسم منظر طبيعي', 'صنع أشكال بالصلصال', 'تلوين رسمة', 'عمل يدوي بسيط'],
            'التربية البدنية والرياضية': ['تمارين رياضية منزلية', 'مشاهدة مباراة رياضية', 'تعلم لعبة جديدة', 'المشي اليومي']
          };

          const newHomework: Homework[] = grade.subjects.slice(0, 4).map((subject: string, index: number) => ({
            id: index + 1,
            title: homeworkTitles[subject]?.[Math.floor(Math.random() * homeworkTitles[subject].length)] || `واجب ${subject}`,
            subject: subject,
            teacher: teachers[Math.floor(Math.random() * teachers.length)],
            dueDate: new Date(Date.now() + (index + 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            estimatedTime: `${Math.floor(Math.random() * 45 + 15)} دقيقة`,
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            priority: priorities[Math.floor(Math.random() * priorities.length)],
            description: `واجب في مادة ${subject} - يرجى إكماله في الوقت المحدد`
          }));

          const inProgressHomework: Homework[] = grade.subjects.slice(4, 6).map((subject: string, index: number) => ({
            id: index + 5,
            title: homeworkTitles[subject]?.[Math.floor(Math.random() * homeworkTitles[subject].length)] || `واجب ${subject}`,
            subject: subject,
            teacher: teachers[Math.floor(Math.random() * teachers.length)],
            dueDate: new Date(Date.now() + (index + 3) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            estimatedTime: `${Math.floor(Math.random() * 45 + 15)} دقيقة`,
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            priority: priorities[Math.floor(Math.random() * priorities.length)],
            description: `واجب في مادة ${subject} - قيد التنفيذ`,
            progress: Math.floor(Math.random() * 70 + 10)
          }));

          const completedHomework: Homework[] = grade.subjects.slice(6, 8).map((subject: string, index: number) => ({
            id: index + 7,
            title: homeworkTitles[subject]?.[Math.floor(Math.random() * homeworkTitles[subject].length)] || `واجب ${subject}`,
            subject: subject,
            teacher: teachers[Math.floor(Math.random() * teachers.length)],
            dueDate: new Date(Date.now() - (index + 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            estimatedTime: `${Math.floor(Math.random() * 45 + 15)} دقيقة`,
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            priority: priorities[Math.floor(Math.random() * priorities.length)],
            description: `واجب في مادة ${subject} - مكتمل`,
            grade: Math.floor(Math.random() * 5 + 15),
            maxGrade: 20,
            completedDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            submittedDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          }));

          setHomeworkData({
            new: newHomework,
            'in-progress': inProgressHomework,
            completed: completedHomework
          });
        };

        generateHomework();
      }
    }
  }, []);

  // Remove unused filteredHomework variable since it's not used anywhere

  // مواد السنة الخامسة ابتدائي وفقاً للمنهاج الجزائري 2024-2025
  const subjects = [
    'اللغة العربية', 
    'الرياضيات', 
    'التربية الإسلامية', 
    'التربية العلمية والتكنولوجية', 
    'التربية المدنية', 
    'اللغة الفرنسية', 
    'اللغة الإنجليزية', 
    'اللغة الأمازيغية', 
    'التاريخ والجغرافيا', 
    'التربية الفنية والرياضية'
  ];

  const handleStartHomework = (homework: Homework) => {
    setSelectedHomework(homework);
    setShowHomeworkModal(true);
  };

  const handleSubmitHomework = (homework: Homework) => {
    setSelectedHomework(homework);
    setShowSubmitModal(true);
  };

  const handleCompleteSubmission = () => {
    if (selectedHomework) {
      // نقل الواجب من قيد التقدم إلى مكتمل
      const updatedHomework = {
        ...selectedHomework,
        completedDate: new Date().toISOString().split('T')[0],
        grade: Math.floor(Math.random() * 5) + 15, // درجة عشوائية بين 15-20
        maxGrade: 20,
        feedback: 'تم تسليم الواجب بنجاح! سيتم تقييمه قريباً.'
      };

      setHomeworkData(prev => ({
        ...prev,
        'in-progress': prev['in-progress'].filter(hw => hw.id !== selectedHomework.id),
        completed: [updatedHomework, ...prev.completed]
      }));

      setShowSubmitModal(false);
      showSuccess('تم بنجاح', 'تم تسليم الواجب بنجاح! ستحصل على النتيجة قريباً.');
    }
  };

  const handleMoveToProgress = (homework: Homework) => {
    setHomeworkData(prev => ({
      ...prev,
      new: prev.new.filter(hw => hw.id !== homework.id),
      'in-progress': [...prev['in-progress'], { ...homework, startedDate: new Date().toISOString().split('T')[0] }]
    }));
    setShowHomeworkModal(false);
    showSuccess('تم بنجاح', 'تم بدء العمل على الواجب!');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'عاجل';
      case 'medium': return 'متوسط';
      case 'low': return 'منخفض';
      default: return 'غير محدد';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'سهل': return 'text-green-600 bg-green-100';
      case 'متوسط': return 'text-yellow-600 bg-yellow-100';
      case 'صعب': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filterHomework = (homework: Homework[]) => {
    return homework.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = filterSubject === 'all' || item.subject === filterSubject;
      return matchesSearch && matchesSubject;
    });
  };

  const getTabCount = (tab: string) => {
    return filterHomework(homeworkData[tab as keyof typeof homeworkData]).length;
  };

  const renderHomeworkCard = (homework: Homework, type: string) => {
    return (
      <div key={homework.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{homework.title}</h3>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <BookOpen className="h-4 w-4 ml-1" />
              {homework.subject}
              <span className="mx-2">•</span>
              {homework.teacher}
            </div>
            <p className="text-gray-600 text-sm">{homework.description}</p>
          </div>
          
          {type !== 'completed' && (
            <div className="flex flex-col items-end space-y-2">
              {homework.priority && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(homework.priority)}`}>
                  {getPriorityText(homework.priority)}
                </span>
              )}
              {homework.difficulty && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(homework.difficulty)}`}>
                  {homework.difficulty}
                </span>
              )}
            </div>
          )}
        </div>

        {type === 'new' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 ml-1" />
                موعد التسليم: {new Date(homework.dueDate).toLocaleDateString('ar-DZ')}
                {isOverdue(homework.dueDate) && (
                  <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                )}
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 ml-1" />
                {homework.estimatedTime}
              </div>
            </div>
            
            {getDaysUntilDue(homework.dueDate) <= 2 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center text-red-700">
                  <AlertCircle className="h-4 w-4 ml-2" />
                  <span className="text-sm font-medium">
                    {getDaysUntilDue(homework.dueDate) === 0 ? 'مطلوب اليوم!' : 
                     getDaysUntilDue(homework.dueDate) === 1 ? 'مطلوب غداً' : 
                     `متبقي ${getDaysUntilDue(homework.dueDate)} أيام`}
                  </span>
                </div>
              </div>
            )}
            
            <button 
              onClick={() => handleStartHomework(homework)}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center font-semibold"
            >
              <Play className="h-5 w-5 ml-2" />
              ابدأ الواجب
            </button>
          </div>
        )}

        {type === 'in-progress' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>التقدم: {homework.progress}%</span>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 ml-1" />
                {new Date(homework.dueDate).toLocaleDateString('ar-DZ')}
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${homework.progress}%` }}
              ></div>
            </div>
            
            <div className="flex space-x-2 rtl:space-x-reverse">
              <button 
                onClick={() => handleSubmitHomework(homework)}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center font-semibold"
              >
                <Upload className="h-5 w-5 ml-2" />
                تسليم الواجب
              </button>
              <button 
                onClick={() => showInfo('جاري التحميل', 'متابعة العمل على الواجب...')}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center font-semibold"
              >
                <Play className="h-5 w-5 ml-2" />
                متابعة العمل
              </button>
            </div>
          </div>
        )}

        {type === 'completed' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500 ml-1" />
                اكتمل في: {homework.completedDate ? new Date(homework.completedDate).toLocaleDateString('ar-DZ') : 'غير محدد'}
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 ml-1" />
                <span className="font-semibold text-lg">{homework.grade}/{homework.maxGrade}</span>
              </div>
            </div>
            
            {homework.feedback && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-800 text-sm">{homework.feedback}</p>
              </div>
            )}
            
            <button 
              onClick={() => showInfo('إشعار', `📋 عرض تفاصيل الواجب: ${homework.title}\nالدرجة: ${homework.grade}/${homework.maxGrade}\nالتعليق: ${homework.feedback || 'لا يوجد تعليق'}`)}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors text-sm flex items-center justify-center"
            >
              <FileText className="h-4 w-4 ml-2" />
              عرض التفاصيل
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50">
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'الرئيسية', path: '/student-dashboard', icon: '🏠' },
        { label: 'واجباتي', icon: '📝' }
      ]} />

      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-red-600 text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">واجباتي</h1>
          <p className="text-green-100">تابع واجباتك وأنجزها في الوقت المحدد</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{homeworkData.new.length}</div>
            <div className="text-sm text-gray-600">واجبات جديدة</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{homeworkData['in-progress'].length}</div>
            <div className="text-sm text-gray-600">قيد الإنجاز</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{homeworkData.completed.length}</div>
            <div className="text-sm text-gray-600">مكتملة</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">85%</div>
            <div className="text-sm text-gray-600">معدل الإنجاز</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث في الواجبات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 ml-2" />
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">جميع المواد</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('new')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeTab === 'new'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              جديد ({getTabCount('new')})
            </button>
            <button
              onClick={() => setActiveTab('in-progress')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeTab === 'in-progress'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              قيد الإنجاز ({getTabCount('in-progress')})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeTab === 'completed'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              مكتمل ({getTabCount('completed')})
            </button>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterHomework(homeworkData[activeTab]).map(homework => 
                renderHomeworkCard(homework, activeTab)
              )}
            </div>

            {filterHomework(homeworkData[activeTab]).length === 0 && (
              <div className="text-center py-12">
                <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد واجبات</h3>
                <p className="text-gray-500">
                  {activeTab === 'new' && 'لا توجد واجبات جديدة في الوقت الحالي'}
                  {activeTab === 'in-progress' && 'لا توجد واجبات قيد الإنجاز'}
                  {activeTab === 'completed' && 'لم تكمل أي واجبات بعد'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Homework Details Modal */}
      {showHomeworkModal && selectedHomework && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedHomework.title}</h3>
              <p className="text-gray-600">{selectedHomework.subject}</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">تفاصيل الواجب:</h4>
                <p className="text-sm text-gray-600 mb-3">{selectedHomework.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">المعلم:</span>
                    <div className="font-medium">{selectedHomework.teacher}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">الوقت المقدر:</span>
                    <div className="font-medium">{selectedHomework.estimatedTime}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">الصعوبة:</span>
                    <div className="font-medium">{selectedHomework.difficulty}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">موعد التسليم:</span>
                    <div className="font-medium">{new Date(selectedHomework.dueDate).toLocaleDateString('ar-DZ')}</div>
                  </div>
                </div>
              </div>
              
              {selectedHomework.priority && (
                <div className={`p-3 rounded-lg ${getPriorityColor(selectedHomework.priority)}`}>
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 ml-2" />
                    <span className="font-medium">أولوية {getPriorityText(selectedHomework.priority)}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex space-x-3 rtl:space-x-reverse">
              <button
                onClick={() => setShowHomeworkModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={() => handleMoveToProgress(selectedHomework)}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                بدء العمل
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Homework Modal */}
      {showSubmitModal && selectedHomework && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">تسليم الواجب</h3>
              <p className="text-gray-600">{selectedHomework.title}</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">معلومات التسليم:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">التقدم الحالي:</span>
                    <span className="font-medium">{selectedHomework.progress}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">موعد التسليم:</span>
                    <span className="font-medium">{new Date(selectedHomework.dueDate).toLocaleDateString('ar-DZ')}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-center text-yellow-700">
                  <AlertCircle className="h-4 w-4 ml-2" />
                  <span className="text-sm">
                    تأكد من إكمال جميع المتطلبات قبل التسليم
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 rtl:space-x-reverse">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={handleCompleteSubmission}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                تأكيد التسليم
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <FloatingActionButton 
        actions={[
          { label: 'الرئيسية', path: '/student-dashboard', icon: Home, color: 'blue' },
          { label: 'موادي الدراسية', path: '/student-subjects', icon: BookOpen, color: 'green' },
          { label: 'المساعدة', path: '/support', icon: HelpCircle, color: 'orange' }
        ]}
      />
    </div>
  );
};

export default StudentHomework;