
import React, { useState, useMemo } from 'react';
import { Library as LibraryIcon, Search, BookOpen, Clock, Star, Brain, Map, X, Filter } from 'lucide-react';

const Library: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'recommendations'>('search');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState<any>(null);
  
  // Filters
  const [filterMajor, setFilterMajor] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [filterLang, setFilterLang] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Generate 70 Books
  const books = useMemo(() => {
      const generated = [];
      const topics = ['هوش مصنوعی', 'طراحی الگوریتم', 'شبکه', 'ادبیات کلاسیک', 'تاریخ ایران', 'فلسفه غرب', 'روانشناسی', 'اقتصاد خرد', 'فیزیک کوانتوم', 'شیمی آلی'];
      const majors = ['Computer', 'Literature', 'History', 'Philosophy', 'Psychology', 'Economy', 'Physics', 'Chemistry'];
      const authors = ['راسل', 'کلمن', 'تننباوم', 'حافظ', 'زرین‌کوب', 'نیچه', 'فروید', 'منکیو', 'هاوکینگ', 'موریسون'];
      const locations = ['طبقه ۱ - قفسه A', 'طبقه ۱ - قفسه B', 'طبقه ۲ - قفسه C', 'طبقه ۲ - مرجع', 'طبقه ۳ - پایان‌نامه‌ها'];

      for (let i = 0; i < 70; i++) {
          const topicIndex = i % topics.length;
          const topic = topics[topicIndex];
          const author = authors[i % authors.length];
          const isCourse = i % 3 !== 0; // 2/3 are course books
          const lang = i % 4 === 0 ? 'English' : 'Persian';
          
          generated.push({
              id: i,
              title: `${topic} ${Math.floor(i / 10) + 1}`,
              author: author,
              status: Math.random() > 0.3 ? 'Available' : 'Borrowed',
              loc: locations[i % locations.length],
              major: majors[topicIndex % majors.length],
              type: isCourse ? 'Course' : 'General',
              language: lang,
              returnDate: '۲ روز دیگر',
              summary: `این کتاب یکی از مراجع اصلی در زمینه ${topic} است که توسط ${author} نوشته شده است. مباحث کلیدی شامل مبانی نظری، مثال‌های کاربردی و تمرین‌های فصل به فصل می‌باشد. مناسب برای دانشجویان سال‌های بالاتر.`
          });
      }
      return generated;
  }, []);

  const suggestedBooks = [
    { id: 101, title: 'قلعه حیوانات', reason: 'بر اساس علاقه شما به ادبیات کلاسیک' },
    { id: 102, title: 'صفر به یک', reason: 'چون در بخش کارآفرینی فعالیت داشتید' },
    { id: 103, title: 'عادت‌های اتمی', reason: 'پرطرفدارترین کتاب هفته' },
    { id: 104, title: 'خودت را به فنا نده', reason: 'پیشنهاد مشاور' },
  ];

  const filteredBooks = books.filter(b => {
      const matchSearch = b.title.includes(searchTerm) || b.author.includes(searchTerm);
      const matchMajor = filterMajor === 'All' || b.major === filterMajor;
      const matchType = filterType === 'All' || b.type === filterType;
      const matchLang = filterLang === 'All' || b.language === filterLang;
      const matchStatus = filterStatus === 'All' || b.status === filterStatus;
      
      return matchSearch && matchMajor && matchType && matchLang && matchStatus;
  });

  return (
    <div className="space-y-8 animate-in fade-in relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-700 to-orange-800 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-black mb-4 flex items-center gap-3">
            <LibraryIcon className="w-8 h-8" />
            کتابخانه مرکزی و دیجیتال
          </h1>
          <p className="opacity-90 max-w-2xl text-lg">
            جستجو در منابع چاپی دانشگاه + دسترسی به هزاران مقاله و کتاب دیجیتال.
          </p>
        </div>
      </div>

      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button onClick={() => setActiveTab('search')} className={`px-4 py-2 font-bold transition-colors ${activeTab === 'search' ? 'text-amber-700 dark:text-amber-500 border-b-2 border-amber-700 dark:border-amber-500' : 'text-slate-500 dark:text-slate-400'}`}>جستجوی کتاب</button>
        <button onClick={() => setActiveTab('recommendations')} className={`px-4 py-2 font-bold transition-colors ${activeTab === 'recommendations' ? 'text-amber-700 dark:text-amber-500 border-b-2 border-amber-700 dark:border-amber-500' : 'text-slate-500 dark:text-slate-400'}`}>پیشنهاد هوشمند (AI)</button>
      </div>

      {activeTab === 'search' ? (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
             <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="نام کتاب، نویسنده یا موضوع..." 
                    className="w-full pr-10 pl-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-900 dark:text-slate-200" 
                />
             </div>
             
             {/* Filters */}
             <div className="flex gap-2 overflow-x-auto pb-1">
                <select value={filterMajor} onChange={e => setFilterMajor(e.target.value)} className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-700 dark:text-slate-300 outline-none">
                    <option value="All">همه رشته‌ها</option>
                    <option value="Computer">کامپیوتر</option>
                    <option value="Literature">ادبیات</option>
                    <option value="History">تاریخ</option>
                    <option value="Philosophy">فلسفه</option>
                </select>
                <select value={filterType} onChange={e => setFilterType(e.target.value)} className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-700 dark:text-slate-300 outline-none">
                    <option value="All">همه منابع</option>
                    <option value="Course">درسی</option>
                    <option value="General">غیر درسی</option>
                </select>
                <select value={filterLang} onChange={e => setFilterLang(e.target.value)} className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-700 dark:text-slate-300 outline-none">
                    <option value="All">همه زبان‌ها</option>
                    <option value="Persian">فارسی</option>
                    <option value="English">انگلیسی</option>
                </select>
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-700 dark:text-slate-300 outline-none">
                    <option value="All">همه وضعیت‌ها</option>
                    <option value="Available">موجود</option>
                    <option value="Borrowed">امانت رفته</option>
                </select>
             </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {filteredBooks.map(book => (
                <div 
                    key={book.id} 
                    onClick={() => setSelectedBook(book)}
                    className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between h-full hover:shadow-xl transition-all cursor-pointer group"
                >
                   <div>
                      <div className="flex justify-between items-start mb-2">
                         <div className="p-3 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-2xl mb-2 w-fit">
                            <BookOpen className="w-6 h-6" />
                         </div>
                         <div className="flex flex-col items-end gap-1">
                            <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${book.status === 'Available' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                                {book.status === 'Available' ? 'موجود' : 'امانت رفته'}
                            </span>
                            <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400">{book.language === 'English' ? 'EN' : 'FA'}</span>
                         </div>
                      </div>
                      <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 line-clamp-1">{book.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{book.author}</p>
                      <div className="flex gap-2 mt-2">
                          <span className="text-[10px] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-2 py-1 rounded text-slate-500 dark:text-slate-400">{book.type === 'Course' ? 'درسی' : 'عمومی'}</span>
                      </div>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 flex items-center gap-1">
                         <Map className="w-3 h-3" /> {book.loc}
                      </p>
                   </div>
                   {book.status === 'Available' ? (
                      <button className="mt-4 w-full py-2 bg-amber-600 text-white rounded-xl font-bold text-sm hover:bg-amber-700 transition-colors">مشاهده جزئیات</button>
                   ) : (
                      <div className="mt-4 flex items-center gap-2 text-xs text-red-500 bg-red-50 dark:bg-red-900/20 p-2 rounded-xl justify-center">
                         <Clock className="w-4 h-4" /> بازگشت: {book.returnDate}
                      </div>
                   )}
                </div>
             ))}
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
           <div className="md:col-span-2 bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-900/30 flex items-center gap-4">
              <Brain className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
              <div>
                 <h3 className="font-bold text-indigo-900 dark:text-indigo-200">موتور پیشنهاد دهنده هوشمند</h3>
                 <p className="text-sm text-indigo-700 dark:text-indigo-300">این لیست بر اساس رشته تحصیلی، جستجوهای قبلی و علاقه‌مندی‌های شما توسط هوش مصنوعی تولید شده است.</p>
              </div>
           </div>
           {suggestedBooks.map(book => (
              <div key={book.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                 <div className="flex justify-between">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100">{book.title}</h3>
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                 </div>
                 <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 bg-slate-50 dark:bg-slate-800 p-2 rounded-lg inline-block">
                    💡 {book.reason}
                 </p>
                 <div className="mt-4 flex gap-2">
                    <button className="flex-1 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-300">مشاهده خلاصه</button>
                    <button className="flex-1 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded-xl text-sm font-bold hover:bg-slate-900 dark:hover:bg-slate-600">افزودن به لیست</button>
                 </div>
              </div>
           ))}
        </div>
      )}

      {/* Book Detail Modal */}
      {selectedBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-lg p-8 relative shadow-2xl animate-in zoom-in-95">
                  <button onClick={() => setSelectedBook(null)} className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                      <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  </button>
                  <div className="flex flex-col items-center text-center mb-6">
                      <div className="w-24 h-32 bg-amber-100 dark:bg-amber-900/30 rounded-xl mb-4 flex items-center justify-center shadow-inner">
                          <BookOpen className="w-10 h-10 text-amber-600 dark:text-amber-400" />
                      </div>
                      <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">{selectedBook.title}</h2>
                      <p className="text-slate-500 dark:text-slate-400 font-bold mt-1">{selectedBook.author}</p>
                      <div className="flex gap-2 mt-2">
                          <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-600 dark:text-slate-300">{selectedBook.language}</span>
                          <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-600 dark:text-slate-300">{selectedBook.type}</span>
                      </div>
                  </div>
                  
                  <div className="space-y-4">
                      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                          <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm mb-2">خلاصه کتاب:</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed text-justify">{selectedBook.summary}</p>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1"><Map className="w-4 h-4"/> {selectedBook.loc}</span>
                          <span className={`px-3 py-1 rounded-full font-bold ${selectedBook.status === 'Available' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                              {selectedBook.status === 'Available' ? 'قابل رزرو' : 'غیرقابل رزرو'}
                          </span>
                      </div>
                      {selectedBook.status === 'Available' && (
                          <button className="w-full py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-colors shadow-lg shadow-amber-200 dark:shadow-none">
                              رزرو و تحویل حضوری
                          </button>
                      )}
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default Library;
