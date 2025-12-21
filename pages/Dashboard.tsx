
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, Clock, MapPin, ChevronLeft, Pin, CalendarDays, MonitorPlay, Archive, BrainCircuit, PenTool, BookHeart, Map, FlaskConical, Library, Users, Gamepad2, User, Globe, Wrench, Mic2, ChefHat, CalendarCheck, Building2, Link as LinkIcon, Bot, Rocket, FileText, ShoppingBag, AlertTriangle, GraduationCap, Utensils, Megaphone, Bell, ArrowRight, ExternalLink, Trash2, Plus, X, CheckCircle2
} from 'lucide-react';
import { UserProfile } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Feature Mapping for Pinned Items (Updated colors for dark mode context if needed)
const allFeatures: Record<string, { title: string, icon: any, color: string, bg: string, darkBg: string }> = {
    '/schedule': { title: 'برنامه هفتگی', icon: CalendarDays, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50', darkBg: 'dark:bg-blue-900/20' },
    '/booking': { title: 'تغذیه و رزرو', icon: Utensils, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50', darkBg: 'dark:bg-orange-900/20' },
    '/tools': { title: 'جعبه ابزار', icon: Wrench, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50', darkBg: 'dark:bg-purple-900/20' },
    '/marketplace': { title: 'دیوار دانشجویی', icon: ShoppingBag, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50', darkBg: 'dark:bg-rose-900/20' },
    '/library': { title: 'کتابخانه', icon: Library, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50', darkBg: 'dark:bg-amber-900/20' },
    '/profile': { title: 'پروفایل من', icon: User, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50', darkBg: 'dark:bg-emerald-900/20' },
    '/ai-consultant': { title: 'دستیار هوشمند', icon: Bot, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50', darkBg: 'dark:bg-indigo-900/20' },
    '/games': { title: 'گیم سنتر', icon: Gamepad2, color: 'text-pink-600 dark:text-pink-400', bg: 'bg-pink-50', darkBg: 'dark:bg-pink-900/20' },
    '/roadmap': { title: 'نقشه راه', icon: Map, color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-50', darkBg: 'dark:bg-cyan-900/20' },
    '/research': { title: 'پژوهش', icon: FlaskConical, color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50', darkBg: 'dark:bg-teal-900/20' },
    '/services': { title: 'میز خدمت', icon: Globe, color: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-50', darkBg: 'dark:bg-slate-800/50' },
    '/city-guide': { title: 'شهرگردی', icon: Building2, color: 'text-lime-600 dark:text-lime-400', bg: 'bg-lime-50', darkBg: 'dark:bg-lime-900/20' },
    '/smart-study': { title: 'مطالعه هوشمند', icon: MonitorPlay, color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50', darkBg: 'dark:bg-violet-900/20' },
    '/question-bank': { title: 'بانک سوالات', icon: Archive, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50', darkBg: 'dark:bg-blue-900/20' },
};

const Dashboard: React.FC<{ user: UserProfile }> = ({ user }) => {
  const [pinnedItems, setPinnedItems] = useState<string[]>([]);
  
  // Tasks State
  const [tasks, setTasks] = useState([
      { id: 1, title: 'تحویل تمرین مدار', done: false },
      { id: 2, title: 'خرید کتاب زبان', done: true },
      { id: 3, title: 'هماهنگی با استاد راهنما', done: false }
  ]);
  const [newTaskInput, setNewTaskInput] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  useEffect(() => {
    const updatePins = () => {
        const saved = localStorage.getItem('pinnedItems');
        if(saved) setPinnedItems(JSON.parse(saved));
        else setPinnedItems(['/schedule', '/booking', '/marketplace', '/ai-consultant']);
    };

    updatePins();
    window.addEventListener('pinsUpdated', updatePins);
    return () => window.removeEventListener('pinsUpdated', updatePins);
  }, []);

  const chartData = [ { name: 'شنبه', gpa: 16.5 }, { name: 'یکشنبه', gpa: 17.2 }, { name: 'دوشنبه', gpa: 18.0 }, { name: 'سه‌شنبه', gpa: 17.8 }, { name: 'چهارشنبه', gpa: 18.5 } ];

  const academicEvents = [
      { title: 'شروع امتحانات', days: 14, type: 'critical' },
      { title: 'حذف اضطراری', days: 3, type: 'warning' },
      { title: 'تعطیلات نوروز', days: 85, type: 'info' },
  ];

  const news = [
      { id: 1, title: 'آغاز ثبت‌نام وام دانشجویی نیمسال دوم', date: '۲ ساعت پیش', type: 'مهم', typeColor: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' },
      { id: 2, title: 'تغییر ساعت کلاس‌های ساختمان ابن‌سینا', date: 'دیروز', type: 'آموزشی', typeColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' },
      { id: 3, title: 'منوی جدید ناهار در سلف مرکزی', date: '۲ روز پیش', type: 'تغذیه', typeColor: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' },
      { id: 4, title: 'فراخوان جذب نیرو برای انجمن علمی', date: '۳ روز پیش', type: 'فرهنگی', typeColor: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' },
  ];

  const todayClasses = [
      { id: 1, name: 'هوش مصنوعی', time: '۱۰:۰۰ - ۱۲:۰۰', loc: 'کلاس ۳۰۲' },
      { id: 2, name: 'مهندسی نرم‌افزار', time: '۱۴:۰۰ - ۱۶:۰۰', loc: 'سایت کامپیوتر' },
  ];

  // Task Handlers
  const handleToggleTask = (id: number) => {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleDeleteTask = (id: number) => {
      setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleAddTask = () => {
      if (newTaskInput.trim()) {
          setTasks(prev => [...prev, { id: Date.now(), title: newTaskInput.trim(), done: false }]);
          setNewTaskInput('');
          setIsAddingTask(false);
      }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 pb-10">
      
      {/* 1. Welcome Banner */}
      <section className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-emerald-600 to-teal-800 dark:from-emerald-900 dark:to-teal-950 p-6 md:p-10 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10">ترم ۴۰۲۱</span>
                <span className="bg-emerald-500/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span> وضعیت: فعال
                </span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-display mb-2 leading-tight">سلام، {user.name.split(' ')[0]} عزیز! 👋</h1>
            <p className="text-emerald-100 opacity-90 text-sm md:text-lg font-medium">امروز دوشنبه، ۴ دی‌ماه ۱۴۰۲ است. روز پرانرژی داشته باشی!</p>
            
            <div className="mt-6 md:mt-8 flex flex-wrap gap-3 md:gap-4">
              <Link to="/schedule" className="px-5 py-3 bg-white text-emerald-800 rounded-2xl font-bold shadow-lg hover:bg-emerald-50 transition-colors flex items-center gap-2 text-sm md:text-base">
                <CalendarCheck className="w-5 h-5" />
                مشاهده برنامه کامل
              </Link>
              <button className="px-5 py-3 bg-emerald-700/50 border border-emerald-400/30 rounded-2xl font-bold hover:bg-emerald-700/70 transition-colors text-white backdrop-blur-sm flex items-center gap-2 text-sm md:text-base">
                <GraduationCap className="w-5 h-5" />
                کارنامه ترم قبل
              </button>
            </div>
          </div>
          
          {/* Smart Calendar Widgets */}
          <div className="flex gap-3 overflow-x-auto pb-2 w-full md:w-auto custom-scrollbar">
             {academicEvents.map((ev, i) => (
                 <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 p-4 md:p-5 rounded-3xl text-center min-w-[100px] md:min-w-[110px] flex flex-col justify-center hover:bg-white/20 transition-all">
                     <span className={`block text-3xl md:text-4xl font-display mb-1 ${ev.type === 'critical' ? 'text-red-300' : ev.type === 'warning' ? 'text-amber-300' : 'text-blue-300'}`}>
                         {ev.days}
                     </span>
                     <span className="text-[9px] md:text-[10px] opacity-70 block mb-1 uppercase tracking-widest font-bold">روز تا</span>
                     <span className="text-xs md:text-sm font-bold whitespace-nowrap">{ev.title}</span>
                 </div>
             ))}
          </div>
        </div>
      </section>

      {/* 2. Pinned Items (Quick Actions) */}
      <section>
          <div className="flex items-center gap-2 mb-4 px-2">
              <Pin className="w-5 h-5 text-slate-400" />
              <h3 className="font-bold text-slate-700 dark:text-slate-300 text-lg">دسترسی سریع</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {pinnedItems.map((path) => {
                  const feature = allFeatures[path];
                  if (!feature) return null;
                  const Icon = feature.icon;
                  return (
                      <Link to={path} key={path} className={`group p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all flex flex-col items-center justify-center text-center gap-3 h-32 bg-white dark:bg-slate-900 hover:bg-opacity-80`}>
                          <div className={`p-3 rounded-2xl ${feature.bg} ${feature.darkBg} transition-transform group-hover:scale-110`}>
                              <Icon className={`w-6 h-6 ${feature.color}`} />
                          </div>
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">{feature.title}</span>
                      </Link>
                  );
              })}
              
              {/* Add Pin Placeholder */}
              <div className="p-4 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center gap-2 h-32 text-slate-400 dark:text-slate-600">
                  <Pin className="w-6 h-6 opacity-50" />
                  <span className="text-xs font-bold">برای افزودن، دکمه پین در منو را بزنید</span>
              </div>
          </div>
      </section>

      {/* 3. Main Dashboard Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-8">
            
            {/* Today's Status Row */}
            <div className="grid sm:grid-cols-2 gap-6">
                {/* Next Class */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-between h-48 relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/20 transition-colors"></div>
                    
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl">
                                <Clock className="w-6 h-6" />
                            </div>
                            <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold">کلاس بعدی</span>
                        </div>
                        {todayClasses.length > 0 ? (
                            <>
                                <h3 className="text-xl md:text-2xl font-display text-slate-800 dark:text-slate-100 mb-1 truncate">{todayClasses[0].name}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2 font-bold">
                                    <MapPin className="w-4 h-4" /> {todayClasses[0].loc} • {todayClasses[0].time}
                                </p>
                            </>
                        ) : (
                            <p className="text-slate-500 dark:text-slate-400 font-bold mt-2">کلاسی برای امروز باقی نمانده!</p>
                        )}
                    </div>
                    {todayClasses.length > 0 && (
                        <div className="relative z-10 w-full bg-slate-50 dark:bg-slate-800 rounded-xl h-2 mt-auto overflow-hidden">
                            <div className="bg-blue-500 h-full w-[40%] rounded-xl"></div>
                        </div>
                    )}
                </div>

                {/* Food Status */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-between h-48 relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 dark:bg-orange-900/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/20 transition-colors"></div>
                    
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-2xl">
                                <Utensils className="w-6 h-6" />
                            </div>
                            <span className="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full text-xs font-bold">ناهار امروز</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-display text-slate-800 dark:text-slate-100 mb-1 truncate">زرشک پلو با مرغ</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2 font-bold">
                            <Building2 className="w-4 h-4" /> سلف مرکزی • رزرو شده
                        </p>
                    </div>
                    <button className="relative z-10 w-full py-2 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-xl text-sm font-bold hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors flex items-center justify-center gap-2 mt-auto">
                        مشاهده کد فراموشی
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* News & Announcements */}
            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Megaphone className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        اخبار و اطلاعیه‌ها
                    </h3>
                    <Link to="/news" className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 px-3 py-1 rounded-lg transition-colors">
                        آرشیو کامل
                    </Link>
                </div>

                <div className="space-y-4">
                    {news.map(item => (
                        <div key={item.id} className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700 cursor-pointer">
                            <div className={`p-3 rounded-2xl shrink-0 ${item.typeColor.replace('text-', 'bg-').split(' ')[0]} bg-opacity-20`}>
                                <Bell className={`w-6 h-6 ${item.typeColor.split(' ')[2]}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${item.typeColor}`}>{item.type}</span>
                                    <span className="text-xs text-slate-400 whitespace-nowrap">{item.date}</span>
                                </div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">{item.title}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="space-y-8">
            {/* GPA Chart */}
            <section className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">پیشرفت تحصیلی</h3>
                    <button className="text-emerald-600 dark:text-emerald-400 p-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-full transition-colors">
                        <ExternalLink className="w-4 h-4" />
                    </button>
                </div>
                <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.3} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} interval={1} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} domain={['dataMin - 1', 'dataMax + 1']} />
                        <Tooltip 
                            contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: '#1e293b', color: '#fff'}}
                            itemStyle={{color: '#10b981', fontWeight: 'bold'}}
                        />
                        <Line type="monotone" dataKey="gpa" stroke="#10b981" strokeWidth={3} dot={{r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
                    </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 flex justify-between items-center bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">معدل کل فعلی:</span>
                    <span className="text-2xl font-display text-emerald-600 dark:text-emerald-400 pt-1">17.84</span>
                </div>
            </section>

            {/* Quick Tasks */}
            <div className="bg-gradient-to-b from-slate-800 to-slate-900 dark:from-slate-900 dark:to-black p-6 rounded-[2.5rem] text-white shadow-lg">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-400" />
                    کارهای امروز
                </h3>
                
                <ul className="space-y-2 mb-4">
                    {tasks.map((task) => (
                        <li key={task.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group relative overflow-hidden">
                            <button 
                                onClick={() => handleToggleTask(task.id)}
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${task.done ? 'bg-emerald-500 border-emerald-500' : 'border-slate-500 hover:border-indigo-400'}`}
                            >
                                {task.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                            </button>
                            <span className={`text-sm flex-1 ${task.done ? 'line-through opacity-50' : 'opacity-90'}`}>{task.title}</span>
                            <button 
                                onClick={() => handleDeleteTask(task.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-red-400 hover:text-red-300"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </li>
                    ))}
                    {tasks.length === 0 && (
                        <li className="text-center text-xs opacity-50 py-4">کاری برای امروز ثبت نشده است</li>
                    )}
                </ul>

                {isAddingTask ? (
                    <div className="flex gap-2 items-center bg-white/10 p-2 rounded-xl">
                        <input 
                            autoFocus
                            type="text" 
                            value={newTaskInput}
                            onChange={(e) => setNewTaskInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                            placeholder="تسک جدید..."
                            className="bg-transparent border-none outline-none text-sm text-white placeholder:text-slate-400 flex-1 min-w-0"
                        />
                        <button onClick={handleAddTask} className="p-1 hover:text-emerald-400 text-white transition-colors"><CheckCircle2 className="w-5 h-5"/></button>
                        <button onClick={() => setIsAddingTask(false)} className="p-1 hover:text-red-400 text-white transition-colors"><X className="w-5 h-5"/></button>
                    </div>
                ) : (
                    <button 
                        onClick={() => setIsAddingTask(true)}
                        className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> افزودن کار جدید
                    </button>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
