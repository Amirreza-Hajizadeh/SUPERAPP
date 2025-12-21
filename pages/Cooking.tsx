
import React, { useState, useMemo } from 'react';
import { ChefHat, Utensils, Search, Clock, Flame, ShoppingBasket, ArrowLeft, Sparkles, Loader2, BookOpen, Filter } from 'lucide-react';
import { gemini } from '../services/geminiService';

interface Recipe {
  id: string;
  name: string;
  image?: string;
  time: string;
  difficulty: string;
  cost: string;
  ingredients?: string[];
  steps: string[];
  isAiGenerated?: boolean;
}

const Cooking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'learn' | 'generator'>('learn');
  const [inputIngredients, setInputIngredients] = useState('');
  const [aiRecipes, setAiRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  
  // Filters
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [filterCost, setFilterCost] = useState('All');

  // Generate 30 Recipes
  const staticRecipes: Recipe[] = useMemo(() => {
      const generated = [];
      const bases = ['املت', 'ماکارونی', 'سیب‌زمینی', 'کشک بادمجان', 'عدسی', 'لوبیا پلو', 'سالاد الویه', 'کوکو سبزی', 'سمبوسه', 'نودل'];
      const suffixes = ['دانشجویی', 'مخصوص', 'فوری', 'با پنیر', 'رژیمی', 'تند و آتشین'];
      
      for(let i=0; i<30; i++) {
          const base = bases[i % bases.length];
          const diff = i % 3 === 0 ? 'آسان' : i % 3 === 1 ? 'متوسط' : 'سخت';
          const cost = i % 2 === 0 ? 'Cheap' : 'Medium'; // Cheap = ارزان, Medium = متوسط
          
          generated.push({
              id: `${i}`,
              name: `${base} ${suffixes[i % suffixes.length]}`,
              image: `https://picsum.photos/seed/food${i}/400/300`,
              time: `${15 + (i % 4) * 10} دقیقه`,
              difficulty: diff,
              cost: cost,
              ingredients: ['ماده اولیه ۱', 'ماده اولیه ۲', 'ادویه مخصوص', 'روغن', 'نمک'],
              steps: [
                  'مواد را خرد کنید.',
                  'در تابه تفت دهید.',
                  'ادویه اضافه کنید.',
                  'صبر کنید تا بپزد و سرو کنید.'
              ]
          });
      }
      return generated;
  }, []);

  const filteredRecipes = staticRecipes.filter(r => {
      const matchDiff = filterDifficulty === 'All' || r.difficulty === filterDifficulty;
      const matchCost = filterCost === 'All' || r.cost === filterCost;
      return matchDiff && matchCost;
  });

  const handleGenerateRecipes = async () => {
    if (!inputIngredients.trim()) return;
    setIsLoading(true);
    setAiRecipes([]);
    
    const results = await gemini.suggestRecipes(inputIngredients);
    const formattedResults = results.map((r: any, index: number) => ({
      id: `ai-${index}`,
      name: r.name,
      time: r.time,
      difficulty: r.difficulty,
      cost: 'نامشخص',
      steps: r.steps,
      isAiGenerated: true,
      image: `https://picsum.photos/seed/${index + 100}/400/300`
    }));

    setAiRecipes(formattedResults);
    setIsLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
              <ChefHat className="w-10 h-10" />
              آشپزخانه دانشجویی
            </h1>
            <p className="opacity-90 text-lg">
              با کمترین امکانات، خوشمزه‌ترین غذاها رو بپز!
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl flex items-center gap-3 border border-white/20">
             <div className="p-2 bg-white rounded-full text-orange-600">
                <Utensils className="w-5 h-5" />
             </div>
             <div>
                <span className="block text-xs opacity-90">غذای پیشنهادی امروز</span>
                <span className="font-bold">کشک بادمجان فوری</span>
             </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200 pb-2">
        <button 
          onClick={() => {setActiveTab('learn'); setSelectedRecipe(null);}} 
          className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'learn' ? 'bg-orange-100 text-orange-700' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <BookOpen className="w-5 h-5" />
          آموزش آشپزی ({staticRecipes.length})
        </button>
        <button 
          onClick={() => {setActiveTab('generator'); setSelectedRecipe(null);}} 
          className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'generator' ? 'bg-orange-100 text-orange-700' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Sparkles className="w-5 h-5" />
          چی بپزم؟ (هوش مصنوعی)
        </button>
      </div>

      {/* Content */}
      {selectedRecipe ? (
        // Recipe Detail View
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden animate-in slide-in-from-right-8">
           <div className="relative h-64 md:h-80">
              <img src={selectedRecipe.image} alt={selectedRecipe.name} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-6 right-6 bg-white/90 backdrop-blur text-slate-800 p-3 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 pt-24 text-white">
                 <h2 className="text-3xl font-black mb-2">{selectedRecipe.name}</h2>
                 <div className="flex gap-4 text-sm font-medium">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-orange-400" /> {selectedRecipe.time}</span>
                    <span className="flex items-center gap-1"><Flame className="w-4 h-4 text-red-400" /> {selectedRecipe.difficulty}</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded text-xs">
                        هزینه: {selectedRecipe.cost === 'Cheap' ? 'ارزان' : 'متوسط'}
                    </span>
                 </div>
              </div>
           </div>
           
           <div className="p-8 grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1 bg-orange-50 p-6 rounded-3xl h-fit">
                 <h3 className="font-bold text-orange-800 mb-4 flex items-center gap-2">
                    <ShoppingBasket className="w-5 h-5" />
                    مواد لازم
                 </h3>
                 <ul className="space-y-3">
                    {selectedRecipe.ingredients ? selectedRecipe.ingredients.map((ing, i) => (
                       <li key={i} className="flex items-center gap-2 text-slate-700 text-sm">
                          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                          {ing}
                       </li>
                    )) : (
                       <li className="text-slate-500 text-sm italic">لیست مواد اولیه توسط هوش مصنوعی در متن ترکیب شده است.</li>
                    )}
                 </ul>
              </div>

              <div className="md:col-span-2">
                 <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-xl">
                    <Utensils className="w-6 h-6 text-orange-600" />
                    دستور پخت
                 </h3>
                 <div className="space-y-6 relative before:absolute before:right-[15px] before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-100">
                    {selectedRecipe.steps.map((step, i) => (
                       <div key={i} className="flex gap-6 relative">
                          <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm shrink-0 z-10 ring-4 ring-white">
                             {i + 1}
                          </div>
                          <p className="text-slate-600 leading-relaxed pt-1">
                             {step}
                          </p>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      ) : (
        <>
          {activeTab === 'learn' && (
             <div>
                 {/* Filters */}
                 <div className="flex gap-4 mb-6 bg-white p-3 rounded-2xl shadow-sm w-fit border border-slate-100">
                    <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
                        <Filter className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-bold text-slate-600">فیلترها:</span>
                    </div>
                    <select value={filterDifficulty} onChange={e => setFilterDifficulty(e.target.value)} className="bg-slate-50 rounded-xl px-3 py-1 text-sm outline-none">
                        <option value="All">همه سختی‌ها</option>
                        <option value="آسان">آسان</option>
                        <option value="متوسط">متوسط</option>
                        <option value="سخت">سخت</option>
                    </select>
                    <select value={filterCost} onChange={e => setFilterCost(e.target.value)} className="bg-slate-50 rounded-xl px-3 py-1 text-sm outline-none">
                        <option value="All">همه هزینه‌ها</option>
                        <option value="Cheap">ارزان</option>
                        <option value="Medium">متوسط</option>
                    </select>
                 </div>

                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRecipes.map((recipe) => (
                    <div 
                        key={recipe.id} 
                        onClick={() => setSelectedRecipe(recipe)}
                        className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
                    >
                        <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                            <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-lg text-xs font-bold text-slate-700">
                                {recipe.time}
                            </div>
                        </div>
                        <h3 className="font-bold text-lg text-slate-800 mb-1 px-2">{recipe.name}</h3>
                        <div className="px-2 flex justify-between items-center mt-3">
                            <span className={`text-xs px-2 py-1 rounded-lg ${recipe.difficulty === 'آسان' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                {recipe.difficulty}
                            </span>
                            <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
                                {recipe.cost === 'Cheap' ? 'ارزان' : 'متوسط'}
                            </span>
                        </div>
                    </div>
                    ))}
                 </div>
             </div>
          )}

          {activeTab === 'generator' && (
             <div className="max-w-4xl mx-auto space-y-8">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-slate-100 text-center relative overflow-hidden">
                   <div className="relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-orange-200 text-white">
                         <Sparkles className="w-8 h-8" />
                      </div>
                      <h2 className="text-2xl font-black text-slate-800 mb-4">سرآشپز هوشمند</h2>
                      <p className="text-slate-500 mb-8 max-w-lg mx-auto">
                         مواد اولیه‌ای که تو یخچال یا کمد داری رو بنویس (مثلاً: تخم مرغ، رب، سیب زمینی)، تا بهت بگم چی می‌تونی بپزی!
                      </p>
                      
                      <div className="flex max-w-xl mx-auto relative">
                         <input 
                            type="text" 
                            value={inputIngredients}
                            onChange={(e) => setInputIngredients(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleGenerateRecipes()}
                            placeholder="مواد اولیه رو اینجا بنویس..."
                            className="w-full pl-36 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-orange-500 focus:bg-white outline-none transition-all text-lg shadow-inner text-slate-900"
                         />
                         <button 
                            onClick={handleGenerateRecipes}
                            disabled={isLoading || !inputIngredients}
                            className="absolute left-2 top-2 bottom-2 bg-orange-600 text-white px-6 rounded-xl font-bold hover:bg-orange-700 transition-colors disabled:bg-slate-300 shadow-md"
                         >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'پیشنهاد بده'}
                         </button>
                      </div>
                   </div>
                </div>

                {/* Results */}
                {aiRecipes.length > 0 && (
                   <div className="space-y-6 animate-in slide-in-from-bottom-8">
                      <h3 className="text-xl font-bold text-slate-800 px-4">پیشنهادهای سرآشپز:</h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {aiRecipes.map((recipe) => (
                            <div 
                              key={recipe.id} 
                              onClick={() => setSelectedRecipe(recipe)}
                              className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden"
                            >
                               <div className="absolute top-0 left-0 w-2 h-full bg-orange-500"></div>
                               <h3 className="font-bold text-lg text-slate-800 mb-2">{recipe.name}</h3>
                               <div className="flex gap-3 text-xs text-slate-500 mb-4">
                                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {recipe.time}</span>
                                  <span className="flex items-center gap-1"><Flame className="w-3 h-3" /> {recipe.difficulty}</span>
                               </div>
                               <p className="text-sm text-slate-400 line-clamp-3">
                                  {recipe.steps.join(' ')}
                               </p>
                               <button className="mt-4 text-orange-600 text-sm font-bold hover:underline">مشاهده کامل</button>
                            </div>
                         ))}
                      </div>
                   </div>
                )}
             </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cooking;
