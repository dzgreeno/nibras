import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  BookOpen, 
  Award, 
  AlertTriangle,
  Calendar,
  Filter,
  Download,
  Eye,
  School,
  Target,
  PieChart,
  LineChart
} from 'lucide-react';

interface SchoolPerformance {
  id: string;
  name: string;
  totalStudents: number;
  averageGrade: number;
  attendanceRate: number;
  completionRate: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
}

interface SubjectAnalysis {
  subject: string;
  averageGrade: number;
  improvement: number;
  strugglingStudents: number;
  topPerformers: number;
}

const EducationalSupervisorAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [activeTab, setActiveTab] = useState<'overview' | 'schools' | 'subjects' | 'trends'>('overview');

  // بيانات وهمية للمدارس
  const schoolsData: SchoolPerformance[] = [
    {
      id: '1',
      name: 'مدرسة النور الابتدائية',
      totalStudents: 450,
      averageGrade: 87.5,
      attendanceRate: 94.2,
      completionRate: 89.1,
      trend: 'up',
      trendValue: 5.2
    },
    {
      id: '2',
      name: 'مدرسة الأمل الابتدائية',
      totalStudents: 380,
      averageGrade: 82.3,
      attendanceRate: 91.8,
      completionRate: 85.7,
      trend: 'up',
      trendValue: 3.1
    },
    {
      id: '3',
      name: 'مدرسة المستقبل الابتدائية',
      totalStudents: 520,
      averageGrade: 79.8,
      attendanceRate: 88.5,
      completionRate: 82.4,
      trend: 'down',
      trendValue: -2.3
    },
    {
      id: '4',
      name: 'مدرسة الفجر الابتدائية',
      totalStudents: 290,
      averageGrade: 85.1,
      attendanceRate: 92.7,
      completionRate: 87.9,
      trend: 'stable',
      trendValue: 0.8
    },
    {
      id: '5',
      name: 'مدرسة الرشاد الابتدائية',
      totalStudents: 410,
      averageGrade: 83.9,
      attendanceRate: 90.3,
      completionRate: 86.2,
      trend: 'up',
      trendValue: 4.7
    }
  ];

  // بيانات وهمية للمواد
  const subjectsData: SubjectAnalysis[] = [
    {
      subject: 'الرياضيات',
      averageGrade: 78.5,
      improvement: 3.2,
      strugglingStudents: 145,
      topPerformers: 89
    },
    {
      subject: 'اللغة العربية',
      averageGrade: 85.2,
      improvement: 1.8,
      strugglingStudents: 98,
      topPerformers: 156
    },
    {
      subject: 'العلوم',
      averageGrade: 81.7,
      improvement: 2.5,
      strugglingStudents: 112,
      topPerformers: 134
    },
    {
      subject: 'التاريخ',
      averageGrade: 83.1,
      improvement: -0.7,
      strugglingStudents: 87,
      topPerformers: 142
    },
    {
      subject: 'الجغرافيا',
      averageGrade: 80.9,
      improvement: 1.3,
      strugglingStudents: 103,
      topPerformers: 128
    }
  ];

  const regions = ['الجزائر العاصمة', 'وهران', 'قسنطينة', 'عنابة', 'سطيف'];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPerformanceColor = (grade: number) => {
    if (grade >= 85) return 'text-green-600 bg-green-100';
    if (grade >= 75) return 'text-blue-600 bg-blue-100';
    if (grade >= 65) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* المؤشرات الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي المدارس</p>
              <p className="text-2xl font-bold text-gray-900">{schoolsData.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <School className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي الطلاب</p>
              <p className="text-2xl font-bold text-gray-900">
                {schoolsData.reduce((sum, school) => sum + school.totalStudents, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">متوسط الأداء العام</p>
              <p className="text-2xl font-bold text-gray-900">
                {(schoolsData.reduce((sum, school) => sum + school.averageGrade, 0) / schoolsData.length).toFixed(1)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">متوسط الحضور</p>
              <p className="text-2xl font-bold text-gray-900">
                {(schoolsData.reduce((sum, school) => sum + school.attendanceRate, 0) / schoolsData.length).toFixed(1)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* أفضل وأسوأ المدارس */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-green-600" />
            أفضل المدارس أداءً
          </h3>
          <div className="space-y-3">
            {schoolsData
              .sort((a, b) => b.averageGrade - a.averageGrade)
              .slice(0, 3)
              .map((school, index) => (
                <div key={school.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-green-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{school.name}</p>
                      <p className="text-sm text-gray-600">{school.totalStudents} طالب</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{school.averageGrade}%</p>
                    <p className="text-xs text-gray-500">متوسط الأداء</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            المدارس التي تحتاج دعم
          </h3>
          <div className="space-y-3">
            {schoolsData
              .sort((a, b) => a.averageGrade - b.averageGrade)
              .slice(0, 3)
              .map((school) => (
                <div key={school.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{school.name}</p>
                      <p className="text-sm text-gray-600">{school.totalStudents} طالب</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">{school.averageGrade}%</p>
                    <p className="text-xs text-gray-500">متوسط الأداء</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSchoolsTab = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  اسم المدرسة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  عدد الطلاب
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  متوسط الأداء
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  نسبة الحضور
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  معدل الإكمال
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الاتجاه
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schoolsData.map((school) => (
                <tr key={school.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{school.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{school.totalStudents.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPerformanceColor(school.averageGrade)}`}>
                      {school.averageGrade}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{school.attendanceRate}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{school.completionRate}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center gap-1 ${getTrendColor(school.trend)}`}>
                      {getTrendIcon(school.trend)}
                      <span className="text-sm font-medium">
                        {school.trend === 'stable' ? '0' : school.trendValue > 0 ? '+' : ''}{school.trendValue}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSubjectsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjectsData.map((subject) => (
          <div key={subject.subject} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{subject.subject}</h3>
              <div className={`flex items-center gap-1 ${subject.improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {subject.improvement >= 0 ? 
                  <TrendingUp className="w-4 h-4" /> : 
                  <TrendingDown className="w-4 h-4" />
                }
                <span className="text-sm font-medium">
                  {subject.improvement >= 0 ? '+' : ''}{subject.improvement}%
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">متوسط الأداء</span>
                  <span className="text-lg font-bold text-gray-900">{subject.averageGrade}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${subject.averageGrade}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">{subject.strugglingStudents}</p>
                  <p className="text-xs text-gray-600">يحتاجون دعم</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{subject.topPerformers}</p>
                  <p className="text-xs text-gray-600">متفوقون</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTrendsTab = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">اتجاهات الأداء الشهرية</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <LineChart className="w-16 h-16 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">رسم بياني لاتجاهات الأداء</p>
            <p className="text-sm text-gray-400">سيتم تطوير هذا القسم لاحقاً</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">توزيع الأداء</h4>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">مخطط دائري للتوزيع</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">مقارنة المواد</h4>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">مخطط أعمدة للمقارنة</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* رأس الصفحة */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">التحليلات المقارنة</h1>
              <p className="text-gray-600">تحليل شامل لأداء المدارس والمواد الدراسية</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Download className="w-4 h-4" />
                تصدير التقرير
              </button>
            </div>
          </div>

          {/* أدوات الفلترة */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="week">آخر أسبوع</option>
                <option value="month">آخر شهر</option>
                <option value="quarter">آخر ربع</option>
                <option value="year">آخر سنة</option>
              </select>
            </div>

            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">جميع المناطق</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          {/* التبويبات */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 space-x-reverse">
              {[
                { id: 'overview', label: 'نظرة عامة', icon: BarChart3 },
                { id: 'schools', label: 'المدارس', icon: School },
                { id: 'subjects', label: 'المواد', icon: BookOpen },
                { id: 'trends', label: 'الاتجاهات', icon: TrendingUp }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'overview' | 'schools' | 'subjects' | 'trends')}
                    className={`${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* محتوى التبويبات */}
        <div>
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'schools' && renderSchoolsTab()}
          {activeTab === 'subjects' && renderSubjectsTab()}
          {activeTab === 'trends' && renderTrendsTab()}
        </div>
      </div>
    </div>
  );
};

export default EducationalSupervisorAnalytics;