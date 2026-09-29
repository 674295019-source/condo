import React, { useState } from 'react';
import { CondoUnit } from '../types/property';
import { X, ShieldCheck, MapPin, Bed, Bath, Maximize2, Layers, CheckCircle2, Sparkles } from 'lucide-react';

interface PropertyDetailModalProps {
  property: CondoUnit | null;
  onClose: () => void;
  onBook: (property: CondoUnit) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  onBook,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!property) return null;

  const isRent = property.type === 'RENT';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-slate-900 overflow-hidden">
          <img
            src={property.images[activeImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover transition-all duration-300"
          />
          {/* Thumbnails */}
          {property.images.length > 1 && (
            <div className="absolute bottom-3 left-4 right-4 flex gap-2 overflow-x-auto py-1">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition shrink-0 ${
                    activeImageIndex === idx ? 'border-sky-400 scale-105 shadow-md' : 'border-white/50 opacity-70'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {/* Header & Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-slate-900">
                {isRent ? 'เช่าคอนโด' : 'ซื้อขายคอนโด'}
              </span>
              {property.isVerified && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-emerald-800 bg-emerald-100 border border-emerald-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  ตรวจสอบโฉนดแล้ว (Verified Unit)
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-slate-900">
                ฿{property.price.toLocaleString()}
              </span>
              <span className="text-sm text-slate-500 font-medium">
                {isRent ? '/ เดือน' : 'บาท'}
              </span>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {property.projectName}
          </h2>
          <div className="flex items-center gap-2 text-slate-500 text-sm mt-1 mb-6">
            <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
            <span>{property.address} • ใกล้ {property.btsMrtStation} ({property.walkingDistanceM} เมตร)</span>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white text-sky-600 shadow-sm border border-slate-100">
                <Bed className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400">ห้องนอน</p>
                <p className="text-sm font-bold text-slate-800">{property.bedrooms} ห้อง</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white text-sky-600 shadow-sm border border-slate-100">
                <Bath className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400">ห้องน้ำ</p>
                <p className="text-sm font-bold text-slate-800">{property.bathrooms} ห้อง</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white text-sky-600 shadow-sm border border-slate-100">
                <Maximize2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400">พื้นที่ใช้สอย</p>
                <p className="text-sm font-bold text-slate-800">{property.areaSqM} ตร.ม.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white text-sky-600 shadow-sm border border-slate-100">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400">ชั้นที่</p>
                <p className="text-sm font-bold text-slate-800">ชั้น {property.floor}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-slate-900 mb-2">รายละเอียดห้องพัก</h4>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-slate-900 mb-3">สิ่งอำนวยความสะดวกในโครงการ</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {property.amenities.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-100/80 px-3 py-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Owner & Escrow Security Notice */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100 mb-6">
            <div className="flex items-center gap-3">
              <img
                src={property.owner.avatar}
                alt={property.owner.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-900">{property.owner.name}</span>
                  {property.owner.verifiedKYC && (
                    <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-semibold">e-KYC</span>
                  )}
                </div>
                <p className="text-xs text-slate-500">เจ้าของกรรมสิทธิ์ห้องชุด • เรตติ้ง ★ {property.owner.rating}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-sky-950 bg-white/70 p-3 rounded-xl border border-sky-200/60">
              <Sparkles className="w-5 h-5 text-sky-600 shrink-0" />
              <div>
                <span className="font-bold block">ระบบคุ้มครองเงินมัดจำ Escrow</span>
                เงินมัดจำ ฿{property.depositAmount.toLocaleString()} จะถูกพักไว้ในระบบกลาง และจะโอนให้เจ้าของเมื่อตรวจรับห้องเรียบร้อย
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div>
              <span className="text-xs text-slate-400 block">เงินมัดจำแรกเข้า (คืนเมื่อครบสัญญา)</span>
              <span className="text-base font-bold text-slate-800">
                ฿{property.depositAmount.toLocaleString()}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                ย้อนกลับ
              </button>
              <button
                onClick={() => onBook(property)}
                disabled={property.status !== 'AVAILABLE'}
                className="px-6 py-2.5 text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-lg shadow-sky-600/30 transition disabled:bg-slate-300"
              >
                {property.status === 'AVAILABLE' ? 'เริ่มขั้นตอนจองห้องพัก' : 'ห้องนี้ไม่ว่างแล้ว'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
