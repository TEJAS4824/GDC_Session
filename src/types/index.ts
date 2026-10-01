export type MembershipTierId = 'community' | 'pro' | 'fellow';

export type UserRole = 'member' | 'core_team' | 'admin';

export type EventCategory = 'ai_ml' | 'web_cloud' | 'mobile_android' | 'cybersec' | 'open_source';

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  year: string;
  githubUsername: string;
  linkedinUrl: string;
  avatarUrl: string;
  tier: MembershipTierId;
  role: UserRole;
  joinedDate: string;
  membershipExpiry?: string;
  paymentStatus: 'paid' | 'unpaid' | 'free';
  badgeCode: string;
  skills: string[];
  bio?: string;
}

export interface AgendaItem {
  time: string;
  topic: string;
  speaker?: string;
}

export interface ClubEvent {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  category: EventCategory;
  date: string;
  time: string;
  endTime: string;
  venue: string;
  venueAddress: string;
  venueMapUrl: string;
  speaker: {
    name: string;
    role: string;
    company: string;
    avatar: string;
  };
  capacity: number;
  rsvpCount: number;
  isFeatured?: boolean;
  ticketType: 'free' | 'member_only' | 'paid';
  priceINR: number;
  bannerImage: string;
  agenda: AgendaItem[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  tags: string[];
}

export interface EventRSVP {
  id: string;
  eventId: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  memberCollege: string;
  ticketCode: string;
  qrPayload: string;
  registeredAt: string;
  checkedIn: boolean;
  checkedInAt?: string;
}

export interface PricingTier {
  id: MembershipTierId;
  name: string;
  priceINR: number;
  billingPeriod: string;
  targetAudience: string;
  description: string;
  perks: string[];
  isPopular?: boolean;
  badgeLabel: string;
  cloudCredits?: string;
  certificateType?: string;
}

export interface Transaction {
  id: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  tierId: MembershipTierId;
  tierName: string;
  amountINR: number;
  taxINR: number;
  totalINR: number;
  paymentMethod: 'upi' | 'card' | 'netbanking';
  paymentGatewayRef: string;
  upiId?: string;
  cardLast4?: string;
  status: 'success' | 'failed' | 'processing';
  timestamp: string;
  invoiceNumber: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'important' | 'event' | 'achievement' | 'general';
  date: string;
  author: string;
  authorRole: string;
  linkText?: string;
  linkUrl?: string;
}
