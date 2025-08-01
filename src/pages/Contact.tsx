import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { Phone, Mail, MapPin, Clock, Users, Award, BookOpen, Star } from 'lucide-react';

const Contact: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    visitDate: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showInfo('إشعار', 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      visitDate: ''
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-red-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">تواصل معنا</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نحن هنا للإجابة على جميع استفساراتكم ومساعدتكم في اكتشاف كيف يمكن لمنصة نبراس الجزائر تحويل تجربة التعلم في مدرستكم
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">أرسل لنا رسالة</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">الاسم الكامل</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">البريد الإلكتروني</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">رقم الهاتف</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">موضوع الرسالة</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">اختر الموضوع</option>
                      <option value="demo">طلب عرض توضيحي</option>
                      <option value="pricing">الاستفسار عن الأسعار</option>
                      <option value="support">الدعم التقني</option>
                      <option value="partnership">الشراكة</option>
                      <option value="other">أخرى</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">تاريخ الزيارة المفضل (اختياري)</label>
                  <input
                    type="date"
                    name="visitDate"
                    value={formData.visitDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">الرسالة</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="اكتب رسالتك هنا..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  إرسال الرسالة
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">معلومات الاتصال</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-6 w-6 text-blue-600 ml-4" />
                    <div>
                      <p className="font-semibold text-gray-800">الهاتف</p>
                      <p className="text-gray-600">+213 23 XX XX XX</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 text-green-600 ml-4" />
                    <div>
                      <p className="font-semibold text-gray-800">البريد الإلكتروني</p>
                      <p className="text-gray-600">info@nibras-algeria.dz</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-6 w-6 text-red-600 ml-4" />
                    <div>
                      <p className="font-semibold text-gray-800">العنوان</p>
                      <p className="text-gray-600">الجزائر العاصمة، الجزائر</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-6 w-6 text-purple-600 ml-4" />
                    <div>
                      <p className="font-semibold text-gray-800">ساعات العمل</p>
                      <p className="text-gray-600">الأحد - الخميس: 8:00 - 17:00</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">إجراءات سريعة</h3>
                <div className="space-y-4">
                  <button
                    onClick={() => window.open('tel:+21323XXXXXX')}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Phone className="h-5 w-5 ml-2" />
                    اتصل الآن
                  </button>
                  <button
                    onClick={() => window.open('mailto:info@nibras-algeria.dz')}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <Mail className="h-5 w-5 ml-2" />
                    أرسل إيميل
                  </button>
                  <button
                    onClick={() => showInfo('إشعار', 'سيتم فتح خرائط جوجل قريبا')}
                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                  >
                    <MapPin className="h-5 w-5 ml-2" />
                    عرض الموقع
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">الأسئلة الشائعة</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">كيف يمكن طلب عرض توضيحي؟</h4>
              <p className="text-gray-600">يمكنكم طلب عرض توضيحي مجاني من خلال ملء النموذج أعلاه أو الاتصال بنا مباشرة. سنقوم بتحديد موعد مناسب لعرض المنصة.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">ما هي تكلفة المنصة؟</h4>
              <p className="text-gray-600">نقدم خطط أسعار مرنة تناسب جميع أحجام المدارس. تواصلوا معنا للحصول على عرض سعر مخصص لمدرستكم.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">هل تقدمون التدريب؟</h4>
              <p className="text-gray-600">نعم، نقدم تدريباً شاملاً لجميع المستخدمين بما في ذلك المعلمين والإداريين والطلاب لضمان الاستفادة القصوى من المنصة.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">هل المنصة متوافقة مع المنهج الجزائري؟</h4>
              <p className="text-gray-600">بالطبع! تم تصميم المنصة خصيصاً للمنهج الجزائري وتدعم جميع المراحل التعليمية من الابتدائي إلى الثانوي.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">لماذا تختار نبراس الجزائر؟</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">فريق خبير</h4>
              <p className="text-gray-600">فريق من الخبراء في التعليم والتكنولوجيا</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">جودة عالية</h4>
              <p className="text-gray-600">منصة تعليمية بمعايير عالمية</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">محتوى شامل</h4>
              <p className="text-gray-600">محتوى تعليمي متكامل لجميع المراحل</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">دعم مستمر</h4>
              <p className="text-gray-600">دعم فني ومتابعة مستمرة</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;