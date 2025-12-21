
import React, { useState, useMemo } from 'react';
import { Users, Search, Star, MessageSquare, ChevronRight, GraduationCap, BookOpen, Award, Download, X, Mail } from 'lucide-react';
import { Professor } from '../types';

const Professors: React.FC = () => {
  const [selectedProf, setSelectedProf] = useState<Professor | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filters
  const [filterRank, setFilterRank] = useState('All'); // Faculty vs Adjunct
  const [filterMajor, setFilterMajor] = useState('All');

  // Generate 70 Professors
  const profs: any[] = useMemo(() => {
      const generated = [];
      const depts = ['کامپیوتر', 'برق', 'مکانیک', 'عمران', 'صنایع', 'علوم پایه', 'معماری'];
      const names = ['رضایی', 'محمدی', 'احمدی', 'کریمی', 'حسینی', 'موسوی', 'جعفری', 'صادقی', 'رحیمی', 'طاهری'];
      const coursesMap: any = {
          'کامپیوتر': ['هوش مصنوعی', 'طراحی الگوریتم', 'شبکه', 'پایگاه داده'],
          'برق': ['مدار', 'الکترونیک', 'مخابرات', 'کنترل'],
          'مکانیک': ['استاتیک', 'دینامیک', 'ترمودینامیک', 'سیالات'],
          'عمران': ['سازه', 'بتن', 'فولاد', 'خاک'],
          'صنایع': ['تحقیق در عملیات', 'کنترل پروژه', 'اقتصاد مهندسی'],
          'علوم پایه': ['ریاضی ۱', 'فیزیک ۲', 'معادلات', 'آمار'],
          'معماری': ['طراحی فنی', 'تاسیسات', 'تاریخ معماری']
      };

      for (let i = 0; i < 70; i++) {
          const dept = depts[i % depts.length];
          const name = `دکتر ${names[i % names.length]} ${names[(i + 3) % names.length]}`;
          const courseList = coursesMap[dept];
          const isFaculty = i % 3 !== 0; // 2/3 Faculty, 1/3 Adjunct
          
          generated.push({
              id: `${i}`,
              name: name,
              department: `گروه ${dept}`,
              deptRaw: dept,
              rank: isFaculty ? 'Faculty' : 'Adjunct',
              rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
              image: `https://picsum.photos/seed/prof${i}/100`,
              email: `prof.${i}@uni.ac.ir`,
              courses: [courseList[i % courseList.length], courseList[(i+1) % courseList.length]]
          });
      }
      return generated;
  }, []);

  const filteredProfs = profs.filter(p => {
      const matchSearch = p.name.includes(searchTerm) || p.department.includes(searchTerm) || p.courses.some((c: string) => c.includes(searchTerm));
      const matchRank = filterRank === 'All' || p.rank === filterRank;
      const matchMajor = filterMajor === 'All' || p.deptRaw === filterMajor;
      
      return matchSearch && matchRank && matchMajor;
  });

  const handleDownloadCV = () => {
    if (!selectedProf) return;
    setIsDownloading(true);
    const element = document.getElementById('prof-cv-preview');
    const opt = {
      margin: 0,
      filename: `CV-${selectedProf.name.replace(/\s+/g, '-')}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // @ts-ignore
    if (window.html2pdf) {
      // @ts-ignore
      window.html2pdf().set(opt).from(element).save().then(() => {
        setIsDownloading(false);
      });
    } else {
      window.print();
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-8 relative">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">بانک اطلاعات اساتید</h2>
        <p className="text-slate-500">لیست کامل {profs.length} استاد دانشگاه، ساعات حضور و نظرات دانشجویان</p>
      </div>

      <div className="sticky top-4 z-20 space-y-4">
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="جستجوی نام استاد، گروه آموزشی یا درس..."
                className="w-full pr-12 pl-6 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-900"
                />
            </div>
            
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
                <select value={filterMajor} onChange={e => setFilterMajor(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 outline-none">
                    <option value="All">همه گروه‌ها</option>
                    <option value="کامپیوتر">کامپیوتر</option>
                    <option value="برق">برق</option>
                    <option value="مکانیک">مکانیک</option>
                    <option value="عمران">عمران</option>
                    <option value="صنایع">صنایع</option>
                    <option value="علوم پایه">علوم پایه</option>
                    <option value="معماری">معماری</option>
                </select>
                <select value={filterRank} onChange={e => setFilterRank(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 outline-none">
                    <option value="All">همه اساتید</option>
                    <option value="Faculty">هیئت علمی</option>
                    <option value="Adjunct">حق‌التدریس</option>
                </select>
            </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredProfs.map((prof) => (
          <div 
            key={prof.id} 
            onClick={() => setSelectedProf(prof)}
            className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex items-center gap-6 cursor-pointer"
          >
            <img src={prof.image} className="w-24 h-24 rounded-2xl object-cover shadow-lg" alt={prof.name} />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{prof.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-slate-400">{prof.department}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${prof.rank === 'Faculty' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                          {prof.rank === 'Faculty' ? 'هیئت علمی' : 'مدعو'}
                      </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-sm font-bold">
                  <Star className="w-4 h-4 fill-amber-500" />
                  {prof.rating}
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                  {prof.courses.map((c: string, i: number) => (
                      <span key={i} className="text-[10px] bg-slate-50 px-2 py-1 rounded border border-slate-100 text-slate-500">{c}</span>
                  ))}
              </div>
              <div className="mt-4 flex gap-3">
                <button className="flex-1 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors">
                  مشاهده رزومه (CV)
                </button>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors" />
          </div>
        ))}
      </div>

      {/* CV Modal */}
      {selectedProf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl flex flex-col md:flex-row overflow-hidden">
             
             {/* Modal Controls */}
             <div className="absolute top-4 left-4 z-50 flex gap-2">
                <button 
                  onClick={handleDownloadCV}
                  disabled={isDownloading}
                  className="bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 shadow-lg" 
                  title="دانلود PDF"
                >
                  {isDownloading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Download className="w-5 h-5" />}
                </button>
                <button 
                  onClick={() => setSelectedProf(null)}
                  className="bg-slate-800 text-white p-2 rounded-full hover:bg-slate-900 shadow-lg"
                >
                  <X className="w-5 h-5" />
                </button>
             </div>

             {/* Preview Area */}
             <div id="prof-cv-preview" className="w-full bg-white flex flex-col md:flex-row min-h-[297mm] md:min-h-0">
                {/* Sidebar */}
                <div className="md:w-1/3 bg-slate-900 text-slate-300 p-8 flex flex-col items-center text-center">
                    <div className="w-40 h-40 rounded-full border-4 border-emerald-500 p-1 mb-6">
                        <img src={selectedProf.image} className="w-full h-full rounded-full object-cover" alt="Profile" />
                    </div>
                    <h2 className="text-2xl font-black text-white mb-2">{selectedProf.name}</h2>
                    <p className="text-emerald-400 font-bold mb-2">{selectedProf.department}</p>
                    <span className="bg-slate-800 text-slate-400 text-xs px-3 py-1 rounded-full border border-slate-700">
                        {(selectedProf as any).rank === 'Faculty' ? 'عضو هیئت علمی' : 'استاد مدعو'}
                    </span>

                    <div className="w-full space-y-6 text-right mt-8">
                        <div>
                            <h4 className="text-white font-bold text-sm uppercase tracking-widest border-b border-slate-700 pb-2 mb-2">تماس</h4>
                            <div className="flex items-center gap-2 text-sm mb-2">
                                <Mail className="w-4 h-4 text-emerald-500" />
                                <span>{selectedProf.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Users className="w-4 h-4 text-emerald-500" />
                                <span>دفتر: دانشکده فنی، اتاق ۳۰۲</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="md:w-2/3 p-10 bg-white">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                            <GraduationCap className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-slate-800">رزومه علمی و پژوهشی</h1>
                            <p className="text-slate-500">Academic Curriculum Vitae</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <section>
                            <h3 className="text-lg font-bold text-slate-800 border-b-2 border-slate-100 pb-2 mb-4 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-emerald-500" />
                                سوابق تدریس
                            </h3>
                            <div className="space-y-3">
                                {(selectedProf as any).courses.map((c: string, i: number) => (
                                    <div key={i} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
                                        <span className="font-bold text-slate-700">{c}</span>
                                        <span className="text-sm text-slate-500">کارشناسی</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Professors;
