
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Hourglass, 
  Users, 
  Home, 
  MessageCircle, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2,
  BrainCircuit,
  HeartHandshake,
  Briefcase,
  X,
  BookOpen,
  AlertTriangle,
  ArrowRight,
  Quote,
  Lightbulb
} from 'lucide-react';

const SoftSkills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'time' | 'dorm' | 'social'>('time');
  const [selectedTopic, setSelectedTopic] = useState<any>(null);

  // Pomodoro State
  const [timerMode, setTimerMode] = useState<'focus' | 'break'>('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Optional: Play sound here
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(timerMode === 'focus' ? 25 * 60 : 5 * 60);
  };
  const switchMode = (mode: 'focus' | 'break') => {
    setTimerMode(mode);
    setIsActive(false);
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // --- DATA ---
  const dormTips = useMemo(() => [
    { 
      title: 'قانون یخچال', 
      desc: 'همیشه روی وسایل شخصی خود برچسب بزنید. غذای بقیه "تستر" ندارد!',
      stories: [
        {
          title: 'ماجرای کتلت‌های ناپدید شده',
          content: 'ترم دو بودیم که علی یک ظرف پر از کتلت مامان‌بزرگ‌پز رو گذاشت تو یخچال. فردا ظهر که اومد گرم کنه، دید ظرف خالیه! دعوای سختی بین بچه‌های اتاق در گرفت. هیچکس گردن نگرفت، ولی اعتماد بین بچه‌ها برای همیشه از بین رفت و تا آخر ترم جو اتاق سنگین بود. علی دیگه هیچوقت غذاشو تو یخچال نذاشت و همه‌مون بخاطر یه شکم‌گردی یواشکی، دوستی‌مون رو خراب کردیم.'
        }
      ]
    },
    { 
      title: 'تقسیم وظایف', 
      desc: 'جدول نظافت هفتگی معجزه می‌کند. هفته اول را سخت بگیرید تا عادت شود.',
      stories: [
        {
          title: 'اتاقی که بوی جوراب میداد',
          content: 'توی بلوک ۳ یه اتاقی بود که هیچوقت جارو نمیزدن. می‌گفتن "حالا بعداً". ظرف‌ها رو هم نوبتی نمی‌شستن و تلنبار می‌شد. آخر ترم، انقدر سوسک و مورچه جمع شده بود که مجبور شدن کل وسایلشون رو سمپاشی کنن و دو شب تو نمازخونه بخوابن. سرایدار هم جریمه‌شون کرد.'
        }
      ]
    },
    { 
      title: 'هدفون نویز کنسلینگ', 
      desc: 'سرمایه‌گذاری واجب! برای زمان‌هایی که هم‌اتاقی شما می‌خواهد فیلم ببیند و شما درس دارید.',
      stories: [
        {
          title: 'شب امتحان و فیلم ترسناک',
          content: 'رضا امتحان معادلات داشت و هم‌اتاقیش، کامیار، تازه فیلم ترسناک دانلود کرده بود. کامیار هدفون نداشت و صدای جیغ فیلم نمی‌ذاشت رضا تمرکز کنه. رضا از عصبانیت لپ‌تاپ کامیار رو بست و کار به درگیری فیزیکی کشید. رضا اون درس رو افتاد و کامیار هم با صورت کبود رفت خونه.'
        }
      ]
    },
    { 
      title: 'مدیریت مهمان', 
      desc: 'قبل از دعوت کردن دوستتان، حتماً از هم‌اتاقی‌ها اجازه بگیرید. خوابگاه حریم خصوصی مشترک است.',
      stories: [
        {
          title: 'مهمان ناخوانده‌ی یک هفته‌ای',
          content: 'یکی از بچه‌ها پسرخاله‌اش رو بدون هماهنگی آورد خوابگاه. قرار بود یه شب بمونه، ولی یک هفته موند! تمام خوراکی‌های بچه‌ها رو می‌خورد و با صدای بلند تلفن حرف می‌زد. آخر سر هم‌اتاقی‌ها به حراست گزارش دادن و اون دانشجو تعهد کتبی داد و ترم بعد خوابگاه بهش ندادن.'
        }
      ]
    },
    { 
      title: 'کلید یدک', 
      desc: 'کلید اتاق را به گردنتان آویزان کنید! پشت در ماندن با حوله اصلا جالب نیست.',
      stories: [
        {
            title: 'حبس در راهرو',
            content: 'سارا رفت دوش بگیره و یادش رفت کلید برداره. هم‌اتاقی‌هاش هم کلاس بودن. وقتی برگشت، در قفل شده بود. دو ساعت با حوله تو راهرو نشست تا یکی از بچه‌ها برگرده. از اون روز به بعد، کلیدش رو با کش مو به مچش می‌بست!'
        }
      ]
    }
  ], []);

  const socialSkills = useMemo(() => [
      {
          title: 'فن بیان و ارائه',
          desc: 'چطور در کنفرانس‌های کلاسی تپق نزنیم؟',
          stories: [
              {
                  title: 'دست‌های لرزان و صدای گرفته',
                  content: 'محمد دانشجوی زرنگی بود ولی از حرف زدن تو جمع وحشت داشت. روز دفاع پروژه، انقدر استرس داشت که صداش می‌لرزید و نتونست به سوالات استاد جواب بده. با اینکه کدش عالی بود، نمره ارائه رو از دست داد. بعد از اون کلاس فن بیان رفت و یاد گرفت قبل ارائه جلوی آینه تمرین کنه. الان توی یه شرکت بزرگ مدیر محصوله و هر روز جلسه داره.'
              }
          ]
      },
      {
          title: 'نِتورکینگ (شبکه‌سازی)',
          desc: 'دوستی‌های دانشگاه، سرمایه‌های شغلی آینده هستند.',
          stories: [
              {
                  title: 'نابغه تنها',
                  content: 'امید همیشه نمراتش ۲۰ بود اما با کسی حرف نمی‌زد و تو هیچ انجمنی نبود. بعد فارغ‌التحصیلی، دنبال کار می‌گشت ولی رزومه‌اش دیده نمی‌شد. هم‌کلاسیش که نمرات معمولی داشت ولی روابط عمومی بالایی داشت، مدیر فنی یه استارتاپ شده بود و تیمش رو از بچه‌های دانشگاه جمع کرده بود. امید فهمید که مدرک به تنهایی کافی نیست، معرف و شبکه مهمه.'
              }
          ]
      },
      {
          title: 'حل تعارض',
          desc: 'وقتی با کسی اختلاف نظر داریم، چطور دعوا نکنیم؟',
          stories: [
              {
                  title: 'جنگ ظرف‌های کثیف',
                  content: 'دو هم‌اتاقی سر شستن ظرف‌ها با هم قهر بودن. یکی داد می‌زد "تو شلخته‌ای" و اون یکی می‌گفت "تو وسواسی". کار به جایی رسید که وسایلشون رو جدا کردن. مشاور خوابگاه بهشون یاد داد به جای حمله به شخصیت هم، در مورد "رفتار" و "احساس" حرف بزنن. مثلاً: "وقتی ظرف‌ها می‌مونه، بوی بد منو اذیت می‌کنه". این تغییر لحن ساده، رابطه‌شون رو نجات داد.'
              }
          ]
      }
  ], []);

  // --- DETAIL VIEW ---
  if (selectedTopic) {
      return (
          <div className="animate-in slide-in-from-right-8 duration-300">
              <button 
                  onClick={() => setSelectedTopic(null)}
                  className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 transition-colors"
              >
                  <ArrowRight className="w-5 h-5" />
                  بازگشت به لیست
              </button>

              <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100">
                  <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-8 text-white relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl translate-x-10 -translate-y-10"></div>
                      <div className="relative z-10">
                          <span className="text-emerald-100 text-xs font-bold uppercase tracking-wider mb-2 block">داستان و تجربه واقعی</span>
                          <h2 className="text-3xl font-black mb-2">{selectedTopic.title}</h2>
                          <p className="opacity-90 text-lg">{selectedTopic.desc}</p>
                      </div>
                  </div>

                  <div className="p-8">
                      {selectedTopic.stories.map((story: any, idx: number) => (
                          <div key={idx} className="mb-8 last:mb-0">
                              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                  <BookOpen className="w-6 h-6 text-amber-500" />
                                  {story.title}
                              </h3>
                              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 leading-8 text-slate-700 text-justify relative">
                                  <Quote className="w-8 h-8 text-slate-200 absolute top-4 left-4" />
                                  {story.content}
                              </div>
                          </div>
                      ))}

                      <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 mt-8 flex gap-4 items-start">
                          <div className="bg-white p-2 rounded-xl text-emerald-600 shadow-sm shrink-0">
                              <Lightbulb className="w-6 h-6" />
                          </div>
                          <div>
                              <h4 className="font-bold text-emerald-800 mb-1">نتیجه اخلاقی</h4>
                              <p className="text-sm text-emerald-700 leading-relaxed">
                                  تجربه دیگران، سرمایه شماست. با رعایت همین نکات ساده، از تنش‌های بیهوده جلوگیری کنید و از دوران دانشجویی لذت ببرید.
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      );
  }

  // --- LIST VIEW ---
  return (
    <div className="space-y-8 animate-in fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
            <h1 className="text-3xl font-black mb-4 flex items-center gap-3">
                <BrainCircuit className="w-8 h-8" />
                مهارت‌های نرم و زندگی دانشجویی
            </h1>
            <p className="opacity-90 max-w-2xl text-lg">
                چیزهایی که در کلاس درس یاد نمی‌دهند: مدیریت زمان، زندگی در خوابگاه و ارتباط موثر.
            </p>
            </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-slate-200 pb-2 overflow-x-auto">
            <button onClick={() => setActiveTab('time')} className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'time' ? 'bg-teal-100 text-teal-700' : 'text-slate-500 hover:bg-slate-50'}`}>
                <Hourglass className="w-5 h-5" />
                مدیریت زمان (Pomodoro)
            </button>
            <button onClick={() => setActiveTab('dorm')} className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'dorm' ? 'bg-teal-100 text-teal-700' : 'text-slate-500 hover:bg-slate-50'}`}>
                <Home className="w-5 h-5" />
                فوت‌وفن خوابگاه
            </button>
            <button onClick={() => setActiveTab('social')} className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'social' ? 'bg-teal-100 text-teal-700' : 'text-slate-500 hover:bg-slate-50'}`}>
                <Users className="w-5 h-5" />
                ارتباطات و شبکه سازی
            </button>
        </div>

        {/* Content - Time Management */}
        {activeTab === 'time' && (
            <div className="max-w-md mx-auto bg-white p-8 rounded-[3rem] shadow-lg border border-slate-100 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-teal-500"></div>
                <h3 className="text-xl font-bold text-slate-800 mb-6">تکنیک پومودورو</h3>
                
                <div className="flex justify-center gap-4 mb-8">
                    <button onClick={() => switchMode('focus')} className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${timerMode === 'focus' ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-500'}`}>تمرکز (۲۵ دقیقه)</button>
                    <button onClick={() => switchMode('break')} className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${timerMode === 'break' ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500'}`}>استراحت (۵ دقیقه)</button>
                </div>

                <div className="text-7xl font-black text-slate-800 mb-8 font-mono tracking-widest">
                    {formatTime(timeLeft)}
                </div>

                <div className="flex justify-center gap-4">
                    <button onClick={toggleTimer} className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 ${isActive ? 'bg-amber-500 text-white' : 'bg-teal-600 text-white'}`}>
                        {isActive ? <Pause className="w-8 h-8 fill-white" /> : <Play className="w-8 h-8 fill-white ml-1" />}
                    </button>
                    <button onClick={resetTimer} className="w-16 h-16 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors">
                        <RotateCcw className="w-6 h-6" />
                    </button>
                </div>
                
                <p className="mt-8 text-sm text-slate-500 bg-slate-50 p-4 rounded-2xl">
                    {timerMode === 'focus' ? 'گوشی رو بذار کنار! فقط روی یک کار تمرکز کن.' : 'پاشو یه لیوان آب بخور و کش و قوس بیا.'}
                </p>
            </div>
        )}

        {/* Content - Dorm Life */}
        {activeTab === 'dorm' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dormTips.map((tip, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-800">{tip.title}</h3>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                            {tip.desc}
                        </p>
                        <button 
                            onClick={() => setSelectedTopic(tip)}
                            className="w-full py-3 bg-teal-50 text-teal-700 rounded-xl text-sm font-bold hover:bg-teal-100 transition-colors flex items-center justify-center gap-2"
                        >
                            خوندن داستان واقعی 👀
                        </button>
                    </div>
                ))}
            </div>
        )}

        {/* Content - Social Skills */}
        {activeTab === 'social' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {socialSkills.map((skill, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shrink-0">
                                {i === 0 ? <MessageCircle className="w-6 h-6" /> : i === 1 ? <HeartHandshake className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />}
                            </div>
                            <h3 className="font-bold text-lg text-slate-800">{skill.title}</h3>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                            {skill.desc}
                        </p>
                        <button 
                            onClick={() => setSelectedTopic(skill)}
                            className="w-full py-3 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2"
                        >
                            داستان عبرت‌آموز 📖
                        </button>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};

export default SoftSkills;
