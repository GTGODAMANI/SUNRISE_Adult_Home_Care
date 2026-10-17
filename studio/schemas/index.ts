import { defineType, defineField } from 'sanity';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Information & Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Facility Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Sunrise Adult Family Home LLC',
    }),
    defineField({
      name: 'shortName',
      title: 'Short Logo Name',
      type: 'string',
      initialValue: 'Sunrise AFH',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number (Formatted)',
      type: 'string',
      description: 'e.g. (206) 557-2149',
      validation: (Rule) => Rule.required(),
      initialValue: '(206) 557-2149',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
      initialValue: 'frity1995@yahoo.com',
    }),
    defineField({
      name: 'address',
      title: 'Full Address',
      type: 'string',
      initialValue: '7902 58th PL NE, Marysville, WA 98270',
    }),
    defineField({
      name: 'streetAddress',
      title: 'Street Address',
      type: 'string',
      initialValue: '7902 58th PL NE',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      initialValue: 'Marysville',
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      initialValue: 'WA',
    }),
    defineField({
      name: 'zip',
      title: 'Zip Code',
      type: 'string',
      initialValue: '98270',
    }),
    defineField({
      name: 'hours',
      title: 'Hours / Availability Notice',
      type: 'string',
      initialValue: '24/7 Care & Supervision',
    }),
    defineField({
      name: 'licenseText',
      title: 'License Badge Text',
      type: 'string',
      initialValue: 'Licensed Adult Family Home · Marysville, Washington',
    }),
    defineField({
      name: 'formspreeId',
      title: 'Formspree Form ID (for emails)',
      type: 'string',
      description: 'The Formspree form ID where website inquiries are sent',
      initialValue: 'xdavelrd',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook Page URL',
      type: 'url',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram Page URL',
      type: 'url',
    }),
  ],
});

export const heroType = defineType({
  name: 'hero',
  title: 'Homepage Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Top Badge Pill',
      type: 'string',
      initialValue: '🏠 Licensed Adult Family Home · Marysville, Washington',
    }),
    defineField({
      name: 'titlePrefix',
      title: 'Headline Start',
      type: 'string',
      initialValue: 'Compassionate ',
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Headline Highlight (Colored text)',
      type: 'string',
      initialValue: '24/7 Adult Family',
    }),
    defineField({
      name: 'titleSuffix',
      title: 'Headline End',
      type: 'string',
      initialValue: 'Home Care in Washington',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subheading Paragraph',
      type: 'text',
      rows: 3,
      initialValue:
        'Providing personalized care, comfort, and dignity in a safe and welcoming home environment. Your loved one deserves the very best.',
    }),
    defineField({
      name: 'bgImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'stats',
      title: 'Stats Bar (Key Highlights)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', title: 'Number / Metric', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
        },
      ],
    }),
  ],
});

export const roomType = defineType({
  name: 'room',
  title: 'Bedrooms & Accommodations',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Room Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'status',
      title: 'Availability Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available Now', value: 'Available' },
          { title: 'Inquire for Details', value: 'Inquire' },
          { title: 'Occupied', value: 'Occupied' },
        ],
        layout: 'radio',
      },
      initialValue: 'Available',
    }),
    defineField({
      name: 'image',
      title: 'Room Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'features',
      title: 'Room Features & Amenities',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});

export const serviceType = defineType({
  name: 'service',
  title: 'Care Services',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'icon',
      title: 'Icon or Emoji',
      type: 'string',
      description: 'e.g. 🤝, 💊, 🍲, 🧠, 🌻, 🛡️',
      initialValue: '🤝',
    }),
    defineField({
      name: 'description',
      title: 'Short Summary',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'includes',
      title: 'Included Items Checklist',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});

export const galleryType = defineType({
  name: 'gallery',
  title: 'Photo Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Photo Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Bedrooms', 'Living & Dining', 'Outdoors & Garden', 'Caregiving', 'Community'],
      },
      initialValue: 'Living & Dining',
    }),
    defineField({
      name: 'image',
      title: 'Image File',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption / Alt Text',
      type: 'string',
    }),
  ],
});

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonials & Reviews',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Family / Resident Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relation',
      title: 'Relationship to Resident',
      type: 'string',
      description: 'e.g. Daughter of resident, Son of resident',
      initialValue: 'Daughter of resident',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'quote',
      title: 'Review Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating (1-5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      initialValue: 5,
    }),
  ],
});

export const faqType = defineType({
  name: 'faq',
  title: 'Frequently Asked Questions (FAQ)',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      initialValue: 'General',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
    }),
  ],
});

export const schemaTypes = [
  siteSettingsType,
  heroType,
  roomType,
  serviceType,
  galleryType,
  testimonialType,
  faqType,
];
