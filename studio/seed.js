import { getCliClient } from 'sanity/cli';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = getCliClient();

async function uploadImage(relPath, filename, retries = 5) {
  const fullPath = path.resolve(__dirname, relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${fullPath}`);
    return null;
  }

  // Check if asset was already uploaded
  try {
    const existing = await client.fetch(
      `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
      { filename }
    );
    if (existing) {
      console.log(`✓ Asset already exists in Sanity: ${filename} (${existing})`);
      return {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: existing,
        },
      };
    }
  } catch (e) {
    // continue
  }

  const buffer = fs.readFileSync(fullPath);
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Uploading asset: ${filename} (${(buffer.length / 1024).toFixed(0)} KB, attempt ${attempt})...`);
      const asset = await client.assets.upload('image', buffer, { filename });
      console.log(`✓ Uploaded ${filename} (${asset._id})`);
      return {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
      };
    } catch (err) {
      console.warn(`Upload attempt ${attempt} failed for ${filename}:`, err.message);
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
}

async function seed() {
  console.log('Seeding real facility photos and content to Sanity...');

  // Upload all real photos
  const outsideImg = await uploadImage('../public/images/outside.jpg', 'outside.jpg');
  const outsidePhotoImg = await uploadImage('../public/images/outside-photo.jpg', 'outside-photo.jpg');
  const outside1Img = await uploadImage('../public/images/outside-1.jpg', 'outside-1.jpg');
  const backyardImg = await uploadImage('../public/images/backyard.jpg', 'backyard.jpg');
  const bedroomImg = await uploadImage('../public/images/bedroom.jpg', 'bedroom.jpg');
  const roomImg = await uploadImage('../public/images/room.jpg', 'room.jpg');
  const closetImg = await uploadImage('../public/images/closet.jpg', 'closet.jpg');
  const lobbyImg = await uploadImage('../public/images/lobby.jpg', 'lobby.jpg');
  const lobby2Img = await uploadImage('../public/images/lobby-2.jpg', 'lobby-2.jpg');
  const spaceImg = await uploadImage('../public/images/space.jpg', 'space.jpg');
  const wallPicImg = await uploadImage('../public/images/wall-with-pic.jpg', 'wall-with-pic.jpg');
  const hallwayImg = await uploadImage('../public/images/hall-way.jpg', 'hall-way.jpg');
  const photoImg = await uploadImage('../public/images/photo.jpg', 'photo.jpg');
  const diningImg = await uploadImage('../public/images/dining.jpg', 'dining.jpg');
  const kitchenImg = await uploadImage('../public/images/kitchen.jpg', 'kitchen.jpg');
  const bathroomImg = await uploadImage('../public/images/bathroom.jpg', 'bathroom.jpg');
  const showerImg = await uploadImage('../public/images/shower.jpg', 'shower.jpg');
  const shower2Img = await uploadImage('../public/images/shower-2.jpg', 'shower-2.jpg');
  const shower3Img = await uploadImage('../public/images/shower-3.jpg', 'shower-3.jpg');

  // 1. Site Settings
  console.log('Updating Site Information & Contact...');
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

  // 2. Hero Section with Real Exterior
  console.log('Updating Homepage Hero Section with real home exterior...');
  await client.createOrReplace({
    _id: 'hero',
    _type: 'hero',
    badge: '🏠 Licensed Adult Family Home · Marysville, Washington',
    titlePrefix: 'Compassionate ',
    titleHighlight: '24/7 Adult Family',
    titleSuffix: 'Home Care in Washington',
    subtitle:
      'Providing personalized care, comfort, and dignity in a safe and welcoming home environment. Your loved one deserves the very best.',
    bgImage: outsideImg,
    stats: [
      { _key: 'stat1', number: '5', label: 'Bedrooms' },
      { _key: 'stat2', number: '24/7', label: 'Care & Supervision' },
      { _key: 'stat3', number: '100%', label: 'Licensed & Compliant' },
      { _key: 'stat4', number: 'WA', label: 'State Licensed' },
    ],
  });

  // 3. Rooms & Accommodations with Real Photos
  console.log('Updating Bedrooms & Accommodations with real photos...');
  const rooms = [
    {
      _id: 'room-1',
      _type: 'room',
      order: 1,
      title: 'Private Bedroom 1 (Furnished)',
      status: 'Available',
      description:
        'Fully furnished private bedroom with comfortable bed, floral bedding, peaceful window lighting, and quiet residential setting.',
      features: [
        'Furnished with comfortable bed',
        'Quiet residential setting',
        'Natural window lighting',
        '24/7 Caregiver call support',
      ],
      image: bedroomImg,
    },
    {
      _id: 'room-2',
      _type: 'room',
      order: 2,
      title: 'Private Bedroom 2 (Move-in Ready)',
      status: 'Inquire',
      description:
        "Clean, move-in ready private room with wood laminate flooring and window blinds — ready for your loved one's favorite personal furniture and décor.",
      features: [
        'Wood laminate flooring',
        'Large window with blinds',
        'Bring your own furniture',
        'Wheelchair friendly doorway',
      ],
      image: roomImg,
    },
    {
      _id: 'room-3',
      _type: 'room',
      order: 3,
      title: 'Private Bedroom 3 (Quiet Wing)',
      status: 'Occupied',
      description:
        'A peaceful private bedroom designed for rest and quiet reflection with soft lighting and calming atmosphere.',
      features: [
        'Quiet location in home',
        'Private temperature comfort',
        'Emergency call button',
        'Furnished or unfurnished',
      ],
      image: bedroomImg,
    },
    {
      _id: 'room-4',
      _type: 'room',
      order: 4,
      title: 'Private Bedroom 4 (Sunny East Wing)',
      status: 'Available',
      description:
        'Bright private bedroom with warm morning sunrise light, smooth wood-style flooring, and close access to the accessible walk-in shower.',
      features: [
        'Morning sunlight',
        'Adjacent to accessible bath',
        'Personalized décor welcome',
        'Safety features',
      ],
      image: roomImg,
    },
    {
      _id: 'room-5',
      _type: 'room',
      order: 5,
      title: 'Private Bedroom 5 (Spacious Suite)',
      status: 'Inquire',
      description:
        'Spacious private bedroom with wood-style flooring, large built-in wardrobe closet, and ample room for personal furniture and a favorite recliner.',
      features: [
        'Generous built-in closet',
        'Space for favorite recliner',
        'Direct caregiver call line',
        'Hardwood-style flooring',
      ],
      image: roomImg,
    },
  ];

  for (const r of rooms) {
    await client.createOrReplace(r);
  }

  // 4. Care Services
  console.log('Updating Care Services...');
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

  // 5. Complete Photo Gallery with All 19 Real Photos
  console.log('Uploading all 19 real photos to Photo Gallery in Sanity...');
  const gallery = [
    {
      _id: 'gallery-outside',
      _type: 'gallery',
      order: 1,
      title: 'Sunrise AFH Home Exterior',
      category: 'Exterior & Grounds',
      caption: 'Our welcoming residential home in a quiet Marysville neighborhood.',
      image: outsideImg,
    },
    {
      _id: 'gallery-outside-photo',
      _type: 'gallery',
      order: 2,
      title: 'Front Walkway & Entrance',
      category: 'Exterior & Grounds',
      caption: 'Well-maintained entrance with smooth, barrier-free accessible walkway.',
      image: outsidePhotoImg,
    },
    {
      _id: 'gallery-outside-1',
      _type: 'gallery',
      order: 3,
      title: 'Quiet Residential Setting',
      category: 'Exterior & Grounds',
      caption: 'Safe, peaceful Marysville community setting.',
      image: outside1Img,
    },
    {
      _id: 'gallery-backyard',
      _type: 'gallery',
      order: 4,
      title: 'Spacious Fenced Backyard',
      category: 'Exterior & Grounds',
      caption: 'Large green lawn and fenced backyard for fresh air and outdoor relaxation.',
      image: backyardImg,
    },
    {
      _id: 'gallery-lobby',
      _type: 'gallery',
      order: 5,
      title: 'Comfortable Main Living Room',
      category: 'Living & Common Areas',
      caption: 'Bright living space with comfortable seating and natural lighting.',
      image: lobbyImg,
    },
    {
      _id: 'gallery-lobby-2',
      _type: 'gallery',
      order: 6,
      title: 'Resident Lounge & Seating',
      category: 'Living & Common Areas',
      caption: 'Relaxing living area for conversation, reading, and social activities.',
      image: lobby2Img,
    },
    {
      _id: 'gallery-space',
      _type: 'gallery',
      order: 7,
      title: 'Cozy Lounge & Visiting Area',
      category: 'Living & Common Areas',
      caption: 'Welcoming reception and conversation area for residents and visiting families.',
      image: spaceImg,
    },
    {
      _id: 'gallery-wall-pic',
      _type: 'gallery',
      order: 8,
      title: 'Home Décor & Accents',
      category: 'Living & Common Areas',
      caption: 'Warm, homey touches and framed artwork that make our facility feel like family.',
      image: wallPicImg,
    },
    {
      _id: 'gallery-hallway',
      _type: 'gallery',
      order: 9,
      title: 'Wide Accessible Hallways',
      category: 'Living & Common Areas',
      caption: 'Wide, well-lit corridors designed for easy walker and wheelchair navigation.',
      image: hallwayImg,
    },
    {
      _id: 'gallery-photo',
      _type: 'gallery',
      order: 10,
      title: 'Interior Living Space',
      category: 'Living & Common Areas',
      caption: 'Clean, bright interior connecting bedrooms to main living areas.',
      image: photoImg,
    },
    {
      _id: 'gallery-dining',
      _type: 'gallery',
      order: 11,
      title: 'Family Dining Area',
      category: 'Dining & Kitchen',
      caption: 'Family-style dining table where residents enjoy 3 home-cooked meals daily.',
      image: diningImg,
    },
    {
      _id: 'gallery-kitchen',
      _type: 'gallery',
      order: 12,
      title: 'Modern Fully Equipped Kitchen',
      category: 'Dining & Kitchen',
      caption: 'Clean, modern kitchen where fresh, nutritious meals and snacks are prepared.',
      image: kitchenImg,
    },
    {
      _id: 'gallery-bedroom',
      _type: 'gallery',
      order: 13,
      title: 'Furnished Private Bedroom',
      category: 'Bedrooms',
      caption: 'Comfortable private bedroom with made bed, warm daylight, and peaceful atmosphere.',
      image: bedroomImg,
    },
    {
      _id: 'gallery-room',
      _type: 'gallery',
      order: 14,
      title: 'Move-In Ready Private Room',
      category: 'Bedrooms',
      caption: 'Tranquil bedroom with wood laminate flooring and window blinds, ready for personal furniture.',
      image: roomImg,
    },
    {
      _id: 'gallery-closet',
      _type: 'gallery',
      order: 15,
      title: 'Built-In Bedroom Closet',
      category: 'Bedrooms',
      caption: 'Ample closet space with double doors for clothes, wardrobe, and personal belongings.',
      image: closetImg,
    },
    {
      _id: 'gallery-bathroom',
      _type: 'gallery',
      order: 16,
      title: 'Accessible Bathroom Vanity',
      category: 'Bathrooms & Showers',
      caption: 'Spacious accessible bathroom with safety-first design, wide mirror, and vanity.',
      image: bathroomImg,
    },
    {
      _id: 'gallery-shower',
      _type: 'gallery',
      order: 17,
      title: 'Barrier-Free Walk-In Shower',
      category: 'Bathrooms & Showers',
      caption: 'Walk-in shower with safety grab bars and hand-held shower wand.',
      image: showerImg,
    },
    {
      _id: 'gallery-shower-2',
      _type: 'gallery',
      order: 18,
      title: 'Step-In Safety Shower',
      category: 'Bathrooms & Showers',
      caption: 'Secure bathing facility with vertical grab bar to ensure resident comfort and prevent slips.',
      image: shower2Img,
    },
    {
      _id: 'gallery-shower-3',
      _type: 'gallery',
      order: 19,
      title: 'Tiled Accessible Shower',
      category: 'Bathrooms & Showers',
      caption: 'Clean, sanitized walk-in shower with safety support.',
      image: shower3Img,
    },
  ];

  for (const g of gallery) {
    await client.createOrReplace(g);
  }

  console.log('✅ All 19 real photos and updated documents successfully uploaded to Sanity!');
}

seed().catch((err) => {
  console.error('Seeding real photos failed:', err);
  process.exit(1);
});
