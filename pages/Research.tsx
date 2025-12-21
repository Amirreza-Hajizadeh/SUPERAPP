
import React, { useState, useMemo } from 'react';
import { FlaskConical, Calendar, Search, FileText, Quote, Microscope, User, Map, Users, Database, Bot, Globe, ExternalLink, PenTool, Check } from 'lucide-react';
import { Lab } from '../types';

const Research: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'labs' | 'tools' | 'resources'>('resources');
  
  // Generate 20+ Labs
  const labs: Lab[] = useMemo(() => {
      const generated = [];
      const names = [
          'شبکه و امنیت', 'رباتیک پیشرفته', 'مدارهای منطقی', 'اینترنت اشیاء (IoT)', 'هوش مصنوعی', 
          'بیوانفورماتیک', 'نانو تکنولوژی', 'سیستم‌های انرژی', 'مکاترونیک', 'پردازش تصویر', 
          'داده‌کاوی', 'شیمی آلی', 'فیزیک حالت جامد', 'بتن و مصالح', 'هیدرولیک', 
          'ژنتیک مولکولی', 'میکروبیولوژی', 'روانشناسی شناختی', 'معماری دیجیتال', 'هوافضا'
      ];
      const supervisors = ['دکتر محمدی', 'دکتر احمدی', 'دکتر کریمی', 'دکتر حسینی', 'دکتر رضایی'];
      const buildings = ['خوارزمی', 'ابن‌سینا', 'فارابی', 'رازی', 'بوعلی'];

      for (let i = 0; i < names.length; i++) {
          generated.push({
              id: `lab-${i}`,
              name: `آزمایشگاه ${names[i]}`,
              supervisor: supervisors[i % supervisors.length],
              location: `ساختمان ${buildings[i % buildings.length]}، طبقه ${Math.floor(Math.random() * 4) + 1}`,
              capacity: Math.floor(Math.random() * 15) + 5,
              status: Math.random() > 0.3 ? 'Open' : Math.random() > 0.5 ? 'Full' : 'Maintenance',
              image: `https://picsum.photos/seed/lab${i}/300/200`
          });
      }
      return generated as Lab[];
  }, []);

  const aiTools = [
      { name: 'Consensus', cat: 'Search', desc: 'موتور جستجوی هوشمند که به سوالات شما با رفرنس به مقالات علمی پاسخ می‌دهد.', icon: Search },
      { name: 'Semantic Scholar', cat: 'Search', desc: 'پلتفرم رایگان و قدرتمند برای جستجوی مقالات با درک معنایی.', icon: Search },
      { name: 'Elicit', cat: 'Search', desc: 'دستیار پژوهشی که مقالات مرتبط را پیدا کرده و خلاصه می‌کند.', icon: Bot },
      { name: 'Scite.ai', cat: 'Search', desc: 'بررسی ارجاعات مقالات (آیا مقاله تایید شده یا رد شده است).', icon: Quote },
      { name: 'Jenni AI', cat: 'Writing', desc: 'دستیار نوشتن مقاله که جملات بعدی را پیشنهاد می‌دهد.', icon: PenTool },
      { name: 'Quillbot', cat: 'Writing', desc: 'بهترین ابزار برای پارافریز (Paraphrase) و تغییر ساختار جملات.', icon: FileText },
      { name: 'Paperpal', cat: 'Writing', desc: 'ویرایشگر گرامری و زبانی مخصوص متون آکادمیک.', icon: Check },
      { name: 'ChatGPT / Claude', cat: 'General', desc: 'مدل‌های زبانی بزرگ برای ایده‌پردازی، خلاصه کردن و ویرایش.', icon: Bot },
  ];

  const databases = [
      { name: 'ScienceDirect (Elsevier)', url: 'sciencedirect.com', type: 'International' },
      { name: 'IEEE Xplore', url: 'ieeexplore.ieee.org', type: 'Engineering' },
      { name: 'PubMed', url: 'pubmed.ncbi.nlm.nih.gov', type: 'Medical' },
      { name: 'Springer Link', url: 'link.springer.com', type: 'International' },
      { name: 'Google Scholar', url: 'scholar.google.com', type: 'Search' },
      { name: 'SID.ir', url: 'sid.ir', type: 'Iranian' },
      { name: 'Civilica', url: 'civilica.com', type: 'Iranian' },
      { name: 'Magiran', url: 'magiran.com', type: 'Iranian' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">پژوهش و ابزارهای هوشمند</h2>
          <p className="text-slate-500">آزمایشگاه‌ها، هوش مصنوعی‌های مقاله‌نویسی و منابع معتبر</p>
        </div>
        
        {/* Tabs */}
        <div className="bg-white p-1 rounded-xl border border-slate-200 flex flex-wrap gap-1">
          <button 
            onClick={() => setActiveTab('resources')}
            className={`px-4 md:px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'resources' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
          >
            هوش مصنوعی و منابع
          </button>
          <button 
            onClick={() => setActiveTab('labs')}
            className={`px-4 md:px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'labs' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
          >
            آزمایشگاه‌ها
          </button>
          <button 
            onClick={() => setActiveTab('tools')}
            className={`px-4 md:px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'tools' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
          >
            ابزارهای کاربردی
          </button>
        </div>
      </div>

      {activeTab === 'resources' && (
          <div className="space-y-8">
              {/* AI Tools Section */}
              <section>
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <Bot className="w-6 h-6 text-emerald-600" />
                      هوش مصنوعی‌های پژوهشی (مقاله نویسی و جستجو)
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {aiTools.map((tool, i) => (
                          <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group cursor-pointer">
                              <div className="flex justify-between items-start mb-3">
                                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                      <tool.icon className="w-6 h-6" />
                                  </div>
                                  <span className={`text-[10px] px-2 py-1 rounded-lg font-bold ${tool.cat === 'Writing' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                                      {tool.cat === 'Writing' ? 'نوشتار' : 'جستجو'}
                                  </span>
                              </div>
                              <h4 className="font-bold text-slate-800 mb-2">{tool.name}</h4>
                              <p className="text-xs text-slate-500 leading-relaxed">{tool.desc}</p>
                          </div>
                      ))}
                  </div>
              </section>

              {/* Databases Section */}
              <section>
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <Database className="w-6 h-6 text-blue-600" />
                      وب‌سایت‌ها و منابع معتبر مقاله
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {databases.map((db, i) => (
                          <a href={`https://${db.url}`} target="_blank" rel="noreferrer" key={i} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-300 transition-all group">
                              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                                  <Globe className="w-5 h-5" />
                              </div>
                              <div className="flex-1 overflow-hidden">
                                  <h4 className="font-bold text-sm text-slate-800 truncate">{db.name}</h4>
                                  <span className="text-[10px] text-slate-400 block truncate">{db.url}</span>
                              </div>
                              <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
                          </a>
                      ))}
                  </div>
              </section>
          </div>
      )}

      {activeTab === 'labs' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {labs.map((lab) => (
            <div key={lab.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all group">
              <div className="relative h-48">
                <img src={lab.image} alt={lab.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                  lab.status === 'Open' ? 'bg-emerald-100 text-emerald-700' : 
                  lab.status === 'Full' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {lab.status === 'Open' ? 'قابل رزرو' : lab.status === 'Full' ? 'تکمیل' : 'تعمیرات'}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-slate-800 mb-2 line-clamp-1">{lab.name}</h3>
                <div className="space-y-2 text-sm text-slate-500 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-500" />
                    <span>مسئول: {lab.supervisor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Map className="w-4 h-4 text-emerald-500" />
                    <span>{lab.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-500" />
                    <span>ظرفیت: {lab.capacity} نفر</span>
                  </div>
                </div>
                <button 
                  disabled={lab.status !== 'Open'}
                  className="w-full py-3 bg-slate-50 text-slate-700 rounded-xl font-bold hover:bg-emerald-600 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  {lab.status === 'Open' ? 'رزرو نوبت' : 'غیرفعال'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'tools' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Research Tool Cards */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-[2rem] border border-indigo-100 hover:shadow-md transition-all cursor-pointer">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-indigo-600">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">دستیار جستجوی مقاله</h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              جستجوی هوشمند در Google Scholar و IEEE. مقالات مرتبط با موضوع پروژه‌ات رو سریع پیدا کن.
            </p>
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors">
              شروع جستجو
            </button>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-[2rem] border border-emerald-100 hover:shadow-md transition-all cursor-pointer">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-emerald-600">
              <Quote className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">رفرنس‌دهی خودکار</h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              تولید رفرنس با فرمت‌های APA, IEEE و MLA فقط با وارد کردن لینک مقاله.
            </p>
            <button className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-colors">
              ایجاد رفرنس
            </button>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-[2rem] border border-amber-100 hover:shadow-md transition-all cursor-pointer md:col-span-2">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-amber-600 shrink-0">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">پارافریز هوشمند متن (Paraphraser)</h3>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                  متن مقاله رو وارد کن تا با کمک هوش مصنوعی بازنویسی بشه و درصد همانندجویی (Plagiarism) پایین بیاد.
                </p>
                <button className="px-6 py-2 bg-amber-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-amber-200 hover:bg-amber-700 transition-colors">
                  ابزار بازنویسی
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Research;
