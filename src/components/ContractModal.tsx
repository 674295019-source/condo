import React, { useState } from 'react';
import { CondoUnit, BookingState } from '../types/property';
import { X, FileText, CheckCircle2, ShieldCheck, PenTool, Lock } from 'lucide-react';

interface ContractModalProps {
  property: CondoUnit | null;
  booking: BookingState | null;
  onClose: () => void;
  onSigned: () => void;
}

export const ContractModal: React.FC<ContractModalProps> = ({
  property,
  booking,
  onClose,
  onSigned,
}) => {
  const [signature, setSignature] = useState(booking?.tenantName || 'กิตติมา ศรีสวัสดิ์');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [isSigning, setIsSigning] = useState(false);

  if (!property || !booking) return null;

  const handleSign = () => {
    if (!agreedTerms) return;
    setIsSigning(true);
    setTimeout(() => {
      setIsSigning(false);
      onSigned();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600 shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">สัญญาเช่าห้องชุดอิเล็กทรอนิกส์ (e-Contract)</h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Lock className="w-3 h-3" /> PAdES Valid
              </span>
            </div>
            <p className="text-xs text-slate-500">สัญญามาตรฐานถูกต้องตาม พ.ร.บ. ธุรกรรมทางอิเล็กทรอนิกส์</p>
          </div>
        </div>

        {/* Contract Paper Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6 text-xs text-slate-700 leading-relaxed font-sans max-h-72 overflow-y-auto shadow-inner space-y-3">
          <div className="text-center pb-3 border-b border-slate-200">
            <h4 className="font-bold text-sm text-slate-900">สัญญาเช่าอาคารชุดเพื่อการพักอาศัย</h4>
            <p className="text-[11px] text-slate-500">สัญญาเลขที่: CT-{property.id}-2026-001</p>
          </div>

          <p>
            สัญญาฉบับนี้ทำขึ้นระหว่าง <strong>{property.owner.name}</strong> (ซึ่งต่อไปในสัญญานี้เรียกว่า "ผู้ให้เช่า") ฝ่ายหนึ่ง กับ <strong>{booking.tenantName}</strong> (ซึ่งต่อไปในสัญญานี้เรียกว่า "ผู้เช่า") อีกฝ่ายหนึ่ง
          </p>

          <p className="font-bold text-slate-900">ข้อ 1. วัตถุประสงค์และทรัพย์สินที่เช่า</p>
          <p>
            ผู้ให้เช่าตกลงให้เช่า และผู้เช่าตกลงเช่าห้องชุดเลขที่ในโครงการ <strong>{property.projectName}</strong> ชั้น {property.floor} พื้นที่ใช้สอย {property.areaSqM} ตร.ม. ที่ตั้ง {property.address} เพื่อใช้พักอาศัยเท่านั้น
          </p>

          <p className="font-bold text-slate-900">ข้อ 2. อัตราค่าเช่าและการชำระเงิน</p>
          <p>
            ตกลงเช่าในอัตราเดือนละ <strong>฿{property.price.toLocaleString()}</strong> บาท โดยมีกำหนดระยะเวลาการเช่า 1 ปี กำหนดชำระค่าเช่าล่วงหน้าภายในวันที่ 5 ของทุกเดือน
          </p>

          <p className="font-bold text-slate-900">ข้อ 3. เงินประกันความเสียหาย (Escrow Deposit)</p>
          <p>
            ผู้เช่าได้วางเงินประกันความเสียหายและเงินล่วงหน้าจำนวน <strong>฿{property.depositAmount.toLocaleString()}</strong> บาท ผ่านระบบบัญชี Escrow ของแพลตฟอร์ม เงินจำนวนนี้จะได้รับการปลดล็อกและคืนแก่ผู้เช่าภายใน 7 วันหลังครบกำหนดสัญญา
          </p>
        </div>

        {/* e-Signature Area */}
        <div className="p-4 bg-sky-50/70 border border-sky-200 rounded-2xl mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-sky-950 flex items-center gap-1.5">
              <PenTool className="w-4 h-4 text-sky-600" />
              ลงลายมือชื่อดิจิทัล (Digital Signature)
            </label>
            <span className="text-[11px] text-sky-700">Digital Certificate: Verified</span>
          </div>

          <input
            type="text"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-sky-300 rounded-xl text-sm font-serif italic text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            placeholder="พิมพ์ชื่อ-นามสกุลเพื่อลงนาม"
          />

          <label className="flex items-center gap-2 mt-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
            />
            <span className="text-xs text-slate-600 font-medium">
              ข้าพเจ้าได้อ่าน เข้าใจ และยอมรับข้อกำหนดในสัญญาเช่าฉบับนี้ทุกประการ
            </span>
          </label>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSign}
          disabled={!agreedTerms || isSigning}
          className="w-full py-3.5 px-4 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-lg shadow-sky-600/30 transition flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:shadow-none"
        >
          {isSigning ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              กำลังประทับตราดิจิทัลและ Timestamp...
            </span>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" />
              <span>ยืนยันลงนามในสัญญา (Sign & Seal e-Contract)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
