// Capture et stocke les paramètres UTM
import { localStore } from './storage';

export const captureUtmParams = () => {
  if (typeof window === 'undefined') return null;
  
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source');
  const utmMedium = urlParams.get('utm_medium');
  const utmCampaign = urlParams.get('utm_campaign');
  
  if (utmSource || utmMedium || utmCampaign) {
    const params = {
      source: utmSource,
      medium: utmMedium,
      campaign: utmCampaign,
      timestamp: new Date().toISOString()
    };
    
    localStore.setItem('utm_params', params);
    return params;
  }
  
  // Récupérer les UTM stockés précédemment si disponibles
  return localStore.getItem('utm_params');
};
