import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { MessageSquare, Send, Search, ArrowLeft, User, Clock, CheckCircle, Phone, Mail, Calendar, BookOpen, Plus } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import RoleBasedLayout from '../components/RoleBasedLayout';



interface Teacher {
  name: string;
  teacherName: string;
  subject: string;
  email: string;
  phone: string;
  avatar: string;
  office: string;
}

const ParentMessages: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [showTeacherInfo, setShowTeacherInfo] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const [conversations] = useState([
    {
      id: '1',
      teacherName: 'أ. فاطمة أحمد',
      subject: 'اللغة العربية',
      childName: 'أحمد محمد',
      lastMessage: 'أحمد يظهر تحسناً ملحوظاً في النحو هذا الأسبوع',
      lastMessageTime: '2024-01-15 14:30',
      unreadCount: 0,
      status: 'read',
      priority: 'normal',
      messageSubject: 'تقرير أسبوعي',
      phone: '0555-111-222',
      email: 'fatima.ahmed@school.edu.dz',
      office: 'مكتب 205 - الطابق الثاني'
    },
    {
      id: '2',
      teacherName: 'أ. محمد علي',
      subject: 'الرياضيات',
      childName: 'أحمد محمد',
      lastMessage: 'يرجى مراجعة واجبات الجبر مع أحمد في المنزل',
      lastMessageTime: '2024-01-15 10:15',
      unreadCount: 2,
      status: 'unread',
      priority: 'medium',
      messageSubject: 'متابعة الواجبات',
      phone: '0555-333-444',
      email: 'mohamed.ali@school.edu.dz',
      office: 'مكتب 301 - الطابق الثالث'
    },
    {
      id: '3',
      teacherName: 'أ. سارة حسن',
      subject: 'الفيزياء',
      childName: 'فاطمة محمد',
      lastMessage: 'فاطمة متفوقة في التجارب العملية',
      lastMessageTime: '2024-01-14 16:45',
      unreadCount: 1,
      status: 'unread',
      priority: 'normal',
      messageSubject: 'تقييم الأداء',
      phone: '0555-555-666',
      email: 'sara.hassan@school.edu.dz',
      office: 'مختبر الفيزياء - الطابق الأول'
    },
    {
      id: '4',
      teacherName: 'أ. أحمد بن علي',
      subject: 'التاريخ',
      childName: 'أحمد محمد',
      lastMessage: 'شكراً لكم على المتابعة المستمرة',
      lastMessageTime: '2024-01-14 09:20',
      unreadCount: 0,
      status: 'read',
      priority: 'normal',
      messageSubject: 'شكر وتقدير',
      phone: '0555-777-888',
      email: 'ahmed.benali@school.edu.dz',
      office: 'مكتب 102 - الطابق الأول'
    }
  ]);

  const [messages] = useState({
    '1': [
      {
        id: '1',
        sender: 'parent',
        content: 'السلام عليكم أستاذة فاطمة، أريد الاستفسار عن أداء ابني أحمد في مادة اللغة العربية هذا الأسبوع',
        timestamp: '2024-01-15 09:00',
        read: true
      },
      {
        id: '2',
        sender: 'teacher',
        content: 'وعليكم السلام، أحمد يظهر تحسناً ملحوظاً في النحو. شارك بنشاط في حصة اليوم وأجاب على الأسئلة بثقة. درجته في الواجب الأخير كانت 18/20.',
        timestamp: '2024-01-15 09:15',
        read: true
      },
      {
        id: '3',
        sender: 'parent',
        content: 'الحمد لله، هذا يسعدني كثيراً. هل هناك مجالات يحتاج فيها لمزيد من التركيز؟',
        timestamp: '2024-01-15 09:30',
        read: true
      },
      {
        id: '4',
        sender: 'teacher',
        content: 'أنصح بالتركيز على التعبير الكتابي. يمكنكم تشجيعه على كتابة موضوعات قصيرة في المنزل. سأرسل لكم بعض المواضيع المقترحة.',
        timestamp: '2024-01-15 14:00',
        read: true
      },
      {
        id: '5',
        sender: 'teacher',
        content: 'أحمد يظهر تحسناً ملحوظاً في النحو هذا الأسبوع',
        timestamp: '2024-01-15 14:30',
        read: true
      }
    ],
    '2': [
      {
        id: '1',
        sender: 'teacher',
        content: 'السلام عليكم، أريد لفت انتباهكم إلى أن أحمد لم يسلم واجب الجبر المطلوب أمس',
        timestamp: '2024-01-15 10:00',
        read: true
      },
      {
        id: '2',
        sender: 'teacher',
        content: 'يرجى مراجعة واجبات الجبر مع أحمد في المنزل',
        timestamp: '2024-01-15 10:15',
        read: false
      }
    ],
    '3': [
      {
        id: '1',
        sender: 'teacher',
        content: 'فاطمة متفوقة في التجارب العملية، تظهر فهماً عميقاً للمفاهيم الفيزيائية',
        timestamp: '2024-01-14 16:45',
        read: false
      }
    ]
  });

  const [newMessageData, setNewMessageData] = useState({
    teacher: '',
    subject: '',
    content: '',
    priority: 'normal',
    requestMeeting: false,
    meetingDate: '',
    meetingTime: ''
  });

  const teachers = [
    { id: '1', name: 'أ. فاطمة أحمد', subject: 'اللغة العربية' },
    { id: '2', name: 'أ. محمد علي', subject: 'الرياضيات' },
    { id: '3', name: 'أ. سارة حسن', subject: 'الفيزياء' },
    { id: '4', name: 'أ. أحمد بن علي', subject: 'التاريخ' }
  ];

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.messageSubject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'unread' && conv.unreadCount > 0) ||
                         (filterType === 'priority' && conv.priority !== 'normal');
    
    return matchesSearch && matchesFilter;
  });

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      showSuccess('تم الإرسال', 'تم إرسال الرسالة بنجاح');
      setNewMessage('');
    }
  };

  const handleSendNewMessage = () => {
    if (newMessageData.teacher && newMessageData.content) {
      showSuccess('تم الإرسال', 'تم إرسال الرسالة الجديدة بنجاح');
      setShowNewMessageModal(false);
      setNewMessageData({ 
        teacher: '', 
        subject: '', 
        content: '', 
        priority: 'normal',
        requestMeeting: false,
        meetingDate: '',
        meetingTime: ''
      });
    }
  };

  const handleViewTeacherInfo = (conversation: any) => {
    setSelectedTeacher(conversation);
    setShowTeacherInfo(true);
  };

  const handleRequestMeeting = (teacherName: string) => {
    showInfo('إشعار', `سيتم إرسال طلب موعد مع ${teacherName}`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'عالية';
      case 'medium': return 'متوسطة';
      default: return 'عادية';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('ar-SA');
    }
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const conversationMessages = selectedConversation ? messages[selectedConversation as keyof typeof messages] || [] : [];

  return (
    <RoleBasedLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'الرئيسية', path: '/parent-dashboard', icon: '🏠' },
          { label: 'الرسائل', icon: '💬' }
        ]} />
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
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
                <h1 className="text-3xl font-bold mb-2">💬 التواصل مع المعلمين</h1>
                <p className="text-purple-100">تواصل مباشر مع معلمي أطفالك</p>
              </div>
            </div>
            <button
              onClick={() => setShowNewMessageModal(true)}
              className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg hover:bg-white/30 transition-colors flex items-center"
            >
              <Plus className="h-5 w-5 ml-2" />
              رسالة جديدة
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4">المحادثات</h2>
              
              {/* Search and Filter */}
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="البحث في المحادثات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">جميع المحادثات</option>
                  <option value="unread">غير مقروءة</option>
                  <option value="priority">أولوية عالية</option>
                </select>
              </div>
            </div>

            <div className="overflow-y-auto h-full">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedConversation === conversation.id ? 'bg-purple-50 border-r-4 border-r-purple-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center ml-3">
                        <User className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{conversation.teacherName}</h3>
                        <p className="text-sm text-gray-600">{conversation.subject}</p>
                        <p className="text-xs text-gray-500">طفل: {conversation.childName}</p>
                      </div>
                    </div>
                    <div className="text-left">
                      {conversation.unreadCount > 0 && (
                        <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mb-1">
                          {conversation.unreadCount}
                        </div>
                      )}
                      <div className="text-xs text-gray-500">{formatTime(conversation.lastMessageTime)}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{conversation.messageSubject}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(conversation.priority)}`}>
                      {getPriorityText(conversation.priority)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2">{conversation.lastMessage}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center ml-4">
                        <User className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{selectedConv.teacherName}</h3>
                        <p className="text-sm text-gray-600">معلم {selectedConv.subject}</p>
                        <p className="text-sm text-gray-500">طفل: {selectedConv.childName}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <button
                        onClick={() => handleViewTeacherInfo(selectedConv)}
                        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
                        title="معلومات المعلم"
                      >
                        <User className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => showInfo('إشعار', `الاتصال بـ ${selectedConv.phone}`)}
                        className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition-colors"
                        title="اتصال هاتفي"
                      >
                        <Phone className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleRequestMeeting(selectedConv.teacherName)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
                        title="طلب موعد"
                      >
                        <Calendar className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {conversationMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'parent' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                          message.sender === 'parent'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className={`flex items-center justify-between mt-2 text-xs ${
                          message.sender === 'parent' ? 'text-purple-100' : 'text-gray-500'
                        }`}>
                          <span>{formatTime(message.timestamp)}</span>
                          {message.sender === 'parent' && (
                            <div className="flex items-center mr-2">
                              {message.read ? (
                                <CheckCircle className="h-3 w-3" />
                              ) : (
                                <Clock className="h-3 w-3" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-6 border-t border-gray-200">
                  <div className="flex items-end space-x-4 rtl:space-x-reverse">
                    <div className="flex-1">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="اكتب رسالتك هنا..."
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">اختر محادثة</h3>
                  <p className="text-gray-600">اختر محادثة من القائمة لبدء المراسلة</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Message Modal */}
      {showNewMessageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">رسالة جديدة</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المعلم</label>
                <select
                  value={newMessageData.teacher}
                  onChange={(e) => setNewMessageData({...newMessageData, teacher: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">اختر معلم</option>
                  {teachers.map(teacher => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name} - {teacher.subject}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الموضوع</label>
                <input
                  type="text"
                  value={newMessageData.subject}
                  onChange={(e) => setNewMessageData({...newMessageData, subject: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="موضوع الرسالة"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الأولوية</label>
                <select
                  value={newMessageData.priority}
                  onChange={(e) => setNewMessageData({...newMessageData, priority: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="normal">عادية</option>
                  <option value="medium">متوسطة</option>
                  <option value="high">عالية</option>
                </select>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newMessageData.requestMeeting}
                    onChange={(e) => setNewMessageData({...newMessageData, requestMeeting: e.target.checked})}
                    className="ml-2"
                  />
                  <span className="text-sm font-medium text-gray-700">طلب موعد للقاء</span>
                </label>
              </div>

              {newMessageData.requestMeeting && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">التاريخ المفضل</label>
                    <input
                      type="date"
                      value={newMessageData.meetingDate}
                      onChange={(e) => setNewMessageData({...newMessageData, meetingDate: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الوقت المفضل</label>
                    <input
                      type="time"
                      value={newMessageData.meetingTime}
                      onChange={(e) => setNewMessageData({...newMessageData, meetingTime: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">محتوى الرسالة</label>
                <textarea
                  value={newMessageData.content}
                  onChange={(e) => setNewMessageData({...newMessageData, content: e.target.value})}
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>
            </div>

            <div className="flex space-x-4 rtl:space-x-reverse mt-6">
              <button
                onClick={() => setShowNewMessageModal(false)}
                className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={handleSendNewMessage}
                className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                إرسال الرسالة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Teacher Info Modal */}
      {showTeacherInfo && selectedTeacher && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">معلومات المعلم</h3>
            
            <div className="text-center mb-6">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-10 w-10 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800">{selectedTeacher.teacherName}</h4>
              <p className="text-gray-600">معلم {selectedTeacher.subject}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-600 ml-2" />
                  <span className="text-sm text-gray-600">الهاتف</span>
                </div>
                <span className="font-medium text-gray-800">{selectedTeacher.phone}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-600 ml-2" />
                  <span className="text-sm text-gray-600">البريد الإلكتروني</span>
                </div>
                <span className="font-medium text-gray-800 text-sm">{selectedTeacher.email}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 text-gray-600 ml-2" />
                  <span className="text-sm text-gray-600">المكتب</span>
                </div>
                <span className="font-medium text-gray-800 text-sm">{selectedTeacher.office}</span>
              </div>
            </div>

            <div className="flex space-x-4 rtl:space-x-reverse mt-6">
              <button
                onClick={() => setShowTeacherInfo(false)}
                className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إغلاق
              </button>
              <button
                onClick={() => {
                  setShowTeacherInfo(false);
                  handleRequestMeeting(selectedTeacher.teacherName);
                }}
                className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
              >
                <Calendar className="h-4 w-4 ml-2" />
                طلب موعد
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </RoleBasedLayout>
  );
};

export default ParentMessages;