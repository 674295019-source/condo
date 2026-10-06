import React from 'react';
import { Building2, ShieldCheck, Bell, Sparkles, LogIn, LayoutDashboard } from 'lucide-react';
import { GoogleUserData } from '../utils/jwt';

interface NavbarProps {
  activeTab: 'RENT' | 'SALE';
  setActiveTab: (tab: 'RENT' | 'SALE') => void;
  myBookingCount: number;
  onOpenMyBookings: () => void;
  googleUser: GoogleUserData | null;
  onOpenAuth: () => void;
  isAdmin: boolean;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  myBookingCount,
  onOpenMyBookings,
  googleUser,
  onOpenAuth,
  isAdmin,
  onOpenAdmin,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-sky-700 via-sky-800 to-slate-900 bg-clip-text text-transparent">
                  CondoSmart
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-sky-600" /> Phase 1
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">ระบบเช่า/ซื้อคอนโด ปลอดภัยด้วยสัญญา e-Sign & Escrow</p>
            </div>
          </div>

          {/* Center: Rent vs Buy Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200">
            <button
              onClick={() => setActiveTab('RENT')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === 'RENT'
                  ? 'bg-white text-sky-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              เช่าคอนโด (Rent)
            </button>
            <button
              onClick={() => setActiveTab('SALE')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === 'SALE'
                  ? 'bg-white text-sky-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ซื้อคอนโด (Buy)
            </button>
          </div>

          {/* Right Action: Admin Access, Badges & My Transactions & Google Login */}
          <div className="flex items-center gap-2.5">
            {/* Admin Dashboard Entry Button */}
            <button
              onClick={onOpenAdmin}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition shadow-sm ${
                isAdmin
                  ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-amber-400 border border-slate-700 hover:border-amber-400/50'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
              title="ระบบหลังบ้านสำหรับผู้ดูแลระบบ"
            >
              <LayoutDashboard className="w-4 h-4 text-amber-400" />
              <span>{isAdmin ? 'ระบบหลังบ้าน (Admin Panel)' : 'เข้าหลังบ้าน (Admin)'}</span>
            </button>

            <button
              onClick={onOpenMyBookings}
              className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 border border-slate-200 transition hidden lg:flex"
              title="รายการธุรกรรมและสัญญาของฉัน"
            >
              <Bell className="w-4 h-4 text-slate-600" />
              <span>ธุรกรรมของฉัน</span>
              {myBookingCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-sky-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {myBookingCount}
                </span>
              )}
            </button>

            {/* Google Profile or Login Button */}
            <div className="flex items-center pl-2 border-l border-slate-200">
              {googleUser ? (
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 transition"
                  title="ดูโปรไฟล์และจัดการบัญชี"
                >
                  <img
                    src={googleUser.picture}
                    alt={googleUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-white"
                  />
                  <span className="text-xs font-semibold text-slate-800 max-w-[100px] truncate hidden sm:inline">
                    {googleUser.name.split(' ')[0]}
                  </span>
                </button>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>เข้าสู่ระบบ Google</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
