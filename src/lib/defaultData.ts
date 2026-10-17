export interface SiteSettings {
  name: string;
  shortName: string;
  phone: string;
  phoneTel: string;
  email: string;
  address: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  hours: string;
  licenseText: string;
  formspreeId: string;
  facebookUrl?: string;
  instagramUrl?: string;
}

export interface HeroData {
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  subtitle: string;
  bgImage: string;
  stats: Array<{ number: string; label: string }>;
}

export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  includes: string[];
}

export interface RoomItem {
  id: string;
  title: string;
  status: 'Available' | 'Occupied' | 'Inquire';
  description: string;
  features: string[];
  image: string;
}

export interface GalleryItem {
  title: string;
  category: string;
  image: string;
  caption: string;
}

export interface TestimonialItem {
  name: string;
  relation: string;
  quote: string;
  rating: number;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const defaultSiteSettings: SiteSettings = {
  name: "Sunrise Adult Family Home LLC",
  shortName: "Sunrise AFH",
  phone: "(206) 557-2149",
  phoneTel: "+12065572149",
  email: "frity1995@yahoo.com",
  address: "7902 58th PL NE, Marysville, WA 98270",
  streetAddress: "7902 58th PL NE",
  city: "Marysville",
  state: "WA",
  zip: "98270",
  hours: "24/7 Care & Supervision",
  licenseText: "Licensed Adult Family Home · Marysville, Washington",
  formspreeId: "xdavelrd",
  facebookUrl: "https://www.facebook.com/",
  instagramUrl: "https://www.instagram.com/",
};

export const defaultHero: HeroData = {
  badge: "🏠 Licensed Adult Family Home · Marysville, Washington",
  titlePrefix: "Compassionate ",
  titleHighlight: "24/7 Adult Family",
  titleSuffix: "Home Care in Washington",
  subtitle: "Providing personalized care, comfort, and dignity in a safe and welcoming home environment. Your loved one deserves the very best.",
  bgImage: "/images/hero-bg.png",
  stats: [
    { number: "5", label: "Bedrooms" },
    { number: "24/7", label: "Care & Supervision" },
    { number: "100%", label: "Licensed & Compliant" },
    { number: "WA", label: "State Licensed" },
  ],
};

export const defaultServices: ServiceItem[] = [
  {
    id: "personal-care",
    title: "Personal Care & Daily Living Assistance",
    icon: "🤝",
    description: "Dignified, compassionate support with all activities of daily living tailored to each resident's unique care plan.",
    includes: [
      "Bathing, dressing & grooming assistance",
      "Mobility & transfer support with safety focus",
      "Incontinence care & personal hygiene",
      "Eating assistance & hydration monitoring",
      "Daily room tidying & linen service",
    ],
  },
  {
    id: "medication-management",
    title: "Medication Management & Health Monitoring",
    icon: "💊",
    description: "Careful, systematic medication administration ensuring all prescribed medications are taken safely and on schedule.",
    includes: [
      "Scheduled prescription administration",
      "Pharmacy refill coordination",
      "Daily vital signs & wellness checks",
      "Coordination with primary care physicians",
      "Doctor appointment scheduling & transport assistance",
    ],
  },
  {
    id: "meals-nutrition",
    title: "Nutritious Home-Cooked Meals",
    icon: "🍲",
    description: "Three delicious, freshly prepared meals daily plus wholesome snacks, accommodating physician-prescribed dietary plans.",
    includes: [
      "3 home-cooked meals prepared daily",
      "Wholesome morning & afternoon snacks",
      "Diabetic, low-sodium, & texture-modified diets",
      "Hydration monitoring throughout the day",
      "Warm family-style dining experience",
    ],
  },
  {
    id: "memory-care",
    title: "Dementia & Memory Care",
    icon: "🧠",
    description: "Specialized, empathetic care for seniors living with Alzheimer's disease, dementia, and cognitive changes.",
    includes: [
      "Calm, secure, structured daily routine",
      "Cognitive engagement & memory stimulation",
      "Wandering prevention & secure environment",
      "Patient, de-escalating communication techniques",
      "Regular updates & emotional support for families",
    ],
  },
  {
    id: "companionship",
    title: "Companionship & Social Activities",
    icon: "🌻",
    description: "A warm, family-like atmosphere where every resident feels valued, socially engaged, and part of our home community.",
    includes: [
      "Daily social interactions & group conversation",
      "Board games, puzzles, arts & crafts",
      "Music, reading & reminiscence activities",
      "Gentle movement & outdoor garden walks",
      "Holiday, birthday, & milestone celebrations",
    ],
  },
  {
    id: "safety-monitoring",
    title: "24/7 Supervision & Safety Monitoring",
    icon: "🛡️",
    description: "Around-the-clock awake caregivers providing immediate response, continuous oversight, and peace of mind.",
    includes: [
      "Awake, trained caregivers on-site 24/7",
      "Emergency call response & immediate assistance",
      "Fall prevention protocols & safe floor design",
      "Smoke detectors, sprinklers & safety alarms",
      "Complete regulatory compliance with WA DSHS",
    ],
  },
];

export const defaultRooms: RoomItem[] = [
  {
    id: "room-1",
    title: "Private Garden View Suite",
    status: "Available",
    description: "Spacious private bedroom with large windows overlooking the landscaped backyard garden. Filled with natural light and tranquility.",
    features: ["Natural garden view", "Furnished or bring own furniture", "Call bell accessible", "Wheelchair friendly"],
    image: "/images/bedroom.png",
  },
  {
    id: "room-2",
    title: "Cozy Private Bedroom",
    status: "Inquire",
    description: "Comfortable private room close to the main living area, ideal for residents who enjoy easy access to social spaces.",
    features: ["Generous closet space", "Cable & Wi-Fi ready", "Wide doorway access", "Warm wooden flooring"],
    image: "/images/bedroom.png",
  },
  {
    id: "room-3",
    title: "Quiet Retreat Bedroom",
    status: "Occupied",
    description: "A peaceful private bedroom designed for rest and quiet reflection with soft lighting and calming décor.",
    features: ["Quiet location in home", "Private temperature comfort", "Emergency call button", "Freshly painted"],
    image: "/images/bedroom.png",
  },
  {
    id: "room-4",
    title: "Bright Morning Sun Bedroom",
    status: "Available",
    description: "East-facing private bedroom with beautiful morning sunrise light. Steps from the accessible bathroom.",
    features: ["Morning sunlight", "Adjacent to accessible bath", "Personalized décor welcome", "Safety features"],
    image: "/images/bedroom.png",
  },
  {
    id: "room-5",
    title: "Spacious Private Room",
    status: "Inquire",
    description: "Large private bedroom that comfortably accommodates specialized medical equipment or extra seating.",
    features: ["Largest floor plan", "Space for favorite recliner", "Direct caregiver line", "Hardwood-style flooring"],
    image: "/images/bedroom.png",
  },
];

export const defaultGallery: GalleryItem[] = [
  {
    title: "Living & Dining Area",
    category: "Common Area",
    image: "/images/living-dining.png",
    caption: "Comfortable living and dining area for social meals and relaxation.",
  },
  {
    title: "Private Bedroom",
    category: "Bedrooms",
    image: "/images/bedroom.png",
    caption: "Private bedroom with warm natural light and cozy bedding.",
  },
  {
    title: "Outdoor Garden & Patio",
    category: "Outdoors",
    image: "/images/outdoor-garden.png",
    caption: "Peaceful outdoor garden and patio for fresh air and sunshine.",
  },
  {
    title: "Compassionate Care",
    category: "Caregiving",
    image: "/images/caregiver-resident.png",
    caption: "Attentive, personalized care delivered with dignity and respect.",
  },
  {
    title: "Family Visits Welcome",
    category: "Community",
    image: "/images/family-visit.png",
    caption: "We warmly welcome families to visit and spend quality time.",
  },
  {
    title: "Sunrise Home Exterior",
    category: "Exterior",
    image: "/images/hero-bg.png",
    caption: "Our welcoming residential home in a quiet Marysville neighborhood.",
  },
];

export const defaultTestimonials: TestimonialItem[] = [
  {
    name: "Sarah M.",
    relation: "Daughter of resident",
    quote: "Finding Sunrise Adult Family Home was an absolute blessing. The caregivers treat my mother like their own family. She is safe, eating wonderful home-cooked meals, and happier than she has been in years.",
    rating: 5,
  },
  {
    name: "David K.",
    relation: "Son of resident",
    quote: "The personalized attention here is unmatched compared to large institutional facilities. I have total peace of mind knowing someone is there for my dad 24 hours a day.",
    rating: 5,
  },
  {
    name: "Linda R.",
    relation: "Family member",
    quote: "The home is always clean, warm, and inviting. The communication from the team is proactive and thoughtful. We couldn't ask for a better home for our loved one.",
    rating: 5,
  },
];

export const defaultFaqs: FaqItem[] = [
  {
    question: "What is an Adult Family Home (AFH)?",
    answer: "An Adult Family Home is a state-licensed residential home that provides personalized 24/7 care, room, board, and supervision for up to 6 adults. Unlike large institutional assisted living facilities, an AFH offers intimate, high-ratio care in a true home setting.",
    category: "General",
  },
  {
    question: "How many residents live in your home?",
    answer: "Sunrise Adult Family Home is licensed for up to 5 residents. This small home setting ensures an exceptional caregiver-to-resident ratio, personalized routines, and individualized attention.",
    category: "General",
  },
  {
    question: "What services are included in the monthly fee?",
    answer: "Our comprehensive care includes 24/7 awake supervision, 3 home-cooked meals plus snacks, assistance with daily living (bathing, dressing, grooming, mobility), medication management, laundry, housekeeping, and social activities.",
    category: "Pricing & Services",
  },
  {
    question: "Do you accept Medicaid or private pay?",
    answer: "We primarily accept private pay and select long-term care insurance policies. Please contact us directly at (206) 557-2149 to discuss your specific payment options and coverage.",
    category: "Payment",
  },
  {
    question: "Can family members visit whenever they want?",
    answer: "Yes! Family members and loved ones are warmly welcomed to visit. We consider family an essential part of our residents' wellbeing and happiness.",
    category: "Life at Sunrise",
  },
  {
    question: "How do I schedule a tour?",
    answer: "You can schedule a tour right here on our website via our Schedule a Tour page, or call us directly at (206) 557-2149. We would love to show you around our home!",
    category: "Getting Started",
  },
];
