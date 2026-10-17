import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import {
  defaultSiteSettings,
  defaultHero,
  defaultServices,
  defaultRooms,
  defaultGallery,
  defaultTestimonials,
  defaultFaqs,
  type SiteSettings,
  type HeroData,
  type ServiceItem,
  type RoomItem,
  type GalleryItem,
  type TestimonialItem,
  type FaqItem,
} from './defaultData';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID || '';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || process.env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-01-01';

export const isSanityConfigured = Boolean(projectId);

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

export function urlFor(source: any): string {
  if (!source) return '';
  if (typeof source === 'string') return source;
  if (builder && source.asset) {
    try {
      return builder.image(source).auto('format').fit('max').url();
    } catch (e) {
      return '';
    }
  }
  return '';
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!client) return defaultSiteSettings;
  try {
    const data = await client.fetch(`*[_type == "siteSettings"][0]`);
    if (!data) return defaultSiteSettings;
    return {
      ...defaultSiteSettings,
      ...data,
      phoneTel: data.phone ? data.phone.replace(/[^0-9+]/g, '') : defaultSiteSettings.phoneTel,
    };
  } catch (err) {
    console.warn('Sanity fetch failed for siteSettings, using default data:', err);
    return defaultSiteSettings;
  }
}

export async function getHero(): Promise<HeroData> {
  if (!client) return defaultHero;
  try {
    const data = await client.fetch(`*[_type == "hero"][0]`);
    if (!data) return defaultHero;
    return {
      badge: data.badge || defaultHero.badge,
      titlePrefix: data.titlePrefix ?? defaultHero.titlePrefix,
      titleHighlight: data.titleHighlight ?? defaultHero.titleHighlight,
      titleSuffix: data.titleSuffix ?? defaultHero.titleSuffix,
      subtitle: data.subtitle || defaultHero.subtitle,
      bgImage: data.bgImage ? urlFor(data.bgImage) : defaultHero.bgImage,
      stats: data.stats || defaultHero.stats,
    };
  } catch (err) {
    console.warn('Sanity fetch failed for hero, using default data:', err);
    return defaultHero;
  }
}

export async function getServices(): Promise<ServiceItem[]> {
  if (!client) return defaultServices;
  try {
    const data = await client.fetch(`*[_type == "service"] | order(order asc)`);
    if (!data || data.length === 0) return defaultServices;
    return data.map((item: any) => ({
      id: item._id,
      title: item.title,
      icon: item.icon || '⭐',
      description: item.description,
      includes: item.includes || [],
    }));
  } catch (err) {
    console.warn('Sanity fetch failed for services, using default data:', err);
    return defaultServices;
  }
}

export async function getRooms(): Promise<RoomItem[]> {
  if (!client) return defaultRooms;
  try {
    const data = await client.fetch(`*[_type == "room"] | order(order asc)`);
    if (!data || data.length === 0) return defaultRooms;
    return data.map((item: any) => ({
      id: item._id,
      title: item.title,
      status: item.status || 'Available',
      description: item.description,
      features: item.features || [],
      image: item.image ? urlFor(item.image) : '/images/bedroom.png',
    }));
  } catch (err) {
    console.warn('Sanity fetch failed for rooms, using default data:', err);
    return defaultRooms;
  }
}

export async function getGallery(): Promise<GalleryItem[]> {
  if (!client) return defaultGallery;
  try {
    const data = await client.fetch(`*[_type == "gallery"] | order(order asc)`);
    if (!data || data.length === 0) return defaultGallery;
    return data.map((item: any) => ({
      title: item.title,
      category: item.category || 'General',
      image: item.image ? urlFor(item.image) : '/images/hero-bg.png',
      caption: item.caption || item.title,
    }));
  } catch (err) {
    console.warn('Sanity fetch failed for gallery, using default data:', err);
    return defaultGallery;
  }
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  if (!client) return defaultTestimonials;
  try {
    const data = await client.fetch(`*[_type == "testimonial"] | order(order asc)`);
    if (!data || data.length === 0) return defaultTestimonials;
    return data.map((item: any) => ({
      name: item.name,
      relation: item.relation || 'Family member',
      quote: item.quote,
      rating: item.rating || 5,
    }));
  } catch (err) {
    console.warn('Sanity fetch failed for testimonials, using default data:', err);
    return defaultTestimonials;
  }
}

export async function getFaqs(): Promise<FaqItem[]> {
  if (!client) return defaultFaqs;
  try {
    const data = await client.fetch(`*[_type == "faq"] | order(order asc)`);
    if (!data || data.length === 0) return defaultFaqs;
    return data.map((item: any) => ({
      question: item.question,
      answer: item.answer,
      category: item.category || 'General',
    }));
  } catch (err) {
    console.warn('Sanity fetch failed for faqs, using default data:', err);
    return defaultFaqs;
  }
}
