export const siteSections = [
  { id: '', label: 'Close popup only' },
  { id: 'hero', label: 'Top of homepage' },
  { id: 'about', label: 'About SyncFlow' },
  { id: 'services', label: 'Services' },
  { id: 'demo', label: 'Live Demos' },
  { id: 'industries', label: 'Industries' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'pricing', label: 'Pricing Packages' },
  { id: 'portfolio', label: 'Impact / Portfolio' },
  { id: 'testimonials', label: 'Client Reviews' },
  { id: 'contact', label: 'Contact Form' },
] as const;

export type SiteSectionId = (typeof siteSections)[number]['id'];

export function scrollToSiteSection(sectionId: string) {
  if (!sectionId) return;

  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
