export type ListingType = 'RENT' | 'SALE';
export type UnitStatus = 'AVAILABLE' | 'HOLDING' | 'RESERVED' | 'OCCUPIED';

export interface CondoUnit {
  id: string;
  title: string;
  projectName: string;
  type: ListingType;
  price: number; // THB (rent per month or sale price)
  depositAmount: number; // Escrow deposit required
  advanceRent?: number;
  bedrooms: number;
  bathrooms: number;
  areaSqM: number;
  floor: number;
  btsMrtStation: string;
  walkingDistanceM: number;
  address: string;
  description: string;
  images: string[];
  isVerified: boolean;
  status: UnitStatus;
  amenities: string[];
  owner: {
    id: string;
    name: string;
    avatar: string;
    verifiedKYC: boolean;
    rating: number;
  };
}

export interface BookingState {
  unitId: string;
  expiresAt: number; // Unix timestamp
  tenantName: string;
  tenantPhone: string;
  status: 'PENDING_PAYMENT' | 'ESCROWED' | 'SIGNED' | 'COMPLETED' | 'CANCELLED';
  depositAmount: number;
  viewingDate?: string;
  viewingTime?: string;
  signedContractUrl?: string;
}

export interface MoveInItem {
  id: string;
  title: string;
  category: 'FURNITURE' | 'APPLIANCE' | 'ROOM_CONDITION' | 'METER';
  condition: 'GOOD' | 'FAIR' | 'DAMAGED';
  photoCount: number;
  notes?: string;
}
