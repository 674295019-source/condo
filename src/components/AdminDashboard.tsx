import React, { useState } from 'react';
import { CondoUnit, BookingState, DisputeTicket, AdminUser, ADMIN_EMAILS } from '../types/property';
import {
  LayoutDashboard,
  Building,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Users,
  Plus,
  CheckCircle2,
  XCircle,
  Trash2,
  DollarSign,
  ArrowRightLeft,
  X,
  Lock,
  UserCheck,
  ShieldAlert,
} from 'lucide-react';

interface AdminDashboardProps {
  properties: CondoUnit[];
  setProperties: React.Dispatch<React.SetStateAction<CondoUnit[]>>;
  activeBooking: BookingState | null;
  onClose: () => void;
  currentAdminEmail: string;
  triggerToast: (msg: string) => void;
}

const INITIAL_DISPUTES: DisputeTicket[] = [
  {
    id: 'DSP-101',
    bookingId: 'CD-101',
    unitTitle: 'The Monument Thong Lo - 2 Bed Room',
    complainantName: 'กิตติมา ศรีสวัสดิ์',
    reason: 'เครื่องปรับอากาศห้องนอนใหญ่ไม่เย็น และฝาตู้เย็นมีรอยถลอกลึก',
    status: 'OPEN',
    createdAt: '2026-10-06 14:30',
  },
  {
    id: 'DSP-102',
    bookingId: 'CD-104',
    unitTitle: 'Noble Around Ari - 1 Bedroom',
    complainantName: 'สมชาย รักดี',
    reason: 'เจ้าของห้องไม่ส่งมอบ Keycard ใบที่ 2 ตามที่ระบุไว้ในสัญญาเช่า',
    status: 'OPEN',
    createdAt: '2026-10-05 09:15',
  },
];

