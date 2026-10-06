import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { parseJwt, GoogleUserData } from '../utils/jwt';
import { X, ShieldCheck, LogOut, CheckCircle2 } from 'lucide-react';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: GoogleUserData | null;
  onLoginSuccess: (userData: GoogleUserData) => void;
  onLogout: () => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onLoginSuccess,
  onLogout,
}) => {
  if (!isOpen) return null;

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const decoded = parseJwt(credentialResponse.credential);
      if (decoded) {
        onLoginSuccess(decoded);
      }
    }
  };

  const handleDemoLogin = () => {
    onLoginSuccess({
      sub: 'google-10928374198237498',
      name: 'กิตติมา ศรีสวัสดิ์ (Google Auth)',
      email: 'kittima.s@gmail.com',
      picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      email_verified: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {user ? (
          /* Profile & Logout */
          <div className="text-center py-2">
            <div className="relative inline-block mb-3">
              <img
                src={user.picture}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-sky-100 shadow-md mx-auto"
              />
              <span className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow-sm" title="Google Verified">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">{user.name}</h3>
            <p className="text-xs text-slate-500 mb-4">{user.email}</p>

            <div className="p-3.5 bg-sky-50 rounded-2xl border border-sky-100 text-left text-xs text-sky-950 mb-6 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">บัญชีได้รับการยืนยันด้วย Google</strong>
                สามารถทำสัญญา e-Contract และทำรายการมัดจำผ่านระบบ Escrow ได้ทันที
              </div>
            </div>

            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-2.5 px-4 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 transition flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>ออกจากระบบ (Sign out)</span>
            </button>
          </div>
        ) : (
          /* Login Dialog */
          <div className="text-center">
            {/* Google Logo */}
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4 border border-slate-200">
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-1">เข้าสู่ระบบด้วย Google</h3>
            <p className="text-xs text-slate-500 mb-6">
              เชื่อมต่อบัญชี Google ของคุณเพื่อยืนยันตัวตน และทำสัญญาเช่า/ซื้อคอนโด
            </p>

            {/* Official Google OAuth Login Button */}
            <div className="flex justify-center mb-4">
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => console.log('Google Login Failed')}
                useOneTap
                shape="pill"
              />
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-[11px] uppercase">
                <span className="bg-white px-2 text-slate-400 font-medium">หรือทดสอบด้วย Demo Mode</span>
              </div>
            </div>

            <button
              onClick={handleDemoLogin}
              className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 border border-slate-200"
            >
              <span>ทดสอบเข้าสู่ระบบแบบ Demo User</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
