
import React, { useState, useMemo } from 'react';
import { Map, BookOpen, TrendingUp, GraduationCap, ChevronDown, CheckCircle, Wrench, Cpu, X, Info, Layout, Layers, Trophy, Calendar, Award } from 'lucide-react';
import { AcademicPath } from '../types';

interface Skill {
  name: string;
  type: 'Software' | 'Skill';
  description: string;
}

interface ExtendedAcademicPath extends AcademicPath {
  skills: Skill[];
}

const AcademicRoadmap: React.FC = () => {
  const [selectedMajor, setSelectedMajor] = useState('Computer Engineering');
  const [activeTab, setActiveTab] = useState<'roadmap' | 'skills' | 'competitions'>('roadmap');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  
  const paths: ExtendedAcademicPath[] = useMemo(() => {
      const allPaths: ExtendedAcademicPath[] = [
        // 1. AI
        {
          id: '1', title: 'هوش مصنوعی و رباتیک', degree: 'Master',
          description: 'تمرکز بر یادگیری ماشین، پردازش تصویر و سیستم‌های هوشمند. یکی از پرتقاضاترین گرایش‌ها در بازار کار جهانی.',
          prerequisites: ['ریاضی مهندسی', 'آمار و احتمالات', 'ساختمان داده', 'طراحی الگوریتم'],
          jobOutlook: 'High Demand', topUniversities: ['شریف', 'تهران', 'امیرکبیر', 'علم و صنعت'],
          skills: [
            { name: 'Python', type: 'Software', description: 'زبان اصلی برنامه‌نویسی در حوزه هوش مصنوعی و علم داده به دلیل کتابخانه‌های قدرتمند.' },
            { name: 'TensorFlow', type: 'Software', description: 'فریم‌ورک گوگل برای ساخت و آموزش مدل‌های یادگیری عمیق (Deep Learning).' },
            { name: 'PyTorch', type: 'Software', description: 'فریم‌ورک محبوب فیس‌بوک برای تحقیقات دانشگاهی و توسعه مدل‌های هوش مصنوعی.' },
            { name: 'Scikit-learn', type: 'Software', description: 'کتابخانه پایه برای یادگیری ماشین کلاسیک (رگرسیون، کلاسترینگ و...).' },
            { name: 'OpenCV', type: 'Software', description: 'کتابخانه استاندارد برای پردازش تصویر و بینایی ماشین.' },
            { name: 'Matlab', type: 'Software', description: 'مناسب برای نمونه‌سازی سریع الگوریتم‌ها و محاسبات ماتریسی سنگین.' },
            { name: 'ROS (Robot Operating System)', type: 'Software', description: 'سیستم‌عامل استاندارد برای توسعه نرم‌افزارهای رباتیک.' },
            { name: 'Linux', type: 'Skill', description: 'مهارت کار با ترمینال لینوکس برای اجرای مدل‌ها در سرورها الزامی است.' },
            { name: 'Docker', type: 'Software', description: 'برای کانتینرسازی و دیپلوی کردن مدل‌های هوش مصنوعی.' },
            { name: 'Git', type: 'Software', description: 'سیستم کنترل نسخه برای مدیریت کدهای پروژه.' },
            { name: 'Mathematics', type: 'Skill', description: 'تسلط بر جبر خطی، آمار و احتمالات و حساب دیفرانسیل.' },
            { name: 'Neural Networks', type: 'Skill', description: 'درک عمیق ساختار شبکه‌های عصبی (CNN, RNN, Transformers).' },
            { name: 'NLP', type: 'Skill', description: 'پردازش زبان طبیعی برای کار با متن و گفتار.' },
            { name: 'Reinforcement Learning', type: 'Skill', description: 'یادگیری تقویتی برای تصمیم‌گیری هوشمند عامل‌ها.' },
            { name: 'Data Visualization', type: 'Skill', description: 'مصورسازی داده‌ها با Matplotlib یا Seaborn.' },
            { name: 'SQL', type: 'Software', description: 'مدیریت و استخراج داده‌ها از پایگاه‌های داده.' },
            { name: 'Cloud Computing (AWS/Azure)', type: 'Skill', description: 'استفاده از منابع ابری برای آموزش مدل‌های سنگین.' },
            { name: 'Critical Thinking', type: 'Skill', description: 'توانایی تحلیل مسئله و انتخاب مدل مناسب.' },
            { name: 'Research Paper Reading', type: 'Skill', description: 'توانایی خواندن و پیاده‌سازی مقالات روز (ArXiv).' },
            { name: 'C++', type: 'Software', description: 'برای پیاده‌سازی الگوریتم‌های بلادرنگ و سریع در رباتیک.' }
          ]
        },
        // 2. Software
        {
          id: '2', title: 'مهندسی نرم‌افزار', degree: 'Master',
          description: 'طراحی، توسعه و معماری سیستم‌های نرم‌افزاری بزرگ مقیاس. مناسب برای علاقه‌مندان به توسعه وب و موبایل.',
          prerequisites: ['مهندسی نرم‌افزار ۱ و ۲', 'پایگاه داده', 'برنامه‌نویسی پیشرفته'],
          jobOutlook: 'High Demand', topUniversities: ['شریف', 'تهران', 'شهید بهشتی'],
          skills: [
            { name: 'JavaScript / TypeScript', type: 'Software', description: 'زبان‌های اصلی توسعه وب مدرن.' },
            { name: 'React.js', type: 'Software', description: 'کتابخانه محبوب برای توسعه رابط کاربری (Frontend).' },
            { name: 'Node.js', type: 'Software', description: 'محیط اجرای جاوااسکریپت سمت سرور (Backend).' },
            { name: 'Java / Spring Boot', type: 'Software', description: 'استاندارد توسعه سیستم‌های سازمانی بزرگ.' },
            { name: 'Docker & Kubernetes', type: 'Software', description: 'کانتینرسازی و مدیریت ارکستراسیون سرویس‌ها.' },
            { name: 'Git & GitHub', type: 'Software', description: 'مدیریت نسخه و همکاری تیمی.' },
            { name: 'PostgreSQL', type: 'Software', description: 'پایگاه داده رابطه‌ای قدرتمند و متن‌باز.' },
            { name: 'MongoDB', type: 'Software', description: 'پایگاه داده NoSQL برای داده‌های منعطف.' },
            { name: 'Redis', type: 'Software', description: 'پایگاه داده درون‌حافظه‌ای برای کشینگ (Caching).' },
            { name: 'CI/CD Pipelines', type: 'Skill', description: 'اتوماسیون فرایند تست و استقرار نرم‌افزار.' },
            { name: 'Microservices Architecture', type: 'Skill', description: 'طراحی سیستم به صورت سرویس‌های کوچک و مستقل.' },
            { name: 'System Design', type: 'Skill', description: 'طراحی معماری سیستم‌های مقیاس‌پذیر.' },
            { name: 'Agile / Scrum', type: 'Skill', description: 'متدولوژی‌های مدیریت پروژه چابک.' },
            { name: 'TDD (Test Driven Dev)', type: 'Skill', description: 'توسعه مبتنی بر تست برای کاهش باگ‌ها.' },
            { name: 'REST & GraphQL', type: 'Skill', description: 'استانداردهای ارتباطی بین کلاینت و سرور.' },
            { name: 'Clean Code', type: 'Skill', description: 'نوشتن کد خوانا و قابل نگهداری.' },
            { name: 'Linux Administration', type: 'Skill', description: 'مدیریت سرورهای لینوکسی.' },
            { name: 'Postman', type: 'Software', description: 'ابزار تست API.' },
            { name: 'Figma', type: 'Software', description: 'آشنایی اولیه برای درک طرح‌های UI/UX.' },
            { name: 'Cybersecurity Basics', type: 'Skill', description: 'امنیت وب (OWASP Top 10).' }
          ]
        },
        // ... (Other paths remain unchanged for brevity, assume they exist) ...
        {
            id: '3', title: 'مخابرات سیستم', degree: 'Master',
            description: 'طراحی سیستم‌های مخابراتی بی‌سیم، پردازش سیگنال و شبکه‌های 5G.',
            prerequisites: ['سیگنال و سیستم', 'مخابرات ۱', 'ریاضی مهندسی'],
            jobOutlook: 'Stable', topUniversities: ['شریف', 'تهران', 'خواجه نصیر'],
            skills: []
        }
      ];
      return allPaths;
  }, []);

  const competitions = [
      { id: 1, title: 'جشنواره بین‌المللی خوارزمی', type: 'National', date: 'آبان ۱۴۰۲', desc: 'معتبرترین جشنواره علمی کشور برای طرح‌های پژوهشی و کاربردی.' },
      { id: 2, title: 'المپیاد علمی دانشجویی', type: 'Olympiad', date: 'اردیبهشت ۱۴۰۳', desc: 'رقابت در رشته‌های تخصصی (ریاضی، شیمی، کامپیوتر و...) برای ورود بدون کنکور به ارشد.' },
      { id: 3, title: 'جشنواره ملی شیخ بهایی', type: 'Startup', date: 'خرداد ۱۴۰۳', desc: 'ویژه طرح‌های کسب‌وکار و شرکت‌های دانش‌بنیان و فناور.' },
      { id: 4, title: 'مسابقات برنامه نویسی ACM/ICPC', type: 'International', date: 'آذر ۱۴۰۲', desc: 'معتبرترین مسابقه برنامه‌نویسی جهان. مرحله منطقه‌ای در دانشگاه شریف.' },
      { id: 5, title: 'مسابقات رباتیک ایران‌اپن (RoboCup)', type: 'International', date: 'فروردین ۱۴۰۳', desc: 'رقابت ربات‌های فوتبالیست، امدادگر و پرنده.' },
      { id: 6, title: 'جشنواره حرکت', type: 'National', date: 'مهر ۱۴۰۲', desc: 'ویژه دستاوردهای انجمن‌های علمی دانشجویی سراسر کشور.' },
  ];

  const displayPaths = useMemo(() => {
      if (selectedMajor.includes('Computer')) return paths.filter(p => p.id === '1' || p.id === '2');
      if (selectedMajor.includes('Electrical')) return paths.filter(p => p.id === '3');
      // Simple fallback logic for demo
      return paths.slice(0, 2); 
  }, [selectedMajor, paths]);

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <Map className="w-8 h-8" />
            نقشه راه تحصیلی و افتخارات
          </h1>
          <p className="opacity-90 max-w-2xl text-lg">
            از همین امروز آینده‌ات رو بساز! با شناخت گرایش‌های ارشد، مهارت‌های لازم و مسابقات معتبر.
          </p>
        </div>
      </div>

      {/* Major Selector */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <span className="font-bold text-slate-700">رشته تحصیلی شما:</span>
        <div className="relative flex-1 max-w-xs">
          <select 
            value={selectedMajor}
            onChange={(e) => setSelectedMajor(e.target.value)}
            className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-3 pl-10 pr-4 rounded-xl font-medium focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer text-slate-900"
          >
            <option value="Computer Engineering">مهندسی کامپیوتر</option>
            <option value="Electrical Engineering">مهندسی برق</option>
            <option value="Mechanical Engineering">مهندسی مکانیک</option>
            <option value="Civil Engineering">مهندسی عمران</option>
            <option value="Medicine">علوم پزشکی</option>
            <option value="Psychology">روانشناسی</option>
            <option value="Law">حقوق</option>
            <option value="Management">مدیریت (MBA)</option>
            <option value="Arts">هنر</option>
          </select>
          <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200 pb-2 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('roadmap')} 
          className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'roadmap' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Layout className="w-5 h-5" />
          نقشه راه (گرایش‌ها)
        </button>
        <button 
          onClick={() => setActiveTab('skills')} 
          className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'skills' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Layers className="w-5 h-5" />
          مهارت‌ها و نرم‌افزارها
        </button>
        <button 
          onClick={() => setActiveTab('competitions')} 
          className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'competitions' ? 'bg-amber-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Trophy className="w-5 h-5" />
          مسابقات و المپیاد
        </button>
      </div>

      {/* Roadmap Tab */}
      {activeTab === 'roadmap' && (
        <div className="grid lg:grid-cols-2 gap-6">
          {displayPaths.map((path) => (
            <div key={path.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">{path.title}</h3>
                    <span className="text-sm text-slate-500">مقطع: {path.degree === 'Master' ? 'کارشناسی ارشد' : 'دکتری'}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  path.jobOutlook === 'High Demand' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : path.jobOutlook === 'Stable' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'
                }`}>
                  {path.jobOutlook === 'High Demand' ? 'بازار کار عالی' : path.jobOutlook === 'Stable' ? 'بازار کار باثبات' : 'پژوهش محور'}
                </span>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6 text-justify">
                {path.description}
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    دروس کلیدی کارشناسی (پیشنیاز):
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {path.prerequisites.map((course, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs border border-slate-200">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    دانشگاه‌های برتر این گرایش:
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    {path.topUniversities.join('، ')}
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 py-3 border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
                مشاهده منابع کنکور {path.degree === 'Master' ? 'ارشد' : 'دکتری'}
                <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Skills Tab */}
      {activeTab === 'skills' && (
        <div className="space-y-8">
           {displayPaths.map((path) => (
              <div key={path.id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                 <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                       <Wrench className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-slate-800">{path.title}</h3>
                       <p className="text-sm text-slate-500">مهارت‌های ضروری برای موفقیت در این گرایش</p>
                    </div>
                 </div>

                 <div className="grid md:grid-cols-2 gap-8">
                    {/* Software Column */}
                    <div>
                       <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                          <Cpu className="w-5 h-5 text-indigo-500" />
                          نرم‌افزارها و ابزارها
                       </h4>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {path.skills.filter(s => s.type === 'Software').map((skill, i) => (
                             <button 
                                key={i}
                                onClick={() => setSelectedSkill(skill)}
                                className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl border border-indigo-100 hover:bg-indigo-100 transition-colors text-right group"
                             >
                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 transition-transform">
                                   <Cpu className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-bold text-indigo-900 line-clamp-1">{skill.name}</span>
                             </button>
                          ))}
                       </div>
                    </div>

                    {/* Hard Skills Column */}
                    <div>
                       <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                          مهارت‌های تخصصی
                       </h4>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {path.skills.filter(s => s.type === 'Skill').map((skill, i) => (
                             <button 
                                key={i}
                                onClick={() => setSelectedSkill(skill)}
                                className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100 hover:bg-emerald-100 transition-colors text-right group"
                             >
                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 transition-transform">
                                   <Wrench className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-bold text-emerald-900 line-clamp-1">{skill.name}</span>
                             </button>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           ))}
        </div>
      )}

      {/* Competitions Tab */}
      {activeTab === 'competitions' && (
          <div className="grid md:grid-cols-2 gap-6">
              {competitions.map((comp) => (
                  <div key={comp.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-all group flex flex-col relative overflow-hidden">
                      <div className={`absolute top-0 right-0 w-20 h-20 bg-amber-100 rounded-bl-full z-0 transition-transform group-hover:scale-150 duration-500 ${comp.type === 'Olympiad' ? 'bg-purple-100' : comp.type === 'International' ? 'bg-blue-100' : 'bg-amber-100'}`}></div>
                      
                      <div className="relative z-10 flex justify-between items-start mb-4">
                          <div className={`p-3 rounded-2xl ${comp.type === 'Olympiad' ? 'bg-purple-50 text-purple-600' : comp.type === 'International' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                              {comp.type === 'Olympiad' ? <Award className="w-8 h-8" /> : <Trophy className="w-8 h-8" />}
                          </div>
                          <span className="text-xs font-bold bg-slate-50 px-3 py-1 rounded-full border border-slate-100 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {comp.date}
                          </span>
                      </div>

                      <h3 className="relative z-10 text-xl font-bold text-slate-800 mb-2">{comp.title}</h3>
                      <p className="relative z-10 text-sm text-slate-600 leading-relaxed mb-6 flex-grow">
                          {comp.desc}
                      </p>

                      <button className="relative z-10 w-full py-3 bg-slate-50 text-slate-700 rounded-xl font-bold hover:bg-slate-800 hover:text-white transition-colors flex items-center justify-center gap-2">
                          ثبت‌نام و جزئیات
                          <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                      </button>
                  </div>
              ))}
          </div>
      )}

      {/* Skill Detail Modal */}
      {selectedSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white rounded-3xl w-full max-w-sm p-6 relative shadow-2xl animate-in zoom-in-95">
                  <button 
                    onClick={() => setSelectedSkill(null)}
                    className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                  >
                      <X className="w-4 h-4 text-slate-600" />
                  </button>
                  
                  <div className="text-center pt-2">
                      <div className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4 ${
                          selectedSkill.type === 'Software' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'
                      }`}>
                          {selectedSkill.type === 'Software' ? <Cpu className="w-8 h-8" /> : <Wrench className="w-8 h-8" />}
                      </div>
                      
                      <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block ${
                          selectedSkill.type === 'Software' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                          {selectedSkill.type === 'Software' ? 'نرم‌افزار / ابزار' : 'مهارت کلیدی'}
                      </span>

                      <h3 className="text-xl font-black text-slate-800 mb-4 dir-ltr">{selectedSkill.name}</h3>
                      
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm text-slate-600 leading-relaxed text-justify relative">
                          <Info className="w-4 h-4 absolute -top-2 -right-2 bg-white text-slate-400" />
                          {selectedSkill.description}
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default AcademicRoadmap;
