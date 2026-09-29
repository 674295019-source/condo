import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { SearchFilter } from './components/SearchFilter';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { BookingModal } from './components/BookingModal';
import { EscrowPaymentModal } from './components/EscrowPaymentModal';
import { ContractModal } from './components/ContractModal';
import { MoveInChecklistModal } from './components/MoveInChecklistModal';
import { MyTransactionsModal } from './components/MyTransactionsModal';
import { INITIAL_PROPERTIES } from './data/mockProperties';
import { CondoUnit, BookingState, ListingType } from './types/property';
import { ShieldCheck, Lock, CheckCircle2, Sparkles, Building, FileCheck } from 'lucide-react';

export const App: React.FC = () => {
  const [properties, setProperties] = useState<CondoUnit[]>(INITIAL_PROPERTIES);
  const [activeTab, setActiveTab] = useState<ListingType>('RENT');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStation, setSelectedStation] = useState('');
  const [selectedBedrooms, setSelectedBedrooms] = useState('');
  const [onlyVerified, setOnlyVerified] = useState(false);

  // Active Modals & Flow States
  const [selectedProperty, setSelectedProperty] = useState<CondoUnit | null>(null);
  const [bookingProperty, setBookingProperty] = useState<CondoUnit | null>(null);
  const [activeBooking, setActiveBooking] = useState<BookingState | null>(null);

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showContractModal, setShowContractModal] = useState(false);
  const [showMoveInModal, setShowMoveInModal] = useState(false);
  const [showTransactionsModal, setShowTransactionsModal] = useState(false);

  // Success Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Station lists for filter dropdown
  const availableStations = useMemo(() => {
    const set = new Set<string>();
    properties.forEach((p) => set.add(p.btsMrtStation));
    return Array.from(set);
  }, [properties]);

  // Filtered Properties
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      if (p.type !== activeTab) return false;
      if (onlyVerified && !p.isVerified) return false;
      if (selectedStation && p.btsMrtStation !== selectedStation) return false;
      if (selectedBedrooms && p.bedrooms.toString() !== selectedBedrooms) return false;
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(query);
        const matchProject = p.projectName.toLowerCase().includes(query);
        const matchAddress = p.address.toLowerCase().includes(query);
        if (!matchTitle && !matchProject && !matchAddress) return false;
      }
      return true;
    });
  }, [properties, activeTab, searchTerm, selectedStation, selectedBedrooms, onlyVerified]);

  // Flow handlers
  const handleOpenDetail = (p: CondoUnit) => {
    setSelectedProperty(p);
    setShowDetailModal(true);
  };

  const handleStartBooking = (p: CondoUnit) => {
    setShowDetailModal(false);
    setBookingProperty(p);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = (bookingData: {
    tenantName: string;
    tenantPhone: string;
    viewingDate: string;
    viewingTime: string;
  }) => {
    if (!bookingProperty) return;

    // 1. Update property status to HOLDING
    setProperties((prev) =>
      prev.map((item) =>
        item.id === bookingProperty.id ? { ...item, status: 'HOLDING' } : item
      )
    );

    const newBooking: BookingState = {
      unitId: bookingProperty.id,
      expiresAt: Date.now() + 3600 * 1000,
      tenantName: bookingData.tenantName,
      tenantPhone: bookingData.tenantPhone,
      status: 'PENDING_PAYMENT',
      depositAmount: bookingProperty.depositAmount,
      viewingDate: bookingData.viewingDate,
      viewingTime: bookingData.viewingTime,
    };

    setActiveBooking(newBooking);
    setShowBookingModal(false);
    setShowPaymentModal(true);
    triggerToast(`ล็อกห้อง ${bookingProperty.projectName} เป็นเวลา 60 นาทีเรียบร้อยแล้ว`);
  };

  const handlePaymentSuccess = () => {
    if (!bookingProperty || !activeBooking) return;

    // 2. Update to RESERVED & status ESCROWED
    setProperties((prev) =>
      prev.map((item) =>
        item.id === bookingProperty.id ? { ...item, status: 'RESERVED' } : item
      )
    );

    setActiveBooking((prev) => (prev ? { ...prev, status: 'ESCROWED' } : null));
    setShowPaymentModal(false);
    setShowContractModal(true);
    triggerToast('ชำระเงินมัดจำเข้าบัญชี Escrow สำเร็จแล้ว กำลังเตรียมเอกสารสัญญา e-Contract');
  };

  const handleContractSigned = () => {
    if (!activeBooking) return;

    setActiveBooking((prev) => (prev ? { ...prev, status: 'SIGNED' } : null));
    setShowContractModal(false);
    setShowMoveInModal(true);
    triggerToast('ลงนามในสัญญาดิจิทัลสำเร็จแล้ว สัญญามีผลผูกพันทางกฎหมายพร้อม Timestamp');
  };

  const handleMoveInComplete = () => {
    if (!bookingProperty || !activeBooking) return;

    // 3. Update to OCCUPIED & COMPLETED
    setProperties((prev) =>
      prev.map((item) =>
        item.id === bookingProperty.id ? { ...item, status: 'OCCUPIED' } : item
      )
    );

    setActiveBooking((prev) => (prev ? { ...prev, status: 'COMPLETED' } : null));
    setShowMoveInModal(false);
    triggerToast(`ตรวจรับห้องสำเร็จ! โอนเงินให้ ${bookingProperty.owner.name} เรียบร้อยแล้ว`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs animate-bounce border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        myBookingCount={activeBooking ? 1 : 0}
        onOpenMyBookings={() => setShowTransactionsModal(true)}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-900 via-sky-800 to-slate-900 text-white py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-sky-200 text-xs font-semibold mb-4 border border-white/10">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>แพลตฟอร์มแรกในไทยที่คุ้มครองเงินมัดจำด้วยระบบ Smart Escrow</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            {activeTab === 'RENT'
              ? 'เช่าคอนโดง่าย ปลอดภัย ไม่โดนโกงเงินมัดจำ'
              : 'ซื้อคอนโดมั่นใจ โฉนดตรวจสอบแล้วทุกยูนิต'}
          </h1>
          <p className="text-sm sm:text-base text-sky-100/90 mt-3 max-w-2xl mx-auto">
            รวมคอนโดใกล้แนวรถไฟฟ้า BTS & MRT ทุกห้องผ่านการยืนยันตัวตนเจ้าของห้อง (e-KYC) พร้อมสัญญาดิจิทัล e-Sign ถูกต้องตามกฎหมาย
          </p>

          {/* Quick Value Props */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mt-8 text-left text-xs">
            <div className="p-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <strong className="block text-white">Verified 100%</strong>
                <span className="text-sky-200/80">ตรวจกรรมสิทธิ์ อ.ช.2</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center gap-2.5">
              <Lock className="w-5 h-5 text-sky-400 shrink-0" />
              <div>
                <strong className="block text-white">Escrow Deposit</strong>
                <span className="text-sky-200/80">เงินมัดจำพักไว้ในระบบ</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center gap-2.5">
              <FileCheck className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <strong className="block text-white">Digital e-Contract</strong>
                <span className="text-sky-200/80">เซ็นออนไลน์ มีผลตาม กฎหมาย</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <strong className="block text-white">Move-in Checklist</strong>
                <span className="text-sky-200/80">ตรวจสภาพห้องวันเข้าอยู่</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Search & Filter Bar */}
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedStation={selectedStation}
          setSelectedStation={setSelectedStation}
          selectedBedrooms={selectedBedrooms}
          setSelectedBedrooms={setSelectedBedrooms}
          onlyVerified={onlyVerified}
          setOnlyVerified={setOnlyVerified}
          availableStations={availableStations}
        />

        {/* Catalog Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {activeTab === 'RENT' ? 'รายการคอนโดให้เช่าล่าสุด' : 'รายการคอนโดสำหรับซื้อขาย'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              พบ {filteredProperties.length} ยูนิตที่ตรงกับเงื่อนไขการค้นหาของคุณ
            </p>
          </div>
        </div>

        {/* Property Grid */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center my-6">
            <Building className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">ไม่พบรายการคอนโดที่ค้นหา</h3>
            <p className="text-xs text-slate-500 mt-1">ลองปรับเปลี่ยนคำค้นหา หรือเลือกสถานีรถไฟฟ้าอื่น</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={handleOpenDetail}
                onQuickBook={handleStartBooking}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-sky-600" />
            <span className="font-bold text-slate-800">CondoSmart Platform (Phase 1)</span>
            <span>• ออกแบบตามมาตรฐาน Clean Architecture & Cloudflare Edge Ready</span>
          </div>
          <div>
            <span>© 2026 CondoSmart Inc. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setShowDetailModal(false)}
        onBook={handleStartBooking}
      />

      <BookingModal
        property={bookingProperty}
        onClose={() => setShowBookingModal(false)}
        onConfirmBooking={handleConfirmBooking}
      />

      <EscrowPaymentModal
        property={bookingProperty}
        booking={activeBooking}
        onClose={() => setShowPaymentModal(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <ContractModal
        property={bookingProperty}
        booking={activeBooking}
        onClose={() => setShowContractModal(false)}
        onSigned={handleContractSigned}
      />

      <MoveInChecklistModal
        property={bookingProperty}
        booking={activeBooking}
        onClose={() => setShowMoveInModal(false)}
        onConfirmMoveIn={handleMoveInComplete}
      />

      <MyTransactionsModal
        isOpen={showTransactionsModal}
        onClose={() => setShowTransactionsModal(false)}
        booking={activeBooking}
        property={bookingProperty}
        onContinuePayment={() => setShowPaymentModal(true)}
        onContinueContract={() => setShowContractModal(true)}
        onContinueMoveIn={() => setShowMoveInModal(true)}
      />
    </div>
  );
};
