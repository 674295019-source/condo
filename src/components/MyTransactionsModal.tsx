import React from 'react';
import { CondoUnit, BookingState } from '../types/property';
import { X, ShieldCheck, FileText, CheckCircle2, Clock, ArrowRight } from 'lucide-react';

interface MyTransactionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingState | null;
  property: CondoUnit | null;
  onContinuePayment: () => void;
  onContinueContract: () => void;
  onContinueMoveIn: () => void;
}

export const MyTransactionsModal: React.FC<MyTransactionsModalProps> = ({
  isOpen,
  onClose,
  booking,
  property,
  onContinuePayment,
  onContinueContract,
  onContinueMoveIn,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-slate-900 mb-1">ธุรกรรมและสัญญาของฉัน</h3>
        <p className="text-xs text-slate-500 mb-6">ติดตามสถานะการจอง, บัญชี Escrow, และสัญญาเช่า</p>

        {!booking || !property ? (
          <div className="text-center py-10 text-slate-400">
            <p className="text-sm">ยังไม่มีรายการจองหรือสัญญาที่กำลังดำเนินอยู่</p>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
              <span className="text-xs font-bold text-slate-700">{property.projectName}</span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                booking.status === 'PENDING_PAYMENT' ? 'bg-amber-100 text-amber-800' :
                booking.status === 'ESCROWED' ? 'bg-sky-100 text-sky-800' :
                booking.status === 'SIGNED' ? 'bg-indigo-100 text-indigo-800' :
                'bg-emerald-100 text-emerald-800'
              }`}>
                {booking.status === 'PENDING_PAYMENT' && 'รอชำระมัดจำ (60 นาที)'}
                {booking.status === 'ESCROWED' && 'เงินเข้า Escrow แล้ว • รอเซ็นสัญญา'}
                {booking.status === 'SIGNED' && 'เซ็นสัญญาแล้ว • รอตรวจรับห้อง'}
                {booking.status === 'COMPLETED' && 'เข้าอยู่แล้ว (Active Lease)'}
              </span>
            </div>

            <div className="text-xs text-slate-600 space-y-1.5 mb-4">
              <p>ผู้ทำรายการ: <strong>{booking.tenantName}</strong> ({booking.tenantPhone})</p>
              <p>ยอดเงินมัดจำในระบบ: <strong>฿{booking.depositAmount.toLocaleString()}</strong></p>
              <p>วันนัดหมายดูห้อง/เข้าอยู่: <strong>{booking.viewingDate} เวลา {booking.viewingTime} น.</strong></p>
            </div>

            {/* Next Step Action Button */}
            {booking.status === 'PENDING_PAYMENT' && (
              <button
                onClick={() => { onClose(); onContinuePayment(); }}
                className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <Clock className="w-4 h-4" />
                <span>ชำระเงินมัดจำ Escrow ตอนนี้</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {booking.status === 'ESCROWED' && (
              <button
                onClick={() => { onClose(); onContinueContract(); }}
                className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>เข้าสู่ขั้นตอนเซ็นสัญญา e-Contract</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {booking.status === 'SIGNED' && (
              <button
                onClick={() => { onClose(); onContinueMoveIn(); }}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>ทำ Move-in Checklist ตรวจรับห้อง</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {booking.status === 'COMPLETED' && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>สัญญาเริ่มมีผลแล้ว เงินประกันคุ้มครองอยู่ในระบบตลอดอายุสัญญา</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
