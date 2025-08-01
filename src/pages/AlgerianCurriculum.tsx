import React, { useState } from 'react';
import { BookOpen, Clock, Users, Award, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
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

const AlgerianCurriculum: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState(algerianCurriculum[0]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const getSubjectStatusIcon = (subject: Subject) => {
    if (subject.isRemoved) return <XCircle className="h-5 w-5 text-red-500" />;
    if (subject.isNew) return <Award className="h-5 w-5 text-green-500" />;
    return <CheckCircle className="h-5 w-5 text-blue-500" />;
  };

  const getSubjectStatusText = (subject: Subject) => {
    if (subject.isRemoved) return 'مادة محذوفة';
    if (subject.isNew) return 'مادة جديدة';
    return 'مادة أساسية';
  };

  const getSubjectStatusColor = (subject: Subject) => {
    if (subject.isRemoved) return 'bg-red-50 border-red-200';
    if (subject.isNew) return 'bg-green-50 border-green-200';
    return 'bg-blue-50 border-blue-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">المنهاج الدراسي للطور الابتدائي في الجزائر</h1>
            <p className="text-xl text-blue-100 mb-2">العام الدراسي {curriculumInfo.academicYear}</p>
            <p className="text-lg text-blue-200">{curriculumInfo.framework}</p>
            <div className="mt-6 bg-blue-800/30 rounded-lg p-4 inline-block">
              <p className="text-sm">وزير التربية الوطنية: {curriculumInfo.minister}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Key Features */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <AlertCircle className="h-6 w-6 text-blue-600 ml-2" />
            أبرز التعديلات والميزات الجديدة
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {curriculumInfo.keyFeatures.map((feature, index) => (
              <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 ml-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Grade Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">اختر السنة الدراسية</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {algerianCurriculum.map((grade) => (
              <button
                key={grade.id}
                onClick={() => setSelectedGrade(grade)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedGrade.id === grade.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-semibold">{grade.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{grade.totalWeeklyHours} ساعة أسبوعياً</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Grade Details */}
        {selectedGrade && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedGrade.name}</h2>
              <p className="text-gray-600 mb-4">{selectedGrade.description}</p>
              
              {/* Grade Statistics */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-700">{selectedGrade.totalWeeklyHours}</div>
                  <div className="text-sm text-gray-600">ساعة أسبوعياً</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-700">{selectedGrade.subjects.length}</div>
                  <div className="text-sm text-gray-600">مادة دراسية</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-700">
                    {selectedGrade.subjects.filter(s => s.isNew).length}
                  </div>
                  <div className="text-sm text-gray-600">مواد جديدة</div>
                </div>
              </div>

              {/* Key Changes */}
              {selectedGrade.keyChanges && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">التعديلات الرئيسية:</h3>
                  <div className="space-y-2">
                    {selectedGrade.keyChanges.map((change, index) => (
                      <div key={index} className="flex items-center p-2 bg-yellow-50 rounded">
                        <AlertCircle className="h-4 w-4 text-yellow-600 ml-2" />
                        <span className="text-gray-700">{change}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Subjects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedGrade.subjects.map((subject) => (
                <div
                  key={subject.id}
                  className={`border-2 rounded-lg p-4 transition-all hover:shadow-md cursor-pointer ${getSubjectStatusColor(subject)}`}
                  onClick={() => setSelectedSubject(subject)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                    {getSubjectStatusIcon(subject)}
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 ml-1" />
                      <span>{subject.weeklyHours}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 ml-1" />
                      <span>{subject.sessions}</span>
                    </div>
                    <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      subject.isRemoved ? 'bg-red-100 text-red-700' :
                      subject.isNew ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {getSubjectStatusText(subject)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subject Details Modal */}
        {selectedSubject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{selectedSubject.name}</h2>
                  <button
                    onClick={() => setSelectedSubject(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Subject Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-2">معلومات المادة</h3>
                      <div className="space-y-2 text-sm">
                        <p><strong>الساعات الأسبوعية:</strong> {selectedSubject.weeklyHours}</p>
                        <p><strong>الحصص:</strong> {selectedSubject.sessions}</p>
                        <p><strong>الحالة:</strong> {getSubjectStatusText(selectedSubject)}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-2">الوصف</h3>
                      <p className="text-sm text-gray-600">{selectedSubject.description}</p>
                    </div>
                  </div>

                  {/* Main Topics */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">المحاور الأساسية</h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {selectedSubject.mainTopics.map((topic, index) => (
                        <div key={index} className="flex items-center p-2 bg-blue-50 rounded">
                          <CheckCircle className="h-4 w-4 text-blue-600 ml-2" />
                          <span className="text-sm">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Target Competencies */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">الكفاءات المستهدفة</h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {selectedSubject.targetCompetencies.map((competency, index) => (
                        <div key={index} className="flex items-center p-2 bg-green-50 rounded">
                          <Award className="h-4 w-4 text-green-600 ml-2" />
                          <span className="text-sm">{competency}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sample Lesson */}
                  {selectedSubject.sampleLesson && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-3">مثال تطبيقي لدرس</h3>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-gray-700">عنوان الدرس:</h4>
                          <p className="text-sm text-gray-600">{selectedSubject.sampleLesson.title}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700">الهدف من الدرس:</h4>
                          <p className="text-sm text-gray-600">{selectedSubject.sampleLesson.objective}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700">نشاط مقترح:</h4>
                          <p className="text-sm text-gray-600">{selectedSubject.sampleLesson.suggestedActivity}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700">تمرين تطبيقي:</h4>
                          <p className="text-sm text-gray-600">{selectedSubject.sampleLesson.practicalExercise}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Digital Transformation Info */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">التحول الرقمي في التعليم</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{curriculumInfo.digitalTransformation.equippedSchools}</div>
              <div className="text-sm opacity-90">مدرسة مجهزة بالألواح الرقمية</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{curriculumInfo.digitalTransformation.newlyEquipped}</div>
              <div className="text-sm opacity-90">مدرسة جديدة مجهزة هذا العام</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{curriculumInfo.physicalEducationIncrease.to}</div>
              <div className="text-sm opacity-90">نسبة الأنشطة الفنية والرياضية</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgerianCurriculum;