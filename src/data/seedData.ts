import { Member, ClubEvent, PricingTier, Transaction, Announcement, EventRSVP } from '../types';

export const INITIAL_PRICING_TIERS: PricingTier[] = [
  {
    id: 'community',
    name: 'Student Explorer',
    priceINR: 0,
    billingPeriod: 'Forever Free',
    targetAudience: 'For beginners & all university students',
    description: 'General community membership to get started with open tech sessions and peer networking in Vadodara.',
    perks: [
      'Access to monthly open campus meetups & watch parties',
      'Join GDC Vadodara Discord & WhatsApp tech channels',
      'Participation in open-source study jams & lightning talks',
      'Standard community event RSVP access',
      'Digital attendance certificates for open workshops'
    ],
    badgeLabel: 'Community Pass',
    cloudCredits: 'Standard Qwiklabs Access Codes',
    certificateType: 'Workshop Attendance Certificate'
  },
  {
    id: 'pro',
    name: 'Pro Developer Pass',
    priceINR: 399,
    billingPeriod: 'Per Academic Semester',
    targetAudience: 'For active student developers & hackathon builders',
    description: 'Full-stack perks with reserved seats, cloud vouchers, dev swag kit, and hands-on coding labs.',
    isPopular: true,
    perks: [
      'Everything in Student Explorer tier',
      'Priority fast-track entry to HackVadodara & DevFest',
      'Official GDC Vadodara metallic lanyard & laptop stickers kit',
      'Exclusive $50 Google Cloud & Gemini API sandbox credits',
      'Hands-on masterclass series with industry architects',
      'Verified Digital Club Membership ID card with QR verification',
      'Resume referral pool shared with Gujarat tech hiring partners'
    ],
    badgeLabel: 'Pro Member',
    cloudCredits: '$50 Google Cloud / Gemini Credits',
    certificateType: 'Verified Annual Developer Credential'
  },
  {
    id: 'fellow',
    name: 'Core Fellow & Lead',
    priceINR: 1299,
    billingPeriod: 'Per Academic Year',
    targetAudience: 'For club leaders, mentors, and senior student researchers',
    description: 'Premier leadership fellowship tier with 1-on-1 industry mentorship, speaking slots, and project grants.',
    perks: [
      'Everything in Pro Developer Pass',
      '1-on-1 Monthly Mentorship with Google Developer Experts (GDEs)',
      'VIP backstage pass & front-row seating at DevFest Vadodara',
      'Official GDC Vadodara Embroidered Club Hoodie & Swag Box',
      'Eligibility to apply for micro-grants for hackathon hardware projects',
      'Direct speaking slot opportunity at local university meetups',
      'Lifetime alumni directory access with recommendation letters'
    ],
    badgeLabel: 'Core Fellow',
    cloudCredits: '$150 Google Cloud / Vertex AI Vouchers',
    certificateType: 'Distinguished Fellow Honor Certificate'
  }
];

export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'MEM-001',
    name: 'Siddharth Dave',
    email: 'siddharth.dave@gdc-vadodara.org',
    phone: '+91 98250 44120',
    college: 'GSFC University, Vadodara',
    branch: 'B.Tech Computer Science & Engineering',
    year: '4th Year (Senior)',
    githubUsername: 'siddharth-dave',
    linkedinUrl: 'https://linkedin.com/in/siddharth-dave-gdc',
    avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=Siddharth&backgroundColor=e6dfd5',
    tier: 'fellow',
    role: 'admin',
    joinedDate: '2024-08-15',
    membershipExpiry: '2027-08-15',
    paymentStatus: 'paid',
    badgeCode: 'GDC-VAD-ADMIN-01',
    skills: ['Cloud Architecture', 'Go', 'Kubernetes', 'Community Leadership'],
    bio: 'Club Organizer & Lead. Passioned about building tech talent in Vadodara.'
  },
  {
    id: 'MEM-002',
    name: 'Pooja Bhatt',
    email: '23bt04077@gsfcuniversity.ac.in',
    phone: '+91 94280 87311',
    college: 'GSFC University, Vadodara',
    branch: 'B.Tech Information Technology',
    year: '3rd Year',
    githubUsername: 'poojabhatt-dev',
    linkedinUrl: 'https://linkedin.com/in/pooja-bhatt-it',
    avatarUrl: '/src/assets/images/student_builder_portrait_1790833209597.jpg',
    tier: 'pro',
    role: 'member',
    joinedDate: '2025-01-10',
    membershipExpiry: '2026-07-10',
    paymentStatus: 'paid',
    badgeCode: 'GDC-VAD-2026-042',
    skills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    bio: 'Full Stack enthusiast and open source contributor at GDC Vadodara.'
  },
  {
    id: 'MEM-003',
    name: 'Karan Parikh',
    email: 'karan.parikh@msubaroda.ac.in',
    phone: '+91 97230 19283',
    college: 'Maharaja Sayajirao University (MSU), Baroda',
    branch: 'Faculty of Tech & Engg (Computer Applications)',
    year: '3rd Year',
    githubUsername: 'karan-parikh-ml',
    linkedinUrl: 'https://linkedin.com/in/karan-parikh-ml',
    avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=Karan&backgroundColor=e6dfd5',
    tier: 'pro',
    role: 'member',
    joinedDate: '2025-02-04',
    membershipExpiry: '2026-08-04',
    paymentStatus: 'paid',
    badgeCode: 'GDC-VAD-2026-089',
    skills: ['PyTorch', 'TensorFlow', 'LLM Agents', 'Python'],
    bio: 'AI researcher working on multilingual Gujarati-English OCR models.'
  },
  {
    id: 'MEM-004',
    name: 'Ananya Sharma',
    email: 'ananya.sharma@paruluniversity.ac.in',
    phone: '+91 91060 38291',
    college: 'Parul University, Vadodara',
    branch: 'B.Tech AI & Data Science',
    year: '2nd Year',
    githubUsername: 'ananya-codes-ai',
    linkedinUrl: 'https://linkedin.com/in/ananya-sharma-ai',
    avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=Ananya&backgroundColor=e6dfd5',
    tier: 'community',
    role: 'member',
    joinedDate: '2025-02-20',
    paymentStatus: 'free',
    badgeCode: 'GDC-VAD-2026-114',
    skills: ['Python', 'SQL', 'Data Analytics', 'Streamlit'],
    bio: 'Passionate about exploring generative models and hackathon prototyping.'
  },
  {
    id: 'MEM-005',
    name: 'Devansh Trivedi',
    email: 'devansh.trivedi@itmbu.ac.in',
    phone: '+91 88661 54720',
    college: 'ITM (SLS) Baroda University',
    branch: 'B.Tech CSE (Cyber Security)',
    year: '4th Year (Senior)',
    githubUsername: 'devanshtrivedi-sec',
    linkedinUrl: 'https://linkedin.com/in/devanshtrivedi-sec',
    avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=Devansh&backgroundColor=e6dfd5',
    tier: 'fellow',
    role: 'core_team',
    joinedDate: '2024-09-01',
    membershipExpiry: '2026-09-01',
    paymentStatus: 'paid',
    badgeCode: 'GDC-VAD-CORE-05',
    skills: ['Penetration Testing', 'AppSec', 'Linux Kernel', 'Rust'],
    bio: 'Cybersecurity track lead at GDC Vadodara. Bug bounty researcher.'
  }
];

