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
  bgImage: "/images/outside.jpg",
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
    title: "Private Bedroom 1 (Furnished)",
    status: "Available",
    description: "Fully furnished private bedroom with comfortable bed, floral bedding, peaceful window lighting, and quiet residential setting.",
    features: ["Furnished with comfortable bed", "Quiet residential setting", "Natural window lighting", "24/7 Caregiver call support"],
    image: "/images/bedroom.jpg",
  },
  {
    id: "room-2",
    title: "Private Bedroom 2 (Move-in Ready)",
    status: "Inquire",
    description: "Clean, move-in ready private room with wood laminate flooring and window blinds — ready for your loved one's favorite personal furniture and décor.",
    features: ["Wood laminate flooring", "Large window with blinds", "Bring your own furniture", "Wheelchair friendly doorway"],
    image: "/images/room.jpg",
  },
  {
    id: "room-3",
    title: "Private Bedroom 3 (Quiet Wing)",
    status: "Occupied",
    description: "A peaceful private bedroom designed for rest and quiet reflection with soft lighting and calming atmosphere.",
    features: ["Quiet location in home", "Private temperature comfort", "Emergency call button", "Furnished or unfurnished"],
    image: "/images/bedroom.jpg",
  },
  {
    id: "room-4",
    title: "Private Bedroom 4 (Sunny East Wing)",
    status: "Available",
    description: "Bright private bedroom with warm morning sunrise light, smooth wood-style flooring, and close access to the accessible walk-in shower.",
    features: ["Morning sunlight", "Adjacent to accessible bath", "Personalized décor welcome", "Safety features"],
    image: "/images/room.jpg",
  },
  {
    id: "room-5",
    title: "Private Bedroom 5 (Spacious Suite)",
    status: "Inquire",
    description: "Spacious private bedroom with wood-style flooring, large built-in wardrobe closet, and ample room for personal furniture and a favorite recliner.",
    features: ["Generous built-in closet", "Space for favorite recliner", "Direct caregiver call line", "Hardwood-style flooring"],
    image: "/images/room.jpg",
  },
];

export const defaultGallery: GalleryItem[] = [
  {
    title: "Sunrise AFH Home Exterior",
    category: "Exterior & Grounds",
    image: "/images/outside.jpg",
    caption: "Our welcoming residential home in a quiet Marysville neighborhood.",
  },
  {
    title: "Front Walkway & Entrance",
    category: "Exterior & Grounds",
    image: "/images/outside-photo.jpg",
    caption: "Well-maintained entrance with smooth, barrier-free accessible walkway.",
  },
  {
    title: "Quiet Residential Setting",
    category: "Exterior & Grounds",
    image: "/images/outside-1.jpg",
    caption: "Safe, peaceful Marysville community setting.",
  },
  {
    title: "Spacious Fenced Backyard",
    category: "Exterior & Grounds",
    image: "/images/backyard.jpg",
    caption: "Large green lawn and fenced backyard for fresh air and outdoor relaxation.",
  },
  {
    title: "Comfortable Main Living Room",
    category: "Living & Common Areas",
    image: "/images/lobby.jpg",
    caption: "Bright living space with comfortable seating and natural lighting.",
  },
  {
    title: "Resident Lounge & Seating",
    category: "Living & Common Areas",
    image: "/images/lobby-2.jpg",
    caption: "Relaxing living area for conversation, reading, and social activities.",
  },
  {
    title: "Cozy Lounge & Visiting Area",
    category: "Living & Common Areas",
    image: "/images/space.jpg",
    caption: "Welcoming reception and conversation area for residents and visiting families.",
  },
  {
    title: "Home Décor & Accents",
    category: "Living & Common Areas",
    image: "/images/wall-with-pic.jpg",
    caption: "Warm, homey touches and framed artwork that make our facility feel like family.",
  },
  {
    title: "Wide Accessible Hallways",
    category: "Living & Common Areas",
    image: "/images/hall-way.jpg",
    caption: "Wide, well-lit corridors designed for easy walker and wheelchair navigation.",
  },
  {
    title: "Interior Living Space",
    category: "Living & Common Areas",
    image: "/images/photo.jpg",
    caption: "Clean, bright interior connecting bedrooms to main living areas.",
  },
  {
    title: "Family Dining Area",
    category: "Dining & Kitchen",
    image: "/images/dining.jpg",
    caption: "Family-style dining table where residents enjoy 3 home-cooked meals daily.",
  },
  {
    title: "Modern Fully Equipped Kitchen",
    category: "Dining & Kitchen",
    image: "/images/kitchen.jpg",
    caption: "Clean, modern kitchen where fresh, nutritious meals and snacks are prepared.",
  },
  {
    title: "Furnished Private Bedroom",
    category: "Bedrooms",
    image: "/images/bedroom.jpg",
    caption: "Comfortable private bedroom with made bed, warm daylight, and peaceful atmosphere.",
  },
  {
    title: "Move-In Ready Private Room",
    category: "Bedrooms",
    image: "/images/room.jpg",
    caption: "Tranquil bedroom with wood laminate flooring and window blinds, ready for personal furniture.",
  },
  {
    title: "Built-In Bedroom Closet",
    category: "Bedrooms",
    image: "/images/closet.jpg",
    caption: "Ample closet space with double doors for clothes, wardrobe, and personal belongings.",
  },
  {
    title: "Accessible Bathroom Vanity",
    category: "Bathrooms & Showers",
    image: "/images/bathroom.jpg",
    caption: "Spacious accessible bathroom with safety-first design, wide mirror, and vanity.",
  },
  {
    title: "Barrier-Free Walk-In Shower",
    category: "Bathrooms & Showers",
    image: "/images/shower.jpg",
    caption: "Walk-in shower with safety grab bars and hand-held shower wand.",
  },
  {
    title: "Step-In Safety Shower",
    category: "Bathrooms & Showers",
    image: "/images/shower-2.jpg",
    caption: "Secure bathing facility with vertical grab bar to ensure resident comfort and prevent slips.",
  },
  {
    title: "Tiled Accessible Shower",
    category: "Bathrooms & Showers",
    image: "/images/shower-3.jpg",
    caption: "Clean, sanitized walk-in shower with safety support.",
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
