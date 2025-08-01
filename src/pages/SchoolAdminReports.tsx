import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { BarChart3, TrendingUp, Users, BookOpen, Download, ArrowLeft, FileText, PieChart, Activity, Award, Clock, AlertTriangle } from 'lucide-react';

const SchoolAdminReports: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [selectedReport, setSelectedReport] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('semester');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  const reportTypes = [
    {
      id: 'overview',
      name: 'التقرير العام',
      description: 'نظرة شاملة على أداء المدرسة',
      icon: BarChart3,
      color: 'blue'
    },
    {
      id: 'academic',
      name: 'التقرير الأكاديمي',
      description: 'أداء الطلاب والدرجات',
      icon: BookOpen,
      color: 'green'
    },
    {
      id: 'attendance',
      name: 'تقرير الحضور',
      description: 'إحصائيات الحضور والغياب',
      icon: Clock,
      color: 'purple'
    },
    {
      id: 'teachers',
      name: 'تقرير المعلمين',
      description: 'أداء وإحصائيات المعلمين',
      icon: Users,
      color: 'yellow'
    },
    {
      id: 'financial',
      name: 'التقرير المالي',
      description: 'الإيرادات والمصروفات',
      icon: TrendingUp,
      color: 'red'
    },
    {
      id: 'activities',
      name: 'تقرير الأنشطة',
      description: 'الأنشطة والفعاليات المدرسية',
      icon: Activity,
      color: 'indigo'
    }
  ];

  const periods = [
    { id: 'week', name: 'الأسبوع الحالي' },
    { id: 'month', name: 'الشهر الحالي' },
    { id: 'semester', name: 'الفصل الدراسي' },
    { id: 'year', name: 'السنة الدراسية' },
    { id: 'custom', name: 'فترة مخصصة' }
  ];

  const [dashboardStats] = useState({
    totalStudents: 450,
    totalTeachers: 28,
    totalClasses: 18,
    averageGrade: 15.2,
    attendanceRate: 94.5,
    graduationRate: 98.2,
    satisfactionRate: 92.8,
    activeProjects: 12
  });

  const [sampleReports] = useState({
    overview: {
      title: 'التقرير العام للمدرسة',
      period: 'الفصل الأول 2024',
      summary: {
        totalStudents: 450,
        totalTeachers: 28,
        totalClasses: 18,
        averageGrade: 15.2,
        attendanceRate: 94.5,
        graduationRate: 98.2
      },
      gradeDistribution: [
        { grade: 'ممتاز (18-20)', count: 89, percentage: 19.8 },
        { grade: 'جيد جداً (16-17)', count: 135, percentage: 30.0 },
        { grade: 'جيد (14-15)', count: 158, percentage: 35.1 },
        { grade: 'مقبول (10-13)', count: 58, percentage: 12.9 },
        { grade: 'ضعيف (أقل من 10)', count: 10, percentage: 2.2 }
      ],
      subjectPerformance: [
        { subject: 'اللغة العربية', average: 15.8, passRate: 96.2 },
        { subject: 'الرياضيات', average: 14.5, passRate: 92.1 },
        { subject: 'الفيزياء', average: 14.9, passRate: 94.3 },
        { subject: 'التاريخ', average: 16.2, passRate: 97.8 },
        { subject: 'الجغرافيا', average: 15.4, passRate: 95.6 }
      ]
    },
    academic: {
      title: 'التقرير الأكاديمي المفصل',
      period: 'الفصل الأول 2024',
      classPerformance: [
        { class: 'السنة الأولى متوسط', students: 120, average: 14.8, topStudent: 'فاطمة أحمد', topGrade: 19.2 },
        { class: 'السنة الثانية متوسط', students: 115, average: 15.1, topStudent: 'محمد علي', topGrade: 18.9 },
        { class: 'السنة الثالثة متوسط', students: 110, average: 15.6, topStudent: 'عائشة حسن', topGrade: 19.5 },
        { class: 'السنة الرابعة متوسط', students: 105, average: 15.8, topStudent: 'يوسف إبراهيم', topGrade: 19.8 }
      ],
      improvements: [
        { area: 'الرياضيات', improvement: '+1.2', status: 'positive' },
        { area: 'الفيزياء', improvement: '+0.8', status: 'positive' },
        { area: 'اللغة الإنجليزية', improvement: '-0.3', status: 'negative' },
        { area: 'التربية الإسلامية', improvement: '+0.5', status: 'positive' }
      ]
    },
    attendance: {
      title: 'تقرير الحضور والغياب',
      period: 'الفصل الأول 2024',
      overallStats: {
        totalDays: 90,
        averageAttendance: 94.5,
        totalAbsences: 2475,
        chronicAbsentees: 15
      },
      monthlyTrends: [
        { month: 'سبتمبر', attendance: 96.2, absences: 456 },
        { month: 'أكتوبر', attendance: 94.8, absences: 624 },
        { month: 'نوفمبر', attendance: 93.1, absences: 828 },
        { month: 'ديسمبر', attendance: 95.9, absences: 492 },
        { month: 'يناير', attendance: 94.0, absences: 720 }
      ],
      classAttendance: [
        { class: 'السنة الأولى متوسط', rate: 95.2, absences: 576 },
        { class: 'السنة الثانية متوسط', rate: 94.1, absences: 679 },
        { class: 'السنة الثالثة متوسط', rate: 94.8, absences: 572 },
        { class: 'السنة الرابعة متوسط', rate: 93.9, absences: 648 }
      ]
    }
  });

  const selectedReportType = reportTypes.find(type => type.id === selectedReport);

  const handleGenerateReport = () => {
    const data = sampleReports[selectedReport as keyof typeof sampleReports];
    setReportData({
      type: selectedReport,
      period: periods.find(p => p.id === selectedPeriod)?.name,
      data: data,
      generatedAt: new Date().toLocaleString('ar-SA')
    });
    setShowReportModal(true);
  };

  const handleDownloadReport = (format: string) => {
    showInfo('إشعار', `سيتم تحميل التقرير بصيغة ${format}`);
  };

  const handleExportData = () => {
    showInfo('إشعار', 'سيتم تصدير البيانات إلى Excel');
  };

  const getPerformanceColor = (value: number, type: string) => {
    if (type === 'grade') {
      if (value >= 16) return 'text-green-600';
      if (value >= 14) return 'text-blue-600';
      if (value >= 12) return 'text-yellow-600';
      return 'text-red-600';
    } else if (type === 'percentage') {
      if (value >= 95) return 'text-green-600';
      if (value >= 90) return 'text-blue-600';
      if (value >= 85) return 'text-yellow-600';
      return 'text-red-600';
    }
    return 'text-gray-600';
  };

  const getImprovementColor = (status: string) => {
    return status === 'positive' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-blue-600 text-white p-6">
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
                <h1 className="text-3xl font-bold mb-2">📊 التقارير العامة</h1>
                <p className="text-gray-100">تقارير شاملة عن أداء المدرسة</p>
              </div>
            </div>
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto mb-2" />
              <div className="text-sm">إحصائيات متقدمة</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{dashboardStats.totalStudents}</div>
            <div className="text-sm text-gray-600">إجمالي الطلاب</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{dashboardStats.totalTeachers}</div>
            <div className="text-sm text-gray-600">عدد المعلمين</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{dashboardStats.averageGrade}</div>
            <div className="text-sm text-gray-600">المعدل العام</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{dashboardStats.attendanceRate}%</div>
            <div className="text-sm text-gray-600">نسبة الحضور</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Report Generation */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Report Types */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">أنواع التقارير</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reportTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedReport(type.id)}
                      className={`p-6 rounded-xl border-2 transition-all hover:scale-105 text-left ${
                        selectedReport === type.id
                          ? `border-${type.color}-500 bg-${type.color}-50`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`p-3 rounded-lg bg-${type.color}-100 text-${type.color}-600 ml-4`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 mb-2">{type.name}</h3>
                          <p className="text-sm text-gray-600">{type.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Report Configuration */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">إعدادات التقرير</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نوع التقرير</label>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      {selectedReportType && (
                        <>
                          <selectedReportType.icon className={`h-5 w-5 text-${selectedReportType.color}-600 ml-2`} />
                          <span className="font-medium">{selectedReportType.name}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الفترة الزمنية</label>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {periods.map(period => (
                      <option key={period.id} value={period.id}>{period.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-center space-x-4 rtl:space-x-reverse">
                <button
                  onClick={handleGenerateReport}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <FileText className="h-5 w-5 ml-2" />
                  إنشاء التقرير
                </button>
                <button
                  onClick={handleExportData}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <Download className="h-5 w-5 ml-2" />
                  تصدير البيانات
                </button>
              </div>
            </div>

            {/* Quick Insights */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">رؤى سريعة</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600 ml-2" />
                    <h3 className="font-semibold text-green-800">نقاط القوة</h3>
                  </div>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• معدل نجاح عالي (98.2%)</li>
                    <li>• تحسن في الرياضيات (+1.2)</li>
                    <li>• حضور منتظم (94.5%)</li>
                    <li>• رضا أولياء الأمور (92.8%)</li>
                  </ul>
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-600 ml-2" />
                    <h3 className="font-semibold text-red-800">نقاط التحسين</h3>
                  </div>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• تراجع في اللغة الإنجليزية (-0.3)</li>
                    <li>• 15 طالب غياب مزمن</li>
                    <li>• نقص في الأنشطة اللاصفية</li>
                    <li>• حاجة لتحديث المختبرات</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Performance Indicators */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">مؤشرات الأداء</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">معدل النجاح</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 ml-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '98%' }}></div>
                    </div>
                    <span className="font-bold text-green-600">98.2%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">رضا الطلاب</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 ml-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '89%' }}></div>
                    </div>
                    <span className="font-bold text-blue-600">89.4%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">رضا المعلمين</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 ml-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '91%' }}></div>
                    </div>
                    <span className="font-bold text-purple-600">91.2%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">رضا أولياء الأمور</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 ml-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '93%' }}></div>
                    </div>
                    <span className="font-bold text-yellow-600">92.8%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">الأنشطة الأخيرة</h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <FileText className="h-4 w-4 text-blue-600 ml-2" />
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">تقرير شهري جديد</div>
                    <div className="text-gray-600">منذ ساعتين</div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <Award className="h-4 w-4 text-green-600 ml-2" />
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">تحسن في النتائج</div>
                    <div className="text-gray-600">أمس</div>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 ml-2" />
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">تنبيه غياب</div>
                    <div className="text-gray-600">منذ 3 أيام</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">خيارات التصدير</h3>
              <div className="space-y-3">
                <button
                  onClick={() => handleDownloadReport('PDF')}
                  className="w-full bg-red-100 text-red-700 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
                >
                  <FileText className="h-4 w-4 ml-2" />
                  تصدير PDF
                </button>
                <button
                  onClick={() => handleDownloadReport('Excel')}
                  className="w-full bg-green-100 text-green-700 py-2 px-4 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center"
                >
                  <BarChart3 className="h-4 w-4 ml-2" />
                  تصدير Excel
                </button>
                <button
                  onClick={() => handleDownloadReport('PowerPoint')}
                  className="w-full bg-orange-100 text-orange-700 py-2 px-4 rounded-lg hover:bg-orange-200 transition-colors flex items-center justify-center"
                >
                  <PieChart className="h-4 w-4 ml-2" />
                  عرض تقديمي
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Preview Modal */}
      {showReportModal && reportData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                {reportTypes.find(t => t.id === reportData.type)?.name}
              </h3>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            {/* Report Header */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700">التقرير</h4>
                  <p className="text-lg font-bold text-gray-800">{reportData.data.title}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">الفترة</h4>
                  <p className="text-lg font-bold text-gray-800">{reportData.data.period}</p>
                  <p className="text-sm text-gray-600">تم الإنشاء: {reportData.generatedAt}</p>
                </div>
              </div>
            </div>

            {/* Report Content */}
            <div className="space-y-6">
              {reportData.type === 'overview' && (
                <>
                  {/* Summary Stats */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-4">الإحصائيات العامة</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(reportData.data.summary).map(([key, value]: [string, any]) => (
                        <div key={key} className="bg-blue-50 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-blue-600">{value}</div>
                          <div className="text-sm text-gray-600">
                            {key === 'totalStudents' ? 'إجمالي الطلاب' :
                             key === 'totalTeachers' ? 'عدد المعلمين' :
                             key === 'totalClasses' ? 'عدد الفصول' :
                             key === 'averageGrade' ? 'المعدل العام' :
                             key === 'attendanceRate' ? 'نسبة الحضور' :
                             'معدل التخرج'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Grade Distribution */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-4">توزيع الدرجات</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-300 p-3 text-right">التقدير</th>
                            <th className="border border-gray-300 p-3 text-center">عدد الطلاب</th>
                            <th className="border border-gray-300 p-3 text-center">النسبة المئوية</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reportData.data.gradeDistribution.map((grade: any, index: number) => (
                            <tr key={index}>
                              <td className="border border-gray-300 p-3 font-medium">{grade.grade}</td>
                              <td className="border border-gray-300 p-3 text-center font-bold">{grade.count}</td>
                              <td className="border border-gray-300 p-3 text-center font-bold">{grade.percentage}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Subject Performance */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-4">أداء المواد</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-300 p-3 text-right">المادة</th>
                            <th className="border border-gray-300 p-3 text-center">المعدل</th>
                            <th className="border border-gray-300 p-3 text-center">نسبة النجاح</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reportData.data.subjectPerformance.map((subject: any, index: number) => (
                            <tr key={index}>
                              <td className="border border-gray-300 p-3 font-medium">{subject.subject}</td>
                              <td className={`border border-gray-300 p-3 text-center font-bold ${getPerformanceColor(subject.average, 'grade')}`}>
                                {subject.average}/20
                              </td>
                              <td className={`border border-gray-300 p-3 text-center font-bold ${getPerformanceColor(subject.passRate, 'percentage')}`}>
                                {subject.passRate}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {reportData.type === 'academic' && (
                <>
                  {/* Class Performance */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-4">أداء الفصول</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-300 p-3 text-right">الفصل</th>
                            <th className="border border-gray-300 p-3 text-center">عدد الطلاب</th>
                            <th className="border border-gray-300 p-3 text-center">المعدل</th>
                            <th className="border border-gray-300 p-3 text-center">الطالب الأول</th>
                            <th className="border border-gray-300 p-3 text-center">أعلى درجة</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reportData.data.classPerformance.map((cls: any, index: number) => (
                            <tr key={index}>
                              <td className="border border-gray-300 p-3 font-medium">{cls.class}</td>
                              <td className="border border-gray-300 p-3 text-center">{cls.students}</td>
                              <td className={`border border-gray-300 p-3 text-center font-bold ${getPerformanceColor(cls.average, 'grade')}`}>
                                {cls.average}
                              </td>
                              <td className="border border-gray-300 p-3 text-center font-medium">{cls.topStudent}</td>
                              <td className="border border-gray-300 p-3 text-center font-bold text-green-600">{cls.topGrade}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Improvements */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-4">التحسينات</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {reportData.data.improvements.map((improvement: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <span className="font-medium text-gray-800">{improvement.area}</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getImprovementColor(improvement.status)}`}>
                            {improvement.improvement}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {reportData.type === 'attendance' && (
                <>
                  {/* Overall Stats */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-4">الإحصائيات العامة</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(reportData.data.overallStats).map(([key, value]: [string, any]) => (
                        <div key={key} className="bg-purple-50 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-purple-600">{value}</div>
                          <div className="text-sm text-gray-600">
                            {key === 'totalDays' ? 'إجمالي الأيام' :
                             key === 'averageAttendance' ? 'متوسط الحضور' :
                             key === 'totalAbsences' ? 'إجمالي الغياب' :
                             'غياب مزمن'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Monthly Trends */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-4">الاتجاهات الشهرية</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-300 p-3 text-right">الشهر</th>
                            <th className="border border-gray-300 p-3 text-center">نسبة الحضور</th>
                            <th className="border border-gray-300 p-3 text-center">عدد الغيابات</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reportData.data.monthlyTrends.map((month: any, index: number) => (
                            <tr key={index}>
                              <td className="border border-gray-300 p-3 font-medium">{month.month}</td>
                              <td className={`border border-gray-300 p-3 text-center font-bold ${getPerformanceColor(month.attendance, 'percentage')}`}>
                                {month.attendance}%
                              </td>
                              <td className="border border-gray-300 p-3 text-center font-bold text-red-600">{month.absences}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 rtl:space-x-reverse mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowReportModal(false)}
                className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إغلاق
              </button>
              <button
                onClick={() => handleDownloadReport('PDF')}
                className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
              >
                <Download className="h-4 w-4 ml-2" />
                تحميل PDF
              </button>
              <button
                onClick={() => handleDownloadReport('Excel')}
                className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <BarChart3 className="h-4 w-4 ml-2" />
                تصدير Excel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolAdminReports;