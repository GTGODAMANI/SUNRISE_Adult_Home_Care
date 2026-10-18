import { getCliClient } from 'sanity/cli';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = getCliClient();

async function uploadImage(relPath, filename) {
  const fullPath = path.resolve(__dirname, relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${fullPath}`);
    return null;
  }
  const stream = fs.createReadStream(fullPath);
  console.log(`Uploading asset: ${filename}...`);
  const asset = await client.assets.upload('image', stream, { filename });
  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  };
}

async function seed() {
  console.log('Seeding initial website content to Sanity...');

  // Upload images
  const heroImg = await uploadImage('../public/images/hero-bg.png', 'hero-bg.png');
  const bedroomImg = await uploadImage('../public/images/bedroom.png', 'bedroom.png');
  const livingImg = await uploadImage('../public/images/living-dining.png', 'living-dining.png');
  const gardenImg = await uploadImage('../public/images/outdoor-garden.png', 'outdoor-garden.png');
  const careImg = await uploadImage('../public/images/caregiver-resident.png', 'caregiver-resident.png');
  const familyImg = await uploadImage('../public/images/family-visit.png', 'family-visit.png');

  // 1. Site Settings
  console.log('Creating Site Information & Contact...');
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    name: 'Sunrise Adult Family Home LLC',
    shortName: 'Sunrise AFH',
    phone: '(206) 557-2149',
    email: 'frity1995@yahoo.com',
    address: '7902 58th PL NE, Marysville, WA 98270',
    streetAddress: '7902 58th PL NE',
    city: 'Marysville',
    state: 'WA',
    zip: '98270',
    hours: '24/7 Care & Supervision',
    licenseText: 'Licensed Adult Family Home · Marysville, Washington',
    formspreeId: 'xdavelrd',
    facebookUrl: 'https://www.facebook.com/',
    instagramUrl: 'https://www.instagram.com/',
  });

  // 2. Hero Section
  console.log('Creating Homepage Hero Section...');
  await client.createOrReplace({
    _id: 'hero',
    _type: 'hero',
    badge: '🏠 Licensed Adult Family Home · Marysville, Washington',
    titlePrefix: 'Compassionate ',
    titleHighlight: '24/7 Adult Family',
    titleSuffix: 'Home Care in Washington',
    subtitle:
      'Providing personalized care, comfort, and dignity in a safe and welcoming home environment. Your loved one deserves the very best.',
    bgImage: heroImg,
    stats: [
      { _key: 'stat1', number: '5', label: 'Bedrooms' },
      { _key: 'stat2', number: '24/7', label: 'Care & Supervision' },
      { _key: 'stat3', number: '100%', label: 'Licensed & Compliant' },
      { _key: 'stat4', number: 'WA', label: 'State Licensed' },
    ],
  });

  // 3. Rooms & Accommodations
  console.log('Creating Bedrooms & Accommodations...');
  const rooms = [
    {
      _id: 'room-1',
      _type: 'room',
      order: 1,
      title: 'Private Garden View Suite',
      status: 'Available',
      description:
        'Spacious private bedroom with large windows overlooking the landscaped backyard garden. Filled with natural light and tranquility.',
      features: [
        'Natural garden view',
        'Furnished or bring own furniture',
        'Call bell accessible',
        'Wheelchair friendly',
      ],
      image: bedroomImg,
    },
    {
      _id: 'room-2',
      _type: 'room',
      order: 2,
      title: 'Cozy Private Bedroom',
      status: 'Inquire',
      description:
        'Comfortable private room close to the main living area, ideal for residents who enjoy easy access to social spaces.',
      features: [
        'Generous closet space',
        'Cable & Wi-Fi ready',
        'Wide doorway access',
        'Warm wooden flooring',
      ],
      image: bedroomImg,
    },
    {
      _id: 'room-3',
      _type: 'room',
      order: 3,
      title: 'Quiet Retreat Bedroom',
      status: 'Occupied',
      description:
        'A peaceful private bedroom designed for rest and quiet reflection with soft lighting and calming décor.',
      features: [
        'Quiet location in home',
        'Private temperature comfort',
        'Emergency call button',
        'Freshly painted',
      ],
      image: bedroomImg,
    },
    {
      _id: 'room-4',
      _type: 'room',
      order: 4,
      title: 'Bright Morning Sun Bedroom',
      status: 'Available',
      description:
        'East-facing private bedroom with beautiful morning sunrise light. Steps from the accessible bathroom.',
      features: [
        'Morning sunlight',
        'Adjacent to accessible bath',
        'Personalized décor welcome',
        'Safety features',
      ],
      image: bedroomImg,
    },
    {
      _id: 'room-5',
      _type: 'room',
      order: 5,
      title: 'Spacious Private Room',
      status: 'Inquire',
      description:
        'Large private bedroom that comfortably accommodates specialized medical equipment or extra seating.',
      features: [
        'Largest floor plan',
        'Space for favorite recliner',
        'Direct caregiver line',
        'Hardwood-style flooring',
      ],
      image: bedroomImg,
    },
  ];

  for (const r of rooms) {
    await client.createOrReplace(r);
  }

  // 4. Care Services
  console.log('Creating Care Services...');
  const services = [
    {
      _id: 'service-personal-care',
      _type: 'service',
      order: 1,
      title: 'Personal Care & Daily Living Assistance',
      icon: '🤝',
      description:
        "Dignified, compassionate support with all activities of daily living tailored to each resident's unique care plan.",
      includes: [
        'Bathing, dressing & grooming assistance',
        'Mobility & transfer support with safety focus',
        'Incontinence care & personal hygiene',
        'Eating assistance & hydration monitoring',
        'Daily room tidying & linen service',
      ],
    },
    {
      _id: 'service-medication',
      _type: 'service',
      order: 2,
      title: 'Medication Management & Health Monitoring',
      icon: '💊',
      description:
        'Careful, systematic medication administration ensuring all prescribed medications are taken safely and on schedule.',
      includes: [
        'Scheduled prescription administration',
        'Pharmacy refill coordination',
        'Daily vital signs & wellness checks',
        'Coordination with primary care physicians',
        'Doctor appointment scheduling & transport assistance',
      ],
    },
    {
      _id: 'service-meals',
      _type: 'service',
      order: 3,
      title: 'Nutritious Home-Cooked Meals',
      icon: '🍲',
      description:
        'Three delicious, freshly prepared meals daily plus wholesome snacks, accommodating physician-prescribed dietary plans.',
      includes: [
        '3 home-cooked meals prepared daily',
        'Wholesome morning & afternoon snacks',
        'Diabetic, low-sodium, & texture-modified diets',
        'Hydration monitoring throughout the day',
        'Warm family-style dining experience',
      ],
    },
    {
      _id: 'service-memory-care',
      _type: 'service',
      order: 4,
      title: 'Dementia & Memory Care',
      icon: '🧠',
      description:
        'Specialized, empathetic care for seniors living with Alzheimer’s disease, dementia, and cognitive changes.',
      includes: [
        'Calm, secure, structured daily routine',
        'Cognitive engagement & memory stimulation',
        'Wandering prevention & secure environment',
        'Patient, de-escalating communication techniques',
        'Regular updates & emotional support for families',
      ],
    },
    {
      _id: 'service-companionship',
      _type: 'service',
      order: 5,
      title: 'Companionship & Social Activities',
      icon: '🌻',
      description:
        'A warm, family-like atmosphere where every resident feels valued, socially engaged, and part of our home community.',
      includes: [
        'Daily social interactions & group conversation',
        'Board games, puzzles, arts & crafts',
        'Music, reading & reminiscence activities',
        'Gentle movement & outdoor garden walks',
        'Holiday, birthday, & milestone celebrations',
      ],
    },
    {
      _id: 'service-safety',
      _type: 'service',
      order: 6,
      title: '24/7 Supervision & Safety Monitoring',
      icon: '🛡️',
      description:
        'Around-the-clock awake caregivers providing immediate response, continuous oversight, and peace of mind.',
      includes: [
        'Awake, trained caregivers on-site 24/7',
        'Emergency call response & immediate assistance',
        'Fall prevention protocols & safe floor design',
        'Smoke detectors, sprinklers & safety alarms',
        'Complete regulatory compliance with WA DSHS',
      ],
    },
  ];

  for (const s of services) {
    await client.createOrReplace(s);
  }

  // 5. Photo Gallery
  console.log('Creating Photo Gallery...');
  const gallery = [
    {
      _id: 'gallery-1',
      _type: 'gallery',
      order: 1,
      title: 'Living & Dining Area',
      category: 'Living & Dining',
      caption: 'Comfortable living and dining area for social meals and relaxation.',
      image: livingImg,
    },
    {
      _id: 'gallery-2',
      _type: 'gallery',
      order: 2,
      title: 'Private Bedroom',
      category: 'Bedrooms',
      caption: 'Private bedroom with warm natural light and cozy bedding.',
      image: bedroomImg,
    },
    {
      _id: 'gallery-3',
      _type: 'gallery',
      order: 3,
      title: 'Outdoor Garden & Patio',
      category: 'Outdoors & Garden',
      caption: 'Peaceful outdoor garden and patio for fresh air and sunshine.',
      image: gardenImg,
    },
    {
      _id: 'gallery-4',
      _type: 'gallery',
      order: 4,
      title: 'Personalized Care',
      category: 'Caregiving',
      caption: 'Attentive, personalized care delivered with dignity and respect.',
      image: careImg,
    },
    {
      _id: 'gallery-5',
      _type: 'gallery',
      order: 5,
      title: 'Family Visits Welcome',
      category: 'Community',
      caption: 'We warmly welcome families to visit and spend quality time.',
      image: familyImg,
    },
    {
      _id: 'gallery-6',
      _type: 'gallery',
      order: 6,
      title: 'Sunrise Home Exterior',
      category: 'Living & Dining',
      caption: 'Our welcoming residential home in a quiet Marysville neighborhood.',
      image: heroImg,
    },
  ];

  for (const g of gallery) {
    await client.createOrReplace(g);
  }

  // 6. Testimonials
  console.log('Creating Testimonials...');
  const testimonials = [
    {
      _id: 'test-1',
      _type: 'testimonial',
      order: 1,
      name: 'Sarah M.',
      relation: 'Daughter of resident',
      quote:
        'Finding Sunrise Adult Family Home was an absolute blessing. The caregivers treat my mother like their own family. She is safe, eating wonderful home-cooked meals, and happier than she has been in years.',
      rating: 5,
    },
    {
      _id: 'test-2',
      _type: 'testimonial',
      order: 2,
      name: 'David K.',
      relation: 'Son of resident',
      quote:
        'The personalized attention here is unmatched compared to large institutional facilities. I have total peace of mind knowing someone is there for my dad 24 hours a day.',
      rating: 5,
    },
    {
      _id: 'test-3',
      _type: 'testimonial',
      order: 3,
      name: 'Linda R.',
      relation: 'Family member',
      quote:
        'The home is always clean, warm, and inviting. The communication from the team is proactive and thoughtful. We couldn’t ask for a better home for our loved one.',
      rating: 5,
    },
  ];

  for (const t of testimonials) {
    await client.createOrReplace(t);
  }

  // 7. FAQs
  console.log('Creating FAQs...');
  const faqs = [
    {
      _id: 'faq-1',
      _type: 'faq',
      order: 1,
      question: 'What is an Adult Family Home (AFH)?',
      answer:
        'An Adult Family Home is a state-licensed residential home that provides personalized 24/7 care, room, board, and supervision for up to 6 adults. Unlike large institutional assisted living facilities, an AFH offers intimate, high-ratio care in a true home setting.',
      category: 'General',
    },
    {
      _id: 'faq-2',
      _type: 'faq',
      order: 2,
      question: 'How many residents live in your home?',
      answer:
        'Sunrise Adult Family Home is licensed for up to 5 residents. This small home setting ensures an exceptional caregiver-to-resident ratio, personalized routines, and individualized attention.',
      category: 'General',
    },
    {
      _id: 'faq-3',
      _type: 'faq',
      order: 3,
      question: 'What services are included in the monthly fee?',
      answer:
        'Our comprehensive care includes 24/7 awake supervision, 3 home-cooked meals plus snacks, assistance with daily living (bathing, dressing, grooming, mobility), medication management, laundry, housekeeping, and social activities.',
      category: 'Pricing & Services',
    },
    {
      _id: 'faq-4',
      _type: 'faq',
      order: 4,
      question: 'Do you accept Medicaid or private pay?',
      answer:
        'We primarily accept private pay and select long-term care insurance policies. Please contact us directly at (206) 557-2149 to discuss your specific payment options and coverage.',
      category: 'Payment',
    },
    {
      _id: 'faq-5',
      _type: 'faq',
      order: 5,
      question: 'Can family members visit whenever they want?',
      answer:
        'Yes! Family members and loved ones are warmly welcomed to visit. We consider family an essential part of our residents’ wellbeing and happiness.',
      category: 'Life at Sunrise',
    },
    {
      _id: 'faq-6',
      _type: 'faq',
      order: 6,
      question: 'How do I schedule a tour?',
      answer:
        'You can schedule a tour right here on our website via our Schedule a Tour page, or call us directly at (206) 557-2149. We would love to show you around our home!',
      category: 'Getting Started',
    },
  ];

  for (const f of faqs) {
    await client.createOrReplace(f);
  }

  console.log('✅ All website content and photos successfully seeded to Sanity!');
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
