
import React, { useState, useMemo } from 'react';
import { FileText, Search, Download, BookOpen, Filter, Archive, CheckCircle, Award } from 'lucide-react';

const QuestionBank: React.FC = () => {
  const [selectedMajor, setSelectedMajor] = useState('All');
  const [selectedTerm, setSelectedTerm] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const majors = [
    { id: 'All', label: 'همه رشته‌ها' },
    { id: 'Computer', label: 'مهندسی کامپیوتر' },
    { id: 'Electrical', label: 'مهندسی برق' },
    { id: 'Mechanical', label: 'مهندسی مکانیک' },
    { id: 'Civil', label: 'مهندسی عمران' },
    { id: 'Industrial', label: 'مهندسی صنایع' },
    { id: 'Chemical', label: 'مهندسی شیمی' },
    { id: 'General', label: 'دروس عمومی' },
  ];

  const terms = ['All', '1', '2', '3', '4', '5', '6', '7', '8'];
  const types = [
      { id: 'All', label: 'همه' },
      { id: 'Midterm', label: 'میان‌ترم' },
      { id: 'Final', label: 'پایان‌ترم' },
      { id: 'Quiz', label: 'کوییز' },
      { id: 'Note', label: 'جزوه' },
      { id: 'Olympiad', label: 'المپیاد' },
      { id: 'Konkur', label: 'کنکور ارشد/دکترا' }
  ];

  // Generate 500+ Mock Questions
  const questions = useMemo(() => {
      const generated = [];
      const typeLabels = {
          'Midterm': 'میان‌ترم',
          'Final': 'پایان‌ترم',
          'Quiz': 'کوییز',
          'Note': 'جزوه دست‌نویس',
          'Olympiad': 'سوالات المپیاد',
          'Konkur': 'تست‌های کنکور'
      };
      const typeKeys = Object.keys(typeLabels);
      const profs = ['دکتر رضایی', 'دکتر محمدی', 'دکتر جلالی', 'دکتر کاظمی', 'دکتر شریفی', 'استاد نوری', 'سازمان سنجش'];
      const courses: any = {
          Computer: ['ساختمان داده', 'طراحی الگوریتم', 'هوش مصنوعی', 'شبکه', 'سیستم عامل', 'پایگاه داده', 'مهندسی نرم‌افزار'],
          Electrical: ['مدار ۱', 'مدار ۲', 'الکترونیک', 'سیگنال', 'مخابرات', 'کنترل خطی', 'بررسی سیستم قدرت'],
          Mechanical: ['استاتیک', 'دینامیک', 'ترمودینامیک', 'سیالات', 'مقاومت مصالح', 'طراحی اجزا'],
          Civil: ['استاتیک', 'بتن ۱', 'فولاد ۱', 'تحلیل سازه', 'مکانیک خاک', 'راهسازی'],
          General: ['ریاضی ۱', 'ریاضی ۲', 'فیزیک ۱', 'فیزیک ۲', 'معادلات دیفرانسیل', 'آمار و احتمالات', 'ادبیات', 'معارف'],
      };

      for (const m of majors) {
          if (m.id === 'All') continue;
          const majorCourses = courses[m.id] || courses['General']; // Fallback
          
          // Generate 50 items per major
          for (let i = 0; i < 50; i++) {
              const course = majorCourses[i % majorCourses.length];
              const typeKey = typeKeys[i % typeKeys.length];
              const typeLabel = typeLabels[typeKey as keyof typeof typeLabels];
              const prof = typeKey === 'Konkur' || typeKey === 'Olympiad' ? 'سازمان سنجش' : profs[i % profs.length];
              const year = 1402 - (i % 5);
              const term = (i % 8) + 1;
              
              generated.push({
                  id: `${m.id}-${i}`,
                  course: course,
                  title: `${typeLabel} ${course} - سال ${year}`,
                  major: m.id,
                  type: typeKey,
                  term: term.toString(),
                  size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
                  date: `${year}/${Math.floor(Math.random() * 12) + 1}/${Math.floor(Math.random() * 28) + 1}`,
                  downloads: Math.floor(Math.random() * 500)
              });
          }
      }
      return generated;
  }, []);

  const filteredQuestions = questions.filter(q => 
    (selectedMajor === 'All' || q.major === selectedMajor) &&
    (selectedTerm === 'All' || q.term === selectedTerm) &&
    (selectedType === 'All' || q.type === selectedType) &&
    (q.course.includes(searchTerm) || q.title.includes(searchTerm))
  );

  return (
    <div className="space-y-8 animate-in fade-in pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black mb-4 flex items-center gap-3">
            <Archive className="w-8 h-8" />
            بانک سوالات و جزوات
          </h1>
          <p className="opacity-90 max-w-2xl text-lg">
            دسترسی به بیش از {questions.length.toLocaleString()} فایل آموزشی، نمونه سوال، تست کنکور و المپیاد.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="sticky top-4 z-20 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-white p-2 rounded-2xl border border-slate-200 flex items-center shadow-lg shadow-slate-200/50">
            <Search className="w-5 h-5 text-slate-400 mx-3" />
            <input 
                type="text" 
                placeholder="جستجوی نام درس، استاد یا سال..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none text-slate-900"
            />
            </div>
            
            <div className="flex gap-2">
                <select 
                    value={selectedTerm}
                    onChange={(e) => setSelectedTerm(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-700 outline-none focus:border-cyan-500 shadow-sm"
                >
                    <option value="All">همه ترم‌ها</option>
                    {terms.filter(t => t !== 'All').map(t => <option key={t} value={t}>ترم {t}</option>)}
                </select>

                <select 
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-700 outline-none focus:border-cyan-500 shadow-sm"
                >
                    {types.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
            </div>
        </div>
      </div>
      
      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar">
          {majors.map(major => (
            <button
              key={major.id}
              onClick={() => setSelectedMajor(major.id)}
              className={`px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                selectedMajor === major.id
                  ? 'bg-cyan-600 text-white shadow-md' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {major.label}
            </button>
          ))}
        </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <div key={q.id} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-all group cursor-pointer flex flex-col h-full relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-1 h-full ${
                  q.type === 'Midterm' ? 'bg-orange-400' : 
                  q.type === 'Final' ? 'bg-red-500' : 
                  q.type === 'Quiz' ? 'bg-blue-400' : 
                  q.type === 'Olympiad' ? 'bg-purple-500' :
                  q.type === 'Konkur' ? 'bg-emerald-500' : 'bg-green-400'
              }`}></div>
              
              <div className="flex justify-between items-start mb-3 pl-2">
                <div className={`p-2 rounded-xl transition-colors ${q.type === 'Olympiad' ? 'bg-purple-50 text-purple-600' : 'bg-cyan-50 text-cyan-700'}`}>
                  {q.type === 'Olympiad' || q.type === 'Konkur' ? <Award className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                </div>
                <div className="flex gap-1">
                    {q.type !== 'Konkur' && q.type !== 'Olympiad' && <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">ترم {q.term}</span>}
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">{q.date}</span>
                </div>
              </div>
              <h3 className="font-bold text-slate-800 mb-1 pl-2">{q.course}</h3>
              <p className="text-xs text-slate-500 mb-4 line-clamp-2 pl-2">{q.title}</p>
              
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50 pl-2">
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400">{q.size} PDF</span>
                    <span className="text-[10px] text-green-600 flex items-center gap-1"><CheckCircle className="w-3 h-3"/> {q.downloads} دانلود</span>
                </div>
                <button className="flex items-center gap-2 text-cyan-600 font-bold text-xs hover:text-cyan-700 bg-cyan-50 px-3 py-2 rounded-lg">
                  <Download className="w-3 h-3" />
                  دریافت
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">
             <Archive className="w-16 h-16 mx-auto mb-4 opacity-30" />
             <p>موردی یافت نشد. عبارت جستجو یا فیلترها را تغییر دهید.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionBank;
