
import React, { useState } from 'react';
import { 
  Users, 
  Activity, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  ShieldAlert,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Megaphone,
  Send,
  Search,
  Filter,
  DollarSign,
  Edit3,
  Trash2,
  Save,
  Bell,
  Ban,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'content' | 'broadcast' | 'users' | 'settings'>('dashboard');

  // --- MOCK DATA ---
  const stats = [
    { title: 'کاربران آنلاین', value: '342', change: '+12%', icon: Activity, color: 'text-emerald-600 bg-emerald-100' },
    { title: 'کل دانشجویان', value: '4,850', change: '+5%', icon: Users, color: 'text-blue-600 bg-blue-100' },
    { title: 'تیکت‌های باز', value: '18', change: '-2%', icon: MessageSquare, color: 'text-amber-600 bg-amber-100' },
    { title: 'درآمد ماهانه', value: '8.5M', change: '+20%', icon: DollarSign, color: 'text-purple-600 bg-purple-100' },
  ];

  const chartData = [
    { name: 'شنبه', users: 4000, visits: 2400 },
    { name: 'یکشنبه', users: 3000, visits: 1398 },
    { name: 'دوشنبه', users: 2000, visits: 9800 },
    { name: 'سه‌شنبه', users: 2780, visits: 3908 },
    { name: 'چهارشنبه', users: 1890, visits: 4800 },
    { name: 'پنجشنبه', users: 2390, visits: 3800 },
    { name: 'جمعه', users: 3490, visits: 4300 },
  ];

  const pendingContent = [
      { id: 1, type: 'AD', title: 'فروش لپ‌تاپ ایسوس', user: 'علی محمدی', time: '10 دقیقه پیش', status: 'Pending', content: 'لپ تاپ در حد نو، رم 16، قیمت توافقی.' },
      { id: 2, type: 'MSG', title: 'پیام ناشناس', user: 'ناشناس', time: '1 ساعت پیش', status: 'Pending', content: 'کیفیت غذای سلف امروز افتضاح بود! لطفا رسیدگی کنید.' },
      { id: 3, type: 'AD', title: 'کتاب کنکور ارشد', user: 'سارا رضایی', time: '2 ساعت پیش', status: 'Pending', content: 'مجموعه کتاب‌های مدرسان شریف، کاملا تمیز.' },
  ];

  const [users, setUsers] = useState([
      { id: 1, name: 'آرمان دانش', sid: '98123456', major: 'کامپیوتر', tier: 'VIP', status: 'Active' },
      { id: 2, name: 'زهرا حسینی', sid: '99112233', major: 'برق', tier: 'Student', status: 'Active' },
      { id: 3, name: 'کاربر مهمان', sid: '-', major: '-', tier: 'Guest', status: 'Active' },
      { id: 4, name: 'رضا کاظمی', sid: '97445566', major: 'مکانیک', tier: 'Student', status: 'Banned' },
  ]);

  const [prices, setPrices] = useState({
      lunch: '15,000',
      dinner: '12,000',
      bus: '3,000',
      pool: '30,000'
  });

  const [broadcast, setBroadcast] = useState({ target: 'All', title: '', message: '' });

  // --- ACTIONS ---
  const handleContentAction = (id: number, action: 'Approve' | 'Reject') => {
      // In real app, API call here
      alert(`${action} item #${id}`);
  };

  const handleBroadcastSend = () => {
      if(!broadcast.title || !broadcast.message) return;
      alert(`پیام "${broadcast.title}" برای ${broadcast.target} ارسال شد.`);
      setBroadcast({ target: 'All', title: '', message: '' });
  };

  const toggleUserBan = (id: number) => {
      setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Banned' : 'Active' } : u));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-screen">
      
      {/* Sidebar Navigation */}
      <div className="w-full lg:w-64 flex flex-col gap-2 shrink-0">
          {[
              { id: 'dashboard', label: 'داشبورد و آمار', icon: BarChart3 },
              { id: 'content', label: 'مدیریت محتوا', icon: ShieldAlert, badge: 3 },
              { id: 'broadcast', label: 'ارسال همگانی', icon: Megaphone },
              { id: 'users', label: 'مدیریت کاربران', icon: Users },
              { id: 'settings', label: 'نرخ‌نامه و تنظیمات', icon: Settings },
          ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center justify-between p-4 rounded-2xl font-bold transition-all ${
                    activeTab === tab.id 
                    ? 'bg-slate-800 text-white shadow-lg' 
                    : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-100'
                }`}
              >
                  <div className="flex items-center gap-3">
                      <tab.icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                  </div>
                  {tab.badge && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{tab.badge}</span>}
              </button>
          ))}
          
          <div className="mt-auto bg-gradient-to-br from-indigo-600 to-purple-600 p-6 rounded-3xl text-white shadow-lg">
              <h4 className="font-black text-lg mb-2">نسخه ۳.۰.۱</h4>
              <p className="text-xs opacity-80 mb-4">آخرین بروزرسانی: دیروز</p>
              <button className="w-full py-2 bg-white/20 rounded-xl text-sm font-bold hover:bg-white/30 transition-colors">مشاهده لاگ تغییرات</button>
          </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 space-y-6">
          
          {/* 1. DASHBOARD */}
          {activeTab === 'dashboard' && (
              <div className="space-y-6 animate-in fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-2xl ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                            {stat.change}
                        </span>
                        </div>
                        <h4 className="text-slate-500 text-sm mb-1">{stat.title}</h4>
                        <span className="text-3xl font-black text-slate-800">{stat.value}</span>
                    </div>
                    ))}
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
                          <h3 className="font-bold text-lg text-slate-800 mb-6">روند بازدید هفتگی</h3>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                                <Area type="monotone" dataKey="visits" stroke="#8884d8" fillOpacity={1} fill="url(#colorVisits)" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                          </div>
                      </div>
                      
                      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
                          <h3 className="font-bold text-lg text-slate-800 mb-6">ترافیک بر اساس بخش‌ها</h3>
                          <div className="space-y-4">
                              {[
                                  { label: 'دیوار دانشجویی', val: 75, color: 'bg-orange-500' },
                                  { label: 'رزرو غذا', val: 60, color: 'bg-emerald-500' },
                                  { label: 'چت هوشمند', val: 45, color: 'bg-blue-500' },
                                  { label: 'گیم سنتر', val: 30, color: 'bg-pink-500' },
                              ].map((item, i) => (
                                  <div key={i}>
                                      <div className="flex justify-between text-sm mb-2 font-bold text-slate-600">
                                          <span>{item.label}</span>
                                          <span>{item.val}%</span>
                                      </div>
                                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                          <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.val}%` }}></div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
              </div>
          )}

          {/* 2. CONTENT MODERATION */}
          {activeTab === 'content' && (
              <div className="space-y-4 animate-in fade-in">
                  <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-center gap-3 text-amber-800 text-sm">
                      <ShieldAlert className="w-5 h-5" />
                      <span>توجه: ۳ مورد محتوای جدید منتظر تایید شما هستند.</span>
                  </div>

                  {pendingContent.map((item) => (
                      <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 items-start">
                          <div className={`p-4 rounded-2xl shrink-0 ${item.type === 'AD' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                              {item.type === 'AD' ? <ShoppingBag className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
                          </div>
                          <div className="flex-1">
                              <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-bold text-lg text-slate-800">{item.title}</h4>
                                  <span className="text-xs text-slate-400 font-mono">{item.time}</span>
                              </div>
                              <p className="text-slate-600 text-sm mb-4 bg-slate-50 p-3 rounded-xl">{item.content}</p>
                              <div className="flex items-center gap-2 text-xs text-slate-400">
                                  <Users className="w-3 h-3" />
                                  <span>فرستنده: {item.user}</span>
                              </div>
                          </div>
                          <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                              <button onClick={() => handleContentAction(item.id, 'Approve')} className="flex-1 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl font-bold hover:bg-emerald-200 transition-colors flex items-center justify-center gap-2">
                                  <CheckCircle2 className="w-4 h-4" /> تایید
                              </button>
                              <button onClick={() => handleContentAction(item.id, 'Reject')} className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-xl font-bold hover:bg-red-200 transition-colors flex items-center justify-center gap-2">
                                  <XCircle className="w-4 h-4" /> رد کردن
                              </button>
                          </div>
                      </div>
                  ))}
              </div>
          )}

          {/* 3. BROADCAST */}
          {activeTab === 'broadcast' && (
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 animate-in fade-in h-full">
                  <h3 className="font-bold text-xl text-slate-800 mb-6 flex items-center gap-2">
                      <Megaphone className="w-6 h-6 text-indigo-600" />
                      ارسال پیام همگانی
                  </h3>
                  
                  <div className="space-y-6 max-w-2xl">
                      <div>
                          <label className="block text-sm font-bold text-slate-500 mb-2">مخاطبین هدف</label>
                          <select 
                            value={broadcast.target}
                            onChange={(e) => setBroadcast({...broadcast, target: e.target.value})}
                            className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none text-slate-900 focus:ring-2 focus:ring-indigo-500"
                          >
                              <option value="All">همه کاربران</option>
                              <option value="Students">فقط دانشجویان تایید شده (سطح ۲)</option>
                              <option value="Guests">کاربران مهمان</option>
                              <option value="Computer">دانشجویان کامپیوتر</option>
                          </select>
                      </div>

                      <div>
                          <label className="block text-sm font-bold text-slate-500 mb-2">عنوان پیام</label>
                          <input 
                            type="text" 
                            value={broadcast.title}
                            onChange={(e) => setBroadcast({...broadcast, title: e.target.value})}
                            placeholder="مثلاً: اطلاعیه مهم تعطیلی"
                            className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none text-slate-900 focus:ring-2 focus:ring-indigo-500"
                          />
                      </div>

                      <div>
                          <label className="block text-sm font-bold text-slate-500 mb-2">متن پیام</label>
                          <textarea 
                            rows={6}
                            value={broadcast.message}
                            onChange={(e) => setBroadcast({...broadcast, message: e.target.value})}
                            placeholder="متن پیام خود را اینجا بنویسید..."
                            className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none text-slate-900 focus:ring-2 focus:ring-indigo-500 resize-none"
                          ></textarea>
                      </div>

                      <div className="flex gap-4">
                          <button className="flex-1 py-4 border-2 border-dashed border-slate-300 text-slate-500 rounded-2xl font-bold hover:border-indigo-500 hover:text-indigo-500 transition-colors">
                              + افزودن فایل / تصویر
                          </button>
                          <button 
                            onClick={handleBroadcastSend}
                            className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
                          >
                              <Send className="w-5 h-5" />
                              ارسال پیام
                          </button>
                      </div>
                  </div>
              </div>
          )}

          {/* 4. USERS MANAGEMENT */}
          {activeTab === 'users' && (
              <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 animate-in fade-in h-full flex flex-col">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                      <h3 className="font-bold text-xl text-slate-800">مدیریت کاربران</h3>
                      <div className="relative w-full md:w-64">
                          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="text" placeholder="جستجو (نام، شماره دانشجویی)..." className="w-full pr-10 pl-4 py-3 bg-slate-50 rounded-xl outline-none text-sm text-slate-900" />
                      </div>
                  </div>

                  <div className="overflow-x-auto">
                      <table className="w-full text-right border-collapse">
                          <thead>
                              <tr className="text-slate-400 text-xs border-b border-slate-100">
                                  <th className="pb-3 pr-4">نام کاربر</th>
                                  <th className="pb-3">شماره دانشجویی</th>
                                  <th className="pb-3">رشته</th>
                                  <th className="pb-3">سطح دسترسی</th>
                                  <th className="pb-3">وضعیت</th>
                                  <th className="pb-3 pl-4 text-left">عملیات</th>
                              </tr>
                          </thead>
                          <tbody className="text-sm text-slate-700">
                              {users.map((user) => (
                                  <tr key={user.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                                      <td className="py-4 pr-4 font-bold">{user.name}</td>
                                      <td className="py-4 font-mono">{user.sid}</td>
                                      <td className="py-4">{user.major}</td>
                                      <td className="py-4">
                                          <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                                              user.tier === 'VIP' ? 'bg-purple-100 text-purple-700' :
                                              user.tier === 'Student' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                                          }`}>
                                              {user.tier}
                                          </span>
                                      </td>
                                      <td className="py-4">
                                          <span className={`flex items-center gap-1 text-xs font-bold ${user.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                                              <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                              {user.status === 'Active' ? 'فعال' : 'مسدود'}
                                          </span>
                                      </td>
                                      <td className="py-4 pl-4 text-left">
                                          <button 
                                            onClick={() => toggleUserBan(user.id)}
                                            className={`p-2 rounded-lg transition-colors ${user.status === 'Active' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`} 
                                            title={user.status === 'Active' ? 'مسدود کردن' : 'رفع مسدودی'}
                                          >
                                              {user.status === 'Active' ? <Ban className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                                          </button>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </div>
          )}

          {/* 5. SETTINGS (PRICING) */}
          {activeTab === 'settings' && (
              <div className="grid md:grid-cols-2 gap-8 animate-in fade-in">
                  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                      <h3 className="font-bold text-xl text-slate-800 mb-6 flex items-center gap-2">
                          <DollarSign className="w-6 h-6 text-emerald-600" />
                          نرخ‌نامه خدمات رفاهی
                      </h3>
                      <div className="space-y-4">
                          {[
                              { key: 'lunch', label: 'قیمت ناهار دانشجویی' },
                              { key: 'dinner', label: 'قیمت شام دانشجویی' },
                              { key: 'bus', label: 'کرایه اتوبوس دانشگاه' },
                              { key: 'pool', label: 'بلیط استخر' },
                          ].map((item) => (
                              <div key={item.key} className="flex items-center gap-4">
                                  <label className="w-1/3 text-sm font-bold text-slate-600">{item.label}</label>
                                  <div className="flex-1 relative">
                                      <input 
                                        type="text" 
                                        value={(prices as any)[item.key]}
                                        onChange={(e) => setPrices({...prices, [item.key]: e.target.value})}
                                        className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-emerald-500 text-left dir-ltr pl-10 text-slate-900 font-bold"
                                      />
                                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">ریال</span>
                                  </div>
                              </div>
                          ))}
                          <button className="w-full mt-4 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                              <Save className="w-4 h-4" />
                              ذخیره تغییرات
                          </button>
                      </div>
                  </div>

                  <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl flex flex-col justify-between">
                      <div>
                          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                              <Bell className="w-8 h-8 text-yellow-400" />
                          </div>
                          <h3 className="text-2xl font-bold mb-2">وضعیت سیستم</h3>
                          <p className="text-slate-400 text-sm leading-relaxed">
                              همه سرویس‌ها (گلستان، تغذیه، سرورها) در وضعیت پایدار هستند. آخرین بکاپ: امروز ساعت ۰۳:۰۰ بامداد.
                          </p>
                      </div>
                      <div className="mt-8 pt-8 border-t border-white/10">
                          <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-bold text-slate-400">فضای دیسک</span>
                              <span className="text-xs font-mono text-emerald-400">45% Free</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full w-[55%] bg-emerald-500 rounded-full"></div>
                          </div>
                      </div>
                  </div>
              </div>
          )}

      </div>
    </div>
  );
};

export default AdminPanel;
