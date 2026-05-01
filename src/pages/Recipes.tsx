import React from 'react';
import { BookOpen, Search, Filter, Plus, Clock, ShoppingCart, ArrowRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const recipes = [
  { 
    id: 1, 
    name: 'Trà Sữa Vibe Brew', 
    category: 'Trà sữa', 
    prepTime: '5 mins', 
    difficulty: 'Easy',
    ingredients: [
      { name: 'Hồng trà đặc biệt', amount: '150ml' },
      { name: 'Bột béo Premium', amount: '35g' },
      { name: 'Sữa đặc', amount: '40ml' },
      { name: 'Trân Châu Đen', amount: '50g' }
    ],
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 2, 
    name: 'Cà Phê Muối', 
    category: 'Cà phê', 
    prepTime: '8 mins', 
    difficulty: 'Medium',
    ingredients: [
      { name: 'Cốt cà phê phin', amount: '45ml' },
      { name: 'Kem muối base', amount: '40ml' },
      { name: 'Sữa đặc', amount: '20ml' },
      { name: 'Bột cacao trang trí', amount: '2g' }
    ],
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=800'
  }
];

const Recipes = () => {
  const [selectedRecipe, setSelectedRecipe] = React.useState(recipes[0]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-zinc-800">Công thức (Recipes)</h2>
          <p className="text-zinc-500">Tiêu chuẩn định lượng và pha chế định kỳ</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-full font-bold shadow-lg hover:opacity-90 active:scale-95 transition-all">
          <Plus size={20} />
          Tạo công thức mới
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Tìm món..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-100 rounded-2xl text-sm focus:ring-2 focus:ring-brand-teal/20 shadow-sm"
            />
          </div>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {recipes.map(recipe => (
              <button
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
                className={cn(
                  "w-full p-4 rounded-3xl transition-all flex items-center gap-3 text-left border",
                  selectedRecipe.id === recipe.id 
                    ? "bg-brand-teal text-white shadow-lg shadow-brand-teal/20 border-brand-teal" 
                    : "bg-white border-zinc-100 text-zinc-600 hover:border-brand-teal/30 shadow-sm"
                )}
              >
                <img src={recipe.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                <div>
                  <p className="font-bold text-sm leading-tight">{recipe.name}</p>
                  <p className={cn("text-[10px] uppercase font-black mt-0.5", selectedRecipe.id === recipe.id ? "text-white/70" : "text-brand-teal")}>
                    {recipe.category}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail */}
        <div className="lg:col-span-3">
          <div className="glass-card bg-white rounded-[40px] shadow-sm border border-zinc-100 overflow-hidden ambient-shadow h-full flex flex-col md:flex-row">
            <div className="md:w-2/5 relative">
              <img src={selectedRecipe.image} className="w-full h-full object-cover" alt={selectedRecipe.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div>
                  <span className="px-3 py-1 bg-brand-teal text-white text-[10px] font-black uppercase rounded-full">
                    {selectedRecipe.category}
                  </span>
                  <h3 className="text-2xl font-black text-white mt-2">{selectedRecipe.name}</h3>
                </div>
              </div>
            </div>

            <div className="md:w-3/5 p-8 space-y-8 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-50 rounded-3xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-brand-teal shadow-sm">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Thời gian</p>
                    <p className="font-bold text-zinc-700">{selectedRecipe.prepTime}</p>
                  </div>
                </div>
                <div className="p-4 bg-zinc-50 rounded-3xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-brand-teal shadow-sm">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Độ khó</p>
                    <p className="font-bold text-zinc-700">{selectedRecipe.difficulty}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                   <h4 className="font-bold text-zinc-800 flex items-center gap-2">
                    <ShoppingCart size={18} className="text-brand-teal" />
                    Thành phần định lượng
                  </h4>
                  <button className="text-[10px] font-bold text-brand-teal uppercase tracking-widest hover:underline flex items-center gap-1">
                    Check Kho <ExternalLink size={10} />
                  </button>
                </div>
                <div className="space-y-3">
                  {selectedRecipe.ingredients.map((ing, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-zinc-50/50 rounded-2xl border border-transparent hover:border-zinc-100 transition-all">
                      <span className="text-sm font-semibold text-zinc-600">{ing.name}</span>
                      <span className="px-3 py-1 bg-white rounded-xl text-xs font-black text-brand-teal shadow-sm">{ing.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button className="w-full py-4 bg-brand-teal text-white rounded-2xl font-bold shadow-lg shadow-teal-900/10 hover:brightness-110 flex items-center justify-center gap-2 transition-all">
                   Cập nhật quy trình pha chế
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