export const INITIAL_EVENTS: ClubEvent[] = [
  {
    id: 'EVT-001',
    title: 'Vadodara DevFest & GenAI Summit 2026',
    slug: 'vadodara-devfest-genai-2026',
    subtitle: 'The flagship tech gathering for developers across Central Gujarat',
    description: 'Join over 400 developers, students, and tech leads for a full-day summit covering Gemini 2.5 APIs, Agentic Workflows, Cloud Run scale architectures, and web performance. Featuring keynote speakers from Google and top tech unicorns.',
    category: 'ai_ml',
    date: '2026-10-18',
    time: '09:30 AM',
    endTime: '05:30 PM',
    venue: 'Main Auditorium, GSFC University',
    venueAddress: 'Vigyan Bhavan, Fertilizernagar, Vadodara, Gujarat 391750',
    venueMapUrl: 'https://maps.google.com/?q=GSFC+University+Vadodara',
    speaker: {
      name: 'Rohan Mehta',
      role: 'Staff Solutions Architect & GDE',
      company: 'Google Cloud Ecosystem',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Rohan&backgroundColor=e6dfd5'
    },
    capacity: 450,
    rsvpCount: 328,
    isFeatured: true,
    ticketType: 'free',
    priceINR: 0,
    bannerImage: '/src/assets/images/hero_vadodara_tech_1790832779240.jpg',
    agenda: [
      { time: '09:30 AM - 10:00 AM', topic: 'Attendee Check-in & Breakfast Networking' },
      { time: '10:00 AM - 11:15 AM', topic: 'Keynote: The Age of Multimodal AI Agents' },
      { time: '11:30 AM - 01:00 PM', topic: 'Building Production GenAI Apps with Gemini 2.5 & Vertex' },
      { time: '01:00 PM - 02:00 PM', topic: 'Networking Lunch & Sponsor Tech Expo' },
      { time: '02:00 PM - 03:45 PM', topic: 'Hands-on CodeLab: Serverless Fullstack with Go & Cloud Run' },
      { time: '04:00 PM - 05:15 PM', topic: 'Vadodara Tech Founder Panel & Swag Ceremony' }
    ],
    status: 'upcoming',
    tags: ['GenAI', 'Google Cloud', 'Keynote', 'Networking']
  },
  {
    id: 'EVT-002',
    title: 'HackVadodara: 36-Hr Collegiate Hackathon',
    slug: 'hackvadodara-36hr-hackathon',
    subtitle: 'Build solutions for smart cities, sustainability, and healthcare',
    description: 'A 36-hour non-stop in-person hackathon bringing together the sharpest coders from MS University, GSFC, Parul, and ITM. Compete for ₹1,50,000 in cash prizes, cloud credits, and incubation offers from Gujarat Student Startup and Innovation Hub.',
    category: 'open_source',
    date: '2026-11-07',
    time: '08:00 AM',
    endTime: '08:00 PM',
    venue: 'Tech Park Campus & Innovation Hall',
    venueAddress: 'Near Chhani Jakat Naka, Vadodara, Gujarat 390002',
    venueMapUrl: 'https://maps.google.com/?q=Chhani+Jakat+Naka+Vadodara',
    speaker: {
      name: 'Nirav Shah',
      role: 'CTO & Tech Mentor',
      company: 'Gujarat Innovation Council',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Nirav&backgroundColor=e6dfd5'
    },
    capacity: 200,
    rsvpCount: 165,
    isFeatured: true,
    ticketType: 'member_only',
    priceINR: 0,
    bannerImage: '/src/assets/images/event_hackathon_1790832805360.jpg',
    agenda: [
      { time: '08:00 AM - 09:30 AM', topic: 'Team Registration, Badging & Hackathon Kickoff' },
      { time: '10:00 AM', topic: 'Hacking Phase 1 Begins: Problem Statement Release' },
      { time: '04:00 PM', topic: 'Mentor Checkpoint 1: Architecture & Feasibility' },
      { time: '11:00 PM', topic: 'Midnight Energy Drink & Quick Bug Bounties' },
      { time: '08:00 AM (Next Day)', topic: 'Breakfast & Mentor Checkpoint 2' },
      { time: '04:00 PM', topic: 'Final Submissions & Jury Evaluations' },
      { time: '06:30 PM', topic: 'Award Ceremony & Grand Prize Announcement' }
    ],
    status: 'upcoming',
    tags: ['Hackathon', 'Cash Prize', '36 Hours', 'Pro Members']
  },
  {
    id: 'EVT-003',
    title: 'Hands-on CodeLab: Production LLMs with LangGraph & Gemini',
    slug: 'hands-on-codelab-gemini-langgraph',
    subtitle: 'Deep-dive interactive workshop with live code repos',
    description: 'Bring your laptop with Node.js/Python installed. In this intense 4-hour workshop, each developer will construct an autonomous research and document reasoning agent utilizing Google Gemini 2.5 Flash, vector databases, and function calling tools.',
    category: 'ai_ml',
    date: '2026-10-25',
    time: '02:00 PM',
    endTime: '06:00 PM',
    venue: 'Computer Science Lab 3, GSFC University',
    venueAddress: 'Vigyan Bhavan 2nd Floor, Vadodara, Gujarat 391750',
    venueMapUrl: 'https://maps.google.com/?q=GSFC+University+Vadodara',
    speaker: {
      name: 'Dr. Mehul Patel',
      role: 'Associate Professor & AI Lab Director',
      company: 'Center of Excellence in AI',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Mehul&backgroundColor=e6dfd5'
    },
    capacity: 60,
    rsvpCount: 52,
    isFeatured: false,
    ticketType: 'paid',
    priceINR: 99,
    bannerImage: '/src/assets/images/event_ai_workshop_1790832793077.jpg',
    agenda: [
      { time: '02:00 PM - 02:30 PM', topic: 'Environment Setup & Gemini API Key Provisioning' },
      { time: '02:30 PM - 03:45 PM', topic: 'Module 1: Structured Outputs, Schema Enforcement & Tools' },
      { time: '04:00 PM - 05:15 PM', topic: 'Module 2: State Machines with LangGraph & Cyclic Reasoning' },
      { time: '05:15 PM - 06:00 PM', topic: 'Deployment on Cloud Run & Certificate of Completion' }
    ],
    status: 'upcoming',
    tags: ['CodeLab', 'Hands-on', 'LangGraph', 'Gemini']
  },
  {
    id: 'EVT-004',
    title: 'Android 16 & Jetpack Compose Masterclass',
    slug: 'android-jetpack-compose-masterclass',
    subtitle: 'Modern reactive mobile architecture & Kotlin Multiplatform',
    description: 'Learn how to build expressive, buttery 120Hz native Android applications using Jetpack Compose, Material 3 expressive themes, and clean architecture patterns.',
    category: 'mobile_android',
    date: '2026-11-14',
    time: '10:00 AM',
    endTime: '01:30 PM',
    venue: 'Seminar Hall B, Faculty of Tech, MSU Baroda',
    venueAddress: 'Kalabhavan Campus, Opp Badamdi Baug, Vadodara, Gujarat 390001',
    venueMapUrl: 'https://maps.google.com/?q=MSU+Kalabhavan+Vadodara',
    speaker: {
      name: 'Tanvi Joshi',
      role: 'Lead Android Engineer',
      company: 'Fintech Mobile Labs',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Tanvi&backgroundColor=e6dfd5'
    },
    capacity: 120,
    rsvpCount: 94,
    isFeatured: false,
    ticketType: 'free',
    priceINR: 0,
    bannerImage: '/src/assets/images/hero_vadodara_tech_1790832779240.jpg',
    agenda: [
      { time: '10:00 AM - 11:00 AM', topic: 'Compose Declarative UI: State hoisting & Recomposition' },
      { time: '11:15 AM - 12:30 PM', topic: 'Navigation Suite & Shared Element Transitions' },
      { time: '12:30 PM - 01:30 PM', topic: 'Kotlin Multiplatform: Sharing Logic between Android & iOS' }
    ],
    status: 'upcoming',
    tags: ['Android', 'Kotlin', 'Compose', 'Mobile']
  }
];

