
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Bot, 
  ShoppingBag, 
  Users, 
  Settings, 
  Bell, 
  Search,
  LogOut,
  Menu,
  X,
  Map,
  FlaskConical,
  Compass,
  Link as LinkIcon,
  Rocket,
  Building2,
  Globe,
  Library,
  CalendarCheck,
  Wrench,
  ChevronDown,
  ChevronLeft,
  GraduationCap,
  HeartHandshake,
  LayoutGrid,
  Coins,
  Sparkles,
  CalendarDays,
  Gamepad2,
  BrainCircuit,
  FileText,
  Archive,
  BookHeart,
  ChefHat,
  PenTool,
  Mic2,
  MonitorPlay,
  Pin,
  PinOff,
  NotebookPen,
  ListCheck,
  Moon,
  Sun
} from 'lucide-react';
import { UserProfile, UserTier } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: UserProfile;
  onLogout: () => void;
}

interface MenuItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

interface MenuGroup {
  id: string;
  title: string;
  icon: React.ElementType;
  items: MenuItem[];
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed on mobile
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['educational', 'welfare']); 
  const [pinnedPaths, setPinnedPaths] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Load pinned items
    const savedPins = localStorage.getItem('pinnedItems');
    if (savedPins) {
        setPinnedPaths(JSON.parse(savedPins));
    }

    // Load theme preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
    } else {
        setIsDarkMode(false);
        document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
      if (isDarkMode) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
          setIsDarkMode(false);
      } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
          setIsDarkMode(true);
      }
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId) 
        : [...prev, groupId]
    );
  };

  const togglePin = (e: React.MouseEvent, path: string) => {
      e.preventDefault();
      e.stopPropagation();
      let newPins;
      if (pinnedPaths.includes(path)) {
          newPins = pinnedPaths.filter(p => p !== path);
      } else {
          newPins = [...pinnedPaths, path];
      }
      setPinnedPaths(newPins);
      localStorage.setItem('pinnedItems', JSON.stringify(newPins));
      
      // Trigger a custom event so Dashboard can update immediately
      window.dispatchEvent(new Event('pinsUpdated'));
  };

  const menuStructure: MenuGroup[] = [
    {
      id: 'educational',
      title: 'آموزشی و پژوهشی',
      icon: GraduationCap,
      items: [
        { name: 'انتخاب واحد (شبیه‌ساز)', path: '/course-selection', icon: ListCheck },
        { name: 'برنامه هفتگی', path: '/schedule', icon: CalendarDays },
        { name: 'بانک اساتید', path: '/professors', icon: Users },
        { name: 'کتابخانه مرکزی', path: '/library', icon: Library },
        { name: 'نقشه راه تحصیلی', path: '/roadmap', icon: Map },
        { name: 'پژوهش و آزمایشگاه', path: '/research', icon: FlaskConical },
        { name: 'دستیار پایان‌نامه', path: '/thesis', icon: PenTool },
        { name: 'مطالعه هوشمند (AI)', path: '/smart-study', icon: MonitorPlay },
        { name: 'بانک سوالات', path: '/question-bank', icon: Archive },
        { name: 'جعبه لایتنر', path: '/study-tools', icon: BrainCircuit },
      ]
    },
    {
      id: 'welfare',
      title: 'رفاهی و زندگی',
      icon: HeartHandshake,
      items: [
        { name: 'رزرواسیون و تغذیه', path: '/booking', icon: CalendarCheck },
        { name: 'آشپزخانه دانشجویی', path: '/cooking', icon: ChefHat },
        { name: 'راهنمای ترم اولی', path: '/freshmen', icon: Compass },
        { name: 'مهارت‌های زندگی', path: '/soft-skills', icon: BookHeart },
        { name: 'راهنمای جامع شهر', path: '/city-guide', icon: Building2 },
        { name: 'جامعه و لینکدونی', path: '/community', icon: LinkIcon },
      ]
    },
    {
      id: 'services',
      title: 'خدمات و ابزارها',
      icon: LayoutGrid,
      items: [
        { name: 'پروفایل من', path: '/profile', icon: User },
        { name: 'دفترچه یادداشت', path: '/notebook', icon: NotebookPen },
        { name: 'میز خدمت (سامانه‌ها)', path: '/services', icon: Globe },
        { name: 'جعبه ابزار (PDF/GPA)', path: '/tools', icon: Wrench },
        { name: 'استودیو پادکست', path: '/podcast', icon: Mic2 },
      ]
    },
    {
      id: 'income',
      title: 'کار و درآمد',
      icon: Coins,
      items: [
        { name: 'دیوار دانشجویی', path: '/marketplace', icon: ShoppingBag },
        { name: 'فرصت‌های شغلی', path: '/innovation', icon: Rocket },
        { name: 'رزومه‌ساز (CV)', path: '/resume', icon: FileText },
      ]
    },
    {
      id: 'gamification',
      title: 'سرگرمی و بازی',
      icon: Gamepad2,
      items: [
        { name: 'گیم سنتر و کوییز', path: '/games', icon: Gamepad2 },
      ]
    },
    {
      id: 'ai',
      title: 'دستیار هوشمند',
      icon: Sparkles,
      items: [
        { name: 'چت با هوش مصنوعی', path: '/ai-consultant', icon: Bot },
      ]
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm transition-opacity" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 right-0 z-50 w-72 bg-white dark:bg-slate-900 border-l dark:border-slate-800 shadow-2xl transition-transform duration-300 transform lg:translate-x-0 lg:static lg:inset-0
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        print:hidden
      `}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b dark:border-slate-800">
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight font-display">UniPlus</span>
            <button className="lg:hidden p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" onClick={() => setIsSidebarOpen(false)}>
              <X className="w-6 h-6 text-slate-500 dark:text-slate-400" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
            <Link
              to="/"
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                location.pathname === '/' 
                  ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>داشبورد</span>
            </Link>

            <div className="border-t border-slate-100 dark:border-slate-800 my-2"></div>

            {menuStructure.map((group) => {
              const isOpen = expandedGroups.includes(group.id);
              const isActiveGroup = group.items.some(item => item.path === location.pathname);
              const GroupIcon = group.icon;

              return (
                <div key={group.id} className="mb-2">
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                      isActiveGroup && !isOpen 
                        ? 'bg-slate-50 dark:bg-slate-800/50 text-emerald-600 dark:text-emerald-400' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <GroupIcon className={`w-5 h-5 ${isActiveGroup ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`} />
                      <span className="font-bold text-sm">{group.title}</span>
                    </div>
                    {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronLeft className="w-4 h-4 text-slate-400" />}
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="pr-11 pl-2 space-y-1 pt-1 pb-2">
                      {group.items.map((item) => {
                        const ItemIcon = item.icon;
                        const isActive = location.pathname === item.path;
                        const isPinned = pinnedPaths.includes(item.path);

                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors group ${
                              isActive 
                                ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold' 
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                                <ItemIcon className="w-4 h-4" />
                                <span>{item.name}</span>
                            </div>
                            
                            {/* Pin Button */}
                            <button 
                                onClick={(e) => togglePin(e, item.path)}
                                className={`p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${isPinned ? 'text-emerald-500 dark:text-emerald-400 opacity-100' : 'text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100'}`}
                                title={isPinned ? "حذف از دسترسی سریع" : "افزودن به دسترسی سریع"}
                            >
                                {isPinned ? <Pin className="w-3 h-3 fill-current" /> : <Pin className="w-3 h-3" />}
                            </button>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <Link to="/profile" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 mb-4 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-xl transition-colors group">
              <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-700 shadow-sm group-hover:border-emerald-200 dark:group-hover:border-emerald-500 transition-colors" alt="Profile" />
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold truncate text-slate-800 dark:text-slate-200">{user.name}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{user.studentId}</span>
              </div>
            </Link>
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 w-full px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm font-bold"
            >
              <LogOut className="w-4 h-4" />
              <span>خروج از حساب</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden print:w-full print:h-full print:overflow-visible bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <header className="flex items-center justify-between px-4 md:px-8 py-3 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-sm z-10 print:hidden sticky top-0 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 -mr-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="جستجو در سامانه..."
                className="pr-10 pl-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl w-64 focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-slate-900 transition-all text-sm outline-none text-slate-900 dark:text-slate-200 placeholder:text-slate-400"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            {/* Theme Toggle */}
            <button 
                onClick={toggleTheme}
                className="p-2.5 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title={isDarkMode ? 'حالت روز' : 'حالت شب'}
            >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="hidden sm:flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-3 py-1.5 rounded-full text-xs font-bold border border-amber-100 dark:border-amber-800/30">
                <Sparkles className="w-3 h-3" />
                <span>سطح {user.level || 1}</span>
            </div>
            
            <div className="flex flex-col items-end mr-1 md:mr-2">
              <span className="text-[10px] text-slate-400 hidden sm:block">موجودی کیف پول</span>
              <span className="text-xs md:text-sm font-bold text-emerald-600 dark:text-emerald-400 dir-ltr font-display">{user.walletBalance.toLocaleString()} ریال</span>
            </div>

            <button className="relative p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors hidden sm:block">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>

            {/* Header Profile Avatar - Clickable */}
            <Link to="/profile" className="block relative group">
                <img 
                  src={user.avatar} 
                  alt="Profile" 
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-slate-100 dark:border-slate-700 shadow-sm group-hover:border-emerald-400 transition-colors object-cover" 
                />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
            </Link>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar print:p-0 print:overflow-visible scroll-smooth">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
