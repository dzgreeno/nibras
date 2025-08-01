import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { BarChart3, Users, BookOpen, Calendar, Search, Filter, Plus, Edit, Save, X, ArrowLeft, Download, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import RoleBasedLayout from '../components/RoleBasedLayout';

const TeacherGrades: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [selectedClass, setSelectedClass] = useState('3A');
  const [selectedSubject, setSelectedSubject] = useState('arabic');
  const [selectedAssessment, setSelectedAssessment] = useState('monthly_exam');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingGrade, setEditingGrade] = useState<{studentId: string, assessmentId: string} | null>(null);
  const [newGrade, setNewGrade] = useState('');
  const [showAddAssessment, setShowAddAssessment] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);

  const classes = [
    { id: '3A', name: 'السنة الثالثة - فوج أ', students: 28 },
    { id: '3B', name: 'السنة الثالثة - فوج ب', students: 26 },
    { id: '2A', name: 'السنة الثانية - فوج أ', students: 30 }
  ];

  const subjects = [
    { id: 'arabic', name: 'اللغة العربية', color: 'blue' },
    { id: 'math', name: 'الرياضيات', color: 'green' },
    { id: 'physics', name: 'الفيزياء', color: 'purple' },
    { id: 'history', name: 'التاريخ', color: 'yellow' }
  ];

  const assessmentTypes = [
    { id: 'monthly_exam', name: 'الاختبار الشهري', weight: 40, maxGrade: 20 },
    { id: 'homework', name: 'الواجبات المنزلية', weight: 20, maxGrade: 20 },
    { id: 'participation', name: 'المشاركة', weight: 15, maxGrade: 20 },
    { id: 'project', name: 'المشروع', weight: 25, maxGrade: 20 }
  ];

  const [students] = useState([
    {
      id: '1',
      name: 'أحمد بن محمد',
      grades: {
        monthly_exam: 16,
        homework: 18,
        participation: 15,
        project: 17
      },
      average: 16.5,
      rank: 3
    },
    {
      id: '2',
      name: 'فاطمة أحمد',
      grades: {
        monthly_exam: 19,
        homework: 20,
        participation: 18,
        project: 19
      },
      average: 19.0,
      rank: 1
    },
    {
      id: '3',
      name: 'محمد علي',
      grades: {
        monthly_exam: 14,
        homework: 16,
        participation: 13,
        project: 15
      },
      average: 14.5,
      rank: 5
    },
    {
      id: '4',
      name: 'عائشة حسن',
      grades: {
        monthly_exam: 18,
        homework: 19,
        participation: 17,
        project: 18
      },
      average: 18.0,
      rank: 2
    },
    {
      id: '5',
      name: 'يوسف إبراهيم',
      grades: {
        monthly_exam: 15,
        homework: 17,
        participation: 14,
        project: 16
      },
      average: 15.5,
      rank: 4
    }
  ]);

  const [newAssessment, setNewAssessment] = useState({
    name: '',
    type: 'exam',
    maxGrade: 20,
    weight: 30,
    date: ''
  });

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGradeEdit = (studentId: string, assessmentId: string, currentGrade: number) => {
    setEditingGrade({ studentId, assessmentId });
    setNewGrade(currentGrade.toString());
  };

  const handleGradeSave = () => {
    if (editingGrade && newGrade) {
      const grade = parseFloat(newGrade);
      const maxGrade = assessmentTypes.find(a => a.id === editingGrade.assessmentId)?.maxGrade || 20;
      
      if (grade >= 0 && grade <= maxGrade) {
        // Update grade logic here
        showSuccess('تم التحديث', `تم تحديث الدرجة إلى ${grade}`);
        setEditingGrade(null);
        setNewGrade('');
      } else {
        showWarning('تحذير', `الدرجة يجب أن تكون بين 0 و ${maxGrade}`);
      }
    }
  };

  const handleGradeCancel = () => {
    setEditingGrade(null);
    setNewGrade('');
  };

  const getGradeColor = (grade: number, maxGrade: number) => {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 85) return 'text-green-600 bg-green-50';
    if (percentage >= 70) return 'text-blue-600 bg-blue-50';
    if (percentage >= 50) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const calculateClassAverage = () => {
    const total = students.reduce((sum, student) => sum + student.average, 0);
    return (total / students.length).toFixed(1);
  };

  const getPassingRate = () => {
    const passing = students.filter(student => student.average >= 10).length;
    return ((passing / students.length) * 100).toFixed(1);
  };

  const handleAddAssessment = () => {
    if (newAssessment.name && newAssessment.date) {
      showSuccess('تم الإضافة', `تم إضافة تقييم جديد: ${newAssessment.name}`);
      setShowAddAssessment(false);
      setNewAssessment({ name: '', type: 'exam', maxGrade: 20, weight: 30, date: '' });
    }
  };

  const handleBulkImport = () => {
    showInfo('إشعار', 'سيتم فتح نافذة لاستيراد الدرجات من ملف Excel');
    setShowBulkImport(false);
  };

  const handleExportGrades = () => {
    showInfo('إشعار', 'سيتم تصدير الدرجات إلى ملف Excel');
  };

  return (
    <RoleBasedLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'الرئيسية', path: '/teacher-dashboard', icon: '🏠' },
          { label: 'الدرجات', icon: '📊' }
        ]} />
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
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
                <h1 className="text-3xl font-bold mb-2">📊 نظام تسجيل الدرجات</h1>
                <p className="text-blue-100">إدارة وتتبع درجات الطلاب</p>
              </div>
            </div>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <button
                onClick={() => setShowBulkImport(true)}
                className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center"
              >
                <Upload className="h-4 w-4 ml-2" />
                استيراد
              </button>
              <button
                onClick={handleExportGrades}
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
        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Class Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الفصل</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
            </div>

            {/* Subject Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">المادة</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>
            </div>

            {/* Assessment Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نوع التقييم</label>
              <select
                value={selectedAssessment}
                onChange={(e) => setSelectedAssessment(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {assessmentTypes.map(assessment => (
                  <option key={assessment.id} value={assessment.id}>
                    {assessment.name} ({assessment.weight}%)
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">البحث</label>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="ابحث عن طالب..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowAddAssessment(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 ml-2" />
              إضافة تقييم جديد
            </button>

            {/* Class Statistics */}
            <div className="flex space-x-6 rtl:space-x-reverse text-sm">
              <div className="text-center">
                <div className="font-bold text-gray-800">{calculateClassAverage()}</div>
                <div className="text-gray-600">متوسط الفصل</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-green-600">{getPassingRate()}%</div>
                <div className="text-gray-600">نسبة النجاح</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-blue-600">{filteredStudents.length}</div>
                <div className="text-gray-600">عدد الطلاب</div>
              </div>
            </div>
          </div>
        </div>

        {/* Grades Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">
              درجات {subjects.find(s => s.id === selectedSubject)?.name} - {classes.find(c => c.id === selectedClass)?.name}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">الترتيب</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">اسم الطالب</th>
                  {assessmentTypes.map(assessment => (
                    <th key={assessment.id} className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                      {assessment.name}
                      <br />
                      <span className="text-xs text-gray-400">({assessment.weight}%)</span>
                    </th>
                  ))}
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">المتوسط</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          student.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                          student.rank === 2 ? 'bg-gray-100 text-gray-800' :
                          student.rank === 3 ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {student.rank}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{student.name}</div>
                    </td>
                    {assessmentTypes.map(assessment => {
                      const grade = student.grades[assessment.id as keyof typeof student.grades];
                      const isEditing = editingGrade?.studentId === student.id && editingGrade?.assessmentId === assessment.id;
                      
                      return (
                        <td key={assessment.id} className="px-6 py-4 text-center">
                          {isEditing ? (
                            <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                              <input
                                type="number"
                                value={newGrade}
                                onChange={(e) => setNewGrade(e.target.value)}
                                min="0"
                                max={assessment.maxGrade}
                                className="w-16 p-1 border border-gray-300 rounded text-center"
                                autoFocus
                              />
                              <button
                                onClick={handleGradeSave}
                                className="text-green-600 hover:text-green-800"
                              >
                                <Save className="h-4 w-4" />
                              </button>
                              <button
                                onClick={handleGradeCancel}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleGradeEdit(student.id, assessment.id, grade)}
                              className={`px-3 py-1 rounded-lg font-medium hover:opacity-80 transition-opacity ${
                                getGradeColor(grade, assessment.maxGrade)
                              }`}
                            >
                              {grade}/{assessment.maxGrade}
                            </button>
                          )}
                        </td>
                      );
                    })}
                    <td className="px-6 py-4 text-center">
                      <div className={`px-3 py-1 rounded-lg font-bold ${
                        getGradeColor(student.average, 20)
                      }`}>
                        {student.average.toFixed(1)}/20
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {student.average >= 10 ? (
                        <div className="flex items-center justify-center text-green-600">
                          <CheckCircle className="h-4 w-4 ml-1" />
                          <span className="text-sm font-medium">ناجح</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center text-red-600">
                          <AlertCircle className="h-4 w-4 ml-1" />
                          <span className="text-sm font-medium">راسب</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Assessment Modal */}
      {showAddAssessment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">إضافة تقييم جديد</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم التقييم</label>
                <input
                  type="text"
                  value={newAssessment.name}
                  onChange={(e) => setNewAssessment({...newAssessment, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="مثال: الاختبار النصفي"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع التقييم</label>
                <select
                  value={newAssessment.type}
                  onChange={(e) => setNewAssessment({...newAssessment, type: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="exam">اختبار</option>
                  <option value="homework">واجب منزلي</option>
                  <option value="project">مشروع</option>
                  <option value="participation">مشاركة</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الدرجة القصوى</label>
                  <input
                    type="number"
                    value={newAssessment.maxGrade}
                    onChange={(e) => setNewAssessment({...newAssessment, maxGrade: parseInt(e.target.value)})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الوزن (%)</label>
                  <input
                    type="number"
                    value={newAssessment.weight}
                    onChange={(e) => setNewAssessment({...newAssessment, weight: parseInt(e.target.value)})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ التقييم</label>
                <input
                  type="date"
                  value={newAssessment.date}
                  onChange={(e) => setNewAssessment({...newAssessment, date: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex space-x-4 rtl:space-x-reverse mt-6">
              <button
                onClick={() => setShowAddAssessment(false)}
                className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddAssessment}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                إضافة التقييم
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {showBulkImport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">استيراد الدرجات</h3>
            
            <div className="text-center py-8">
              <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">اسحب ملف Excel هنا أو انقر للاختيار</p>
              <input
                type="file"
                accept=".xlsx,.xls"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-block"
              >
                اختيار ملف
              </label>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-yellow-800 mb-2">تعليمات:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• يجب أن يحتوي الملف على أعمدة: اسم الطالب، الدرجة</li>
                <li>• الدرجات يجب أن تكون أرقام صحيحة</li>
                <li>• سيتم تحديث الدرجات الموجودة</li>
              </ul>
            </div>

            <div className="flex space-x-4 rtl:space-x-reverse">
              <button
                onClick={() => setShowBulkImport(false)}
                className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={handleBulkImport}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                استيراد
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </RoleBasedLayout>
  );
};

export default TeacherGrades;