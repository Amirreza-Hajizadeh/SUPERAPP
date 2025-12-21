
import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  Info, 
  Search,
  Filter,
  LayoutGrid,
  List
} from 'lucide-react';

interface CourseSection {
  id: string;
  code: string;
  title: string;
  section: string; // گروه درسی
  units: number;
  prof: string;
  days: string[]; // ['Saturday', 'Monday']
  startTime: string; // "08:00"
  endTime: string; // "10:00"
  examDate: string; // "1402/10/20"
  examTime: string; // "08:00"
  capacity: number;
  enrolled: number;
  type: 'General' | 'Basic' | 'Specialized';
  sex: 'Male' | 'Female' | 'Both';
}

const CourseSelection: React.FC = () => {
  const [selectedCourses, setSelectedCourses] = useState<CourseSection[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'list' | 'schedule'>('list');
  const [filterType, setFilterType] = useState('All');

  // --- MOCK DATA: Course Database ---
  const courses: CourseSection[] = useMemo(() => [
    // Specialized (Computer)
    { id: '101-01', code: 'CE101', title: 'ساختمان داده', section: '01', units: 3, prof: 'دکتر قدسی', days: ['شنبه', 'دوشنبه'], startTime: '08:00', endTime: '10:00', examDate: '1402/10/20', examTime: '08:00', capacity: 40, enrolled: 35, type: 'Specialized', sex: 'Both' },
    { id: '101-02', code: 'CE101', title: 'ساختمان داده', section: '02', units: 3, prof: 'دکتر ربیعی', days: ['یک‌شنبه', 'سه‌شنبه'], startTime: '14:00', endTime: '16:00', examDate: '1402/10/20', examTime: '08:00', capacity: 40, enrolled: 12, type: 'Specialized', sex: 'Both' },
    
    { id: '102-01', code: 'CE102', title: 'طراحی الگوریتم', section: '01', units: 3, prof: 'دکتر آبام', days: ['شنبه', 'دوشنبه'], startTime: '10:00', endTime: '12:00', examDate: '1402/10/22', examTime: '14:00', capacity: 35, enrolled: 30, type: 'Specialized', sex: 'Both' },
    
    { id: '103-01', code: 'CE103', title: 'هوش مصنوعی', section: '01', units: 3, prof: 'دکتر سلیمانی', days: ['یک‌شنبه', 'سه‌شنبه'], startTime: '08:00', endTime: '10:00', examDate: '1402/10/25', examTime: '10:00', capacity: 50, enrolled: 45, type: 'Specialized', sex: 'Both' },
    
    // Basic
    { id: '201-01', code: 'MATH1', title: 'ریاضی عمومی ۱', section: '01', units: 3, prof: 'دکتر فتوحی', days: ['شنبه', 'چهارشنبه'], startTime: '08:00', endTime: '10:00', examDate: '1402/10/18', examTime: '09:00', capacity: 60, enrolled: 55, type: 'Basic', sex: 'Both' },
    { id: '201-02', code: 'MATH1', title: 'ریاضی عمومی ۱', section: '02', units: 3, prof: 'دکتر نجفی', days: ['یک‌شنبه', 'سه‌شنبه'], startTime: '10:00', endTime: '12:00', examDate: '1402/10/18', examTime: '09:00', capacity: 60, enrolled: 20, type: 'Basic', sex: 'Both' },
    
    { id: '202-01', code: 'PHYS1', title: 'فیزیک ۱', section: '01', units: 3, prof: 'دکتر مشفق', days: ['شنبه', 'دوشنبه'], startTime: '14:00', endTime: '16:00', examDate: '1402/10/28', examTime: '14:00', capacity: 45, enrolled: 40, type: 'Basic', sex: 'Both' },

    // General
    { id: '301-01', code: 'GEN01', title: 'ادبیات فارسی', section: '01', units: 3, prof: 'استاد قاسمی', days: ['چهارشنبه'], startTime: '14:00', endTime: '17:00', examDate: '1402/10/30', examTime: '10:00', capacity: 30, enrolled: 28, type: 'General', sex: 'Both' },
    { id: '302-01', code: 'GEN02', title: 'اندیشه اسلامی ۱', section: '01', units: 2, prof: 'حاج آقا موسوی', days: ['دوشنبه'], startTime: '10:00', endTime: '12:00', examDate: '1402/10/19', examTime: '16:00', capacity: 40, enrolled: 15, type: 'General', sex: 'Male' },
    { id: '303-01', code: 'GEN03', title: 'تربیت بدنی', section: '01', units: 1, prof: 'استاد ورزشکار', days: ['سه‌شنبه'], startTime: '16:00', endTime: '18:00', examDate: '-', examTime: '-', capacity: 20, enrolled: 5, type: 'General', sex: 'Male' },
  ], []);

  // --- LOGIC: Conflict Detection ---
  const checkConflict = (course: CourseSection) => {
    for (const selected of selectedCourses) {
        // 1. Check Duplicate Course Code
        if (selected.code === course.code) {
            return { hasConflict: true, type: 'DUPLICATE', message: `درس ${selected.title} قبلاً اخذ شده است.` };
        }

        // 2. Check Exam Time Conflict
        if (selected.examDate === course.examDate && selected.examTime === course.examTime && course.examDate !== '-') {
            return { hasConflict: true, type: 'EXAM', message: `تداخل امتحان با درس ${selected.title} (${selected.examDate})` };
        }

        // 3. Check Class Time Conflict
        // Convert times to minutes for comparison
        const parseTime = (t: string) => parseInt(t.split(':')[0]) * 60 + parseInt(t.split(':')[1]);
        const startA = parseTime(course.startTime);
        const endA = parseTime(course.endTime);
        const startB = parseTime(selected.startTime);
        const endB = parseTime(selected.endTime);

        // Check if days overlap
        const commonDays = course.days.filter(d => selected.days.includes(d));
        if (commonDays.length > 0) {
            // Check time overlap: (StartA < EndB) and (EndA > StartB)
            if (startA < endB && endA > startB) {
                return { hasConflict: true, type: 'CLASS', message: `تداخل کلاسی با ${selected.title} در روز ${commonDays.join(' و ')}` };
            }
        }
    }
    return { hasConflict: false, type: null, message: '' };
  };

  const handleAddCourse = (course: CourseSection) => {
      const conflict = checkConflict(course);
      if (conflict.hasConflict) {
          alert(`خطا: ${conflict.message}`);
          return;
      }
      
      const totalUnits = selectedCourses.reduce((sum, c) => sum + c.units, 0);
      if (totalUnits + course.units > 20) { // Max units rule
          alert('خطا: سقف واحد مجاز (۲۰ واحد) پر شده است.');
          return;
      }

      setSelectedCourses([...selectedCourses, course]);
  };

  const handleRemoveCourse = (id: string) => {
      setSelectedCourses(selectedCourses.filter(c => c.id !== id));
  };

  // --- RENDERING HELPERS ---
  const totalUnits = selectedCourses.reduce((sum, c) => sum + c.units, 0);
  
  const filteredAvailableCourses = courses.filter(c => 
      (filterType === 'All' || c.type === filterType) &&
      (c.title.includes(searchTerm) || c.prof.includes(searchTerm) || c.code.includes(searchTerm))
  );

  const daysOfWeek = ['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه'];
  const timeSlots = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];

  return (
    <div className="space-y-6 animate-in fade-in pb-20">
      {/* Header Stat Bar */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-20">
          <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
                  <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                  <h1 className="text-xl font-black text-slate-800">سامانه انتخاب واحد</h1>
                  <p className="text-sm text-slate-500">نیمسال دوم ۱۴۰۲-۱۴۰۳</p>
              </div>
          </div>
          
          <div className="flex items-center gap-6">
              <div className="text-center">
                  <span className="block text-xs text-slate-400 font-bold mb-1">واحد اخذ شده</span>
                  <span className={`text-2xl font-black ${totalUnits > 12 ? 'text-emerald-600' : 'text-amber-500'}`}>{totalUnits} <span className="text-sm text-slate-400 font-medium">/ ۲۰</span></span>
              </div>
              <div className="h-10 w-px bg-slate-200 hidden md:block"></div>
              <div className="text-center hidden md:block">
                  <span className="block text-xs text-slate-400 font-bold mb-1">وضعیت ترم</span>
                  <span className="text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">ثبت‌نام عادی</span>
              </div>
          </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: SELECTED COURSES (Cart) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-slate-100 h-full flex flex-col">
                  <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-4">
                      <h3 className="font-bold text-slate-800 flex items-center gap-2">
                          <List className="w-5 h-5 text-emerald-500" />
                          دروس انتخاب شده
                      </h3>
                      <button 
                        onClick={() => setActiveTab(activeTab === 'list' ? 'schedule' : 'list')}
                        className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-lg font-bold hover:bg-slate-200 transition-colors"
                      >
                          {activeTab === 'list' ? 'نمایش برنامه هفتگی' : 'نمایش لیست'}
                      </button>
                  </div>

                  {activeTab === 'list' ? (
                      <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px] custom-scrollbar pr-1">
                          {selectedCourses.length === 0 ? (
                              <div className="text-center py-10 text-slate-400">
                                  <Info className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                  <p>هنوز درسی انتخاب نکرده‌اید.</p>
                              </div>
                          ) : (
                              selectedCourses.map(course => (
                                  <div key={course.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 relative group transition-all hover:border-emerald-300 hover:shadow-md">
                                      <button 
                                          onClick={() => handleRemoveCourse(course.id)}
                                          className="absolute top-2 left-2 text-slate-400 hover:text-red-500 transition-colors"
                                      >
                                          <Trash2 className="w-4 h-4" />
                                      </button>
                                      
                                      <h4 className="font-bold text-slate-800 text-sm mb-1">{course.title} <span className="text-xs font-normal text-slate-500">({course.units} واحد)</span></h4>
                                      <div className="text-xs text-slate-500 space-y-1">
                                          <div className="flex items-center gap-1"><User className="w-3 h-3"/> {course.prof}</div>
                                          <div className="flex items-center gap-1"><Clock className="w-3 h-3"/> {course.days.join('، ')} {course.startTime}-{course.endTime}</div>
                                          <div className="flex items-center gap-1 text-amber-600"><AlertTriangle className="w-3 h-3"/> امتحان: {course.examDate}</div>
                                      </div>
                                  </div>
                              ))
                          )}
                      </div>
                  ) : (
                      // Mini Weekly Schedule View
                      <div className="overflow-x-auto pb-2">
                          <div className="min-w-[300px]">
                              {daysOfWeek.map(day => {
                                  const dayCourses = selectedCourses.filter(c => c.days.includes(day)).sort((a,b) => a.startTime.localeCompare(b.startTime));
                                  if (dayCourses.length === 0) return null;
                                  return (
                                      <div key={day} className="mb-3">
                                          <div className="text-xs font-bold text-slate-400 mb-1">{day}</div>
                                          <div className="flex gap-2">
                                              {dayCourses.map(c => (
                                                  <div key={c.id} className="bg-emerald-100 border border-emerald-200 p-2 rounded-lg text-[10px] text-emerald-800 flex-1">
                                                      <div className="font-bold truncate">{c.title}</div>
                                                      <div>{c.startTime}-{c.endTime}</div>
                                                  </div>
                                              ))}
                                          </div>
                                      </div>
                                  )
                              })}
                              {selectedCourses.length === 0 && <div className="text-center text-xs text-slate-400 py-10">برنامه خالی است</div>}
                          </div>
                      </div>
                  )}
                  
                  <div className="mt-4 pt-4 border-t border-slate-100">
                      <button className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-transform active:scale-95 flex items-center justify-center gap-2">
                          <CheckCircle2 className="w-5 h-5" />
                          ثبت نهایی دروس
                      </button>
                  </div>
              </div>
          </div>

          {/* RIGHT: AVAILABLE COURSES */}
          <div className="lg:col-span-8 space-y-6">
              {/* Filters */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                          type="text" 
                          placeholder="جستجو (نام درس، استاد، کد)..." 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pr-10 pl-4 py-3 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
                      />
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
                      {['All', 'Specialized', 'Basic', 'General'].map(type => (
                          <button
                              key={type}
                              onClick={() => setFilterType(type)}
                              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
                                  filterType === type 
                                  ? 'bg-indigo-600 text-white' 
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                          >
                              {type === 'All' ? 'همه' : type === 'Specialized' ? 'تخصصی' : type === 'Basic' ? 'پایه' : 'عمومی'}
                          </button>
                      ))}
                  </div>
              </div>

              {/* Course List */}
              <div className="space-y-4">
                  {filteredAvailableCourses.map(course => {
                      const conflict = checkConflict(course);
                      const isFull = course.enrolled >= course.capacity;
                      const isTaken = selectedCourses.some(c => c.id === course.id);

                      return (
                          <div key={course.id} className={`bg-white p-5 rounded-3xl border transition-all relative ${
                              isTaken ? 'border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50/30' : 
                              conflict.hasConflict ? 'border-red-200 opacity-90' : 'border-slate-100 hover:border-indigo-300 hover:shadow-md'
                          }`}>
                              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                  <div className="flex-1">
                                      <div className="flex items-center gap-3 mb-2">
                                          <h4 className="font-black text-lg text-slate-800">{course.title}</h4>
                                          <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">{course.code}-{course.section}</span>
                                          <span className={`text-[10px] px-2 py-1 rounded-full ${course.type === 'Specialized' ? 'bg-purple-100 text-purple-700' : course.type === 'Basic' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                                              {course.type === 'Specialized' ? 'تخصصی' : course.type === 'Basic' ? 'پایه' : 'عمومی'}
                                          </span>
                                      </div>
                                      
                                      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-6 text-sm text-slate-600">
                                          <div className="flex items-center gap-1"><User className="w-4 h-4 text-slate-400"/> {course.prof}</div>
                                          <div className="flex items-center gap-1"><BookOpen className="w-4 h-4 text-slate-400"/> {course.units} واحد</div>
                                          <div className="flex items-center gap-1 col-span-2 md:col-span-1"><Clock className="w-4 h-4 text-slate-400"/> {course.days.join('، ')} {course.startTime}-{course.endTime}</div>
                                          <div className="flex items-center gap-1 col-span-2 md:col-span-1"><Calendar className="w-4 h-4 text-slate-400"/> امتحان: {course.examDate}</div>
                                      </div>
                                  </div>

                                  <div className="flex flex-col items-end gap-3 min-w-[120px]">
                                      {/* Capacity Bar */}
                                      <div className="w-full text-right">
                                          <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                                              <span>ظرفیت: {course.capacity}</span>
                                              <span>ثبت‌نام: {course.enrolled}</span>
                                          </div>
                                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                              <div 
                                                  className={`h-full rounded-full ${isFull ? 'bg-red-500' : 'bg-emerald-500'}`} 
                                                  style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                                              ></div>
                                          </div>
                                      </div>

                                      {/* Action Button */}
                                      {isTaken ? (
                                          <button 
                                              onClick={() => handleRemoveCourse(course.id)}
                                              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl font-bold text-sm hover:bg-red-100 transition-colors w-full justify-center"
                                          >
                                              <Trash2 className="w-4 h-4" /> حذف
                                          </button>
                                      ) : (
                                          <button 
                                              onClick={() => handleAddCourse(course)}
                                              disabled={isFull || conflict.hasConflict}
                                              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-colors w-full justify-center ${
                                                  isFull 
                                                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                                  : conflict.hasConflict 
                                                      ? 'bg-red-50 text-red-400 cursor-not-allowed' 
                                                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
                                              }`}
                                          >
                                              {isFull ? 'تکمیل' : conflict.hasConflict ? 'تداخل' : <><Plus className="w-4 h-4" /> اخذ درس</>}
                                          </button>
                                      )}
                                  </div>
                              </div>
                              
                              {/* Conflict Message */}
                              {!isTaken && conflict.hasConflict && (
                                  <div className="mt-3 p-2 bg-red-50 rounded-lg text-xs text-red-600 flex items-center gap-2 font-medium">
                                      <AlertTriangle className="w-4 h-4 shrink-0" />
                                      {conflict.message}
                                  </div>
                              )}
                          </div>
                      );
                  })}
                  {filteredAvailableCourses.length === 0 && (
                      <div className="text-center py-12 text-slate-400">
                          <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
                          <p>درسی با این مشخصات یافت نشد.</p>
                      </div>
                  )}
              </div>
          </div>
      </div>
    </div>
  );
};

export default CourseSelection;
