import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Member, 
  ClubEvent, 
  PricingTier, 
  Transaction, 
  Announcement, 
  EventRSVP, 
  MembershipTierId,
  UserRole
} from '../types';
import { 
  INITIAL_MEMBERS, 
  INITIAL_EVENTS, 
  INITIAL_PRICING_TIERS, 
  INITIAL_RSVPS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_ANNOUNCEMENTS 
} from '../data/seedData';

interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  members: Member[];
  events: ClubEvent[];
  rsvps: EventRSVP[];
  transactions: Transaction[];
  announcements: Announcement[];
  pricingTiers: PricingTier[];
  currentUser: Member | null;
  currentView: 'public' | 'portal' | 'admin';
  toast: ToastNotification | null;

  // Active modals & selections
  selectedEventForDetail: ClubEvent | null;
  selectedTierForCheckout: PricingTier | null;
  activeTicketPass: { rsvp: EventRSVP; event: ClubEvent } | null;
  activeInvoice: Transaction | null;
  isRegisterModalOpen: boolean;
  isCreateEventModalOpen: boolean;
  isCheckinScannerOpen: boolean;

  // Actions
  setCurrentView: (view: 'public' | 'portal' | 'admin') => void;
  switchUser: (memberId: string | 'guest') => void;
  registerMember: (memberData: {
    name: string;
    email: string;
    phone: string;
    college: string;
    branch: string;
    year: string;
    githubUsername: string;
    linkedinUrl: string;
    skills: string[];
    bio?: string;
  }, tierId?: MembershipTierId) => Member;
  updateMemberRoleAndTier: (memberId: string, role: UserRole, tier: MembershipTierId) => void;
  deleteMember: (memberId: string) => void;
  rsvpForEvent: (eventId: string, memberId: string) => EventRSVP | null;
  cancelRSVP: (rsvpId: string) => void;
  checkInAttendee: (ticketCode: string) => { success: boolean; message: string; rsvp?: EventRSVP };
  createEvent: (eventData: Omit<ClubEvent, 'id' | 'rsvpCount' | 'slug'>) => ClubEvent;
  updateEvent: (event: ClubEvent) => void;
  deleteEvent: (eventId: string) => void;
  processPayment: (
    tierId: MembershipTierId, 
    paymentMethod: 'upi' | 'card' | 'netbanking', 
    details: { upiId?: string; cardLast4?: string }
  ) => Promise<Transaction>;
  createAnnouncement: (announcement: Omit<Announcement, 'id' | 'date'>) => Announcement;
  
  // Modal controllers
  setSelectedEventForDetail: (event: ClubEvent | null) => void;
  openCheckout: (tier: PricingTier) => void;
  closeCheckout: () => void;
  openInvoice: (txn: Transaction) => void;
  closeInvoice: () => void;
  openTicketPass: (rsvp: EventRSVP) => void;
  closeTicketPass: () => void;
  setIsRegisterModalOpen: (open: boolean) => void;
  setIsCreateEventModalOpen: (open: boolean) => void;
  setIsCheckinScannerOpen: (open: boolean) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  MEMBERS: 'gdc_vadodara_members_v2',
  EVENTS: 'gdc_vadodara_events_v2',
  RSVPS: 'gdc_vadodara_rsvps_v2',
  TRANSACTIONS: 'gdc_vadodara_transactions_v2',
  ANNOUNCEMENTS: 'gdc_vadodara_announcements_v2',
  CURRENT_USER_ID: 'gdc_vadodara_current_user_id_v2'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<Member[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.MEMBERS);
      return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
    } catch {
      return INITIAL_MEMBERS;
    }
  });

  const [events, setEvents] = useState<ClubEvent[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.EVENTS);
      return saved ? JSON.parse(saved) : INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  });

  const [rsvps, setRsvps] = useState<EventRSVP[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.RSVPS);
      return saved ? JSON.parse(saved) : INITIAL_RSVPS;
    } catch {
      return INITIAL_RSVPS;
    }
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.TRANSACTIONS);
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ANNOUNCEMENTS);
      return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
    } catch {
      return INITIAL_ANNOUNCEMENTS;
    }
  });

  const pricingTiers = INITIAL_PRICING_TIERS;

  // Current active user
  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_USER_ID);
      return saved || 'MEM-002'; // default to Pooja Bhatt (active student member)
    } catch {
      return 'MEM-002';
    }
  });

  const currentUser = members.find(m => m.id === currentUserId) || members[0] || null;

  // View state
  const [currentView, setCurrentView] = useState<'public' | 'portal' | 'admin'>('public');

  // Modals & transient selections
  const [selectedEventForDetail, setSelectedEventForDetail] = useState<ClubEvent | null>(null);
  const [selectedTierForCheckout, setSelectedTierForCheckout] = useState<PricingTier | null>(null);
  const [activeTicketPass, setActiveTicketPass] = useState<{ rsvp: EventRSVP; event: ClubEvent } | null>(null);
  const [activeInvoice, setActiveInvoice] = useState<Transaction | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [isCheckinScannerOpen, setIsCheckinScannerOpen] = useState(false);
  const [toast, setToast] = useState<ToastNotification | null>(null);

  // Persistence side-effects
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.MEMBERS, JSON.stringify(members));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [members]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.RSVPS, JSON.stringify(rsvps));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [rsvps]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [transactions]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [announcements]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_USER_ID, currentUserId);
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [currentUserId]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 4000);
  };

  const switchUser = (memberId: string | 'guest') => {
    if (memberId === 'guest') {
      // create or switch to guest
      setCurrentUserId('guest');
      showToast('Switched to Guest explorer mode', 'info');
      return;
    }
    const found = members.find(m => m.id === memberId);
    if (found) {
      setCurrentUserId(memberId);
      showToast(`Logged in as ${found.name} (${found.role === 'admin' ? 'Admin' : found.tier.toUpperCase()})`, 'info');
      if (found.role === 'admin' && currentView === 'public') {
        // give option or keep current
      }
    }
  };

  const registerMember = (memberData: {
    name: string;
    email: string;
    phone: string;
    college: string;
    branch: string;
    year: string;
    githubUsername: string;
    linkedinUrl: string;
    skills: string[];
    bio?: string;
  }, tierId: MembershipTierId = 'community') => {
    const newId = `MEM-${String(members.length + 101).padStart(3, '0')}`;
    const badgeNum = Math.floor(100 + Math.random() * 900);
    const newMember: Member = {
      ...memberData,
      id: newId,
      tier: tierId,
      role: 'member',
      joinedDate: new Date().toISOString().split('T')[0],
      membershipExpiry: tierId === 'community' ? undefined : new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString().split('T')[0],
      paymentStatus: tierId === 'community' ? 'free' : 'paid',
      badgeCode: `GDC-VAD-2026-${badgeNum}`,
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(memberData.name)}`
    };

    setMembers(prev => [newMember, ...prev]);
    setCurrentUserId(newId);
    showToast(`Welcome to GDC Vadodara, ${newMember.name}! Member ID: ${newMember.badgeCode}`, 'success');
    return newMember;
  };

  const updateMemberRoleAndTier = (memberId: string, role: UserRole, tier: MembershipTierId) => {
    setMembers(prev => prev.map(m => {
      if (m.id === memberId) {
        return {
          ...m,
          role,
          tier,
          membershipExpiry: tier === 'community' ? undefined : new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString().split('T')[0]
        };
      }
      return m;
    }));
    showToast('Member permissions updated successfully', 'success');
  };

  const deleteMember = (memberId: string) => {
    setMembers(prev => prev.filter(m => m.id !== memberId));
    setRsvps(prev => prev.filter(r => r.memberId !== memberId));
    showToast('Member removed from directory', 'info');
  };

  const rsvpForEvent = (eventId: string, memberId: string) => {
    const event = events.find(e => e.id === eventId);
    const member = members.find(m => m.id === memberId);

    if (!event || !member) {
      showToast('Event or member profile not found', 'error');
      return null;
    }

    // Check tier eligibility
    if (event.ticketType === 'member_only' && member.tier === 'community') {
      showToast('This event is reserved for Pro Developer or Fellow members. Please upgrade your tier.', 'warning');
      setSelectedTierForCheckout(pricingTiers.find(t => t.id === 'pro') || pricingTiers[1]);
      return null;
    }

    // Check existing RSVP
    const existing = rsvps.find(r => r.eventId === eventId && r.memberId === memberId);
    if (existing) {
      showToast('You are already registered for this event! Here is your digital pass.', 'info');
      setActiveTicketPass({ rsvp: existing, event });
      return existing;
    }

    // Check capacity
    if (event.rsvpCount >= event.capacity) {
      showToast('Sorry, this event has reached maximum seating capacity.', 'error');
      return null;
    }

    const tktCode = `GDC-VAD-TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRsvp: EventRSVP = {
      id: `RSVP-${Date.now().toString().slice(-6)}`,
      eventId,
      memberId,
      memberName: member.name,
      memberEmail: member.email,
      memberCollege: member.college,
      ticketCode: tktCode,
      qrPayload: `https://gdc-vadodara.org/pass/${tktCode}?event=${eventId}&member=${memberId}`,
      registeredAt: new Date().toISOString(),
      checkedIn: false
    };

    setRsvps(prev => [newRsvp, ...prev]);
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, rsvpCount: e.rsvpCount + 1 } : e));
    setActiveTicketPass({ rsvp: newRsvp, event });
    showToast(`RSVP Confirmed for ${event.title}! Ticket #${tktCode} generated.`, 'success');
    return newRsvp;
  };

  const cancelRSVP = (rsvpId: string) => {
    const rsvp = rsvps.find(r => r.id === rsvpId);
    if (rsvp) {
      setRsvps(prev => prev.filter(r => r.id !== rsvpId));
      setEvents(prev => prev.map(e => e.id === rsvp.eventId ? { ...e, rsvpCount: Math.max(0, e.rsvpCount - 1) } : e));
      showToast('RSVP registration cancelled', 'info');
    }
  };

  const checkInAttendee = (ticketCode: string) => {
    const cleanCode = ticketCode.trim().toUpperCase();
    const rsvpIndex = rsvps.findIndex(r => r.ticketCode.toUpperCase() === cleanCode);

    if (rsvpIndex === -1) {
      return { success: false, message: `Ticket code "${ticketCode}" was not found in registered attendee records.` };
    }

    const rsvp = rsvps[rsvpIndex];
    if (rsvp.checkedIn) {
      return { 
        success: false, 
        message: `Attendee ${rsvp.memberName} already checked in at ${new Date(rsvp.checkedInAt || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}!`,
        rsvp 
      };
    }

    const updatedRsvp = {
      ...rsvp,
      checkedIn: true,
      checkedInAt: new Date().toISOString()
    };

    setRsvps(prev => {
      const copy = [...prev];
      copy[rsvpIndex] = updatedRsvp;
      return copy;
    });

    return { 
      success: true, 
      message: `Verified! Welcome ${rsvp.memberName} (${rsvp.memberCollege}) to the venue!`,
      rsvp: updatedRsvp 
    };
  };

  const createEvent = (eventData: Omit<ClubEvent, 'id' | 'rsvpCount' | 'slug'>) => {
    const newId = `EVT-${String(events.length + 101).padStart(3, '0')}`;
    const slug = eventData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const newEvent: ClubEvent = {
      ...eventData,
      id: newId,
      slug,
      rsvpCount: 0
    };

    setEvents(prev => [newEvent, ...prev]);
    showToast(`Event "${newEvent.title}" published successfully!`, 'success');
    return newEvent;
  };

  const updateEvent = (updated: ClubEvent) => {
    setEvents(prev => prev.map(e => e.id === updated.id ? updated : e));
    showToast('Event details updated', 'success');
  };

  const deleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
    setRsvps(prev => prev.filter(r => r.eventId !== eventId));
    showToast('Event deleted from schedule', 'info');
  };

  const processPayment = async (
    tierId: MembershipTierId, 
    paymentMethod: 'upi' | 'card' | 'netbanking', 
    details: { upiId?: string; cardLast4?: string }
  ): Promise<Transaction> => {
    const tier = pricingTiers.find(t => t.id === tierId) || pricingTiers[1];
    const totalINR = tier.priceINR;
    const baseAmount = Number((totalINR / 1.18).toFixed(2));
    const taxAmount = Number((totalINR - baseAmount).toFixed(2));

    const txnId = `TXN-VAD-${Date.now().toString().slice(-6)}`;
    const invoiceNum = `INV/GDC-VAD/2026/${Math.floor(1000 + Math.random() * 9000)}`;

    const newTxn: Transaction = {
      id: txnId,
      memberId: currentUser?.id || 'MEM-GUEST',
      memberName: currentUser?.name || 'Student Member',
      memberEmail: currentUser?.email || 'student@gdc-vadodara.org',
      tierId,
      tierName: tier.name,
      amountINR: baseAmount,
      taxINR: taxAmount,
      totalINR,
      paymentMethod,
      paymentGatewayRef: paymentMethod === 'upi' ? `UPI-OKHDFC-${Date.now().toString().slice(-8)}` : `RAZORPAY_pay_${Date.now().toString().slice(-8)}`,
      upiId: details.upiId,
      cardLast4: details.cardLast4,
      status: 'success',
      timestamp: new Date().toISOString(),
      invoiceNumber: invoiceNum
    };

    setTransactions(prev => [newTxn, ...prev]);

    // Upgrade current user
    if (currentUser) {
      setMembers(prev => prev.map(m => {
        if (m.id === currentUser.id) {
          return {
            ...m,
            tier: tierId,
            paymentStatus: 'paid',
            membershipExpiry: new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString().split('T')[0]
          };
        }
        return m;
      }));
    }

    showToast(`Payment of ₹${totalINR} verified! You are now an active ${tier.name}.`, 'success');
    return newTxn;
  };

  const createAnnouncement = (data: Omit<Announcement, 'id' | 'date'>) => {
    const newAnn: Announcement = {
      ...data,
      id: `ANN-${Date.now().toString().slice(-5)}`,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    showToast('Announcement broadcasted to members', 'success');
    return newAnn;
  };

  const openCheckout = (tier: PricingTier) => {
    if (tier.priceINR === 0) {
      // Free tier
      if (currentUser) {
        setMembers(prev => prev.map(m => m.id === currentUser.id ? { ...m, tier: 'community', paymentStatus: 'free' } : m));
        showToast('Enrolled in Student Explorer Free tier!', 'success');
      } else {
        setIsRegisterModalOpen(true);
      }
      return;
    }
    setSelectedTierForCheckout(tier);
  };

  const closeCheckout = () => {
    setSelectedTierForCheckout(null);
  };

  const openInvoice = (txn: Transaction) => {
    setActiveInvoice(txn);
  };

  const closeInvoice = () => {
    setActiveInvoice(null);
  };

  const openTicketPass = (rsvp: EventRSVP) => {
    const event = events.find(e => e.id === rsvp.eventId) || events[0];
    setActiveTicketPass({ rsvp, event });
  };

  const closeTicketPass = () => {
    setActiveTicketPass(null);
  };

  return (
    <AppContext.Provider
      value={{
        members,
        events,
        rsvps,
        transactions,
        announcements,
        pricingTiers,
        currentUser,
        currentView,
        toast,
        selectedEventForDetail,
        selectedTierForCheckout,
        activeTicketPass,
        activeInvoice,
        isRegisterModalOpen,
        isCreateEventModalOpen,
        isCheckinScannerOpen,

        setCurrentView,
        switchUser,
        registerMember,
        updateMemberRoleAndTier,
        deleteMember,
        rsvpForEvent,
        cancelRSVP,
        checkInAttendee,
        createEvent,
        updateEvent,
        deleteEvent,
        processPayment,
        createAnnouncement,

        setSelectedEventForDetail,
        openCheckout,
        closeCheckout,
        openInvoice,
        closeInvoice,
        openTicketPass,
        closeTicketPass,
        setIsRegisterModalOpen,
        setIsCreateEventModalOpen,
        setIsCheckinScannerOpen,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
