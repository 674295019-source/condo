-- Seed Initial Data for CondoSmart Platform

-- 1. Owners
INSERT INTO users (id, name, email, phone, role, avatar_url, verified_kyc, rating) VALUES
('OWN-01', 'คุณวราพร สุทธิการุณย์', 'waraporn@example.com', '081-111-2233', 'OWNER', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', TRUE, 4.9),
('OWN-02', 'คุณธนภัทร สิริโชค', 'thanapat@example.com', '082-222-3344', 'OWNER', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', TRUE, 4.8),
('OWN-03', 'คุณกิตติศักดิ์ พัฒนวณิช', 'kittisak@example.com', '083-333-4455', 'OWNER', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80', TRUE, 5.0),
('OWN-04', 'คุณพัชริดา เจริญสุข', 'patcharida@example.com', '084-444-5566', 'OWNER', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80', TRUE, 4.7),
('OWN-05', 'คุณชานนท์ เมธากุล', 'chanon@example.com', '085-555-6677', 'OWNER', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80', TRUE, 4.9),
('OWN-06', 'คุณประธาน สุนทรพานิช', 'prathan@example.com', '086-666-7788', 'OWNER', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', TRUE, 5.0);

-- 2. Condo Units
INSERT INTO condo_units (id, title, project_name, type, price, deposit_amount, advance_rent, bedrooms, bathrooms, area_sqm, floor, bts_mrt_station, walking_distance_m, address, description, is_verified, status, owner_id) VALUES
('CD-101', 'The Monument Thong Lo - ห้องมุมวิวเมือง เฟอร์นิเจอร์นำเข้าครบชุด', 'The Monument Thong Lo', 'RENT', 45000, 90000, 45000, 2, 2, 78, 28, 'BTS ทองหล่อ', 450, 'สุขุมวิท 55 (ทองหล่อ), วัฒนา, กรุงเทพฯ', 'คอนโดหรูระดับ Luxury ใจกลางทองหล่อ วิวโปร่งโล่งไม่มีตึกบัง เฟอร์นิเจอร์นำเข้าแบรนด์ยุโรป เครื่องใช้ไฟฟ้า Smart Home ครบครัน พร้อมที่จอดรถประจำ 1 คัน', TRUE, 'AVAILABLE', 'OWN-01'),
('CD-102', 'Rhythm Ekkamai Estate - 1 Bedroom แต่งสไตล์ Minimalist อบอุ่น', 'Rhythm Ekkamai Estate', 'RENT', 26000, 52000, 26000, 1, 1, 35, 15, 'BTS เอกมัย', 300, 'สุขุมวิท 63 (เอกมัย), วัฒนา, กรุงเทพฯ', 'ห้องขนาดกำลังดี กั้นห้องกระจกเป็นสัดส่วน ครัวปิด Built-in ไมโครเวฟ ตู้เย็น เครื่องซักผ้าฝาหน้า พร้อมเข้าอยู่ทันที เลี้ยงสัตว์ตัวเล็กได้ตามกฎนิติ', TRUE, 'AVAILABLE', 'OWN-02'),
('CD-103', 'Ashton Asoke - คอนโดติด MRT สุขุมวิท และ BTS อโศก วิวสี่แยกอโศกสุดตระการตา', 'Ashton Asoke', 'SALE', 8900000, 100000, 0, 1, 1, 34.5, 32, 'MRT สุขุมวิท / BTS อโศก', 20, 'ถนนอโศกมนตรี, คลองเตยเหนือ, วัฒนา, กรุงเทพฯ', 'ยูนิตหายาก ชั้นสูง วิวพาโนรามา เดินเพียง 20 เมตรถึงบันได MRT สุขุมวิท และ 230 เมตรถึง Terminal 21 โฉนดลอยพร้อมโอนกรรมสิทธิ์ทันที', TRUE, 'AVAILABLE', 'OWN-03'),
('CD-104', 'Noble Around Ari - ยูนิตหน้ากว้าง แต่งสไตล์ Modern Japanese ใกล้คาเฟ่ดัง', 'Noble Around Ari', 'RENT', 22000, 44000, 22000, 1, 1, 30, 12, 'BTS อารีย์', 90, 'ซอยอารีย์ 1, พญาไท, กรุงเทพฯ', 'ห้องสวยแต่งครบสไตล์มินิมอลญี่ปุ่น เดิน 90 เมตรถึง BTS อารีย์ ล้อมรอบด้วยร้านอาหาร คาเฟ่ชื่อดัง และ Villa Market อารีย์', TRUE, 'AVAILABLE', 'OWN-04'),
('CD-105', 'Ideo Rama 9 - Asoke - 2 Bedroom ชั้น 20 วิวทิศตะวันออก แดดเช้าสบาย', 'Ideo Rama 9 - Asoke', 'RENT', 32000, 64000, 32000, 2, 1, 52, 20, 'MRT พระราม 9', 400, 'ถนนพระราม 9, ห้วยขวาง, กรุงเทพฯ', 'ทำเล New CBD กรุงเทพฯ ใกล้ Central พระราม 9, Fortune Town และ G Tower ห้องขนาดใหญ่ 2 ห้องนอน เหมาะสำหรับคนทำงานใจกลางเมือง', TRUE, 'AVAILABLE', 'OWN-05'),
('CD-106', 'The Esse at Singha Complex - คอนโด Penthouse สุดเอ็กซ์คลูซีฟ พร้อมสระส่วนตัว', 'The Esse at Singha Complex', 'SALE', 24500000, 200000, 0, 3, 3, 125, 38, 'MRT เพชรบุรี / ARL มักกะสัน', 50, 'แยกอโศก-เพชรบุรี, บางกะปิ, ห้วยขวาง, กรุงเทพฯ', 'ที่สุดของความหรูหรา เชื่อมต่อตรงสู่ Singha Complex Lifestyle Mall วิวโค้งแม่น้ำเจ้าพระยาและสวนเบญจกิติ ตกแต่งระดับไฮเอนด์ด้วยหินอ่อนแท้', TRUE, 'AVAILABLE', 'OWN-06');

-- 3. Unit Images
INSERT INTO unit_images (unit_id, image_url, display_order) VALUES
('CD-101', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80', 1),
('CD-101', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80', 2),
('CD-102', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80', 1),
('CD-103', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80', 1),
('CD-104', 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1000&q=80', 1),
('CD-105', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80', 1),
('CD-106', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80', 1);

-- 4. Unit Amenities
INSERT INTO unit_amenities (unit_id, amenity_name) VALUES
('CD-101', 'สระว่ายน้ำระบบเกลือ'),
('CD-101', 'ฟิตเนส 360 องศา'),
('CD-101', 'EV Charger'),
('CD-102', 'Sky Lounge'),
('CD-102', 'Digital Doorlock'),
('CD-103', 'Automated Parking'),
('CD-104', 'Uptown Sky Lounge'),
('CD-105', 'Multi-sport Court'),
('CD-106', 'Onsen ส่วนตัว');
