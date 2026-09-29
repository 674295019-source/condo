import { CondoUnit } from '../types/property';

export const INITIAL_PROPERTIES: CondoUnit[] = [
  {
    id: 'CD-101',
    title: 'The Monument Thong Lo - ห้องมุมวิวเมือง เฟอร์นิเจอร์นำเข้าครบชุด',
    projectName: 'The Monument Thong Lo',
    type: 'RENT',
    price: 45000,
    depositAmount: 90000, // 2 months
    advanceRent: 45000,
    bedrooms: 2,
    bathrooms: 2,
    areaSqM: 78,
    floor: 28,
    btsMrtStation: 'BTS ทองหล่อ',
    walkingDistanceM: 450,
    address: 'สุขุมวิท 55 (ทองหล่อ), วัฒนา, กรุงเทพฯ',
    description: 'คอนโดหรูระดับ Luxury ใจกลางทองหล่อ วิวโปร่งโล่งไม่มีตึกบัง เฟอร์นิเจอร์นำเข้าแบรนด์ยุโรป เครื่องใช้ไฟฟ้า Smart Home ครบครัน พร้อมที่จอดรถประจำ 1 คัน',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
    ],
    isVerified: true,
    status: 'AVAILABLE',
    amenities: ['สระว่ายน้ำระบบเกลือ', 'ฟิตเนส 360 องศา', 'Co-working space', 'EV Charger', 'ระบบ Face Recognition'],
    owner: {
      id: 'OWN-01',
      name: 'คุณวราพร สุทธิการุณย์',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      verifiedKYC: true,
      rating: 4.9
    }
  },
  {
    id: 'CD-102',
    title: 'Rhythm Ekkamai Estate - 1 Bedroom แต่งสไตล์ Minimalist อบอุ่น',
    projectName: 'Rhythm Ekkamai Estate',
    type: 'RENT',
    price: 26000,
    depositAmount: 52000,
    advanceRent: 26000,
    bedrooms: 1,
    bathrooms: 1,
    areaSqM: 35,
    floor: 15,
    btsMrtStation: 'BTS เอกมัย',
    walkingDistanceM: 300,
    address: 'สุขุมวิท 63 (เอกมัย), วัฒนา, กรุงเทพฯ',
    description: 'ห้องขนาดกำลังดี กั้นห้องกระจกเป็นสัดส่วน ครัวปิด Built-in ไมโครเวฟ ตู้เย็น เครื่องซักผ้าฝาหน้า พร้อมเข้าอยู่ทันที เลี้ยงสัตว์ตัวเล็กได้ตามกฎนิติ',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80'
    ],
    isVerified: true,
    status: 'AVAILABLE',
    amenities: ['Sky Lounge', 'Sauna & Stream', 'สวนลอยฟ้า', 'กล้อง CCTV 24 ชม.', 'Digital Doorlock'],
    owner: {
      id: 'OWN-02',
      name: 'คุณธนภัทร สิริโชค',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      verifiedKYC: true,
      rating: 4.8
    }
  },
  {
    id: 'CD-103',
    title: 'Ashton Asoke - คอนโดติด MRT สุขุมวิท และ BTS อโศก วิวสี่แยกอโศกสุดตระการตา',
    projectName: 'Ashton Asoke',
    type: 'SALE',
    price: 8900000,
    depositAmount: 100000, // Booking / Earnest money
    bedrooms: 1,
    bathrooms: 1,
    areaSqM: 34.5,
    floor: 32,
    btsMrtStation: 'MRT สุขุมวิท / BTS อโศก',
    walkingDistanceM: 20,
    address: 'ถนนอโศกมนตรี, คลองเตยเหนือ, วัฒนา, กรุงเทพฯ',
    description: 'ยูนิตหายาก ชั้นสูง วิวพาโนรามา เดินเพียง 20 เมตรถึงบันได MRT สุขุมวิท และ 230 เมตรถึง Terminal 21 โฉนดลอยพร้อมโอนกรรมสิทธิ์ทันที',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502005229762-ae1b460020e2?auto=format&fit=crop&w=1000&q=80'
    ],
    isVerified: true,
    status: 'AVAILABLE',
    amenities: ['Sky Pool วิวเมือง', 'ฟิตเนสพร้อมอุปกรณ์ระดับโลก', 'สวนพักผ่อน', 'Automated Parking', 'Concierge Service'],
    owner: {
      id: 'OWN-03',
      name: 'คุณกิตติศักดิ์ พัฒนวณิช',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      verifiedKYC: true,
      rating: 5.0
    }
  },
  {
    id: 'CD-104',
    title: 'Noble Around Ari - ยูนิตหน้ากว้าง แต่งสไตล์ Modern Japanese ใกล้คาเฟ่ดัง',
    projectName: 'Noble Around Ari',
    type: 'RENT',
    price: 22000,
    depositAmount: 44000,
    advanceRent: 22000,
    bedrooms: 1,
    bathrooms: 1,
    areaSqM: 30,
    floor: 12,
    btsMrtStation: 'BTS อารีย์',
    walkingDistanceM: 90,
    address: 'ซอยอารีย์ 1, พญาไท, กรุงเทพฯ',
    description: 'ห้องสวยแต่งครบสไตล์มินิมอลญี่ปุ่น เดิน 90 เมตรถึง BTS อารีย์ ล้อมรอบด้วยร้านอาหาร คาเฟ่ชื่อดัง และ Villa Market อารีย์',
    images: [
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1000&q=80'
    ],
    isVerified: true,
    status: 'AVAILABLE',
    amenities: ['Uptown Sky Lounge', 'สวนขั้นบันได', 'High Speed Wi-Fi', 'ระบบความปลอดภัย 4 ชั้น'],
    owner: {
      id: 'OWN-04',
      name: 'คุณพัชริดา เจริญสุข',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      verifiedKYC: true,
      rating: 4.7
    }
  },
  {
    id: 'CD-105',
    title: 'Ideo Rama 9 - Asoke - 2 Bedroom ชั้น 20 วิวทิศตะวันออก แดดเช้าสบาย',
    projectName: 'Ideo Rama 9 - Asoke',
    type: 'RENT',
    price: 32000,
    depositAmount: 64000,
    advanceRent: 32000,
    bedrooms: 2,
    bathrooms: 1,
    areaSqM: 52,
    floor: 20,
    btsMrtStation: 'MRT พระราม 9',
    walkingDistanceM: 400,
    address: 'ถนนพระราม 9, ห้วยขวาง, กรุงเทพฯ',
    description: 'ทำเล New CBD กรุงเทพฯ ใกล้ Central พระราม 9, Fortune Town และ G Tower ห้องขนาดใหญ่ 2 ห้องนอน เหมาะสำหรับคนทำงานใจกลางเมือง',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1000&q=80'
    ],
    isVerified: true,
    status: 'AVAILABLE',
    amenities: ['Multi-sport Court', 'Infinity Pool', 'Game Room', 'ห้องประชุมงาน'],
    owner: {
      id: 'OWN-05',
      name: 'คุณชานนท์ เมธากุล',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      verifiedKYC: true,
      rating: 4.9
    }
  },
  {
    id: 'CD-106',
    title: 'The Esse at Singha Complex - คอนโด Penthouse สุดเอ็กซ์คลูซีฟ พร้อมสระส่วนตัว',
    projectName: 'The Esse at Singha Complex',
    type: 'SALE',
    price: 24500000,
    depositAmount: 200000,
    bedrooms: 3,
    bathrooms: 3,
    areaSqM: 125,
    floor: 38,
    btsMrtStation: 'MRT เพชรบุรี / ARL มักกะสัน',
    walkingDistanceM: 50,
    address: 'แยกอโศก-เพชรบุรี, บางกะปิ, ห้วยขวาง, กรุงเทพฯ',
    description: 'ที่สุดของความหรูหรา เชื่อมต่อตรงสู่ Singha Complex Lifestyle Mall วิวโค้งแม่น้ำเจ้าพระยาและสวนเบญจกิติ ตกแต่งระดับไฮเอนด์ด้วยหินอ่อนแท้',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80'
    ],
    isVerified: true,
    status: 'AVAILABLE',
    amenities: ['Onsen ส่วนตัว', 'Sky Lounge & Wine Cellar', 'Private Cinema', 'สนามไดร์ฟกอล์ฟจำลอง'],
    owner: {
      id: 'OWN-06',
      name: 'คุณประธาน สุนทรพานิช',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      verifiedKYC: true,
      rating: 5.0
    }
  }
];