export const INITIAL_RSVPS: EventRSVP[] = [
  {
    id: 'RSVP-101',
    eventId: 'EVT-001',
    memberId: 'MEM-002',
    memberName: 'Pooja Bhatt',
    memberEmail: '23bt04077@gsfcuniversity.ac.in',
    memberCollege: 'GSFC University, Vadodara',
    ticketCode: 'GDC-VAD-TKT-8841',
    qrPayload: 'https://gdc-vadodara.org/verify?ticket=GDC-VAD-TKT-8841&event=EVT-001&attendee=MEM-002',
    registeredAt: '2026-09-22T10:14:00Z',
    checkedIn: false
  },
  {
    id: 'RSVP-102',
    eventId: 'EVT-001',
    memberId: 'MEM-003',
    memberName: 'Karan Parikh',
    memberEmail: 'karan.parikh@msubaroda.ac.in',
    memberCollege: 'MSU Baroda',
    ticketCode: 'GDC-VAD-TKT-8842',
    qrPayload: 'https://gdc-vadodara.org/verify?ticket=GDC-VAD-TKT-8842&event=EVT-001&attendee=MEM-003',
    registeredAt: '2026-09-22T11:30:00Z',
    checkedIn: true,
    checkedInAt: '2026-09-29T09:35:00Z'
  },
  {
    id: 'RSVP-103',
    eventId: 'EVT-002',
    memberId: 'MEM-002',
    memberName: 'Pooja Bhatt',
    memberEmail: '23bt04077@gsfcuniversity.ac.in',
    memberCollege: 'GSFC University, Vadodara',
    ticketCode: 'GDC-VAD-TKT-9012',
    qrPayload: 'https://gdc-vadodara.org/verify?ticket=GDC-VAD-TKT-9012&event=EVT-002&attendee=MEM-002',
    registeredAt: '2026-09-25T14:20:00Z',
    checkedIn: false
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-VAD-99120',
    memberId: 'MEM-002',
    memberName: 'Pooja Bhatt',
    memberEmail: '23bt04077@gsfcuniversity.ac.in',
    tierId: 'pro',
    tierName: 'Pro Developer Pass',
    amountINR: 338.14,
    taxINR: 60.86,
    totalINR: 399.00,
    paymentMethod: 'upi',
    paymentGatewayRef: 'UPI-HDFC-98273618491',
    upiId: 'pooja.bhatt@okhdfcbank',
    status: 'success',
    timestamp: '2026-09-18T16:22:10Z',
    invoiceNumber: 'INV/GDC-VAD/2026/0481'
  },
  {
    id: 'TXN-VAD-99119',
    memberId: 'MEM-003',
    memberName: 'Karan Parikh',
    memberEmail: 'karan.parikh@msubaroda.ac.in',
    tierId: 'pro',
    tierName: 'Pro Developer Pass',
    amountINR: 338.14,
    taxINR: 60.86,
    totalINR: 399.00,
    paymentMethod: 'card',
    paymentGatewayRef: 'RAZORPAY_pay_Ox88219481',
    cardLast4: '4821',
    status: 'success',
    timestamp: '2026-09-15T11:04:32Z',
    invoiceNumber: 'INV/GDC-VAD/2026/0480'
  },
  {
    id: 'TXN-VAD-99115',
    memberId: 'MEM-005',
    memberName: 'Devansh Trivedi',
    memberEmail: 'devansh.trivedi@itmbu.ac.in',
    tierId: 'fellow',
    tierName: 'Core Fellow & Lead',
    amountINR: 1100.85,
    taxINR: 198.15,
    totalINR: 1299.00,
    paymentMethod: 'upi',
    paymentGatewayRef: 'UPI-ICICI-81729482711',
    upiId: 'devansh.t@okaxis',
    status: 'success',
    timestamp: '2026-09-02T19:40:15Z',
    invoiceNumber: 'INV/GDC-VAD/2026/0472'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ANN-001',
    title: 'HackVadodara 2026 Registration is now LIVE!',
    content: 'Problem statements and track categories have been finalized with our industry partners. Pro & Fellow members have guaranteed early-access team slots until this Friday.',
    type: 'event',
    date: '2026-09-28',
    author: 'Siddharth Dave',
    authorRole: 'GDC Vadodara Lead',
    linkText: 'Register for HackVadodara',
    linkUrl: '#events'
  },
  {
    id: 'ANN-002',
    title: 'Google Cloud Arcade Season 4 Vouchers Released',
    content: 'All verified Pro and Fellow tier members can now claim their 50-credit Qwiklabs vouchers inside the Member Portal learning vault.',
    type: 'important',
    date: '2026-09-25',
    author: 'Devansh Trivedi',
    authorRole: 'Cloud Track Lead'
  }
];
