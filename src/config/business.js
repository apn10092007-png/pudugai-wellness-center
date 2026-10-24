// Official verified business details and WhatsApp helpers for Pudugai Wellness Center (PWC)

const getEnvVar = (key) => {
  if (typeof import.meta !== 'undefined' && import.meta.env && typeof import.meta.env[key] !== 'undefined') {
    return import.meta.env[key];
  }
  if (typeof process !== 'undefined' && process.env && typeof process.env[key] !== 'undefined') {
    return process.env[key];
  }
  return '';
};

export const BUSINESS_CONFIG = {
  name: 'Pudugai Wellness Center',
  shortName: 'PWC',
  coach: 'Thangapandian S',
  phoneDisplay: '94434 43261',
  phoneRaw: '9443443261',

  // Verified business WhatsApp number for PWC: +91 94434 43261
  // Can be configured / overridden via VITE_PWC_WHATSAPP_NUMBER in .env
  whatsappNumber: (getEnvVar('VITE_PWC_WHATSAPP_NUMBER') || '919443443261').replace(/\D/g, ''),

  instagram: 'https://www.instagram.com/coach_pandian?exln=YmNsbjZkeXQ1dnc3',
  googleMaps: 'https://maps.app.goo.gl/JAdNVeq53M3PdrW1A',

  addressEn: 'E Main Rd, T Nagar, Buvaneswari Nagar, Pudukkottai, Tamil Nadu 622001',
  addressTa: 'கிழக்கு முதன்மை சாலை, டி நகர், புவனேஸ்வரி நகர், புதுக்கோட்டை, தமிழ்நாடு 622001',
};

/**
 * Constructs the prefilled WhatsApp message in the exact required format:
 *
 * Hello Pudugai Wellness Center!
 *
 * Name: [customer name]
 * Phone: [customer phone]
 * Service: [selected service]
 * Details: [customer message or "Not provided"]
 */
export const buildWhatsAppMessage = ({ name, phone, service, message }) => {
  const customerName = name?.trim() || 'Not provided';
  const customerPhone = phone?.trim() || 'Not provided';
  const selectedService = service?.trim() || 'General Wellness Consultation';
  const customerDetails = message?.trim() || 'Not provided';

  return `Hello Pudugai Wellness Center!\n\nName: ${customerName}\nPhone: ${customerPhone}\nService: ${selectedService}\nDetails: ${customerDetails}`;
};

/**
 * Returns a fully URL-encoded https://wa.me/ link for the verified business recipient
 */
export const getWhatsAppUrl = ({ name, phone, service, message, recipientNumber }) => {
  const recipient = (recipientNumber || BUSINESS_CONFIG.whatsappNumber).replace(/\D/g, '');
  const rawText = buildWhatsAppMessage({ name, phone, service, message });
  return `https://wa.me/${recipient}?text=${encodeURIComponent(rawText)}`;
};
