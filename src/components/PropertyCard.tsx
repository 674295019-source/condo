import React from 'react';
import { CondoUnit } from '../types/property';
import { ShieldCheck, MapPin, Bed, Bath, Maximize2, Clock, CheckCircle2 } from 'lucide-react';

interface PropertyCardProps {
  property: CondoUnit;
  onSelect: (p: CondoUnit) => void;
  onQuickBook: (p: CondoUnit) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  onQuickBook,
}) => {
  const isRent = property.type === 'RENT';

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col">
      {/* Image Thumbnail & Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onSelect(property)}>
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold text-white bg-slate-900/80 backdrop-blur-md">
            {isRent ? 'ให้เช่า' : 'ขาย'}
          </span>
          {property.isVerified && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-emerald-800 bg-emerald-100/95 backdrop-blur-md shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified
            </span>
          )}
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          {property.status === 'AVAILABLE' && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-sky-800 bg-sky-100/90 backdrop-blur-md flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
              ว่างพร้อมอยู่
            </span>
          )}
          {property.status === 'HOLDING' && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-amber-900 bg-amber-100/95 backdrop-blur-md flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              ติดจอง 60 นาที
            </span>
          )}
          {property.status === 'RESERVED' && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-slate-800 bg-slate-200/95 backdrop-blur-md flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-600" />
              วางมัดจำแล้ว
            </span>
          )}
        </div>

        {/* Bottom Station Tag on Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
            <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span className="truncate">{property.btsMrtStation} ({property.walkingDistanceM} ม.)</span>
          </div>
          <span className="bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg font-medium">
            ชั้น {property.floor}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3
            onClick={() => onSelect(property)}
            className="font-semibold text-slate-900 text-base line-clamp-1 hover:text-sky-600 transition cursor-pointer"
            title={property.title}
          >
            {property.projectName}
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {property.title}
          </p>

          {/* Unit Specs */}
          <div className="grid grid-cols-3 gap-2 py-3 my-3 border-y border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-slate-400" />
              <span>{property.bedrooms} นอน</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-slate-400" />
              <span>{property.bathrooms} น้ำ</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-slate-400" />
              <span>{property.areaSqM} ตร.ม.</span>
            </div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-2">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-xl sm:text-2xl font-bold text-slate-900">
                ฿{property.price.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500 ml-1">
                {isRent ? '/ เดือน' : 'บาท'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block">มัดจำพักใน Escrow</span>
              <span className="text-xs font-semibold text-emerald-700">
                ฿{property.depositAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelect(property)}
              className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
            >
              ดูรายละเอียด
            </button>
            <button
              onClick={() => onQuickBook(property)}
              disabled={property.status !== 'AVAILABLE'}
              className={`w-full py-2 px-3 text-xs font-semibold rounded-xl transition shadow-sm ${
                property.status === 'AVAILABLE'
                  ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-600/20'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {property.status === 'AVAILABLE' ? 'จองห้องทันที' : 'ไม่ว่าง'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
