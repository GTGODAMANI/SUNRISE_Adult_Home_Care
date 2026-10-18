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
  const spaceImg = await uploadImage('../public/images/space.jpg', 'space.jpg');
  const wallPicImg = await uploadImage('../public/images/wall-with-pic.jpg', 'wall-with-pic.jpg');
  const hallwayImg = await uploadImage('../public/images/hall-way.jpg', 'hall-way.jpg');
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
      image: roomImg,
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
      image: roomImg,
    },
    {
      _id: 'room-5',
      _type: 'room',
      order: 5,
      title: 'Spacious Private Suite with Walk-In Closet',
      status: 'Inquire',
      description:
        'Large private bedroom that comfortably accommodates personalized furniture and plenty of storage in the generous closet.',
      features: [
        'Large private closet',
        'Space for favorite recliner',
        'Direct caregiver line',
        'Hardwood-style flooring',
      ],
      image: closetImg,
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

  // 5. Complete Photo Gallery with All 17 Real Photos
  console.log('Uploading all 17 real photos to Photo Gallery in Sanity...');
  const gallery = [
    {
      _id: 'gallery-outside',
      _type: 'gallery',
      order: 1,
      title: 'Sunrise AFH Home Exterior',
      category: 'Living & Dining',
      caption: 'Our welcoming residential home in a quiet Marysville neighborhood.',
      image: outsideImg,
    },
    {
      _id: 'gallery-outside-photo',
      _type: 'gallery',
      order: 2,
      title: 'Front Grounds & Driveway',
      category: 'Living & Dining',
      caption: 'Well-maintained entrance with smooth, accessible walkway.',
      image: outsidePhotoImg,
    },
    {
      _id: 'gallery-outside-1',
      _type: 'gallery',
      order: 3,
      title: 'Neighborhood Setting',
      category: 'Living & Dining',
      caption: 'Safe, peaceful Marysville community setting.',
      image: outside1Img,
    },
    {
      _id: 'gallery-backyard',
      _type: 'gallery',
      order: 4,
      title: 'Private Backyard & Lawn',
      category: 'Outdoors & Garden',
      caption: 'Spacious green backyard for fresh air and outdoor relaxation.',
      image: backyardImg,
    },
    {
      _id: 'gallery-lobby',
      _type: 'gallery',
      order: 5,
      title: 'Comfortable Living Room',
      category: 'Living & Dining',
      caption: 'Bright living space with comfortable seating and natural lighting.',
      image: lobbyImg,
    },
    {
      _id: 'gallery-space',
      _type: 'gallery',
      order: 6,
      title: 'Lounge & Reception Area',
      category: 'Living & Dining',
      caption: 'Welcoming reception and conversation area for residents and visiting families.',
      image: spaceImg,
    },
    {
      _id: 'gallery-wall-pic',
      _type: 'gallery',
      order: 7,
      title: 'Home Décor & Gallery Wall',
      category: 'Living & Dining',
      caption: 'Warm, homey touches that make our facility feel like family.',
      image: wallPicImg,
    },
    {
      _id: 'gallery-hallway',
      _type: 'gallery',
      order: 8,
      title: 'Wide Accessible Hallways',
      category: 'Living & Dining',
      caption: 'Wide, well-lit corridors designed for easy walker and wheelchair navigation.',
      image: hallwayImg,
    },
    {
      _id: 'gallery-dining',
      _type: 'gallery',
      order: 9,
      title: 'Family Dining Area',
      category: 'Living & Dining',
      caption: 'Family-style dining table where residents enjoy 3 home-cooked meals daily.',
      image: diningImg,
    },
    {
      _id: 'gallery-kitchen',
      _type: 'gallery',
      order: 10,
      title: 'Modern Fully Equipped Kitchen',
      category: 'Living & Dining',
      caption: 'Clean, modern kitchen where fresh, nutritious meals and snacks are prepared.',
      image: kitchenImg,
    },
    {
      _id: 'gallery-bedroom',
      _type: 'gallery',
      order: 11,
      title: 'Private Bedroom',
      category: 'Bedrooms',
      caption: 'Comfortable private bedroom with warm daylight and peaceful atmosphere.',
      image: bedroomImg,
    },
    {
      _id: 'gallery-room',
      _type: 'gallery',
      order: 12,
      title: 'Private Room Interior',
      category: 'Bedrooms',
      caption: 'Tranquil bedroom ready for resident personalization and favorite belongings.',
      image: roomImg,
    },
    {
      _id: 'gallery-closet',
      _type: 'gallery',
      order: 13,
      title: 'Generous Bedroom Closet',
      category: 'Bedrooms',
      caption: 'Ample closet space for clothes, wardrobe, and personal belongings.',
      image: closetImg,
    },
    {
      _id: 'gallery-bathroom',
      _type: 'gallery',
      order: 14,
      title: 'Accessible Bathroom',
      category: 'Living & Dining',
      caption: 'Spacious accessible bathroom with safety-first design.',
      image: bathroomImg,
    },
    {
      _id: 'gallery-shower',
      _type: 'gallery',
      order: 15,
      title: 'Barrier-Free Walk-In Shower',
      category: 'Caregiving',
      caption: 'Walk-in shower with safety grab bars and hand-held shower wand.',
      image: showerImg,
    },
    {
      _id: 'gallery-shower-2',
      _type: 'gallery',
      order: 16,
      title: 'Step-In Safety Shower',
      category: 'Caregiving',
      caption: 'Secure bathing facility designed to prevent slips and ensure resident comfort.',
      image: shower2Img,
    },
    {
      _id: 'gallery-shower-3',
      _type: 'gallery',
      order: 17,
      title: 'Tiled Accessible Shower',
      category: 'Caregiving',
      caption: 'Clean, sanitized walk-in shower with safety support.',
      image: shower3Img,
    },
  ];

  for (const g of gallery) {
    await client.createOrReplace(g);
  }

  console.log('✅ All 17 real photos and updated documents successfully uploaded to Sanity!');
}

seed().catch((err) => {
  console.error('Seeding real photos failed:', err);
  process.exit(1);
});
