import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Users, BookOpen, TrendingUp, Filter } from 'lucide-react';

interface ClassData {
  id: string;
  name: string;
  grade: string;
  teacher: string;
  studentCount: number;
  averageGrade: number;
  status: 'active' | 'inactive';
}

const SchoolAdminClasses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    grade: '',
    teacher: ''
  });

  // بيانات وهمية للفصول
  const [classes, setClasses] = useState<ClassData[]>([
    {
      id: '1',
      name: 'السنة الخامسة - فوج أ',
      grade: 'الخامسة',
      teacher: 'أستاذة فاطمة بن علي',
      studentCount: 28,
      averageGrade: 85.5,
      status: 'active'
    },
    {
      id: '2',
      name: 'السنة الرابعة - فوج ب',
      grade: 'الرابعة',
      teacher: 'أستاذ محمد الأمين',
      studentCount: 25,
      averageGrade: 78.2,
      status: 'active'
    },
    {
      id: '3',
      name: 'السنة الثالثة - فوج أ',
      grade: 'الثالثة',
      teacher: 'أستاذة زينب مرادي',
      studentCount: 30,
      averageGrade: 82.1,
      status: 'active'
    },
    {
      id: '4',
      name: 'السنة الثانية - فوج أ',
      grade: 'الثانية',
      teacher: 'أستاذ عبد الرحمن قاسم',
      studentCount: 22,
      averageGrade: 88.7,
      status: 'active'
    },
    {
      id: '5',
      name: 'السنة الأولى - فوج ب',
      grade: 'الأولى',
      teacher: 'أستاذة سعاد بوعلام',
      studentCount: 26,
      averageGrade: 91.3,
      status: 'active'
    }
  ]);

  const grades = ['الأولى', 'الثانية', 'الثالثة', 'الرابعة', 'الخامسة'];
  const teachers = [
    'أستاذة فاطمة بن علي',
    'أستاذ محمد الأمين',
    'أستاذة زينب مرادي',
    'أستاذ عبد الرحمن قاسم',
    'أستاذة سعاد بوعلام',
    'أستاذ أحمد بوضياف',
    'أستاذة خديجة حمدي'
  ];

  // تصفية الفصول
  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classItem.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || classItem.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const handleCreateClass = () => {
    if (newClass.name && newClass.grade && newClass.teacher) {
      const newClassData: ClassData = {
        id: (classes.length + 1).toString(),
        name: newClass.name,
        grade: newClass.grade,
        teacher: newClass.teacher,
        studentCount: 0,
        averageGrade: 0,
        status: 'active'
      };
      setClasses([...classes, newClassData]);
      setNewClass({ name: '', grade: '', teacher: '' });
      setShowCreateModal(false);
    }
  };

  const handleDeleteClass = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الفصل؟')) {
      setClasses(classes.filter(c => c.id !== id));
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600 bg-green-100';
    if (grade >= 80) return 'text-blue-600 bg-blue-100';
    if (grade >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* رأس الصفحة */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة الفصول الدراسية</h1>
              <p className="text-gray-600">إدارة وتنظيم جميع الفصول الدراسية في المدرسة</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              إنشاء فصل جديد
            </button>
          </div>

          {/* أدوات البحث والفلترة */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="البحث عن فصل أو معلم..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">جميع السنوات</option>
                {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الفصول</p>
                <p className="text-2xl font-bold text-gray-900">{classes.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الطلاب</p>
                <p className="text-2xl font-bold text-gray-900">
                  {classes.reduce((sum, c) => sum + c.studentCount, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">متوسط الأداء العام</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(classes.reduce((sum, c) => sum + c.averageGrade, 0) / classes.length).toFixed(1)}%
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الفصول النشطة</p>
                <p className="text-2xl font-bold text-gray-900">
                  {classes.filter(c => c.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* جدول الفصول */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    اسم الفصل
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    السنة الدراسية
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المعلم المسؤول
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    عدد الطلاب
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    متوسط الأداء
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClasses.map((classItem) => (
                  <tr key={classItem.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{classItem.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {classItem.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{classItem.teacher}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-gray-400 ml-2" />
                        <span className="text-sm text-gray-900">{classItem.studentCount}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(classItem.averageGrade)}`}>
                        {classItem.averageGrade.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteClass(classItem.id)}
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
        </div>

        {/* نافذة إنشاء فصل جديد */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">إنشاء فصل جديد</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    اسم الفصل
                  </label>
                  <input
                    type="text"
                    value={newClass.name}
                    onChange={(e) => setNewClass({...newClass, name: e.target.value})}
                    placeholder="مثال: السنة الخامسة - فوج أ"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    السنة الدراسية
                  </label>
                  <select
                    value={newClass.grade}
                    onChange={(e) => setNewClass({...newClass, grade: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">اختر السنة الدراسية</option>
                    {grades.map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    المعلم المسؤول
                  </label>
                  <select
                    value={newClass.teacher}
                    onChange={(e) => setNewClass({...newClass, teacher: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">اختر المعلم</option>
                    {teachers.map(teacher => (
                      <option key={teacher} value={teacher}>{teacher}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleCreateClass}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  إنشاء الفصل
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolAdminClasses;