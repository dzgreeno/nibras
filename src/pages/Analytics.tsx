import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { BarChart3, TrendingUp, Users, BookOpen, Calendar, Download, ArrowLeft, Eye, Target, Award, Clock, PieChart, LineChart, Activity } from 'lucide-react';

const Analytics: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const periods = [
    { id: 'week', name: 'هذا الأسبوع' },
    { id: 'month', name: 'هذا الشهر' },
    { id: 'quarter', name: 'هذا الربع' },
    { id: 'year', name: 'هذا العام' }
  ];

  const metrics = [
    { id: 'overview', name: 'نظرة عامة', icon: BarChart3 },
    { id: 'students', name: 'الطلاب', icon: Users },
    { id: 'teachers', name: 'المعلمين', icon: BookOpen },
    { id: 'performance', name: 'الأداء', icon: TrendingUp },
    { id: 'attendance', name: 'الحضور', icon: Calendar },
    { id: 'activities', name: 'الأنشطة', icon: Activity }
  ];

  const [overviewStats] = useState({
    totalStudents: 1250,
    totalTeachers: 85,
    totalClasses: 45,
    averageGrade: 16.8,
    attendanceRate: 94.2,
    completionRate: 87.5,
    activeUsers: 1180,
    totalHomework: 2340
  });

  const [monthlyData] = useState([
    { month: 'يناير', students: 1200, teachers: 80, attendance: 92 },
    { month: 'فبراير', students: 1220, teachers: 82, attendance: 94 },
    { month: 'مارس', students: 1250, teachers: 85, attendance: 95 },
    { month: 'أبريل', students: 1280, teachers: 85, attendance: 93 },
    { month: 'مايو', students: 1300, teachers: 87, attendance: 96 },
    { month: 'يونيو', students: 1250, teachers: 85, attendance: 94 }
  ]);

  const [gradeDistribution] = useState([
    { grade: 'ممتاز (18-20)', count: 312, percentage: 25 },
    { grade: 'جيد جداً (16-17)', count: 437, percentage: 35 },
    { grade: 'جيد (14-15)', count: 312, percentage: 25 },
    { grade: 'مقبول (12-13)', count: 125, percentage: 10 },
    { grade: 'ضعيف (أقل من 12)', count: 64, percentage: 5 }
  ]);

  const [subjectPerformance] = useState([
    { subject: 'الرياضيات', average: 16.2, improvement: 2.3, color: 'blue' },
    { subject: 'اللغة العربية', average: 17.1, improvement: 1.8, color: 'green' },
    { subject: 'الفيزياء', average: 15.8, improvement: -0.5, color: 'purple' },
    { subject: 'الكيمياء', average: 16.5, improvement: 1.2, color: 'orange' },
    { subject: 'التاريخ', average: 17.8, improvement: 0.9, color: 'red' },
    { subject: 'الجغرافيا', average: 16.9, improvement: 1.5, color: 'indigo' }
  ]);

  const [attendanceData] = useState([
    { day: 'الأحد', present: 1180, absent: 70, rate: 94.4 },
    { day: 'الاثنين', present: 1200, absent: 50, rate: 96.0 },
    { day: 'الثلاثاء', present: 1190, absent: 60, rate: 95.2 },
    { day: 'الأربعاء', present: 1170, absent: 80, rate: 93.6 },
    { day: 'الخميس', present: 1210, absent: 40, rate: 96.8 }
  ]);

  const [topPerformers] = useState([
    { name: 'أحمد محمد علي', grade: '3 ثانوي', average: 19.2, rank: 1 },
    { name: 'فاطمة حسن', grade: '3 ثانوي', average: 18.9, rank: 2 },
    { name: 'يوسف أحمد', grade: '2 ثانوي', average: 18.7, rank: 3 },
    { name: 'مريم سالم', grade: '3 ثانوي', average: 18.5, rank: 4 },
    { name: 'خالد عمر', grade: '2 ثانوي', average: 18.3, rank: 5 }
  ]);

  const [recentActivities] = useState([
    { type: 'homework', title: 'تم تسليم 45 واجب في الرياضيات', time: 'منذ ساعة', icon: BookOpen },
    { type: 'grade', title: 'تم رصد درجات امتحان الفيزياء', time: 'منذ ساعتين', icon: Award },
    { type: 'attendance', title: 'تم تسجيل حضور اليوم', time: 'منذ 3 ساعات', icon: Calendar },
    { type: 'activity', title: 'بدء مسابقة العلوم', time: 'منذ 4 ساعات', icon: Target }
  ]);

  const handleExportData = () => {
    showInfo('إشعار', 'سيتم تصدير البيانات بصيغة Excel');
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      purple: 'bg-purple-100 text-purple-800',
      orange: 'bg-orange-100 text-orange-800',
      red: 'bg-red-100 text-red-800',
      indigo: 'bg-indigo-100 text-indigo-800'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-100 text-gray-800';
  };

  const getImprovementColor = (improvement: number) => {
    if (improvement > 0) return 'text-green-600';
    if (improvement < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getImprovementIcon = (improvement: number) => {
    if (improvement > 0) return '↗️';
    if (improvement < 0) return '↘️';
    return '➡️';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-600 to-gray-600 text-white p-6">
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
                <h1 className="text-3xl font-bold mb-2">📊 الإحصائيات والتقارير</h1>
                <p className="text-slate-100">تحليل شامل لأداء المدرسة والطلاب</p>
              </div>
            </div>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-lg px-4 py-2"
              >
                {periods.map(period => (
                  <option key={period.id} value={period.id} className="text-gray-800">
                    {period.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleExportData}
                className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center"
              >
                <Download className="h-4 w-4 ml-2" />
                تصدير
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">المقاييس</h3>
              <nav className="space-y-2">
                {metrics.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <button
                      key={metric.id}
                      onClick={() => setSelectedMetric(metric.id)}
                      className={`w-full text-right p-3 rounded-lg transition-colors flex items-center ${
                        selectedMetric === metric.id
                          ? 'bg-slate-100 text-slate-800 border-r-4 border-slate-500'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <Icon className="h-4 w-4 ml-3" />
                      {metric.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {selectedMetric === 'overview' && (
              <div className="space-y-8">
                {/* Key Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-blue-100 rounded-full p-3">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <span className="text-2xl font-bold text-gray-800">{overviewStats.totalStudents}</span>
                    </div>
                    <h3 className="text-gray-600 font-medium">إجمالي الطلاب</h3>
                    <p className="text-sm text-green-600 mt-1">+5% من الشهر الماضي</p>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-green-100 rounded-full p-3">
                        <BookOpen className="h-6 w-6 text-green-600" />
                      </div>
                      <span className="text-2xl font-bold text-gray-800">{overviewStats.totalTeachers}</span>
                    </div>
                    <h3 className="text-gray-600 font-medium">إجمالي المعلمين</h3>
                    <p className="text-sm text-green-600 mt-1">+2% من الشهر الماضي</p>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-purple-100 rounded-full p-3">
                        <Award className="h-6 w-6 text-purple-600" />
                      </div>
                      <span className="text-2xl font-bold text-gray-800">{overviewStats.averageGrade}</span>
                    </div>
                    <h3 className="text-gray-600 font-medium">متوسط الدرجات</h3>
                    <p className="text-sm text-green-600 mt-1">+0.3 من الشهر الماضي</p>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-orange-100 rounded-full p-3">
                        <Calendar className="h-6 w-6 text-orange-600" />
                      </div>
                      <span className="text-2xl font-bold text-gray-800">{overviewStats.attendanceRate}%</span>
                    </div>
                    <h3 className="text-gray-600 font-medium">معدل الحضور</h3>
                    <p className="text-sm text-green-600 mt-1">+1.2% من الشهر الماضي</p>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Monthly Trends */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                      <LineChart className="h-5 w-5 ml-2" />
                      الاتجاهات الشهرية
                    </h3>
                    <div className="space-y-4">
                      {monthlyData.slice(-3).map((data, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-800">{data.month}</span>
                          <div className="flex space-x-4 rtl:space-x-reverse text-sm">
                            <span className="text-blue-600">{data.students} طالب</span>
                            <span className="text-green-600">{data.teachers} معلم</span>
                            <span className="text-orange-600">{data.attendance}% حضور</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Grade Distribution */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                      <PieChart className="h-5 w-5 ml-2" />
                      توزيع الدرجات
                    </h3>
                    <div className="space-y-3">
                      {gradeDistribution.map((grade, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{grade.grade}</span>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${grade.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-800">{grade.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <Activity className="h-5 w-5 ml-2" />
                    الأنشطة الأخيرة
                  </h3>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => {
                      const Icon = activity.icon;
                      return (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <div className="bg-blue-100 rounded-full p-2 ml-3">
                            <Icon className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{activity.title}</p>
                            <p className="text-sm text-gray-600">{activity.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Performance Tab */}
            {selectedMetric === 'performance' && (
              <div className="space-y-8">
                {/* Subject Performance */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">أداء المواد الدراسية</h3>
                  <div className="space-y-4">
                    {subjectPerformance.map((subject, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full ml-3 bg-${subject.color}-500`}></div>
                          <span className="font-medium text-gray-800">{subject.subject}</span>
                        </div>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                          <span className="text-lg font-bold text-gray-800">{subject.average}</span>
                          <span className={`text-sm font-medium ${getImprovementColor(subject.improvement)}`}>
                            {getImprovementIcon(subject.improvement)} {Math.abs(subject.improvement)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Performers */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">أفضل الطلاب أداءً</h3>
                  <div className="space-y-3">
                    {topPerformers.map((student, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                          }`}>
                            {student.rank}
                          </div>
                          <div className="mr-3">
                            <p className="font-medium text-gray-800">{student.name}</p>
                            <p className="text-sm text-gray-600">{student.grade}</p>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-gray-800">{student.average}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Attendance Tab */}
            {selectedMetric === 'attendance' && (
              <div className="space-y-8">
                {/* Daily Attendance */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">الحضور اليومي</h3>
                  <div className="space-y-4">
                    {attendanceData.map((day, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-800">{day.day}</span>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                          <span className="text-green-600">{day.present} حاضر</span>
                          <span className="text-red-600">{day.absent} غائب</span>
                          <span className="font-bold text-gray-800">{day.rate}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attendance Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Eye className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">94.2%</h3>
                    <p className="text-gray-600">معدل الحضور العام</p>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">1,180</h3>
                    <p className="text-gray-600">متوسط الحضور اليومي</p>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">70</h3>
                    <p className="text-gray-600">متوسط الغياب اليومي</p>
                  </div>
                </div>
              </div>
            )}

            {/* Students Tab */}
            {selectedMetric === 'students' && (
              <div className="space-y-8">
                {/* Student Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <h3 className="text-3xl font-bold text-blue-600 mb-2">1,250</h3>
                    <p className="text-gray-600">إجمالي الطلاب</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <h3 className="text-3xl font-bold text-green-600 mb-2">1,180</h3>
                    <p className="text-gray-600">الطلاب النشطون</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <h3 className="text-3xl font-bold text-purple-600 mb-2">87.5%</h3>
                    <p className="text-gray-600">معدل إكمال الواجبات</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <h3 className="text-3xl font-bold text-orange-600 mb-2">16.8</h3>
                    <p className="text-gray-600">متوسط الدرجات</p>
                  </div>
                </div>

                {/* Grade Level Distribution */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">توزيع الطلاب حسب المستوى</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <h4 className="text-lg font-bold text-blue-800 mb-2">المرحلة الابتدائية</h4>
                      <p className="text-2xl font-bold text-blue-600">450</p>
                      <p className="text-sm text-blue-700">36% من إجمالي الطلاب</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <h4 className="text-lg font-bold text-green-800 mb-2">المرحلة المتوسطة</h4>
                      <p className="text-2xl font-bold text-green-600">400</p>
                      <p className="text-sm text-green-700">32% من إجمالي الطلاب</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <h4 className="text-lg font-bold text-purple-800 mb-2">المرحلة الثانوية</h4>
                      <p className="text-2xl font-bold text-purple-600">400</p>
                      <p className="text-sm text-purple-700">32% من إجمالي الطلاب</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Teachers Tab */}
            {selectedMetric === 'teachers' && (
              <div className="space-y-8">
                {/* Teacher Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <h3 className="text-3xl font-bold text-blue-600 mb-2">85</h3>
                    <p className="text-gray-600">إجمالي المعلمين</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <h3 className="text-3xl font-bold text-green-600 mb-2">45</h3>
                    <p className="text-gray-600">الفصول الدراسية</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <h3 className="text-3xl font-bold text-purple-600 mb-2">14.7</h3>
                    <p className="text-gray-600">متوسط الطلاب لكل معلم</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <h3 className="text-3xl font-bold text-orange-600 mb-2">96%</h3>
                    <p className="text-gray-600">معدل رضا المعلمين</p>
                  </div>
                </div>

                {/* Subject Distribution */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">توزيع المعلمين حسب المادة</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {subjectPerformance.map((subject, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-800">{subject.subject}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getColorClasses(subject.color)}`}>
                          {Math.floor(Math.random() * 8) + 8} معلم
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Activities Tab */}
            {selectedMetric === 'activities' && (
              <div className="space-y-8">
                {/* Activity Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <h3 className="text-3xl font-bold text-blue-600 mb-2">2,340</h3>
                    <p className="text-gray-600">إجمالي الواجبات</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <h3 className="text-3xl font-bold text-green-600 mb-2">156</h3>
                    <p className="text-gray-600">الأنشطة المدرسية</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <h3 className="text-3xl font-bold text-purple-600 mb-2">89</h3>
                    <p className="text-gray-600">الامتحانات</p>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <h3 className="text-3xl font-bold text-orange-600 mb-2">45</h3>
                    <p className="text-gray-600">المشاريع</p>
                  </div>
                </div>

                {/* Activity Completion Rates */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">معدلات إكمال الأنشطة</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">الواجبات المنزلية</span>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-32 bg-gray-200 rounded-full h-3">
                          <div className="bg-green-600 h-3 rounded-full" style={{ width: '87%' }}></div>
                        </div>
                        <span className="font-bold text-gray-800">87%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">المشاريع</span>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-32 bg-gray-200 rounded-full h-3">
                          <div className="bg-blue-600 h-3 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                        <span className="font-bold text-gray-800">92%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">الأنشطة اللاصفية</span>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-32 bg-gray-200 rounded-full h-3">
                          <div className="bg-purple-600 h-3 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                        <span className="font-bold text-gray-800">78%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;