import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Download, Eye, TrendingUp } from 'lucide-react';
import { AccountManager } from '../utils/accountManager';
import Breadcrumb from '../components/Breadcrumb';
import RoleBasedLayout from '../components/RoleBasedLayout';

const ParentAttendance: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [selectedChild, setSelectedChild] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  const currentUser = AccountManager.getCurrentUser();
  const children = currentUser?.parentData?.children || [];

  // بيانات الحضور والغياب
  const attendanceData = [
    { date: '2024-01-15', status: 'present', time: '07:45', notes: '' },
    { date: '2024-01-16', status: 'present', time: '07:50', notes: '' },
    { date: '2024-01-17', status: 'absent', time: '', notes: 'مرض' },
    { date: '2024-01-18', status: 'late', time: '08:15', notes: 'تأخر بسبب المواصلات' },
    { date: '2024-01-19', status: 'present', time: '07:40', notes: '' },
    { date: '2024-01-22', status: 'present', time: '07:45', notes: '' },
    { date: '2024-01-23', status: 'present', time: '07:55', notes: '' },
    { date: '2024-01-24', status: 'absent', time: '', notes: 'إجازة عائلية' },
    { date: '2024-01-25', status: 'present', time: '07:42', notes: '' },
    { date: '2024-01-26', status: 'present', time: '07:48', notes: '' },
    { date: '2024-01-29', status: 'late', time: '08:10', notes: 'موعد طبي' },
    { date: '2024-01-30', status: 'present', time: '07:45', notes: '' },
    { date: '2024-01-31', status: 'present', time: '07:50', notes: '' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'absent': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'late': return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'present': return 'حاضر';
      case 'absent': return 'غائب';
      case 'late': return 'متأخر';
      default: return 'غير محدد';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'text-green-600 bg-green-50';
      case 'absent': return 'text-red-600 bg-red-50';
      case 'late': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // إحصائيات الحضور
  const totalDays = attendanceData.length;
  const presentDays = attendanceData.filter(d => d.status === 'present').length;
  const absentDays = attendanceData.filter(d => d.status === 'absent').length;
  const lateDays = attendanceData.filter(d => d.status === 'late').length;
  const attendancePercentage = ((presentDays + lateDays) / totalDays * 100).toFixed(1);

  // تقويم الشهر
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];

    // أيام فارغة في بداية الشهر
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // أيام الشهر
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const attendanceRecord = attendanceData.find(d => d.date === dateStr);
      const isWeekend = new Date(selectedYear, selectedMonth, day).getDay() === 5; // الجمعة

      days.push(
        <div
          key={day}
          className={`p-2 border border-gray-200 min-h-[60px] ${
            isWeekend ? 'bg-gray-100' : 'bg-white'
          } ${attendanceRecord ? 'cursor-pointer hover:shadow-md' : ''}`}
          onClick={() => attendanceRecord && showInfo('إشعار', `${getStatusLabel(attendanceRecord.status)} - ${attendanceRecord.time || 'لا يوجد وقت'}`)}
        >
          <div className="text-sm font-medium text-gray-800 mb-1">{day}</div>
          {attendanceRecord && (
            <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(attendanceRecord.status)}`}>
              {getStatusLabel(attendanceRecord.status)}
            </div>
          )}
          {isWeekend && !attendanceRecord && (
            <div className="text-xs text-gray-500">عطلة</div>
          )}
        </div>
      );
    }

    return days;
  };

  const monthNames = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];



  return (
    <RoleBasedLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'الرئيسية', path: '/parent-dashboard', icon: '🏠' },
          { label: 'الحضور والغياب', icon: '📅' }
        ]} />

        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">📅 الحضور والغياب</h1>
                <p className="text-green-100">متابعة حضور الطفل اليومي</p>
              </div>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                {children.length > 1 && (
                  <select
                    value={selectedChild}
                    onChange={(e) => setSelectedChild(Number(e.target.value))}
                    className="bg-white text-gray-800 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-300"
                  >
                    {children.map((child, index) => (
                      <option key={index} value={index}>
                        {child.name}
                      </option>
                    ))}
                  </select>
                )}
                <button className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors flex items-center space-x-2 rtl:space-x-reverse">
                  <Download className="h-4 w-4" />
                  <span>تحميل التقرير</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Statistics Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">نسبة الحضور</p>
                  <p className="text-2xl font-bold text-green-600">{attendancePercentage}%</p>
                  <p className="text-sm text-gray-500">من إجمالي الأيام</p>
                </div>
                <TrendingUp className="h-12 w-12 text-green-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">أيام الحضور</p>
                  <p className="text-2xl font-bold text-blue-600">{presentDays}</p>
                  <p className="text-sm text-gray-500">يوم</p>
                </div>
                <CheckCircle className="h-12 w-12 text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">أيام الغياب</p>
                  <p className="text-2xl font-bold text-red-600">{absentDays}</p>
                  <p className="text-sm text-gray-500">يوم</p>
                </div>
                <XCircle className="h-12 w-12 text-red-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">أيام التأخير</p>
                  <p className="text-2xl font-bold text-yellow-600">{lateDays}</p>
                  <p className="text-sm text-gray-500">يوم</p>
                </div>
                <AlertCircle className="h-12 w-12 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {monthNames.map((month, index) => (
                    <option key={index} value={index}>
                      {month}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value={2024}>2024</option>
                  <option value={2023}>2023</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    viewMode === 'calendar'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <Calendar className="h-4 w-4 inline ml-2" />
                  تقويم
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <Eye className="h-4 w-4 inline ml-2" />
                  قائمة
                </button>
              </div>
            </div>
          </div>

          {/* Calendar View */}
          {viewMode === 'calendar' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                {monthNames[selectedMonth]} {selectedYear}
              </h3>
              
              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map((day) => (
                  <div key={day} className="p-2 text-center font-medium text-gray-600 bg-gray-50">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {renderCalendar()}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center space-x-6 rtl:space-x-reverse mt-6 pt-6 border-t">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                  <span className="text-sm text-gray-600">حاضر</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                  <span className="text-sm text-gray-600">غائب</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
                  <span className="text-sm text-gray-600">متأخر</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                  <span className="text-sm text-gray-600">عطلة</span>
                </div>
              </div>
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-gray-800">سجل الحضور التفصيلي</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        التاريخ
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الحالة
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        وقت الوصول
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ملاحظات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attendanceData.map((record, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(record.date).toLocaleDateString('ar-DZ')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            {getStatusIcon(record.status)}
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(record.status)}`}>
                              {getStatusLabel(record.status)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {record.time || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {record.notes || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">تحليل الحضور</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">الاتجاه العام</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">معدل الحضور الشهري</span>
                    <span className="font-bold text-green-600">{attendancePercentage}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">متوسط وقت الوصول</span>
                    <span className="font-bold text-blue-600">07:47</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">أكثر أيام التأخير</span>
                    <span className="font-bold text-yellow-600">الاثنين</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-4">التوصيات</h4>
                <div className="space-y-2">
                  {attendancePercentage >= '90' ? (
                    <div className="flex items-center space-x-2 rtl:space-x-reverse text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">معدل حضور ممتاز، استمر!</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 rtl:space-x-reverse text-orange-600">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">يحتاج تحسين معدل الحضور</span>
                    </div>
                  )}
                  
                  {lateDays > 2 && (
                    <div className="flex items-center space-x-2 rtl:space-x-reverse text-yellow-600">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">تجنب التأخير المتكرر</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoleBasedLayout>
  );
};

export default ParentAttendance;