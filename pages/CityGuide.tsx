
import React, { useState, useMemo } from 'react';
import { Building2, Utensils, Gamepad2, Home, MapPin, Instagram, PlusCircle, Tag, Star, Filter, GraduationCap, Phone, Car, Cloud, Wind, Thermometer, AlertTriangle, Navigation, Sun } from 'lucide-react';
import { CityPlace } from '../types';

const CityGuide: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'FOOD' | 'HOUSING' | 'FUN' | 'UNI' | 'TRANS' | 'WEATHER'>('ALL');
  const [filterCost, setFilterCost] = useState('All');
  const [filterRating, setFilterRating] = useState('All');

  // Generate Places
  const places = useMemo(() => {
      const generated = [];
      const cats = ['FOOD', 'HOUSING', 'FUN'];
      const prefixes = { FOOD: ['کافه', 'رستوران'], HOUSING: ['خوابگاه'], FUN: ['گیم‌نت'] };
      for (let i = 0; i < 30; i++) {
          const cat = cats[i % 3] as any;
          generated.push({
              id: `${i}`,
              title: `${prefixes[cat][0]} نمونه ${i}`,
              category: cat,
              description: 'توضیحات کوتاه...',
              priceRange: 'متوسط', costLevel: 'Medium', rating: 4.5, location: 'خیابان اصلی', image: `https://picsum.photos/seed/pl${i}/300/200`
          });
      }
      return generated;
  }, []);

  const faculties = [
      { id: 101, title: 'دانشکده فنی و مهندسی', loc: 'پردیس مرکزی، بلوک A', phone: '021-88881111', map: 'https://picsum.photos/seed/eng/300/200' },
      { id: 102, title: 'دانشکده علوم پایه', loc: 'پردیس مرکزی، بلوک B', phone: '021-88882222', map: 'https://picsum.photos/seed/sci/300/200' },
      { id: 103, title: 'ساختمان مرکزی (آموزش کل)', loc: 'ضلع شمالی', phone: '021-88883333', map: 'https://picsum.photos/seed/admin/300/200' },
  ];

  const transport = [
      { id: 201, title: 'آژانس دانشگاه', phone: '021-88000000', price: 'تعرفه مصوب', note: 'مستقر در درب شمالی' },
      { id: 202, title: 'ایستگاه اتوبوس تندرو', phone: '-', price: '۳,۰۰۰ تومان', note: 'خط ۴ - ایستگاه دانشگاه' },
      { id: 203, title: 'تاکسی‌های خطی میدان', phone: '-', price: '۱۵,۰۰۰ تومان', note: 'به سمت مترو' },
  ];

  // --- NEW DATA: Weather & Roads ---
  const weatherData = {
      temp: 42,
      condition: 'Sunny', // Sunny, Dust, Rain
      aqi: 155, // Unhealthy
      wind: 15,
      dustWarning: true,
      closureProbability: '۶۰٪'
  };

  const roadStatus = [
      { id: 1, route: 'بهبهان - اهواز', status: 'Open', desc: 'ترافیک روان', time: '۲:۳۰ ساعت' },
      { id: 2, route: 'بهبهان - شیراز', status: 'Caution', desc: 'گرد و خاک شدید در محدوده گچساران', time: '۳:۴۵ ساعت' },
      { id: 3, route: 'بهبهان - دیلم', status: 'Closed', desc: 'مسدود به دلیل تعمیرات جاده‌ای', time: '-' },
  ];

  const filteredPlaces = places.filter(p => {
      if (activeCategory === 'UNI' || activeCategory === 'TRANS' || activeCategory === 'WEATHER') return false; 
      const matchCat = activeCategory === 'ALL' || p.category === activeCategory;
      return matchCat;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
             <Building2 className="w-8 h-8 text-orange-500" />
             راهنمای جامع شهر و دانشگاه
           </h2>
           <p className="text-slate-500 mt-1">اطلاعات کامل شهر، دانشگاه، حمل‌ونقل و هواشناسی</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar flex-1">
            {[
                { id: 'ALL', label: 'همه', icon: Building2 },
                { id: 'UNI', label: 'دانشگاه', icon: GraduationCap },
                { id: 'TRANS', label: 'حمل‌ونقل', icon: Car },
                { id: 'WEATHER', label: 'هوا و جاده', icon: Cloud },
                { id: 'HOUSING', label: 'مسکن', icon: Home },
                { id: 'FOOD', label: 'شکم‌گردی', icon: Utensils },
                { id: 'FUN', label: 'تفریح', icon: Gamepad2 },
            ].map((cat) => (
                <button 
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold whitespace-nowrap text-sm transition-all ${
                        activeCategory === cat.id 
                        ? 'bg-orange-500 text-white shadow-md' 
                        : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                >
                    <cat.icon className="w-4 h-4" />
                    {cat.label}
                </button>
            ))}
          </div>
      </div>

      {/* --- CONTENT AREA --- */}
      {activeCategory === 'UNI' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">
              {faculties.map(fac => (
                  <div key={fac.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group">
                      <div className="relative h-48">
                          <img src={fac.map} alt={fac.title} className="w-full h-full object-cover"/>
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-xl backdrop-blur-sm">مشاهده روی نقشه</span>
                          </div>
                      </div>
                      <div className="p-6">
                          <h3 className="font-bold text-lg text-slate-800 mb-2">{fac.title}</h3>
                          <p className="text-sm text-slate-500 mb-4 flex items-center gap-2"><MapPin className="w-4 h-4"/> {fac.loc}</p>
                          <button className="w-full py-2 bg-slate-50 text-slate-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-100">
                              <Phone className="w-4 h-4"/> {fac.phone}
                          </button>
                      </div>
                  </div>
              ))}
          </div>
      ) : activeCategory === 'TRANS' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">
              {transport.map(trans => (
                  <div key={trans.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                      <div className="flex items-center gap-4 mb-4">
                          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                              <Car className="w-6 h-6"/>
                          </div>
                          <h3 className="font-bold text-lg text-slate-800">{trans.title}</h3>
                      </div>
                      <div className="space-y-2 text-sm text-slate-600 mb-4">
                          <div className="flex justify-between"><span>نرخ:</span> <span className="font-bold">{trans.price}</span></div>
                          <div className="flex justify-between"><span>توضیحات:</span> <span>{trans.note}</span></div>
                      </div>
                      <button className="w-full py-2 border border-blue-200 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-50">
                          {trans.phone !== '-' ? `تماس: ${trans.phone}` : 'مشاهده مسیر'}
                      </button>
                  </div>
              ))}
          </div>
      ) : activeCategory === 'WEATHER' ? (
          <div className="grid lg:grid-cols-2 gap-8 animate-in fade-in">
              {/* Weather Widget */}
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  
                  <div className="relative z-10">
                      <div className="flex justify-between items-start mb-8">
                          <div>
                              <h3 className="text-2xl font-black mb-1">هوای بهبهان</h3>
                              <p className="opacity-90 text-sm">هم‌اکنون</p>
                          </div>
                          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                              <Sun className="w-8 h-8 text-yellow-100" />
                          </div>
                      </div>

                      <div className="flex items-end gap-2 mb-8">
                          <span className="text-7xl font-black tracking-tighter">{weatherData.temp}°</span>
                          <span className="text-xl mb-4 opacity-80">C</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md border border-white/10">
                              <div className="flex items-center gap-2 mb-2 opacity-80 text-sm">
                                  <Wind className="w-4 h-4" />
                                  سرعت باد
                              </div>
                              <span className="text-xl font-bold">{weatherData.wind} km/h</span>
                          </div>
                          <div className={`rounded-2xl p-4 backdrop-blur-md border border-white/10 ${weatherData.aqi > 150 ? 'bg-red-500/30' : 'bg-white/10'}`}>
                              <div className="flex items-center gap-2 mb-2 opacity-80 text-sm">
                                  <Cloud className="w-4 h-4" />
                                  شاخص آلودگی
                              </div>
                              <span className="text-xl font-bold">{weatherData.aqi} (AQI)</span>
                          </div>
                      </div>

                      {weatherData.dustWarning && (
                          <div className="mt-6 bg-red-600/20 border border-red-200/30 rounded-2xl p-4 flex items-center gap-3">
                              <AlertTriangle className="w-6 h-6 text-red-100 animate-pulse" />
                              <div>
                                  <h4 className="font-bold text-red-50">هشدار گرد و خاک</h4>
                                  <p className="text-xs text-red-100 mt-1">احتمال تعطیلی: {weatherData.closureProbability}</p>
                              </div>
                          </div>
                      )}
                  </div>
              </div>

              {/* Road Status */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <Navigation className="w-6 h-6 text-slate-600" />
                      وضعیت راه‌های استان
                  </h3>
                  
                  <div className="space-y-4">
                      {roadStatus.map(road => (
                          <div key={road.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group hover:bg-slate-100 transition-colors">
                              <div>
                                  <div className="flex items-center gap-3 mb-1">
                                      <h4 className="font-bold text-slate-800">{road.route}</h4>
                                      <span className={`text-[10px] px-2 py-0.5 rounded-lg font-bold ${
                                          road.status === 'Open' ? 'bg-emerald-100 text-emerald-700' :
                                          road.status === 'Caution' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                      }`}>
                                          {road.status === 'Open' ? 'باز' : road.status === 'Caution' ? 'احتیاط' : 'مسدود'}
                                      </span>
                                  </div>
                                  <p className="text-xs text-slate-500">{road.desc}</p>
                              </div>
                              <div className="text-left">
                                  <span className="block text-xs font-bold text-slate-400 mb-1">زمان سفر</span>
                                  <span className="font-mono text-slate-800 font-bold">{road.time}</span>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => (
                <div key={place.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
                    <div className="relative h-48">
                        <img src={place.image} alt={place.title} className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <span className="text-white text-xs font-bold flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {place.location}
                            </span>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg text-slate-800">{place.title}</h3>
                            <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                <span className="text-xs font-bold text-amber-600">{place.rating}</span>
                            </div>
                        </div>
                        <p className="text-sm text-slate-500 mb-4 line-clamp-2">{place.description}</p>
                    </div>
                </div>
            ))}
          </div>
      )}
    </div>
  );
};

export default CityGuide;
