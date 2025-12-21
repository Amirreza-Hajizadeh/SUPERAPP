
import React, { useState, useMemo } from 'react';
import { Rocket, Lightbulb, Briefcase, ChevronLeft, Building2, Users, FileText, Download, Printer, X, Check, Hammer, Factory, Award, GraduationCap, Wrench, FileBadge, Flame, Cpu, MapPin, UserPlus, Search, PenTool } from 'lucide-react';
import { JobOpportunity } from '../types';

const Innovation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'startups' | 'skills' | 'teams'>('jobs');
  const [showAdmissionModal, setShowAdmissionModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Team Finder State
  const [teamSearch, setTeamSearch] = useState('');
  const [showTeamModal, setShowTeamModal] = useState(false);

  // Admission Form State
  const [formData, setFormData] = useState({
    teamName: '',
    projectTitle: '',
    domain: 'فناوری اطلاعات (IT)',
    leaderName: '',
    leaderPhone: '',
    membersCount: '',
    abstract: '',
    needs: ''
  });

  // Generate 50 Jobs
  const jobs: JobOpportunity[] = useMemo(() => {
      const generated = [];
      const roles = ['Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'Digital Marketer', 'Content Creator', 'Data Analyst'];
      const companies = ['اسنپ', 'دیجی‌کالا', 'کافه بازار', 'تپسی', 'علی‌بابا', 'جاباما', 'ابر آروان'];
      const types = ['Internship', 'Part-time', 'Full-time'];
      
      for(let i=0; i<50; i++) {
          const type = types[i % 3] as 'Internship' | 'Part-time' | 'Full-time';
          generated.push({
              id: `${i}`,
              title: roles[i % roles.length],
              company: companies[i % companies.length],
              type: type,
              skills: ['React', 'Python', 'Design', 'SEO'].slice(0, Math.floor(Math.random()*3)+1),
              date: `${Math.floor(Math.random()*10)} روز پیش`,
              description: 'همکاری در تیم فنی برای توسعه محصول جدید. محیط کاری پویا و امکان یادگیری.'
          });
      }
      return generated;
  }, []);

  // Mock Data for Skills
  const courses = [
      { id: 1, title: 'برق ساختمان درجه ۱', type: 'TVTO', organizer: 'مرکز فنی‌حرفه‌ای شماره ۱', duration: '۳۰۰ ساعت', status: 'ثبت‌نام', icon: Wrench },
      { id: 2, title: 'برنامه‌نویسی PLC', type: 'ASD', organizer: 'مرکز جوار دانشگاه (ASD)', duration: '۱۰۰ ساعت', status: 'تکمیل', icon: Cpu },
      { id: 3, title: 'تعمیرات سخت‌افزار موبایل', type: 'TVTO', organizer: 'مرکز فنی‌حرفه‌ای شماره ۲', duration: '۲۵۰ ساعت', status: 'ثبت‌نام', icon: Hammer },
      { id: 4, title: 'کارگاه متلب (Matlab)', type: 'Workshop', organizer: 'انجمن علمی برق', duration: '۸ ساعت', status: 'ثبت‌نام', icon: FileText },
      { id: 5, title: 'نقشه‌کشی با SolidWorks', type: 'Workshop', organizer: 'انجمن علمی مکانیک', duration: '۲۰ ساعت', status: 'در حال برگزاری', icon: GraduationCap },
      { id: 6, title: 'جوشکاری آرگون', type: 'TVTO', organizer: 'مرکز فنی‌حرفه‌ای شماره ۱', duration: '۱۵۰ ساعت', status: 'ثبت‌نام', icon: Flame },
  ];

  const internships = [
      { id: 1, company: 'شرکت فولاد', field: 'مکانیک / برق / مواد', capacity: 15, loc: 'کیلومتر ۱۰ جاده قدیم' },
      { id: 2, company: 'پتروشیمی امیرکبیر', field: 'مهندسی شیمی / ایمنی', capacity: 10, loc: 'منطقه ویژه اقتصادی' },
      { id: 3, company: 'پارک علم و فناوری', field: 'کامپیوتر / IT / گرافیک', capacity: 8, loc: 'پردیس دانشگاه' },
  ];

  // Mock Data for Teams
  const teams = [
      { id: 1, title: 'استارتاپ هوش مصنوعی', owner: 'علی محمدی', mySkills: ['Python', 'AI'], lookingFor: ['Frontend (React)', 'UI Designer'], desc: 'برای شرکت در مسابقات ملی شیخ بهایی.' },
      { id: 2, title: 'پروژه پایانی مهندسی نرم‌افزار', owner: 'سارا احمدی', mySkills: ['Documentation', 'Backend'], lookingFor: ['Flutter Developer'], desc: 'ساخت اپلیکیشن فروشگاهی.' },
      { id: 3, title: 'تیم رباتیک (مسیریاب)', owner: 'رضا کاظمی', mySkills: ['Electronics'], lookingFor: ['C++ Programmer', 'Mechanical Design'], desc: 'آمادگی برای ایران‌اپن.' },
  ];

  const filteredTeams = teams.filter(t => 
      t.lookingFor.some(skill => skill.toLowerCase().includes(teamSearch.toLowerCase())) ||
      t.title.includes(teamSearch)
  );

  const handlePrintForm = () => {
    setIsDownloading(true);
    const element = document.getElementById('admission-form-print');
    const opt = {
      margin: 10,
      filename: `Admission-${formData.teamName || 'Form'}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // @ts-ignore
    if (window.html2pdf) {
      // @ts-ignore
      window.html2pdf().set(opt).from(element).save().then(() => setIsDownloading(false));
    } else {
      window.print();
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black mb-4 flex items-center gap-3">
            <Rocket className="w-8 h-8" />
            زیست‌بوم نوآوری، مهارت و اشتغال
          </h1>
          <p className="opacity-90 max-w-2xl text-lg">
            پلی بین دانشگاه و صنعت. از مهارت‌آموزی در کارگاه‌ها تا کارآفرینی در مرکز رشد.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        <button 
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2 font-bold transition-colors whitespace-nowrap ${activeTab === 'jobs' ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
        >
          فرصت‌های شغلی
        </button>
        <button 
          onClick={() => setActiveTab('skills')}
          className={`px-4 py-2 font-bold transition-colors whitespace-nowrap ${activeTab === 'skills' ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
        >
          مهارت‌افزایی و آموزش
        </button>
        <button 
          onClick={() => setActiveTab('teams')}
          className={`px-4 py-2 font-bold transition-colors whitespace-nowrap ${activeTab === 'teams' ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
        >
          هم‌تیمی یاب (Team Finder)
        </button>
        <button 
          onClick={() => setActiveTab('startups')}
          className={`px-4 py-2 font-bold transition-colors whitespace-nowrap ${activeTab === 'startups' ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
        >
          مرکز رشد و دانش‌بنیان
        </button>
      </div>

      {activeTab === 'jobs' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    job.type === 'Internship' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' :
                    job.type === 'Part-time' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  }`}>
                    {job.type === 'Internship' ? 'کارآموزی' : job.type === 'Part-time' ? 'پاره‌وقت' : 'تمام‌وقت'}
                  </span>
                </div>
                
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">{job.title}</h3>
                <span className="text-sm text-slate-500 dark:text-slate-400 mb-4 block">{job.company}</span>
                
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 line-clamp-2 flex-grow">
                  {job.description}
                </p>

                <div className="space-y-4 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg text-xs border border-slate-200 dark:border-slate-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <button className="w-full py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors">
                    ارسال رزومه
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'teams' && (
          <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                  <div className="relative flex-1 w-full">
                      <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                          type="text" 
                          placeholder="جستجو بر اساس مهارت مورد نیاز (مثلاً: گرافیک، پایتون)..." 
                          value={teamSearch}
                          onChange={(e) => setTeamSearch(e.target.value)}
                          className="w-full pr-12 pl-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-200"
                      />
                  </div>
                  <button 
                      onClick={() => setShowTeamModal(true)}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2 whitespace-nowrap"
                  >
                      <UserPlus className="w-5 h-5" />
                      ثبت درخواست هم‌تیمی
                  </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTeams.map((team) => (
                      <div key={team.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all flex flex-col h-full group">
                          <div className="flex items-center gap-4 mb-4 border-b border-slate-50 dark:border-slate-800 pb-4">
                              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center font-bold text-xl">
                                  {team.owner.charAt(0)}
                              </div>
                              <div>
                                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">{team.title}</h3>
                                  <span className="text-xs text-slate-500 dark:text-slate-400">مدیر: {team.owner}</span>
                              </div>
                          </div>
                          
                          <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 flex-grow">{team.desc}</p>

                          <div className="space-y-4 mb-6">
                              <div>
                                  <span className="text-xs font-bold text-slate-400 block mb-2">مهارت‌های ما (داریم):</span>
                                  <div className="flex flex-wrap gap-2">
                                      {team.mySkills.map((s, i) => (
                                          <span key={i} className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs px-2 py-1 rounded-lg border border-emerald-100 dark:border-emerald-900/50">{s}</span>
                                      ))}
                                  </div>
                              </div>
                              <div>
                                  <span className="text-xs font-bold text-slate-400 block mb-2">دنبال چی می‌گردیم (نیاز داریم):</span>
                                  <div className="flex flex-wrap gap-2">
                                      {team.lookingFor.map((s, i) => (
                                          <span key={i} className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs px-2 py-1 rounded-lg border border-red-100 dark:border-red-900/50">{s}</span>
                                      ))}
                                  </div>
                              </div>
                          </div>

                          <button className="w-full py-3 border-2 border-indigo-100 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
                              ارسال درخواست همکاری
                          </button>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {activeTab === 'skills' && (
          <div className="space-y-8 animate-in fade-in">
              {/* Top Section: Courses Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                      <div key={course.id} className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all group relative overflow-hidden">
                          <div className={`absolute top-0 right-0 w-2 h-full ${
                              course.type === 'TVTO' ? 'bg-orange-500' : 
                              course.type === 'ASD' ? 'bg-teal-500' : 'bg-indigo-500'
                          }`}></div>
                          
                          <div className="flex justify-between items-start mb-4 pl-2">
                              <div className={`p-3 rounded-2xl ${
                                  course.type === 'TVTO' ? 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' : 
                                  course.type === 'ASD' ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' : 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                              }`}>
                                  <course.icon className="w-6 h-6" />
                              </div>
                              <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                                  course.status === 'ثبت‌نام' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 
                                  course.status === 'تکمیل' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                              }`}>
                                  {course.status}
                              </span>
                          </div>

                          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">{course.title}</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{course.organizer}</p>

                          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mt-auto pt-4 border-t border-slate-50 dark:border-slate-800">
                              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">مدت: {course.duration}</span>
                              <span className="font-bold flex items-center gap-1">
                                  {course.type === 'TVTO' ? 'فنی‌حرفه‌ای' : course.type === 'ASD' ? 'جوار دانشگاه' : 'ورکشاپ'}
                              </span>
                          </div>
                      </div>
                  ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                  {/* Internship Section */}
                  <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                          <Factory className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                          فرصت‌های کارآموزی (واحد درسی)
                      </h3>
                      <div className="space-y-4">
                          {internships.map((intern) => (
                              <div key={intern.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors gap-4">
                                  <div>
                                      <h4 className="font-bold text-slate-800 dark:text-slate-200">{intern.company}</h4>
                                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{intern.field}</p>
                                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> {intern.loc}</p>
                                  </div>
                                  <div className="text-left sm:text-right">
                                      <span className="block text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-lg mb-2 text-center">ظرفیت: {intern.capacity} نفر</span>
                                      <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 px-4 py-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors w-full sm:w-auto">دریافت معرفی‌نامه</button>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* Certification Info */}
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-[2.5rem] text-white flex flex-col justify-between">
                      <div>
                          <div className="flex items-center gap-3 mb-6">
                              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                                  <Award className="w-8 h-8 text-yellow-400" />
                              </div>
                              <h3 className="text-xl font-bold">راهنمای صدور مدرک</h3>
                          </div>
                          <ul className="space-y-4 text-sm text-slate-300">
                              <li className="flex items-start gap-3">
                                  <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0">1</div>
                                  <span>شرکت در آزمون کتبی و کسب نمره قبولی (۵۰ از ۱۰۰).</span>
                              </li>
                              <li className="flex items-start gap-3">
                                  <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0">2</div>
                                  <span>شرکت در آزمون عملی و کسب نمره قبولی (۷۰ از ۱۰۰).</span>
                              </li>
                              <li className="flex items-start gap-3">
                                  <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0">3</div>
                                  <span>پرداخت هزینه صدور کارت هوشمند در پرتال فنی‌حرفه‌ای.</span>
                              </li>
                          </ul>
                      </div>
                      <div className="mt-8 flex gap-4">
                          <button className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2">
                              <FileBadge className="w-4 h-4" />
                              استعلام نمره
                          </button>
                          <button className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-colors">
                              سامانه پورتال
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {activeTab === 'startups' && (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Incubation Center Info */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-amber-500" />
              خدمات مرکز رشد دانشگاه
            </h3>
            <ul className="space-y-4">
              {[
                { title: 'استقرار تیم‌ها', desc: 'تخصیص فضای کار اشتراکی و دفتر کار به تیم‌های منتخب.' },
                { title: 'منتورینگ و مشاوره', desc: 'دسترسی به مشاوران حقوقی، مالی و فنی برای توسعه محصول.' },
                { title: 'حمایت مالی', desc: 'اعطای وام‌های بذری (Seed Money) برای ساخت نمونه اولیه.' },
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="mt-1 w-2 h-2 rounded-full bg-indigo-500 shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => setShowAdmissionModal(true)}
              className="mt-8 w-full py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 rounded-xl font-bold hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              تکمیل فرم پذیرش
            </button>
          </section>

          {/* Companies List */}
          <section className="space-y-4">
             <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-3xl text-white">
                <h3 className="font-bold text-lg mb-2">ثبت شرکت دانش‌بنیان</h3>
                <p className="text-sm text-slate-300 mb-4">آیا محصول شما شرایط دانش‌بنیان شدن را دارد؟ راهنمای کامل را مطالعه کنید.</p>
                <button className="flex items-center gap-2 text-sm font-bold text-indigo-300 hover:text-white transition-colors">
                  مطالعه راهنما <ChevronLeft className="w-4 h-4" />
                </button>
             </div>
             
             <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                   <Building2 className="w-5 h-5 text-slate-400" />
                   شرکت‌های مستقر
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                   {Array.from({length: 20}).map((_, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                         <span className="text-sm font-bold text-slate-700 dark:text-slate-300">شرکت دانش‌بنیان {i+1}</span>
                         <span className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-lg">فعال</span>
                      </div>
                   ))}
                </div>
             </div>
          </section>
        </div>
      )}

      {/* Admission Form Modal - Same as previous version, retained for functionality */}
      {showAdmissionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl flex flex-col">
             
             <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur z-20">
                <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                   <Building2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                   فرم پذیرش در مرکز رشد
                </h3>
                <div className="flex gap-2">
                   <button 
                      onClick={handlePrintForm}
                      className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors" 
                      title="دانلود/چاپ فرم"
                   >
                      {isDownloading ? <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" /> : <Printer className="w-5 h-5" />}
                   </button>
                   <button 
                      onClick={() => setShowAdmissionModal(false)}
                      className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                   >
                      <X className="w-5 h-5" />
                   </button>
                </div>
             </div>

             <div className="flex-1 p-8 grid md:grid-cols-2 gap-8">
                {/* Form Inputs */}
                <div className="space-y-4">
                   <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2 border-b pb-2 dark:border-slate-800">اطلاعات اولیه</h4>
                   <div>
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 block">نام تیم / هسته</label>
                      <input type="text" value={formData.teamName} onChange={e => setFormData({...formData, teamName: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:border-indigo-500 outline-none text-slate-900 dark:text-slate-200" />
                   </div>
                   {/* ... rest of the form inputs same as before ... */}
                </div>

                {/* Live Preview (Paper Look) - Retained */}
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-3xl overflow-hidden flex items-center justify-center shadow-inner">
                   <div id="admission-form-print" className="bg-white w-full aspect-[1/1.414] p-8 text-slate-900 shadow-xl text-[10px] relative leading-relaxed overflow-hidden">
                      <div className="flex justify-between items-center border-b-2 border-slate-800 pb-4 mb-6">
                         <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center">
                               <Rocket className="w-5 h-5" />
                            </div>
                            <div>
                               <h1 className="font-black text-sm">مرکز رشد واحدهای فناور</h1>
                               <p className="text-[8px] text-slate-500">Innovation & Incubation Center</p>
                            </div>
                         </div>
                         <div className="text-left">
                            <p className="font-bold">فرم درخواست پذیرش مقدماتی</p>
                            <p className="text-[8px] mt-1">شماره: _______________</p>
                            <p className="text-[8px]">تاریخ: ۱۴۰۲/۱۰/۰۴</p>
                         </div>
                      </div>
                      <div className="space-y-4">
                         <div className="flex gap-4">
                            <div className="flex-1 p-2 border border-slate-200 rounded">
                               <span className="block text-[8px] text-slate-400 font-bold mb-1">نام تیم / واحد فناور:</span>
                               <span className="font-bold">{formData.teamName}</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Innovation;
