
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { 
  Gamepad2, Trophy, Brain, Calculator, Timer, Star, CheckCircle2, 
  Grid, Keyboard, Zap, EyeOff, Repeat, ArrowRight, ArrowLeft, 
  ArrowUp, ArrowDown, RefreshCw, Ghost, Rocket, Spade, 
  Circle, X as XIcon, Crosshair, Play, Pause, Layers,
  Cpu, Wrench, Hammer, FlaskConical, BarChart, Globe, BookOpen,
  Edit3, Target, Dices, Users, Club, Heart, Diamond, Building2, Briefcase
} from 'lucide-react';
import { QuizQuestion } from '../types';

// --- TYPES ---
type GameCategory = 'puzzle' | 'arcade' | 'board' | 'card' | 'skill';
type GameMode = 'menu' | 'math' | 'memory' | 'typing' | '2048' | 'quiz_playing' | 'result' | 'dino' | 'tictactoe' | 'space' | 'card_highlow' | 'snake' | 'snakes_ladders' | 'mench' | 'esm_famil' | 'bowling' | 'darts' | 'hokm' | 'shelem' | 'haft_khabis';

interface QuizDefinition {
    id: string;
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    xp: number;
    questions: QuizQuestion[];
}

const GameCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'games' | 'quiz' | 'leaderboard'>('games');
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>('card');
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  
  // --- Common Game State ---
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [resultMessage, setResultMessage] = useState('');
  const [gameRunning, setGameRunning] = useState(false);

  // --- Math Game State ---
  const [mathQuestion, setMathQuestion] = useState({ q: '', a: 0 });
  const [mathInput, setMathInput] = useState('');

  // --- Memory Game State ---
  const [memoryCards, setMemoryCards] = useState<{id: number, icon: string, flipped: boolean, matched: boolean}[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);

  // --- Typing Game State ---
  const [typingMode, setTypingMode] = useState<'classic' | 'reverse' | 'blind'>('classic');
  const [typingWord, setTypingWord] = useState('');
  const [typingInput, setTypingInput] = useState('');
  const [typingWordVisible, setTypingWordVisible] = useState(true);
  const [wordsTyped, setWordsTyped] = useState(0);

  // --- 2048 Game State ---
  const [grid2048, setGrid2048] = useState<number[][]>([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
  
  // --- Dino Game State ---
  const [dinoY, setDinoY] = useState(0);
  const [cactusLeft, setCactusLeft] = useState(600);
  const [isJumping, setIsJumping] = useState(false);
  const dinoRef = useRef<HTMLDivElement>(null);
  const cactusRef = useRef<HTMLDivElement>(null);

  // --- Tic Tac Toe State ---
  const [tttBoard, setTttBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  // --- Space Shooter State ---
  const [shipX, setShipX] = useState(50); // percentage
  const [bullets, setBullets] = useState<{id: number, x: number, y: number}[]>([]);
  const [enemies, setEnemies] = useState<{id: number, x: number, y: number}[]>([]);
  const gameLoopRef = useRef<any>(null);

  // --- Card Games Common State (HighLow, Hokm, Shelem, HaftKhabis) ---
  const [currentCard, setCurrentCard] = useState(Math.floor(Math.random() * 13) + 1);
  const [deckCount, setDeckCount] = useState(52);
  const [playerHand, setPlayerHand] = useState<any[]>([]); // For advanced card games
  const [tableCards, setTableCards] = useState<any[]>([]); // Cards played on table
  const [turn, setTurn] = useState<number>(0); // 0: Player, 1: Bot1, 2: Bot2, 3: Bot3

  // --- Snake State ---
  const [snake, setSnake] = useState<{x:number, y:number}[]>([{x:5, y:5}]);
  const [food, setFood] = useState({x:10, y:10});
  const [snakeDir, setSnakeDir] = useState<'UP'|'DOWN'|'LEFT'|'RIGHT'>('RIGHT');
  const snakeIntervalRef = useRef<any>(null);

  // --- Snakes & Ladders State ---
  const [slPlayers, setSlPlayers] = useState([1, 1]); // Positions for P1, P2
  const [slTurn, setSlTurn] = useState(0); // 0 or 1
  const [slDice, setSlDice] = useState<number | null>(null);
  const [slLog, setSlLog] = useState('');

  // --- Esm Famil State ---
  const [efLetter, setEfLetter] = useState('');
  const [efInputs, setEfInputs] = useState({ name: '', food: '', city: '', color: '' });
  const [efBotScore, setEfBotScore] = useState(0);
  const [efRound, setEfRound] = useState(1);

  // --- Bowling State ---
  const [bowlAim, setBowlAim] = useState(0); // -50 to 50
  const [bowlPower, setBowlPower] = useState(0); // 0 to 100
  const [bowlPhase, setBowlPhase] = useState<'aim' | 'power' | 'result'>('aim');
  const [bowlPins, setBowlPins] = useState([1,1,1,1,1,1,1,1,1,1]); // 10 pins

  // --- Darts State ---
  const [dartRotation, setDartRotation] = useState(0);
  const [dartThrows, setDartThrows] = useState(3);

  // --- Quiz State ---
  const [selectedQuizMajor, setSelectedQuizMajor] = useState('Computer');
  const [activeQuiz, setActiveQuiz] = useState<QuizDefinition | null>(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);

  // --- Lists & Data ---
  const wordList = [
    'دانشگاه', 'استاد', 'دانشجو', 'پروژه', 'امتحان', 'خوابگاه', 'سلف', 'مشروط', 
    'پایان‌نامه', 'کدنویسی', 'الگوریتم', 'هوش مصنوعی', 'کامپیوتر', 'اینترنت', 
    'برنامه‌نویسی', 'ریاضیات', 'فیزیک', 'شیمی', 'ادبیات', 'تاریخ', 'فلسفه'
  ];

  // --- QUIZ DATABASE ---
  const quizDatabase: Record<string, QuizDefinition[]> = useMemo(() => ({
    'Computer': [
        { id: 'comp-1', title: 'مبانی برنامه‌نویسی', description: 'الگوریتم، فلوچارت و مفاهیم پایه', difficulty: 'Easy', xp: 50, questions: [
            { id: 1, question: 'خروجی !True && False چیست؟', options: ['True', 'False', 'Error', 'Null'], correctAnswer: 1 }, 
            { id: 2, question: 'کدام ساختار برای تکرار استفاده می‌شود؟', options: ['If', 'Switch', 'For', 'Break'], correctAnswer: 2 }, 
            { id: 3, question: 'آرایه (Array) چیست؟', options: ['متغیر تکی', 'مجموعه داده هم‌نوع', 'تابع', 'کلاس'], correctAnswer: 1 },
            { id: 4, question: 'در زبان C، کدام عملگر آدرس متغیر را برمی‌گرداند؟', options: ['*', '&', '%', '$'], correctAnswer: 1 },
            { id: 5, question: 'کدام یک زبان سطح پایین است؟', options: ['Python', 'Java', 'Assembly', 'C++'], correctAnswer: 2 }
        ] },
        { id: 'comp-2', title: 'ساختمان داده', description: 'لیست پیوندی، صف، پشته و درخت', difficulty: 'Medium', xp: 100, questions: [
            { id: 1, question: 'پیچیدگی دسترسی در آرایه چقدر است؟', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'], correctAnswer: 2 }, 
            { id: 2, question: 'ساختار LIFO مربوط به کدام است؟', options: ['Queue', 'Stack', 'Tree', 'Graph'], correctAnswer: 1 },
            { id: 3, question: 'کدام الگوریتم مرتب‌سازی سریع‌ترین حالت متوسط را دارد؟', options: ['Bubble Sort', 'Insertion Sort', 'Quick Sort', 'Selection Sort'], correctAnswer: 2 },
            { id: 4, question: 'درخت جستجوی دودویی (BST) چه ویژگی دارد؟', options: ['فرزند چپ کوچکتر، راست بزرگتر', 'فرزند چپ بزرگتر، راست کوچکتر', 'همه فرزندان برابر', 'ترتیب خاصی ندارد'], correctAnswer: 0 }
        ] },
        { id: 'comp-3', title: 'سیستم عامل', description: 'مدیریت حافظه و پردازش', difficulty: 'Hard', xp: 150, questions: [
            { id: 1, question: 'Deadlock چیست؟', options: ['خطای حافظه', 'بن‌بست پردازش', 'سرعت بالا', 'قطع برق'], correctAnswer: 1 }, 
            { id: 2, question: 'وظیفه Kernel چیست؟', options: ['رابط گرافیکی', 'هسته مرکزی', 'کامپایلر', 'مرورگر'], correctAnswer: 1 },
            { id: 3, question: 'کدام الگوریتم زمان‌بندی غیرقابل‌توقف (Non-preemptive) است؟', options: ['Round Robin', 'FCFS', 'SRT', 'Multilevel Queue'], correctAnswer: 1 },
            { id: 4, question: 'Paging برای چه کاری استفاده می‌شود؟', options: ['مدیریت دیسک', 'مدیریت حافظه', 'مدیریت پردازش', 'مدیریت شبکه'], correctAnswer: 1 }
        ] },
    ],
    'Electrical': [
        { id: 'elec-1', title: 'مدارهای الکتریکی ۱', description: 'قوانین کیریشهف و تحلیل گره', difficulty: 'Easy', xp: 50, questions: [
            { id: 1, question: 'قانون اهم چیست؟', options: ['V=IR', 'P=VI', 'F=ma', 'E=mc2'], correctAnswer: 0 }, 
            { id: 2, question: 'واحد مقاومت چیست؟', options: ['آمپر', 'ولت', 'اهم', 'وات'], correctAnswer: 2 },
            { id: 3, question: 'توان مصرفی در مقاومت چگونه محاسبه می‌شود؟', options: ['RI', 'RI^2', 'VI', 'V/R'], correctAnswer: 2 }
        ] },
        { id: 'elec-2', title: 'الکترونیک', description: 'دیود، ترانزیستور و آپ‌امپ', difficulty: 'Medium', xp: 100, questions: [
            { id: 1, question: 'وظیفه دیود چیست؟', options: ['تقویت', 'یکسو سازی', 'مقاومت', 'خازن'], correctAnswer: 1 },
            { id: 2, question: 'ترانزیستور BJT دارای چند پایه است؟', options: ['۲', '۳', '۴', '۵'], correctAnswer: 1 },
            { id: 3, question: 'در بایاس مستقیم دیود ایده‌آل، ولتاژ دو سر آن چقدر است؟', options: ['0', '0.7', 'بی‌نهایت', 'منفی'], correctAnswer: 0 }
        ] },
        { id: 'elec-3', title: 'سیستم‌های قدرت', description: 'تولید و توزیع انرژی', difficulty: 'Hard', xp: 150, questions: [
            { id: 1, question: 'رله بوخهولتز در کجا استفاده می‌شود؟', options: ['ژنراتور', 'ترانسفورماتور', 'موتور', 'خطوط انتقال'], correctAnswer: 1 },
            { id: 2, question: 'هدف از ترانسپوز کردن خطوط انتقال چیست؟', options: ['کاهش تلفات کرونا', 'تعادل امپدانس‌ها', 'افزایش جریان', 'کاهش ولتاژ'], correctAnswer: 1 },
            { id: 3, question: 'کدام نیروگاه برای بار پایه (Base Load) مناسب است؟', options: ['گازی', 'هسته‌ای', 'دیزلی', 'تلمبه ذخیره‌ای'], correctAnswer: 1 }
        ] },
    ],
    'Mechanical': [
        { id: 'mech-1', title: 'استاتیک', description: 'تعادل اجسام صلب', difficulty: 'Easy', xp: 50, questions: [
            { id: 1, question: 'شرط تعادل جسم صلب در صفحه چیست؟', options: ['زیگما F=0', 'زیگما M=0', 'هر دو مورد', 'هیچکدام'], correctAnswer: 2 },
            { id: 2, question: 'گشتاور (Moment) حاصلضرب چیست؟', options: ['نیرو در زمان', 'نیرو در فاصله عمودی', 'جرم در شتاب', 'کار در زمان'], correctAnswer: 1 }
        ] },
        { id: 'mech-2', title: 'ترمودینامیک', description: 'قوانین دما و انرژی', difficulty: 'Medium', xp: 100, questions: [
            { id: 1, question: 'قانون اول ترمودینامیک بیانگر چیست؟', options: ['پایستگی انرژی', 'انتروپی', 'نیروی اصطکاک', 'راندمان'], correctAnswer: 0 },
            { id: 2, question: 'چرخه کارنو شامل چه فرآیندهایی است؟', options: ['۲ هم‌دما، ۲ هم‌حجم', '۲ هم‌دما، ۲ آدیاباتیک', '۲ هم‌فشار، ۲ هم‌حجم', '۴ هم‌دما'], correctAnswer: 1 }
        ] },
        { id: 'mech-3', title: 'مکانیک سیالات', description: 'هیدرواستاتیک و جریان', difficulty: 'Hard', xp: 150, questions: [
            { id: 1, question: 'معادله برنولی مربوط به چیست؟', options: ['پایستگی انرژی سیال', 'پایستگی جرم', 'مومنتوم', 'حرارت'], correctAnswer: 0 },
            { id: 2, question: 'عدد رینولدز نسبت چه نیروهایی است؟', options: ['اینرسی به لزجت', 'فشار به سطح', 'گرانش به کشش سطحی', 'الاستیک به اینرسی'], correctAnswer: 0 },
            { id: 3, question: 'کاویتاسیون در پمپ‌ها چه زمانی رخ می‌دهد؟', options: ['فشار مکش > فشار بخار', 'فشار مکش < فشار بخار', 'دبی صفر باشد', 'هد پمپ زیاد باشد'], correctAnswer: 1 }
        ] },
    ],
    'Civil': [
        { id: 'civil-1', title: 'مصالح ساختمانی', description: 'سیمان، بتن و فولاد', difficulty: 'Easy', xp: 50, questions: [
            { id: 1, question: 'عیار بتن چیست؟', options: ['مقدار سیمان در متر مکعب', 'مقدار آب', 'مقدار شن', 'مقاومت'], correctAnswer: 0 },
            { id: 2, question: 'مهمترین ویژگی سیمان پرتلند چیست؟', options: ['رنگ', 'گیرش هیدرولیکی', 'وزن', 'قیمت'], correctAnswer: 1 }
        ] },
        { id: 'civil-2', title: 'مقاومت مصالح', description: 'تنش و کرنش', difficulty: 'Medium', xp: 100, questions: [
            { id: 1, question: 'قانون هوک؟', options: ['تنش=E*کرنش', 'F=kx', 'P=F/A', 'M=Fd'], correctAnswer: 0 },
            { id: 2, question: 'تنش برشی در تار خنثی تیر مستطیلی چگونه است؟', options: ['صفر', 'ماکزیمم', 'متوسط', 'بی‌نهایت'], correctAnswer: 1 }
        ] },
        { id: 'civil-3', title: 'تحلیل سازه', description: 'تیرها و قاب‌ها', difficulty: 'Hard', xp: 150, questions: [
            { id: 1, question: 'سازه نامعین چیست؟', options: ['مجهولات > معادلات تعادل', 'مجهولات < معادلات', 'ناپایدار', 'معین'], correctAnswer: 0 },
            { id: 2, question: 'در روش شیب-افت، مجهولات اصلی چیست؟', options: ['نیروها', 'تغییر مکان‌ها و دوران‌ها', 'ممان‌ها', 'عکس‌العمل‌ها'], correctAnswer: 1 }
        ] },
    ],
    'Industrial': [
        { id: 'ind-1', title: 'مدیریت پروژه', description: 'کنترل زمان و هزینه', difficulty: 'Easy', xp: 50, questions: [
            { id: 1, question: 'مسیر بحرانی چیست؟', options: ['کوتاه‌ترین مسیر', 'طولانی‌ترین مسیر زمانی', 'کم‌هزینه‌ترین', 'سریع‌ترین'], correctAnswer: 1 },
            { id: 2, question: 'نمودار گانت برای چه کاری است؟', options: ['زمان‌بندی', 'هزینه‌یابی', 'کنترل کیفیت', 'موجودی'], correctAnswer: 0 }
        ] },
        { id: 'ind-2', title: 'تحقیق در عملیات', description: 'برنامه‌ریزی خطی', difficulty: 'Medium', xp: 100, questions: [
            { id: 1, question: 'روش سیمپلکس برای چیست؟', options: ['حل مدل خطی', 'شبیه‌سازی', 'کنترل موجودی', 'آمار'], correctAnswer: 0 },
            { id: 2, question: 'در مدل حمل و نقل، هدف چیست؟', options: ['حداکثر کردن سود', 'حداقل کردن هزینه حمل', 'کاهش زمان', 'افزایش تولید'], correctAnswer: 1 }
        ] },
        { id: 'ind-3', title: 'اقتصاد مهندسی', description: 'ارزیابی طرح‌ها', difficulty: 'Hard', xp: 150, questions: [
            { id: 1, question: 'NPV یعنی؟', options: ['ارزش فعلی خالص', 'نرخ بازگشت', 'نرخ بهره', 'تورم'], correctAnswer: 0 },
            { id: 2, question: 'نرخ بازگشت داخلی (IRR) چیست؟', options: ['نرخی که NPV را صفر کند', 'سود بانکی', 'تورم سالانه', 'هزینه استهلاک'], correctAnswer: 0 }
        ] },
    ],
    'Chemical': [
        { id: 'chem-1', title: 'شیمی عمومی', description: 'اتم و مولکول', difficulty: 'Easy', xp: 50, questions: [
            { id: 1, question: 'PH چیست؟', options: ['غلظت یون هیدروژن', 'غلظت اکسیژن', 'فشار', 'دما'], correctAnswer: 0 },
            { id: 2, question: 'عدد آووگادرو چند است؟', options: ['6.02 x 10^23', '3.14', '9.81', '1.6 x 10^-19'], correctAnswer: 0 }
        ] },
        { id: 'chem-2', title: 'انتقال حرارت', description: 'هدایت، همرفت و تابش', difficulty: 'Medium', xp: 100, questions: [
            { id: 1, question: 'قانون فوریه مربوط به چیست؟', options: ['هدایت', 'همرفت', 'تابش', 'جوشش'], correctAnswer: 0 },
            { id: 2, question: 'عدد ناسلت (Nusselt) بیانگر چیست؟', options: ['نسبت همرفت به هدایت', 'نسبت اینرسی به لزجت', 'نسبت شناوری به لزجت', 'ضریب انتقال حرارت'], correctAnswer: 0 }
        ] },
        { id: 'chem-3', title: 'طراحی راکتور', description: 'سینتیک واکنش', difficulty: 'Hard', xp: 150, questions: [
            { id: 1, question: 'راکتور CSTR چیست؟', options: ['مخزنی همزن‌دار', 'لوله‌ای', 'بستر ثابت', 'ناپیوسته'], correctAnswer: 0 },
            { id: 2, question: 'زمان اقامت (Residence Time) چیست؟', options: ['حجم راکتور / دبی حجمی', 'دبی / حجم', 'غلظت / زمان', 'سرعت واکنش'], correctAnswer: 0 }
        ] },
    ],
    'Architecture': [
        { id: 'arch-1', title: 'تاریخ معماری ایران', description: 'سبک‌ها و بناهای تاریخی', difficulty: 'Easy', xp: 50, questions: [
            { id: 1, question: 'گنبد سلطانیه مربوط به کدام دوره است؟', options: ['ایلخانی', 'صفوی', 'سلجوقی', 'قاجار'], correctAnswer: 0 },
            { id: 2, question: 'ایوان مداین مربوط به کدام سلسله است؟', options: ['ساسانی', 'هخامنشی', 'اشکانی', 'تیموری'], correctAnswer: 0 },
            { id: 3, question: 'اصلی‌ترین مصالح تخت جمشید چیست؟', options: ['سنگ', 'آجر', 'خشت', 'چوب'], correctAnswer: 0 }
        ] },
        { id: 'arch-2', title: 'عناصر و جزئیات', description: 'شناخت اجزای ساختمان', difficulty: 'Medium', xp: 100, questions: [
            { id: 1, question: 'شناژ برای چه کاری است؟', options: ['یکپارچگی فونداسیون', 'زیبایی نما', 'عایق کاری', 'سقف کاذب'], correctAnswer: 0 },
            { id: 2, question: 'پله فرار باید چه ویژگی داشته باشد؟', options: ['دودبند باشد', 'چوبی باشد', 'آسانسور داشته باشد', 'شیشه‌ای باشد'], correctAnswer: 0 }
        ] },
        { id: 'arch-3', title: 'مبانی نظری معماری', description: 'فلسفه و تئوری', difficulty: 'Hard', xp: 150, questions: [
            { id: 1, question: 'معمار "خانه آبشار" کیست؟', options: ['فرانک لویدرایت', 'لوکوربوزیه', 'زاها حدید', 'نورمن فاستر'], correctAnswer: 0 },
            { id: 2, question: 'شعار "کمتر، بیشتر است" (Less is More) از کیست؟', options: ['میس ون در روهه', 'آلوار آلتو', 'لوئی کان', 'فرانک گری'], correctAnswer: 0 }
        ] },
    ],
    'Psychology': [
        { id: 'psy-1', title: 'روانشناسی عمومی', description: 'مفاهیم پایه ذهن و رفتار', difficulty: 'Easy', xp: 50, questions: [
            { id: 1, question: 'پدر روانکاوی کیست؟', options: ['فروید', 'یونگ', 'اسکینر', 'پیاژه'], correctAnswer: 0 },
            { id: 2, question: 'بخش ناخودآگاه ذهن شامل چیست؟', options: ['امیال سرکوب شده', 'افکار آگاهانه', 'حافظه کوتاه‌مدت', 'ادراک حسی'], correctAnswer: 0 }
        ] },
        { id: 'psy-2', title: 'روانشناسی رشد', description: 'مراحل تحول انسان', difficulty: 'Medium', xp: 100, questions: [
            { id: 1, question: 'ژان پیاژه بر چه موضوعی تمرکز داشت؟', options: ['رشد شناختی', 'رشد اخلاقی', 'دلبستگی', 'شرطی‌سازی'], correctAnswer: 0 },
            { id: 2, question: 'بحران "هویت در برابر سردرگمی نقش" مربوط به کدام دوره است؟', options: ['نوجوانی', 'کودکی', 'میانسالی', 'پیری'], correctAnswer: 0 }
        ] },
        { id: 'psy-3', title: 'آسیب‌شناسی روانی', description: 'اختلالات و درمان', difficulty: 'Hard', xp: 150, questions: [
            { id: 1, question: 'ویژگی اصلی اختلال دوقطبی چیست؟', options: ['نوسان شیدایی و افسردگی', 'توهم شنوایی', 'فراموشی', 'ترس از مکان بسته'], correctAnswer: 0 },
            { id: 2, question: 'DSM-5 چیست؟', options: ['راهنمای تشخیصی اختلالات', 'تست هوش', 'نظریه شخصیت', 'داروی ضدافسردگی'], correctAnswer: 0 }
        ] },
    ],
    'Management': [
        { id: 'mgt-1', title: 'مبانی سازمان و مدیریت', description: 'اصول اولیه مدیریت', difficulty: 'Easy', xp: 50, questions: [
            { id: 1, question: 'پدر مدیریت علمی کیست؟', options: ['تیلور', 'فایول', 'وبر', 'مایو'], correctAnswer: 0 },
            { id: 2, question: 'POSDCORB به چه معناست؟', options: ['وظایف مدیر', 'انواع سازمان', 'مدل بازاریابی', 'استراتژی رقابت'], correctAnswer: 0 }
        ] },
        { id: 'mgt-2', title: 'مدیریت بازاریابی', description: '4P و رفتار مصرف‌کننده', difficulty: 'Medium', xp: 100, questions: [
            { id: 1, question: 'آمیخته بازاریابی (4P) شامل چیست؟', options: ['محصول، قیمت، مکان، ترویج', 'پول، مردم، پروسه، مکان', 'قدرت، سیاست، پول، محصول', 'برنامه، اجرا، کنترل، بازخورد'], correctAnswer: 0 },
            { id: 2, question: 'SWOT برای چه کاری است؟', options: ['تحلیل استراتژیک', 'محاسبه سود', 'استخدام نیرو', 'تبلیغات'], correctAnswer: 0 }
        ] },
        { id: 'mgt-3', title: 'مدیریت استراتژیک', description: 'برنامه‌ریزی بلندمدت', difficulty: 'Hard', xp: 150, questions: [
            { id: 1, question: 'ماتریس BCG برای چیست؟', options: ['تحلیل سبد محصولات', 'ارزیابی کارکنان', 'بودجه‌بندی', 'کنترل کیفیت'], correctAnswer: 0 },
            { id: 2, question: 'استراتژی اقیانوس آبی یعنی؟', options: ['ایجاد بازار بی‌رقیب', 'رقابت شدید قیمت', 'صادرات دریایی', 'کاهش هزینه'], correctAnswer: 0 }
        ] },
    ],
    'General': [
        { id: 'gen-1', title: 'اطلاعات عمومی', description: 'دانستنی‌های کلی', difficulty: 'Easy', xp: 50, questions: [
            { id: 1, question: 'پایتخت ایران؟', options: ['شیراز', 'تهران', 'اصفهان', 'تبریز'], correctAnswer: 1 },
            { id: 2, question: 'بزرگترین قاره جهان؟', options: ['آسیا', 'آفریقا', 'آمریکا', 'اروپا'], correctAnswer: 0 },
            { id: 3, question: 'واحد پول ژاپن؟', options: ['ین', 'یوان', 'دلار', 'یورو'], correctAnswer: 0 }
        ] },
        { id: 'gen-2', title: 'ادبیات فارسی', description: 'شعر و تاریخ ادبیات', difficulty: 'Medium', xp: 80, questions: [
            { id: 1, question: 'نویسنده شاهنامه؟', options: ['فردوسی', 'سعدی', 'حافظ', 'مولوی'], correctAnswer: 0 },
            { id: 2, question: 'کتاب "گلستان" اثر کیست؟', options: ['سعدی', 'حافظ', 'نظامی', 'جامی'], correctAnswer: 0 },
            { id: 3, question: 'سبک شعر حافظ چیست؟', options: ['عراقی', 'خراسانی', 'هندی', 'بازگشت'], correctAnswer: 0 }
        ] },
        { id: 'gen-3', title: 'زبان انگلیسی', description: 'گرامر و لغت', difficulty: 'Medium', xp: 80, questions: [
            { id: 1, question: 'Past tense of "Go"?', options: ['Went', 'Gone', 'Going', 'Goes'], correctAnswer: 0 },
            { id: 2, question: 'Opposite of "Happy"?', options: ['Sad', 'Joy', 'Fun', 'Good'], correctAnswer: 0 },
            { id: 3, question: 'Which word is a noun?', options: ['Book', 'Run', 'Fast', 'Red'], correctAnswer: 0 }
        ] },
    ]
  }), []);

  const quizMajors = [
      { id: 'Computer', label: 'کامپیوتر', icon: Cpu, color: 'text-indigo-600 bg-indigo-50' },
      { id: 'Electrical', label: 'برق', icon: Zap, color: 'text-yellow-600 bg-yellow-50' },
      { id: 'Mechanical', label: 'مکانیک', icon: Wrench, color: 'text-orange-600 bg-orange-50' },
      { id: 'Civil', label: 'عمران', icon: Hammer, color: 'text-stone-600 bg-stone-50' },
      { id: 'Industrial', label: 'صنایع', icon: BarChart, color: 'text-emerald-600 bg-emerald-50' },
      { id: 'Chemical', label: 'شیمی', icon: FlaskConical, color: 'text-teal-600 bg-teal-50' },
      { id: 'Architecture', label: 'معماری', icon: Building2, color: 'text-rose-600 bg-rose-50' },
      { id: 'Psychology', label: 'روانشناسی', icon: Brain, color: 'text-purple-600 bg-purple-50' },
      { id: 'Management', label: 'مدیریت', icon: Briefcase, color: 'text-cyan-600 bg-cyan-50' },
      { id: 'General', label: 'عمومی', icon: Globe, color: 'text-blue-600 bg-blue-50' },
  ];

  // --- Timer Logic (Shared) ---
  useEffect(() => {
    if ((gameMode === 'math' || gameMode === 'typing' || gameMode === 'esm_famil') && timeLeft > 0 && gameRunning) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && gameRunning) {
      if (gameMode === 'typing') {
          const wpm = Math.round((wordsTyped / 45) * 60);
          setResultMessage(`سرعت تایپ: ${wpm} کلمه در دقیقه`);
          setGameMode('result');
          setGameRunning(false);
      } else if (gameMode === 'esm_famil') {
          calculateEsmFamilScore();
      } else if (gameMode === 'math') {
          setGameMode('result');
          setGameRunning(false);
      }
    }
  }, [timeLeft, gameMode, wordsTyped, gameRunning]);

  // ==================== NEW GAMES LOGIC ====================

  // --- MATH GAME LOGIC ---
  const generateMathQuestion = () => {
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * 3)];
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    let q = `${a} ${op} ${b}`;
    let ans = 0;
    if (op === '+') ans = a + b;
    else if (op === '-') ans = a - b;
    else ans = a * b;
    setMathQuestion({ q, a: ans });
    setMathInput('');
  };

  const startMathGame = () => {
    setGameMode('math');
    setScore(0);
    setTimeLeft(30);
    setGameRunning(true);
    generateMathQuestion();
  };

  const checkMathAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(mathInput) === mathQuestion.a) {
      setScore(s => s + 10);
      generateMathQuestion();
    } else {
      setMathInput('');
    }
  };

  // --- MEMORY GAME LOGIC ---
  const startMemoryGame = () => {
      setGameMode('memory');
      setScore(0);
      setMemoryMoves(0);
      const icons = ['★', '★', '☾', '☾', '☀', '☀', '☁', '☁', '☂', '☂', '☃', '☃', '☘', '☘', '⚡', '⚡'];
      const shuffled = icons.sort(() => Math.random() - 0.5).map((icon, i) => ({
          id: i, icon, flipped: false, matched: false
      }));
      setMemoryCards(shuffled);
      setFlippedCards([]);
  };

  const handleMemoryCardClick = (id: number) => {
      if (flippedCards.length === 2) return;
      const cardIndex = memoryCards.findIndex(c => c.id === id);
      if (memoryCards[cardIndex].flipped || memoryCards[cardIndex].matched) return;

      const newCards = [...memoryCards];
      newCards[cardIndex].flipped = true;
      setMemoryCards(newCards);
      
      const newFlipped = [...flippedCards, id];
      setFlippedCards(newFlipped);

      if (newFlipped.length === 2) {
          setMemoryMoves(m => m + 1);
          const c1 = newCards.find(c => c.id === newFlipped[0]);
          const c2 = newCards.find(c => c.id === newFlipped[1]);
          
          if (c1 && c2 && c1.icon === c2.icon) {
              setTimeout(() => {
                  setMemoryCards(prev => prev.map(c => 
                      (c.id === c1.id || c.id === c2.id) ? { ...c, matched: true } : c
                  ));
                  setFlippedCards([]);
                  setScore(s => s + 20);
                  if (newCards.filter(c => !c.matched).length === 2) { 
                      setResultMessage('حافظه عالی!');
                      setGameMode('result');
                  }
              }, 500);
          } else {
              setTimeout(() => {
                  setMemoryCards(prev => prev.map(c => 
                      (c.id === newFlipped[0] || c.id === newFlipped[1]) ? { ...c, flipped: false } : c
                  ));
                  setFlippedCards([]);
              }, 1000);
          }
      }
  };

  // --- TYPING GAME LOGIC ---
  const generateNextWord = () => {
      const w = wordList[Math.floor(Math.random() * wordList.length)];
      setTypingWord(w);
      setTypingInput('');
      setTypingWordVisible(true);
  };

  const startTypingGame = (mode: 'classic' | 'reverse' | 'blind') => {
      setTypingMode(mode);
      setGameMode('typing');
      setScore(0);
      setWordsTyped(0);
      setTimeLeft(60);
      setGameRunning(true);
      generateNextWord();
  };

  const handleTypingInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTypingInput(e.target.value);
      if (e.target.value.trim() === typingWord) {
          setScore(s => s + typingWord.length * 2);
          setWordsTyped(w => w + 1);
          generateNextWord();
      }
  };

  // --- SPACE SHOOTER LOGIC ---
  const updateSpaceGame = () => {
      setBullets(prev => prev.map(b => ({...b, y: b.y + 2})).filter(b => b.y < 100));
      
      if (Math.random() < 0.05) {
          setEnemies(prev => [...prev, { id: Date.now(), x: Math.random() * 90 + 5, y: 100 }]);
      }

      setEnemies(prev => {
          const newEnemies = prev.map(e => ({...e, y: e.y - 1})).filter(e => e.y > 0);
          return newEnemies;
      });
  };

  const startSpaceGame = () => {
      setGameMode('space');
      setScore(0);
      setShipX(50);
      setBullets([]);
      setEnemies([]);
      setGameRunning(true);
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      gameLoopRef.current = setInterval(updateSpaceGame, 50);
  };

  const fireBullet = () => {
      setBullets(prev => [...prev, { id: Date.now(), x: shipX, y: 15 }]);
  };

  useEffect(() => {
      return () => {
          if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      };
  }, []);

  // --- TIC TAC TOE LOGIC ---
  const calculateWinner = (squares: any[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const startTttGame = () => {
      setGameMode('tictactoe');
      setTttBoard(Array(9).fill(null));
      setXIsNext(true);
      setWinner(null);
  };

  const handleTttClick = (i: number) => {
      if (winner || tttBoard[i]) return;
      const newBoard = [...tttBoard];
      newBoard[i] = xIsNext ? 'X' : 'O';
      setTttBoard(newBoard);
      
      const win = calculateWinner(newBoard);
      if (win) {
          setWinner(win);
      } else if (!newBoard.includes(null)) {
          setWinner('Draw');
      } else {
          setXIsNext(!xIsNext);
      }
  };

  // --- CARD GAMES LOGIC (GENERIC & SPECIFIC) ---
  const getCardName = (val: number) => {
      if (val === 1) return 'A';
      if (val === 11) return 'J';
      if (val === 12) return 'Q';
      if (val === 13) return 'K';
      return val.toString();
  };

  // -- High/Low --
  const startCardGame = () => {
      setGameMode('card_highlow');
      setCurrentCard(Math.floor(Math.random() * 13) + 1);
      setScore(0);
      setDeckCount(52);
  };

  const guessCard = (guess: 'higher' | 'lower') => {
      const nextCard = Math.floor(Math.random() * 13) + 1;
      const isHigher = nextCard >= currentCard;
      if ((guess === 'higher' && isHigher) || (guess === 'lower' && !isHigher)) {
          setScore(s => s + 1);
          setCurrentCard(nextCard);
          setDeckCount(d => d - 1);
      } else {
          setResultMessage(`باختید! کارت بعدی ${getCardName(nextCard)} بود.`);
          setGameMode('result');
      }
  };

  // -- Hokm, Shelem, Haft Khabis Setup --
  const startAdvancedCardGame = (mode: 'hokm' | 'shelem' | 'haft_khabis') => {
      setGameMode(mode);
      setScore(0);
      // Initialize mock hands
      setPlayerHand(Array.from({length: mode === 'haft_khabis' ? 7 : 13}, () => Math.floor(Math.random() * 52)));
      setTableCards([]);
      setTurn(0);
  };

  const CardTable = ({ title, type }: { title: string, type: string }) => {
      const suits = [Spade, Heart, Club, Diamond];
      const colors = ['text-slate-800', 'text-red-500', 'text-slate-800', 'text-red-500'];

      const playCard = (index: number) => {
          // Simulate playing a card
          const card = playerHand[index];
          setTableCards(prev => [...prev, card]);
          setPlayerHand(prev => prev.filter((_, i) => i !== index));
          // Simulate bot response
          setTimeout(() => {
              setTableCards(prev => [...prev, Math.floor(Math.random() * 52)]);
          }, 1000);
      };

      return (
          <div className="bg-green-800 rounded-[1.5rem] md:rounded-[2rem] p-2 md:p-4 h-[500px] md:h-[600px] relative shadow-2xl overflow-hidden border-4 md:border-8 border-green-900">
              <div className="absolute top-4 left-4 text-white/50 text-sm md:text-xl font-black uppercase tracking-widest z-10">{title}</div>
              
              {/* Table Center (Scaled for mobile) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 md:w-64 md:h-64 border-4 border-white/10 rounded-full flex items-center justify-center relative scale-75 md:scale-100">
                      {tableCards.map((c, i) => {
                          const Suit = suits[c % 4];
                          const val = (c % 13) + 1;
                          return (
                              <div key={i} className="absolute w-16 h-24 bg-white rounded-lg shadow-xl flex items-center justify-center" 
                                   style={{ transform: `rotate(${i * 45}deg) translate(${i * 10}px, ${i * -10}px)` }}>
                                  <Suit className={`w-8 h-8 ${colors[c % 4]}`} />
                                  <span className={`absolute top-1 left-1 text-xs font-bold ${colors[c % 4]}`}>{getCardName(val)}</span>
                              </div>
                          )
                      })}
                  </div>
              </div>

              {/* Opponent (Top) */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1">
                  {Array.from({length: 5}).map((_, i) => (
                      <div key={i} className="w-8 h-10 md:w-10 md:h-14 bg-blue-700 rounded border-2 border-white/20 shadow-md"></div>
                  ))}
              </div>

              {/* Player Hand (Bottom) - Scrollable on mobile */}
              <div className="absolute bottom-4 left-0 w-full overflow-x-auto px-4 custom-scrollbar">
                  <div className="flex gap-[-8px] md:gap-[-10px] justify-center min-w-fit mx-auto pb-2">
                      {playerHand.map((c, i) => {
                          const Suit = suits[c % 4];
                          const val = (c % 13) + 1;
                          return (
                              <button 
                                key={i} 
                                onClick={() => playCard(i)}
                                className="w-12 h-16 md:w-16 md:h-24 bg-white rounded-lg shadow-2xl border border-slate-200 flex flex-col items-center justify-center hover:-translate-y-4 transition-transform -ml-4 first:ml-0 relative group shrink-0"
                              >
                                  <span className={`absolute top-0.5 left-0.5 md:top-1 md:left-1 text-[10px] md:text-sm font-bold ${colors[c % 4]}`}>{getCardName(val)}</span>
                                  <Suit className={`w-5 h-5 md:w-8 md:h-8 ${colors[c % 4]}`} />
                                  <span className={`absolute bottom-0.5 right-0.5 md:bottom-1 md:right-1 text-[10px] md:text-sm font-bold ${colors[c % 4]} rotate-180`}>{getCardName(val)}</span>
                              </button>
                          )
                      })}
                  </div>
              </div>

              <button onClick={() => setGameMode('menu')} className="absolute top-4 right-4 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 z-20"><XIcon className="w-5 h-5 md:w-6 md:h-6"/></button>
          </div>
      );
  };

  // --- SNAKE ---
  const startSnake = () => {
      setGameMode('snake');
      setSnake([{x:5, y:5}]);
      setSnakeDir('RIGHT');
      setScore(0);
      setGameRunning(true);
  };

  useEffect(() => {
      if (gameMode === 'snake' && gameRunning) {
          snakeIntervalRef.current = setInterval(() => {
              setSnake(prevSnake => {
                  const head = { ...prevSnake[0] };
                  if (snakeDir === 'UP') head.y -= 1;
                  if (snakeDir === 'DOWN') head.y += 1;
                  if (snakeDir === 'LEFT') head.x -= 1;
                  if (snakeDir === 'RIGHT') head.x += 1;

                  // Collision Wall
                  if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
                      setGameRunning(false);
                      setResultMessage('باختید! برخورد با دیوار.');
                      setGameMode('result');
                      return prevSnake;
                  }
                  // Collision Self
                  if (prevSnake.some(s => s.x === head.x && s.y === head.y)) {
                      setGameRunning(false);
                      setResultMessage('باختید! برخورد با خود.');
                      setGameMode('result');
                      return prevSnake;
                  }

                  const newSnake = [head, ...prevSnake];
                  if (head.x === food.x && head.y === food.y) {
                      setScore(s => s + 10);
                      setFood({x: Math.floor(Math.random()*20), y: Math.floor(Math.random()*20)});
                  } else {
                      newSnake.pop();
                  }
                  return newSnake;
              });
          }, 150);
          return () => clearInterval(snakeIntervalRef.current);
      }
  }, [gameMode, gameRunning, snakeDir, food]);

  // --- SNAKES & LADDERS ---
  const snakesAndLaddersMap: Record<number, number> = { 
      16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78, // Snakes
      1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 // Ladders
  };

  const startSnakesLadders = () => {
      setGameMode('snakes_ladders');
      setSlPlayers([1, 1]);
      setSlTurn(0);
      setSlDice(null);
      setSlLog('بازی شروع شد! نوبت بازیکن ۱');
  };

  const rollDiceSL = () => {
      if (slDice !== null) return; // Wait for animation or next turn
      const roll = Math.floor(Math.random() * 6) + 1;
      setSlDice(roll);
      
      setTimeout(() => {
          setSlPlayers(prev => {
              const newPos = [...prev];
              let pos = newPos[slTurn] + roll;
              if (pos > 100) pos = 100 - (pos - 100); // Bounce back
              
              let msg = `بازیکن ${slTurn + 1} تاس ${roll} آورد و به خانه ${pos} رفت.`;
              
              if (snakesAndLaddersMap[pos]) {
                  const dest = snakesAndLaddersMap[pos];
                  if (dest > pos) msg += ` (نردبان! صعود به ${dest})`;
                  else msg += ` (مار! سقوط به ${dest})`;
                  pos = dest;
              }
              
              newPos[slTurn] = pos;
              setSlLog(msg);
              
              if (pos === 100) {
                  setWinner(`بازیکن ${slTurn + 1}`);
                  setTimeout(() => {
                      setResultMessage(`بازیکن ${slTurn + 1} برنده شد!`);
                      setScore(200);
                      setGameMode('result');
                  }, 2000);
              } else {
                  if (roll !== 6) setSlTurn(t => t === 0 ? 1 : 0);
                  else setSlLog(l => l + ' (جایزه ۶! دوباره تاس بریز)');
                  setSlDice(null);
              }
              return newPos;
          });
      }, 1000);
  };

  // --- ESM FAMIL ---
  const startEsmFamil = () => {
      const letters = ['الف', 'ب', 'پ', 'ت', 'ج', 'چ', 'د', 'ر', 'ز', 'س', 'ش', 'ک', 'م', 'ن', 'ی'];
      setEfLetter(letters[Math.floor(Math.random() * letters.length)]);
      setEfInputs({ name: '', food: '', city: '', color: '' });
      setEfRound(1);
      setScore(0);
      setEfBotScore(0);
      setTimeLeft(60);
      setGameRunning(true);
      setGameMode('esm_famil');
  };

  const calculateEsmFamilScore = () => {
      setGameRunning(false);
      // Mock Bot Logic: Bot always gets 30 points
      const myScore = (efInputs.name.length > 2 ? 10 : 0) + (efInputs.food.length > 2 ? 10 : 0) + (efInputs.city.length > 2 ? 10 : 0) + (efInputs.color.length > 2 ? 10 : 0);
      setScore(s => s + myScore);
      setEfBotScore(s => s + 30);
      
      if (efRound < 3) {
          alert(`امتیاز راند: شما ${myScore} - ربات ۳۰. راند بعدی...`);
          setEfRound(r => r + 1);
          const letters = ['الف', 'ب', 'پ', 'ت', 'ج', 'چ', 'د', 'ر', 'ز', 'س', 'ش', 'ک', 'م', 'ن', 'ی'];
          setEfLetter(letters[Math.floor(Math.random() * letters.length)]);
          setEfInputs({ name: '', food: '', city: '', color: '' });
          setTimeLeft(60);
          setGameRunning(true);
      } else {
          setResultMessage(`پایان بازی! امتیاز شما: ${score + myScore} | ربات: ${efBotScore + 30}`);
          setGameMode('result');
      }
  };

  // --- BOWLING ---
  const startBowling = () => {
      setGameMode('bowling');
      setBowlPhase('aim');
      setBowlAim(0);
      setBowlPower(0);
      setBowlPins([1,1,1,1,1,1,1,1,1,1]);
      setScore(0);
  };

  useEffect(() => {
      if (gameMode === 'bowling') {
          if (bowlPhase === 'aim') {
              const timer = setInterval(() => {
                  setBowlAim(prev => {
                      if (prev >= 45) return -45;
                      return prev + 5;
                  });
              }, 50);
              return () => clearInterval(timer);
          } else if (bowlPhase === 'power') {
              const timer = setInterval(() => {
                  setBowlPower(prev => {
                      if (prev >= 100) return 0;
                      return prev + 5;
                  });
              }, 30);
              return () => clearInterval(timer);
          }
      }
  }, [gameMode, bowlPhase]);

  const handleBowlingClick = () => {
      if (bowlPhase === 'aim') setBowlPhase('power');
      else if (bowlPhase === 'power') {
          setBowlPhase('result');
          // Calculate Logic
          const accuracy = 50 - Math.abs(bowlAim); // Closer to 0 is better (max 50)
          const powerFactor = bowlPower / 2; // max 50
          const totalSkill = accuracy + powerFactor; // Max 100
          
          let knocked = 0;
          if (totalSkill > 90) knocked = 10; // Strike
          else if (totalSkill > 70) knocked = Math.floor(Math.random() * 3) + 7;
          else if (totalSkill > 40) knocked = Math.floor(Math.random() * 4) + 3;
          else knocked = Math.floor(Math.random() * 3);

          setScore(knocked * 10);
          // Visualize pins
          setBowlPins(prev => prev.map((_, i) => i < knocked ? 0 : 1));
          
          setTimeout(() => {
              if (window.confirm(`شما ${knocked} پین را انداختید! امتیاز: ${knocked * 10}. بازی مجدد؟`)) {
                  startBowling();
              } else {
                  setGameMode('menu');
              }
          }, 1500);
      }
  };

  // --- DARTS ---
  const startDarts = () => {
      setGameMode('darts');
      setScore(0);
      setDartThrows(3);
      setDartRotation(0);
  };

  useEffect(() => {
      if (gameMode === 'darts' && dartThrows > 0) {
          const timer = setInterval(() => {
              setDartRotation(prev => (prev + 5) % 360);
          }, 20);
          return () => clearInterval(timer);
      }
  }, [gameMode, dartThrows]);

  const throwDart = () => {
      if (dartThrows <= 0) return;
      const hitScore = Math.floor(Math.random() * 20) + 1; // Simplified random for prototype
      const multiplier = Math.random() > 0.9 ? 3 : (Math.random() > 0.8 ? 2 : 1);
      const points = hitScore * multiplier;
      
      setScore(s => s + points);
      setDartThrows(t => t - 1);

      if (dartThrows === 1) {
          setTimeout(() => {
              setResultMessage(`بازی تمام شد! امتیاز نهایی: ${score + points}`);
              setGameMode('result');
          }, 1000);
      }
  };

  // --- DINO JUMP ---
  const jump = () => {
      if (!isJumping) {
          setIsJumping(true);
          // Simple jump animation logic simulation
          let jumpHeight = 0;
          const upInterval = setInterval(() => {
              if (jumpHeight >= 100) {
                  clearInterval(upInterval);
                  const downInterval = setInterval(() => {
                      if (jumpHeight <= 0) {
                          clearInterval(downInterval);
                          setIsJumping(false);
                          setDinoY(0);
                      } else {
                          jumpHeight -= 5;
                          setDinoY(jumpHeight);
                      }
                  }, 20);
              } else {
                  jumpHeight += 5;
                  setDinoY(jumpHeight);
              }
          }, 20);
      }
  };
  
  useEffect(() => {
      if (gameMode === 'dino' && gameRunning) {
          const gameInterval = setInterval(() => {
              setCactusLeft(prev => {
                  if (prev < -20) {
                      setScore(s => s + 1);
                      return 600; // Reset
                  }
                  return prev - 5;
              });
              
              // Collision detection
              if (cactusLeft < 50 && cactusLeft > 10 && dinoY < 40) { 
                  setGameRunning(false);
                  setResultMessage('باختید! برخورد با کاکتوس.');
                  setGameMode('result');
              }
          }, 20);
          return () => clearInterval(gameInterval);
      }
  }, [gameMode, gameRunning, cactusLeft, dinoY]);

  // --- QUIZ ---
  const startQuiz = (quiz: QuizDefinition) => {
      setActiveQuiz(quiz);
      setCurrentQuizIndex(0);
      setQuizScore(0);
      setGameMode('quiz_playing');
  };

  const handleQuizAnswer = (optionIndex: number) => {
      if (!activeQuiz) return;
      if (optionIndex === activeQuiz.questions[currentQuizIndex].correctAnswer) {
          setQuizScore(s => s + 10);
      }
      
      if (currentQuizIndex < activeQuiz.questions.length - 1) {
          setCurrentQuizIndex(prev => prev + 1);
      } else {
          setResultMessage(`آزمون تمام شد. شما ${quizScore + (optionIndex === activeQuiz.questions[currentQuizIndex].correctAnswer ? 10 : 0)} امتیاز گرفتید.`);
          setGameMode('result');
      }
  };

  // --- RENDER HELPERS ---
  const renderGameMenu = () => (
      <div className="space-y-8 animate-in fade-in">
          {/* Categories */}
          <div className="flex justify-center gap-4 overflow-x-auto pb-2 custom-scrollbar">
              <button onClick={() => setSelectedCategory('card')} className={`flex flex-col items-center gap-2 p-4 rounded-2xl min-w-[100px] transition-all ${selectedCategory === 'card' ? 'bg-emerald-600 text-white shadow-lg scale-105' : 'bg-white text-slate-500 hover:bg-slate-50'}`}>
                  <Spade className="w-8 h-8" />
                  <span className="text-xs font-bold">پاسور و کارتی</span>
              </button>
              <button onClick={() => setSelectedCategory('arcade')} className={`flex flex-col items-center gap-2 p-4 rounded-2xl min-w-[100px] transition-all ${selectedCategory === 'arcade' ? 'bg-rose-600 text-white shadow-lg scale-105' : 'bg-white text-slate-500 hover:bg-slate-50'}`}>
                  <Gamepad2 className="w-8 h-8" />
                  <span className="text-xs font-bold">آرکید و هیجانی</span>
              </button>
              <button onClick={() => setSelectedCategory('board')} className={`flex flex-col items-center gap-2 p-4 rounded-2xl min-w-[100px] transition-all ${selectedCategory === 'board' ? 'bg-amber-500 text-white shadow-lg scale-105' : 'bg-white text-slate-500 hover:bg-slate-50'}`}>
                  <Grid className="w-8 h-8" />
                  <span className="text-xs font-bold">رومیزی و کلاسیک</span>
              </button>
              <button onClick={() => setSelectedCategory('puzzle')} className={`flex flex-col items-center gap-2 p-4 rounded-2xl min-w-[100px] transition-all ${selectedCategory === 'puzzle' ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'bg-white text-slate-500 hover:bg-slate-50'}`}>
                  <Brain className="w-8 h-8" />
                  <span className="text-xs font-bold">فکری و کلمات</span>
              </button>
              <button onClick={() => setSelectedCategory('skill')} className={`flex flex-col items-center gap-2 p-4 rounded-2xl min-w-[100px] transition-all ${selectedCategory === 'skill' ? 'bg-emerald-600 text-white shadow-lg scale-105' : 'bg-white text-slate-500 hover:bg-slate-50'}`}>
                  <Target className="w-8 h-8" />
                  <span className="text-xs font-bold">مهارتی و ورزشی</span>
              </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedCategory === 'card' && (
                  <>
                    <GameCard title="حکم (Hokm)" desc="پادشاه بازی‌های کارتی ایرانی" icon={Spade} color="bg-emerald-100 text-emerald-600" onClick={() => startAdvancedCardGame('hokm')} xp={100} label="چند نفره" />
                    <GameCard title="شلم (Shelem)" desc="بازی تیمی و هیجان انگیز" icon={Club} color="bg-emerald-100 text-emerald-600" onClick={() => startAdvancedCardGame('shelem')} xp={120} label="چند نفره" />
                    <GameCard title="هفت خبیث" desc="مشابه Uno با کارت‌های معمولی" icon={Diamond} color="bg-rose-100 text-rose-600" onClick={() => startAdvancedCardGame('haft_khabis')} xp={80} label="جدید" />
                    <GameCard title="بالا یا پایین؟" desc="حدس بزن کارت بعدی چیه" icon={Layers} color="bg-amber-100 text-amber-600" onClick={startCardGame} xp={20} />
                  </>
              )}
              {selectedCategory === 'puzzle' && (
                  <>
                    <GameCard title="اسم فامیل" desc="رقابت کلمات با ربات هوشمند" icon={Edit3} color="bg-indigo-100 text-indigo-600" onClick={startEsmFamil} xp={80} label="جدید" />
                    <GameCard title="محاسبات سریع" desc="چالش ریاضی در ۳۰ ثانیه" icon={Calculator} color="bg-indigo-100 text-indigo-600" onClick={startMathGame} xp={50} />
                    <GameCard title="بازی حافظه" desc="کارت‌های مشابه را پیدا کن" icon={Grid} color="bg-indigo-100 text-indigo-600" onClick={startMemoryGame} xp={100} />
                    <GameCard title="پازل ۲۰۴۸" desc="اعداد را ترکیب کن" icon={Zap} color="bg-indigo-100 text-indigo-600" onClick={() => { setGameMode('2048'); setGrid2048([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]); }} xp={150} />
                    <GameCard title="تایپ سرعتی" desc="مسابقه سرعت انگشتان" icon={Keyboard} color="bg-indigo-100 text-indigo-600" onClick={() => startTypingGame('classic')} xp={80} />
                  </>
              )}
              {selectedCategory === 'arcade' && (
                  <>
                    <GameCard title="مار بازی (Snake)" desc="نوستالژی خالص با گرافیک جدید" icon={Repeat} color="bg-rose-100 text-rose-600" onClick={startSnake} xp={40} label="جدید" />
                    <GameCard title="دایناسور پرنده" desc="از روی کاکتوس‌ها بپر!" icon={Ghost} color="bg-rose-100 text-rose-600" onClick={() => { setGameMode('dino'); setGameRunning(true); setScore(0); }} xp={30} />
                    <GameCard title="سفینه فضایی" desc="دشمنان را نابود کن" icon={Rocket} color="bg-rose-100 text-rose-600" onClick={startSpaceGame} xp={60} />
                  </>
              )}
              {selectedCategory === 'board' && (
                  <>
                    <GameCard title="مار و پله" desc="رقابت دو نفره کلاسیک" icon={Layers} color="bg-amber-100 text-amber-600" onClick={startSnakesLadders} xp={50} label="چند نفره" />
                    <GameCard title="منچ (سریع)" desc="نبرد تن به تن" icon={Dices} color="bg-amber-100 text-amber-600" onClick={() => { setGameMode('menu'); alert('این بازی در آپدیت بعدی فعال می‌شود.'); }} xp={60} disabled label="بزودی" />
                    <GameCard title="دوز (Tic Tac Toe)" desc="رقابت با هوش مصنوعی" icon={XIcon} color="bg-amber-100 text-amber-600" onClick={startTttGame} xp={40} />
                  </>
              )}
              {selectedCategory === 'skill' && (
                  <>
                    <GameCard title="بولینگ" desc="نشانه بگیر و ضربه بزن" icon={Circle} color="bg-emerald-100 text-emerald-600" onClick={startBowling} xp={70} label="جدید" />
                    <GameCard title="دارت" desc="هدف‌گیری دقیق" icon={Crosshair} color="bg-emerald-100 text-emerald-600" onClick={startDarts} xp={70} label="جدید" />
                  </>
              )}
          </div>
      </div>
  );

  const GameCard = ({title, desc, icon: Icon, color, onClick, xp, disabled, label}: any) => (
      <button onClick={onClick} disabled={disabled} className={`bg-white p-6 rounded-3xl shadow-sm border border-slate-100 transition-all text-right relative overflow-hidden group ${disabled ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl'}`}>
          <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform relative z-10`}>
              <Icon className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-800 relative z-10">{title}</h3>
          <p className="text-sm text-slate-500 mt-2 relative z-10">{desc}</p>
          {!disabled && (
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-amber-500 relative z-10">
                  <Star className="w-3 h-3 fill-amber-500" /> +{xp} XP
              </div>
          )}
          {label && (
              <span className={`absolute top-4 left-4 text-[10px] font-bold px-2 py-1 rounded-lg ${label === 'چند نفره' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-500'}`}>{label}</span>
          )}
      </button>
  );

  return (
    <div className="space-y-8 animate-in fade-in pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
                <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
                    <Gamepad2 className="w-8 h-8" />
                    گیم‌سنتر و رقابت
                </h1>
                <p className="opacity-90">با بازی کردن درس بخون، امتیاز بگیر و تو جدول رده‌بندی اول شو!</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl flex items-center gap-4 border border-white/20">
                <div className="text-center">
                    <span className="block text-xs opacity-80">رتبه شما</span>
                    <span className="text-2xl font-bold">#42</span>
                </div>
                <div className="w-px h-8 bg-white/30"></div>
                <div className="text-center">
                    <span className="block text-xs opacity-80">امتیاز کل</span>
                    <span className="text-2xl font-bold text-yellow-300">1,450</span>
                </div>
            </div>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex gap-4 border-b border-slate-200 pb-2 overflow-x-auto">
        <button onClick={() => {setActiveTab('games'); setGameMode('menu')}} className={`px-4 py-2 font-bold whitespace-nowrap transition-colors ${activeTab === 'games' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-slate-500'}`}>مینی‌گیم‌ها</button>
        <button onClick={() => {setActiveTab('quiz'); setGameMode('menu')}} className={`px-4 py-2 font-bold whitespace-nowrap transition-colors ${activeTab === 'quiz' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-slate-500'}`}>کوییزهای درسی</button>
        <button onClick={() => {setActiveTab('leaderboard'); setGameMode('menu')}} className={`px-4 py-2 font-bold whitespace-nowrap transition-colors ${activeTab === 'leaderboard' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-slate-500'}`}>جدول رده‌بندی</button>
      </div>

      {/* GAME CONTENT */}
      {activeTab === 'games' && (
        <>
            {gameMode === 'menu' && renderGameMenu()}

            {/* CARD TABLE GAMES (Hokm, Shelem, Haft Khabis) */}
            {(gameMode === 'hokm' || gameMode === 'shelem' || gameMode === 'haft_khabis') && (
                <div className="max-w-4xl mx-auto">
                    <CardTable 
                        title={gameMode === 'hokm' ? 'میز حکم' : gameMode === 'shelem' ? 'میز شلم' : 'میز هفت خبیث'} 
                        type={gameMode} 
                    />
                </div>
            )}

            {/* SNAKE GAME */}
            {gameMode === 'snake' && (
                <div className="max-w-md mx-auto bg-slate-900 p-6 rounded-[2.5rem] shadow-xl text-center">
                    <div className="flex justify-between text-white mb-4 px-2">
                        <span>امتیاز: {score}</span>
                        <button onClick={() => setGameMode('menu')}><XIcon className="w-5 h-5"/></button>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-1 grid grid-cols-20 grid-rows-20 gap-px w-full aspect-square border-4 border-slate-700 relative">
                        {Array.from({length: 20}).map((_, r) => (
                            Array.from({length: 20}).map((_, c) => {
                                const isSnake = snake.some(s => s.x === c && s.y === r);
                                const isFood = food.x === c && food.y === r;
                                return (
                                    <div key={`${r}-${c}`} className={`w-full h-full rounded-sm ${isSnake ? 'bg-emerald-500' : isFood ? 'bg-red-500 rounded-full' : 'bg-slate-900'}`}></div>
                                );
                            })
                        ))}
                        {/* Overlay Controls for Mobile */}
                        <div className="absolute inset-0 z-10 grid grid-cols-3 grid-rows-3 opacity-0">
                            <div onClick={() => setSnakeDir('UP')} className="col-start-2 row-start-1 bg-red-500"></div>
                            <div onClick={() => setSnakeDir('LEFT')} className="col-start-1 row-start-2 bg-red-500"></div>
                            <div onClick={() => setSnakeDir('RIGHT')} className="col-start-3 row-start-2 bg-red-500"></div>
                            <div onClick={() => setSnakeDir('DOWN')} className="col-start-2 row-start-3 bg-red-500"></div>
                        </div>
                    </div>
                    <p className="text-slate-500 text-sm mt-4">برای کنترل روی صفحه (بالا، پایین، چپ، راست) ضربه بزنید یا از کیبورد استفاده کنید.</p>
                </div>
            )}

            {/* SNAKES & LADDERS */}
            {gameMode === 'snakes_ladders' && (
                <div className="max-w-md mx-auto bg-white p-6 rounded-[2.5rem] shadow-xl text-center">
                    <div className="flex justify-between items-center mb-4">
                        <div className={`p-2 rounded-xl flex items-center gap-2 ${slTurn === 0 ? 'bg-blue-100 text-blue-700 border-2 border-blue-500' : 'bg-slate-50 text-slate-400'}`}>
                            <div className="w-3 h-3 rounded-full bg-blue-600"></div> P1: {slPlayers[0]}
                        </div>
                        <button onClick={() => setGameMode('menu')}><XIcon className="w-5 h-5 text-slate-400"/></button>
                        <div className={`p-2 rounded-xl flex items-center gap-2 ${slTurn === 1 ? 'bg-red-100 text-red-700 border-2 border-red-500' : 'bg-slate-50 text-slate-400'}`}>
                            <div className="w-3 h-3 rounded-full bg-red-600"></div> P2: {slPlayers[1]}
                        </div>
                    </div>
                    
                    {/* Board Visualization (Simplified 10x10 Grid) */}
                    <div className="grid grid-cols-10 gap-1 bg-slate-100 p-2 rounded-xl mb-4 border border-slate-200">
                        {Array.from({length: 100}).map((_, i) => {
                            const num = 100 - i;
                            const isP1 = slPlayers[0] === num;
                            const isP2 = slPlayers[1] === num;
                            return (
                                <div key={num} className={`aspect-square flex items-center justify-center text-[8px] rounded relative ${num % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                                    <span className="opacity-30">{num}</span>
                                    {isP1 && <div className="absolute w-3 h-3 bg-blue-600 rounded-full shadow-md z-10 border border-white"></div>}
                                    {isP2 && <div className="absolute w-3 h-3 bg-red-600 rounded-full shadow-md z-10 border border-white translate-x-1 translate-y-1"></div>}
                                </div>
                            );
                        })}
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl mb-4 h-20 flex items-center justify-center text-sm font-bold text-slate-700 border border-slate-200">
                        {slLog}
                    </div>

                    <button 
                        onClick={rollDiceSL} 
                        disabled={slDice !== null}
                        className="w-full py-4 bg-amber-500 text-white rounded-2xl font-bold hover:bg-amber-600 transition-colors shadow-lg shadow-amber-200 disabled:bg-slate-300 disabled:shadow-none flex justify-center items-center gap-2"
                    >
                        {slDice ? `تاس: ${slDice}` : `نوبت بازیکن ${slTurn + 1} - پرتاب تاس`}
                        <Dices className="w-5 h-5"/>
                    </button>
                </div>
            )}

            {/* ESM FAMIL */}
            {gameMode === 'esm_famil' && (
                <div className="max-w-md mx-auto bg-white p-6 rounded-[2.5rem] shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg font-bold">حرف: {efLetter}</span>
                            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg font-bold">زمان: {timeLeft}</span>
                        </div>
                        <button onClick={() => setGameMode('menu')}><XIcon className="w-5 h-5 text-slate-400"/></button>
                    </div>

                    <div className="space-y-4 mb-6">
                        {Object.keys(efInputs).map((key) => (
                            <div key={key}>
                                <label className="text-xs font-bold text-slate-500 mb-1 block">
                                    {key === 'name' ? 'اسم' : key === 'food' ? 'غذا' : key === 'city' ? 'شهر' : 'رنگ'}
                                </label>
                                <input 
                                    type="text" 
                                    value={(efInputs as any)[key]} 
                                    onChange={(e) => setEfInputs({...efInputs, [key]: e.target.value})}
                                    className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none text-slate-800"
                                    placeholder={`با حرف ${efLetter} بنویسید...`}
                                />
                            </div>
                        ))}
                    </div>

                    <button onClick={calculateEsmFamilScore} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700">
                        توقف و محاسبه امتیاز
                    </button>
                </div>
            )}

            {/* BOWLING */}
            {gameMode === 'bowling' && (
                <div className="max-w-md mx-auto bg-slate-900 p-6 rounded-[2.5rem] shadow-xl text-center text-white relative overflow-hidden">
                    <button onClick={() => setGameMode('menu')} className="absolute top-4 right-4 z-20"><XIcon className="w-5 h-5 text-white/50"/></button>
                    <div className="h-64 relative bg-slate-800 rounded-2xl mb-6 flex justify-center items-end perspective-1000 overflow-hidden border border-slate-700">
                        {/* Pins */}
                        <div className="absolute top-10 flex gap-1 transform scale-50">
                            {bowlPins.map((p, i) => (
                                <div key={i} className={`w-4 h-12 bg-white rounded-full transition-opacity duration-300 ${p ? 'opacity-100' : 'opacity-0'}`}></div>
                            ))}
                        </div>
                        {/* Ball */}
                        <div className={`w-12 h-12 bg-rose-500 rounded-full shadow-lg transition-all duration-1000 absolute bottom-4`}
                             style={{ 
                                 left: `calc(50% + ${bowlAim}px - 24px)`,
                                 transform: bowlPhase === 'result' ? 'scale(0.2) translateY(-200px)' : 'scale(1)'
                             }}
                        ></div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                <span>هدف‌گیری</span>
                                <span>{Math.round(bowlAim)}</span>
                            </div>
                            <div className="h-2 bg-slate-700 rounded-full overflow-hidden relative">
                                <div className="absolute left-1/2 top-0 w-0.5 h-full bg-white z-10"></div>
                                <div className="h-full w-2 bg-emerald-500 absolute transition-all duration-75" style={{ left: `calc(50% + ${bowlAim}px)` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                <span>قدرت</span>
                                <span>{Math.round(bowlPower)}%</span>
                            </div>
                            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500 transition-all duration-75" style={{ width: `${bowlPower}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={handleBowlingClick}
                        disabled={bowlPhase === 'result'}
                        className="mt-6 w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg hover:bg-emerald-500 transition-colors"
                    >
                        {bowlPhase === 'aim' ? 'قفل کردن هدف' : bowlPhase === 'power' ? 'پرتاب توپ!' : 'نتیجه...'}
                    </button>
                </div>
            )}

            {/* DARTS */}
            {gameMode === 'darts' && (
                <div className="max-w-md mx-auto bg-white p-6 rounded-[2.5rem] shadow-xl text-center">
                    <div className="flex justify-between items-center mb-6">
                        <span className="font-bold text-slate-700">امتیاز: {score}</span>
                        <span className="text-sm bg-slate-100 px-3 py-1 rounded-lg">پرتاب‌ها: {dartThrows}</span>
                    </div>

                    <div className="relative w-64 h-64 mx-auto mb-8">
                        <div 
                            className="w-full h-full rounded-full border-[16px] border-slate-800 relative overflow-hidden transition-transform duration-75 shadow-inner"
                            style={{ transform: `rotate(${dartRotation}deg)` }}
                        >
                            <div className="absolute inset-0 bg-[conic-gradient(red_20deg,black_20deg_40deg,red_40deg_60deg,black_60deg_80deg,red_80deg_100deg,black_100deg_120deg,red_120deg_140deg,black_140deg_160deg,red_160deg_180deg,black_180deg_200deg,red_200deg_220deg,black_220deg_240deg,red_240deg_260deg,black_260deg_280deg,red_280deg_300deg,black_300deg_320deg,red_320deg_340deg,black_340deg_360deg)] opacity-80"></div>
                            <div className="absolute inset-[30%] bg-white rounded-full flex items-center justify-center border-4 border-slate-300">
                                <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                            </div>
                        </div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-red-600">
                            <ArrowDown className="w-8 h-8 drop-shadow-md" />
                        </div>
                    </div>

                    <button 
                        onClick={throwDart}
                        disabled={dartThrows <= 0}
                        className="w-full py-4 bg-rose-600 text-white rounded-2xl font-bold shadow-lg shadow-rose-200 hover:bg-rose-700 active:scale-95 transition-all"
                    >
                        پرتاب دارت
                    </button>
                    <button onClick={() => setGameMode('menu')} className="mt-4 text-slate-400 text-sm">انصراف</button>
                </div>
            )}

            {/* DINO GAME */}
            {gameMode === 'dino' && (
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 max-w-2xl mx-auto h-[300px] relative animate-in zoom-in-95" onClick={jump}>
                    <div className="absolute top-4 right-4 bg-black/10 px-3 py-1 rounded-full font-mono font-bold">Score: {score}</div>
                    <div className="absolute bottom-0 w-full h-[1px] bg-slate-800"></div>
                    
                    {/* Dino */}
                    <div 
                        ref={dinoRef}
                        className="absolute left-10 w-10 h-10 bg-slate-800 rounded-md transition-all duration-75"
                        style={{ bottom: `${dinoY}px` }}
                    ></div>

                    {/* Cactus */}
                    <div 
                        ref={cactusRef}
                        className="absolute bottom-0 w-6 h-12 bg-red-600 rounded-t-full"
                        style={{ left: `${cactusLeft}px` }}
                    ></div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-300 pointer-events-none text-sm">
                        برای پرش کلیک کنید
                    </div>
                    
                    <button onClick={() => setGameMode('menu')} className="absolute top-4 left-4 bg-slate-100 p-2 rounded-full hover:bg-slate-200"><ArrowRight className="w-4 h-4"/></button>
                </div>
            )}

            {/* TIC TAC TOE */}
            {gameMode === 'tictactoe' && (
                <div className="max-w-md mx-auto bg-white p-8 rounded-[3rem] shadow-xl text-center">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-xl">دوز</h3>
                        <span className="bg-slate-100 px-3 py-1 rounded-lg text-sm">نوبت: {xIsNext ? 'X' : 'O'}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 bg-slate-200 p-2 rounded-2xl">
                        {tttBoard.map((val, i) => (
                            <button 
                                key={i} 
                                onClick={() => handleTttClick(i)}
                                className={`w-full aspect-square bg-white rounded-xl text-4xl font-black flex items-center justify-center transition-colors hover:bg-slate-50 ${val === 'X' ? 'text-blue-500' : 'text-rose-500'}`}
                            >
                                {val}
                            </button>
                        ))}
                    </div>
                    {winner && (
                        <div className="mt-6 p-4 bg-emerald-100 text-emerald-700 rounded-xl font-bold">
                            {winner === 'Draw' ? 'بازی مساوی شد!' : `برنده: ${winner}`}
                        </div>
                    )}
                    <button onClick={() => setGameMode('menu')} className="mt-6 text-slate-400 hover:text-slate-600">خروج از بازی</button>
                </div>
            )}

            {/* SPACE SHOOTER */}
            {gameMode === 'space' && (
                <div className="max-w-md mx-auto bg-slate-900 rounded-[2rem] overflow-hidden h-[500px] relative shadow-2xl">
                    <div className="absolute top-4 left-4 text-white font-mono">SCORE: {score}</div>
                    
                    {/* Controls Overlay */}
                    <div className="absolute bottom-4 left-0 w-full flex justify-center gap-4 z-20">
                        <button onMouseDown={() => setShipX(x => Math.max(x - 10, 5))} className="p-4 bg-white/10 rounded-full text-white"><ArrowLeft/></button>
                        <button onMouseDown={fireBullet} className="p-6 bg-red-500 rounded-full text-white shadow-lg shadow-red-500/50"><Crosshair/></button>
                        <button onMouseDown={() => setShipX(x => Math.min(x + 10, 95))} className="p-4 bg-white/10 rounded-full text-white"><ArrowRight/></button>
                    </div>

                    {/* Ship */}
                    <div className="absolute bottom-20 w-8 h-8 bg-blue-500 rounded-t-lg transition-all duration-100 -translate-x-1/2" style={{left: `${shipX}%`}}></div>

                    {/* Bullets */}
                    {bullets.map(b => (
                        <div key={b.id} className="absolute w-1 h-3 bg-yellow-400 rounded-full -translate-x-1/2" style={{left: `${b.x}%`, bottom: `${b.y}%`}}></div>
                    ))}

                    {/* Enemies */}
                    {enemies.map(e => (
                        <div key={e.id} className="absolute w-6 h-6 bg-red-600 rounded-full -translate-x-1/2 animate-pulse" style={{left: `${e.x}%`, bottom: `${e.y}%`}}></div>
                    ))}
                    
                    <button onClick={() => setGameMode('menu')} className="absolute top-4 right-4 bg-white/10 text-white p-2 rounded-full"><XIcon className="w-4 h-4"/></button>
                </div>
            )}

            {/* CARD HIGH/LOW */}
            {gameMode === 'card_highlow' && (
                <div className="max-w-sm mx-auto bg-emerald-800 p-8 rounded-[3rem] shadow-xl text-center text-white border-4 border-emerald-900">
                    <h3 className="font-bold text-xl mb-2">بالا یا پایین؟</h3>
                    <p className="text-emerald-200 text-sm mb-8">امتیاز: {score} | کارت‌های مانده: {deckCount}</p>
                    
                    <div className="bg-white text-slate-900 w-32 h-48 rounded-2xl mx-auto flex flex-col items-center justify-center shadow-2xl mb-8 relative">
                        <div className="absolute top-2 left-2 text-xl">♠️</div>
                        <div className="text-6xl font-black">{getCardName(currentCard)}</div>
                        <div className="absolute bottom-2 right-2 text-xl rotate-180">♠️</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => guessCard('higher')} className="bg-emerald-600 hover:bg-emerald-500 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                            <ArrowUp className="w-5 h-5"/> بالاتر
                        </button>
                        <button onClick={() => guessCard('lower')} className="bg-red-600 hover:bg-red-500 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                            <ArrowDown className="w-5 h-5"/> پایین‌تر
                        </button>
                    </div>
                    <button onClick={() => setGameMode('menu')} className="mt-6 text-emerald-300 text-sm hover:text-white">انصراف</button>
                </div>
            )}

            {/* MATH / TYPING / MEMORY / 2048 Handlers */}
            {gameMode === 'math' && (
                <div className="max-w-md mx-auto bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100 text-center animate-in zoom-in-95">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-2 text-slate-500 font-bold"><Timer className="w-5 h-5" /> {timeLeft}s</div>
                        <div className="text-xl font-black text-pink-600">امتیاز: {score}</div>
                    </div>
                    <div className="text-6xl font-black text-slate-800 mb-8 dir-ltr">{mathQuestion.q}</div>
                    <form onSubmit={checkMathAnswer}>
                        <input autoFocus type="number" value={mathInput} onChange={(e) => setMathInput(e.target.value)} className="w-full text-center text-4xl font-bold p-4 bg-slate-100 rounded-2xl border-2 border-transparent focus:border-pink-500 outline-none text-slate-900" />
                    </form>
                </div>
            )}

            {/* MEMORY GAME */}
            {gameMode === 'memory' && (
                <div className="max-w-2xl mx-auto bg-white p-6 rounded-[2.5rem] shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-4">
                            <span className="text-slate-600 font-bold">حرکات: {memoryMoves}</span>
                            <span className="text-pink-600 font-bold">امتیاز: {score}</span>
                        </div>
                        <button onClick={() => setGameMode('menu')}><XIcon className="w-5 h-5 text-slate-400"/></button>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        {memoryCards.map((card) => (
                            <button 
                                key={card.id} 
                                onClick={() => handleMemoryCardClick(card.id)}
                                className={`aspect-square rounded-2xl text-4xl flex items-center justify-center transition-all duration-300 transform ${card.flipped || card.matched ? 'bg-indigo-600 text-white rotate-y-180' : 'bg-slate-100 hover:bg-slate-200'}`}
                            >
                                {(card.flipped || card.matched) ? card.icon : ''}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* TYPING GAME */}
            {gameMode === 'typing' && (
                <div className="max-w-md mx-auto bg-white p-8 rounded-[3rem] shadow-xl text-center">
                    <div className="flex justify-between text-slate-500 mb-8 font-bold">
                        <span>زمان: {timeLeft}s</span>
                        <span>کلمات: {wordsTyped}</span>
                    </div>
                    
                    <div className="h-24 flex items-center justify-center mb-8">
                        <span className={`text-4xl font-black transition-opacity ${typingWordVisible ? 'opacity-100' : 'opacity-0'} ${typingMode === 'reverse' ? 'scale-x-[-1]' : ''} ${typingMode === 'blind' ? 'blur-sm hover:blur-none' : ''}`}>
                            {typingWord}
                        </span>
                    </div>

                    <input 
                        autoFocus
                        type="text" 
                        value={typingInput}
                        onChange={handleTypingInput}
                        placeholder="تایپ کنید..."
                        className="w-full p-4 text-center text-xl bg-slate-50 rounded-2xl outline-none border-2 border-slate-200 focus:border-indigo-500"
                    />
                    <button onClick={() => setGameMode('menu')} className="mt-6 text-slate-400">انصراف</button>
                </div>
            )}

            {/* 2048 Placeholder */}
            {gameMode === '2048' && (
                <div className="max-w-md mx-auto bg-white p-8 rounded-[3rem] shadow-xl text-center">
                    <div className="bg-amber-100 p-6 rounded-2xl mb-6">
                        <h3 className="text-amber-800 font-bold text-lg mb-2">بازی ۲۰۴۸</h3>
                        <p className="text-amber-700 text-sm">این بازی در نسخه بعدی با گرافیک کامل اضافه می‌شود.</p>
                    </div>
                    <button onClick={() => setGameMode('menu')} className="bg-slate-800 text-white px-6 py-3 rounded-xl font-bold">بازگشت</button>
                </div>
            )}

            {/* Result Screen */}
            {gameMode === 'result' && (
                <div className="text-center max-w-md mx-auto bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 animate-in zoom-in-95">
                    <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Trophy className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 mb-2">پایان بازی!</h2>
                    <p className="text-slate-500 mb-4">{resultMessage || 'عملکرد فوق‌العاده‌ای داشتی.'}</p>
                    <div className="text-5xl font-black text-pink-600 mb-8">{score > 0 ? score : quizScore}</div>
                    <button onClick={() => setGameMode('menu')} className="w-full py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-900 transition-all">بازگشت به منو</button>
                </div>
            )}

            {activeTab === 'quiz' && (
                <>
                    {gameMode === 'menu' && (
                        <div className="space-y-6">
                            {/* Major Selector */}
                            <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
                                {quizMajors.map((major) => (
                                    <button
                                        key={major.id}
                                        onClick={() => setSelectedQuizMajor(major.id)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                                            selectedQuizMajor === major.id 
                                            ? major.color + ' shadow-md' 
                                            : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
                                        }`}
                                    >
                                        <major.icon className="w-4 h-4" />
                                        {major.label}
                                    </button>
                                ))}
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {quizDatabase[selectedQuizMajor].map((quiz) => (
                                    <button 
                                        key={quiz.id} 
                                        onClick={() => startQuiz(quiz)} 
                                        className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all flex flex-col text-right group h-full justify-between"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className={`p-3 rounded-2xl ${
                                                    quiz.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-600' :
                                                    quiz.difficulty === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'
                                                } group-hover:scale-110 transition-transform`}>
                                                    <BookOpen className="w-6 h-6" />
                                                </div>
                                                <span className={`text-[10px] px-2 py-1 rounded-lg font-bold ${
                                                    quiz.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600' :
                                                    quiz.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                                                }`}>
                                                    {quiz.difficulty === 'Easy' ? 'آسان' : quiz.difficulty === 'Medium' ? 'متوسط' : 'سخت'}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-lg text-slate-800 mb-2">{quiz.title}</h3>
                                            <p className="text-sm text-slate-500 mb-4">{quiz.description}</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-slate-50 p-2 rounded-xl w-full justify-center">
                                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                            {quiz.xp} XP جایزه
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {gameMode === 'quiz_playing' && activeQuiz && (
                        <div className="max-w-2xl mx-auto bg-white p-8 rounded-[2rem] shadow-lg border border-slate-100 animate-in zoom-in-95">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-sm font-bold text-slate-400">سوال {currentQuizIndex + 1} از {activeQuiz.questions.length}</span>
                                <span className="text-sm font-bold text-emerald-600">امتیاز فعلی: {quizScore}</span>
                            </div>
                            
                            <div className="w-full bg-slate-100 rounded-full h-2 mb-8">
                                <div 
                                    className="bg-pink-500 h-2 rounded-full transition-all duration-500" 
                                    style={{ width: `${((currentQuizIndex + 1) / activeQuiz.questions.length) * 100}%` }}
                                ></div>
                            </div>

                            <h3 className="text-xl font-bold text-slate-800 mb-8 leading-relaxed">{activeQuiz.questions[currentQuizIndex].question}</h3>
                            <div className="space-y-3">
                                {activeQuiz.questions[currentQuizIndex].options.map((opt, idx) => (
                                    <button key={idx} onClick={() => handleQuizAnswer(idx)} className="w-full p-4 text-right bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-100 rounded-xl transition-colors font-medium text-slate-800">
                                        {opt}
                                    </button>
                                ))}
                            </div>
                            
                            <button onClick={() => setGameMode('menu')} className="mt-8 text-slate-400 text-sm hover:text-slate-600 flex items-center gap-2">
                                <ArrowRight className="w-4 h-4" /> انصراف از آزمون
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Leaderboard Tab (Same as before) */}
            {activeTab === 'leaderboard' && (
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 bg-slate-50 border-b border-slate-100">
                        <h3 className="font-bold text-lg text-slate-800">برترین دانشجویان هفته</h3>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {[{ name: 'سارا احمدی', score: 2450, rank: 1, avatar: 'https://picsum.photos/seed/u1/50' }, { name: 'علی رضایی', score: 2100, rank: 2, avatar: 'https://picsum.photos/seed/u2/50' }, { name: 'شما', score: 1450, rank: 42, avatar: 'https://picsum.photos/seed/student/50', me: true }].map((user, i) => (
                            <div key={i} className={`flex items-center gap-4 p-4 ${user.me ? 'bg-pink-50' : 'hover:bg-slate-50'}`}>
                                <div className={`w-8 h-8 flex items-center justify-center font-black rounded-full ${user.rank <= 3 ? 'bg-yellow-100 text-yellow-600' : 'text-slate-400'}`}>{user.rank}</div>
                                <img src={user.avatar} className="w-10 h-10 rounded-full" alt={user.name} />
                                <div className="flex-1"><span className={`font-bold block ${user.me ? 'text-pink-700' : 'text-slate-700'}`}>{user.name}</span></div>
                                <div className="font-mono font-bold text-slate-800">{user.score} XP</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
      )}
    </div>
  );
};

export default GameCenter;
