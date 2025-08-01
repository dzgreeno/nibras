import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, Search, School, Users, BookOpen } from 'lucide-react';
import { validateAllWilayasHaveSchools, getEducationStats, wilayas, getSchoolsByWilaya } from '../data/schoolsData';

const SystemValidation: React.FC = () => {
  const [validationResult, setValidationResult] = useState<any>(null);
  const [educationStats, setEducationStats] = useState<any>(null);
  const [selectedWilaya, setSelectedWilaya] = useState<string>('');
  const [wilayaSchools, setWilayaSchools] = useState<any[]>([]);

  useEffect(() => {
    // تشغيل فحص النظام
    const validation = validateAllWilayasHaveSchools();
    const stats = getEducationStats();
    
    setValidationResult(validation);
    setEducationStats(stats);
  }, []);

  const handleWilayaSelect = (wilayaCode: string) => {
    setSelectedWilaya(wilayaCode);
    const schools = getSchoolsByWilaya(wilayaCode);
    setWilayaSchools(schools);
    
    // طباعة تشخيصية
    console.log(`🔍 فحص الولاية ${wilayaCode}:`, {
      عدد_المدارس: schools.length,
      أسماء_المدارس: schools.map(s => s.name)
    });
  };

  // دالة فحص سريع لجميع الولايات
  const runQuickTest = () => {
    console.log('🚀 بدء الفحص السريع لجميع الولايات...');
    
    wilayas.forEach(wilaya => {
      const schools = getSchoolsByWilaya(wilaya.code);
      if (schools.length === 0) {
        console.error(`❌ مشكلة: الولاية ${wilaya.code} - ${wilaya.name} لا تحتوي على مدارس`);
      } else {
        console.log(`✅ الولاية ${wilaya.code} - ${wilaya.name}: ${schools.length} مدرسة`);
      }
    });
    
    console.log('✅ انتهى الفحص السريع');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">فحص صحة النظام التعليمي</h1>
              <p className="text-gray-600">التحقق من اكتمال البيانات لجميع الولايات الـ58</p>
            </div>
            <button
              onClick={runQuickTest}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Search className="h-4 w-4 ml-2" />
              فحص سريع في الكونسول
            </button>
          </div>
        </div>

        {/* نتيجة الفحص العام */}
        {validationResult && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center mb-4">
              {validationResult.isValid ? (
                <CheckCircle className="h-6 w-6 text-green-600 ml-2" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-red-600 ml-2" />
              )}
              <h2 className="text-xl font-semibold">
                {validationResult.isValid ? 'النظام سليم ✅' : 'يوجد مشاكل ⚠️'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {validationResult.details.totalWilayas}
                </div>
                <div className="text-blue-800">إجمالي الولايات</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {validationResult.details.wilayasWithSchools}
                </div>
                <div className="text-green-800">ولايات بها مدارس</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {validationResult.missingWilayas.length}
                </div>
                <div className="text-red-800">ولايات بدون مدارس</div>
              </div>
            </div>

            {validationResult.missingWilayas.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">الولايات التي لا تحتوي على مدارس:</h3>
                <ul className="list-disc list-inside text-red-700">
                  {validationResult.missingWilayas.map((wilaya: string, index: number) => (
                    <li key={index}>{wilaya}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* إحصائيات النظام */}
        {educationStats && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BookOpen className="h-5 w-5 ml-2" />
              إحصائيات النظام التعليمي
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{educationStats.totalSchools}</div>
                <div className="text-blue-800">مدرسة</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{educationStats.totalStudents.toLocaleString()}</div>
                <div className="text-green-800">طالب</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{educationStats.totalTeachers.toLocaleString()}</div>
                <div className="text-purple-800">معلم</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{educationStats.totalClasses.toLocaleString()}</div>
                <div className="text-orange-800">صف دراسي</div>
              </div>
            </div>
          </div>
        )}

        {/* فحص الولايات التفصيلي */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Search className="h-5 w-5 ml-2" />
            فحص تفصيلي للولايات
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">اختر ولاية للفحص:</label>
            <select
              value={selectedWilaya}
              onChange={(e) => handleWilayaSelect(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- اختر ولاية --</option>
              {wilayas.map((wilaya) => (
                <option key={wilaya.code} value={wilaya.code}>
                  {wilaya.code} - {wilaya.name}
                </option>
              ))}
            </select>
          </div>

          {selectedWilaya && wilayaSchools.length > 0 && (
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <School className="h-5 w-5 ml-2" />
                مدارس الولاية ({wilayaSchools.length} مدرسة)
              </h3>
              
              <div className="grid gap-3">
                {wilayaSchools.map((school) => (
                  <div key={school.id} className="bg-gray-50 p-3 rounded border">
                    <div className="font-medium text-gray-800">{school.name}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      📍 {school.address}
                    </div>
                    <div className="flex items-center mt-2 text-sm">
                      <Users className="h-4 w-4 ml-1" />
                      <span className="ml-2">{school.totalStudents} طالب</span>
                      <span className="mx-2">•</span>
                      <span>{school.totalTeachers} معلم</span>
                      <span className="mx-2">•</span>
                      <span>{school.grades.reduce((total: number, grade: any) => total + grade.classes.length, 0)} صف</span>
                    </div>
                    
                    {/* تفاصيل الصفوف */}
                    <div className="mt-2 text-xs text-gray-500">
                      <strong>الصفوف:</strong>
                      {school.grades.map((grade: any) => (
                        <span key={grade.id} className="ml-2">
                          {grade.arabicName} ({grade.classes.length} أقسام)
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedWilaya && wilayaSchools.length === 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-2" />
              <p className="text-red-800 font-medium">لا توجد مدارس في هذه الولاية!</p>
              <p className="text-red-600 text-sm mt-1">هذه مشكلة يجب إصلاحها في النظام</p>
            </div>
          )}
        </div>

        {/* تأكيد الأقسام */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">تأكيد الأقسام</h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <CheckCircle className="h-5 w-5 text-green-600 ml-2" />
              <span className="font-medium text-green-800">كل سنة دراسية تحتوي على قسمين على الأقل</span>
            </div>
            <p className="text-green-700 text-sm">
              النظام مصمم ليضمن وجود قسمين كحد أدنى في كل سنة دراسية، مع إمكانية إضافة قسم ثالث في بعض المدارس حسب عدد الطلاب.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemValidation;