import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Play, CheckCircle, Clock, Star, Search, Filter, ArrowRight, Target, TrendingUp, Award, Home, FileText, HelpCircle } from 'lucide-react';
import { AccountManager } from '../utils/accountManager';
import { PRIMARY_SUBJECTS, PRIMARY_GRADES } from '../data/algerianEducationSystem';
import Breadcrumb from '../components/Breadcrumb';
import QuickActions from '../components/QuickActions';
import FloatingActionButton from '../components/FloatingActionButton';
import { studentQuickActions } from '../data/quickActions';

// Define types for better type safety
interface Lesson {
  id: number;
  title: string;
  status: 'completed' | 'in-progress' | 'not-started';
  duration: string;
}

interface LessonWithSubject extends Lesson {
  subject: string;
}

interface Unit {
  id: number;
  name: string;
  lessons: Lesson[];
}

interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  weeklyHours: string;
  sessions: string;
  description?: string;
  isNew?: boolean;
  units: Unit[];
}

interface Quiz {
  id: number;
  title: string;
  questions: number;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  score?: number;
}

const StudentSubjects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'in-progress' | 'not-started'>('all');
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<LessonWithSubject | null>(null);

  const [showQuizModal, setShowQuizModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const currentUser = AccountManager.getCurrentUser();
    if (currentUser && currentUser.role === 'student' && currentUser.studentData) {
      const grade = PRIMARY_GRADES.find(g => g.id === currentUser.studentData!.grade);
      if (grade) {
        const studentSubjects = grade.subjects.map((subjectName: string, index: number) => {
          const subjectData = PRIMARY_SUBJECTS.find(s => s.arabicName === subjectName);
          return {
            id: subjectData?.id || `subject_${index}`,
            name: subjectName,
            icon: getSubjectIcon(subjectName),
            color: getSubjectColor(index),
            progress: Math.floor(Math.random() * 50 + 30), // تقدم عشوائي للعرض
            totalLessons: (subjectData?.weeklyHours || 5) * 4, // تقدير عدد الدروس
            completedLessons: Math.floor(Math.random() * 15 + 5),
            weeklyHours: `${subjectData?.weeklyHours || 2} ساعة/أسبوع`,
            sessions: 'متعددة',
            description: getSubjectDescription(subjectName),
            isNew: subjectName === 'اللغة الإنجليزية' && grade.id === 'grade_5',
            units: generateUnits(subjectName)
          };
        });
        setSubjects(studentSubjects);
      }
    }
  }, []);

  const getSubjectIcon = (subjectName: string) => {
    const icons: { [key: string]: string } = {
      'اللغة العربية': '📚',
      'الرياضيات': '🔢',
      'التربية الإسلامية': '🕌',
      'التربية العلمية والتكنولوجية': '🔬',
      'التربية المدنية': '🏛️',
      'التاريخ والجغرافيا': '🌍',
      'اللغة الإنجليزية': '🇬🇧',
      'التربية الفنية': '🎨',
      'التربية البدنية والرياضية': '⚽'
    };
    return icons[subjectName] || '📖';
  };

  const getSubjectColor = (index: number) => {
    const colors = ['blue', 'green', 'purple', 'orange', 'red', 'indigo', 'pink', 'yellow', 'teal'];
    return colors[index % colors.length];
  };

  const getSubjectDescription = (subjectName: string) => {
    const descriptions: { [key: string]: string } = {
      'اللغة العربية': 'تعلم القراءة والكتابة والتعبير باللغة العربية',
      'الرياضيات': 'الأعداد والعمليات الحسابية والهندسة',
      'التربية الإسلامية': 'تعلم أسس الدين الإسلامي والأخلاق',
      'التربية العلمية والتكنولوجية': 'استكشاف العلوم والتكنولوجيا',
      'التربية المدنية': 'تعلم حقوق وواجبات المواطن',
      'التاريخ والجغرافيا': 'تاريخ الجزائر والعالم والجغرافيا',
      'اللغة الإنجليزية': 'تعلم أساسيات اللغة الإنجليزية (جديد)',
      'التربية الفنية': 'الرسم والأعمال اليدوية والإبداع',
      'التربية البدنية والرياضية': 'الأنشطة الرياضية واللياقة البدنية'
    };
    return descriptions[subjectName] || 'مادة دراسية مهمة';
  };

  const generateUnits = (subjectName: string) => {
    // إنشاء وحدات تعليمية بناءً على المادة
    const baseUnits = [
      { id: 1, name: 'الوحدة الأولى', lessons: generateLessons(6) },
      { id: 2, name: 'الوحدة الثانية', lessons: generateLessons(5) },
      { id: 3, name: 'الوحدة الثالثة', lessons: generateLessons(4) }
    ];
    return baseUnits;
  };

  const generateLessons = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      title: `الدرس ${i + 1}`,
      status: Math.random() > 0.5 ? 'completed' : Math.random() > 0.5 ? 'in-progress' : 'not-started' as 'completed' | 'in-progress' | 'not-started',
      duration: `${Math.floor(Math.random() * 30 + 15)} دقيقة`
    }));
  };

  // البيانات الديناميكية تم تحميلها من useEffect أعلاه

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'مكتمل';
      case 'in-progress': return 'قيد التقدم';
      case 'not-started': return 'لم يبدأ';
      default: return 'غير محدد';
    }
  };

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (selectedSubject) {
    const subject = subjects.find(s => s.id === selectedSubject);
    if (!subject) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'الرئيسية', path: '/student-dashboard', icon: '🏠' },
          { label: 'موادي الدراسية', path: '#', icon: '📚' },
          { label: subject.name, icon: subject.icon }
        ]} />

        {/* Subject Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button 
                  onClick={() => setSelectedSubject(null)}
                  className="ml-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <ArrowRight className="h-6 w-6" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{subject.icon} {subject.name}</h1>
                  <p className="text-blue-100">{subject.description}</p>
                  <div className="flex items-center mt-2 space-x-4 rtl:space-x-reverse">
                    <span className="text-blue-200 text-sm">{subject.weeklyHours}</span>
                    <span className="text-blue-200 text-sm">•</span>
                    <span className="text-blue-200 text-sm">{subject.completedLessons}/{subject.totalLessons} دروس</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">{subject.progress}%</div>
                  <div className="text-sm">مكتمل</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Units */}
          <div className="space-y-6">
            {subject.units.map((unit) => (
              <div key={unit.id} className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{unit.name}</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {unit.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      onClick={() => setSelectedLesson({ ...lesson, subject: subject.name })}
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800 text-sm">{lesson.title}</h4>
                        {lesson.status === 'completed' && <CheckCircle className="h-5 w-5 text-green-600" />}
                        {lesson.status === 'in-progress' && <Clock className="h-5 w-5 text-yellow-600" />}
                        {lesson.status === 'not-started' && <Play className="h-5 w-5 text-gray-400" />}
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{getStatusText(lesson.status)}</span>
                        <span>{lesson.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'الرئيسية', path: '/student-dashboard', icon: '🏠' },
        { label: 'موادي الدراسية', icon: '📚' }
      ]} />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">📚 المواد الدراسية</h1>
              <p className="text-blue-100">استكشف موادك الدراسية وتابع تقدمك</p>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{subjects.length}</div>
                <div className="text-sm">مادة</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="ابحث عن مادة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSubjects.map((subject) => (
            <div
              key={subject.id}
              onClick={() => setSelectedSubject(subject.id)}
              className={`bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 border-${subject.color}-500`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{subject.icon}</div>
                {subject.isNew && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                    جديد
                  </span>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2">{subject.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{subject.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">التقدم</span>
                  <span className={`font-semibold text-${subject.color}-600`}>{subject.progress}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-${subject.color}-500 h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{subject.completedLessons}/{subject.totalLessons} دروس</span>
                  <span>{subject.weeklyHours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSubjects.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد مواد</h3>
            <p className="text-gray-500">لم يتم العثور على مواد تطابق البحث</p>
          </div>
        )}

        {/* Quick Actions for Students */}
        <QuickActions actions={studentQuickActions} />
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton 
        actions={[
          { label: 'الرئيسية', path: '/student-dashboard', icon: Home, color: 'blue' },
          { label: 'واجباتي', path: '/student-homework', icon: FileText, color: 'green' },
          { label: 'المساعدة', path: '/support', icon: HelpCircle, color: 'orange' }
        ]}
      />
    </div>
  );

};

export default StudentSubjects;