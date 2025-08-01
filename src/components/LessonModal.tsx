import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Star, Trophy, Coins, Target, Clock, CheckCircle, ArrowRight, ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import '../styles/lesson-modal.css';

export interface LessonData {
  id: string;
  title: string;
  subject: string;
  duration: string;
  difficulty: string;
  description: string;
  objectives: string[];
  activities: LessonActivity[];
  rewards: {
    points: number;
    dinars: number;
    badges: string[];
  };
}

export interface LessonActivity {
  id: number;
  type: 'video' | 'drag-drop' | 'multiple-choice' | 'input' | 'matching' | 'simulation';
  title: string;
  description: string;
  content: any;
  completed: boolean;
}

export interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (points: number, dinars: number) => void;
  lessonData: LessonData;
}

const LessonModal: React.FC<LessonModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  lessonData
}) => {
  const [currentStage, setCurrentStage] = useState<'intro' | 'assessment' | 'lesson' | 'activities' | 'evaluation'>('intro');
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [completedActivities, setCompletedActivities] = useState<number[]>([]);
  const [lessonProgress, setLessonProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{[key: number]: any}>({});
  const [score, setScore] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [currentSpeed, setCurrentSpeed] = useState(1);

  // مثال لدرس الجمع بإضافة 5 - بيانات تجريبية
  const mathLessonExample: LessonData = {
    id: 'math_addition_5',
    title: 'مهمة فريق الأبطال الخمسة!',
    subject: 'الرياضيات',
    duration: '25 دقيقة',
    difficulty: 'متوسط',
    description: 'تعلم الجمع بإضافة العدد 5 من خلال مغامرة فضائية مثيرة',
    objectives: [
      'إتقان عملية الجمع بإضافة العدد 5',
      'استخدام استراتيجية العد التصاعدي',
      'حل المسائل الرياضية بثقة'
    ],
    activities: [
      {
        id: 1,
        type: 'drag-drop',
        title: 'شاحن الطاقة',
        description: 'اسحب كبسولة طاقة الأبطال (+5) إلى الشاحن',
        content: {
          baseNumber: 4,
          targetNumber: 9,
          options: [7, 9, 11]
        },
        completed: false
      },
      {
        id: 2,
        type: 'multiple-choice',
        title: 'تدمير الكويكبات',
        description: 'اختر الكويكب الذي يحمل الإجابة الصحيحة',
        content: {
          equation: '6 + 5 = ?',
          options: [10, 11, 12],
          correct: 11
        },
        completed: false
      },
      {
        id: 3,
        type: 'input',
        title: 'تفعيل الدرع',
        description: 'أدخل العدد الإجمالي لوحدات الطاقة',
        content: {
          baseNumber: 7,
          addNumber: 5,
          correctAnswer: 12
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
            { left: 2, right: 7 },
            { left: 8, right: 13 },
            { left: 1, right: 6 }
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
          currentSpeed: 1,
          targetSpeed: 11,
          boostValue: 5
        },
        completed: false
      }
    ],
    rewards: {
      points: 250,
      dinars: 25,
      badges: ['خبير طاقة الأبطال الخمسة', 'مستكشف الفضاء']
    }
  };

  const currentLesson = lessonData || mathLessonExample;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentStage('intro');
      setCurrentActivityIndex(0);
      setCompletedActivities([]);
      setLessonProgress(0);
      setUserAnswers({});
      setScore(0);
      setInputValue('');
      setCurrentSpeed(currentLesson.activities.find(a => a.type === 'simulation')?.content?.currentSpeed || 1);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentLesson]);

  const handleNextStage = () => {
    switch (currentStage) {
      case 'intro':
        setCurrentStage('assessment');
        break;
      case 'assessment':
        setCurrentStage('lesson');
        break;
      case 'lesson':
        setCurrentStage('activities');
        break;
      case 'activities':
        if (currentActivityIndex < currentLesson.activities.length - 1) {
          const newIndex = currentActivityIndex + 1;
          setCurrentActivityIndex(newIndex);
          // إعادة تعيين القيم للنشاط الجديد
          setInputValue('');
          const nextActivity = currentLesson.activities[newIndex];
          if (nextActivity?.type === 'simulation') {
            setCurrentSpeed(nextActivity.content?.currentSpeed || 1);
          }
        } else {
          setCurrentStage('evaluation');
        }
        break;
      case 'evaluation':
        handleCompleteLesson();
        break;
    }
  };

  const handlePreviousStage = () => {
    switch (currentStage) {
      case 'assessment':
        setCurrentStage('intro');
        break;
      case 'lesson':
        setCurrentStage('assessment');
        break;
      case 'activities':
        if (currentActivityIndex > 0) {
          const newIndex = currentActivityIndex - 1;
          setCurrentActivityIndex(newIndex);
          // إعادة تعيين القيم للنشاط السابق
          setInputValue('');
          const prevActivity = currentLesson.activities[newIndex];
          if (prevActivity?.type === 'simulation') {
            setCurrentSpeed(prevActivity.content?.currentSpeed || 1);
          }
        } else {
          setCurrentStage('lesson');
        }
        break;
      case 'evaluation':
        setCurrentStage('activities');
        const lastIndex = currentLesson.activities.length - 1;
        setCurrentActivityIndex(lastIndex);
        // إعادة تعيين القيم للنشاط الأخير
        setInputValue('');
        const lastActivity = currentLesson.activities[lastIndex];
        if (lastActivity?.type === 'simulation') {
          setCurrentSpeed(lastActivity.content?.currentSpeed || 1);
        }
        break;
    }
  };

  const handleActivityComplete = (activityId: number, answer: any) => {
    // التحقق من أن النشاط لم يكتمل من قبل لتجنب التكرار
    if (completedActivities.includes(activityId)) {
      return;
    }
    
    setCompletedActivities(prev => {
      const newCompleted = [...prev, activityId];
      // تحديث التقدم باستخدام العدد الجديد
      const newProgress = (newCompleted.length / currentLesson.activities.length) * 100;
      setLessonProgress(Math.min(newProgress, 100)); // التأكد من عدم تجاوز 100%
      return newCompleted;
    });
    
    setUserAnswers(prev => ({ ...prev, [activityId]: answer }));
    setScore(prev => prev + 20);
    
    // إعادة تعيين القيم للنشاط التالي
    setInputValue('');
    const nextActivity = currentLesson.activities[currentActivityIndex + 1];
    if (nextActivity?.type === 'simulation') {
      setCurrentSpeed(nextActivity.content?.currentSpeed || 1);
    }
    
    // الانتقال للنشاط التالي تلقائياً بعد ثانيتين
    setTimeout(() => {
      handleNextStage();
    }, 2000);
  };

  const handleCompleteLesson = () => {
    onComplete(currentLesson.rewards.points, currentLesson.rewards.dinars);
    onClose();
  };

  const renderIntroStage = () => (
    <div className="text-center space-y-6">
      {/* فيديو تشويقي */}
      <div className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-black rounded-xl p-8 text-white overflow-hidden">
        <div className="absolute inset-0 bg-stars opacity-20"></div>
        <div className="relative z-10">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4">🚀 نداء عاجل للمتدرب البطل!</h2>
          <div className="bg-red-600/80 backdrop-blur-sm rounded-lg p-4 mb-4">
            <p className="text-lg leading-relaxed">
              دروع سفينتنا ضعيفة! نحتاج إلى قوة فريق الأبطال الخمسة لشحنها. 
              كل بطل يضيف <span className="text-yellow-300 font-bold text-xl">5 وحدات طاقة</span>.
            </p>
          </div>
          <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <Clock className="w-6 h-6 mb-1 mx-auto" />
              <span className="text-sm">{currentLesson.duration}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <Target className="w-6 h-6 mb-1 mx-auto" />
              <span className="text-sm">{currentLesson.difficulty}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-green-50 rounded-lg p-4">
        <h3 className="font-bold text-green-800 mb-2">أهداف المهمة:</h3>
        <ul className="text-right space-y-1">
          {currentLesson.objectives.map((objective, index) => (
            <li key={index} className="flex items-center text-green-700">
              <CheckCircle className="w-4 h-4 ml-2 text-green-600" />
              {objective}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderAssessmentStage = () => (
    <div className="text-center space-y-6">
      <div className="bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl p-6">
        <div className="w-20 h-20 mx-auto mb-4 bg-cyan-600 rounded-full flex items-center justify-center">
          <Target className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">🤖 روبوت الحماية "زينو"</h2>
        <p className="text-gray-700 mb-6">
          للتأكد من أنك جاهز، أثبت مهارتك في العد! 
          اسحب مجموعة الكريستالات التي تحتوي على <span className="font-bold text-blue-600">5 قطع</span> إلى الماسح الضوئي.
        </p>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[3, 5, 4].map((count, index) => (
            <div 
              key={index}
              className={`p-4 border-2 border-dashed rounded-lg cursor-pointer transition-all hover:scale-105 ${
                count === 5 ? 'border-green-500 bg-green-50 hover:bg-green-100' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => count === 5 && handleNextStage()}
            >
              <div className="flex flex-wrap justify-center gap-1 mb-2">
                {Array.from({ length: count }).map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-blue-500 rounded-full"></div>
                ))}
              </div>
              <p className="text-sm font-medium">{count} كريستالات</p>
            </div>
          ))}
        </div>
        
        <div className="bg-blue-100 rounded-lg p-3">
          <p className="text-blue-800 text-sm">💡 انقر على المجموعة التي تحتوي على 5 كريستالات</p>
        </div>
      </div>
    </div>
  );

  const renderLessonStage = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6">
        <h2 className="text-xl font-bold text-center mb-6">📺 شاشة التحكم ثلاثية الأبعاد</h2>
        
        {/* خطوات الدرس */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold ml-3">1</div>
              <h3 className="font-semibold">الوضع الحالي</h3>
            </div>
            <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold">⚡</div>
              ))}
              <span className="text-lg font-bold">= 3 وحدات طاقة</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold ml-3">2</div>
              <h3 className="font-semibold">وصول فريق الأبطال الخمسة</h3>
            </div>
            <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">🦸</div>
              ))}
              <span className="text-lg font-bold">= +5 وحدات طاقة</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold ml-3">3</div>
              <h3 className="font-semibold">المعادلة</h3>
            </div>
            <div className="text-center text-2xl font-bold text-purple-600">
              3 + 5 = ?
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold ml-3">4</div>
              <h3 className="font-semibold">استراتيجية العد التصاعدي</h3>
            </div>
            <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
              <div className="bg-orange-100 rounded-lg p-2">
                <span className="text-sm">ابدأ من 3</span>
              </div>
              <ArrowRight className="w-4 h-4" />
              {[4, 5, 6, 7, 8].map((num, i) => (
                <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  num === 8 ? 'bg-red-500' : 'bg-orange-400'
                }`}>
                  {num}
                </div>
              ))}
            </div>
            <div className="text-center mt-2 text-xl font-bold text-orange-600">
              إذاً، 3 + 5 = 8! 🎉
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActivity = (activity: LessonActivity) => {
    switch (activity.type) {
      case 'drag-drop':
        return renderDragDropActivity(activity);
      case 'multiple-choice':
        return renderMultipleChoiceActivity(activity);
      case 'input':
        return renderInputActivity(activity);
      case 'matching':
        return renderMatchingActivity(activity);
      case 'simulation':
        return renderSimulationActivity(activity);
      default:
        return <div>نوع النشاط غير مدعوم</div>;
    }
  };

  const renderDragDropActivity = (activity: LessonActivity) => {
    const isCompleted = completedActivities.includes(activity.id);
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
          <p className="text-gray-600">{activity.description}</p>
          {isCompleted && (
            <div className="text-green-600 font-bold mt-2">✅ تم إكمال النشاط!</div>
          )}
        </div>
      
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
        <div className="flex items-center justify-center space-x-8 rtl:space-x-reverse mb-6">
          {/* الشاحن */}
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-200 border-4 border-dashed border-gray-400 rounded-lg flex items-center justify-center mb-2">
              <span className="text-2xl font-bold">{activity.content.baseNumber}</span>
            </div>
            <p className="text-sm text-gray-600">شاحن الطاقة</p>
          </div>
          
          <div className="text-4xl">+</div>
          
          {/* كبسولة الطاقة */}
          <div className="text-center">
            <div 
              className={`w-24 h-24 rounded-lg flex items-center justify-center transition-colors ${
                isCompleted 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-500 cursor-pointer hover:bg-green-600'
              }`}
              onClick={() => !isCompleted && handleActivityComplete(activity.id, activity.content.targetNumber)}
            >
              <span className="text-white text-xl font-bold">+5</span>
            </div>
            <p className="text-sm text-gray-600">كبسولة الأبطال</p>
          </div>
          
          <div className="text-4xl">=</div>
          
          <div className="text-center">
            <div className="w-24 h-24 bg-yellow-100 border-2 border-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-yellow-600">?</span>
            </div>
            <p className="text-sm text-gray-600">النتيجة</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {activity.content.options.map((option: number, index: number) => (
            <button
              key={index}
              onClick={() => !isCompleted && option === activity.content.targetNumber && handleActivityComplete(activity.id, option)}
              disabled={isCompleted}
              className={`p-4 rounded-lg border-2 transition-all ${
                isCompleted 
                  ? 'border-gray-300 bg-gray-100 cursor-not-allowed opacity-50'
                  : option === activity.content.targetNumber 
                    ? 'border-green-500 bg-green-50 hover:bg-green-100 hover:scale-105' 
                    : 'border-gray-300 bg-white hover:bg-gray-50 hover:scale-105'
              }`}
            >
              <span className="text-xl font-bold">{option}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
    );
  };

  const renderMultipleChoiceActivity = (activity: LessonActivity) => {
    const isCompleted = completedActivities.includes(activity.id);
    
    return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
        <p className="text-gray-600">{activity.description}</p>
        {isCompleted && (
          <div className="text-green-600 font-bold mt-2">✅ تم إكمال النشاط!</div>
        )}
      </div>
      
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-red-600 mb-4">
            {activity.content.equation}
          </div>
          <p className="text-gray-700">اختر الكويكب الصحيح لتدميره! 💥</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {activity.content.options.map((option: number, index: number) => (
            <button
              key={index}
              onClick={() => !isCompleted && handleActivityComplete(activity.id, option)}
              disabled={isCompleted}
              className={`relative p-6 rounded-full transition-all transform ${
                isCompleted
                  ? 'bg-gradient-to-br from-gray-300 to-gray-400 cursor-not-allowed opacity-50'
                  : option === activity.content.correct
                    ? 'bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 hover:scale-110'
                    : 'bg-gradient-to-br from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 hover:scale-110'
              } text-white font-bold text-xl shadow-lg`}
            >
              <div className="absolute inset-0 rounded-full bg-white/20"></div>
              <span className="relative z-10">{option}</span>
              <div className="absolute -top-2 -right-2 text-2xl">☄️</div>
            </button>
          ))}
        </div>
      </div>
    </div>
    );
  };

  const renderInputActivity = (activity: LessonActivity) => {
    const isCompleted = completedActivities.includes(activity.id);
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
          <p className="text-gray-600">{activity.description}</p>
          {isCompleted && (
            <div className="text-green-600 font-bold mt-2">✅ تم إكمال النشاط!</div>
          )}
        </div>
        
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse mb-4">
              {Array.from({ length: activity.content.baseNumber }).map((_, i) => (
                <div key={i} className="w-6 h-6 bg-blue-500 rounded-full"></div>
              ))}
              <span className="text-2xl">+</span>
              {Array.from({ length: activity.content.addNumber }).map((_, i) => (
                <div key={i} className="w-6 h-6 bg-green-500 rounded-full"></div>
              ))}
            </div>
            <p className="text-lg text-gray-700">
              الدرع يحتاج إلى رمز التفعيل! أدخل العدد الإجمالي لوحدات الطاقة 🛡️
            </p>
          </div>
          
          <div className="max-w-xs mx-auto">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => !isCompleted && setInputValue(e.target.value)}
              disabled={isCompleted}
              className={`w-full text-center text-2xl font-bold p-4 border-2 rounded-lg focus:outline-none ${
                isCompleted 
                  ? 'border-gray-300 bg-gray-100 cursor-not-allowed opacity-50'
                  : 'border-blue-300 focus:border-blue-500'
              }`}
              placeholder="؟"
            />
            <button
              onClick={() => {
                if (!isCompleted && parseInt(inputValue) === activity.content.correctAnswer) {
                  handleActivityComplete(activity.id, parseInt(inputValue));
                }
              }}
              disabled={isCompleted}
              className={`w-full mt-4 py-3 rounded-lg transition-colors font-bold ${
                isCompleted
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              تفعيل الدرع ⚡
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderMatchingActivity = (activity: LessonActivity) => {
    const isCompleted = completedActivities.includes(activity.id);
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
          <p className="text-gray-600">{activity.description}</p>
          {isCompleted && (
            <div className="text-green-600 font-bold mt-2">✅ تم إكمال النشاط!</div>
          )}
        </div>
      
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold text-center mb-4 text-purple-700">محطات الطاقة</h4>
            <div className="space-y-3">
              {activity.content.pairs.map((pair: any, index: number) => (
                <div key={index} className="bg-purple-200 p-3 rounded-lg text-center font-bold">
                  {pair.left}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-center mb-4 text-pink-700">محطات الاستقبال</h4>
            <div className="space-y-3">
              {activity.content.pairs.map((pair: any, index: number) => (
                <button
                  key={index}
                  onClick={() => !isCompleted && handleActivityComplete(activity.id, 'completed')}
                  disabled={isCompleted}
                  className={`w-full p-3 rounded-lg text-center font-bold transition-colors ${
                    isCompleted
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-50'
                      : 'bg-pink-200 hover:bg-pink-300'
                  }`}
                >
                  {pair.right}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">💡 كل محطة طاقة + 5 = محطة الاستقبال</p>
        </div>
      </div>
    </div>
    );
  };

  const renderSimulationActivity = (activity: LessonActivity) => {
    const isCompleted = completedActivities.includes(activity.id);
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
          <p className="text-gray-600">{activity.description}</p>
          {isCompleted && (
            <div className="text-green-600 font-bold mt-2">✅ تم إكمال النشاط!</div>
          )}
        </div>
        
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
          <div className="text-center mb-6">
            <div className="bg-black rounded-lg p-4 mb-4">
              <div className="text-green-400 font-mono text-xl">
                السرعة الحالية: <span className="text-3xl font-bold">{currentSpeed}</span>
              </div>
              <div className="text-yellow-400 font-mono">
                الهدف: {activity.content.targetSpeed}
              </div>
            </div>
            
            <div className="flex justify-center space-x-4 rtl:space-x-reverse">
              <button
                onClick={() => setCurrentSpeed(prev => prev + 1)}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                دفعة عادية (+1)
              </button>
              <button
                onClick={() => {
                  const newSpeed = currentSpeed + activity.content.boostValue;
                  setCurrentSpeed(newSpeed);
                  if (newSpeed === activity.content.targetSpeed) {
                    setTimeout(() => handleActivityComplete(activity.id, 'completed'), 1000);
                  }
                }}
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-bold"
              >
                دفعة الأبطال (+5) 🚀
              </button>
            </div>
          </div>
          
          {currentSpeed === activity.content.targetSpeed && (
            <div className="text-center text-green-600 font-bold text-xl animate-pulse">
              🎉 ممتاز! وصلت للسرعة المطلوبة!
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderEvaluationStage = () => (
    <div className="text-center space-y-6">
      <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-xl p-6">
        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
          <Trophy className="w-12 h-12 text-white" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🎉 لقد أنقذت الموقف أيها البطل!</h2>
        <p className="text-gray-700 mb-6">
          بقيت 3 كويكبات أخيرة. حل هذه المسائل بسرعة لتدميرها!
        </p>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { equation: '9 + 5', answer: 14 },
            { equation: '4 + 5', answer: 9 },
            { equation: '0 + 5', answer: 5 }
          ].map((problem, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border-2 border-gray-200">
              <div className="text-lg font-bold mb-2">{problem.equation} = ?</div>
              <button
                onClick={() => setScore(prev => prev + 10)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                {problem.answer}
              </button>
            </div>
          ))}
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4 mb-6">
          <h3 className="font-bold text-yellow-800 mb-2">🏆 المكافآت المكتسبة:</h3>
          <div className="flex justify-center space-x-6 rtl:space-x-reverse">
            <div className="text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-1" />
              <span className="font-bold">{currentLesson.rewards.points}</span>
              <p className="text-xs">نقطة</p>
            </div>
            <div className="text-center">
              <Coins className="w-8 h-8 text-yellow-600 mx-auto mb-1" />
              <span className="font-bold">{currentLesson.rewards.dinars}</span>
              <p className="text-xs">دينار معرفي</p>
            </div>
            <div className="text-center">
              <Trophy className="w-8 h-8 text-orange-500 mx-auto mb-1" />
              <span className="font-bold">{currentLesson.rewards.badges.length}</span>
              <p className="text-xs">وسام</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          {currentLesson.rewards.badges.map((badge, index) => (
            <div key={index} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full">
              🏅 {badge}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 transform transition-all">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
                <p className="text-blue-100">{currentLesson.subject} • {currentLesson.duration}</p>
              </div>
              
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                {/* Audio Controls */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>التقدم</span>
                <span>{Math.round(lessonProgress)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-500"
                  style={{ width: `${lessonProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {currentStage === 'intro' && renderIntroStage()}
            {currentStage === 'assessment' && renderAssessmentStage()}
            {currentStage === 'lesson' && renderLessonStage()}
            {currentStage === 'activities' && renderActivity(currentLesson.activities[currentActivityIndex])}
            {currentStage === 'evaluation' && renderEvaluationStage()}
          </div>
          
          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 rounded-b-2xl">
            <div className="flex items-center justify-between">
              <button
                onClick={handlePreviousStage}
                disabled={currentStage === 'intro'}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowRight className="w-4 h-4 ml-1" />
                السابق
              </button>
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                {currentStage === 'activities' && (
                  <span className="text-sm text-gray-500">
                    النشاط {currentActivityIndex + 1} من {currentLesson.activities.length}
                  </span>
                )}
                {showHint && (
                  <button
                    onClick={() => setShowHint(false)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    💡 إخفاء التلميح
                  </button>
                )}
              </div>
              
              <button
                onClick={handleNextStage}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {currentStage === 'evaluation' ? 'إنهاء المهمة' : 'التالي'}
                <ArrowLeft className="w-4 h-4 mr-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonModal;