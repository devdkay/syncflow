const CALENDLY_URL = 'https://calendly.com/syncflow-ca/30min';

type CalendlyWindow = Window & {
  Calendly?: {
    initPopupWidget: (options: { url: string }) => void;
  };
};

export function openCalendlyPopup() {
  const calendly = (window as CalendlyWindow).Calendly;

  if (calendly) {
    calendly.initPopupWidget({ url: CALENDLY_URL });
    return;
  }

  window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
}
