import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { Users, UserPlus, Search, Filter, Edit, Trash2, Eye, ArrowLeft, BookOpen, GraduationCap, Phone, Mail, Calendar, CheckCircle, XCircle } from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  classes: string[];
  experience: number;
  joinDate: string;
  status: 'active' | 'inactive';
  totalStudents: number;
  avatar: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  grade: string;
  class: string;
  parentName: string;
  parentPhone: string;
  enrollDate: string;
  status: 'active' | 'inactive';
  average: number;
  rank: number;
  avatar: string;
}

interface NewUser {
  name: string;
  email: string;
  phone: string;
  subject: string;
  grade: string;
  class: string;
  parentName: string;
  parentPhone: string;
  experience: number;
}

const SchoolAdminUsers: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo, showConfirm } = useNotification();
  const [activeTab, setActiveTab] = useState('teachers');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Teacher | Student | null>(null);
  const [userType, setUserType] = useState<'teacher' | 'student'>('teacher');

  const [teachers] = useState<Teacher[]>([
    {
      id: '1',
      name: 'أ. فاطمة أحمد',
      email: 'fatima.ahmed@school.edu.dz',
      phone: '0555-111-222',
      subject: 'اللغة العربية',
      classes: ['3أ', '3ب', '2أ'],
      experience: 8,
      joinDate: '2020-09-01',
      status: 'active',
      totalStudents: 84,
      avatar: '👩‍🏫'
    },
    {
      id: '2',
      name: 'أ. محمد علي',
      email: 'mohamed.ali@school.edu.dz',
      phone: '0555-333-444',
      subject: 'الرياضيات',
      classes: ['3أ', '2ب'],
      experience: 12,
      joinDate: '2018-09-01',
      status: 'active',
      totalStudents: 56,
      avatar: '👨‍🏫'
    },
    {
      id: '3',
      name: 'أ. سارة حسن',
      email: 'sara.hassan@school.edu.dz',
      phone: '0555-555-666',
      subject: 'الفيزياء',
      classes: ['3أ', '3ب'],
      experience: 5,
      joinDate: '2021-09-01',
      status: 'inactive',
      totalStudents: 58,
      avatar: '👩‍🏫'
    }
  ]);

  const [students] = useState<Student[]>([
    {
      id: '1',
      name: 'أحمد محمد',
      email: 'ahmed.mohamed@student.edu.dz',
      phone: '0555-777-888',
      grade: 'السنة الثالثة متوسط',
      class: 'فوج أ',
      parentName: 'محمد أحمد',
      parentPhone: '0555-999-000',
      enrollDate: '2023-09-01',
      status: 'active',
      average: 16.5,
      rank: 3,
      avatar: '👦'
    },
    {
      id: '2',
      name: 'فاطمة أحمد',
      email: 'fatima.ahmed@student.edu.dz',
      phone: '0555-111-333',
      grade: 'السنة الثالثة متوسط',
      class: 'فوج أ',
      parentName: 'أحمد فاطمة',
      parentPhone: '0555-222-444',
      enrollDate: '2023-09-01',
      status: 'active',
      average: 18.2,
      rank: 1,
      avatar: '👧'
    },
    {
      id: '3',
      name: 'يوسف إبراهيم',
      email: 'youssef.ibrahim@student.edu.dz',
      phone: '0555-555-777',
      grade: 'السنة الثانية متوسط',
      class: 'فوج ب',
      parentName: 'إبراهيم يوسف',
      parentPhone: '0555-666-888',
      enrollDate: '2023-09-01',
      status: 'inactive',
      average: 14.8,
      rank: 8,
      avatar: '👦'
    }
  ]);

  const [newUser, setNewUser] = useState<NewUser>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    grade: '',
    class: '',
    parentName: '',
    parentPhone: '',
    experience: 0
  });

  const currentData: (Teacher | Student)[] = activeTab === 'teachers' ? teachers : students;
  
  const filteredData = currentData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      showSuccess('تم الإضافة', `تم إضافة ${userType === 'teacher' ? 'المعلم' : 'الطالب'}: ${newUser.name}`);
      setShowAddModal(false);
      setNewUser({
        name: '',
        email: '',
        phone: '',
        subject: '',
        grade: '',
        class: '',
        parentName: '',
        parentPhone: '',
        experience: 0
      });
    }
  };

  const handleViewDetails = (user: Teacher | Student) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const handleEditUser = (user: Teacher | Student) => {
    showInfo('إشعار', `فتح محرر بيانات ${user.name}`);
  };

  const handleDeleteUser = async (user: Teacher | Student) => {
    const confirmed = await showConfirm(
      'تأكيد الحذف',
      `هل أنت متأكد من حذف ${user.name}؟`
    );
    if (confirmed) {
      showSuccess('تم الحذف', `تم حذف ${user.name}`);
    }
  };

  const handleToggleStatus = (user: Teacher | Student) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    showInfo('إشعار', `تم ${newStatus === 'active' ? 'تفعيل' : 'إلغاء تفعيل'} ${user.name}`);
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
  };

  const getStatusText = (status: string) => {
    return status === 'active' ? 'نشط' : 'غير نشط';
  };

  const isTeacher = (user: Teacher | Student): user is Teacher => {
    return 'subject' in user;
  };

  const isStudent = (user: Teacher | Student): user is Student => {
    return 'grade' in user;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
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
                <h1 className="text-3xl font-bold mb-2">👥 إدارة المستخدمين</h1>
                <p className="text-blue-100">إدارة المعلمين والطلاب في المدرسة</p>
              </div>
            </div>
            <button
              onClick={() => {
                setUserType(activeTab === 'teachers' ? 'teacher' : 'student');
                setShowAddModal(true);
              }}
              className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg hover:bg-white/30 transition-colors flex items-center"
            >
              <UserPlus className="h-5 w-5 ml-2" />
              إضافة {activeTab === 'teachers' ? 'معلم' : 'طالب'}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          {/* Tabs */}
          <div className="flex space-x-1 rtl:space-x-reverse bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setActiveTab('teachers')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center ${
                activeTab === 'teachers'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <GraduationCap className="h-4 w-4 ml-2" />
              المعلمون ({teachers.length})
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center ${
                activeTab === 'students'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Users className="h-4 w-4 ml-2" />
              الطلاب ({students.length})
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder={`البحث في ${activeTab === 'teachers' ? 'المعلمين' : 'الطلاب'}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">جميع الحالات</option>
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredData.map((user) => (
            <div key={user.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="text-4xl ml-3">{user.avatar}</div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{user.name}</h3>
                      <p className="text-sm text-gray-600">
                        {activeTab === 'teachers' && isTeacher(user) ? user.subject : 
                         activeTab === 'students' && isStudent(user) ? `${user.grade} - ${user.class}` : ''}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.status)}`}>
                    {getStatusText(user.status)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 ml-2" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 ml-2" />
                    <span>{user.phone}</span>
                  </div>
                  {activeTab === 'teachers' && isTeacher(user) ? (
                    <>
                      <div className="flex items-center text-sm text-gray-600">
                        <BookOpen className="h-4 w-4 ml-2" />
                        <span>الفصول: {user.classes.join(', ')}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 ml-2" />
                        <span>{user.experience} سنوات خبرة</span>
                      </div>
                    </>
                  ) : activeTab === 'students' && isStudent(user) ? (
                    <>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 ml-2" />
                        <span>ولي الأمر: {user.parentName}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 ml-2" />
                        <span>هاتف ولي الأمر: {user.parentPhone}</span>
                      </div>
                    </>
                  ) : null}
                </div>

                {/* Stats */}
                {activeTab === 'teachers' && isTeacher(user) ? (
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{user.totalStudents}</div>
                      <div className="text-sm text-gray-600">إجمالي الطلاب</div>
                    </div>
                  </div>
                ) : activeTab === 'students' && isStudent(user) ? (
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-green-600">{user.average}</div>
                      <div className="text-xs text-gray-600">المعدل</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-purple-600">#{user.rank}</div>
                      <div className="text-xs text-gray-600">الترتيب</div>
                    </div>
                  </div>
                ) : null}

                {/* Actions */}
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <button
                    onClick={() => handleViewDetails(user)}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-sm"
                  >
                    <Eye className="h-4 w-4 ml-1" />
                    عرض
                  </button>
                  <button
                    onClick={() => handleEditUser(user)}
                    className="bg-gray-200 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleToggleStatus(user)}
                    className={`py-2 px-3 rounded-lg transition-colors ${
                      user.status === 'active'
                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                        : 'bg-green-100 text-green-600 hover:bg-green-200'
                    }`}
                  >
                    {user.status === 'active' ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="bg-red-100 text-red-600 py-2 px-3 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">لا توجد نتائج</h3>
            <p className="text-gray-600">لم يتم العثور على {activeTab === 'teachers' ? 'معلمين' : 'طلاب'} يطابقون المعايير المحددة</p>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              إضافة {userType === 'teacher' ? 'معلم' : 'طالب'} جديد
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="الاسم الكامل"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="example@school.edu.dz"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="0555-123-456"
                />
              </div>

              {userType === 'teacher' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">المادة التدريسية</label>
                    <select
                      value={newUser.subject}
                      onChange={(e) => setNewUser({...newUser, subject: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">اختر المادة</option>
                      <option value="اللغة العربية">اللغة العربية</option>
                      <option value="الرياضيات">الرياضيات</option>
                      <option value="الفيزياء">الفيزياء</option>
                      <option value="التاريخ">التاريخ</option>
                      <option value="الجغرافيا">الجغرافيا</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">سنوات الخبرة</label>
                    <input
                      type="number"
                      value={newUser.experience}
                      onChange={(e) => setNewUser({...newUser, experience: parseInt(e.target.value)})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                      max="40"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">المستوى الدراسي</label>
                      <select
                        value={newUser.grade}
                        onChange={(e) => setNewUser({...newUser, grade: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">اختر المستوى</option>
                        <option value="السنة الأولى متوسط">السنة الأولى متوسط</option>
                        <option value="السنة الثانية متوسط">السنة الثانية متوسط</option>
                        <option value="السنة الثالثة متوسط">السنة الثالثة متوسط</option>
                        <option value="السنة الرابعة متوسط">السنة الرابعة متوسط</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الفوج</label>
                      <select
                        value={newUser.class}
                        onChange={(e) => setNewUser({...newUser, class: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">اختر الفوج</option>
                        <option value="فوج أ">فوج أ</option>
                        <option value="فوج ب">فوج ب</option>
                        <option value="فوج ج">فوج ج</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">اسم ولي الأمر</label>
                      <input
                        type="text"
                        value={newUser.parentName}
                        onChange={(e) => setNewUser({...newUser, parentName: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="اسم ولي الأمر"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">هاتف ولي الأمر</label>
                      <input
                        type="tel"
                        value={newUser.parentPhone}
                        onChange={(e) => setNewUser({...newUser, parentPhone: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="0555-123-456"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex space-x-4 rtl:space-x-reverse mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddUser}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                إضافة {userType === 'teacher' ? 'المعلم' : 'الطالب'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {showDetailsModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">تفاصيل {selectedUser.name}</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="text-6xl ml-4">{selectedUser.avatar}</div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-800">{selectedUser.name}</h4>
                    <p className="text-gray-600">
                      {activeTab === 'teachers' && isTeacher(selectedUser) ? selectedUser.subject : 
                       activeTab === 'students' && isStudent(selectedUser) ? `${selectedUser.grade} - ${selectedUser.class}` : ''}
                    </p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(selectedUser.status)}`}>
                      {getStatusText(selectedUser.status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="font-bold text-gray-800 mb-4">معلومات الاتصال</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Mail className="h-4 w-4 text-gray-600 ml-2" />
                    <span className="text-sm">{selectedUser.email}</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Phone className="h-4 w-4 text-gray-600 ml-2" />
                    <span className="text-sm">{selectedUser.phone}</span>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div>
                <h4 className="font-bold text-gray-800 mb-4">معلومات إضافية</h4>
                <div className="space-y-3">
                  {activeTab === 'teachers' && isTeacher(selectedUser) ? (
                    <>
                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">الفصول المُدرَّسة</span>
                        <span className="font-medium">{selectedUser.classes.join(', ')}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">سنوات الخبرة</span>
                        <span className="font-medium">{selectedUser.experience} سنة</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">تاريخ الانضمام</span>
                        <span className="font-medium">{selectedUser.joinDate}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">إجمالي الطلاب</span>
                        <span className="font-medium">{selectedUser.totalStudents} طالب</span>
                      </div>
                    </>
                  ) : activeTab === 'students' && isStudent(selectedUser) ? (
                    <>
                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">ولي الأمر</span>
                        <span className="font-medium">{selectedUser.parentName}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">هاتف ولي الأمر</span>
                        <span className="font-medium">{selectedUser.parentPhone}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">تاريخ التسجيل</span>
                        <span className="font-medium">{selectedUser.enrollDate}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">المعدل العام</span>
                        <span className="font-medium text-green-600">{selectedUser.average}/20</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">الترتيب</span>
                        <span className="font-medium text-blue-600">#{selectedUser.rank}</span>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex space-x-4 rtl:space-x-reverse mt-6">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إغلاق
              </button>
              <button
                onClick={() => handleEditUser(selectedUser)}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                تعديل البيانات
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolAdminUsers;