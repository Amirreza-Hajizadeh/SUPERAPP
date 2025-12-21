
import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  BookOpen, 
  Music, 
  Video, 
  Mic,
  Download,
  GraduationCap,
  Bell,
  Utensils,
  Plus,
  Trash2,
  CheckCircle2,
  List,
  Grid,
  Layout,
  Palette,
  Edit3,
  X,
  MinusCircle,
  PlusCircle,
  Save,
  AlignJustify,
  AlertCircle
} from 'lucide-react';

type ScheduleView = 'matrix' | 'timeline' | 'cards';
type ScheduleColor = 'teal' | 'indigo' | 'rose' | 'amber';

const scheduleColors: Record<ScheduleColor, { primary: string, secondary: string, bg: string, border: string, text: string, lightText: string }> = {
    teal: { primary: 'bg-teal-600', secondary: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-900/10', border: 'border-teal-200 dark:border-teal-900/30', text: 'text-teal-700 dark:text-teal-400', lightText: 'text-teal-600 dark:text-teal-400' },
    indigo: { primary: 'bg-indigo-600', secondary: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/10', border: 'border-indigo-200 dark:border-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-400', lightText: 'text-indigo-600 dark:text-indigo-400' },
    rose: { primary: 'bg-rose-600', secondary: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/10', border: 'border-rose-200 dark:border-rose-900/30', text: 'text-rose-700 dark:text-rose-400', lightText: 'text-rose-600 dark:text-rose-400' },
    amber: { primary: 'bg-amber-600', secondary: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/10', border: 'border-amber-200 dark:border-amber-900/30', text: 'text-amber-700 dark:text-amber-400', lightText: 'text-amber-600 dark:text-amber-400' },
};

const DailySchedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'classes' | 'events' | 'reminders'>('classes');
  const [viewMode, setViewMode] = useState<ScheduleView>('cards'); 
  const [colorTheme, setColorTheme] = useState<ScheduleColor>('teal');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAddClassModal, setShowAddClassModal] = useState(false);

  const theme = scheduleColors[colorTheme];

  // --- Classes State ---
  const [classes, setClasses] = useState([
    { id: 1, title: 'هوش مصنوعی', startTime: '08:00', endTime: '10:00', location: 'کلاس 302', prof: 'دکتر رضایی', day: 'شنبه', absences: 1 },
    { id: 2, title: 'مهندسی نرم‌افزار ۲', startTime: '10:00', endTime: '12:00', location: 'کلاس 405', prof: 'دکتر اکبری', day: 'دوشنبه', absences: 0 },
    { id: 3, title: 'آزمایشگاه شبکه', startTime: '14:00', endTime: '16:00', location: 'سایت ۲', prof: 'مهندس کریمی', day: 'سه‌شنبه', absences: 2 },
    { id: 4, title: 'طراحی الگوریتم', startTime: '08:00', endTime: '10:00', location: 'تالار 1', prof: 'دکتر ایزدی', day: 'چهارشنبه', absences: 0 },
    { id: 5, title: 'معادلات دیفرانسیل', startTime: '10:00', endTime: '12:00', location: 'کلاس 201', prof: 'دکتر نوری', day: 'شنبه', absences: 3 },
    { id: 6, title: 'مدار منطقی', startTime: '14:00', endTime: '16:00', location: 'کلاس 305', prof: 'دکتر همتی', day: 'یک‌شنبه', absences: 1 },
    { id: 7, title: 'ورزش ۱', startTime: '16:00', endTime: '18:00', location: 'سالن ورزش', prof: 'استاد ورزشی', day: 'دوشنبه', absences: 0 },
  ]);

  // New Class Form State
  const [newClass, setNewClass] = useState({
      title: '', prof: '', day: 'شنبه', startTime: '08:00', endTime: '10:00', location: ''
  });

  // --- Reminders State ---
  const [reminders, setReminders] = useState([
    { id: 1, title: 'رزرو ناهار هفته بعد', time: '14:00', type: 'FOOD', day: 'چهارشنبه', active: true },
    { id: 2, title: 'مرور درس هوش مصنوعی', time: '18:30', type: 'STUDY', day: 'هر روز', active: true },
    { id: 3, title: 'رفتن به سلف (ناهار)', time: '12:15', type: 'FOOD', day: 'شنبه تا چهارشنبه', active: false },
  ]);
  const [newReminder, setNewReminder] = useState({ title: '', time: '', type: 'STUDY' });

  // --- Matrix Config ---
  const days = ['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه'];
  const timeSlots = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00']; 

  // --- Handlers ---
  const handleAddClass = () => {
      if(newClass.title && newClass.day && newClass.startTime) {
          setClasses([...classes, { ...newClass, id: Date.now(), absences: 0 }]);
          setShowAddClassModal(false);
          setNewClass({ title: '', prof: '', day: 'شنبه', startTime: '08:00', endTime: '10:00', location: '' });
      }
  };

  const handleDeleteClass = (id: number) => {
      if(window.confirm('آیا مطمئن هستید که می‌خواهید این کلاس را حذف کنید؟')) {
          setClasses(classes.filter(c => c.id !== id));
      }
  };

  const handleAbsenceChange = (id: number, delta: number) => {
      setClasses(classes.map(c => 
          c.id === id ? { ...c, absences: Math.max(0, c.absences + delta) } : c
      ));
  };

  const handleAddReminder = () => {
    if (newReminder.title && newReminder.time) {
      setReminders([...reminders, { 
        id: Date.now(), 
        title: newReminder.title, 
        time: newReminder.time, 
        type: newReminder.type as any, 
        day: 'یک‌بار', 
        active: true 
      }]);
      setNewReminder({ title: '', time: '', type: 'STUDY' });
    }
  };

  const handleToggleReminder = (id: number) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const handleDeleteReminder = (id: number) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    const element = document.getElementById('schedule-content');
    const opt = {
      margin: 5,
      filename: `Weekly-Schedule-${new Date().toLocaleDateString()}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
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

  // Generate 50+ Events
  const events = useMemo(() => {
      const generated = [];
      const types = ['CULTURAL', 'SCIENTIFIC', 'SOCIAL', 'POLITICAL', 'ART', 'SPORTS'];
      const locations = ['آمفی‌تئاتر مرکزی', 'سالن تربیت بدنی', 'کلاس ۳۰۲', 'محوطه دانشگاه', 'سلف مرکزی', 'تالار ابن‌سینا'];
      const titles = [
          'اکران فیلم سینمایی', 'کارگاه هوش مصنوعی', 'جشن فارغ‌التحصیلی', 'مسابقات فوتبال', 'تریبون آزاد', 
          'شب شعر دانشجویی', 'نمایشگاه کتاب', 'بازارچه خیریه', 'کارگاه رزومه‌نویسی', 'سمینار نانو'
      ];
      const organizers = ['انجمن علمی', 'کانون فیلم', 'بسیج دانشجویی', 'اداره تربیت بدنی', 'شورای صنفی'];

      for (let i = 0; i < 50; i++) {
          const day = Math.floor(Math.random() * 30) + 1;
          const month = 'دی';
          generated.push({
              id: i,
              title: titles[i % titles.length] + (i > 9 ? ` ${i}` : ''),
              organizer: organizers[i % organizers.length],
              type: types[i % types.length],
              time: `${10 + (i % 8)}:00 - ${12 + (i % 8)}:00`,
              location: locations[i % locations.length],
              icon: [Video, BookOpen, User, Mic, Music, Bell][i % 6],
              date: `${day} ${month}`,
              description: 'توضیحات تکمیلی درباره رویداد و نحوه ثبت‌نام در این بخش قرار می‌گیرد.'
          });
      }
      return generated;
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative pb-10">
      {/* Header & Controls */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className={`${theme.secondary} p-4 rounded-2xl`}>
            <Calendar className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100">برنامه و تقویم</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">مدیریت زمان، کلاس‌ها و رویدادها</p>
          </div>
        </div>
        
        {/* Controls: Tabs + View + Color */}
        <div className="flex flex-col items-end gap-3 w-full md:w-auto">
            {/* Top Row: View & Color */}
            {(activeTab === 'classes' || activeTab === 'events') && (
                <div className="flex gap-2">
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                        <button onClick={() => setViewMode('cards')} className={`p-2 rounded-lg ${viewMode === 'cards' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-400 dark:text-slate-500'}`} title="نمای کارتی"><Layout className="w-4 h-4"/></button>
                        <button onClick={() => setViewMode('timeline')} className={`p-2 rounded-lg ${viewMode === 'timeline' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-400 dark:text-slate-500'}`} title="نمای لیست"><List className="w-4 h-4"/></button>
                        {activeTab === 'classes' && (
                            <button onClick={() => setViewMode('matrix')} className={`p-2 rounded-lg ${viewMode === 'matrix' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-400 dark:text-slate-500'}`} title="نمای ماتریس"><Grid className="w-4 h-4"/></button>
                        )}
                        {activeTab === 'events' && (
                            <button onClick={() => setViewMode('matrix')} className={`p-2 rounded-lg ${viewMode === 'matrix' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-400 dark:text-slate-500'}`} title="نمای فشرده"><AlignJustify className="w-4 h-4"/></button>
                        )}
                    </div>
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                        {(Object.keys(scheduleColors) as ScheduleColor[]).map(c => (
                            <button 
                                key={c}
                                onClick={() => setColorTheme(c)}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${colorTheme === c ? 'bg-white dark:bg-slate-700 shadow-sm scale-110' : ''}`}
                            >
                                <div className={`w-4 h-4 rounded-full ${scheduleColors[c].primary}`}></div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Bottom Row: Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full">
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex-1 md:flex-none">
                    <button 
                        onClick={() => setActiveTab('classes')}
                        className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'classes' ? `bg-white dark:bg-slate-700 ${theme.text} shadow-sm` : 'text-slate-500 dark:text-slate-400'}`}
                    >
                        کلاس‌ها
                    </button>
                    <button 
                        onClick={() => setActiveTab('events')}
                        className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'events' ? `bg-white dark:bg-slate-700 ${theme.text} shadow-sm` : 'text-slate-500 dark:text-slate-400'}`}
                    >
                        رویدادها
                    </button>
                    <button 
                        onClick={() => setActiveTab('reminders')}
                        className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === 'reminders' ? `bg-white dark:bg-slate-700 ${theme.text} shadow-sm` : 'text-slate-500 dark:text-slate-400'}`}
                    >
                        <Bell className="w-4 h-4" />
                        <span className="hidden md:inline">یادآوری‌ها</span>
                    </button>
                </div>
                {activeTab === 'classes' && (
                    <button 
                        onClick={handleDownloadPDF}
                        disabled={isDownloading}
                        className={`${theme.primary} text-white p-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50`}
                        title="دانلود برنامه PDF"
                    >
                        {isDownloading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Download className="w-5 h-5" />}
                    </button>
                )}
            </div>
        </div>
      </div>

      {activeTab === 'classes' && (
          <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span className="text-sm font-bold text-slate-500 dark:text-slate-400 mr-2">مدیریت برنامه:</span>
              <div className="flex gap-2">
                  <button 
                    onClick={() => setIsEditMode(!isEditMode)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors ${isEditMode ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
                  >
                      <Edit3 className="w-4 h-4" />
                      {isEditMode ? 'پایان ویرایش' : 'ویرایش و غیبت‌ها'}
                  </button>
                  <button 
                    onClick={() => setShowAddClassModal(true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition-colors ${theme.primary} hover:opacity-90`}
                  >
                      <Plus className="w-4 h-4" />
                      افزودن کلاس
                  </button>
              </div>
          </div>
      )}

      {activeTab === 'reminders' ? (
        <div className="grid md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4">
           {/* Add Reminder Form */}
           <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 h-fit">
              <h3 className={`font-bold text-lg text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2 ${theme.text}`}>
                 <Plus className="w-5 h-5" />
                 افزودن یادآوری جدید
              </h3>
              <div className="space-y-4">
                 <div>
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 block">عنوان</label>
                    <input 
                      type="text" 
                      value={newReminder.title}
                      onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                      placeholder="مثلاً: رزرو غذا فراموش نشه!"
                      className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:border-slate-400 dark:focus:border-slate-600 outline-none text-slate-900 dark:text-slate-200"
                    />
                 </div>
                 <div className="flex gap-4">
                    <div className="flex-1">
                       <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 block">زمان</label>
                       <input 
                         type="time" 
                         value={newReminder.time}
                         onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                         className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:border-slate-400 dark:focus:border-slate-600 outline-none text-slate-900 dark:text-slate-200"
                       />
                    </div>
                    <div className="flex-1">
                       <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 block">دسته‌بندی</label>
                       <select 
                         value={newReminder.type}
                         onChange={(e) => setNewReminder({...newReminder, type: e.target.value})}
                         className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:border-slate-400 dark:focus:border-slate-600 outline-none text-slate-900 dark:text-slate-200"
                       >
                          <option value="STUDY">مطالعه و درس</option>
                          <option value="FOOD">تغذیه و سلف</option>
                       </select>
                    </div>
                 </div>
                 <button 
                    onClick={handleAddReminder}
                    className={`w-full py-3 ${theme.primary} text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg`}
                 >
                    ثبت یادآوری
                 </button>
              </div>
           </div>

           {/* Reminders List */}
           <div className="space-y-4">
              {reminders.map((reminder) => (
                 <div 
                    key={reminder.id} 
                    className={`p-4 rounded-2xl border transition-all flex items-center gap-4 ${
                       reminder.active 
                       ? (reminder.type === 'FOOD' ? 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-900/30' : 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900/30') 
                       : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-70'
                    }`}
                 >
                    <div className={`p-3 rounded-xl ${reminder.type === 'FOOD' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
                       {reminder.type === 'FOOD' ? <Utensils className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
                    </div>
                    <div className="flex-1">
                       <div className="flex items-center gap-2 mb-1">
                          <h4 className={`font-bold ${reminder.active ? 'text-slate-800 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400 line-through'}`}>{reminder.title}</h4>
                          <span className="text-[10px] px-2 py-0.5 bg-white/50 dark:bg-black/20 rounded-lg text-slate-500 dark:text-slate-400 font-bold">{reminder.day}</span>
                       </div>
                       <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
                          <Clock className="w-3 h-3" />
                          {reminder.time}
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <button onClick={() => handleToggleReminder(reminder.id)} className={`p-2 rounded-full transition-colors ${reminder.active ? `${theme.text} hover:bg-white dark:hover:bg-slate-700` : 'text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                          <CheckCircle2 className="w-5 h-5" />
                       </button>
                       <button onClick={() => handleDeleteReminder(reminder.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors">
                          <Trash2 className="w-5 h-5" />
                       </button>
                    </div>
                 </div>
              ))}
              {reminders.length === 0 && (
                 <div className="text-center py-10 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                    <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>هیچ یادآوری فعالی ندارید.</p>
                 </div>
              )}
           </div>
        </div>
      ) : (
        <div id="schedule-content" className="p-4 md:p-8 bg-white dark:bg-slate-900 rounded-[2rem] relative overflow-hidden" style={activeTab === 'classes' ? { minHeight: '210mm', width: '100%', margin: '0 auto', maxWidth: '100%' } : {}}>
           {/* Decorative Background Elements (Only for Classes PDF View) */}
           {activeTab === 'classes' && (
             <>
               <div className={`absolute top-0 right-0 w-64 h-64 ${theme.bg} rounded-bl-full opacity-50 pointer-events-none`}></div>
               <div className={`absolute bottom-0 left-0 w-48 h-48 ${theme.bg} rounded-tr-full opacity-50 pointer-events-none`}></div>
               
               {/* Official Letterhead */}
               <div className="flex justify-between items-center border-b-2 border-slate-800 dark:border-slate-600 pb-4 mb-6 relative z-10 flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center">
                          <GraduationCap className="w-7 h-7" />
                      </div>
                      <div>
                          <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">دانشگاه صنعتی شریف</h2>
                          <p className="text-sm text-slate-500 dark:text-slate-400 font-bold mt-1">سامانه یکپارچه UniPlus</p>
                      </div>
                  </div>
                  <div className="text-left">
                      <div className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">برنامه هفتگی / Timetable</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">تاریخ صدور: ۱۴۰۲/۱۰/۰۵</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">ترم: ۴۰۲۱</div>
                  </div>
               </div>
             </>
           )}

           {activeTab === 'classes' ? (
              <div className="relative z-10 w-full">
                  {/* === MATRIX VIEW === */}
                  {viewMode === 'matrix' && (
                      <div className="animate-in fade-in overflow-x-auto pb-4">
                        <div className="min-w-[800px]">
                            <div className="grid grid-cols-[100px_1fr_1fr_1fr_1fr_1fr_1fr] gap-2 mb-2">
                                <div className="bg-slate-800 text-white rounded-lg flex items-center justify-center p-2 font-bold text-sm">
                                    روز / ساعت
                                </div>
                                {timeSlots.map(time => (
                                    <div key={time} className={`${theme.primary} text-white rounded-lg flex items-center justify-center p-2 font-bold text-sm`}>
                                    {time} - {parseInt(time.split(':')[0]) + 2}:00
                                    </div>
                                ))}
                            </div>

                            {days.map(day => (
                                <div key={day} className="grid grid-cols-[100px_1fr_1fr_1fr_1fr_1fr_1fr] gap-2 mb-2">
                                    <div className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg flex items-center justify-center p-2 font-bold text-sm border border-slate-200 dark:border-slate-700">
                                    {day}
                                    </div>
                                    {timeSlots.map(time => {
                                    const currentClass = classes.find(c => c.day === day && c.startTime.startsWith(time.split(':')[0]));
                                    return (
                                        <div key={time} className={`rounded-lg p-2 flex flex-col justify-center items-center text-center min-h-[80px] border ${currentClass ? `${theme.bg} ${theme.border}` : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700'}`}>
                                            {currentClass ? (
                                                <>
                                                <span className="font-bold text-sm text-slate-800 dark:text-slate-100 line-clamp-2 leading-tight">{currentClass.title}</span>
                                                <span className={`text-[10px] ${theme.text} mt-1`}>{currentClass.location}</span>
                                                <span className="text-[10px] text-slate-500 dark:text-slate-400">{currentClass.prof}</span>
                                                <span className={`text-[9px] px-1.5 py-0.5 rounded mt-1 font-bold ${currentClass.absences > 0 ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'}`}>غیبت: {currentClass.absences}</span>
                                                </>
                                            ) : (
                                                <span className="text-slate-200 dark:text-slate-700 text-xs">-</span>
                                            )}
                                        </div>
                                    );
                                    })}
                                </div>
                            ))}
                        </div>
                      </div>
                  )}

                  {/* === TIMELINE VIEW === */}
                  {viewMode === 'timeline' && (
                      <div className="space-y-6 animate-in fade-in max-w-4xl mx-auto">
                          {days.map(day => {
                              const dayClasses = classes.filter(c => c.day === day).sort((a,b) => a.startTime.localeCompare(b.startTime));
                              if (dayClasses.length === 0) return null;
                              return (
                                  <div key={day} className="flex gap-4">
                                      <div className="w-24 shrink-0 pt-2 font-bold text-slate-700 dark:text-slate-300">{day}</div>
                                      <div className="flex-1 space-y-3 border-r-2 border-slate-200 dark:border-slate-800 pr-4 pb-6 relative">
                                          {dayClasses.map(cls => (
                                              <div key={cls.id} className={`p-4 rounded-2xl ${theme.bg} border ${theme.border} relative`}>
                                                  <div className={`absolute top-4 -right-[21px] w-3 h-3 rounded-full ${theme.primary} ring-4 ring-white dark:ring-slate-900`}></div>
                                                  <div className="flex justify-between items-start flex-wrap gap-2">
                                                      <div>
                                                          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg">{cls.title}</h4>
                                                          <p className="text-slate-500 dark:text-slate-400 text-sm">{cls.prof}</p>
                                                      </div>
                                                      <div className="text-left w-full md:w-auto flex flex-col items-end gap-1">
                                                          <span className={`block font-mono font-bold ${theme.text}`}>{cls.startTime} - {cls.endTime}</span>
                                                          <span className="text-xs text-slate-400 dark:text-slate-500">{cls.location}</span>
                                                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${cls.absences > 0 ? 'bg-red-200 dark:bg-red-900/30 text-red-700 dark:text-red-400' : 'bg-green-200 dark:bg-green-900/30 text-green-700 dark:text-green-400'}`}>
                                                              {cls.absences} غیبت
                                                          </span>
                                                      </div>
                                                  </div>
                                              </div>
                                          ))}
                                      </div>
                                  </div>
                              )
                          })}
                      </div>
                  )}

                  {/* === CARDS VIEW === */}
                  {viewMode === 'cards' && (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">
                          {days.map(day => {
                              const dayClasses = classes.filter(c => c.day === day);
                              if (dayClasses.length === 0) return null;
                              return (
                                  <div key={day} className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-4 border border-slate-200 dark:border-slate-700">
                                      <h3 className={`font-black text-center mb-4 pb-2 border-b-2 ${theme.border} ${theme.text}`}>{day}</h3>
                                      <div className="space-y-3">
                                          {dayClasses.map(cls => (
                                              <div key={cls.id} className="bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-sm relative group">
                                                  {isEditMode && (
                                                      <button 
                                                        onClick={() => handleDeleteClass(cls.id)}
                                                        className="absolute -top-2 -left-2 bg-red-500 text-white p-1 rounded-full shadow-md z-10 hover:bg-red-600 transition-colors"
                                                      >
                                                          <Trash2 className="w-3 h-3" />
                                                      </button>
                                                  )}
                                                  
                                                  <div className="flex justify-between items-center mb-2">
                                                      <span className={`text-xs font-bold text-white ${theme.primary} px-2 py-1 rounded-lg`}>{cls.startTime}</span>
                                                      <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border ${cls.absences > 0 ? 'bg-red-50 border-red-200 text-red-600' : 'bg-green-50 border-green-200 text-green-600'}`}>غیبت: {cls.absences}</span>
                                                  </div>
                                                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-1">{cls.title}</h4>
                                                  <p className="text-xs text-slate-500 dark:text-slate-400">{cls.prof} | {cls.location}</p>
                                                  
                                                  {isEditMode && (
                                                      <div className="flex justify-end gap-2 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                                                          <button onClick={() => handleAbsenceChange(cls.id, -1)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"><MinusCircle className="w-3 h-3 text-slate-400"/></button>
                                                          <button onClick={() => handleAbsenceChange(cls.id, 1)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"><PlusCircle className="w-3 h-3 text-slate-400"/></button>
                                                      </div>
                                                  )}
                                              </div>
                                          ))}
                                      </div>
                                  </div>
                              )
                          })}
                      </div>
                  )}
              </div>
           ) : (
              // Events View inside PDF/Print container
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">
                  {events.map(event => (
                      <div key={event.id} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-3xl border border-slate-200 dark:border-slate-700 flex gap-4">
                          <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl h-fit shadow-sm text-pink-500">
                              <event.icon className="w-6 h-6" />
                          </div>
                          <div>
                              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 block mb-1">{event.date} • {event.time}</span>
                              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">{event.title}</h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400">{event.location}</p>
                              <span className="text-[10px] bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 mt-2 inline-block">{event.organizer}</span>
                          </div>
                      </div>
                  ))}
              </div>
           )}
        </div>
      )}

      {/* Add Class Modal */}
      {showAddClassModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-lg p-8 relative shadow-2xl animate-in zoom-in-95">
                  <button onClick={() => setShowAddClassModal(false)} className="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                      <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  </button>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">افزودن کلاس جدید</h3>
                  <div className="space-y-4">
                      <input 
                        type="text" 
                        placeholder="نام درس" 
                        value={newClass.title}
                        onChange={(e) => setNewClass({...newClass, title: e.target.value})}
                        className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-slate-200"
                      />
                      <input 
                        type="text" 
                        placeholder="نام استاد" 
                        value={newClass.prof}
                        onChange={(e) => setNewClass({...newClass, prof: e.target.value})}
                        className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-slate-200"
                      />
                      <div className="grid grid-cols-2 gap-4">
                          <select 
                            value={newClass.day}
                            onChange={(e) => setNewClass({...newClass, day: e.target.value})}
                            className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-slate-200"
                          >
                              {days.map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                          <input 
                            type="text" 
                            placeholder="مکان (کلاس)" 
                            value={newClass.location}
                            onChange={(e) => setNewClass({...newClass, location: e.target.value})}
                            className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-slate-200"
                          />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <input 
                            type="time" 
                            value={newClass.startTime}
                            onChange={(e) => setNewClass({...newClass, startTime: e.target.value})}
                            className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-slate-200"
                          />
                          <input 
                            type="time" 
                            value={newClass.endTime}
                            onChange={(e) => setNewClass({...newClass, endTime: e.target.value})}
                            className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-slate-200"
                          />
                      </div>
                      <button 
                        onClick={handleAddClass}
                        className={`w-full py-4 ${theme.primary} text-white rounded-2xl font-bold hover:opacity-90 transition-all`}
                      >
                          افزودن به برنامه
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default DailySchedule;
