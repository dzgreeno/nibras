import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { BarChart3, Download, TrendingUp, User, BookOpen, Award, Clock, ArrowLeft, FileText, Printer, Mail } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import RoleBasedLayout from '../components/RoleBasedLayout';



interface Subject {
  name: string;
  grade: number;
  maxGrade: number;
  progress: number;
  teacher: string;
  lastTest: number;
  classAverage: number;
  rank: number;
}

const ParentReports: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [selectedChild, setSelectedChild] = useState('1');
  const [selectedReport, setSelectedReport] = useState('academic');
  const [selectedPeriod, setSelectedPeriod] = useState('semester');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  const children = [
    {
      id: '1',
      name: 'أحمد محمد',
      grade: 'السنة الثالثة متوسط',
      class: 'فوج أ',
      avatar: '👦'
    },
    {
      id: '2',
      name: 'فاطمة محمد',
      grade: 'السنة الأولى متوسط',
      class: 'فوج ب',
      avatar: '👧'
    }
  ];

  const reportTypes = [
    {
      id: 'academic',
      name: 'التقرير الأكاديمي',
      description: 'درجات ومعدلات جميع المواد',
      icon: BookOpen,
      color: 'blue'
    },
    {
      id: 'behavior',
      name: 'التقرير السلوكي',
      description: 'السلوك والانضباط والمشاركة',
      icon: User,
      color: 'green'
    },
    {
      id: 'attendance',
      name: 'تقرير الحضور',
      description: 'سجل الحضور والغياب',
      icon: Clock,
      color: 'purple'
    },
    {
      id: 'progress',
      name: 'تقرير التقدم',
      description: 'تطور الأداء عبر الزمن',
      icon: TrendingUp,
      color: 'yellow'
    },
    {
      id: 'achievements',
      name: 'تقرير الإنجازات',
      description: 'الجوائز والشهادات والإنجازات',
      icon: Award,
      color: 'red'
    },
    {
      id: 'comprehensive',
      name: 'التقرير الشامل',
      description: 'تقرير مفصل يشمل جميع الجوانب',
      icon: FileText,
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

  const [recentReports] = useState([
    {
      id: '1',
      type: 'academic',
      child: 'أحمد محمد',
      period: 'الفصل الأول 2024',
      generatedDate: '2024-01-15',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: '2',
      type: 'behavior',
      child: 'فاطمة محمد',
      period: 'ديسمبر 2023',
      generatedDate: '2024-01-01',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: '3',
      type: 'comprehensive',
      child: 'أحمد محمد',
      period: 'الفصل الأول 2024',
      generatedDate: '2024-01-10',
      status: 'processing',
      downloadUrl: null
    }
  ]);

  const [sampleData] = useState({
    academic: {
      subjects: [
        { name: 'اللغة العربية', grade: 16.5, maxGrade: 20, rank: 3, classAverage: 14.2 },
        { name: 'الرياضيات', grade: 18.0, maxGrade: 20, rank: 2, classAverage: 15.1 },
        { name: 'الفيزياء', grade: 15.0, maxGrade: 20, rank: 8, classAverage: 13.8 },
        { name: 'التاريخ', grade: 17.5, maxGrade: 20, rank: 1, classAverage: 14.5 }
      ],
      overallAverage: 16.75,
      overallRank: 3,
      totalStudents: 28,
      semester: 'الفصل الأول 2024'
    },
    behavior: {
      discipline: { score: 95, level: 'ممتاز', notes: 'طالب مهذب ومتعاون' },
      participation: { score: 85, level: 'جيد جداً', notes: 'يشارك بنشاط في الحصص' },
      homework: { score: 90, level: 'ممتاز', notes: 'منتظم في أداء الواجبات' },
      punctuality: { score: 98, level: 'ممتاز', notes: 'ملتزم بالمواعيد' },
      socialSkills: { score: 88, level: 'جيد جداً', notes: 'علاقات جيدة مع الزملاء' }
    },
    attendance: {
      totalDays: 120,
      presentDays: 114,
      absentDays: 6,
      lateArrivals: 2,
      attendanceRate: 95,
      monthlyBreakdown: [
        { month: 'سبتمبر', present: 20, absent: 2, rate: 90 },
        { month: 'أكتوبر', present: 22, absent: 1, rate: 96 },
        { month: 'نوفمبر', present: 21, absent: 2, rate: 91 },
        { month: 'ديسمبر', present: 18, absent: 0, rate: 100 },
        { month: 'يناير', present: 15, absent: 1, rate: 94 }
      ]
    }
  });

  const selectedChildData = children.find(child => child.id === selectedChild);
  const selectedReportType = reportTypes.find(type => type.id === selectedReport);

  const handleGenerateReport = () => {
    const data = sampleData[selectedReport as keyof typeof sampleData];
    setReportData({
      type: selectedReport,
      child: selectedChildData,
      period: periods.find(p => p.id === selectedPeriod)?.name,
      data: data,
      generatedAt: new Date().toLocaleString('ar-SA')
    });
    setShowReportModal(true);
  };

  const handleDownloadReport = (format: string) => {
    showInfo('إشعار', `سيتم تحميل التقرير بصيغة ${format}`);
  };

  const handleEmailReport = () => {
    showInfo('إشعار', 'سيتم إرسال التقرير عبر البريد الإلكتروني');
  };

  const handlePrintReport = () => {
    showInfo('إشعار', 'سيتم طباعة التقرير');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'processing': return 'text-yellow-600 bg-yellow-50';
      case 'failed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'مكتمل';
      case 'processing': return 'قيد المعالجة';
      case 'failed': return 'فشل';
      default: return 'غير محدد';
    }
  };

  const getGradeColor = (grade: number, maxGrade: number) => {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 85) return 'text-green-600';
    if (percentage >= 70) return 'text-blue-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBehaviorColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <RoleBasedLayout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'الرئيسية', path: '/parent-dashboard', icon: '🏠' },
          { label: 'التقارير', icon: '📋' }
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
                <h1 className="text-3xl font-bold mb-2">📊 التقارير المفصلة</h1>
                <p className="text-indigo-100">تقارير شاملة عن أداء وتقدم أطفالك</p>
              </div>
            </div>
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto mb-2" />
              <div className="text-sm">تقارير متقدمة</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Child Selection */}
        {children.length > 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">اختر الطفل</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => setSelectedChild(child.id)}
                  className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                    selectedChild === child.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{child.avatar}</div>
                    <h3 className="font-bold text-gray-800">{child.name}</h3>
                    <p className="text-sm text-gray-600">{child.grade} - {child.class}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    {periods.map(period => (
                      <option key={period.id} value={period.id}>{period.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleGenerateReport}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                >
                  <FileText className="h-5 w-5 ml-2" />
                  إنشاء التقرير
                </button>
              </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">التقارير الأخيرة</h2>
              
              <div className="space-y-4">
                {recentReports.map((report) => {
                  const reportType = reportTypes.find(t => t.id === report.type);
                  return (
                    <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        {reportType && (
                          <div className={`p-2 rounded-lg bg-${reportType.color}-100 text-${reportType.color}-600 ml-4`}>
                            <reportType.icon className="h-4 w-4" />
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium text-gray-800">{reportType?.name}</h4>
                          <p className="text-sm text-gray-600">{report.child} - {report.period}</p>
                          <p className="text-xs text-gray-500">تم الإنشاء: {report.generatedDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                          {getStatusText(report.status)}
                        </span>
                        {report.status === 'completed' && (
                          <button
                            onClick={() => handleDownloadReport('PDF')}
                            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            <Download className="h-4 w-4 inline ml-1" />
                            تحميل
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">إحصائيات سريعة</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">المعدل العام</span>
                  <span className="font-bold text-green-600">16.75/20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الترتيب</span>
                  <span className="font-bold text-blue-600">#3 من 28</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">نسبة الحضور</span>
                  <span className="font-bold text-purple-600">95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">التقييم السلوكي</span>
                  <span className="font-bold text-green-600">ممتاز</span>
                </div>
              </div>
            </div>

            {/* Report Formats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">صيغ التقرير</h3>
              <div className="space-y-3">
                <button
                  onClick={() => handleDownloadReport('PDF')}
                  className="w-full bg-red-100 text-red-700 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
                >
                  <FileText className="h-4 w-4 ml-2" />
                  PDF
                </button>
                <button
                  onClick={() => handleDownloadReport('Excel')}
                  className="w-full bg-green-100 text-green-700 py-2 px-4 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center"
                >
                  <BarChart3 className="h-4 w-4 ml-2" />
                  Excel
                </button>
                <button
                  onClick={handlePrintReport}
                  className="w-full bg-blue-100 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center"
                >
                  <Printer className="h-4 w-4 ml-2" />
                  طباعة
                </button>
                <button
                  onClick={handleEmailReport}
                  className="w-full bg-purple-100 text-purple-700 py-2 px-4 rounded-lg hover:bg-purple-200 transition-colors flex items-center justify-center"
                >
                  <Mail className="h-4 w-4 ml-2" />
                  إرسال بالإيميل
                </button>
              </div>
            </div>

            {/* Help */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">مساعدة</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>• التقرير الأكاديمي يشمل جميع الدرجات والمعدلات</p>
                <p>• التقرير السلوكي يركز على السلوك والانضباط</p>
                <p>• تقرير الحضور يوضح سجل الحضور والغياب</p>
                <p>• التقرير الشامل يجمع جميع المعلومات</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Preview Modal */}
      {showReportModal && reportData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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
                  <h4 className="font-medium text-gray-700">الطالب</h4>
                  <p className="text-lg font-bold text-gray-800">{reportData.child.name}</p>
                  <p className="text-sm text-gray-600">{reportData.child.grade} - {reportData.child.class}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">الفترة</h4>
                  <p className="text-lg font-bold text-gray-800">{reportData.period}</p>
                  <p className="text-sm text-gray-600">تم الإنشاء: {reportData.generatedAt}</p>
                </div>
              </div>
            </div>

            {/* Report Content */}
            <div className="space-y-6">
              {reportData.type === 'academic' && (
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-4">الدرجات الأكاديمية</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-3 text-right">المادة</th>
                          <th className="border border-gray-300 p-3 text-center">الدرجة</th>
                          <th className="border border-gray-300 p-3 text-center">الترتيب</th>
                          <th className="border border-gray-300 p-3 text-center">متوسط الفصل</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.data.subjects.map((subject: Subject, index: number) => (
                          <tr key={index}>
                            <td className="border border-gray-300 p-3 font-medium">{subject.name}</td>
                            <td className={`border border-gray-300 p-3 text-center font-bold ${getGradeColor(subject.grade, subject.maxGrade)}`}>
                              {subject.grade}/{subject.maxGrade}
                            </td>
                            <td className="border border-gray-300 p-3 text-center">#{subject.rank}</td>
                            <td className="border border-gray-300 p-3 text-center">{subject.classAverage}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{reportData.data.overallAverage}</div>
                        <div className="text-sm text-gray-600">المعدل العام</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">#{reportData.data.overallRank}</div>
                        <div className="text-sm text-gray-600">الترتيب العام</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">{reportData.data.totalStudents}</div>
                        <div className="text-sm text-gray-600">إجمالي الطلاب</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {reportData.type === 'behavior' && (
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-4">التقييم السلوكي</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(reportData.data).map(([key, value]: [string, any]) => (
                      <div key={key} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-medium text-gray-800">
                            {key === 'discipline' ? 'الانضباط' :
                             key === 'participation' ? 'المشاركة' :
                             key === 'homework' ? 'الواجبات' :
                             key === 'punctuality' ? 'الالتزام بالوقت' :
                             'المهارات الاجتماعية'}
                          </h5>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBehaviorColor(value.score)}`}>
                            {value.level}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${value.score}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600">{value.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {reportData.type === 'attendance' && (
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-4">سجل الحضور</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{reportData.data.presentDays}</div>
                      <div className="text-sm text-gray-600">أيام الحضور</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{reportData.data.absentDays}</div>
                      <div className="text-sm text-gray-600">أيام الغياب</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">{reportData.data.lateArrivals}</div>
                      <div className="text-sm text-gray-600">التأخير</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{reportData.data.attendanceRate}%</div>
                      <div className="text-sm text-gray-600">نسبة الحضور</div>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-3 text-right">الشهر</th>
                          <th className="border border-gray-300 p-3 text-center">الحضور</th>
                          <th className="border border-gray-300 p-3 text-center">الغياب</th>
                          <th className="border border-gray-300 p-3 text-center">النسبة</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.data.monthlyBreakdown.map((month: any, index: number) => (
                          <tr key={index}>
                            <td className="border border-gray-300 p-3 font-medium">{month.month}</td>
                            <td className="border border-gray-300 p-3 text-center text-green-600 font-bold">{month.present}</td>
                            <td className="border border-gray-300 p-3 text-center text-red-600 font-bold">{month.absent}</td>
                            <td className="border border-gray-300 p-3 text-center font-bold">{month.rate}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
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
                onClick={handlePrintReport}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Printer className="h-4 w-4 ml-2" />
                طباعة
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </RoleBasedLayout>
  );
};

export default ParentReports;