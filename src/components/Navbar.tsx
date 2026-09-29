import React from 'react';
import { Building2, ShieldCheck, UserCheck, Bell, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: 'RENT' | 'SALE';
  setActiveTab: (tab: 'RENT' | 'SALE') => void;
  myBookingCount: number;
  onOpenMyBookings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  myBookingCount,
  onOpenMyBookings,
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

          {/* Right Action: Badges & My Transactions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/60 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Escrow Protected</span>
            </div>

            <button
              onClick={onOpenMyBookings}
              className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 border border-slate-200 transition"
              title="รายการธุรกรรมและสัญญาของฉัน"
            >
              <Bell className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">ธุรกรรมของฉัน</span>
              {myBookingCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-sky-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {myBookingCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-semibold text-xs border border-slate-300">
                <UserCheck className="w-4 h-4 text-sky-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
