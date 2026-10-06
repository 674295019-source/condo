-- Cloudflare D1 Database Schema for CondoSmart Platform
-- Version: 1.0.0 (SQLite / Cloudflare D1 compatible)

-- 1. Users Table (Owners & Tenants)
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('TENANT', 'OWNER', 'AGENT', 'ADMIN')),
    avatar_url TEXT,
    verified_kyc BOOLEAN DEFAULT FALSE,
    rating REAL DEFAULT 5.0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Condo Units Table
CREATE TABLE IF NOT EXISTS condo_units (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    project_name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('RENT', 'SALE')),
    price REAL NOT NULL,
    deposit_amount REAL NOT NULL,
    advance_rent REAL DEFAULT 0,
    bedrooms INTEGER NOT NULL,
    bathrooms INTEGER NOT NULL,
    area_sqm REAL NOT NULL,
    floor INTEGER NOT NULL,
    bts_mrt_station TEXT NOT NULL,
    walking_distance_m INTEGER NOT NULL,
    address TEXT NOT NULL,
    description TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    status TEXT NOT NULL DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'HOLDING', 'RESERVED', 'OCCUPIED')),
    owner_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Property Images
CREATE TABLE IF NOT EXISTS unit_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    unit_id TEXT NOT NULL,
    image_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    FOREIGN KEY (unit_id) REFERENCES condo_units(id) ON DELETE CASCADE
);

-- 4. Property Amenities
CREATE TABLE IF NOT EXISTS unit_amenities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    unit_id TEXT NOT NULL,
    amenity_name TEXT NOT NULL,
    FOREIGN KEY (unit_id) REFERENCES condo_units(id) ON DELETE CASCADE
);

-- 5. Bookings & Locks (60-minute holding)
CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    unit_id TEXT NOT NULL,
    tenant_name TEXT NOT NULL,
    tenant_phone TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('PENDING_PAYMENT', 'ESCROWED', 'SIGNED', 'COMPLETED', 'CANCELLED')),
    deposit_amount REAL NOT NULL,
    viewing_date TEXT,
    viewing_time TEXT,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (unit_id) REFERENCES condo_units(id) ON DELETE CASCADE
);

-- 6. Digital Contracts (e-Sign)
CREATE TABLE IF NOT EXISTS digital_contracts (
    id TEXT PRIMARY KEY,
    booking_id TEXT NOT NULL UNIQUE,
    unit_id TEXT NOT NULL,
    tenant_name TEXT NOT NULL,
    owner_name TEXT NOT NULL,
    tenant_signature TEXT,
    signed_at DATETIME,
    status TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'SIGNED', 'TERMINATED')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    FOREIGN KEY (unit_id) REFERENCES condo_units(id)
);

-- 7. Escrow Ledger Entries
CREATE TABLE IF NOT EXISTS escrow_ledgers (
    id TEXT PRIMARY KEY,
    booking_id TEXT NOT NULL,
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('DEPOSIT_HOLD', 'RENT_PAYOUT', 'REFUND', 'DISPUTE_HOLD')),
    amount REAL NOT NULL,
    status TEXT NOT NULL DEFAULT 'HELD' CHECK (status IN ('HELD', 'RELEASED', 'REFUNDED')),
    reference_code TEXT UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- 8. Move-in Checklist Inspections
CREATE TABLE IF NOT EXISTS move_in_inspections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contract_id TEXT NOT NULL,
    unit_id TEXT NOT NULL,
    item_title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('FURNITURE', 'APPLIANCE', 'ROOM_CONDITION', 'METER')),
    condition TEXT NOT NULL CHECK (condition IN ('GOOD', 'FAIR', 'DAMAGED')),
    photo_count INTEGER DEFAULT 0,
    notes TEXT,
    verified_at DATETIME,
    FOREIGN KEY (contract_id) REFERENCES digital_contracts(id),
    FOREIGN KEY (unit_id) REFERENCES condo_units(id)
);

-- Indexes for Query Performance
CREATE INDEX IF NOT EXISTS idx_units_status ON condo_units(status);
CREATE INDEX IF NOT EXISTS idx_units_type ON condo_units(type);
CREATE INDEX IF NOT EXISTS idx_units_station ON condo_units(bts_mrt_station);
CREATE INDEX IF NOT EXISTS idx_bookings_unit ON bookings(unit_id);
CREATE INDEX IF NOT EXISTS idx_escrow_booking ON escrow_ledgers(booking_id);
