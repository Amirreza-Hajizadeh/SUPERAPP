
import React, { useState, useMemo } from 'react';
import { ShoppingBag, Search, Plus, Filter, Tag, X, MapPin, Phone, User, Calendar, ArrowUpDown, ArrowDownUp } from 'lucide-react';
import { MarketplaceItem } from '../types';

const Marketplace: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'priceLow' | 'priceHigh'>('newest');

  // Generate 100 Items
  const items: any[] = useMemo(() => {
      const generated = [];
      const categories = ['BOOK', 'EQUIPMENT', 'DORM', 'OTHER'];
      const titles = {
          BOOK: ['کتاب ریاضی ۱', 'حل المسائل فیزیک', 'جزوه استاتیک', 'کتاب معماری کامپیوتر', 'دیکشنری آکسفورد'],
          EQUIPMENT: ['لپ‌تاپ ایسوس', 'ماشین حساب مهندسی', 'هدفون سونی', 'موس بی‌سیم', 'هارد اکسترنال'],
          DORM: ['یخچال کوچک', 'پنکه رومیزی', 'کتری برقی', 'میز تحریر تاشو', 'فرش ۶ متری'],
          OTHER: ['دوچرخه', 'کفش ورزشی', 'گیتار کلاسیک', 'کیف کوله', 'راکت تنیس']
      };
      
      for(let i=0; i<100; i++) {
          const cat = categories[i % categories.length] as 'BOOK' | 'EQUIPMENT' | 'DORM' | 'OTHER';
          const title = titles[cat][i % titles[cat].length];
          
          generated.push({
              id: `${i}`,
              title: `${title} - در حد نو`,
              price: Math.floor(Math.random() * 500 + 50) * 10000,
              category: cat,
              image: `https://picsum.photos/seed/market${i}/300/200`,
              seller: `دانشجو ${i+1}`,
              dateDaysAgo: Math.floor(Math.random()*10),
              date: `${Math.floor(Math.random()*10)} روز پیش`,
              description: 'کاملاً سالم و تمیز. به دلیل فارغ‌التحصیلی می‌فروشم. تخفیف پای معامله.',
              location: 'خوابگاه شهید همت'
          });
      }
      return generated;
  }, []);

  const filteredItems = useMemo(() => {
      let result = items.filter(item => 
          (selectedCategory === 'All' || item.category === selectedCategory) &&
          item.title.includes(searchTerm)
      );

      if (sortBy === 'newest') {
          result.sort((a, b) => a.dateDaysAgo - b.dateDaysAgo);
      } else if (sortBy === 'priceLow') {
          result.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'priceHigh') {
          result.sort((a, b) => b.price - a.price);
      }

      return result;
  }, [items, selectedCategory, searchTerm, sortBy]);

  return (
    <div className="space-y-8 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">دیوار دانشجویی</h2>
          <p className="text-slate-500">خرید و فروش بی‌واسطه ({items.length} آگهی فعال)</p>
        </div>
        <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-2xl hover:bg-emerald-700 transition-all shadow-lg active:scale-95"
        >
          <Plus className="w-5 h-5" />
          <span>ثبت آگهی جدید</span>
        </button>
      </div>

      {/* Filters & Sort */}
      <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100 sticky top-4 z-20">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجو در آگهی‌ها..."
            className="w-full pr-10 pl-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900"
          />
        </div>
        
        <div className="flex items-center gap-2">
            <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-600 outline-none"
            >
                <option value="newest">جدیدترین</option>
                <option value="priceLow">ارزان‌ترین</option>
                <option value="priceHigh">گران‌ترین</option>
            </select>
        </div>

        <div className="w-full md:w-auto h-px md:h-8 bg-slate-200"></div>

        <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto">
            {['All', 'BOOK', 'EQUIPMENT', 'DORM', 'OTHER'].map((cat, i) => (
                <button 
                    key={i} 
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap ${selectedCategory === cat ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'} transition-colors`}
                >
                    {cat === 'All' ? 'همه' : cat === 'BOOK' ? 'کتاب' : cat === 'EQUIPMENT' ? 'تجهیزات' : cat === 'DORM' ? 'خوابگاه' : 'متفرقه'}
                </button>
            ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} onClick={() => setSelectedItem(item)} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 group cursor-pointer">
            <div className="relative h-48 overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-700 shadow-sm">
                {item.category === 'BOOK' ? 'کتاب' : 'وسیله'}
              </div>
            </div>
            <div className="p-5 space-y-3">
              <h3 className="font-bold text-slate-800 line-clamp-1 group-hover:text-emerald-600 transition-colors">{item.title}</h3>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Tag className="w-3 h-3" />
                <span>{item.seller}</span>
                <span className="mx-1">•</span>
                <span>{item.date}</span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-emerald-600 font-bold">{item.price.toLocaleString()} ریال</span>
                <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-emerald-600 hover:bg-emerald-50 transition-colors">
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white rounded-[2.5rem] w-full max-w-3xl overflow-hidden relative shadow-2xl animate-in zoom-in-95 flex flex-col md:flex-row">
                  <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 p-2 bg-white/50 backdrop-blur rounded-full hover:bg-white z-10">
                      <X className="w-5 h-5 text-slate-800" />
                  </button>
                  <div className="md:w-1/2 h-64 md:h-auto">
                      <img src={selectedItem.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="md:w-1/2 p-8 flex flex-col">
                      <h2 className="text-2xl font-black text-slate-800 mb-2">{selectedItem.title}</h2>
                      <div className="flex flex-wrap gap-2 mb-6">
                          <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-bold">{selectedItem.category}</span>
                          <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">{selectedItem.date}</span>
                      </div>
                      
                      <div className="space-y-4 mb-8">
                          <div className="flex items-center gap-3 text-slate-600">
                              <User className="w-5 h-5 text-slate-400" />
                              <span className="font-bold">{selectedItem.seller}</span>
                          </div>
                          <div className="flex items-center gap-3 text-slate-600">
                              <MapPin className="w-5 h-5 text-slate-400" />
                              <span>{selectedItem.location}</span>
                          </div>
                          <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl">
                              {selectedItem.description}
                          </p>
                      </div>

                      <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xl font-black text-emerald-600">{selectedItem.price.toLocaleString()} ریال</span>
                          <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800">
                              <Phone className="w-4 h-4" />
                              تماس
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Add Item Modal */}
      {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white rounded-[2rem] w-full max-w-lg p-8 relative shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-slate-800">ثبت آگهی جدید</h3>
                      <button onClick={() => setShowAddModal(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200">
                          <X className="w-5 h-5 text-slate-500" />
                      </button>
                  </div>
                  <div className="space-y-4">
                      <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">عنوان آگهی</label>
                          <input type="text" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-xs font-bold text-slate-500 mb-1">دسته بندی</label>
                              <select className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none">
                                  <option>کتاب و جزوه</option>
                                  <option>لوازم الکترونیکی</option>
                                  <option>وسایل خوابگاه</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-xs font-bold text-slate-500 mb-1">قیمت (تومان)</label>
                              <input type="number" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none" />
                          </div>
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">توضیحات</label>
                          <textarea rows={4} className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none"></textarea>
                      </div>
                      <div className="p-4 border-2 border-dashed border-slate-300 rounded-xl text-center text-slate-400 cursor-pointer hover:bg-slate-50">
                          افزودن تصویر کالا
                      </div>
                      <button className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700">ثبت آگهی</button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default Marketplace;
