
import React, { useState } from 'react';
import { Globe, CreditCard, GraduationCap, Utensils, Monitor, Plane, FileText, Building, ExternalLink, MessageSquare, Send, X, ShieldCheck, User, HelpCircle, Search, ChevronDown, ChevronUp, Wifi, Clock, MapPin, Key } from 'lucide-react';

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'services' | 'faq'>('services');
  const [showMsgModal, setShowMsgModal] = useState(false);
  const [msgText, setMsgText] = useState('');
  const [isSending, setIsSending] = useState(false);

  // FAQ State
  const [faqSearch, setFaqSearch] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const services = [
    { title: 'سامانه گلستان', desc: 'انتخاب واحد، نمرات و امور آموزشی', icon: Globe, color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
    { title: 'سامانه سجاد', desc: 'امور کنسولی، کمیسیون و دانشنامه', icon: FileText, color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' },
    { title: 'صندوق رفاه', desc: 'درخواست وام و پرداخت اقساط', icon: CreditCard, color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' },
    { title: 'رزرو تغذیه', desc: 'سامانه کالینان / جت', icon: Utensils, color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' },
    { title: 'آموزش مجازی (LMS)', desc: 'کلاس‌های آنلاین و آزمون‌ها', icon: Monitor, color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' },
    { title: 'خروج از کشور', desc: 'سامانه سقا و نظام وظیفه', icon: Plane, color: 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400' },
    { title: 'آموزش مجازی نهاد', desc: 'دروس معارف و گواهی‌نامه', icon: GraduationCap, color: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' },
    { title: 'امور دانشجویان', desc: 'نقل و انتقالات و میهمانی', icon: Building, color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' },
  ];

  const faqs = [
    { 
      id: 1, 
      q: 'رمز وای‌فای دانشگاه چیه؟', 
      a: 'نام کاربری: شماره دانشجویی | رمز عبور: کدملی. شبکه: Uni-Student. اگر وصل نشد، یکبار forget network بزنید.',
      icon: Wifi
    },
    { 
      id: 2, 
      q: 'سلف مرکزی کجاست؟', 
      a: 'ضلع جنوبی دانشگاه، جنب ساختمان مسجد. ساعت توزیع ناهار: ۱۱:۳۰ تا ۱۳:۳۰ است.',
      icon: MapPin
    },
    { 
      id: 3, 
      q: 'ساعت کاری آموزش کل؟', 
      a: 'شنبه تا چهارشنبه از ساعت ۸:۰۰ صبح تا ۱۴:۰۰ ظهر. پنج‌شنبه‌ها بخش اداری تعطیل است.',
      icon: Clock
    },
    { 
      id: 4, 
      q: 'رمز سامانه گلستان رو فراموش کردم!', 
      a: 'باید حضوری به "اداره خدمات آموزشی" در ساختمان مرکزی مراجعه کنید تا ریست شود. تلفنی انجام نمی‌شود.',
      icon: Key
    },
    { 
      id: 5, 
      q: 'چطور وام دانشجویی بگیرم؟', 
      a: 'ابتدا در سامانه صندوق رفاه (refah.swf.ir) پرونده تشکیل دهید، سپس مدارک ضامن را به اداره امور دانشجویی تحویل دهید.',
      icon: CreditCard
    },
    { 
      id: 6, 
      q: 'کتابخانه تا چه ساعتی بازه؟', 
      a: 'شنبه تا چهارشنبه: ۸ تا ۱۸ | پنج‌شنبه: ۸ تا ۱۲ | ایام امتحانات: تا ساعت ۲۰:۰۰ باز است.',
      icon: Clock
    },
    { 
      id: 7, 
      q: 'شماره تماس حراست؟', 
      a: 'شماره داخلی: ۲۰۲۰ | شماره مستقیم: ۰۲۱-۸۸۸۸۰۰۰۰ (فقط برای موارد ضروری).',
      icon: ShieldCheck
    },
    { 
        id: 8, 
        q: 'اتوبوس دانشگاه کی حرکت میکنه؟', 
        a: 'سرویس‌ها راس ساعت ۷:۳۰، ۸:۳۰ و ۹:۳۰ از میدان اصلی شهر به سمت دانشگاه حرکت می‌کنند.',
        icon: Plane
      }
  ];

  const filteredFaqs = faqs.filter(f => f.q.includes(faqSearch));

  const handleSendMsg = () => {
      if(!msgText.trim()) return;
      setIsSending(true);
      setTimeout(() => {
          setIsSending(false);
          setMsgText('');
          setShowMsgModal(false);
          alert('پیام شما با موفقیت به صورت ناشناس ارسال شد.');
      }, 1500);
  };

  return (
    <div className="space-y-8 relative animate-in fade-in">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-black mb-4 flex items-center gap-3">
            <Globe className="w-8 h-8 text-blue-400" />
            میز خدمت و راهنما
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            دسترسی سریع به سامانه‌ها و پاسخ به سوالات متداول شما.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button 
          onClick={() => setActiveTab('services')}
          className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'services' ? 'bg-slate-800 dark:bg-slate-700 text-white shadow-lg' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
        >
          <Monitor className="w-5 h-5" />
          سامانه‌های الکترونیک
        </button>
        <button 
          onClick={() => setActiveTab('faq')}
          className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'faq' ? 'bg-slate-800 dark:bg-slate-700 text-white shadow-lg' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
        >
          <HelpCircle className="w-5 h-5" />
          سوالات متداول (FAQ)
        </button>
      </div>

      {activeTab === 'services' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in slide-in-from-bottom-4">
            {services.map((service, i) => (
            <a key={i} href="#" className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col justify-between h-48">
                <div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${service.color}`}>
                    <service.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-2">{service.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{service.desc}</p>
                </div>
                <div className="flex justify-end">
                <ExternalLink className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                </div>
            </a>
            ))}

            {/* Anonymous Message Card */}
            <button 
                onClick={() => setShowMsgModal(true)}
                className="bg-slate-800 dark:bg-slate-950 p-6 rounded-3xl shadow-lg border border-slate-700 dark:border-slate-900 hover:bg-slate-900 dark:hover:bg-black hover:-translate-y-1 transition-all group flex flex-col justify-between h-48 text-right"
            >
                <div>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-slate-700 dark:bg-slate-800 text-white">
                    <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-white mb-2">پیام ناشناس به ادمین</h3>
                <p className="text-xs text-slate-400">انتقادات، پیشنهادات و گزارش مشکلات به صورت کاملاً محرمانه.</p>
                </div>
                <div className="flex justify-end">
                <ShieldCheck className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-emerald-400 transition-colors" />
                </div>
            </button>
        </div>
      )}

      {activeTab === 'faq' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-bottom-4">
              <div className="relative">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    value={faqSearch}
                    onChange={(e) => setFaqSearch(e.target.value)}
                    placeholder="جستجو در سوالات (مثلاً: وای‌فای، وام، غذا)..."
                    className="w-full pr-12 pl-4 py-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm focus:ring-2 focus:ring-slate-500 outline-none text-slate-900 dark:text-slate-100"
                  />
              </div>

              <div className="space-y-3">
                  {filteredFaqs.length > 0 ? filteredFaqs.map((faq) => (
                      <div key={faq.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all">
                          <button 
                            onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                            className="w-full flex items-center justify-between p-5 text-right bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                          >
                              <div className="flex items-center gap-4">
                                  <div className={`p-2 rounded-xl ${expandedFaq === faq.id ? 'bg-slate-800 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                                      <faq.icon className="w-5 h-5" />
                                  </div>
                                  <span className={`font-bold ${expandedFaq === faq.id ? 'text-slate-800 dark:text-slate-100' : 'text-slate-600 dark:text-slate-400'}`}>{faq.q}</span>
                              </div>
                              {expandedFaq === faq.id ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                          </button>
                          
                          {expandedFaq === faq.id && (
                              <div className="px-5 pb-5 pt-0 bg-white dark:bg-slate-900">
                                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm text-slate-700 dark:text-slate-300 leading-relaxed border-r-4 border-slate-800 dark:border-slate-600">
                                      {faq.a}
                                  </div>
                              </div>
                          )}
                      </div>
                  )) : (
                      <div className="text-center py-10 text-slate-400">
                          <HelpCircle className="w-12 h-12 mx-auto mb-2 opacity-20" />
                          <p>سوالی با این عنوان یافت نشد.</p>
                      </div>
                  )}
              </div>
          </div>
      )}

      {/* Anonymous Message Modal */}
      {showMsgModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-lg p-8 relative shadow-2xl animate-in zoom-in-95">
                  <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                      <div className="flex items-center gap-3">
                          <div className="p-3 bg-slate-800 text-white rounded-xl">
                              <User className="w-6 h-6" />
                          </div>
                          <div>
                              <h3 className="font-black text-xl text-slate-800 dark:text-slate-100">ارسال پیام ناشناس</h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400">هویت شما محفوظ می‌ماند</p>
                          </div>
                      </div>
                      <button onClick={() => setShowMsgModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                          <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                      </button>
                  </div>

                  <div className="space-y-4">
                      <textarea 
                        value={msgText}
                        onChange={(e) => setMsgText(e.target.value)}
                        placeholder="پیام خود را اینجا بنویسید..."
                        className="w-full h-40 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-slate-500 resize-none text-slate-700 dark:text-slate-200"
                      ></textarea>
                      
                      <button 
                        onClick={handleSendMsg}
                        disabled={isSending || !msgText.trim()}
                        className="w-full py-4 bg-slate-800 dark:bg-slate-700 text-white rounded-2xl font-bold hover:bg-slate-900 dark:hover:bg-slate-600 transition-all flex items-center justify-center gap-2 disabled:bg-slate-300 dark:disabled:bg-slate-800"
                      >
                          {isSending ? 'در حال ارسال...' : (
                              <>
                                <span>ارسال محرمانه</span>
                                <Send className="w-4 h-4" />
                              </>
                          )}
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default Services;
