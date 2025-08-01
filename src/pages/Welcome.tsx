import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, ArrowRight, User, BookOpen, Trophy, Settings } from 'lucide-react';

interface WelcomeProps {
  userType?: 'student' | 'teacher' | 'parent' | 'admin';
  userName?: string;
}

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  
  // استخراج البيانات من state أو query parameters
  const { userType = 'student', userName = 'المستخدم الجديد' } = location.state || {};

  const getWelcomeSteps = () => {
    switch (userType) {
      case 'student':
        return [
          {
            icon: <User className="w-8 h-8 text-blue-500" />,
            title: 'أكمل ملفك الشخصي',
            description: 'أضف صورتك الشخصية ومعلوماتك الأساسية',
            action: () => navigate('/student-profile')
          },
          {
            icon: <BookOpen className="w-8 h-8 text-green-500" />,
            title: 'استكشف المواد الدراسية',
            description: 'تصفح المواد المتاحة وابدأ رحلتك التعليمية',
            action: () => navigate('/student-subjects')
          },
          {
            icon: <Trophy className="w-8 h-8 text-yellow-500" />,
            title: 'اكتشف نظام النقاط',
            description: 'تعلم كيفية كسب النقاط والدنانير المعرفية',
            action: () => navigate('/student-points')
          }
        ];
      
      case 'teacher':
        return [
          {
            icon: <User className="w-8 h-8 text-blue-500" />,
            title: 'أكمل ملفك الشخصي',
            description: 'أضف معلوماتك المهنية وتخصصك',
            action: () => navigate('/teacher-settings')
          },
          {
            icon: <BookOpen className="w-8 h-8 text-green-500" />,
            title: 'إدارة الفصول',
            description: 'تعرف على أدوات إدارة الفصول والطلاب',
            action: () => navigate('/teacher-classroom')
          },
          {
            icon: <Settings className="w-8 h-8 text-purple-500" />,
            title: 'مكتبة المحتوى',
            description: 'استكشف الموارد التعليمية المتاحة',
            action: () => navigate('/teacher-content-library')
          }
        ];
      
      case 'parent':
        return [
          {
            icon: <User className="w-8 h-8 text-blue-500" />,
            title: 'أكمل ملفك الشخصي',
            description: 'أضف معلومات الاتصال وبيانات الأطفال',
            action: () => navigate('/parent-settings')
          },
          {
            icon: <BookOpen className="w-8 h-8 text-green-500" />,
            title: 'متابعة تقدم الطفل',
            description: 'تعرف على كيفية متابعة أداء طفلك الأكاديمي',
            action: () => navigate('/parent-child-progress')
          },
          {
            icon: <Settings className="w-8 h-8 text-purple-500" />,
            title: 'التواصل مع المعلمين',
            description: 'تعلم كيفية التواصل مع معلمي طفلك',
            action: () => navigate('/parent-messages')
          }
        ];
      
      default:
        return [
          {
            icon: <User className="w-8 h-8 text-blue-500" />,
            title: 'أكمل ملفك الشخصي',
            description: 'أضف معلوماتك الشخصية',
            action: () => navigate('/school-admin-settings')
          },
          {
            icon: <BookOpen className="w-8 h-8 text-green-500" />,
            title: 'استكشف لوحة التحكم',
            description: 'تعرف على أدوات الإدارة المتاحة',
            action: () => navigate('/school-admin-dashboard')
          }
        ];
    }
  };

  const steps = getWelcomeSteps();

  const getDashboardRoute = () => {
    switch (userType) {
      case 'student': return '/student-dashboard';
      case 'teacher': return '/teacher-dashboard';
      case 'parent': return '/parent-dashboard';
      default: return '/school-admin-dashboard';
    }
  };

  const handleSkipToMain = () => {
    navigate(getDashboardRoute());
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSkipToMain();
    }
  };

  useEffect(() => {
    // Auto-advance steps every 3 seconds if user doesn't interact
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentStep, steps.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🎉 مرحباً بك في منصة نبراس الجزائر!
          </h1>
          <p className="text-xl text-gray-600">
            أهلاً وسهلاً {userName}، تم إنشاء حسابك بنجاح
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex justify-between items-center mb-8">
            {steps.map((_, index) => (
              <div key={index} className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                  ${index <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}
                `}>
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    w-16 h-1 mx-2
                    ${index < currentStep ? 'bg-blue-500' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            ))}
          </div>

          {/* Current Step Content */}
          <div className="text-center">
            <div className="mb-4">
              {steps[currentStep].icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h3>
            <p className="text-gray-600 mb-6">
              {steps[currentStep].description}
            </p>
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={steps[currentStep].action}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                ابدأ الآن
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={handleNextStep}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {currentStep < steps.length - 1 ? 'التالي' : 'انتهيت'}
              </button>
            </div>
          </div>
        </div>

        {/* Skip Button */}
        <div className="text-center">
          <button
            onClick={handleSkipToMain}
            className="text-gray-500 hover:text-gray-700 underline transition-colors"
          >
            تخطي والانتقال إلى لوحة التحكم
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;