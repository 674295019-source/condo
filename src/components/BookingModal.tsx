import React, { useState } from 'react';
import { CondoUnit } from '../types/property';
import { X, Calendar, Clock, User, Phone, ShieldCheck, ArrowRight } from 'lucide-react';

interface BookingModalProps {
  property: CondoUnit | null;
  onClose: () => void;
  onConfirmBooking: (bookingData: {
    tenantName: string;
    tenantPhone: string;
    viewingDate: string;
    viewingTime: string;
  }) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  property,
  onClose,
  onConfirmBooking,
}) => {
  const [name, setName] = useState('กิตติมา ศรีสวัสดิ์');
  const [phone, setPhone] = useState('081-987-6543');
  const [date, setDate] = useState('2026-10-05');
  const [time, setTime] = useState('14:00');

  if (!property) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmBooking({
      tenantName: name,
      tenantPhone: phone,
      viewingDate: date,
      viewingTime: time,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">จองสิทธิ์ห้องพัก (Lock 60 นาที)</h3>
            <p className="text-xs text-slate-500">ระบบจะล็อกห้องนี้ไว้ให้คุณ 60 นาทีเพื่อเตรียมทำรายการ</p>
          </div>
        </div>

        {/* Selected Property Preview */}
        <div className="flex gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 mb-6">
          <img
            src={property.images[0]}
            alt=""
            className="w-16 h-16 rounded-xl object-cover shrink-0"
          />
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-slate-900 truncate">{property.projectName}</h4>
            <p className="text-[11px] text-slate-500 truncate">{property.address}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs font-bold text-sky-600">฿{property.price.toLocaleString()}</span>
              <span className="text-[10px] text-slate-400">• มัดจำ ฿{property.depositAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">ชื่อ-นามสกุล ผู้ทำรายการ</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">เบอร์โทรศัพท์ติดต่อ (สำหรับรับ SMS ยืนยัน)</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">วันที่ต้องการนัดดูห้อง</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">เวลาที่สะดวก</label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-2 text-xs text-amber-900">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>นโยบาย Booking Lock:</strong> เมื่อกดยืนยัน ห้องนี้จะถูกล็อกสถานะเป็น Holding เป็นเวลา 60 นาที เพื่อให้คุณทำการตรวจสอบสัญญาและชำระเงินมัดจำเข้า Escrow
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-lg shadow-sky-600/30 transition flex items-center justify-center gap-2"
          >
            <span>ยืนยันการจองห้องพัก</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