const INITIAL_USERS: AdminUser[] = [
  {
    id: 'USR-01',
    name: 'แอดมิน ปริฉัตร',
    email: '674295019@parichat.skru.ac.th',
    role: 'ADMIN',
    verifiedKYC: true,
    registeredDate: '2026-09-01',
  },
  {
    id: 'USR-02',
    name: 'แอดมิน เสรี',
    email: 'seree999@gmail.com',
    role: 'ADMIN',
    verifiedKYC: true,
    registeredDate: '2026-09-01',
  },
  {
    id: 'USR-03',
    name: 'คุณวราพร สุทธิการุณย์',
    email: 'waraporn@example.com',
    role: 'OWNER',
    verifiedKYC: true,
    registeredDate: '2026-09-10',
  },
  {
    id: 'USR-04',
    name: 'กิตติมา ศรีสวัสดิ์',
    email: 'kittima.s@gmail.com',
    role: 'TENANT',
    verifiedKYC: true,
    registeredDate: '2026-09-15',
  },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  properties,
  setProperties,
  activeBooking,
  onClose,
  currentAdminEmail,
  triggerToast,
}) => {
  const isAuthorized = ADMIN_EMAILS.includes(currentAdminEmail.toLowerCase());

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'PROPERTIES' | 'ESCROW' | 'CONTRACTS' | 'DISPUTES' | 'USERS'>('OVERVIEW');
  const [disputes, setDisputes] = useState<DisputeTicket[]>(INITIAL_DISPUTES);
  const [users, setUsers] = useState<AdminUser[]>(INITIAL_USERS);

  // If unauthorized, render 403 Access Denied Guard Screen
  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-2xl border border-slate-200">
          <div className="w-16 h-16 rounded-3xl bg-rose-100 flex items-center justify-center text-rose-600 mx-auto mb-4 border border-rose-200">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 mb-1">HTTP 403 Forbidden</h3>
          <p className="text-xs text-rose-600 font-bold mb-3">เข้าถึงระบบถูกปฏิเสธ (Unauthorized Access)</p>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            คุณไม่ได้รับสิทธิ์เข้าถึงระบบหลังบ้านของ CondoSmart เนื่องจากอีเมลของคุณ (<span className="font-mono text-slate-800 font-bold">{currentAdminEmail || 'ยังไม่ได้เข้าสู่ระบบ'}</span>) ไม่อยู่ในรายชื่อ Super Admin ที่ได้รับอนุญาต
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition"
          >
            ย้อนกลับสู่หน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  // New Property Form State
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newProject, setNewProject] = useState('');
  const [newType, setNewType] = useState<'RENT' | 'SALE'>('RENT');
  const [newPrice, setNewPrice] = useState(25000);
  const [newDeposit, setNewDeposit] = useState(50000);
  const [newBedrooms, setNewBedrooms] = useState(1);
  const [newBathrooms, setNewBathrooms] = useState(1);
  const [newArea, setNewArea] = useState(35);
  const [newFloor, setNewFloor] = useState(10);
  const [newStation, setNewStation] = useState('BTS อโศก');
  const [newDistance, setNewDistance] = useState(200);
  const [newAddress, setNewAddress] = useState('สุขุมวิท, วัฒนา, กรุงเทพฯ');
  const [newDescription, setNewDescription] = useState('คอนโดมิเนียมแต่งครบ พร้อมเข้าอยู่');
  const [newImageUrl, setNewImageUrl] = useState('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80');

  // Stats
  const totalProperties = properties.length;
  const verifiedProperties = properties.filter((p) => p.isVerified).length;
  const totalEscrowHeld = properties.reduce((acc, p) => (p.status === 'RESERVED' || p.status === 'OCCUPIED' ? acc + p.depositAmount : acc), 0) + (activeBooking ? activeBooking.depositAmount : 0);
  const openDisputeCount = disputes.filter((d) => d.status === 'OPEN').length;

  // Toggle Verification Badge
  const handleToggleVerification = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isVerified: !p.isVerified } : p))
    );
    triggerToast(`อัปเดตสถานะ Verified Badge สำหรับห้องรหัส ${id} เรียบร้อยแล้ว`);
  };

  // Delete Property
  const handleDeleteProperty = (id: string) => {
    if (window.confirm(`คุณแน่ใจหรือไม่ที่จะลบรายการคอนโดรหัส ${id}?`)) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
      triggerToast(`ลบรายการคอนโดรหัส ${id} สำเร็จ`);
    }
  };

  // Add New Property Handler
  const handleAddPropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `CD-${100 + properties.length + 1}`;
    const newUnit: CondoUnit = {
      id: newId,
      title: newTitle || `${newProject} - ห้องแต่งสวยพร้อมอยู่`,
      projectName: newProject || 'New Condo Project',
      type: newType,
      price: Number(newPrice),
      depositAmount: Number(newDeposit),
      advanceRent: newType === 'RENT' ? Number(newPrice) : 0,
      bedrooms: Number(newBedrooms),
      bathrooms: Number(newBathrooms),
      areaSqM: Number(newArea),
      floor: Number(newFloor),
      btsMrtStation: newStation,
      walkingDistanceM: Number(newDistance),
      address: newAddress,
      description: newDescription,
      images: [newImageUrl],
      isVerified: true, // Admin created -> Auto-verified
      status: 'AVAILABLE',
      amenities: ['สระว่ายน้ำ', 'ฟิตเนส', 'CCTV 24 ชม.'],
      owner: {
        id: 'ADMIN-OWNER',
        name: `เจ้าของยูนิต (${currentAdminEmail})`,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        verifiedKYC: true,
        rating: 5.0,
      },
    };

    setProperties((prev) => [newUnit, ...prev]);
    setShowAddPropertyModal(false);
    triggerToast(`สร้างยูนิตใหม่ ${newId} (${newProject}) สำเร็จแล้ว!`);
  };

  // Resolve Dispute
  const handleResolveDispute = (id: string, decision: 'RESOLVED_REFUND' | 'RESOLVED_PAYOUT') => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: decision } : d))
    );
    const text = decision === 'RESOLVED_REFUND' ? 'อนุมัติคืนเงินมัดจำแก่ผู้เช่า' : 'อนุมัติสั่งจ่ายเงินให้เจ้าของห้อง';
    triggerToast(`ข้อพิพาท ${id}: ${text} เรียบร้อยแล้ว`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-6">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[94vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600/30 border border-sky-400/30 flex items-center justify-center text-sky-400 font-bold">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">CondoSmart Admin Control Center</h2>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-600 text-white animate-pulse">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-sky-200/80">
                ผู้ดูแลระบบ: <span className="text-white font-mono">{currentAdminEmail}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Body with Sidebar + Workspace */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4 space-y-1.5 shrink-0 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible">
            <button
              onClick={() => setActiveTab('OVERVIEW')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition text-left shrink-0 ${
                activeTab === 'OVERVIEW' ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>ภาพรวมระบบ (Overview)</span>
            </button>

            <button
              onClick={() => setActiveTab('PROPERTIES')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition text-left shrink-0 ${
                activeTab === 'PROPERTIES' ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>จัดการคอนโด ({totalProperties})</span>
            </button>

            <button
              onClick={() => setActiveTab('ESCROW')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition text-left shrink-0 ${
                activeTab === 'ESCROW' ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>บัญชีพักเงิน Escrow</span>
            </button>

            <button
              onClick={() => setActiveTab('CONTRACTS')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition text-left shrink-0 ${
                activeTab === 'CONTRACTS' ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>สัญญา e-Contract</span>
            </button>

            <button
              onClick={() => setActiveTab('DISPUTES')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition text-left shrink-0 ${
                activeTab === 'DISPUTES' ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>ข้อพิพาท ({openDisputeCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('USERS')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition text-left shrink-0 ${
                activeTab === 'USERS' ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>ผู้ใช้งาน & สิทธิ์ ({users.length})</span>
            </button>
          </div>

          {/* Workspace Area */}
          <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50">
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'OVERVIEW' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">สรุปสถานะระบบภาพรวม</h3>
                  <p className="text-xs text-slate-500">ข้อมูลสถิติและการทำงานแบบ Real-time บนระบบ</p>
                </div>

                {/* Stat Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-sky-100 text-sky-700 rounded-2xl">
                      <Building className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">รายการคอนโดทั้งหมด</span>
                      <span className="text-2xl font-black text-slate-900">{totalProperties} ยูนิต</span>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">ยอดเงินพักใน Escrow</span>
                      <span className="text-2xl font-black text-emerald-600">฿{totalEscrowHeld.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-indigo-100 text-indigo-700 rounded-2xl">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">ผ่านการตรวจโฉนดแล้ว</span>
                      <span className="text-2xl font-black text-slate-900">{verifiedProperties} / {totalProperties}</span>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">ข้อพิพาทรอดำเนินการ</span>
                      <span className="text-2xl font-black text-amber-600">{openDisputeCount} รายการ</span>
                    </div>
                  </div>
                </div>

                {/* Authorized Admins List Card */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-sky-600" />
                    รายชื่ออีเมลแอดมินที่ได้รับสิทธิ์ตามคำสั่ง (Authorized Admin Accounts)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-2xl flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-sky-950">674295019@parichat.skru.ac.th</span>
                      <span className="text-[10px] bg-sky-600 text-white font-bold px-2 py-0.5 rounded-full">ACTIVE ADMIN</span>
                    </div>
                    <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-2xl flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-sky-950">seree999@gmail.com</span>
                      <span className="text-[10px] bg-sky-600 text-white font-bold px-2 py-0.5 rounded-full">ACTIVE ADMIN</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. PROPERTIES TAB */}
            {activeTab === 'PROPERTIES' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">การจัดการคอนโดและอนุมัติโฉนด (Property Verification)</h3>
                    <p className="text-xs text-slate-500">ตรวจสอบโฉนด อ.ช.2 และจัดการรายการห้องพักในระบบ</p>
                  </div>

                  <button
                    onClick={() => setShowAddPropertyModal(true)}
                    className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>เพิ่มคอนโดใหม่</span>
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3.5">รหัส / โครงการ</th>
                        <th className="p-3.5">ประเภท / ราคา</th>
                        <th className="p-3.5">เงินมัดจำ Escrow</th>
                        <th className="p-3.5">สถานะห้อง</th>
                        <th className="p-3.5">Verified Badge</th>
                        <th className="p-3.5 text-right">การกระทำ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {properties.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/80 transition">
                          <td className="p-3.5 font-medium text-slate-900">
                            <span className="font-mono text-sky-700 font-bold block">{p.id}</span>
                            <span className="font-bold">{p.projectName}</span>
                          </td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-slate-100 mr-1.5">
                              {p.type}
                            </span>
                            ฿{p.price.toLocaleString()}
                          </td>
                          <td className="p-3.5 font-bold text-emerald-700">
                            ฿{p.depositAmount.toLocaleString()}
                          </td>
                          <td className="p-3.5">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              p.status === 'AVAILABLE' ? 'bg-sky-100 text-sky-800' :
                              p.status === 'HOLDING' ? 'bg-amber-100 text-amber-800' :
                              p.status === 'RESERVED' ? 'bg-indigo-100 text-indigo-800' :
                              'bg-emerald-100 text-emerald-800'
                            }`}>
                              {p.status}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <button
                              onClick={() => handleToggleVerification(p.id)}
                              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition ${
                                p.isVerified
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                  : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                              }`}
                            >
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>{p.isVerified ? 'Verified' : 'ยังไม่อนุมัติ'}</span>
                            </button>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => handleDeleteProperty(p.id)}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                              title="ลบยูนิต"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. ESCROW TAB */}
            {activeTab === 'ESCROW' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">การควบคุมบัญชีพักเงิน Escrow (Escrow Fund Ledger)</h3>
                  <p className="text-xs text-slate-500">ตรวจสอบเงินมัดจำในระบบ และอนุมัติการสั่งโอน Payout ให้เจ้าของห้อง</p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                    <div className="flex items-center gap-3">
                      <Lock className="w-6 h-6 text-emerald-600" />
                      <div>
                        <strong className="text-sm font-bold text-emerald-950 block">ยอดเงินพักรวมในระบบมัดจำกลาง</strong>
                        <span className="text-xs text-emerald-800">ได้รับการคุ้มครองด้วยการบันทึก Immutable Ledger</span>
                      </div>
                    </div>
                    <span className="text-2xl font-black text-emerald-700">฿{totalEscrowHeld.toLocaleString()}</span>
                  </div>

                  {activeBooking ? (
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700">
                      <div className="flex justify-between font-bold border-b pb-2 mb-2">
                        <span>รายการจองล่าสุด: {activeBooking.unitId}</span>
                        <span className="text-emerald-700">สถานะ: {activeBooking.status}</span>
                      </div>
                      <p>ผู้เช่า: {activeBooking.tenantName} ({activeBooking.tenantPhone})</p>
                      <p>เงินมัดจำพักในระบบ: ฿{activeBooking.depositAmount.toLocaleString()}</p>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 text-center py-4">ยังไม่มีรายการเงินจองค้างชำระสดในขณะนี้</p>
                  )}
                </div>
              </div>
            )}

            {/* 4. CONTRACTS TAB */}
            {activeTab === 'CONTRACTS' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">ตรวจสอบสัญญา e-Contract (Audit Trail & Certificates)</h3>
                  <p className="text-xs text-slate-500">รายการสัญญาเช่าดิจิทัลที่มี Timestamp และ Signature Certificate</p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-sky-600" />
                      <div>
                        <strong className="block text-slate-900 font-bold">สัญญาเช่า CT-CD-101-2026-001</strong>
                        <span className="text-slate-500">ผู้เช่า: กิตติมา ศรีสวัสดิ์ • เจ้าของ: คุณวราพร สุทธิการุณย์</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full text-[10px]">
                      PAdES Validated
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 5. DISPUTES TAB */}
            {activeTab === 'DISPUTES' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">จัดการข้อพิพาทและคำร้องเรียน (Dispute Resolution)</h3>
                  <p className="text-xs text-slate-500">คำร้องเรียนกรณีห้องไม่ตรงปก หรือมีอุปกรณ์ชำรุดเสียหาย</p>
                </div>

                <div className="space-y-3">
                  {disputes.map((d) => (
                    <div key={d.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="font-mono font-bold text-xs text-amber-700">{d.id}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          d.status === 'OPEN' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {d.status}
                        </span>
                      </div>

                      <div className="text-xs text-slate-700 space-y-1">
                        <p className="font-bold text-slate-900">{d.unitTitle}</p>
                        <p><span className="text-slate-400">ผู้ร้องเรียน:</span> {d.complainantName}</p>
                        <p className="bg-amber-50 p-2.5 rounded-xl border border-amber-100 text-amber-950 font-medium">
                          "{d.reason}"
                        </p>
                      </div>

                      {d.status === 'OPEN' && (
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => handleResolveDispute(d.id, 'RESOLVED_REFUND')}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition"
                          >
                            ตัดสิน: คืนเงินให้ผู้เช่า (Refund Tenant)
                          </button>
                          <button
                            onClick={() => handleResolveDispute(d.id, 'RESOLVED_PAYOUT')}
                            className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl transition"
                          >
                            ตัดสิน: จ่ายเงินให้เจ้าของ (Payout Owner)
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. USERS TAB */}
            {activeTab === 'USERS' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">จัดการผู้ใช้งานและสิทธิ์ (User & Role Management)</h3>
                  <p className="text-xs text-slate-500">กำหนดสิทธิ์ Admin / Owner / Tenant และตรวจสอบ e-KYC</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3.5">ชื่อ-นามสกุล</th>
                        <th className="p-3.5">อีเมล</th>
                        <th className="p-3.5">ระดับสิทธิ์ (Role)</th>
                        <th className="p-3.5">e-KYC</th>
                        <th className="p-3.5">วันที่สมัคร</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {users.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50 transition">
                          <td className="p-3.5 font-bold text-slate-900">{u.name}</td>
                          <td className="p-3.5 font-mono text-slate-700">{u.email}</td>
                          <td className="p-3.5">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              u.role === 'ADMIN' ? 'bg-rose-100 text-rose-800' :
                              u.role === 'OWNER' ? 'bg-sky-100 text-sky-800' :
                              'bg-emerald-100 text-emerald-800'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="p-3.5">
                            {u.verifiedKYC ? (
                              <span className="text-emerald-600 font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                              </span>
                            ) : (
                              <span className="text-slate-400">ยังไม่ระบุ</span>
                            )}
                          </td>
                          <td className="p-3.5 text-slate-500">{u.registeredDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add New Property Modal */}
      {showAddPropertyModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200">
            <button
              onClick={() => setShowAddPropertyModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-4">เพิ่มรายการคอนโดมิเนียมใหม่ (Admin Create)</h3>

            <form onSubmit={handleAddPropertySubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">ชื่อโครงการ</label>
                <input
                  type="text"
                  required
                  value={newProject}
                  onChange={(e) => setNewProject(e.target.value)}
                  placeholder="เช่น Ashton Chula-Silom"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">หัวข้อประกาศ</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="เช่น Ashton Chula - 1 Bed ชั้น 25 วิวสวน"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ประเภท</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as 'RENT' | 'SALE')}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="RENT">RENT (เช่า)</option>
                    <option value="SALE">SALE (ซื้อขาย)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ราคา (บาท)</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">เงินมัดจำ Escrow (บาท)</label>
                  <input
                    type="number"
                    required
                    value={newDeposit}
                    onChange={(e) => setNewDeposit(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ห้องนอน</label>
                  <input
                    type="number"
                    value={newBedrooms}
                    onChange={(e) => setNewBedrooms(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ห้องน้ำ</label>
                  <input
                    type="number"
                    value={newBathrooms}
                    onChange={(e) => setNewBathrooms(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">พื้นที่ (ตร.ม.)</label>
                  <input
                    type="number"
                    value={newArea}
                    onChange={(e) => setNewArea(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ชั้นที่</label>
                  <input
                    type="number"
                    value={newFloor}
                    onChange={(e) => setNewFloor(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">รูปภาพ URL</label>
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl transition mt-2"
              >
                บันทึกและอนุมัติลงประกาศทันที
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
