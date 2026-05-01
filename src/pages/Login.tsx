import React, { useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { MOCK_USERS } from '../mockData';
import { Coffee, Shield, Store, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  useEffect(() => {
    if (user) {
      if (user.role === 'STAFF') {
        navigate('/pos');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream p-4">
      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-300">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-brand-green rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand-green/20 mb-6">
            <Coffee size={32} />
          </div>
          <h2 className="text-4xl font-extrabold text-[#38A668] tracking-tight">Vibe Brew</h2>
          <p className="mt-2 text-zinc-500 font-medium">Hệ thống Quản lý Vận hành</p>
        </div>

        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-zinc-100 ambient-shadow">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Email đăng nhập</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nhi.phuong@vibebrew.vn"
                className="w-full bg-zinc-50 border-none rounded-2xl py-4 px-5 focus:ring-2 focus:ring-brand-teal/20 transition-all font-medium"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Mật khẩu</label>
                <button type="button" className="text-[10px] font-bold text-brand-teal uppercase tracking-widest">Quên mật khẩu?</button>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-50 border-none rounded-2xl py-4 px-5 focus:ring-2 focus:ring-brand-teal/20 transition-all font-medium"
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-brand-green text-white rounded-2xl font-bold shadow-lg shadow-green-900/10 hover:brightness-110 active:scale-[0.98] transition-all"
            >
              Đăng nhập ngay
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-brand-cream px-4 text-zinc-400 font-bold tracking-widest">Demo Accounts</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {MOCK_USERS.map((u) => (
              <button
                key={u.id}
                onClick={() => login(u.email)}
                className="flex items-center gap-3 p-3 bg-white/50 backdrop-blur-sm rounded-2xl border border-zinc-200/50 hover:bg-white hover:border-brand-teal transition-all text-left active:scale-[0.98]"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-zinc-50 flex-shrink-0">
                  <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="font-bold text-zinc-700 text-sm truncate uppercase">{u.name}</p>
                  <p className="text-[10px] text-zinc-500 font-medium truncate">{u.role}</p>
                </div>
                <div className="text-zinc-300">
                   <UserIcon size={14} />
                </div>
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
          Vibe Brew OS • Version 1.0.0
        </p>
      </div>
    </div>
  );
};

export default Login;
