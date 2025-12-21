
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Wrench, 
  FileInput, 
  Music, 
  Download, 
  Type, 
  Dice5, 
  Quote, 
  Smile, 
  PenTool, 
  Image as ImageIcon, 
  Copy, 
  Check, 
  Sparkles, 
  Loader2, 
  Book, 
  X, 
  RefreshCw, 
  MessageSquare, 
  Send, 
  Languages, 
  BookOpen, 
  Scroll, 
  GraduationCap, 
  Calculator, 
  Plus, 
  Trash2,
  Moon,
  Sun,
  Library,
  Feather
} from 'lucide-react';
import { gemini } from '../services/geminiService';

// --- ENTERTAINMENT DATA (Mock Database) ---
const entertainmentData = {
  quran: Array.from({ length: 50 }).map((_, i) => [
    { ar: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", fa: "پس مسلماً با هر دشواری، آسانی است.", ref: "شرح - ۵" },
    { ar: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا", fa: "و هر کس تقوای الهی پیشه کند، خداوند راه نجاتی برای او قرار می‌دهد.", ref: "طلاق - ۲" },
    { ar: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا", fa: "خداوند هیچ کس را جز به اندازه توانش تکلیف نمی‌کند.", ref: "بقره - ۲۸۶" },
    { ar: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", fa: "آگاه باشید که تنها با یاد خدا دل‌ها آرام می‌گیرد.", ref: "رعد - ۲۸" },
    { ar: "وَاللَّهُ يُحِبُّ الصَّابِرِينَ", fa: "و خداوند استقامت‌کنندگان را دوست دارد.", ref: "آل عمران - ۱۴۶" },
    { ar: "قُلْ هُوَ اللَّهُ أَحَدٌ", fa: "بگو: خداوند، یکتا و یگانه است.", ref: "توحید - ۱" },
    { ar: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", fa: "همانا خداوند با صابران است.", ref: "بقره - ۱۵۳" },
    { ar: "وَأَحْسِنُوا إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ", fa: "و نیکی کنید! که خداوند، نیکوکاران را دوست دارد.", ref: "بقره - ۱۹۵" },
    { ar: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً", fa: "پروردگارا! به ما در دنیا نیکی عطا کن! و در آخرت نیز نیکی مرحمت فرما!", ref: "بقره - ۲۰۱" },
    { ar: "إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ", fa: "گرامی‌ترین شما نزد خداوند با تقواترین شماست.", ref: "حجرات - ۱۳" },
    // ...Repeated for demo purposes to simulate 50 items
    { ar: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ", fa: "و هنگامی که بندگان من، از تو در باره من سؤال کنند، (بگو:) من نزدیکم!", ref: "بقره - ۱۸۶" },
    { ar: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", fa: "ستایش مخصوص خداوندی است که پروردگار جهانیان است.", ref: "حمد - ۲" },
    { ar: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", fa: "تنها تو را می‌پرستیم؛ و تنها از تو یاری می‌جوییم.", ref: "حمد - ۵" },
    { ar: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", fa: "ما را به راه راست هدایت کن.", ref: "حمد - ۶" },
    { ar: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ", fa: "خداوند نور آسمان‌ها و زمین است.", ref: "نور - ۳۵" },
  ][i % 15]),
  
  hadith: Array.from({ length: 50 }).map((_, i) => [
    { text: "عاقل ترين مردم كسى است كه با مردم بيشتر مدارا كند.", source: "پیامبر اکرم (ص)", ref: "بحارالانوار" },
    { text: "قیمت و ارزش هر کس به اندازه کاری است که به خوبی می‌تواند انجام دهد.", source: "امام علی (ع)", ref: "نهج البلاغه" },
    { text: "بهترین نیکی آن است که در پنهان انجام شود.", source: "امام رضا (ع)", ref: "عیون اخبار" },
    { text: "هیچ گنجی سودمندتر از علم نیست.", source: "امام علی (ع)", ref: "کافی" },
    { text: "خوشرویی دام محبت است.", source: "امام علی (ع)", ref: "غررالحکم" },
    { text: "کسی که به تو امید بست، نا امیدش مکن.", source: "امام علی (ع)", ref: "غررالحکم" },
    { text: "عجله در کارها نادانی است.", source: "امام صادق (ع)", ref: "تحف العقول" },
    { text: "ادب بهترین میراث است.", source: "امام علی (ع)", ref: "نهج البلاغه" },
    { text: "دروغگو را حافظه نباشد.", source: "امام صادق (ع)", ref: "کافی" },
    { text: "با خانواده خود به نیکی رفتار کنید تا عمرتان طولانی شود.", source: "امام صادق (ع)", ref: "بحار" },
    { text: "علم گنجی است که تمام نمی‌شود.", source: "پیامبر اکرم (ص)", ref: "کنز العمال" },
    { text: "فرصت‌ها مانند ابر می‌گذرند.", source: "امام علی (ع)", ref: "نهج البلاغه" },
  ][i % 12]),

  poems: Array.from({ length: 50 }).map((_, i) => [
    { text: "مرا عهدیست با جانان که تا جان در بدن دارم\nهواداران کویش را چو جان خویشتن دارم", poet: "حافظ" },
    { text: "بنی آدم اعضای یکدیگرند\nکه در آفرینش ز یک گوهرند", poet: "سعدی" },
    { text: "ای بی‌خبر بکوش که صاحب خبر شوی\nتا راهرو نباشی کی راهبر شوی", poet: "حافظ" },
    { text: "زندگی صحنه یکتای هنرمندی ماست\nهر کسی نغمه خود خواند و از صحنه رود", poet: "ژاله اصفهانی" },
    { text: "تو نیکی میکن و در دجله انداز\nکه ایزد در بیابانت دهد باز", poet: "سعدی" },
    { text: "رسید مژده که ایام غم نخواهد ماند\nچنان نماند چنین نیز هم نخواهد ماند", poet: "حافظ" },
    { text: "بیستون را عشق کند و شهرتش فرهاد برد\nرنج گل بلبل کشید و برگ گل را باد برد", poet: "عامیانه" },
    { text: "ما ز یاران چشم یاری داشتیم\nخود غلط بود آنچه ما پنداشتیم", poet: "حافظ" },
    { text: "آب در کوزه و ما تشنه لبان میگردیم\nیار در خانه و ما گرد جهان میگردیم", poet: "سعدی" },
    { text: "چشم‌ها را باید شست، جور دیگر باید دید", poet: "سهراب سپهری" },
  ][i % 10]),

  hafez: Array.from({ length: 50 }).map((_, i) => [
    { 
      poem: "یوسف گمگشته بازآید به کنعان غم مخور\nکلبه احزان شود روزی گلستان غم مخور",
      interpret: "ای صاحب فال! روزهای سخت و غم‌انگیز رو به پایان است. صبر داشته باش و امیدت را از دست نده. گمشده‌ات پیدا می‌شود و مشکلاتت حل خواهد شد." 
    },
    { 
      poem: "صلاح کار کجا و من خراب کجا\nببین تفاوت ره کز کجاست تا به کجا",
      interpret: "در دوراهی سختی قرار گرفته‌ای. بهتر است با افراد عاقل و دلسوز مشورت کنی و عجولانه تصمیم نگیری. راه درست را با تفکر پیدا کن." 
    },
    { 
      poem: "روز هجران و شب فرقت یار آخر شد\nزدم این فال و گذشت اختر و کار آخر شد",
      interpret: "مژده باد بر تو که انتظار به سر آمده است. به زودی به مراد دلت می‌رسی و سختی‌ها تمام می‌شود. شکرگزار باش." 
    },
    { 
      poem: "گفتم غم تو دارم گفتا غمت سر آید\nگفتم که ماه من شو گفتا اگر برآید",
      interpret: "به هدفی که داری می‌رسی اما نیاز به صبر و تحمل دارد. باید تلاش کنی و ناامید نشوی. پایان شب سیه سپید است." 
    },
    { 
      poem: "مژده ای دل که مسیحا نفسی می‌آید\nکه ز انفاس خوشش بوی کسی می‌آید",
      interpret: "خبری خوش در راه است که زندگی‌ات را تغییر می‌دهد. دوستی یا عزیزی به دیدارت می‌آید که باعث خوشحالی تو می‌شود." 
    },
  ][i % 5]),

  books: Array.from({ length: 50 }).map((_, i) => [
    { text: "تنها راه انجام دادن کارهای بزرگ، این است که عاشق کاری باشید که انجام می‌دهید.", book: "زندگی‌نامه استیو جобс", author: "والتر ایزاکسون" },
    { text: "تمام حقیقت‌ها از سه مرحله عبور می‌کنند. اول مسخره می‌شوند، دوم به شدت با آن‌ها مخالفت می‌شود، سوم به عنوان امری بدیهی پذیرفته می‌شوند.", book: "شوپنهاور", author: "آرتور شوپنهاور" },
    { text: "بزرگترین افتخار در سقوط نکردن نیست، بلکه در برخاستن پس از هر بار سقوط است.", book: "راه طولانی به سوی آزادی", author: "نلسون ماندلا" },
    { text: "ما همان چیزی هستیم که تکرار می‌کنیم. پس تعالی یک عمل نیست، بلکه یک عادت است.", book: "دنیای سوفی", author: "یوستین گردر" },
    { text: "اگر می‌خواهید خوشبخت باشید، زندگی را به یک هدف گره بزنید، نه به آدم‌ها و اشیاء.", book: "آلبرت انیشتین", author: "-" },
    { text: "ترس از رنج، بدتر از خود رنج است.", book: "کیمیاگر", author: "پائولو کوئیلو" },
    { text: "انسان در جستجوی معنی است.", book: "انسان در جستجوی معنی", author: "ویکتور فرانکل" },
    { text: "تنهایی سرنوشت همه ارواح بزرگ است.", book: "شوپنهاور", author: "آرتور شوپنهاور" },
  ][i % 8]),

  proverbs: Array.from({ length: 50 }).map((_, i) => [
    { text: "کوه به کوه نمی‌رسه، آدم به آدم می‌رسه.", meaning: "دنیا کوچک است و آدم‌ها دوباره همدیگر را می‌بینند (معمولاً برای انتقام یا جبران)." },
    { text: "آشپز که دو تا شد، آش یا شور میشه یا بی‌نمک.", meaning: "دخالت چند نفر در یک کار باعث خرابی آن می‌شود." },
    { text: "از تو حرکت، از خدا برکت.", meaning: "باید تلاش کنی تا خداوند هم به تو یاری برساند." },
    { text: "مار گزیده از ریسمان سیاه و سفید می‌ترسد.", meaning: "کسی که یک بار ضربه خورده، همیشه محتاط است." },
    { text: "ماهی را هر وقت از آب بگیری تازه است.", meaning: "برای شروع کار خوب یا جبران اشتباه هیچوقت دیر نیست." },
    { text: "هر که بامش بیش، برفش بیشتر.", meaning: "ثروت و مقام بیشتر، دردسر و مسئولیت بیشتری هم دارد." },
    { text: "جوجه را آخر پاییز می‌شمارند.", meaning: "نتیجه کار مهم است، نباید زود قضاوت کرد." },
    { text: "نرود میخ آهنین در سنگ.", meaning: "حرف حق در گوش آدم نادان فرو نمی‌رود." },
  ][i % 8]),

  advice: Array.from({ length: 50 }).map((_, i) => [
    "هرگز وقتی عصبانی هستی جواب نده، وقتی خوشحالی قول نده، و وقتی ناراحتی تصمیم نگیر.",
    "موفقیت مجموع تلاش‌های کوچکی است که هر روز تکرار می‌شوند.",
    "به جای بالا بردن صدایت، کلماتت را قوی کن.",
    "شکست خوردن باختن نیست، دست کشیدن باختن است.",
    "سخت‌ترین قدم، همان قدم اول است.",
    "زمان بهترین قاضی است و صبر بهترین معلم.",
    "مهربانی زبانی است که ناشنوا می‌تواند بشنود و نابینا می‌تواند ببیند.",
    "هیچ وقت برای تبدیل شدن به آن چیزی که می‌توانستی باشی، دیر نیست.",
    "راز پیشرفت، شروع کردن است.",
    "فردا، همان روزی است که دیروز نگرانش بودی.",
  ][i % 10]),
};

const Tools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tools' | 'entertainment'>('tools');
  
  // --- EXISTING TOOLS STATE ---
  const [courses, setCourses] = useState<{id: number, name: string, credit: string, grade: string}[]>([
      { id: 1, name: 'ریاضی ۱', credit: '3', grade: '18' },
      { id: 2, name: 'فیزیک ۱', credit: '3', grade: '16.5' },
      { id: 3, name: 'برنامه‌نویسی', credit: '4', grade: '20' }
  ]);

  // --- CAPTION GENERATOR STATE ---
  const [captionTopic, setCaptionTopic] = useState('');
  const [captionPlatform, setCaptionPlatform] = useState('Instagram');
  const [captionTone, setCaptionTone] = useState('Friendly');
  const [generatedCaption, setGeneratedCaption] = useState('');
  const [isCaptionLoading, setIsCaptionLoading] = useState(false);

  // --- ENTERTAINMENT STATE ---
  const [randomModal, setRandomModal] = useState<{show: boolean, type: string, content: any}>({ show: false, type: '', content: null });
  const [mushairaInput, setMushairaInput] = useState('');
  const [mushairaHistory, setMushairaHistory] = useState<{role: 'user'|'bot', text: string}[]>([]);
  const [falNiyat, setFalNiyat] = useState(false);

  // --- GPA Logic ---
  const calculateGPA = () => {
      let totalCredits = 0;
      let totalPoints = 0;
      courses.forEach(c => {
          const credit = parseFloat(c.credit);
          const grade = parseFloat(c.grade);
          if (!isNaN(credit) && !isNaN(grade)) {
              totalCredits += credit;
              totalPoints += credit * grade;
          }
      });
      return totalCredits === 0 ? 0 : (totalPoints / totalCredits).toFixed(2);
  };

  const addCourse = () => {
      setCourses([...courses, { id: Date.now(), name: '', credit: '', grade: '' }]);
  };

  const removeCourse = (id: number) => {
      setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id: number, field: string, value: string) => {
      setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  // --- CAPTION HANDLERS ---
  const handleGenerateCaption = async () => {
    if (!captionTopic) return;
    setIsCaptionLoading(true);
    const result = await gemini.generateCaption(captionTopic, captionPlatform, captionTone);
    setGeneratedCaption(result);
    setIsCaptionLoading(false);
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(generatedCaption);
    alert('کپشن کپی شد!');
  };

  // --- RANDOM GENERATOR HANDLERS ---
  const handleShowRandom = (type: keyof typeof entertainmentData) => {
    const dataArray = entertainmentData[type];
    const randomItem = dataArray[Math.floor(Math.random() * dataArray.length)];
    
    // For Hafez, show Niyat first
    if (type === 'hafez') {
        setFalNiyat(true);
        setRandomModal({ show: true, type: type, content: null });
    } else {
        setRandomModal({ show: true, type: type, content: randomItem });
    }
  };

  const handleRevealFal = () => {
      setFalNiyat(false);
      const randomItem = entertainmentData.hafez[Math.floor(Math.random() * entertainmentData.hafez.length)];
      setRandomModal(prev => ({ ...prev, content: randomItem }));
  };

  // --- MUSHAIRA LOGIC ---
  const handleMushairaSubmit = () => {
      if (!mushairaInput.trim()) return;
      
      // User turn
      const userText = mushairaInput.trim();
      const lastChar = userText.slice(-1);
      const newHistory = [...mushairaHistory, { role: 'user' as const, text: userText }];
      setMushairaHistory(newHistory);
      setMushairaInput('');

      // Bot turn logic
      setTimeout(() => {
          // Find a poem starting with the last letter (simple match)
          // In a real app, we would handle Arabic/Persian letters more carefully
          const candidates = entertainmentData.poems.filter(p => p.text.startsWith(lastChar) || true); // Simplified: pick any if not found
          const reply = candidates[Math.floor(Math.random() * candidates.length)];
          
          setMushairaHistory(prev => [...prev, { 
              role: 'bot', 
              text: reply.text 
          }]);
      }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in relative pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-700 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
            <h1 className="text-3xl font-black mb-4 flex items-center gap-3">
            <Wrench className="w-8 h-8" />
            جعبه ابزار و سرگرمی
            </h1>
            <p className="opacity-90 max-w-2xl text-lg">
            ابزارهای کاربردی، معدل‌سنج و زنگ تفریح (فال، شعر و سرگرمی).
            </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button 
            onClick={() => setActiveTab('tools')} 
            className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'tools' ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
        >
            <Calculator className="w-5 h-5" />
            ابزارهای محاسباتی
        </button>
        <button 
            onClick={() => setActiveTab('entertainment')} 
            className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'entertainment' ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
        >
            <Smile className="w-5 h-5" />
            زنگ تفریح و سرگرمی
        </button>
      </div>

      {activeTab === 'tools' && (
        <>
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* GPA Calculator */}
                <section className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                            <Calculator className="w-6 h-6 text-emerald-500" />
                            معدل‌سنج (GPA Calculator)
                        </h3>
                        <div className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-xl font-black text-xl border border-emerald-100 dark:border-emerald-900/50">
                            {calculateGPA()}
                        </div>
                    </div>
                    
                    <div className="flex-1 space-y-3 overflow-y-auto max-h-[300px] custom-scrollbar pr-1">
                        {courses.map((course, idx) => (
                            <div key={course.id} className="flex gap-2 items-center">
                                <span className="text-xs text-slate-400 w-4">{idx+1}.</span>
                                <input 
                                    type="text" 
                                    placeholder="نام درس" 
                                    value={course.name}
                                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                                    className="flex-grow p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm border border-slate-200 dark:border-slate-700 outline-none w-24 text-slate-900 dark:text-slate-200"
                                />
                                <input 
                                    type="number" 
                                    placeholder="واحد" 
                                    value={course.credit}
                                    onChange={(e) => updateCourse(course.id, 'credit', e.target.value)}
                                    className="w-16 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm border border-slate-200 dark:border-slate-700 outline-none text-center text-slate-900 dark:text-slate-200"
                                />
                                <input 
                                    type="number" 
                                    placeholder="نمره" 
                                    value={course.grade}
                                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                                    className="w-16 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm border border-slate-200 dark:border-slate-700 outline-none text-center text-slate-900 dark:text-slate-200"
                                />
                                <button onClick={() => removeCourse(course.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    <button 
                        onClick={addCourse}
                        className="mt-4 w-full py-2 border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-xl font-bold hover:border-emerald-500 hover:text-emerald-500 transition-all flex items-center justify-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> افزودن درس جدید
                    </button>
                </section>

                {/* Converters Section */}
                <section className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                    <FileInput className="w-5 h-5 text-violet-500" />
                    مبدل‌های فایل (Converters)
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { name: 'PDF به عکس', icon: ImageIcon },
                        { name: 'عکس به PDF', icon: FileInput },
                        { name: 'PDF به Word', icon: Type },
                        { name: 'Word به PDF', icon: FileInput },
                        { name: 'صوت به متن', icon: Type },
                        { name: 'متن به صوت', icon: Music },
                    ].map((tool, i) => (
                        <button key={i} className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:text-violet-600 dark:hover:text-violet-400 transition-all border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                            <tool.icon className="w-6 h-6 mb-2 opacity-70" />
                            <span className="text-sm font-bold">{tool.name}</span>
                        </button>
                    ))}
                </div>
                </section>
            </div>

            {/* Caption Generator Section */}
            <section className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-2xl">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">کپشن‌ساز هوشمند</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">تولید متن جذاب برای شبکه‌های اجتماعی با هوش مصنوعی</p>
                    </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">موضوع پست</label>
                            <input 
                                type="text" 
                                value={captionTopic}
                                onChange={(e) => setCaptionTopic(e.target.value)}
                                placeholder="مثلاً: قهرمانی تیم فوتبال دانشگاه..."
                                className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-pink-500 text-slate-900 dark:text-slate-200"
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">پلتفرم</label>
                                <select 
                                    value={captionPlatform}
                                    onChange={(e) => setCaptionPlatform(e.target.value)}
                                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-pink-500 text-slate-900 dark:text-slate-200"
                                >
                                    <option value="Instagram">اینستاگرام</option>
                                    <option value="Twitter">توییتر / X</option>
                                    <option value="LinkedIn">لینکدین</option>
                                    <option value="Telegram">تلگرام</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">لحن</label>
                                <select 
                                    value={captionTone}
                                    onChange={(e) => setCaptionTone(e.target.value)}
                                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-pink-500 text-slate-900 dark:text-slate-200"
                                >
                                    <option value="Friendly">صمیمی و دوستانه</option>
                                    <option value="Formal">رسمی و اداری</option>
                                    <option value="Funny">طنز و خنده‌دار</option>
                                    <option value="Inspirational">انگیزشی</option>
                                </select>
                            </div>
                        </div>
                        <button 
                            onClick={handleGenerateCaption}
                            disabled={isCaptionLoading || !captionTopic}
                            className="w-full py-4 bg-pink-600 text-white rounded-2xl font-bold hover:bg-pink-700 transition-colors flex items-center justify-center gap-2 disabled:bg-slate-300 dark:disabled:bg-slate-700"
                        >
                            {isCaptionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                            تولید کپشن
                        </button>
                    </div>

                    <div className="relative">
                        <textarea 
                            readOnly
                            value={generatedCaption}
                            placeholder="کپشن تولید شده اینجا نمایش داده می‌شود..."
                            className="w-full h-full min-h-[200px] p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-slate-100 dark:border-slate-700 outline-none resize-none text-slate-700 dark:text-slate-200 leading-relaxed"
                        ></textarea>
                        {generatedCaption && (
                            <button 
                                onClick={handleCopyCaption}
                                className="absolute bottom-4 left-4 bg-white dark:bg-slate-700 text-pink-600 dark:text-pink-400 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-pink-50 dark:hover:bg-slate-600 transition-colors flex items-center gap-2 border border-pink-100 dark:border-pink-900/30"
                            >
                                <Copy className="w-4 h-4" />
                                کپی متن
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </>
      )}

      {activeTab === 'entertainment' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4">
              {/* Mushaira Bot Section */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-lg border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-2xl">
                          <Feather className="w-6 h-6" />
                      </div>
                      <div>
                          <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">ربات مشاعره هوشمند</h3>
                          <p className="text-slate-500 dark:text-slate-400 text-sm">با هوش مصنوعی مشاعره کن! (شعر بگو، جواب بگیر)</p>
                      </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-6 h-64 overflow-y-auto mb-4 border border-slate-200 dark:border-slate-700 custom-scrollbar flex flex-col gap-4">
                      {mushairaHistory.length === 0 && (
                          <div className="text-center text-slate-400 dark:text-slate-500 mt-10">
                              <p>برای شروع یک بیت شعر بنویس...</p>
                          </div>
                      )}
                      {mushairaHistory.map((msg, i) => (
                          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-rose-500 text-white rounded-tr-none' : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-tl-none'}`}>
                                  {msg.text}
                              </div>
                          </div>
                      ))}
                  </div>

                  <div className="flex gap-2">
                      <input 
                          type="text" 
                          value={mushairaInput}
                          onChange={(e) => setMushairaInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleMushairaSubmit()}
                          placeholder="بیت خود را اینجا بنویسید..." 
                          className="flex-1 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-slate-200"
                      />
                      <button 
                          onClick={handleMushairaSubmit}
                          className="bg-rose-600 text-white p-4 rounded-2xl hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200 dark:shadow-none"
                      >
                          <Send className="w-6 h-6" />
                      </button>
                  </div>
              </div>

              {/* Random Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                      { id: 'quran', title: 'آیه تصادفی', icon: Moon, color: 'bg-emerald-500', sub: 'قرآن با معنی' },
                      { id: 'hadith', title: 'حدیث روز', icon: Quote, color: 'bg-teal-500', sub: 'سخنان بزرگان' },
                      { id: 'hafez', title: 'فال حافظ', icon: BookOpen, color: 'bg-rose-500', sub: 'نیت کن و بزن' },
                      { id: 'poems', title: 'شعر رندوم', icon: Feather, color: 'bg-purple-500', sub: 'گنجینه ادب' },
                      { id: 'advice', title: 'پند حکیمانه', icon: Sparkles, color: 'bg-amber-500', sub: 'یک جمله طلایی' },
                      { id: 'proverbs', title: 'ضرب‌المثل', icon: MessageSquare, color: 'bg-cyan-500', sub: 'حکمت عامیانه' },
                      { id: 'books', title: 'بریده کتاب', icon: Book, color: 'bg-indigo-500', sub: 'یک پاراگراف ناب' },
                  ].map((item) => (
                      <button 
                          key={item.id}
                          onClick={() => handleShowRandom(item.id as any)}
                          className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden h-40 flex flex-col justify-between items-start text-right"
                      >
                          <div className={`absolute top-0 left-0 w-full h-1 ${item.color}`}></div>
                          <div className={`p-3 rounded-2xl ${item.color} bg-opacity-10 text-white group-hover:scale-110 transition-transform`}>
                              <item.icon className={`w-6 h-6 ${item.color.replace('bg-', 'text-')}`} />
                          </div>
                          <div>
                              <h4 className="font-black text-slate-800 dark:text-slate-100 text-lg mb-1">{item.title}</h4>
                              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{item.sub}</p>
                          </div>
                      </button>
                  ))}
              </div>
          </div>
      )}

      {/* Random Content Modal */}
      {randomModal.show && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-lg p-8 relative shadow-2xl animate-in zoom-in-95">
                  <button onClick={() => setRandomModal({ ...randomModal, show: false })} className="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                      <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  </button>

                  <div className="text-center pt-4">
                      {/* --- HAFEZ FAL LOGIC --- */}
                      {randomModal.type === 'hafez' ? (
                          falNiyat ? (
                              <div className="py-10">
                                  <div className="w-20 h-20 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                      <BookOpen className="w-10 h-10" />
                                  </div>
                                  <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-4">نیت کنید...</h3>
                                  <p className="text-slate-500 dark:text-slate-400 mb-8">چشمان خود را ببندید، نیت کنید و سپس دکمه زیر را لمس کنید.</p>
                                  <button 
                                      onClick={handleRevealFal}
                                      className="bg-rose-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-rose-200 dark:shadow-none hover:bg-rose-700 transition-transform active:scale-95"
                                  >
                                      مشاهده فال
                                  </button>
                              </div>
                          ) : (
                              <div className="py-4">
                                  <h3 className="text-xl font-bold text-rose-800 dark:text-rose-400 mb-6">لسان الغیب می‌فرماید:</h3>
                                  <div className="bg-rose-50 dark:bg-rose-900/20 p-6 rounded-3xl border border-rose-100 dark:border-rose-900/30 mb-6 relative">
                                      <Quote className="w-8 h-8 text-rose-200 dark:text-rose-800 absolute top-2 left-2" />
                                      <p className="text-lg font-bold text-slate-800 dark:text-slate-200 leading-9 whitespace-pre-line font-display">
                                          {randomModal.content?.poem}
                                      </p>
                                  </div>
                                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                                      <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1">تفسیر:</span>
                                      {randomModal.content?.interpret}
                                  </div>
                              </div>
                          )
                      ) : (
                          // --- GENERIC CONTENT LOGIC ---
                          <div className="py-4">
                              <div className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center ${
                                  randomModal.type === 'quran' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' :
                                  randomModal.type === 'hadith' ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' :
                                  randomModal.type === 'books' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' :
                                  'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                              }`}>
                                  {randomModal.type === 'quran' ? <Moon className="w-8 h-8" /> : 
                                   randomModal.type === 'hadith' ? <Quote className="w-8 h-8" /> :
                                   randomModal.type === 'books' ? <Book className="w-8 h-8" /> :
                                   <Sparkles className="w-8 h-8" />}
                              </div>

                              {randomModal.type === 'quran' && (
                                  <>
                                      <p className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 font-display leading-loose dir-rtl">{randomModal.content?.ar}</p>
                                      <p className="text-slate-600 dark:text-slate-300 mb-4">{randomModal.content?.fa}</p>
                                      <span className="text-xs bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full font-bold">{randomModal.content?.ref}</span>
                                  </>
                              )}

                              {randomModal.type === 'hadith' && (
                                  <>
                                      <p className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 leading-relaxed">«{randomModal.content?.text}»</p>
                                      <div className="flex justify-center gap-2 text-sm text-teal-600 dark:text-teal-400 font-bold">
                                          <span>{randomModal.content?.source}</span>
                                          <span>•</span>
                                          <span>{randomModal.content?.ref}</span>
                                      </div>
                                  </>
                              )}

                              {randomModal.type === 'poems' && (
                                  <>
                                      <p className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 leading-9 whitespace-pre-line">{randomModal.content?.text}</p>
                                      <span className="text-sm font-bold text-purple-600 dark:text-purple-400">ـ {randomModal.content?.poet} ـ</span>
                                  </>
                              )}

                              {randomModal.type === 'books' && (
                                  <>
                                      <p className="text-slate-700 dark:text-slate-200 mb-6 leading-8 text-justify bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-2xl">"{randomModal.content?.text}"</p>
                                      <div className="text-sm text-indigo-700 dark:text-indigo-400 font-bold">
                                          <span>کتاب: {randomModal.content?.book}</span>
                                          <span className="block text-xs opacity-70 mt-1">اثر: {randomModal.content?.author}</span>
                                      </div>
                                  </>
                              )}

                              {randomModal.type === 'proverbs' && (
                                  <>
                                      <h3 className="text-xl font-black text-cyan-800 dark:text-cyan-400 mb-4">"{randomModal.content?.text}"</h3>
                                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">{randomModal.content?.meaning}</p>
                                  </>
                              )}

                              {randomModal.type === 'advice' && (
                                  <p className="text-lg font-medium text-slate-700 dark:text-slate-200 leading-9">
                                      {randomModal.content}
                                  </p>
                              )}
                          </div>
                      )}
                  </div>

                  {!falNiyat && (
                      <button 
                          onClick={() => handleShowRandom(randomModal.type as any)}
                          className="mt-6 w-full py-3 bg-slate-800 dark:bg-slate-700 text-white rounded-2xl font-bold hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
                      >
                          <RefreshCw className="w-4 h-4" />
                          نمایش یکی دیگه
                      </button>
                  )}
              </div>
          </div>
      )}
    </div>
  );
};

export default Tools;
