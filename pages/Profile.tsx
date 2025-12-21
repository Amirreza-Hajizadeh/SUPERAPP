
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  Wallet, 
  Award, 
  ShieldCheck, 
  History, 
  Download, 
  Share2, 
  User, 
  Plus, 
  X,
  Calendar,
  BookOpen,
  Utensils,
  Clock,
  Bookmark,
  Camera,
  Edit3,
  CreditCard,
  ChevronLeft,
  GraduationCap,
  Cpu,
  Wifi,
  QrCode,
  ScanBarcode,
  Rotate3d,
  Fingerprint
} from 'lucide-react';

const Profile: React.FC<{ user: UserProfile }> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'plan' | 'wallet' | 'saved'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  
  // Editable States
  const [bio, setBio] = useState(user.bio || '');
  const [skills, setSkills] = useState<string[]>(user.skills || []);
  const [newSkill, setNewSkill] = useState('');

  // Mock Data for "My Plan"
  const dailyPlan = [
      { id: 1, type: 'CLASS', title: 'هوش مصنوعی', time: '۰۸:۰۰ - ۱۰:۰۰', loc: 'کلاس ۳۰۲', status: 'Upcoming' },
      { id: 2, type: 'CLASS', title: 'مهندسی نرم‌افزار', time: '۱۰:۰۰ - ۱۲:۰۰', loc: 'کلاس ۴۰۵', status: 'Upcoming' },
      { id: 3, type: 'FOOD', title: 'ناهار (قرمه سبزی)', time: '۱۲:۰۰ - ۱۳:۳۰', loc: 'سلف مرکزی', status: 'Reserved' },
      { id: 4, type: 'LIB', title: 'بازگشت کتاب "طراحی الگوریتم"', time: 'تا ساعت ۱۶:۰۰', loc: 'کتابخانه مرکزی', status: 'Due Soon' },
  ];

  // Mock Data for Wallet
  const transactions = [
      { id: 1, title: 'شارژ کیف پول', amount: 500000, date: '۱۴۰۲/۱۰/۰۴', type: 'inc' },
      { id: 2, title: 'رزرو ناهار هفته', amount: -125000, date: '۱۴۰۲/۱۰/۰۳', type: 'dec' },
      { id: 3, title: 'خرید جزوه از دیوار', amount: -40000, date: '۱۴۰۲/۱۰/۰۱', type: 'dec' },
      { id: 4, title: 'جایزه کوییز', amount: 20000, date: '۱۴۰۲/۰۹/۲۸', type: 'inc' },
  ];

  // Mock Data for Bookmarks
  const bookmarks = [
      { id: 1, cat: 'Market', title: 'کتاب ریاضی ۱ (دست دوم)', date: '۲ روز پیش', image: 'https://picsum.photos/seed/book1/100' },
      { id: 2, cat: 'Notice', title: 'اطلاعیه حذف و اضافه ترم بهمن', date: 'دیروز', image: null },
      { id: 3, cat: 'Post', title: 'جزوه دست‌نویس معادلات', date: 'هفته پیش', image: 'https://picsum.photos/seed/note/100' },
  ];

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in pb-10">
      {/* Top Mobile Navigation / Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-2 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-slate-50 dark:bg-slate-950 z-10 pt-2">
          {[
              { id: 'overview', label: 'پروفایل من', icon: User },
              { id: 'plan', label: 'برنامه من', icon: Calendar },
              { id: 'wallet', label: 'کیف پول', icon: Wallet },
              { id: 'saved', label: 'ذخیره‌شده‌ها', icon: Bookmark },
          ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${
                    activeTab === tab.id 
                    ? 'bg-slate-800 dark:bg-slate-700 text-white shadow-md' 
                    : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                }`}
              >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
              </button>
          ))}
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* --- LEFT COLUMN: ID CARD (Always Visible or Sticky on Desktop) --- */}
        <div className="md:col-span-4 space-y-6">
          
          {/* 3D Flip Card Container */}
          <div className="perspective-1000 w-full aspect-[3/4.2] group">
            <div 
                className={`relative w-full h-full transition-all duration-700 transform-style-3d cursor-pointer ${isCardFlipped ? 'rotate-y-180' : ''}`}
                onClick={() => setIsCardFlipped(!isCardFlipped)}
            >
                {/* --- FRONT SIDE --- */}
                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 rounded-[2rem] p-6 text-white shadow-2xl overflow-hidden border border-white/10 flex flex-col items-center">
                    {/* Holographic/Texture Effect */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500 rounded-full blur-[60px] opacity-20"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>

                    {/* Top Header */}
                    <div className="w-full flex justify-between items-start mb-6 relative z-10">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-bold">UniPlus ID</span>
                            <span className="text-[8px] opacity-60">Smart Student Card</span>
                        </div>
                        <GraduationCap className="w-8 h-8 text-white/20" />
                    </div>

                    {/* Avatar Ring */}
                    <div className="relative mb-6 group/avatar">
                        <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 rounded-full animate-spin-slow opacity-70"></div>
                        <div className="absolute -inset-2 border border-white/10 rounded-full"></div>
                        <img src={user.avatar} className="relative w-32 h-32 rounded-full border-4 border-slate-900 object-cover shadow-2xl" alt="Student" />
                        {isEditing && (
                            <div className="absolute bottom-0 right-0 bg-emerald-500 p-1.5 rounded-full border-2 border-slate-900 text-white z-20">
                                <Camera className="w-3 h-3" />
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="relative z-10 text-center w-full">
                        <h3 className="text-2xl font-black mb-1 tracking-tight">{user.name}</h3>
                        <p className="text-emerald-400 font-mono text-lg tracking-widest mb-6 font-bold">{user.studentId}</p>

                        <div className="grid grid-cols-2 gap-2 text-right">
                            <div className="bg-white/5 p-3 rounded-xl border border-white/5 backdrop-blur-sm">
                                <span className="block text-[9px] text-slate-400 mb-1">رشته تحصیلی</span>
                                <span className="block text-xs font-bold truncate">{user.major}</span>
                            </div>
                            <div className="bg-white/5 p-3 rounded-xl border border-white/5 backdrop-blur-sm">
                                <span className="block text-[9px] text-slate-400 mb-1">سال ورود</span>
                                <span className="block text-xs font-bold font-mono">{user.entryYear}</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Tech Details */}
                    <div className="mt-auto w-full flex items-center justify-between relative z-10 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2">
                            <Cpu className="w-8 h-8 text-yellow-400 drop-shadow-lg" />
                            <Wifi className="w-5 h-5 text-white/30 rotate-90" />
                        </div>
                        <div className="text-right">
                            <span className="block text-[8px] text-slate-500 uppercase tracking-wider">Status</span>
                            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                                Active
                            </span>
                        </div>
                    </div>
                </div>

                {/* --- BACK SIDE --- */}
                <div 
                    className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 rounded-[2rem] p-6 text-white shadow-2xl overflow-hidden border border-white/10 flex flex-col"
                    style={{ transform: 'rotateY(180deg)' }}
                >
                    {/* Magnetic Strip Visual */}
                    <div className="absolute top-8 left-0 right-0 h-12 bg-black/60 border-y border-white/5"></div>

                    <div className="mt-24 space-y-6 relative z-10 flex flex-col items-center flex-1">
                        {/* QR Code */}
                        <div className="bg-white p-3 rounded-2xl shadow-xl">
                            <QrCode className="w-32 h-32 text-slate-900" />
                        </div>
                        <p className="text-[10px] text-slate-400 font-mono tracking-widest">{user.studentId}-SECURE-TOKEN</p>

                        {/* Barcode Visual */}
                        <div className="w-full px-4">
                            <div className="flex justify-between items-end h-8 gap-0.5 opacity-60">
                                {Array.from({length: 40}).map((_, i) => (
                                    <div key={i} className="bg-white w-full rounded-sm" style={{ height: `${Math.random() * 60 + 40}%` }}></div>
                                ))}
                            </div>
                            <div className="flex justify-between text-[8px] font-mono text-slate-500 mt-1 px-1">
                                <span>LIB-ACCESS</span>
                                <span>DORM-ENTRY</span>
                            </div>
                        </div>

                        {/* Footer Info */}
                        <div className="mt-auto w-full text-center space-y-1">
                            <p className="text-[9px] text-slate-500">این کارت متعلق به دانشگاه صنعتی شریف است.</p>
                            <p className="text-[9px] text-slate-500">یابنده تقاضا می‌شود آن را به صندوق پستی بیاندازد.</p>
                            <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-white/5">
                                <div className="text-center">
                                    <span className="block text-[8px] text-slate-600 uppercase">Valid Thru</span>
                                    <span className="text-xs font-mono font-bold">1404/06</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-[8px] text-slate-600 uppercase">Issue Date</span>
                                    <span className="text-xs font-mono font-bold">1398/07</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* Action Buttons Below Card */}
          <div className="flex gap-3">
             <button className="flex-1 py-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 active:scale-95">
                <Download className="w-4 h-4" /> ذخیره تصویر
             </button>
             <button 
                onClick={() => setIsCardFlipped(!isCardFlipped)}
                className="flex-1 py-3 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white rounded-xl transition-all shadow-lg shadow-slate-200 dark:shadow-slate-900 flex items-center justify-center gap-2 text-xs font-bold active:scale-95"
             >
                <Rotate3d className="w-4 h-4" /> چرخش کارت
             </button>
          </div>
        </div>

        {/* --- RIGHT COLUMN: TABS CONTENT --- */}
        <div className="md:col-span-8">
            
            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 relative">
                        <button 
                            onClick={() => setIsEditing(!isEditing)}
                            className={`absolute top-6 left-6 p-2 rounded-xl transition-colors ${isEditing ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                        >
                            {isEditing ? <Share2 className="w-5 h-5 rotate-180" /> : <Edit3 className="w-5 h-5" />} 
                            {/* Using Share icon as "Save/Return" visual for demo simplicity or checkmark */}
                        </button>

                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            درباره من
                        </h3>
                        
                        {isEditing ? (
                            <textarea 
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="w-full h-32 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500 text-sm leading-relaxed text-slate-700 dark:text-slate-300 resize-none"
                                placeholder="درباره خودتان بنویسید..."
                            />
                        ) : (
                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-7 text-justify bg-slate-50/50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100/50 dark:border-slate-700/50">
                                {bio || 'هنوز بیوگرافی ثبت نشده است. دکمه ویرایش را بزنید.'}
                            </p>
                        )}
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                            <Award className="w-5 h-5 text-amber-500" />
                            مهارت‌ها و علاقه‌مندی‌ها
                        </h3>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                            {skills.map((skill, i) => (
                                <span key={i} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium flex items-center gap-2 group">
                                    {skill}
                                    {isEditing && (
                                        <button onClick={() => setSkills(skills.filter(s => s !== skill))} className="text-slate-400 hover:text-red-500">
                                            <X className="w-3 h-3" />
                                        </button>
                                    )}
                                </span>
                            ))}
                        </div>

                        {isEditing && (
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                                    placeholder="مهارت جدید (مثلاً: فوتوشاپ)..."
                                    className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none text-slate-900 dark:text-white"
                                />
                                <button onClick={handleAddSkill} className="bg-amber-500 text-white p-2 rounded-xl hover:bg-amber-600">
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* TAB: MY PLAN */}
            {activeTab === 'plan' && (
                <div className="space-y-4">
                    <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 rounded-[2rem] text-white shadow-lg flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lg mb-1">برنامه امروز</h3>
                            <p className="text-indigo-100 text-sm">۴ دی ۱۴۰۲ • دوشنبه</p>
                        </div>
                        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                    </div>

                    <div className="space-y-4 relative before:absolute before:right-8 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                        {dailyPlan.map((item, i) => (
                            <div key={item.id} className="relative flex items-start gap-4">
                                <div className={`z-10 w-16 h-16 rounded-2xl flex flex-col items-center justify-center shrink-0 border-4 border-white dark:border-slate-900 shadow-sm ${
                                    item.type === 'CLASS' ? 'bg-blue-500 text-white' : 
                                    item.type === 'FOOD' ? 'bg-orange-500 text-white' : 'bg-emerald-500 text-white'
                                }`}>
                                    {item.type === 'CLASS' ? <GraduationCap className="w-6 h-6 mb-1"/> : 
                                     item.type === 'FOOD' ? <Utensils className="w-6 h-6 mb-1"/> : <BookOpen className="w-6 h-6 mb-1"/>}
                                </div>
                                
                                <div className="flex-1 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-slate-800 dark:text-slate-100">{item.title}</h4>
                                        <span className={`text-[10px] px-2 py-1 rounded-full ${
                                            item.status === 'Upcoming' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                                            item.status === 'Reserved' ? 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                                        }`}>
                                            {item.status === 'Upcoming' ? 'شروع نشده' : item.status === 'Reserved' ? 'رزرو شده' : 'مهلت کم'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {item.time}</span>
                                        <span className="flex items-center gap-1 font-bold"><Share2 className="w-3 h-3 rotate-90"/> {item.loc}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB: WALLET */}
            {activeTab === 'wallet' && (
                <div className="space-y-6">
                    <div className="bg-slate-900 dark:bg-black text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden border border-slate-800">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500 rounded-full blur-3xl opacity-20"></div>
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <span className="text-slate-400 text-sm mb-2 font-bold uppercase tracking-widest">موجودی حساب</span>
                            <div className="text-6xl font-display mb-2 dir-ltr tracking-tight">{user.walletBalance.toLocaleString()}</div>
                            <span className="text-sm text-slate-400 mb-8">ریال ایران</span>
                            
                            <div className="flex gap-4 w-full max-w-sm">
                                <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
                                    <Plus className="w-5 h-5" /> افزایش موجودی
                                </button>
                                <button className="flex-1 bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                                    <CreditCard className="w-5 h-5" /> انتقال وجه
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                            <History className="w-5 h-5 text-slate-400" />
                            تراکنش‌های اخیر
                        </h3>
                        <div className="space-y-4">
                            {transactions.map(tx => (
                                <div key={tx.id} className="flex justify-between items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-full ${tx.type === 'inc' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                                            {tx.type === 'inc' ? <Download className="w-4 h-4 rotate-180" /> : <Download className="w-4 h-4" />}
                                        </div>
                                        <div>
                                            <span className="block font-bold text-slate-700 dark:text-slate-200 text-sm">{tx.title}</span>
                                            <span className="block text-xs text-slate-400">{tx.date}</span>
                                        </div>
                                    </div>
                                    <span className={`font-bold dir-ltr ${tx.type === 'inc' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}`}>
                                        {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: BOOKMARKS */}
            {activeTab === 'saved' && (
                <div className="grid sm:grid-cols-2 gap-4">
                    {bookmarks.map(item => (
                        <div key={item.id} className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex gap-4 items-center group hover:shadow-md transition-all cursor-pointer">
                            {item.image ? (
                                <img src={item.image} className="w-16 h-16 rounded-2xl object-cover" alt={item.title} />
                            ) : (
                                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                    <Bookmark className="w-6 h-6" />
                                </div>
                            )}
                            <div className="flex-1 overflow-hidden">
                                <span className={`text-[10px] px-2 py-0.5 rounded-lg font-bold mb-1 inline-block ${
                                    item.cat === 'Market' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' : 
                                    item.cat === 'Notice' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                                }`}>
                                    {item.cat === 'Market' ? 'بازارچه' : item.cat === 'Notice' ? 'اطلاعیه' : 'پست'}
                                </span>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm truncate">{item.title}</h4>
                                <p className="text-xs text-slate-400 mt-1">{item.date}</p>
                            </div>
                            <button className="text-slate-300 hover:text-red-500 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                    <div className="bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                        <Bookmark className="w-8 h-8 mb-2 opacity-50" />
                        <span className="text-xs font-bold">آیتم‌های ذخیره شده اینجا نمایش داده می‌شوند</span>
                    </div>
                </div>
            )}

        </div>
      </div>
      
      {/* 3D Transform Styles */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Profile;
