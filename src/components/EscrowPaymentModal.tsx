import React, { useState, useEffect } from 'react';
import { CondoUnit, BookingState } from '../types/property';
import { X, QrCode, ShieldCheck, CheckCircle2, Lock, ArrowRight, Smartphone } from 'lucide-react';

interface EscrowPaymentModalProps {
  property: CondoUnit | null;
  booking: BookingState | null;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

export const EscrowPaymentModal: React.FC<EscrowPaymentModalProps> = ({
  property,
  booking,
  onClose,
  onPaymentSuccess,
}) => {
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(3599); // 60 mins demo
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!property || !booking) return null;

  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Timer Bar */}
        <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 border border-amber-200 px-4 py-1.5 rounded-full text-xs font-bold mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
          ห้องถูกล็อกไว้ให้คุณ: เหลือเวลา {formattedTime} นาที
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-1">ชำระเงินมัดจำเข้าบัญชี Escrow</h3>
        <p className="text-xs text-slate-500 mb-6">
          สแกนชำระผ่าน Mobile Banking ทุกธนาคาร (เงินจะถูกกักไว้ในระบบกลาง)
        </p>

        {/* QR Code Card */}
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/90 inline-block mb-4 shadow-inner">
          <div className="w-48 h-48 bg-white p-3 rounded-2xl shadow-sm border border-slate-200 mx-auto flex flex-col items-center justify-center relative">
            <QrCode className="w-36 h-36 text-slate-800" />
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <Lock className="w-24 h-24 text-sky-800" />
            </div>
            <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
              <Smartphone className="w-3 h-3" /> Thai QR Payment
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs text-slate-400">ยอดเงินมัดจำที่ต้องชำระ</p>
            <p className="text-2xl font-extrabold text-slate-900">
              ฿{property.depositAmount.toLocaleString()}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">Ref: ESCROW-{property.id}-2026</p>
          </div>
        </div>

        {/* Escrow Guarantee Message */}
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-left flex items-start gap-2.5 text-xs text-emerald-950 mb-6">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">คุ้มครอง 100% โดยระบบ Smart Escrow</span>
            เงินจะไม่ถูกส่งให้เจ้าของห้องจนกว่าคุณจะเข้าตรวจรับห้องจริง (Move-in Checklist) ในวันเริ่มสัญญา
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSimulatePayment}
          disabled={isProcessing}
          className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              กำลังยืนยันยอดเงินจากธนาคาร...
            </span>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" />
              <span>จำลอง: สแกนชำระเงินสำเร็จ (Simulate Success)</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
