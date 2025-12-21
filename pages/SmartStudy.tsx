
import React, { useState } from 'react';
import { 
  FileText, MonitorPlay, Sparkles, Download, Layers, AlignLeft, Check, Loader2, Presentation, Type, Text,
  Target, Globe, Users, Code, Book, PieChart, Lightbulb, Zap, Rocket, Brain, Award, Calendar, Quote
} from 'lucide-react';
import { gemini } from '../services/geminiService';
import { Slide } from '../types';

// Helper to map keywords to icons
const getSlideIcon = (keyword: string | undefined) => {
  const k = keyword?.toLowerCase() || '';
  if (k.includes('target') || k.includes('goal')) return <Target className="w-16 h-16 text-white opacity-80" />;
  if (k.includes('world') || k.includes('globe')) return <Globe className="w-16 h-16 text-white opacity-80" />;
  if (k.includes('user') || k.includes('people')) return <Users className="w-16 h-16 text-white opacity-80" />;
  if (k.includes('code') || k.includes('tech')) return <Code className="w-16 h-16 text-white opacity-80" />;
  if (k.includes('book') || k.includes('study')) return <Book className="w-16 h-16 text-white opacity-80" />;
  if (k.includes('chart') || k.includes('data')) return <PieChart className="w-16 h-16 text-white opacity-80" />;
  if (k.includes('idea') || k.includes('light')) return <Lightbulb className="w-16 h-16 text-white opacity-80" />;
  if (k.includes('rocket') || k.includes('start')) return <Rocket className="w-16 h-16 text-white opacity-80" />;
  if (k.includes('brain') || k.includes('think')) return <Brain className="w-16 h-16 text-white opacity-80" />;
  if (k.includes('award') || k.includes('win')) return <Award className="w-16 h-16 text-white opacity-80" />;
  if (k.includes('time') || k.includes('calendar')) return <Calendar className="w-16 h-16 text-white opacity-80" />;
  return <Zap className="w-16 h-16 text-white opacity-80" />;
};

