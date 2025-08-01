import React, { useState } from 'react';
import LessonModal, { LessonData } from './LessonModal';

const LessonModalTest: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const testLessonData: LessonData = {
    id: 'test_math_addition_5',
    title: 'مهمة فريق الأبطال الخمسة - اختبار',
    subject: 'الرياضيات',
    duration: '25 دقيقة',
    difficulty: 'متوسط',
    description: 'تعلم الجمع بإضافة العدد 5 من خلال مغامرة فضائية مثيرة مع فريق الأبطال الخمسة',
    objectives: [
      'إتقان عملية الجمع بإضافة العدد 5',
      'استخدام استراتيجية العد التصاعدي',
      'حل المسائل الرياضية بثقة',
      'تطبيق المفهوم في مواقف مختلفة'
    ],
    activities: [
      {
        id: 1,
        type: 'drag-drop',
        title: 'شاحن الطاقة',
        description: 'اسحب كبسولة طاقة الأبطال (+5) إلى الشاحن',
        content: {
          baseNumber: 3,
          targetNumber: 8,
          options: [6, 8, 10]
        },
        completed: false
      },
      {
        id: 2,
        type: 'multiple-choice',
        title: 'تدمير الكويكبات',
        description: 'اختر الكويكب الذي يحمل الإجابة الصحيحة',
        content: {
          equation: '7 + 5 = ?',
          options: [11, 12, 13],
          correct: 12
        },
        completed: false
      },
      {
        id: 3,
        type: 'input',
        title: 'تفعيل الدرع',
        description: 'أدخل العدد الإجمالي لوحدات الطاقة',
        content: {
          baseNumber: 4,
          addNumber: 5,
          correctAnswer: 9
        },
        completed: false
      },
      {
        id: 4,
        type: 'matching',
        title: 'توصيل خطوط الطاقة',
        description: 'صل كل محطة طاقة بمحطة الاستقبال الصحيحة',
        content: {
          pairs: [
            { left: 3, right: 8 },
            { left: 6, right: 11 },
            { left: 2, right: 7 }
          ]
        },
        completed: false
      },
      {
        id: 5,
        type: 'simulation',
        title: 'ضبط سرعة السفينة',
        description: 'استخدم أزرار التحكم للوصول إلى السرعة المطلوبة',
        content: {
          currentSpeed: 2,
          targetSpeed: 12,
          boostValue: 5
        },
        completed: false
      }
    ],
    rewards: {
      points: 300,
      dinars: 30,
      badges: ['خبير طاقة الأبطال الخمسة', 'مستكشف الفضاء', 'بطل الرياضيات']
    }
  };

  const handleComplete = (points: number, dinars: number) => {
    console.log(`تم إكمال الدرس! النقاط: ${points}, الدنانير: ${dinars}`);
    alert(`تهانينا! حصلت على ${points} نقطة و ${dinars} دينار معرفي!`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">اختبار نافذة الدروس التفاعلية</h1>
        <p className="text-gray-600 mb-6">
          اضغط على الزر أدناه لفتح نافذة درس الجمع بإضافة 5
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold"
        >
          🚀 ابدأ مهمة فريق الأبطال الخمسة
        </button>
      </div>

      <LessonModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onComplete={handleComplete}
        lessonData={testLessonData}
      />
    </div>
  );
};

export default LessonModalTest;