import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { Calendar, Clock, BookOpen, User, MapPin, ArrowLeft, ChevronLeft, ChevronRight, Bell, Download, Filter } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import RoleBasedLayout from '../components/RoleBasedLayout';

const StudentSchedule: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [showReminders, setShowReminders] = useState(false);

  const days = [
    'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'
  ];

  const timeSlots = [
    '08:00', '08:45', '09:30', '10:15', '11:00', '11:45', '12:30', '13:15', '14:00', '14:45'
  ];

  const [schedule] = useState({
    0: [ // الأحد
      { time: '08:00', subject: 'اللغة العربية', teacher: 'أ. فاطمة أحمد', room: 'القسم الأول', type: 'lecture', color: 'blue' },
      { time: '08:45', subject: 'الرياضيات', teacher: 'أ. محمد علي', room: 'القسم الأول', type: 'lecture', color: 'green' },
      { time: '09:30', subject: 'استراحة', teacher: '', room: '', type: 'break', color: 'gray' },
      { time: '10:15', subject: 'التربية الإسلامية', teacher: 'أ. إبراهيم أحمد', room: 'القسم الأول', type: 'lecture', color: 'emerald' },
      { time: '11:00', subject: 'التربية العلمية والتكنولوجية', teacher: 'أ. سارة حسن', room: 'القسم الأول', type: 'lecture', color: 'purple' },
      { time: '11:45', subject: 'استراحة الغداء', teacher: '', room: '', type: 'break', color: 'gray' },
      { time: '12:30', subject: 'التربية البدنية والرياضية', teacher: 'أ. خالد محمد', room: 'الساحة', type: 'activity', color: 'red' },
      { time: '13:15', subject: 'اللغة الإنجليزية', teacher: 'أ. نور الدين', room: 'القسم الأول', type: 'lecture', color: 'indigo' }
    ],
    1: [ // الاثنين
      { time: '08:00', subject: 'الرياضيات', teacher: 'أ. محمد علي', room: 'القسم الأول', type: 'lecture', color: 'green' },
      { time: '08:45', subject: 'اللغة العربية', teacher: 'أ. فاطمة أحمد', room: 'القسم الأول', type: 'lecture', color: 'blue' },
      { time: '09:30', subject: 'استراحة', teacher: '', room: '', type: 'break', color: 'gray' },
      { time: '10:15', subject: 'التاريخ والجغرافيا', teacher: 'أ. عمر يوسف', room: 'القسم الأول', type: 'lecture', color: 'yellow' },
      { time: '11:00', subject: 'التربية المدنية', teacher: 'أ. أحمد بن علي', room: 'القسم الأول', type: 'lecture', color: 'teal' },
      { time: '11:45', subject: 'استراحة الغداء', teacher: '', room: '', type: 'break', color: 'gray' },
      { time: '12:30', subject: 'التربية الفنية', teacher: 'أ. مريم سالم', room: 'قاعة الفنون', type: 'activity', color: 'pink' },
      { time: '13:15', subject: 'اللغة الفرنسية', teacher: 'أ. زينب علي', room: 'القسم الأول', type: 'lecture', color: 'violet' }
    ],
    2: [ // الثلاثاء
      { time: '08:00', subject: 'اللغة العربية', teacher: 'أ. فاطمة أحمد', room: 'القسم الأول', type: 'lecture', color: 'blue' },
      { time: '08:45', subject: 'التربية الإسلامية', teacher: 'أ. إبراهيم أحمد', room: 'القسم الأول', type: 'lecture', color: 'emerald' },
      { time: '09:30', subject: 'استراحة', teacher: '', room: '', type: 'break', color: 'gray' },
      { time: '10:15', subject: 'الرياضيات', teacher: 'أ. محمد علي', room: 'القسم الأول', type: 'lecture', color: 'green' },
      { time: '11:00', subject: 'اللغة الإنجليزية', teacher: 'أ. نور الدين', room: 'القسم الأول', type: 'lecture', color: 'indigo' },
      { time: '11:45', subject: 'استراحة الغداء', teacher: '', room: '', type: 'break', color: 'gray' },
      { time: '12:30', subject: 'التربية العلمية والتكنولوجية', teacher: 'أ. سارة حسن', room: 'القسم الأول', type: 'lecture', color: 'purple' },
      { time: '13:15', subject: 'اللغة الأمازيغية', teacher: 'أ. تاسعديت محند', room: 'القسم الأول', type: 'lecture', color: 'lime' }
    ],
    3: [ // الأربعاء
      { time: '08:00', subject: 'الرياضيات', teacher: 'أ. محمد علي', room: 'القسم الأول', type: 'lecture', color: 'green' },
      { time: '08:45', subject: 'الرياضيات', teacher: 'أ. محمد علي', room: 'قاعة 102', type: 'lecture', color: 'green' },
      { time: '09:30', subject: 'استراحة', teacher: '', room: '', type: 'break', color: 'gray' },
      { time: '10:15', subject: 'اللغة العربية', teacher: 'أ. فاطمة أحمد', room: 'قاعة 101', type: 'lecture', color: 'blue' },
      { time: '11:00', subject: 'الموسيقى', teacher: 'أ. كريم حسن', room: 'قاعة الموسيقى', type: 'activity', color: 'rose' },
      { time: '11:45', subject: 'استراحة الغداء', teacher: '', room: '', type: 'break', color: 'gray' },
      { time: '12:30', subject: 'الكيمياء', teacher: 'أ. ليلى حسين', room: 'مختبر الكيمياء', type: 'lab', color: 'orange' },
      { time: '13:15', subject: 'التربية المدنية', teacher: 'أ. سمير محمود', room: 'قاعة 108', type: 'lecture', color: 'slate' }
    ],
    4: [ // الخميس
      { time: '08:00', subject: 'اللغة الإنجليزية', teacher: 'أ. نور الدين', room: 'قاعة 104', type: 'lecture', color: 'indigo' },
      { time: '08:45', subject: 'الجغرافيا', teacher: 'أ. عمر يوسف', room: 'قاعة 105', type: 'lecture', color: 'teal' },
      { time: '09:30', subject: 'استراحة', teacher: '', room: '', type: 'break', color: 'gray' },
      { time: '10:15', subject: 'الفيزياء', teacher: 'أ. سارة حسن', room: 'مختبر الفيزياء', type: 'lab', color: 'purple' },
      { time: '11:00', subject: 'الرياضيات', teacher: 'أ. محمد علي', room: 'قاعة 102', type: 'lecture', color: 'green' },
      { time: '11:45', subject: 'استراحة الغداء', teacher: '', room: '', type: 'break', color: 'gray' },
      { time: '12:30', subject: 'التربية البدنية', teacher: 'أ. خالد محمد', room: 'الملعب', type: 'activity', color: 'red' },
      { time: '13:15', subject: 'مراجعة عامة', teacher: 'أ. فاطمة أحمد', room: 'قاعة 101', type: 'review', color: 'amber' }
    ]
  });

  const [upcomingEvents] = useState([
    { id: 1, title: 'امتحان الرياضيات', date: '2024-01-20', time: '08:00', type: 'exam', color: 'red' },
    { id: 2, title: 'تسليم مشروع الفيزياء', date: '2024-01-22', time: '10:15', type: 'assignment', color: 'blue' },
    { id: 3, title: 'نشاط رياضي', date: '2024-01-25', time: '12:30', type: 'activity', color: 'green' },
    { id: 4, title: 'اجتماع أولياء الأمور', date: '2024-01-28', time: '14:00', type: 'meeting', color: 'purple' }
  ]);

  const getCurrentWeekDates = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + (currentWeek * 7));
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  };

  const weekDates = getCurrentWeekDates();

  const getColorClasses = (color: string, type: 'bg' | 'border' | 'text') => {
    const colorMap = {
      blue: { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-800' },
      green: { bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-800' },
      purple: { bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-800' },
      yellow: { bg: 'bg-yellow-100', border: 'border-yellow-300', text: 'text-yellow-800' },
      red: { bg: 'bg-red-100', border: 'border-red-300', text: 'text-red-800' },
      indigo: { bg: 'bg-indigo-100', border: 'border-indigo-300', text: 'text-indigo-800' },
      orange: { bg: 'bg-orange-100', border: 'border-orange-300', text: 'text-orange-800' },
      teal: { bg: 'bg-teal-100', border: 'border-teal-300', text: 'text-teal-800' },
      emerald: { bg: 'bg-emerald-100', border: 'border-emerald-300', text: 'text-emerald-800' },
      cyan: { bg: 'bg-cyan-100', border: 'border-cyan-300', text: 'text-cyan-800' },
      pink: { bg: 'bg-pink-100', border: 'border-pink-300', text: 'text-pink-800' },
      lime: { bg: 'bg-lime-100', border: 'border-lime-300', text: 'text-lime-800' },
      violet: { bg: 'bg-violet-100', border: 'border-violet-300', text: 'text-violet-800' },
      rose: { bg: 'bg-rose-100', border: 'border-rose-300', text: 'text-rose-800' },
      slate: { bg: 'bg-slate-100', border: 'border-slate-300', text: 'text-slate-800' },
      amber: { bg: 'bg-amber-100', border: 'border-amber-300', text: 'text-amber-800' },
      gray: { bg: 'bg-gray-100', border: 'border-gray-300', text: 'text-gray-600' }
    };
    
    return colorMap[color as keyof typeof colorMap]?.[type] || colorMap.gray[type];
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lecture': return <BookOpen className="h-4 w-4" />;
      case 'lab': return <User className="h-4 w-4" />;
      case 'activity': return <Calendar className="h-4 w-4" />;
      case 'break': return <Clock className="h-4 w-4" />;
      case 'review': return <Filter className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const handleDownloadSchedule = () => {
    showInfo('إشعار', 'سيتم تحميل الجدول الزمني بصيغة PDF');
  };

  const handleSetReminder = (event: any) => {
    showInfo('إشعار', `تم تعيين تذكير لـ: ${event.title}`);
  };

  return (
    <RoleBasedLayout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'الرئيسية', path: '/student-dashboard', icon: '🏠' },
          { label: 'جدولي الدراسي', icon: '📅' }
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
                <h1 className="text-3xl font-bold mb-2">📅 الجدول الزمني</h1>
                <p className="text-indigo-100">جدولك الدراسي والأنشطة الأسبوعية</p>
              </div>
            </div>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <button
                onClick={() => setShowReminders(!showReminders)}
                className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center"
              >
                <Bell className="h-4 w-4 ml-2" />
                التذكيرات
              </button>
              <button
                onClick={handleDownloadSchedule}
                className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center"
              >
                <Download className="h-4 w-4 ml-2" />
                تحميل
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <button
                onClick={() => setCurrentWeek(currentWeek - 1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-800">
                  {weekDates[0].toLocaleDateString('ar-SA', { month: 'long', year: 'numeric' })}
                </h2>
                <p className="text-gray-600">
                  {weekDates[0].toLocaleDateString('ar-SA', { day: 'numeric', month: 'short' })} - {' '}
                  {weekDates[6].toLocaleDateString('ar-SA', { day: 'numeric', month: 'short' })}
                </p>
              </div>

              <button
                onClick={() => setCurrentWeek(currentWeek + 1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>

            <div className="flex space-x-2 rtl:space-x-reverse">
              <button
                onClick={() => setViewMode('week')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'week' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                عرض أسبوعي
              </button>
              <button
                onClick={() => setViewMode('day')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'day' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                عرض يومي
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Schedule */}
          <div className="lg:col-span-3">
            {viewMode === 'week' ? (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-4 text-right font-semibold text-gray-800 min-w-[100px]">الوقت</th>
                        {days.slice(0, 5).map((day, index) => (
                          <th key={index} className="p-4 text-center font-semibold text-gray-800 min-w-[200px]">
                            <div>{day}</div>
                            <div className="text-sm font-normal text-gray-600">
                              {weekDates[index].toLocaleDateString('ar-SA', { day: 'numeric', month: 'short' })}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {timeSlots.map((time, timeIndex) => (
                        <tr key={timeIndex} className="border-t border-gray-200">
                          <td className="p-4 font-medium text-gray-700 bg-gray-50">
                            {time}
                          </td>
                          {days.slice(0, 5).map((_, dayIndex) => {
                            const daySchedule = schedule[dayIndex as keyof typeof schedule] || [];
                            const classAtTime = daySchedule.find(cls => cls.time === time);
                            
                            return (
                              <td key={dayIndex} className="p-2 border-r border-gray-200">
                                {classAtTime ? (
                                  <div className={`p-3 rounded-lg border-2 ${getColorClasses(classAtTime.color, 'bg')} ${getColorClasses(classAtTime.color, 'border')} ${getColorClasses(classAtTime.color, 'text')}`}>
                                    <div className="flex items-center mb-1">
                                      {getTypeIcon(classAtTime.type)}
                                      <span className="font-semibold text-sm mr-2">{classAtTime.subject}</span>
                                    </div>
                                    {classAtTime.teacher && (
                                      <div className="text-xs opacity-80 mb-1">
                                        <User className="h-3 w-3 inline ml-1" />
                                        {classAtTime.teacher}
                                      </div>
                                    )}
                                    {classAtTime.room && (
                                      <div className="text-xs opacity-80">
                                        <MapPin className="h-3 w-3 inline ml-1" />
                                        {classAtTime.room}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div className="h-20"></div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="mb-6">
                  <div className="flex space-x-2 rtl:space-x-reverse overflow-x-auto pb-2">
                    {days.slice(0, 5).map((day, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedDay(index)}
                        className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                          selectedDay === index
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        <div>{day}</div>
                        <div className="text-xs">
                          {weekDates[index].toLocaleDateString('ar-SA', { day: 'numeric', month: 'short' })}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {(schedule[selectedDay as keyof typeof schedule] || []).map((classItem, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${getColorClasses(classItem.color, 'bg')} ${getColorClasses(classItem.color, 'border')}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          {getTypeIcon(classItem.type)}
                          <h3 className={`font-bold text-lg mr-2 ${getColorClasses(classItem.color, 'text')}`}>
                            {classItem.subject}
                          </h3>
                        </div>
                        <div className={`flex items-center ${getColorClasses(classItem.color, 'text')}`}>
                          <Clock className="h-4 w-4 ml-1" />
                          {classItem.time}
                        </div>
                      </div>
                      
                      {classItem.teacher && (
                        <div className={`flex items-center mb-1 ${getColorClasses(classItem.color, 'text')} opacity-80`}>
                          <User className="h-4 w-4 ml-2" />
                          {classItem.teacher}
                        </div>
                      )}
                      
                      {classItem.room && (
                        <div className={`flex items-center ${getColorClasses(classItem.color, 'text')} opacity-80`}>
                          <MapPin className="h-4 w-4 ml-2" />
                          {classItem.room}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Classes */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Calendar className="h-5 w-5 ml-2" />
                حصص اليوم
              </h3>
              <div className="space-y-3">
                {(schedule[new Date().getDay() as keyof typeof schedule] || []).slice(0, 4).map((classItem, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ml-3 ${getColorClasses(classItem.color, 'bg').replace('100', '500')}`}></div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{classItem.subject}</div>
                      <div className="text-sm text-gray-600">{classItem.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Bell className="h-5 w-5 ml-2" />
                الأحداث القادمة
              </h3>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800">{event.title}</h4>
                      <button
                        onClick={() => handleSetReminder(event)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Bell className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString('ar-SA')} - {event.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">دليل الألوان</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded ml-2"></div>
                  <span className="text-sm text-gray-700">محاضرة</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-purple-500 rounded ml-2"></div>
                  <span className="text-sm text-gray-700">مختبر</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded ml-2"></div>
                  <span className="text-sm text-gray-700">نشاط</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-500 rounded ml-2"></div>
                  <span className="text-sm text-gray-700">استراحة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reminders Modal */}
      {showReminders && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">التذكيرات</h3>
              <button
                onClick={() => setShowReminders(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-800">{event.title}</div>
                    <div className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString('ar-SA')} - {event.time}
                    </div>
                  </div>
                  <button
                    onClick={() => handleSetReminder(event)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    تذكير
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button
                onClick={() => setShowReminders(false)}
                className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </RoleBasedLayout>
  );
};

export default StudentSchedule;