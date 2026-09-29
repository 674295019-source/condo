import React, { useState } from 'react';
import { CondoUnit, BookingState, MoveInItem } from '../types/property';
import { X, ClipboardCheck, Camera, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface MoveInChecklistModalProps {
  property: CondoUnit | null;
  booking: BookingState | null;
  onClose: () => void;
  onConfirmMoveIn: () => void;
}

const DEFAULT_ITEMS: MoveInItem[] = [
  { id: '1', title: 'สภาพผนังและพื้นห้อง (ไร้รอยแตกร้าว)', category: 'ROOM_CONDITION', condition: 'GOOD', photoCount: 3 },
  { id: '2', title: 'เครื่องปรับอากาศ (เย็นปกติ ล้างแอร์แล้ว)', category: 'APPLIANCE', condition: 'GOOD', photoCount: 2 },
  { id: '3', title: 'ตู้เย็น และ ไมโครเวฟ Built-in', category: 'APPLIANCE', condition: 'GOOD', photoCount: 2 },
  { id: '4', title: 'Digital Doorlock & บัตร Keycard (2 ใบ)', category: 'FURNITURE', condition: 'GOOD', photoCount: 1 },
  { id: '5', title: 'จดเลขมิเตอร์ไฟฟ้า (เริ่มต้น: 14205.2)', category: 'METER', condition: 'GOOD', photoCount: 1 },
];

export const MoveInChecklistModal: React.FC<MoveInChecklistModalProps> = ({
  property,
  booking,
  onClose,
  onConfirmMoveIn,
}) => {
  const [items, setItems] = useState<MoveInItem[]>(DEFAULT_ITEMS);
  const [isReleasing, setIsReleasing] = useState(false);

  if (!property || !booking) return null;

  const handleToggleCondition = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, condition: item.condition === 'GOOD' ? 'FAIR' : 'GOOD' }
          : item
      )
    );
  };

  const handleComplete = () => {
    setIsReleasing(true);
    setTimeout(() => {
      setIsReleasing(false);
      onConfirmMoveIn();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <ClipboardCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">ตรวจรับมอบห้องพัก (Move-in Inspection)</h3>
            <p className="text-xs text-slate-500">
              ยืนยันสภาพห้องวันย้ายเข้า เพื่อปลดล็อกเงินค่าเช่าล่วงหน้างวดแรกให้เจ้าของ
            </p>
          </div>
        </div>

        {/* Checklist items */}
        <div className="space-y-3 mb-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200"
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleToggleCondition(item.id)}
                  className={`p-1 rounded-lg transition ${
                    item.condition === 'GOOD' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </button>
                <div>
                  <p className="text-xs font-bold text-slate-900">{item.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Camera className="w-3 h-3" /> {item.photoCount} รูปถ่าย
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.2 rounded ${
                      item.condition === 'GOOD' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.condition === 'GOOD' ? 'สมบูรณ์ดี' : 'มีตำหนิเล็กน้อย'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Escrow Release Notice */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 mb-6 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">การปลดล็อกเงินมัดจำ (Escrow Settlement)</span>
            เมื่อกดยืนยันตรวจรับห้อง ระบบจะโอนเงินค่าเช่าล่วงหน้า (฿{property.price.toLocaleString()}) ให้แก่ {property.owner.name} และคงเหลือเงินประกันความเสียหายไว้ใน Escrow ตลอดสัญญา
          </div>
        </div>

        <button
          onClick={handleComplete}
          disabled={isReleasing}
          className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2"
        >
          {isReleasing ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              กำลังดำเนินการ Payout ไปยังบัญชีเจ้าของห้อง...
            </span>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" />
              <span>ยืนยันตรวจรับห้อง & ปลดล็อกเงิน (Complete Move-in)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