const SmartStudy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'summarizer' | 'slides'>('summarizer');
  
  // Summarizer State
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);

  // Slides State
  const [slideMode, setSlideMode] = useState<'topic' | 'text'>('topic');
  const [topic, setTopic] = useState('');
  const [slideText, setSlideText] = useState('');
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isGeneratingSlides, setIsGeneratingSlides] = useState(false);

  const handleSummarize = async () => {
    if (!inputText.trim()) return;
    setIsSummarizing(true);
    const result = await gemini.summarizeText(inputText);
    setSummary(result || 'خطا در دریافت خلاصه.');
    setIsSummarizing(false);
  };

  const handleGenerateSlides = async () => {
    if (slideMode === 'topic' && !topic.trim()) return;
    if (slideMode === 'text' && !slideText.trim()) return;

    setIsGeneratingSlides(true);
    setSlides([]);
    
    let result;
    if (slideMode === 'topic') {
        result = await gemini.generateSlides(topic);
    } else {
        result = await gemini.generateSlidesFromText(slideText);
    }
    
    // Type assertion to include iconKeyword if it comes from API
    setSlides(result as Slide[]);
    setIsGeneratingSlides(false);
  };

  const handlePrintSlides = () => {
      const element = document.getElementById('slides-preview');
      const opt = {
        margin: 0,
        filename: `Presentation-${topic || 'Slides'}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };
      
      // @ts-ignore
      if (window.html2pdf) {
        // @ts-ignore
        window.html2pdf().set(opt).from(element).save();
      } else {
        window.print();
      }
  };

  return (
    <div className="space-y-8 animate-in fade-in">
       {/* Header */}
       <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
         <div className="relative z-10">
           <h1 className="text-3xl font-black mb-4 flex items-center gap-3">
             <Sparkles className="w-8 h-8 text-yellow-300" />
             ابزارهای مطالعه هوشمند
           </h1>
           <p className="opacity-90 max-w-2xl text-lg">
             خلاصه‌سازی جزوات طولانی و ساخت اسلاید پاورپوینت در چند ثانیه با هوش مصنوعی.
           </p>
         </div>
       </div>
 
       {/* Tabs */}
       <div className="flex gap-4 border-b border-slate-200 pb-2">
         <button 
           onClick={() => setActiveTab('summarizer')} 
           className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'summarizer' ? 'bg-blue-100 text-blue-700' : 'text-slate-500 hover:bg-slate-50'}`}
         >
           <AlignLeft className="w-5 h-5" />
           خلاصه‌ساز جزوه
         </button>
         <button 
           onClick={() => setActiveTab('slides')} 
           className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'slides' ? 'bg-blue-100 text-blue-700' : 'text-slate-500 hover:bg-slate-50'}`}
         >
           <MonitorPlay className="w-5 h-5" />
           پاورپوینت ساز
         </button>
       </div>

       {activeTab === 'summarizer' && (
         <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
               <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 h-full">
                  <label className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                     <FileText className="w-5 h-5 text-blue-600" />
                     متن اصلی جزوه یا کتاب
                  </label>
                  <textarea 
                     value={inputText}
                     onChange={(e) => setInputText(e.target.value)}
                     className="w-full min-h-[400px] p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-500 resize-none text-slate-700 leading-relaxed"
                     placeholder="متن طولانی خود را اینجا کپی کنید..."
                  ></textarea>
                  <button 
                     onClick={handleSummarize}
                     disabled={isSummarizing || !inputText}
                     className="w-full mt-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:bg-slate-300"
                  >
                     {isSummarizing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'خلاصه کن'}
                  </button>
               </div>
            </div>

            <div className="space-y-4">
               <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 h-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                  <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                     <Check className="w-5 h-5 text-green-500" />
                     خلاصه هوشمند
                  </h3>
                  
                  {summary ? (
                     <div className="prose prose-slate max-w-none leading-loose text-justify text-slate-700 whitespace-pre-wrap">
                        {summary}
                     </div>
                  ) : (
                     <div className="h-64 flex flex-col items-center justify-center text-slate-400">
                        <Layers className="w-12 h-12 mb-2 opacity-50" />
                        <p>هنوز متنی پردازش نشده است.</p>
                     </div>
                  )}
               </div>
            </div>
         </div>
       )}

       {activeTab === 'slides' && (
          <div className="space-y-8">
             <div className="max-w-3xl mx-auto bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                <div className="flex justify-center mb-6">
                    <div className="bg-slate-100 p-1 rounded-xl flex">
                        <button 
                            onClick={() => setSlideMode('topic')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${slideMode === 'topic' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                        >
                            <Type className="w-4 h-4" />
                            بر اساس موضوع
                        </button>
                        <button 
                            onClick={() => setSlideMode('text')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${slideMode === 'text' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                        >
                            <Text className="w-4 h-4" />
                            بر اساس متن کامل
                        </button>
                    </div>
                </div>

                {slideMode === 'topic' ? (
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-slate-800 mb-4">موضوع ارائه شما چیست؟</h3>
                        <div className="flex gap-2">
                        <input 
                            type="text" 
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="مثلاً: تاریخچه هوش مصنوعی، گرمایش جهانی..." 
                            className="flex-1 p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:border-blue-500 text-slate-900"
                        />
                        </div>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">متن خود را وارد کنید</h3>
                        <textarea 
                            value={slideText}
                            onChange={(e) => setSlideText(e.target.value)}
                            placeholder="متن مقاله، جزوه یا تحقیق خود را اینجا کپی کنید..."
                            className="w-full h-48 p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:border-blue-500 resize-none text-slate-900"
                        />
                    </div>
                )}
                
                <button 
                    onClick={handleGenerateSlides}
                    disabled={isGeneratingSlides || (slideMode === 'topic' ? !topic : !slideText)}
                    className="w-full mt-4 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-colors disabled:bg-slate-300 flex items-center justify-center gap-2"
                >
                    {isGeneratingSlides ? <Loader2 className="w-5 h-5 animate-spin" /> : 'ساخت پاورپوینت هوشمند'}
                </button>
             </div>

             {slides.length > 0 && (
                <div className="animate-in slide-in-from-bottom-8">
                   <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-slate-700 text-lg flex items-center gap-2">
                         <Presentation className="w-6 h-6 text-indigo-600" />
                         پیش‌نمایش اسلایدها
                      </h3>
                      <button 
                         onClick={handlePrintSlides}
                         className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-900"
                      >
                         <Download className="w-4 h-4" />
                         دانلود PDF
                      </button>
                   </div>
                   
                   {/* Slides Preview Container - A4 Landscape width approx 297mm */}
                   {/* Mobile Scrollable */}
                   <div className="overflow-x-auto pb-4 flex justify-center">
                       <div id="slides-preview" className="flex flex-col gap-8 bg-slate-200 p-8 rounded-3xl items-center min-w-fit">
                          {slides.map((slide, index) => (
                             // 16:9 Aspect Ratio Container for Print
                             <div 
                                key={index} 
                                className="w-[260mm] aspect-video bg-white relative overflow-hidden shadow-2xl flex page-break-after-always"
                                style={{ pageBreakAfter: 'always' }}
                             >
                                {/* --- Vector Decoration Background --- */}
                                {/* Top Right Blob */}
                                <div className={`absolute top-[-20%] right-[-10%] w-[50%] h-[60%] rounded-full opacity-20 ${index % 2 === 0 ? 'bg-blue-500' : 'bg-indigo-500'}`}></div>
                                <div className={`absolute top-[-10%] right-[-5%] w-[40%] h-[50%] rounded-full opacity-20 ${index % 2 === 0 ? 'bg-indigo-500' : 'bg-blue-500'}`}></div>
                                
                                {/* Bottom Left Blob */}
                                <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[40%] bg-slate-100 rounded-tr-full z-0"></div>

                                {/* Left Sidebar (Visual Anchor) */}
                                <div className={`w-[15%] h-full flex flex-col items-center justify-center relative z-10 ${index % 2 === 0 ? 'bg-gradient-to-b from-blue-600 to-blue-800' : 'bg-gradient-to-b from-indigo-600 to-indigo-800'}`}>
                                    <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md mb-4 shadow-inner">
                                        {getSlideIcon((slide as any).iconKeyword)}
                                    </div>
                                    <span className="text-white font-black text-4xl opacity-50">{index + 1}</span>
                                </div>

                                {/* Content Area */}
                                <div className="flex-1 p-12 flex flex-col justify-center relative z-10">
                                    <h2 className={`text-4xl font-black mb-8 pb-4 border-b-4 w-fit ${index % 2 === 0 ? 'text-slate-800 border-blue-200' : 'text-slate-800 border-indigo-200'}`}>
                                        {slide.title}
                                    </h2>
                                    
                                    <ul className="space-y-6">
                                        {slide.content.map((point, i) => (
                                            <li key={i} className="flex items-start gap-4 text-slate-600 text-xl font-medium leading-relaxed">
                                                <div className={`w-3 h-3 rounded-full mt-3 shrink-0 ${index % 2 === 0 ? 'bg-blue-500' : 'bg-indigo-500'}`}></div>
                                                {point}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Footer Logo/Branding */}
                                    <div className="absolute bottom-8 left-12 flex items-center gap-2 opacity-30">
                                        <Sparkles className="w-5 h-5 text-slate-800" />
                                        <span className="font-bold text-sm text-slate-800 tracking-widest uppercase">UniPlus Smart Slide</span>
                                    </div>
                                </div>
                             </div>
                          ))}
                       </div>
                   </div>
                </div>
             )}
          </div>
       )}
    </div>
  );
};

export default SmartStudy;
