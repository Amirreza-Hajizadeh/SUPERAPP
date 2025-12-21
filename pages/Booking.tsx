
import React, { useState } from 'react';
import { 
  CalendarCheck, 
  BedDouble, 
  Activity, 
  Stethoscope, 
  Upload, 
  Clock, 
  Utensils, 
  Download, 
  Coffee, 
  Bot, 
  Ticket, 
  TrendingUp, 
  Plus, 
  Trash2, 
  AlertCircle, 
  Search,
  LayoutTemplate,
  Palette,
  Check
} from 'lucide-react';

type MenuTheme = 'modern' | 'classic' | 'minimal';
type MenuColor = 'orange' | 'teal' | 'rose' | 'indigo';

const menuColors: Record<MenuColor, { primary: string, light: string, text: string, border: string, bg: string }> = {
    orange: { primary: 'bg-orange-600', light: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', bg: 'bg-orange-600' },
    teal: { primary: 'bg-teal-600', light: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', bg: 'bg-teal-600' },
    rose: { primary: 'bg-rose-600', light: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', bg: 'bg-rose-600' },
    indigo: { primary: 'bg-indigo-600', light: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', bg: 'bg-indigo-600' },
};

const Booking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dorm' | 'sports' | 'counseling' | 'nutrition'>('nutrition');
  const [nutritionSubTab, setNutritionSubTab] = useState<'plan' | 'auto' | 'market'>('plan');
  const [isDownloading, setIsDownloading] = useState(false);

  // --- Menu Appearance State ---
  const [menuTheme, setMenuTheme] = useState<MenuTheme>('modern');
  const [menuColor, setMenuColor] = useState<MenuColor>('orange');
  const currentColor = menuColors[menuColor];

  // --- States for Smart Reserve ---
  const [autoReserveEnabled, setAutoReserveEnabled] = useState(false);
  const [likedFoods, setLikedFoods] = useState<string[]>(['قرمه سبزی', 'جوجه کباب']);
  const [dislikedFoods, setDislikedFoods] = useState<string[]>(['خوراک بادمجان', 'ماهی']);
  const [newPreference, setNewPreference] = useState('');

  // --- States for Food Market ---
  const [marketTickets, setMarketTickets] = useState([
    { id: 1, food: 'زرشک پلو با مرغ', meal: 'ناهار امروز', price: '۱۲,۰۰۰', seller: 'علی مهدوی', time: '۱۲:۳۰ - ۱۴:۰۰' },
    { id: 2, food: 'چلو کباب کوبیده', meal: 'ناهار امروز', price: '۱۵,۰۰۰', seller: 'سارا رضایی', time: '۱۲:۳۰ - ۱۴:۰۰' },
    { id: 3, food: 'کوکو سبزی', meal: 'شام امشب', price: '۱۰,۰۰۰', seller: 'محمد کاظمی', time: '۱۸:۰۰ - ۱۹:۳۰' },
  ]);

  const handleDownloadMenu = () => {
    setIsDownloading(true);
    const element = document.getElementById('food-plan-preview');
    const opt = {
      margin: 0,
      filename: `Weekly-Food-Plan.pdf`,
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

  const handleAddPreference = (type: 'like' | 'dislike') => {
      if(!newPreference.trim()) return;
      if (type === 'like') setLikedFoods([...likedFoods, newPreference]);
      else setDislikedFoods([...dislikedFoods, newPreference]);
      setNewPreference('');
  };

  const foodPlan = [
      { day: 'شنبه', lunch: 'قرمه سبزی + ماست', dinner: 'خوراک لوبیا', price: '۱۰,۰۰۰' },
      { day: 'یکشنبه', lunch: 'زرشک پلو با مرغ', dinner: 'کوکو سبزی', price: '۱۲,۰۰۰' },
      { day: 'دوشنبه', lunch: 'قیمه بادمجان', dinner: 'ماکارونی', price: '۱۰,۰۰۰' },
      { day: 'سه‌شنبه', lunch: 'چلو کباب کوبیده', dinner: 'عدسی', price: '۱۵,۰۰۰' },
      { day: 'چهارشنبه', lunch: 'لوبیا پلو با گوشت', dinner: 'ناگت مرغ', price: '۱۱,۰۰۰' },
      { day: 'پنج‌شنبه', lunch: 'جوجه کباب', dinner: '---', price: '۱۵,۰۰۰' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-700 rounded-[2.5rem] p-8 text-white shadow-xl">
        <h1 className="text-3xl font-black mb-4 flex items-center gap-3">
          <CalendarCheck className="w-8 h-8" />
          رزرواسیون و خدمات رفاهی
        </h1>
        <p className="opacity-90 max-w-2xl text-lg">
          رزرو خوابگاه، استخر، سالن‌های ورزشی، تغذیه و وقت مشاوره روانشناسی.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 overflow-x-auto">
         {[
            { id: 'nutrition', label: 'تغذیه و رزرو', icon: Utensils },
            { id: 'dorm', label: 'امور خوابگاه', icon: BedDouble },
            { id: 'sports', label: 'اماکن ورزشی', icon: Activity },
            { id: 'counseling', label: 'مرکز مشاوره', icon: Stethoscope },
         ].map((item) => (
            <button 
               key={item.id}
               onClick={() => setActiveTab(item.id as any)}
               className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all flex-grow justify-center whitespace-nowrap ${
                  activeTab === item.id 
                  ? 'bg-teal-600 text-white shadow-lg' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
               }`}
            >
               <item.icon className="w-5 h-5" />
               {item.label}
            </button>
         ))}
      </div>

      {activeTab === 'nutrition' && (
         <div className="animate-in fade-in">
             {/* Nutrition Sub-Tabs */}
             <div className="flex justify-center mb-8">
                <div className="bg-orange-50 p-1 rounded-2xl flex border border-orange-100">
                    <button 
                        onClick={() => setNutritionSubTab('plan')}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${nutritionSubTab === 'plan' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500'}`}
                    >
                        <CalendarCheck className="w-4 h-4" />
                        برنامه هفتگی
                    </button>
                    <button 
                        onClick={() => setNutritionSubTab('auto')}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${nutritionSubTab === 'auto' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500'}`}
                    >
                        <Bot className="w-4 h-4" />
                        رزرو خودکار
                    </button>
                    <button 
                        onClick={() => setNutritionSubTab('market')}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${nutritionSubTab === 'market' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500'}`}
                    >
                        <Ticket className="w-4 h-4" />
                        بازارچه غذا
                    </button>
                </div>
             </div>

             {/* 1. WEEKLY PLAN */}
             {nutritionSubTab === 'plan' && (
                 <div className="flex flex-col items-center">
                    {/* Controls */}
                    <div className="flex flex-wrap gap-4 w-full max-w-[210mm] mb-6 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex gap-4">
                            <div>
                                <span className="text-xs font-bold text-slate-400 block mb-1 flex items-center gap-1"><LayoutTemplate className="w-3 h-3"/> قالب</span>
                                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                                    {(['modern', 'classic', 'minimal'] as MenuTheme[]).map(t => (
                                        <button 
                                            key={t} 
                                            onClick={() => setMenuTheme(t)}
                                            className={`px-3 py-1 text-xs rounded-md transition-all font-bold ${menuTheme === t ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}
                                        >
                                            {t === 'modern' ? 'مدرن' : t === 'classic' ? 'کلاسیک' : 'مینیمال'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span className="text-xs font-bold text-slate-400 block mb-1 flex items-center gap-1"><Palette className="w-3 h-3"/> رنگ</span>
                                <div className="flex gap-2">
                                    {(Object.keys(menuColors) as MenuColor[]).map(c => (
                                        <button 
                                            key={c}
                                            onClick={() => setMenuColor(c)}
                                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${menuColors[c].bg} ${menuColor === c ? 'ring-2 ring-offset-2 ring-slate-300' : ''}`}
                                        >
                                            {menuColor === c && <Check className="w-3 h-3 text-white" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={handleDownloadMenu}
                            disabled={isDownloading}
                            className={`flex items-center gap-2 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg ${currentColor.primary} hover:opacity-90`}
                        >
                            {isDownloading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Download className="w-5 h-5" />}
                            دانلود PDF
                        </button>
                    </div>

                    {/* Single Page A4 Menu Layout Container */}
                    <div className="w-full overflow-x-auto pb-4 flex justify-center">
                        <div id="food-plan-preview" className="bg-white p-0 rounded-none md:rounded-3xl border border-slate-200 relative overflow-hidden min-h-[297mm] w-[210mm] min-w-[210mm] shadow-2xl flex flex-col transition-all duration-300">
                            
                            {/* ================= MODERN THEME ================= */}
                            {menuTheme === 'modern' && (
                                <>
                                    <div className={`relative h-40 ${currentColor.bg} overflow-hidden`}>
                                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/food.png')] opacity-10"></div>
                                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                                        
                                        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white pt-4">
                                            <div className={`p-3 bg-white ${currentColor.text} rounded-full shadow-lg mb-2`}>
                                                <Utensils className="w-8 h-8" />
                                            </div>
                                            <h2 className="text-3xl font-black">برنامه غذایی هفتگی</h2>
                                            <p className="opacity-90 font-bold text-sm mt-1 bg-black/10 px-3 py-1 rounded-full">دانشگاه صنعتی شریف • هفته دوم دی‌ماه ۱۴۰۲</p>
                                        </div>
                                    </div>

                                    <div className="flex-1 p-8">
                                        <div className={`grid grid-cols-12 ${currentColor.light} rounded-t-2xl border ${currentColor.border} p-4 font-bold text-sm shadow-sm ${currentColor.text.replace('text', 'text-slate').replace('600', '800')}`}>
                                            <div className="col-span-2 text-center">روز هفته</div>
                                            <div className={`col-span-4 text-right pr-4 border-r ${currentColor.border} mr-2`}>ناهار</div>
                                            <div className={`col-span-4 text-right pr-4 border-r ${currentColor.border} mr-2`}>شام</div>
                                            <div className={`col-span-2 text-center border-r ${currentColor.border}`}>قیمت</div>
                                        </div>

                                        <div className="border-x border-b border-slate-200 rounded-b-2xl overflow-hidden">
                                            {foodPlan.map((item, index) => (
                                                <div key={index} className={`grid grid-cols-12 p-4 items-center border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                                                    <div className="col-span-2 text-center">
                                                        <span className="font-bold text-slate-700 bg-white border border-slate-200 rounded-lg py-1 px-2 text-xs shadow-sm block">{item.day}</span>
                                                    </div>
                                                    <div className="col-span-4 text-right pr-4 font-medium text-slate-800 text-sm border-r border-slate-100 mr-2">{item.lunch}</div>
                                                    <div className="col-span-4 text-right pr-4 font-medium text-slate-600 text-sm border-r border-slate-100 mr-2">{item.dinner}</div>
                                                    <div className={`col-span-2 text-center font-black ${currentColor.text} text-sm border-r border-slate-100 dir-ltr`}>{item.price}</div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-8 grid grid-cols-2 gap-4">
                                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-start gap-3">
                                                <div className="p-2 bg-white rounded-xl text-slate-600 shadow-sm">
                                                    <Coffee className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-800 text-sm mb-1">قوانین رزرو</h4>
                                                    <p className="text-[10px] text-slate-600 leading-relaxed text-justify">
                                                        مهلت رزرو تا ساعت ۱۴ روز قبل است. لغو رزرو تا ۴۸ ساعت قبل بدون جریمه امکان‌پذیر است.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={`${currentColor.light} border ${currentColor.border} rounded-2xl p-4 flex items-start gap-3`}>
                                                <div className={`p-2 bg-white rounded-xl ${currentColor.text} shadow-sm`}>
                                                    <TrendingUp className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className={`font-bold ${currentColor.text} text-sm mb-1`}>کیفیت و سلامت</h4>
                                                    <p className={`text-[10px] ${currentColor.text} opacity-80 leading-relaxed text-justify`}>
                                                        غذاها با نظارت کارشناس تغذیه و مواد اولیه کشتار روز طبخ می‌شوند.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* ================= CLASSIC THEME ================= */}
                            {menuTheme === 'classic' && (
                                <div className="flex-1 p-12">
                                    <div className="text-center border-b-2 border-slate-800 pb-6 mb-8">
                                        <div className="flex items-center justify-center gap-3 mb-2">
                                            <Utensils className="w-6 h-6 text-slate-800" />
                                            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-widest">برنامه غذایی هفتگی</h2>
                                            <Utensils className="w-6 h-6 text-slate-800" />
                                        </div>
                                        <p className="text-sm text-slate-600 font-bold">دانشگاه صنعتی شریف - معاونت دانشجویی</p>
                                        <p className="text-xs text-slate-500 mt-1">تاریخ اجرا: از ۴ دی تا ۱۰ دی ۱۴۰۲</p>
                                    </div>

                                    <div className="border-2 border-slate-800 rounded-lg overflow-hidden">
                                        <div className="grid grid-cols-12 bg-slate-100 p-3 font-bold text-sm text-slate-900 border-b-2 border-slate-800">
                                            <div className="col-span-2 text-center border-l border-slate-300 pl-2">روز</div>
                                            <div className="col-span-4 text-center border-l border-slate-300 px-2">ناهار</div>
                                            <div className="col-span-4 text-center border-l border-slate-300 px-2">شام</div>
                                            <div className="col-span-2 text-center">قیمت</div>
                                        </div>
                                        {foodPlan.map((item, index) => (
                                            <div key={index} className={`grid grid-cols-12 p-3 text-sm items-center border-b border-slate-300 last:border-0 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                                                <div className="col-span-2 text-center font-bold border-l border-slate-300 pl-2">{item.day}</div>
                                                <div className="col-span-4 text-center border-l border-slate-300 px-2">{item.lunch}</div>
                                                <div className="col-span-4 text-center border-l border-slate-300 px-2">{item.dinner}</div>
                                                <div className="col-span-2 text-center dir-ltr font-mono">{item.price}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 border-t border-slate-300 pt-4 flex justify-between text-xs text-slate-600">
                                        <p>* رزرو غذا الزامی است.</p>
                                        <p>سامانه اتوماسیون تغذیه</p>
                                    </div>
                                </div>
                            )}

                            {/* ================= MINIMAL THEME ================= */}
                            {menuTheme === 'minimal' && (
                                <div className="flex-1 p-16 bg-slate-50/50">
                                    <div className="mb-12">
                                        <h1 className={`text-6xl font-black ${currentColor.text} opacity-20 absolute top-4 left-4 rotate-12`}>MENU</h1>
                                        <h2 className="text-4xl font-light text-slate-900 mb-2">برنامه غذایی</h2>
                                        <div className={`h-1 w-20 ${currentColor.bg} mb-4`}></div>
                                        <p className="text-sm text-slate-500">هفته دوم دی‌ماه ۱۴۰۲</p>
                                    </div>

                                    <div className="space-y-6">
                                        {foodPlan.map((item, index) => (
                                            <div key={index} className="flex items-start justify-between border-b border-slate-200 pb-4 last:border-0">
                                                <div className="w-24 font-bold text-slate-400 text-sm pt-1">{item.day}</div>
                                                <div className="flex-1 px-4">
                                                    <div className="flex justify-between mb-1">
                                                        <span className="font-bold text-slate-800 text-lg">{item.lunch}</span>
                                                        <span className={`text-xs font-bold ${currentColor.text} bg-white px-2 py-1 rounded border ${currentColor.border}`}>ناهار</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-sm text-slate-500">{item.dinner !== '---' ? item.dinner : 'عدم سرو شام'}</span>
                                                        {item.dinner !== '---' && <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">شام</span>}
                                                    </div>
                                                </div>
                                                <div className="w-16 text-left font-mono font-bold text-slate-900 pt-1">{item.price}</div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="mt-auto pt-10 text-center">
                                        <p className="text-[10px] tracking-widest uppercase text-slate-400">Bon Appétit • UniPlus</p>
                                    </div>
                                </div>
                            )}

                            {/* Common Footer */}
                            {menuTheme === 'modern' && (
                                <div className="bg-slate-50 p-4 text-center border-t border-slate-200">
                                    <p className="text-[10px] text-slate-400">
                                        این برنامه توسط سامانه هوشمند UniPlus تولید شده است. تاریخ چاپ: {new Date().toLocaleDateString('fa-IR')}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                 </div>
             )}

             {/* 2. SMART AUTO RESERVE */}
             {nutritionSubTab === 'auto' && (
                 <div className="grid lg:grid-cols-2 gap-8">
                     <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                         <div className="flex items-center gap-4 mb-6">
                             <div className={`p-4 rounded-2xl ${autoReserveEnabled ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                 <Bot className="w-8 h-8" />
                             </div>
                             <div>
                                 <h3 className="text-xl font-bold text-slate-800">دستیار رزرو خودکار</h3>
                                 <p className="text-slate-500 text-sm">اگر یادت رفت رزرو کنی، من برات انجام میدم!</p>
                             </div>
                             <div className="mr-auto">
                                 <button 
                                    onClick={() => setAutoReserveEnabled(!autoReserveEnabled)}
                                    className={`w-14 h-8 rounded-full p-1 transition-colors ${autoReserveEnabled ? 'bg-emerald-500' : 'bg-slate-200'}`}
                                 >
                                     <div className={`w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${autoReserveEnabled ? '-translate-x-6' : 'translate-x-0'}`}></div>
                                 </button>
                             </div>
                         </div>

                         <div className={`space-y-6 transition-opacity ${autoReserveEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                             <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 text-sm text-orange-800 leading-relaxed">
                                 <span className="font-bold block mb-1">چطور کار میکنه؟</span>
                                 سیستم هر هفته چهارشنبه‌ها چک میکنه. اگه رزرو نکرده باشی، طبق سلیقه‌ت (غذاهایی که دوست داری) برات رزرو میکنه و از غذاهایی که بدت میاد دوری میکنه.
                             </div>

                             <div>
                                 <label className="text-sm font-bold text-slate-600 mb-2 block">سلیقه غذایی شما</label>
                                 <div className="flex gap-2 mb-2">
                                     <input 
                                        type="text" 
                                        value={newPreference}
                                        onChange={(e) => setNewPreference(e.target.value)}
                                        placeholder="نام غذا (مثلاً ماکارونی)..."
                                        className="flex-1 p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none focus:border-orange-500 text-slate-900"
                                     />
                                     <button onClick={() => handleAddPreference('like')} className="bg-emerald-100 text-emerald-600 p-3 rounded-xl hover:bg-emerald-200"><TrendingUp className="w-5 h-5"/></button>
                                     <button onClick={() => handleAddPreference('dislike')} className="bg-red-100 text-red-600 p-3 rounded-xl hover:bg-red-200"><Trash2 className="w-5 h-5"/></button>
                                 </div>
                             </div>

                             <div className="grid grid-cols-2 gap-4">
                                 <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                     <h4 className="text-xs font-bold text-emerald-600 mb-3 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> عاشقشم (رزرو کن)</h4>
                                     <div className="flex flex-wrap gap-2">
                                         {likedFoods.map((f, i) => (
                                             <span key={i} className="text-xs bg-white px-2 py-1 rounded-lg border border-slate-200 text-slate-600">{f}</span>
                                         ))}
                                     </div>
                                 </div>
                                 <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                     <h4 className="text-xs font-bold text-red-600 mb-3 flex items-center gap-1"><Trash2 className="w-3 h-3"/> متنفرم (رزرو نکن)</h4>
                                     <div className="flex flex-wrap gap-2">
                                         {dislikedFoods.map((f, i) => (
                                             <span key={i} className="text-xs bg-white px-2 py-1 rounded-lg border border-slate-200 text-slate-600">{f}</span>
                                         ))}
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>

                     <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden flex flex-col justify-center items-center text-center">
                         <Bot className="w-24 h-24 text-slate-700 absolute -bottom-4 -right-4 opacity-50" />
                         <div className="relative z-10">
                             <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md border border-white/20">
                                 <Clock className="w-8 h-8 text-orange-400" />
                             </div>
                             <h3 className="text-2xl font-bold mb-2">زمان‌بندی هوشمند</h3>
                             <p className="text-slate-300 mb-6">
                                 ربات UniPlus ساعت ۱۴:۰۰ هر چهارشنبه وضعیت رزرو هفته بعد رو چک میکنه.
                             </p>
                             <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-sm">
                                 <span className="block text-orange-300 font-bold mb-1">آخرین فعالیت:</span>
                                 هفته قبل، ۲ وعده ناهار برای شما رزرو شد.
                             </div>
                         </div>
                     </div>
                 </div>
             )}

             {/* 3. FOOD MARKET */}
             {nutritionSubTab === 'market' && (
                 <div className="space-y-6">
                     <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                         <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                         <div>
                             <h4 className="font-bold text-amber-800 text-sm mb-1">اطلاعیه بازارچه</h4>
                             <p className="text-amber-700 text-xs leading-relaxed">
                                 همین الان <span className="font-black text-lg mx-1">{marketTickets.length}</span> کد فراموشی برای فروش موجود است! اگر غذا رزرو نکرده‌اید، می‌توانید از اینجا کد بخرید.
                             </p>
                         </div>
                     </div>

                     <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                         <div className="relative flex-1 max-w-md">
                             <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                             <input type="text" placeholder="جستجوی غذا (مثلاً کباب)..." className="w-full pr-10 pl-4 py-2 bg-slate-50 rounded-xl text-sm outline-none text-slate-900" />
                         </div>
                         <button className="bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-900 transition-colors">
                             <Plus className="w-4 h-4" />
                             فروش کد (من غذا دارم)
                         </button>
                     </div>

                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                         {marketTickets.map((ticket) => (
                             <div key={ticket.id} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all flex flex-col relative overflow-hidden group">
                                 <div className="absolute top-0 right-0 w-16 h-16 bg-orange-100 rounded-bl-[3rem] -mr-8 -mt-8 z-0"></div>
                                 
                                 <div className="relative z-10">
                                     <div className="flex justify-between items-start mb-3">
                                         <div className="bg-orange-50 text-orange-700 px-3 py-1 rounded-lg text-[10px] font-bold border border-orange-100">
                                             {ticket.meal}
                                         </div>
                                         <span className="text-xs text-slate-400 font-mono">{ticket.time}</span>
                                     </div>
                                     
                                     <h3 className="font-black text-lg text-slate-800 mb-1">{ticket.food}</h3>
                                     <p className="text-xs text-slate-500 mb-4 flex items-center gap-1">
                                         فروشنده: <span className="font-bold text-slate-700">{ticket.seller}</span>
                                     </p>

                                     <div className="mt-auto pt-4 border-t border-slate-50 flex justify-between items-center">
                                         <span className="font-black text-emerald-600 text-lg">{ticket.price} <span className="text-[10px] font-normal text-slate-400">تومان</span></span>
                                         <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100">
                                             خرید آنی
                                         </button>
                                     </div>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>
             )}
         </div>
      )}

      {activeTab === 'dorm' && (
         <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 animate-in fade-in">
            <h3 className="text-xl font-bold text-slate-800 mb-6 border-b pb-4">درخواست خوابگاه / تمدید سکونت</h3>
            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <div>
                     <label className="block text-sm font-bold text-slate-600 mb-2">انتخاب بلوک خوابگاه</label>
                     <select className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none text-slate-900">
                        <option>خوابگاه شهید همت (پسران)</option>
                        <option>خوابگاه کوثر (دختران)</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-slate-600 mb-2">نوع اتاق</label>
                     <select className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none text-slate-900">
                        <option>۴ تخته</option>
                        <option>۶ تخته</option>
                     </select>
                  </div>
                  <div className="p-4 bg-blue-50 text-blue-700 rounded-2xl text-sm leading-relaxed">
                     <span className="font-bold block mb-1">نکته مهم:</span>
                     لطفاً تصویر فیش واریزی اجاره‌بها و کارت دانشجویی را در کادر روبرو آپلود کنید.
                  </div>
               </div>
               <div className="border-2 border-dashed border-slate-300 rounded-3xl flex flex-col items-center justify-center p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-slate-400 mb-4" />
                  <span className="font-bold text-slate-600">آپلود مدارک</span>
                  <span className="text-xs text-slate-400 mt-2">فرمت‌های مجاز: JPG, PDF (حداکثر ۵ مگابایت)</span>
               </div>
            </div>
            <button className="w-full mt-8 py-4 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-700 shadow-lg shadow-teal-200">ثبت درخواست خوابگاه</button>
         </div>
      )}

      {activeTab === 'sports' && (
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">
            {[
               { title: 'استخر دانشگاه', sessions: ['شنبه ۱۸-۲۰ (پسران)', 'دوشنبه ۱۴-۱۶ (دختران)'], price: '۳۰,۰۰۰ تومان' },
               { title: 'زمین چمن مصنوعی', sessions: ['هر روز ۱۶-۲۲ با رزرو قبلی'], price: '۱۵۰,۰۰۰ تومان/ساعت' },
               { title: 'سالن بدنسازی', sessions: ['روزهای زوج (پسران)', 'روزهای فرد (دختران)'], price: 'ماهانه ۲۰۰,۰۰۰ تومان' },
            ].map((sport, i) => (
               <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                  <h3 className="font-bold text-lg text-slate-800 mb-4">{sport.title}</h3>
                  <div className="space-y-2 mb-6">
                     {sport.sessions.map((s, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-2 rounded-lg">
                           <Clock className="w-4 h-4 text-teal-500" /> {s}
                        </div>
                     ))}
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="font-bold text-teal-600">{sport.price}</span>
                     <button className="px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-bold">رزرو سانس</button>
                  </div>
               </div>
            ))}
         </div>
      )}

      {activeTab === 'counseling' && (
         <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 animate-in fade-in flex flex-col items-center text-center">
             <Stethoscope className="w-16 h-16 text-teal-500 mb-4 bg-teal-50 p-4 rounded-3xl" />
             <h3 className="text-xl font-bold text-slate-800 mb-2">مرکز مشاوره و سلامت روان</h3>
             <p className="text-slate-500 max-w-lg mb-8">
               شما می‌توانید به صورت محرمانه با مشاورین دانشگاه وقت رزرو کنید. خدمات شامل مشاوره تحصیلی، خانوادگی و ازدواج می‌باشد.
             </p>
             <div className="w-full max-w-md space-y-3">
                <button className="w-full p-4 bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-200 rounded-2xl flex justify-between items-center transition-all group">
                   <span className="font-bold text-slate-700 group-hover:text-teal-700">دکتر کریمی (مشاور تحصیلی)</span>
                   <span className="text-xs bg-white px-2 py-1 rounded-lg border">خالی: دوشنبه ۱۰ صبح</span>
                </button>
                <button className="w-full p-4 bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-200 rounded-2xl flex justify-between items-center transition-all group">
                   <span className="font-bold text-slate-700 group-hover:text-teal-700">خانم صبوری (روانشناس بالینی)</span>
                   <span className="text-xs bg-white px-2 py-1 rounded-lg border">خالی: چهارشنبه ۱۴ عصر</span>
                </button>
             </div>
         </div>
      )}
    </div>
  );
};

export default Booking;
