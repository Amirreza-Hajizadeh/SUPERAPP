
import React, { useState } from 'react';
import { 
  PenTool, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowLeft, 
  FileText,
  Loader2,
  Quote,
  Library,
  ChevronLeft
} from 'lucide-react';
import { gemini } from '../services/geminiService';

const ThesisGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'guidelines' | 'editor'>('guidelines');
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const chapters = [
    {
      id: 1,
      title: 'فصل اول: مقدمه (Introduction)',
      desc: 'نقشه راه کلی پژوهش شما.',
      content: [
          'بخش ۱-۱: مقدمه کلی: شروع بحث با جملات کلی و رسیدن به موضوع خاص.',
          'بخش ۱-۲: بیان مسئله (Problem Statement): تشریح دقیق مشکلی که می‌خواهید حل کنید. چرا این مشکل وجود دارد؟',
          'بخش ۱-۳: اهمیت و ضرورت تحقیق: چرا حل این مشکل مهم است؟ چه نفعی برای جامعه یا علم دارد؟',
          'بخش ۱-۴: اهداف تحقیق: اهداف اصلی و فرعی را لیست کنید.',
          'بخش ۱-۵: سوالات یا فرضیات تحقیق: سوالاتی که در پایان به آنها پاسخ می‌دهید.',
          'بخش ۱-۶: تعریف واژگان: اصطلاحات تخصصی را تعریف عملیاتی کنید.'
      ],
      tips: [
        'بیان مسئله باید شفاف و بدون ابهام باشد.',
        'اهمیت و ضرورت تحقیق را با آمار یا ارجاع به مشکلات واقعی نشان دهید.',
        'اهداف تحقیق (اصلی و فرعی) را به صورت لیست وار بنویسید.',
        'فرضیات یا سوالات تحقیق باید دقیقاً منطبق بر اهداف باشد.'
      ]
    },
    {
      id: 2,
      title: 'فصل دوم: مرور ادبیات (Literature Review)',
      desc: 'بررسی کارهای قبلی و پیدا کردن شکاف تحقیقاتی.',
      content: [
          'بخش ۲-۱: مقدمه فصل: توضیح ساختار مرور ادبیات.',
          'بخش ۲-۲: مبانی نظری: تعاریف، تئوری‌ها و مدل‌های پایه.',
          'بخش ۲-۳: پیشینه داخلی: بررسی تحقیقات انجام شده در ایران.',
          'بخش ۲-۴: پیشینه خارجی: بررسی مقالات بین‌المللی معتبر.',
          'بخش ۲-۵: جمع‌بندی و چارچوب نظری: مقایسه کارها و ارائه مدل پیشنهادی خود.'
      ],
      tips: [
        'فقط خلاصه نکنید؛ نقد و مقایسه کنید.',
        'از منابع جدید (۵ سال اخیر) استفاده کنید.',
        'شکاف تحقیقاتی (Research Gap) را در انتهای فصل برجسته کنید: "با وجود این پژوهش‌ها، هنوز..."',
        'از ابزارهای رفرنس‌دهی مثل Mendeley یا EndNote استفاده کنید.'
      ]
    },
    {
      id: 3,
      title: 'فصل سوم: روش‌شناسی (Methodology)',
      desc: 'چگونه تحقیق را انجام داده‌اید؟',
      content: [
          'بخش ۳-۱: روش تحقیق: توصیفی، تحلیلی، آزمایشگاهی یا پیمایشی؟',
          'بخش ۳-۲: جامعه و نمونه آماری: تعداد نمونه و روش نمونه‌گیری.',
          'بخش ۳-۳: ابزار گردآوری داده: پرسشنامه، مصاحبه، مشاهده یا داده‌های ثانویه.',
          'بخش ۳-۴: روایی و پایایی: چگونه از صحت ابزار مطمئن شدید؟',
          'بخش ۳-۵: روش تجزیه و تحلیل: آزمون‌های آماری (T-test, Regression) یا نرم‌افزارها.'
      ],
      tips: [
        'جامعه آماری، نمونه و روش نمونه‌گیری را دقیق بنویسید.',
        'ابزار گردآوری داده (پرسشنامه، مصاحبه، آزمایش) را معرفی کنید.',
        'روایی (Validity) و پایایی (Reliability) ابزار را اثبات کنید.',
        'روش تجزیه و تحلیل داده‌ها (نرم‌افزارها و آزمون‌ها) را مشخص کنید.'
      ]
    },
    {
      id: 4,
      title: 'فصل چهارم: یافته‌ها (Results)',
      desc: 'ارائه داده‌ها بدون تفسیر شخصی.',
      content: [
          'بخش ۴-۱: آمار توصیفی: جداول و نمودارهای جمعیت‌شناختی (سن، جنسیت، تحصیلات).',
          'بخش ۴-۲: بررسی نرمال بودن داده‌ها: آزمون کولموگروف-اسمیرنوف.',
          'بخش ۴-۳: آزمون فرضیات: ارائه نتایج آزمون‌های آماری برای هر فرضیه.',
          'بخش ۴-۴: یافته‌های جانبی: نتایجی که جزو اهداف اصلی نبودند اما جالب هستند.'
      ],
      tips: [
        'از نمودار و جدول برای نمایش داده‌ها استفاده کنید.',
        'متن نباید دقیقاً تکرار اعداد جدول باشد؛ روندهای مهم را بنویسید.',
        'ابتدا آمار توصیفی (سن، جنسیت و...) و سپس آمار استنباطی (آزمون فرضیات) را بیاورید.',
        'در این فصل نتیجه‌گیری نکنید، فقط گزارش دهید.'
      ]
    },
    {
      id: 5,
      title: 'فصل پنجم: بحث و نتیجه‌گیری (Discussion)',
      desc: 'تفسیر نتایج و مقایسه با دیگران.',
      content: [
          'بخش ۵-۱: خلاصه یافته‌ها: مرور سریع نتایج فصل ۴.',
          'بخش ۵-۲: بحث و تفسیر: چرا این نتایج به دست آمد؟ مقایسه با فصل ۲.',
          'بخش ۵-۳: نتیجه‌گیری نهایی: پاسخ قطعی به سوالات تحقیق.',
          'بخش ۵-۴: محدودیت‌های تحقیق: موانعی که با آن روبرو بودید.',
          'بخش ۵-۵: پیشنهادات: برای پژوهشگران آینده و مدیران اجرایی.'
      ],
      tips: [
        'نتایج خود را با نتایج فصل دوم مقایسه کنید (همسو یا ناهمسو).',
        'دلایل احتمالی برای نتایج غیرمنتظره را توضیح دهید.',
        'پیشنهادات کاربردی (برای صنعت/جامعه) و پژوهشی (برای محققان بعدی) ارائه دهید.',
        'محدودیت‌های تحقیق را صادقانه بیان کنید.'
      ]
    }
  ];

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setAnalysis(null);
    const result = await gemini.analyzeThesisText(inputText);
    setAnalysis(result);
    setIsLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black mb-4 flex items-center gap-3">
            <PenTool className="w-8 h-8 text-emerald-400" />
            دستیار پایان‌نامه نویسی
          </h1>
          <p className="opacity-90 max-w-2xl text-lg text-slate-300">
            راهنمای قدم‌به‌قدم نگارش آکادمیک + ویراستار هوشمند (AI) برای اصلاح متن‌های شما.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200 pb-2">
        <button 
          onClick={() => setActiveTab('guidelines')} 
          className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'guidelines' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <BookOpen className="w-5 h-5" />
          راهنمای فصول
        </button>
        <button 
          onClick={() => setActiveTab('editor')} 
          className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'editor' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Sparkles className="w-5 h-5" />
          ویراستار هوشمند
        </button>
      </div>

      {/* Content: Guidelines */}
      {activeTab === 'guidelines' && (
        <div className="space-y-6">
            {selectedChapter === null ? (
                <div className="grid lg:grid-cols-2 gap-6">
                {chapters.map((chapter) => (
                    <div 
                        key={chapter.id} 
                        onClick={() => setSelectedChapter(chapter.id)}
                        className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-all group cursor-pointer relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-2 h-full bg-slate-200 group-hover:bg-emerald-500 transition-colors"></div>
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-slate-50 rounded-2xl text-slate-700 group-hover:bg-slate-800 group-hover:text-white transition-colors">
                            <Library className="w-6 h-6" />
                            </div>
                            <span className="text-6xl font-black text-slate-100 -mt-4 -ml-2 select-none group-hover:text-emerald-50 transition-colors">{chapter.id}</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">{chapter.title}</h3>
                        <p className="text-slate-500 mb-6 text-sm">{chapter.desc}</p>
                        
                        <div className="flex items-center text-sm font-bold text-emerald-600">
                            مشاهده جزئیات و ساختار <ChevronLeft className="w-4 h-4 mr-1" />
                        </div>
                    </div>
                ))}
                
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-3xl border border-emerald-100 flex flex-col justify-center items-center text-center">
                    <Quote className="w-12 h-12 text-emerald-300 mb-4" />
                    <h3 className="font-bold text-emerald-900 text-lg mb-2">نکته طلایی</h3>
                    <p className="text-emerald-700 text-sm">
                    پایان‌نامه خوب، پایان‌نامه تمام شده است! کمال‌گرایی را کنار بگذارید و نوشتن را شروع کنید. ویرایش همیشه آسان‌تر از خلق کردن است.
                    </p>
                </div>
                </div>
            ) : (
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 animate-in slide-in-from-right-8">
                    <button onClick={() => setSelectedChapter(null)} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold">
                        <ArrowLeft className="w-5 h-5" /> بازگشت به لیست فصول
                    </button>
                    
                    {chapters.filter(c => c.id === selectedChapter).map(chapter => (
                        <div key={chapter.id}>
                            <h2 className="text-2xl font-black text-slate-800 mb-2">{chapter.title}</h2>
                            <p className="text-slate-500 mb-8">{chapter.desc}</p>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold text-lg text-slate-700 mb-4 border-b pb-2">ساختار پیشنهادی محتوا</h4>
                                    <ul className="space-y-4">
                                        {chapter.content?.map((item, i) => (
                                            <li key={i} className="flex gap-3 text-sm text-slate-700 bg-slate-50 p-3 rounded-xl">
                                                <span className="font-bold text-emerald-600 shrink-0">{i+1}.</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div>
                                    <h4 className="font-bold text-lg text-slate-700 mb-4 border-b pb-2">نکات مهم نگارشی</h4>
                                    <ul className="space-y-3">
                                        {chapter.tips.map((tip, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                                            {tip}
                                        </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      )}

      {/* Content: AI Editor */}
      {activeTab === 'editor' && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Area */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 h-full flex flex-col">
              <label className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                متن پیش‌نویس شما
              </label>
              <textarea 
                className="w-full flex-1 min-h-[300px] p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-slate-700 leading-relaxed"
                placeholder="پاراگراف یا بخش از پایان‌نامه خود را اینجا کپی کنید (چکیده، مقدمه، و...) تا آن را تحلیل کنم..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              ></textarea>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-slate-400">{inputText.length} کاراکتر</span>
                <button 
                  onClick={handleAnalyze}
                  disabled={isLoading || inputText.length < 10}
                  className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors disabled:bg-slate-300 flex items-center gap-2 shadow-lg shadow-emerald-200"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                  تحلیل و اصلاح متن
                </button>
              </div>
            </div>
          </div>

          {/* Result Area */}
          <div className="space-y-4">
            {analysis ? (
              <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-100 animate-in slide-in-from-right-8 h-full overflow-y-auto">
                <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                  <h3 className="font-bold text-slate-800">نتیجه تحلیل هوشمند</h3>
                  <div className={`px-4 py-1 rounded-full text-sm font-bold ${
                    analysis.score > 80 ? 'bg-emerald-100 text-emerald-700' : 
                    analysis.score > 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>
                    امتیاز: {analysis.score}/100
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-500 mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      نقد کلی
                    </h4>
                    <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 p-4 rounded-2xl">
                      {analysis.critique}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-500 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      پیشنهادات اصلاحی
                    </h4>
                    <ul className="space-y-2">
                      {analysis.suggestions.map((s: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 shrink-0"></span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                    <h4 className="text-sm font-bold text-emerald-800 mb-3 flex items-center gap-2">
                      <PenTool className="w-4 h-4" />
                      متن بازنویسی شده (پیشنهادی)
                    </h4>
                    <p className="text-slate-800 text-sm leading-8 text-justify">
                      {analysis.rewritten}
                    </p>
                    <button 
                      onClick={() => navigator.clipboard.writeText(analysis.rewritten)}
                      className="mt-4 text-xs font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
                    >
                      کپی متن اصلاح شده
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                {isLoading ? (
                  <>
                    <Loader2 className="w-12 h-12 animate-spin mb-4 text-emerald-500" />
                    <p>در حال تحلیل ساختار، لحن و گرامر متن شما...</p>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-16 h-16 mb-4 opacity-50" />
                    <p className="font-bold mb-2">هنوز متنی برای تحلیل وارد نشده است.</p>
                    <p className="text-sm">متن خود را در کادر روبرو وارد کنید تا با معیارهای نگارش آکادمیک بررسی شود.</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThesisGuide;
