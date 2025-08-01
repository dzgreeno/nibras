import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { UserCheck, Calendar, Clock, Search, Filter, Save, Users, CheckCircle, XCircle, AlertCircle, Download, Upload } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import RoleBasedLayout from '../components/RoleBasedLayout';

const TeacherAttendance: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('class1');
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceData, setAttendanceData] = useState<{[key: string]: 'present' | 'absent' | 'late' | 'excused'}>({});

  // بيانات الفصول
  const classes = [
    { id: 'class1', name: 'الصف الأول أ', studentsCount: 25 },
    { id: 'class2', name: 'الصف الثاني ب', studentsCount: 28 },
    { id: 'class3', name: 'الصف الثالث أ', studentsCount: 22 }
  ];

  // بيانات الطلاب
  const students = [
    { id: '1', name: 'أحمد محمد علي', studentId: 'ST001', class: 'class1', avatar: '👦' },
    { id: '2', name: 'فاطمة الزهراء', studentId: 'ST002', class: 'class1', avatar: '👧' },
    { id: '3', name: 'محمد الأمين', studentId: 'ST003', class: 'class1', avatar: '👦' },
    { id: '4', name: 'خديجة سعد', studentId: 'ST004', class: 'class1', avatar: '👧' },
    { id: '5', name: 'يوسف إبراهيم', studentId: 'ST005', class: 'class1', avatar: '👦' },
    { id: '6', name: 'مريم الصالح', studentId: 'ST006', class: 'class1', avatar: '👧' },
    { id: '7', name: 'عبد الرحمن أحمد', studentId: 'ST007', class: 'class1', avatar: '👦' },
    { id: '8', name: 'زينب محمود', studentId: 'ST008', class: 'class1', avatar: '👧' },
    { id: '9', name: 'حسام الدين', studentId: 'ST009', class: 'class1', avatar: '👦' },
    { id: '10', name: 'نور الهدى', studentId: 'ST010', class: 'class1', avatar: '👧' }
  ];

  const filteredStudents = students.filter(student => 
    student.class === selectedClass &&
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent' | 'late' | 'excused') => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'text-green-600 bg-green-50 border-green-200';
      case 'absent': return 'text-red-600 bg-red-50 border-red-200';
      case 'late': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'excused': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="h-5 w-5" />;
      case 'absent': return <XCircle className="h-5 w-5" />;
      case 'late': return <Clock className="h-5 w-5" />;
      case 'excused': return <AlertCircle className="h-5 w-5" />;
      default: return <UserCheck className="h-5 w-5" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'present': return 'حاضر';
      case 'absent': return 'غائب';
      case 'late': return 'متأخر';
      case 'excused': return 'غياب مبرر';
      default: return 'غير محدد';
    }
  };

  const getAttendanceStats = () => {
    const total = filteredStudents.length;
    const present = Object.values(attendanceData).filter(status => status === 'present').length;
    const absent = Object.values(attendanceData).filter(status => status === 'absent').length;
    const late = Object.values(attendanceData).filter(status => status === 'late').length;
    const excused = Object.values(attendanceData).filter(status => status === 'excused').length;
    const unmarked = total - present - absent - late - excused;

    return { total, present, absent, late, excused, unmarked };
  };

  const stats = getAttendanceStats();

  const handleSaveAttendance = () => {
    console.log('Saving attendance for date:', selectedDate);
    console.log('Class:', selectedClass);
    console.log('Attendance data:', attendanceData);
    showSuccess('تم الحفظ', 'تم حفظ الحضور بنجاح!');
  };

  const handleMarkAllPresent = () => {
    const newAttendanceData: {[key: string]: 'present' | 'absent' | 'late' | 'excused'} = {};
    filteredStudents.forEach(student => {
      newAttendanceData[student.id] = 'present';
    });
    setAttendanceData(newAttendanceData);
  };

  return (
    <RoleBasedLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'الرئيسية', path: '/teacher-dashboard', icon: '🏠' },
          { label: 'الحضور والغياب', icon: '✅' }
        ]} />

        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">✅ الحضور والغياب</h1>
                <p className="text-green-100">تسجيل ومتابعة حضور الطلاب</p>
              </div>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors flex items-center space-x-2 rtl:space-x-reverse">
                  <Download className="h-4 w-4" />
                  <span>تصدير</span>
                </button>
                <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors flex items-center space-x-2 rtl:space-x-reverse">
                  <Upload className="h-4 w-4" />
                  <span>استيراد</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Controls */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">التاريخ</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الفصل</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name} ({cls.studentsCount} طالب)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">البحث</label>
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="البحث عن طالب..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleMarkAllPresent}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 rtl:space-x-reverse"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>تحديد الكل حاضر</span>
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
                <div className="text-sm text-gray-600">إجمالي الطلاب</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.present}</div>
                <div className="text-sm text-green-600">حاضر</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
                <div className="text-sm text-red-600">غائب</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.late}</div>
                <div className="text-sm text-yellow-600">متأخر</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.excused}</div>
                <div className="text-sm text-blue-600">غياب مبرر</div>
              </div>
            </div>
          </div>

          {/* Students List */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">قائمة الطلاب</h3>
                <span className="text-sm text-gray-500">
                  {filteredStudents.length} من {students.filter(s => s.class === selectedClass).length} طالب
                </span>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredStudents.map((student) => {
                const currentStatus = attendanceData[student.id];
                return (
                  <div key={student.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="text-3xl">{student.avatar}</div>
                        <div>
                          <h4 className="font-medium text-gray-900">{student.name}</h4>
                          <p className="text-sm text-gray-500">رقم الطالب: {student.studentId}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        {/* Current Status Display */}
                        {currentStatus && (
                          <div className={`flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 rounded-lg border ${getStatusColor(currentStatus)}`}>
                            {getStatusIcon(currentStatus)}
                            <span className="text-sm font-medium">{getStatusLabel(currentStatus)}</span>
                          </div>
                        )}

                        {/* Status Buttons */}
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <button
                            onClick={() => handleAttendanceChange(student.id, 'present')}
                            className={`p-2 rounded-lg border transition-colors ${
                              currentStatus === 'present'
                                ? 'bg-green-100 border-green-300 text-green-700'
                                : 'bg-white border-gray-300 text-gray-600 hover:bg-green-50'
                            }`}
                            title="حاضر"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => handleAttendanceChange(student.id, 'absent')}
                            className={`p-2 rounded-lg border transition-colors ${
                              currentStatus === 'absent'
                                ? 'bg-red-100 border-red-300 text-red-700'
                                : 'bg-white border-gray-300 text-gray-600 hover:bg-red-50'
                            }`}
                            title="غائب"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => handleAttendanceChange(student.id, 'late')}
                            className={`p-2 rounded-lg border transition-colors ${
                              currentStatus === 'late'
                                ? 'bg-yellow-100 border-yellow-300 text-yellow-700'
                                : 'bg-white border-gray-300 text-gray-600 hover:bg-yellow-50'
                            }`}
                            title="متأخر"
                          >
                            <Clock className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => handleAttendanceChange(student.id, 'excused')}
                            className={`p-2 rounded-lg border transition-colors ${
                              currentStatus === 'excused'
                                ? 'bg-blue-100 border-blue-300 text-blue-700'
                                : 'bg-white border-gray-300 text-gray-600 hover:bg-blue-50'
                            }`}
                            title="غياب مبرر"
                          >
                            <AlertCircle className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredStudents.length === 0 && (
              <div className="p-12 text-center">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">لا يوجد طلاب</h3>
                <p className="text-gray-500">لم يتم العثور على طلاب في هذا الفصل</p>
              </div>
            )}
          </div>

          {/* Save Button */}
          {Object.keys(attendanceData).length > 0 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleSaveAttendance}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 rtl:space-x-reverse text-lg font-medium"
              >
                <Save className="h-5 w-5" />
                <span>حفظ الحضور</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </RoleBasedLayout>
  );
};

export default TeacherAttendance;