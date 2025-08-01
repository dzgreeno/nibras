import React, { useState } from 'react';
import { BookOpen, Clock, Users, Award, AlertCircle, CheckCircle, XCircle, FileText, Target, Lightbulb } from 'lucide-react';
import { algerianCurriculum, curriculumInfo } from '../data/algerianCurriculum';

// Define types for better type safety
interface Subject {
  id: string;
  name: string;
  weeklyHours: string;
  sessions: string;
  description: string;
  mainTopics: string[];
  targetCompetencies: string[];
  isNew?: boolean;
  isRemoved?: boolean;
  sampleLesson?: {
    title: string;
    objective: string;
    suggestedActivity: string;
    practicalExercise: string;
  };
}

interface Grade {
  id: string;
  name: string;
  description: string;
  totalWeeklyHours: number;
  subjects: Subject[];
  keyChanges?: string[];
  removedSubjects?: string[];
  newSubjects?: string[];
}

const DetailedCurriculum: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<Grade>(algerianCurriculum[0] || {
    id: '1',
    name: 'السنة الأولى ابتدائي',
    description: 'لا توجد بيانات متاحة',
    totalWeeklyHours: 0,
    subjects: []
  });
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const getGradeChanges = (gradeId: string) => {
    switch (gradeId) {
      case '1':
      case '2':
        return {
          type: 'major',
          title: 'تعديلات جوهرية',
          description: 'تخفيف العبء الدراسي وسحب مواد',
          color: 'bg-red-50 border-red-200 text-red-800'
        };
      case '3':
        return {
          type: 'addition',
          title: 'إضافة مواد جديدة',
          description: 'إدخال اللغة الفرنسية وعودة المواد العلمية',
          color: 'bg-green-50 border-green-200 text-green-800'
        };
      case '5':
        return {
          type: 'new',
          title: 'مادة جديدة',
          description: 'إدخال اللغة الإنجليزية',
          color: 'bg-blue-50 border-blue-200 text-blue-800'
        };
      default:
        return {
          type: 'normal',
          title: 'بدون تغييرات جوهرية',
          description: 'استمرار المنهاج العادي',
          color: 'bg-gray-50 border-gray-200 text-gray-800'
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">المنهاج الدراسي للطور الابتدائي في الجزائر</h1>
            <h2 className="text-3xl font-semibold mb-4">السنوات الخمس الأولى</h2>
            <p className="text-xl text-blue-100 mb-2">العام الدراسي {curriculumInfo.academicYear}</p>
            <p className="text-lg text-blue-200 mb-6">{curriculumInfo.framework}</p>
            
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <div className="bg-blue-800/30 rounded-lg p-4">
                <h3 className="font-semibold mb-2">الوزير الحالي</h3>
                <p className="text-sm">{curriculumInfo.minister}</p>
              </div>
              <div className="bg-blue-800/30 rounded-lg p-4">
                <h3 className="font-semibold mb-2">إجمالي الساعات الأسبوعية</h3>
                <p className="text-2xl font-bold">{curriculumInfo.totalWeeklyHours} ساعة</p>
                <p className="text-xs">للسنتين الأولى والثانية</p>
              </div>
              <div className="bg-blue-800/30 rounded-lg p-4">
                <h3 className="font-semibold mb-2">عدد السنوات</h3>
                <p className="text-2xl font-bold">{curriculumInfo.totalGrades} سنوات</p>
                <p className="text-xs">الطور الابتدائي</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Framework Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <FileText className="h-8 w-8 text-blue-600 ml-3" />
            الإطار العام للمنهاج الجزائري
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">مرجعية المناهج (الجيل الثاني)</h3>
              <div className="space-y-3 text-gray-700">
                <p>تعتمد المناهج التعليمية الجزائرية على مرجعية <strong>"الجيل الثاني"</strong> والتي تركز على <strong>المقاربة بالكفاءات</strong>.</p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">أهداف المقاربة:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>اكتساب الكفاءات المعرفية والمهارية والوجدانية</li>
                    <li>التركيز على الجوانب التطبيقية والعملية للمعرفة</li>
                    <li>تعزيز التعلم الذاتي والتفكير النقدي</li>
                    <li>تطوير مهارات حل المشكلات</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">التحديات والانتقادات</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-1 ml-2" />
                  <div>
                    <p className="text-sm text-gray-700 mb-2">
                      واجهت مناهج الجيل الثاني انتقادات من الوزير السابق محمد واجعوط بأنها <strong>"مكدسة بالأخطاء"</strong> وتتطلب إعادة قراءة وتصحيح.
                    </p>
                    <p className="text-xs text-gray-600">
                      شملت الانتقادات مناهج الطورين الابتدائي والمتوسط، باستثناء السنة الخامسة ابتدائي والرابعة متوسط.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Changes 2024-2025 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <Target className="h-8 w-8 text-green-600 ml-3" />
            التعديلات الأخيرة على المنهاج (2024-2025)
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {curriculumInfo.keyFeatures.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 ml-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mathematical Games Feature */}
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
              <Lightbulb className="h-6 w-6 ml-2" />
              الألعاب الرياضية - ميزة جديدة
            </h3>
            <p className="text-gray-700 mb-4">{curriculumInfo.specialFeatures.mathematicalGames.description}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">الفوائد:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  {curriculumInfo.specialFeatures.mathematicalGames.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-2">الدليل التعليمي:</h4>
                <p className="text-sm text-gray-600">{curriculumInfo.specialFeatures.mathematicalGames.guide}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Grades Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">نظرة عامة على السنوات الدراسية</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {algerianCurriculum.map((grade) => {
              const changes = getGradeChanges(grade.id);
              return (
                <div
                  key={grade.id}
                  onClick={() => setSelectedGrade(grade)}
                  className={`cursor-pointer p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                    selectedGrade.id === grade.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="text-center">
                    <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-semibold text-gray-800 mb-2">{grade.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{grade.totalWeeklyHours} ساعة أسبوعياً</p>
                    <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${changes.color}`}>
                      {changes.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Grade Details */}
        {selectedGrade && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">{selectedGrade.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{selectedGrade.description}</p>
              
              {/* Grade Statistics */}
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <Clock className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-blue-700">{selectedGrade.totalWeeklyHours}</div>
                  <div className="text-sm text-gray-600">ساعة أسبوعياً</div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg text-center">
                  <BookOpen className="h-10 w-10 text-green-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-green-700">{selectedGrade.subjects.length}</div>
                  <div className="text-sm text-gray-600">مادة دراسية</div>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg text-center">
                  <Award className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-purple-700">
                    {selectedGrade.subjects.filter(s => s.isNew).length}
                  </div>
                  <div className="text-sm text-gray-600">مواد جديدة</div>
                </div>
                <div className="bg-red-50 p-6 rounded-lg text-center">
                  <XCircle className="h-10 w-10 text-red-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-red-700">
                    {selectedGrade.subjects.filter(s => s.isRemoved).length}
                  </div>
                  <div className="text-sm text-gray-600">مواد محذوفة</div>
                </div>
              </div>

              {/* Key Changes */}
              {selectedGrade.keyChanges && (
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">التعديلات الرئيسية:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedGrade.keyChanges.map((change, index) => (
                      <div key={index} className="flex items-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <AlertCircle className="h-5 w-5 text-yellow-600 ml-3 flex-shrink-0" />
                        <span className="text-gray-700">{change}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Subjects Grid */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">المواد الدراسية:</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedGrade.subjects.map((subject) => (
                <div
                  key={subject.id}
                  className={`border-2 rounded-lg p-6 transition-all hover:shadow-lg cursor-pointer ${
                    subject.isRemoved ? 'bg-red-50 border-red-200' :
                    subject.isNew ? 'bg-green-50 border-green-200' :
                    'bg-blue-50 border-blue-200'
                  }`}
                  onClick={() => setSelectedSubject(subject)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-lg text-gray-800">{subject.name}</h4>
                    {subject.isRemoved ? <XCircle className="h-6 w-6 text-red-500" /> :
                     subject.isNew ? <Award className="h-6 w-6 text-green-500" /> :
                     <CheckCircle className="h-6 w-6 text-blue-500" />}
                  </div>
                  
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 ml-2" />
                      <span>{subject.weeklyHours}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 ml-2" />
                      <span>{subject.sessions}</span>
                    </div>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      subject.isRemoved ? 'bg-red-100 text-red-700' :
                      subject.isNew ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {subject.isRemoved ? 'مادة محذوفة' :
                       subject.isNew ? 'مادة جديدة' :
                       'مادة أساسية'}
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-3 line-clamp-2">{subject.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Digital Transformation */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6">التحول الرقمي في التعليم الابتدائي</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{curriculumInfo.digitalTransformation.equippedSchools}</div>
              <div className="text-lg opacity-90">مدرسة مجهزة بالألواح الرقمية</div>
              <div className="text-sm opacity-75 mt-1">إجمالي على مستوى الوطن</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{curriculumInfo.digitalTransformation.newlyEquipped}</div>
              <div className="text-lg opacity-90">مدرسة جديدة مجهزة</div>
              <div className="text-sm opacity-75 mt-1">خلال العام الدراسي 2024-2025</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{curriculumInfo.physicalEducationIncrease.to}</div>
              <div className="text-lg opacity-90">نسبة الأنشطة الفنية والرياضية</div>
              <div className="text-sm opacity-75 mt-1">ارتفعت من {curriculumInfo.physicalEducationIncrease.from}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Details Modal */}
      {selectedSubject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800">{selectedSubject.name}</h2>
                <button
                  onClick={() => setSelectedSubject(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-8">
                {/* Subject Status */}
                <div className={`p-4 rounded-lg ${
                  selectedSubject.isRemoved ? 'bg-red-50 border border-red-200' :
                  selectedSubject.isNew ? 'bg-green-50 border border-green-200' :
                  'bg-blue-50 border border-blue-200'
                }`}>
                  <div className="flex items-center">
                    {selectedSubject.isRemoved ? <XCircle className="h-6 w-6 text-red-500 ml-2" /> :
                     selectedSubject.isNew ? <Award className="h-6 w-6 text-green-500 ml-2" /> :
                     <CheckCircle className="h-6 w-6 text-blue-500 ml-2" />}
                    <span className="font-semibold text-lg">
                      {selectedSubject.isRemoved ? 'مادة محذوفة من المنهاج 2024-2025' :
                       selectedSubject.isNew ? 'مادة جديدة في المنهاج 2024-2025' :
                       'مادة أساسية في المنهاج'}
                    </span>
                  </div>
                </div>

                {/* Subject Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-bold text-xl text-gray-800 mb-4">معلومات المادة</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-gray-600 ml-2" />
                        <span><strong>الساعات الأسبوعية:</strong> {selectedSubject.weeklyHours}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-gray-600 ml-2" />
                        <span><strong>الحصص:</strong> {selectedSubject.sessions}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-bold text-xl text-gray-800 mb-4">الوصف</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedSubject.description}</p>
                  </div>
                </div>

                {/* Main Topics */}
                <div>
                  <h3 className="font-bold text-xl text-gray-800 mb-4">المحاور الأساسية</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedSubject.mainTopics.map((topic, index) => (
                      <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-blue-600 ml-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Target Competencies */}
                <div>
                  <h3 className="font-bold text-xl text-gray-800 mb-4">الكفاءات المستهدفة</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedSubject.targetCompetencies.map((competency, index) => (
                      <div key={index} className="flex items-start p-3 bg-green-50 rounded-lg">
                        <Target className="h-5 w-5 text-green-600 ml-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{competency}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Lesson */}
                {selectedSubject.sampleLesson && (
                  <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                    <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center">
                      <Lightbulb className="h-6 w-6 text-yellow-600 ml-2" />
                      مثال تطبيقي لدرس
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">عنوان الدرس:</h4>
                        <p className="text-gray-700 bg-white p-3 rounded">{selectedSubject.sampleLesson.title}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">الهدف من الدرس:</h4>
                        <p className="text-gray-700 bg-white p-3 rounded">{selectedSubject.sampleLesson.objective}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">نشاط مقترح:</h4>
                        <p className="text-gray-700 bg-white p-3 rounded">{selectedSubject.sampleLesson.suggestedActivity}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">تمرين تطبيقي:</h4>
                        <p className="text-gray-700 bg-white p-3 rounded">{selectedSubject.sampleLesson.practicalExercise}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedCurriculum;