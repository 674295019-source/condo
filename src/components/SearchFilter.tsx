import React from 'react';
import { Search, Train, SlidersHorizontal, ShieldCheck } from 'lucide-react';

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  selectedStation: string;
  setSelectedStation: (v: string) => void;
  selectedBedrooms: string;
  setSelectedBedrooms: (v: string) => void;
  onlyVerified: boolean;
  setOnlyVerified: (v: boolean) => void;
  availableStations: string[];
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  setSearchTerm,
  selectedStation,
  setSelectedStation,
  selectedBedrooms,
  setSelectedBedrooms,
  onlyVerified,
  setOnlyVerified,
  availableStations,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-4 sm:p-5 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Keyword Search */}
        <div className="md:col-span-4 relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ค้นหาชื่อโครงการ, ทำเล, หรือคำอธิบาย..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
          />
        </div>

        {/* Station Filter */}
        <div className="md:col-span-3 relative">
          <Train className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <select
            value={selectedStation}
            onChange={(e) => setSelectedStation(e.target.value)}
            className="w-full pl-11 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition appearance-none cursor-pointer"
          >
            <option value="">ทุกสถานี BTS / MRT</option>
            {availableStations.map((station) => (
              <option key={station} value={station}>
                {station}
              </option>
            ))}
          </select>
        </div>

        {/* Bedroom Filter */}
        <div className="md:col-span-2 relative">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <select
            value={selectedBedrooms}
            onChange={(e) => setSelectedBedrooms(e.target.value)}
            className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition appearance-none cursor-pointer"
          >
            <option value="">ห้องนอนทั้งหมด</option>
            <option value="1">1 ห้องนอน</option>
            <option value="2">2 ห้องนอน</option>
            <option value="3">3+ ห้องนอน</option>
          </select>
        </div>

        {/* Verified Badge Checkbox */}
        <div className="md:col-span-3 flex items-center justify-between sm:justify-end gap-2 pt-1 md:pt-0">
          <label className="flex items-center gap-2 cursor-pointer select-none bg-sky-50/70 hover:bg-sky-50 px-3.5 py-2 rounded-xl border border-sky-100 transition">
            <input
              type="checkbox"
              checked={onlyVerified}
              onChange={(e) => setOnlyVerified(e.target.checked)}
              className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
            />
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span className="text-xs font-semibold text-sky-900">ตรวจโฉนดแล้ว (Verified)</span>
          </label>
        </div>
      </div>
    </div>
  );
};
