
import React, { useState, useMemo } from 'react';
import { 
  Link as LinkIcon, 
  Users, 
  Book, 
  Music, 
  ExternalLink, 
  Download, 
  Briefcase, 
  GraduationCap, 
  Linkedin, 
  Mail, 
  Search, 
  Car, 
  MapPin, 
  Clock, 
  Phone, 
  AlertCircle, 
  Tag, 
  PlusCircle, 
  Ticket, 
  QrCode, 
  Calendar, 
  Check, 
  X, 
  MessageCircle, 
  Instagram, 
  Send,
  Newspaper,
  UserPlus,
  Heart,
  HandCoins,
  TrendingUp,
  Gift
} from 'lucide-react';

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'links' | 'events' | 'magazines' | 'alumni' | 'carpool' | 'lostfound' | 'charity'>('charity');
  const [linkSearch, setLinkSearch] = useState('');
  
  // Events State
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);

  // --- DATA: LINKDONI ---
  const linkGroups = useMemo(() => [
    { 
      id: 1, 
      title: 'انجمن علمی کامپیوتر (SSC)', 
      cat: 'Scientific', 
      desc: 'اطلاع‌رسانی رویدادها، دوره‌ها و اخبار دانشکده کامپیوتر.',
      links: { telegram: 'ssc_public', instagram: 'ssc_official', eitaa: 'ssc_uni' }
    },
    { 
      id: 2, 
      title: 'کانون موسیقی', 
      cat: 'Cultural', 
      desc: 'گردهمایی نوازندگان و برگزاری کنسرت‌های دانشجویی.',
      links: { telegram: 'music_club', instagram: 'music_uni', eitaa: '' }
    },
    { 
      id: 3, 
      title: 'گروه درسی ریاضی ۱ - دکتر رضایی', 
      cat: 'Study', 
      desc: 'رفع اشکال، هماهنگی تمرین‌ها و اطلاع‌رسانی کلاس.',
      links: { telegram: 'math1_rezaei', instagram: '', eitaa: 'math1_group' }
    },
    { 
      id: 4, 
      title: 'شورای صنفی دانشجویان', 
      cat: 'General', 
      desc: 'پیگیری مطالبات صنفی، تغذیه و خوابگاه.',
      links: { telegram: 'senfi_sharif', instagram: 'senfi_sh', eitaa: 'senfi_official' }
    },
    { 
      id: 5, 
      title: 'خوابگاه شهید همت (چت عمومی)', 
      cat: 'Dorm', 
      desc: 'هماهنگی ساکنین خوابگاه، خرید و فروش و اطلاع‌رسانی.',
      links: { telegram: 'hemat_dorm', instagram: '', eitaa: '' }
    },
    { 
      id: 6, 
      title: 'بسیج دانشجویی', 
      cat: 'Cultural', 
      desc: 'برگزاری اردوهای جهادی و مراسمات مذهبی.',
      links: { telegram: 'basij_uni', instagram: 'basij_gram', eitaa: 'basij_channel' }
    },
    { 
      id: 7, 
      title: 'گروه جزوه و کتاب دست‌دوم', 
      cat: 'General', 
      desc: 'تبادل و خرید و فروش کتاب‌های درسی.',
      links: { telegram: 'uni_books', instagram: '', eitaa: 'uni_market' }
    },
    { 
      id: 8, 
      title: 'انجمن علمی برق (Resana)', 
      cat: 'Scientific', 
      desc: 'اخبار و رویدادهای دانشکده مهندسی برق.',
      links: { telegram: 'resana_ee', instagram: 'resana_ee', eitaa: '' }
    },
  ], []);

  const filteredLinks = linkGroups.filter(g => g.title.includes(linkSearch) || g.desc.includes(linkSearch));

  // --- DATA: MAGAZINES ---
  const magazines = [
      { id: 1, title: 'تکانه', issue: 'شماره ۴۲ - هوش مصنوعی', date: 'دی ۱۴۰۲', publisher: 'انجمن علمی مکانیک', coverColor: 'bg-indigo-600', downloadLink: '#' },
      { id: 2, title: 'رویش', issue: 'شماره ۱۸ - ویژه شب یلدا', date: 'آذر ۱۴۰۲', publisher: 'کانون شعر و ادب', coverColor: 'bg-rose-600', downloadLink: '#' },
      { id: 3, title: 'صفر و یک', issue: 'شماره ۱۰ - بلاکچین', date: 'آبان ۱۴۰۲', publisher: 'انجمن کامپیوتر', coverColor: 'bg-blue-600', downloadLink: '#' },
      { id: 4, title: 'عمران‌نامه', issue: 'شماره ۵ - سازه‌های نوین', date: 'مهر ۱۴۰۲', publisher: 'انجمن عمران', coverColor: 'bg-orange-500', downloadLink: '#' },
  ];
  
  // --- DATA: ALUMNI ---
  const alumni = [
      { id: 1, name: 'علی احمدی', major: 'مهندسی کامپیوتر', job: 'Senior AI Engineer', company: 'Google', year: 'ورودی ۹۵', image: 'https://picsum.photos/seed/a1/100' },
      { id: 2, name: 'سارا رضایی', major: 'مهندسی صنایع', job: 'Product Manager', company: 'Snapp', year: 'ورودی ۹۶', image: 'https://picsum.photos/seed/a2/100' },
      { id: 3, name: 'محمد کاظمی', major: 'مهندسی برق', job: 'Hardware Designer', company: 'Apple', year: 'ورودی ۹۴', image: 'https://picsum.photos/seed/a3/100' },
      { id: 4, name: 'نیلوفر حسینی', major: 'MBA', job: 'HR Specialist', company: 'Digikala', year: 'ورودی ۹۸', image: 'https://picsum.photos/seed/a4/100' },
      { id: 5, name: 'رضا طاهری', major: 'مهندسی مکانیک', job: 'Energy Consultant', company: 'Mapna', year: 'ورودی ۹۳', image: 'https://picsum.photos/seed/a5/100' },
      { id: 6, name: 'مریم نوری', major: 'علوم کامپیوتر', job: 'Data Scientist', company: 'Cafe Bazaar', year: 'ورودی ۹۷', image: 'https://picsum.photos/seed/a6/100' },
  ];

  // --- DATA: EVENTS ---
  const events = [
      { id: 1, title: 'اکران فیلم سینمایی "میان‌ستاره‌ای"', type: 'Movie', date: '۴ دی', time: '۱۸:۰۰', loc: 'آمفی‌تئاتر مرکزی', price: '۱۵,۰۰۰ تومان', image: 'https://picsum.photos/seed/movie/300/200' },
      { id: 2, title: 'همایش "مسیر آینده"', type: 'Seminar', date: '۷ دی', time: '۱۰:۰۰', loc: 'تالار ابن‌سینا', price: 'رایگان', image: 'https://picsum.photos/seed/sem/300/200' },
      { id: 3, title: 'کنسرت موسیقی سنتی', type: 'Concert', date: '۱۰ دی', time: '۱۹:۰۰', loc: 'سالن همایش‌ها', price: '۵۰,۰۰۰ تومان', image: 'https://picsum.photos/seed/music/300/200' },
  ];

  // --- DATA: Carpool ---
  const carpoolRides = useMemo(() => [
      { id: 1, from: 'خوابگاه', to: 'تهران (ترمینال غرب)', date: 'چهارشنبه ۱۴:۰۰', price: '۱۵۰,۰۰۰', car: 'پژو ۲۰۶', seats: 2, driver: 'علی محمدی' },
      { id: 2, from: 'دانشگاه', to: 'کرج (پل فردیس)', date: 'پنج‌شنبه ۰۸:۰۰', price: '۱۰۰,۰۰۰', car: 'سمند', seats: 3, driver: 'رضا کاظمی' },
      { id: 3, from: 'میدان آزادی', to: 'قم', date: 'جمعه ۱۶:۰۰', price: '۲۰۰,۰۰۰', car: 'پراید', seats: 1, driver: 'حسین رضایی' },
  ], []);

  // --- DATA: Lost & Found ---
  const lostItems = useMemo(() => [
      { id: 1, title: 'کارت دانشجویی', type: 'Found', location: 'سلف مرکزی', date: 'دیروز', image: 'https://picsum.photos/seed/card/200', contact: '0912...' },
      { id: 2, title: 'هندزفری سامسونگ', type: 'Lost', location: 'کلاس ۳۰۲', date: 'امروز', image: 'https://picsum.photos/seed/buds/200', contact: '0935...' },
      { id: 3, title: 'جزوه ریاضی ۱', type: 'Found', location: 'نیمکت‌های محوطه', date: '۲ روز پیش', image: 'https://picsum.photos/seed/book/200', contact: '0910...' },
  ], []);

  // --- DATA: Charity Campaigns ---
  const charityCampaigns = useMemo(() => [
      {
          id: 1,
          title: 'تامین هزینه جراحی دانشجوی نیازمند',
          desc: 'یکی از دانشجویان دانشکده فنی جهت عمل جراحی فوری نیاز به حمایت مالی دارد. تمام مدارک پزشکی توسط دانشگاه تایید شده است.',
          target: 150000000,
          current: 85000000,
          contributors: 124,
          urgent: true,
          image: 'https://picsum.photos/seed/med/400/200'
      },
      {
          id: 2,
          title: 'تهیه ارزاق ماهانه خوابگاه',
          desc: 'توزیع بسته‌های مواد غذایی بین دانشجویان متاهل خوابگاهی که دچار مشکلات مالی هستند.',
          target: 50000000,
          current: 42000000,
          contributors: 89,
          urgent: false,
          image: 'https://picsum.photos/seed/food/400/200'
      },
      {
          id: 3,
          title: 'خرید عینک طبی',
          desc: 'کمک به خرید عینک برای دانشجوی ورودی جدید.',
          target: 2000000,
          current: 500000,
          contributors: 12,
          urgent: false,
          image: 'https://picsum.photos/seed/glasses/400/200'
      }
  ], []);

  const handleBuyTicket = (event: any) => {
      setSelectedEvent(event);
      setShowTicketModal(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-10">
      <div className="text-center py-8 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800">
        <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-2">جامعه دانشجویی</h2>
        <p className="text-slate-500 dark:text-slate-400">لینکدونی، خیریه، هم‌سفری و شبکه فارغ‌التحصیلان</p>
      </div>

      <div className="flex justify-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
         <button onClick={() => setActiveTab('charity')} className={`px-6 py-2 font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === 'charity' ? 'text-rose-600 border-b-2 border-rose-600' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}><Heart className="w-4 h-4"/> خیریه</button>
         <button onClick={() => setActiveTab('links')} className={`px-6 py-2 font-bold whitespace-nowrap transition-colors ${activeTab === 'links' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}>لینکدونی</button>
         <button onClick={() => setActiveTab('events')} className={`px-6 py-2 font-bold whitespace-nowrap transition-colors ${activeTab === 'events' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}>رویدادها</button>
         <button onClick={() => setActiveTab('carpool')} className={`px-6 py-2 font-bold whitespace-nowrap transition-colors ${activeTab === 'carpool' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}>هم‌سفری</button>
         <button onClick={() => setActiveTab('lostfound')} className={`px-6 py-2 font-bold whitespace-nowrap transition-colors ${activeTab === 'lostfound' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}>اشیاء گم‌شده</button>
         <button onClick={() => setActiveTab('magazines')} className={`px-6 py-2 font-bold whitespace-nowrap transition-colors ${activeTab === 'magazines' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}>نشریات</button>
         <button onClick={() => setActiveTab('alumni')} className={`px-6 py-2 font-bold whitespace-nowrap transition-colors ${activeTab === 'alumni' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}>فارغ‌التحصیلان</button>
      </div>

      {/* --- CHARITY TAB --- */}
      {activeTab === 'charity' && (
          <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in">
              <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                      <div className="relative z-10">
                          <h3 className="text-2xl font-black mb-2 flex items-center gap-2">
                              <HandCoins className="w-8 h-8" />
                              صندوق همیاری دانشجویی
                          </h3>
                          <p className="opacity-90 mb-6">
                              با مبالغ کوچک، گره‌های بزرگ باز می‌کنیم. تمام کمک‌ها مستقیماً و با نظارت دانشگاه به دست دانشجویان نیازمند می‌رسد.
                          </p>
                          <div className="flex gap-4">
                              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 flex-1 text-center">
                                  <span className="block text-2xl font-black">۴۲</span>
                                  <span className="text-xs opacity-80">پرونده موفق</span>
                              </div>
                              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 flex-1 text-center">
                                  <span className="block text-2xl font-black">۳.۵+</span>
                                  <span className="text-xs opacity-80">میلیارد ریال کمک</span>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-center items-center text-center">
                      <div className="w-16 h-16 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mb-4">
                          <Gift className="w-8 h-8" />
                      </div>
                      <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg mb-2">درخواست حمایت</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-xs">
                          اگر خودتان یا دوستانتان دانشجو هستید و نیاز به حمایت مالی فوری دارید، به صورت محرمانه درخواست دهید.
                      </p>
                      <button className="px-6 py-3 border-2 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 rounded-xl font-bold hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors">
                          ثبت درخواست محرمانه
                      </button>
                  </div>
              </div>

              <div className="space-y-6">
                  <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      کمپین‌های فعال
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {charityCampaigns.map(camp => {
                          const percent = Math.min(100, Math.round((camp.current / camp.target) * 100));
                          return (
                              <div key={camp.id} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all group flex flex-col">
                                  <div className="relative h-48">
                                      <img src={camp.image} alt={camp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                                      {camp.urgent && (
                                          <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md animate-pulse">
                                              فوری
                                          </div>
                                      )}
                                  </div>
                                  <div className="p-6 flex-1 flex flex-col">
                                      <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">{camp.title}</h4>
                                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed flex-grow">{camp.desc}</p>
                                      
                                      <div className="mb-4">
                                          <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300 mb-2">
                                              <span>{camp.current.toLocaleString()} ریال</span>
                                              <span>{percent}%</span>
                                          </div>
                                          <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                              <div className="h-full bg-rose-500 rounded-full" style={{ width: `${percent}%` }}></div>
                                          </div>
                                          <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                                              <span>جمع‌آوری شده</span>
                                              <span>هدف: {camp.target.toLocaleString()}</span>
                                          </div>
                                      </div>

                                      <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                                          <div className="flex -space-x-2">
                                              {[...Array(3)].map((_, i) => (
                                                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500 dark:text-slate-300">
                                                      <Users className="w-4 h-4" />
                                                  </div>
                                              ))}
                                              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center text-[10px] font-bold text-rose-600 dark:text-rose-400">
                                                  +{camp.contributors}
                                              </div>
                                          </div>
                                          <button className="bg-rose-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200 dark:shadow-none">
                                              پرداخت کمک
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          );
                      })}
                  </div>
              </div>
          </div>
      )}

      {/* --- LINKS TAB (LINKDONI) --- */}
      {activeTab === 'links' && (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4 sticky top-4 z-10">
                <Search className="w-5 h-5 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="جستجو در کانال‌ها و گروه‌ها..." 
                    value={linkSearch}
                    onChange={(e) => setLinkSearch(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-slate-700 dark:text-slate-200"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {filteredLinks.map(group => (
                    <div key={group.id} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                                    group.cat === 'Scientific' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' :
                                    group.cat === 'Cultural' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400' :
                                    group.cat === 'Dorm' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' :
                                    group.cat === 'Study' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400'
                                }`}>
                                    {group.cat === 'Scientific' ? 'انجمن علمی' : group.cat === 'Cultural' ? 'کانون فرهنگی' : group.cat === 'Dorm' ? 'خوابگاه' : group.cat === 'Study' ? 'گروه درسی' : 'عمومی'}
                                </span>
                            </div>
                            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">{group.title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{group.desc}</p>
                        </div>
                        
                        <div className="flex gap-2 pt-4 border-t border-slate-50 dark:border-slate-800">
                            {group.links.telegram && (
                                <a href={`https://t.me/${group.links.telegram}`} target="_blank" rel="noreferrer" className="flex-1 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors font-bold text-xs">
                                    <Send className="w-4 h-4 -rotate-45" /> تلگرام
                                </a>
                            )}
                            {group.links.eitaa && (
                                <a href="#" className="flex-1 py-2 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors font-bold text-xs">
                                    <MessageCircle className="w-4 h-4" /> ایتا
                                </a>
                            )}
                            {group.links.instagram && (
                                <a href={`https://instagram.com/${group.links.instagram}`} target="_blank" rel="noreferrer" className="flex-1 py-2 bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-xl flex items-center justify-center gap-2 hover:bg-pink-100 dark:hover:bg-pink-900/50 transition-colors font-bold text-xs">
                                    <Instagram className="w-4 h-4" /> اینستا
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* --- MAGAZINES TAB --- */}
      {activeTab === 'magazines' && (
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in">
              {magazines.map(mag => (
                  <div key={mag.id} className="group relative bg-white dark:bg-slate-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-slate-200 dark:border-slate-800 aspect-[3/4]">
                      {/* Fake Magazine Cover Design */}
                      <div className={`absolute inset-0 ${mag.coverColor} opacity-90 transition-opacity group-hover:opacity-100`}></div>
                      <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
                          <div>
                              <div className="flex justify-between items-center mb-2 opacity-80">
                                  <Newspaper className="w-6 h-6" />
                                  <span className="text-xs font-mono font-bold">{mag.date}</span>
                              </div>
                              <h3 className="text-3xl font-black mb-1 font-display tracking-tight">{mag.title}</h3>
                              <p className="text-sm font-medium opacity-90">{mag.issue}</p>
                          </div>
                          
                          <div className="space-y-4">
                              <div className="h-px bg-white/30 w-full"></div>
                              <p className="text-xs opacity-90 line-clamp-3 leading-relaxed">
                                  صاحب امتیاز: {mag.publisher}. شامل مقالات تخصصی، مصاحبه با اساتید و طنز دانشجویی.
                              </p>
                              <button 
                                onClick={() => alert(`دانلود ${mag.title}`)}
                                className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-opacity-90 transition-colors shadow-lg"
                              >
                                  <Download className="w-4 h-4" /> دریافت فایل
                              </button>
                          </div>
                      </div>
                      {/* Glossy Effect */}
                      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/20 to-transparent pointer-events-none"></div>
                  </div>
              ))}
          </div>
      )}

      {/* --- ALUMNI TAB --- */}
      {activeTab === 'alumni' && (
          <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in">
              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                  <div>
                      <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                          <Briefcase className="w-6 h-6 text-emerald-400" />
                          شبکه فارغ‌التحصیلان
                      </h3>
                      <p className="text-slate-400 text-sm max-w-xl">
                          با قدیمی‌های دانشگاه که الان در شرکت‌های بزرگ مشغول به کار هستند ارتباط برقرار کنید و از تجربیات مسیر شغلی آن‌ها استفاده کنید.
                      </p>
                  </div>
                  <button className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 whitespace-nowrap">
                      <UserPlus className="w-5 h-5" />
                      ثبت‌نام به عنوان فارغ‌التحصیل
                  </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {alumni.map(person => (
                      <div key={person.id} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group flex flex-col items-center text-center relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-slate-50 dark:from-slate-800 to-white dark:to-slate-900 z-0"></div>
                          
                          <div className="relative z-10 w-24 h-24 rounded-full p-1 bg-white dark:bg-slate-900 shadow-md mb-4 group-hover:scale-110 transition-transform">
                              <img src={person.image} alt={person.name} className="w-full h-full rounded-full object-cover" />
                          </div>
                          
                          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 relative z-10">{person.name}</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1 relative z-10">{person.major} - {person.year}</p>
                          
                          <div className="my-4 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 w-full relative z-10">
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">موقعیت فعلی</p>
                              <p className="font-bold text-slate-800 dark:text-slate-200 text-sm dir-ltr">{person.job}</p>
                              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">@ {person.company}</p>
                          </div>

                          <button className="w-full py-2 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-xl font-bold text-sm hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-white transition-colors flex items-center justify-center gap-2 relative z-10">
                              <Linkedin className="w-4 h-4" />
                              ارتباط در لینکدین
                          </button>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {/* --- EVENTS & TICKETING --- */}
      {activeTab === 'events' && (
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">
              {events.map(event => (
                  <div key={event.id} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group flex flex-col">
                      <div className="relative h-48">
                          <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                          <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 px-3 py-1 rounded-full text-xs font-bold shadow-sm text-slate-800 dark:text-slate-200">
                              {event.type}
                          </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-2">{event.title}</h3>
                          <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                              <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-500"/> {event.date} - {event.time}</div>
                              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-red-500"/> {event.loc}</div>
                          </div>
                          
                          <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                              <span className="font-black text-slate-800 dark:text-slate-200">{event.price}</span>
                              <button 
                                onClick={() => handleBuyTicket(event)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
                              >
                                  <Ticket className="w-4 h-4"/>
                                  خرید بلیت
                              </button>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      )}

      {/* Ticket Modal */}
      {showTicketModal && selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-sm p-0 relative shadow-2xl overflow-hidden flex flex-col">
                  <div className="bg-slate-900 dark:bg-black text-white p-6 text-center relative">
                      <button onClick={() => setShowTicketModal(false)} className="absolute top-4 left-4 p-2 bg-white/10 rounded-full hover:bg-white/20"><X className="w-4 h-4"/></button>
                      <h3 className="font-bold text-lg mb-1">{selectedEvent.title}</h3>
                      <p className="text-slate-400 text-sm">{selectedEvent.loc}</p>
                  </div>
                  
                  <div className="p-8 flex flex-col items-center">
                      <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 mb-6">
                          <QrCode className="w-40 h-40 text-slate-800" />
                      </div>
                      <div className="w-full space-y-3 text-center">
                          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
                              <span>تاریخ:</span>
                              <span className="font-bold text-slate-800 dark:text-slate-200">{selectedEvent.date}</span>
                          </div>
                          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
                              <span>ساعت:</span>
                              <span className="font-bold text-slate-800 dark:text-slate-200">{selectedEvent.time}</span>
                          </div>
                          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
                              <span>صندلی:</span>
                              <span className="font-bold text-slate-800 dark:text-slate-200">ردیف ۴ - صندلی ۱۲</span>
                          </div>
                      </div>
                      <div className="mt-6 flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-xl">
                          <Check className="w-4 h-4"/>
                          پرداخت موفق
                      </div>
                  </div>
                  
                  {/* Ticket Tear Effect */}
                  <div className="relative h-4 bg-slate-100 dark:bg-slate-800 -mt-2">
                      <div className="absolute top-[-8px] left-[-8px] w-4 h-4 bg-slate-900 dark:bg-black rounded-full"></div>
                      <div className="absolute top-[-8px] right-[-8px] w-4 h-4 bg-slate-900 dark:bg-black rounded-full"></div>
                  </div>
              </div>
          </div>
      )}

      {/* --- CARPOOL TAB --- */}
      {activeTab === 'carpool' && (
          <div className="max-w-5xl mx-auto space-y-6">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-6 text-white flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                      <h3 className="text-xl font-bold flex items-center gap-2"><Car className="w-6 h-6"/> سامانه هم‌سفری</h3>
                      <p className="text-blue-100 text-sm mt-1">سفر ارزان‌تر و دوستانه‌تر به خانه! صندلی‌های خالی ماشینت رو به اشتراک بذار.</p>
                  </div>
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
                      <PlusCircle className="w-5 h-5"/>
                      ثبت سفر جدید
                  </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {carpoolRides.map(ride => (
                      <div key={ride.id} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
                          <div className="flex justify-between items-start mb-4 border-b border-slate-50 dark:border-slate-800 pb-3">
                              <div className="flex items-center gap-2">
                                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400">
                                      <Users className="w-5 h-5"/>
                                  </div>
                                  <div>
                                      <span className="font-bold text-slate-800 dark:text-slate-200 block text-sm">{ride.driver}</span>
                                      <span className="text-xs text-slate-400">{ride.car}</span>
                                  </div>
                              </div>
                              <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1 rounded-full">{ride.seats} صندلی خالی</span>
                          </div>
                          
                          <div className="space-y-3 mb-4">
                              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
                                  <Clock className="w-4 h-4 text-slate-400"/>
                                  <span className="font-bold">{ride.date}</span>
                              </div>
                              <div className="flex flex-col gap-1 relative pl-4 border-r-2 border-slate-200 dark:border-slate-700 mr-1.5">
                                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 relative -mr-2.5 flex items-center gap-2">
                                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div> {ride.from}
                                  </span>
                                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 relative -mr-2.5 flex items-center gap-2 mt-2">
                                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div> {ride.to}
                                  </span>
                              </div>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t border-slate-50 dark:border-slate-800">
                              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{ride.price} <span className="text-xs font-normal text-slate-400">تومان</span></span>
                              <button className="bg-slate-800 dark:bg-slate-700 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-900 dark:hover:bg-slate-600">رزرو صندلی</button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {/* --- LOST & FOUND TAB --- */}
      {activeTab === 'lostfound' && (
          <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div className="flex gap-2">
                      <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700">همه</button>
                      <button className="px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/50">گم‌شده‌ها</button>
                      <button className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl text-sm font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/50">پیداشده‌ها</button>
                  </div>
                  <button className="bg-slate-800 dark:bg-slate-700 text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-900 dark:hover:bg-slate-600">
                      <PlusCircle className="w-4 h-4"/> ثبت آگهی
                  </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {lostItems.map(item => (
                      <div key={item.id} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all">
                          <div className="relative h-40">
                              <img src={item.image} alt={item.title} className="w-full h-full object-cover"/>
                              <span className={`absolute top-3 right-3 px-3 py-1 rounded-lg text-xs font-bold shadow-sm ${item.type === 'Lost' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}>
                                  {item.type === 'Lost' ? 'گم‌شده' : 'پیداشده'}
                              </span>
                          </div>
                          <div className="p-4">
                              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">{item.title}</h4>
                              <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400 mb-4">
                                  <div className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {item.location}</div>
                                  <div className="flex items-center gap-1"><Clock className="w-3 h-3"/> {item.date}</div>
                              </div>
                              <button className="w-full py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                  <Phone className="w-3 h-3"/> تماس: {item.contact}
                              </button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}
    </div>
  );
};

export default Community;
