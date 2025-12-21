
import React, { useState, useMemo } from 'react';
import { 
  BrainCircuit, 
  RotateCw, 
  Plus, 
  Check, 
  X, 
  Layers, 
  GraduationCap, 
  Languages, 
  BookOpen, 
  Gamepad2, 
  Search, 
  Volume2, 
  Sparkles, 
  Loader2, 
  Book,
  PenTool,
  CheckCircle2,
  AlertCircle,
  Play,
  Image as ImageIcon,
  ChevronRight
} from 'lucide-react';
import { Flashcard } from '../types';
import { gemini } from '../services/geminiService';

const StudyTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'review' | 'add' | 'language'>('review');
  const [flipped, setFlipped] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // --- LANGUAGE LAB STATE ---
  const [langSubTab, setLangSubTab] = useState<'lesson' | 'story' | 'dict' | 'game'>('lesson');
  
  // Lesson State
  const [lessonTopic, setLessonTopic] = useState('');
  const [lessonLevel, setLessonLevel] = useState('A2 (Elementary)');
  const [currentLesson, setCurrentLesson] = useState<any>(null);
  const [isLessonLoading, setIsLessonLoading] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  // Dictionary State
  const [dictInput, setDictInput] = useState('');
  const [dictResult, setDictResult] = useState<any>(null);
  const [isDictLoading, setIsDictLoading] = useState(false);

  // Story State
  const [currentStory, setCurrentStory] = useState<any>(null);
  const [isStoryLoading, setIsStoryLoading] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const sampleStories = useMemo(() => [
    {
      titleEn: "The Thirsty Crow",
      titleFa: "کلاغ تشنه",
      level: "A1-A2",
      paragraphs: [
        { en: "One hot summer day, a crow became very thirsty. He flew around looking for water.", fa: "یک روز گرم تابستانی، کلاغی بسیار تشنه شد. او به اطراف پرواز کرد تا آب پیدا کند." },
        { en: "Finally, he saw a pitcher in a garden. He flew down to it with great delight.", fa: "سرانجام، کوزه‌ای را در باغی دید. با خوشحالی بسیار به سمت آن پرواز کرد." },
        { en: "But the water level was very low. He could not reach it with his beak.", fa: "اما سطح آب بسیار پایین بود. او نمی‌توانست با منقارش به آن برسد." },
        { en: "He thought of a plan. He picked up some stones and dropped them into the pitcher one by one.", fa: "او نقشه‌ای کشید. تعدادی سنگ برداشت و یکی‌یکی داخل کوزه انداخت." },
        { en: "The water level rose. The crow drank the water and flew away happily.", fa: "سطح آب بالا آمد. کلاغ آب خورد و با خوشحالی پرواز کرد و رفت." }
      ]
    },
    {
      titleEn: "The Lion and the Mouse",
      titleFa: "شیر و موش",
      level: "A2",
      paragraphs: [
        { en: "A lion was sleeping in the forest. A little mouse started playing on him.", fa: "شیری در جنگل خوابیده بود. موش کوچکی شروع به بازی روی او کرد." },
        { en: "The lion woke up and caught the mouse. He was about to kill him.", fa: "شیر بیدار شد و موش را گرفت. او می‌خواست موش را بکشد." },
        { en: "The mouse begged for mercy. 'Please let me go, I might help you someday.'", fa: "موش التماس کرد. 'لطفاً مرا رها کن، شاید روزی به تو کمک کنم.'" },
        { en: "The lion laughed and let him go. A few days later, the lion got caught in a hunter's net.", fa: "شیر خندید و او را رها کرد. چند روز بعد، شیر در دام شکارچی گرفتار شد." },
        { en: "The mouse heard his roar, came quickly, and cut the net with his teeth. The lion was free.", fa: "موش صدای غرش او را شنید، به سرعت آمد و تور را با دندان‌هایش برید. شیر آزاد شد." }
      ]
    },
    {
      titleEn: "The Golden Egg",
      titleFa: "تخم طلا",
      level: "B1",
      paragraphs: [
        { en: "A farmer had a goose that laid one golden egg every day.", fa: "کشاورزی غازی داشت که هر روز یک تخم طلا می‌گذاشت." },
        { en: "The egg provided enough money for the farmer and his wife for their daily needs.", fa: "آن تخم‌مرغ پول کافی برای نیازهای روزانه کشاورز و همسرش فراهم می‌کرد." },
        { en: "The farmer and his wife continued to be happy for a long time.", fa: "کشاورز و همسرش برای مدت طولانی خوشحال بودند." },
        { en: "But one day, the farmer thought to himself, 'Why should we take just one egg a day?'", fa: "اما یک روز، کشاورز با خود فکر کرد: 'چرا باید روزی فقط یک تخم‌مرغ برداریم؟'" },
        { en: "He decided to cut open the goose and take all the gold at once. But when he killed the goose, he found nothing inside.", fa: "او تصمیم گرفت شکم غاز را پاره کند و تمام طلاها را یکجا بردارد. اما وقتی غاز را کشت، هیچ چیز در درونش نیافت." }
      ]
    }
  ], []);

  // Game State
  const [gameWord, setGameWord] = useState<{scrambled: string, original: string, hint: string} | null>(null);
  const [gameInput, setGameInput] = useState('');
  const [gameMessage, setGameMessage] = useState('');

  // --- LEITNER STATE (Existing) ---
  const flashcards = useMemo(() => {
      const generated: Flashcard[] = [
        { 
            id: '1', 
            question: 'Epiphany', 
            answer: 'تجلی / کشف ناگهانی', 
            meaning: 'A moment of sudden and great revelation or realization.',
            example: 'He had an epiphany that changed his life forever.',
            box: 1,
            image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=400&q=80' // Lightbulb concept
        },
        { 
            id: '2', 
            question: 'Serendipity', 
            answer: 'خوش‌بیاری / اتفاق خوب', 
            meaning: 'Finding something good without looking for it.',
            example: 'Meeting her was pure serendipity.',
            box: 2 
        },
        { 
            id: '3', 
            question: 'پیچیدگی زمانی Merge Sort', 
            answer: 'O(n log n)', 
            meaning: 'در تمام حالات (بدترین، بهترین و متوسط) ثابت است.',
            box: 1 
        },
        { 
            id: '4', 
            question: 'Resilience', 
            answer: 'تاب‌آوری / استقامت', 
            meaning: 'The capacity to recover quickly from difficulties.',
            box: 3 
        },
      ];
      return generated;
  }, []);

  const [cards, setCards] = useState<Flashcard[]>(flashcards);
  const boxes = [1, 2, 3, 4, 5];
  const currentCard = cards[currentCardIndex];

  // --- HANDLERS ---

  const handleNextCard = (known: boolean) => {
    setFlipped(false);
    setTimeout(() => {
      setCards(prev => {
        const newCards = [...prev];
        const card = newCards[currentCardIndex];
        if (known) {
            card.box = Math.min(card.box + 1, 5);
        } else {
            card.box = 1;
        }
        return newCards;
      });
      setCurrentCardIndex((prev) => (prev + 1) % cards.length);
    }, 400); // Increased timeout to match animation duration
  };

  const speakText = (e: React.MouseEvent, text: string) => {
    e.stopPropagation(); // Prevent card flip
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = /^[a-zA-Z\s.,?!']+$/.test(text) ? 'en-US' : 'fa-IR'; // Simple detection
    window.speechSynthesis.speak(utterance);
  };

  // --- LANGUAGE HANDLERS ---

  const handleGenerateLesson = async () => {
    if (!lessonTopic.trim()) return;
    setIsLessonLoading(true);
    setQuizAnswer(null);
    setCurrentLesson(null);
    const result = await gemini.generateLanguageLesson(lessonLevel, lessonTopic);
    setCurrentLesson(result);
    setIsLessonLoading(false);
  };

  const handleCheckGrammar = async () => {
    if (!dictInput.trim()) return;
    setIsDictLoading(true);
    setDictResult(null);
    const result = await gemini.checkGrammarAndDict(dictInput);
    setDictResult(result);
    setIsDictLoading(false);
  };

  const handleGenerateStory = async () => {
    setIsStoryLoading(true);
    setShowTranslation(false);
    const result = await gemini.generateBilingualStory(lessonLevel, 'Fiction/Daily Life');
    setCurrentStory(result);
    setIsStoryLoading(false);
  };

  const startWordGame = () => {
    const words = [
      { w: 'university', h: 'Place of higher education' },
      { w: 'knowledge', h: 'Facts and skills acquired' },
      { w: 'science', h: 'Systematic study of structure' },
      { w: 'student', h: 'A person who is studying' },
      { w: 'teacher', h: 'A person who teaches' }
    ];
    const pick = words[Math.floor(Math.random() * words.length)];
    const scrambled = pick.w.split('').sort(() => Math.random() - 0.5).join('');
    setGameWord({ scrambled, original: pick.w, hint: pick.h });
    setGameInput('');
    setGameMessage('');
  };

  const checkGameWord = () => {
    if (!gameWord) return;
    if (gameInput.toLowerCase().trim() === gameWord.original) {
      setGameMessage('✅ آفرین! درست بود.');
      setTimeout(startWordGame, 1500);
    } else {
      setGameMessage('❌ اشتباه بود، دوباره تلاش کن.');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
                <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
                    <BrainCircuit className="w-8 h-8" />
                    مرکز یادگیری هوشمند
                </h1>
                <p className="opacity-90">
                    جعبه لایتنر برای مرور، و دستیار هوشمند برای یادگیری زبان انگلیسی.
                </p>
            </div>
            <div className="hidden md:flex gap-2">
                {boxes.map(box => {
                    const count = cards.filter(f => f.box === box).length;
                    return (
                        <div key={box} className="flex flex-col items-center bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/20">
                            <span className="text-xs opacity-70 mb-1">خانه {box}</span>
                            <span className="text-xl font-bold">{count}</span>
                        </div>
                    );
                })}
            </div>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        <button onClick={() => setActiveTab('review')} className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'review' ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
            <RotateCw className="w-5 h-5"/> مرور لایتنر
        </button>
        <button onClick={() => setActiveTab('add')} className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'add' ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
            <Plus className="w-5 h-5"/> افزودن کارت
        </button>
        <button onClick={() => setActiveTab('language')} className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'language' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
            <Languages className="w-5 h-5"/> آموزش زبان (AI)
        </button>
      </div>

      {/* --- LEITNER REVIEW TAB --- */}
      {activeTab === 'review' && (
        <div className="max-w-2xl mx-auto">
            {currentCard ? (
                <div className="perspective-1000">
                    <div 
                        className={`relative w-full min-h-[400px] cursor-pointer transition-all duration-700 transform-style-3d group ${flipped ? 'rotate-y-180' : ''}`}
                        onClick={() => setFlipped(!flipped)}
                    >
                        {/* --- Front Side (Question) --- */}
                        <div className="absolute inset-0 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border-2 border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden backface-hidden">
                            {/* Top Bar */}
                            <div className="flex justify-between items-center p-6 bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-3 py-1 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
                                    خانه {currentCard.box}
                                </span>
                                <button 
                                    onClick={(e) => speakText(e, currentCard.question)}
                                    className="p-2 rounded-full hover:bg-white dark:hover:bg-slate-700 text-indigo-500 transition-colors"
                                >
                                    <Volume2 className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-6">
                                {currentCard.image && (
                                    <img src={currentCard.image} alt="Hint" className="w-32 h-32 rounded-2xl object-cover shadow-md" />
                                )}
                                <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100 leading-relaxed dir-auto">
                                    {currentCard.question}
                                </h3>
                            </div>

                            {/* Footer */}
                            <div className="p-4 text-center text-xs text-slate-400 dark:text-slate-500 font-bold bg-slate-50 dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
                                برای دیدن پاسخ کلیک کنید
                            </div>
                        </div>

                        {/* --- Back Side (Answer) --- */}
                        <div 
                            className="absolute inset-0 bg-indigo-50 dark:bg-slate-900 rounded-[2.5rem] shadow-xl border-2 border-indigo-100 dark:border-indigo-900/30 flex flex-col overflow-hidden backface-hidden rotate-y-180"
                        >
                            {/* Top Bar */}
                            <div className="flex justify-between items-center p-6 bg-indigo-100/50 dark:bg-indigo-900/20 border-b border-indigo-200 dark:border-indigo-900/30">
                                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 bg-white dark:bg-slate-800 px-3 py-1 rounded-full shadow-sm">
                                    پاسخ
                                </span>
                                <button 
                                    onClick={(e) => speakText(e, currentCard.answer)}
                                    className="p-2 rounded-full hover:bg-white dark:hover:bg-slate-800 text-indigo-600 dark:text-indigo-400 transition-colors"
                                >
                                    <Volume2 className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center overflow-y-auto custom-scrollbar">
                                <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-4 dir-auto">
                                    {currentCard.answer}
                                </h3>
                                
                                {currentCard.meaning && (
                                    <div className="mb-4 bg-white/60 dark:bg-slate-800/50 p-3 rounded-xl w-full border border-indigo-100 dark:border-indigo-900/30">
                                        <span className="block text-xs font-bold text-indigo-400 mb-1 uppercase tracking-wider">Meaning</span>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed dir-auto">{currentCard.meaning}</p>
                                    </div>
                                )}

                                {currentCard.example && (
                                    <div className="bg-white/60 dark:bg-slate-800/50 p-3 rounded-xl w-full border border-indigo-100 dark:border-indigo-900/30">
                                        <span className="block text-xs font-bold text-indigo-400 mb-1 uppercase tracking-wider">Example</span>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 italic dir-ltr">"{currentCard.example}"</p>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="p-6 bg-white dark:bg-slate-900 border-t border-indigo-100 dark:border-slate-800 flex gap-4" onClick={(e) => e.stopPropagation()}>
                                <button 
                                    onClick={() => handleNextCard(false)}
                                    className="flex-1 py-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl font-bold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors flex items-center justify-center gap-2 shadow-sm"
                                >
                                    <X className="w-5 h-5" />
                                    بلد نبودم
                                </button>
                                <button 
                                    onClick={() => handleNextCard(true)}
                                    className="flex-1 py-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl font-bold hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors flex items-center justify-center gap-2 shadow-sm"
                                >
                                    <Check className="w-5 h-5" />
                                    بلد بودم
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 animate-in zoom-in-95">
                    <div className="p-6 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full w-fit mx-auto mb-6 shadow-lg shadow-emerald-100 dark:shadow-none">
                        <Check className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">عالی بود!</h3>
                    <p className="text-slate-500 dark:text-slate-400">تمام کارت‌های امروز را مرور کردید.</p>
                    <button onClick={() => setCurrentCardIndex(0)} className="mt-8 text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
                        مرور مجدد
                    </button>
                </div>
            )}
            
            <div className="mt-8 flex justify-center">
                <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-full shadow-sm text-xs font-bold text-slate-400 border border-slate-100 dark:border-slate-800">
                    کارت {currentCardIndex + 1} از {cards.length}
                </div>
            </div>
        </div>
      )}

      {/* --- ADD CARD TAB --- */}
      {activeTab === 'add' && (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-slate-100">
                <Plus className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                ساخت فلش‌کارت جدید
            </h3>
            <div className="space-y-6">
                <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">سوال (روی کارت)</label>
                    <input type="text" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-violet-500 text-slate-900 dark:text-white" placeholder="مثلاً: پایتخت فرانسه کجاست؟" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">پاسخ (پشت کارت)</label>
                    <textarea rows={3} className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-violet-500 text-slate-900 dark:text-white" placeholder="پاریس"></textarea>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">معنی / توضیح (اختیاری)</label>
                        <input type="text" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-violet-500 text-slate-900 dark:text-white" placeholder="توضیح بیشتر..." />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">مثال (اختیاری)</label>
                        <input type="text" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-violet-500 text-slate-900 dark:text-white" placeholder="یک جمله مثال..." />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="flex-1 py-3 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-slate-500 dark:text-slate-400 font-bold hover:border-violet-500 dark:hover:border-violet-500 hover:text-violet-500 dark:hover:text-violet-500 transition-colors flex items-center justify-center gap-2">
                        <ImageIcon className="w-5 h-5" />
                        افزودن تصویر
                    </button>
                </div>

                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl text-amber-800 dark:text-amber-300 text-xs flex items-start gap-3 leading-relaxed border border-amber-100 dark:border-amber-900/30">
                    <GraduationCap className="w-5 h-5 shrink-0" />
                    <p>نکته: می‌توانید با استفاده از هوش مصنوعی در بخش "دستیار"، از جزوه‌های خود به صورت خودکار فلش‌کارت بسازید.</p>
                </div>
                
                <button className="w-full py-4 bg-violet-600 text-white rounded-2xl font-bold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-violet-200 dark:shadow-none">
                    <Plus className="w-5 h-5" />
                    افزودن به جعبه لایتنر
                </button>
            </div>
        </div>
      )}

      {/* --- LANGUAGE LAB TAB --- */}
      {activeTab === 'language' && (
          <div className="space-y-6">
              {/* Sub Navigation */}
              <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-wrap gap-2 justify-center">
                  {[
                      { id: 'lesson', label: 'آموزش هوشمند', icon: Sparkles },
                      { id: 'story', label: 'داستان دو زبانه', icon: BookOpen },
                      { id: 'dict', label: 'دیکشنری و گرامر', icon: Search },
                      { id: 'game', label: 'بازی واژگان', icon: Gamepad2 },
                  ].map(tab => (
                      <button 
                        key={tab.id}
                        onClick={() => setLangSubTab(tab.id as any)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${langSubTab === tab.id ? 'bg-indigo-600 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                      >
                          <tab.icon className="w-4 h-4"/> {tab.label}
                      </button>
                  ))}
              </div>

              {/* 1. Smart Lesson */}
              {langSubTab === 'lesson' && (
                  <div className="max-w-3xl mx-auto space-y-6">
                      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                          <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">تنظیمات درس</h3>
                          <div className="flex flex-col md:flex-row gap-4 mb-4">
                              <select 
                                value={lessonLevel} 
                                onChange={(e) => setLessonLevel(e.target.value)}
                                className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none text-sm text-slate-900 dark:text-slate-200"
                              >
                                  <option>A1 (Beginner)</option>
                                  <option>A2 (Elementary)</option>
                                  <option>B1 (Intermediate)</option>
                                  <option>B2 (Upper Intermediate)</option>
                                  <option>C1 (Advanced)</option>
                              </select>
                              <input 
                                type="text" 
                                placeholder="موضوع درس (مثلاً: Travel, Business, Grammar...)" 
                                value={lessonTopic}
                                onChange={(e) => setLessonTopic(e.target.value)}
                                className="flex-1 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none text-sm text-slate-900 dark:text-slate-200"
                              />
                              <button 
                                onClick={handleGenerateLesson}
                                disabled={isLessonLoading || !lessonTopic}
                                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:bg-slate-300 dark:disabled:bg-slate-700 flex items-center gap-2"
                              >
                                  {isLessonLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : <Sparkles className="w-5 h-5"/>}
                                  شروع درس
                              </button>
                          </div>
                      </div>

                      {currentLesson && (
                          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-in slide-in-from-bottom-4">
                              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 border-b border-indigo-100 dark:border-indigo-900/50">
                                  <h2 className="text-2xl font-black text-indigo-900 dark:text-indigo-300 mb-2">{currentLesson.title}</h2>
                                  <p className="text-indigo-700 dark:text-indigo-200 text-sm leading-relaxed">{currentLesson.explanation}</p>
                              </div>
                              
                              <div className="p-6 space-y-6">
                                  <div>
                                      <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2"><Book className="w-5 h-5 text-indigo-500 dark:text-indigo-400"/> مثال‌ها</h4>
                                      <div className="space-y-3">
                                          {currentLesson.examples.map((ex: any, i: number) => (
                                              <div key={i} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl flex justify-between items-center group">
                                                  <div>
                                                      <p className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-1">{ex.en}</p>
                                                      <p className="text-slate-500 dark:text-slate-400 text-sm">{ex.fa}</p>
                                                  </div>
                                                  <button onClick={(e) => speakText(e, ex.en)} className="p-3 bg-white dark:bg-slate-700 rounded-full shadow-sm text-indigo-500 dark:text-indigo-400 hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white transition-colors">
                                                      <Volume2 className="w-5 h-5" />
                                                  </button>
                                              </div>
                                          ))}
                                      </div>
                                  </div>

                                  <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                                      <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> کوییز کوتاه</h4>
                                      <p className="mb-4 text-slate-800 dark:text-slate-200 font-medium">{currentLesson.quiz.question}</p>
                                      <div className="grid grid-cols-1 gap-2">
                                          {currentLesson.quiz.options.map((opt: string, i: number) => (
                                              <button 
                                                key={i}
                                                onClick={() => setQuizAnswer(i)}
                                                className={`p-3 rounded-xl text-right transition-all border-2 ${
                                                    quizAnswer === i 
                                                    ? (i === currentLesson.quiz.correctIndex ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-700 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-400')
                                                    : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
                                                }`}
                                              >
                                                  {opt}
                                                  {quizAnswer === i && i === currentLesson.quiz.correctIndex && <Check className="w-4 h-4 inline-block mr-2"/>}
                                                  {quizAnswer === i && i !== currentLesson.quiz.correctIndex && <X className="w-4 h-4 inline-block mr-2"/>}
                                              </button>
                                          ))}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      )}
                  </div>
              )}

              {/* 2. Dictionary & Grammar */}
              {langSubTab === 'dict' && (
                  <div className="max-w-2xl mx-auto space-y-6">
                      <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
                          <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                              <PenTool className="w-5 h-5 text-indigo-600 dark:text-indigo-400"/>
                              بررسی متن و دیکشنری
                          </h3>
                          <textarea 
                            value={dictInput}
                            onChange={(e) => setDictInput(e.target.value)}
                            placeholder="متن یا کلمه انگلیسی خود را وارد کنید..."
                            className="w-full h-32 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none resize-none text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-indigo-500 mb-4"
                          ></textarea>
                          <button 
                            onClick={handleCheckGrammar}
                            disabled={isDictLoading || !dictInput}
                            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:bg-slate-300 dark:disabled:bg-slate-700 flex items-center justify-center gap-2"
                          >
                              {isDictLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : 'بررسی کن'}
                          </button>
                      </div>

                      {dictResult && (
                          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-lg border border-slate-100 dark:border-slate-800 animate-in slide-in-from-bottom-4">
                              <div className="flex items-center gap-2 mb-4">
                                  {dictResult.isCorrect ? (
                                      <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Check className="w-3 h-3"/> صحیح</span>
                                  ) : (
                                      <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><X className="w-3 h-3"/> دارای اشکال</span>
                                  )}
                                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full text-xs font-bold">{dictResult.type === 'word' ? 'کلمه' : 'جمله'}</span>
                              </div>

                              {!dictResult.isCorrect && (
                                  <div className="mb-4 bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl border border-red-100 dark:border-red-900/30">
                                      <span className="text-xs text-red-500 dark:text-red-400 font-bold block mb-1">شکل صحیح:</span>
                                      <p className="text-lg font-bold text-red-700 dark:text-red-300">{dictResult.corrected}</p>
                                  </div>
                              )}

                              <div className="space-y-4">
                                  <div>
                                      <span className="text-xs text-slate-400 dark:text-slate-500 font-bold block mb-1">ترجمه:</span>
                                      <p className="text-slate-800 dark:text-slate-200 font-medium">{dictResult.translation}</p>
                                  </div>
                                  <div>
                                      <span className="text-xs text-slate-400 dark:text-slate-500 font-bold block mb-1">توضیح / معنی:</span>
                                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{dictResult.explanation}</p>
                                  </div>
                                  {dictResult.synonyms && dictResult.synonyms.length > 0 && (
                                      <div>
                                          <span className="text-xs text-slate-400 dark:text-slate-500 font-bold block mb-1">مترادف‌ها:</span>
                                          <div className="flex gap-2">
                                              {dictResult.synonyms.map((s: string, i: number) => (
                                                  <span key={i} className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-lg text-sm border border-indigo-100 dark:border-indigo-900/50">{s}</span>
                                              ))}
                                          </div>
                                      </div>
                                  )}
                              </div>
                          </div>
                      )}
                  </div>
              )}

              {/* 3. Bilingual Stories */}
              {langSubTab === 'story' && (
                  <div className="space-y-6">
                      {!currentStory ? (
                          <div className="space-y-6">
                              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 text-center">
                                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-indigo-200 dark:text-indigo-800"/>
                                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">داستان کوتاه دو زبانه (AI)</h3>
                                  <p className="text-slate-500 dark:text-slate-400 mb-6">یک داستان جدید متناسب با سطح شما تولید می‌شود.</p>
                                  <button 
                                    onClick={handleGenerateStory}
                                    disabled={isStoryLoading}
                                    className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:bg-slate-300 flex items-center justify-center gap-2 mx-auto"
                                  >
                                      {isStoryLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : 'تولید داستان جدید'}
                                  </button>
                              </div>

                              <div>
                                  <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-4 px-2">نمونه داستان‌های آماده</h4>
                                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                      {sampleStories.map((story, idx) => (
                                          <div 
                                            key={idx} 
                                            onClick={() => { setShowTranslation(false); setCurrentStory(story); }}
                                            className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                                          >
                                              <div>
                                                  <div className="flex justify-between items-start mb-2">
                                                      <span className="text-xs font-bold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-2 py-1 rounded-lg">{story.level}</span>
                                                      <BookOpen className="w-4 h-4 text-slate-400" />
                                                  </div>
                                                  <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">{story.titleEn}</h3>
                                                  <p className="text-xs text-slate-500 dark:text-slate-400">{story.titleFa}</p>
                                              </div>
                                              <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                                  <span>مطالعه داستان</span>
                                                  <ChevronRight className="w-4 h-4 group-hover:translate-x-[-2px] transition-transform" />
                                              </div>
                                          </div>
                                      ))}
                                  </div>
                              </div>
                          </div>
                      ) : (
                          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-in fade-in">
                              <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
                                  <div>
                                      <h2 className="text-2xl font-black mb-1">{currentStory.titleEn}</h2>
                                      <p className="opacity-80 text-sm">{currentStory.titleFa}</p>
                                  </div>
                                  <button onClick={() => setCurrentStory(null)} className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
                                      <X className="w-5 h-5"/>
                                  </button>
                              </div>
                              <div className="p-6 md:p-8 space-y-6">
                                  <div className="flex justify-end mb-4">
                                      <button 
                                        onClick={() => setShowTranslation(!showTranslation)}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${showTranslation ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/50' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}
                                      >
                                          {showTranslation ? 'مخفی کردن ترجمه' : 'نمایش ترجمه فارسی'}
                                      </button>
                                  </div>
                                  
                                  {currentStory.paragraphs.map((para: any, i: number) => (
                                      <div key={i} className="space-y-3">
                                          <div className="flex justify-between items-start gap-4">
                                              <p className="text-lg text-slate-800 dark:text-slate-200 leading-8 font-medium dir-ltr text-left flex-1">{para.en}</p>
                                              <button onClick={(e) => speakText(e, para.en)} className="p-2 text-indigo-400 hover:text-indigo-600 transition-colors">
                                                  <Volume2 className="w-5 h-5" />
                                              </button>
                                          </div>
                                          {showTranslation && (
                                              <p className="text-slate-500 dark:text-slate-400 text-sm leading-7 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border-r-4 border-indigo-300 dark:border-indigo-600">
                                                  {para.fa}
                                              </p>
                                          )}
                                      </div>
                                  ))}
                              </div>
                          </div>
                      )}
                  </div>
              )}

              {/* 4. Games */}
              {langSubTab === 'game' && (
                  <div className="max-w-xl mx-auto">
                      {!gameWord ? (
                          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-10 rounded-[2.5rem] text-center text-white shadow-xl">
                              <Gamepad2 className="w-20 h-20 mx-auto mb-6 opacity-80" />
                              <h3 className="text-2xl font-black mb-4">چالش واژگان</h3>
                              <p className="opacity-90 mb-8">حروف بهم ریخته را مرتب کن و کلمه صحیح را بساز.</p>
                              <button 
                                onClick={startWordGame}
                                className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg"
                              >
                                  شروع بازی <Play className="w-4 h-4 inline-block ml-2 fill-indigo-600"/>
                              </button>
                          </div>
                      ) : (
                          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-lg border border-slate-100 dark:border-slate-800 text-center animate-in zoom-in-95">
                              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block">Word Scramble</span>
                              <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400 mb-6 tracking-[0.5em] uppercase font-mono">
                                  {gameWord.scrambled}
                              </div>
                              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 bg-slate-50 dark:bg-slate-800 p-2 rounded-lg inline-block px-4">
                                  راهنمایی: {gameWord.hint}
                              </p>
                              
                              <input 
                                type="text" 
                                value={gameInput}
                                onChange={(e) => setGameInput(e.target.value)}
                                placeholder="کلمه صحیح را وارد کنید..."
                                className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center text-xl font-bold text-slate-800 dark:text-white outline-none border-2 border-slate-100 dark:border-slate-700 focus:border-indigo-500 mb-4"
                              />
                              
                              {gameMessage && <p className="mb-4 font-bold text-emerald-600 animate-pulse">{gameMessage}</p>}

                              <div className="flex gap-4">
                                  <button onClick={() => setGameWord(null)} className="flex-1 py-3 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800">انصراف</button>
                                  <button onClick={checkGameWord} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none">بررسی</button>
                              </div>
                          </div>
                      )}
                  </div>
              )}
          </div>
      )}
      
      {/* 3D Styles for Flip Card */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .dir-auto { direction: auto; }
        .dir-ltr { direction: ltr; }
      `}</style>
    </div>
  );
};

export default StudyTools;
