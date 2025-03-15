// Capture et stocke les paramètres UTM
export const captureUtmParams = () => {
  if (typeof window !== 'undefined') {
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
      
      localStorage.setItem('utm_params', JSON.stringify(params));
      return params;
    }
    
    // Récupérer les UTM stockés précédemment si disponibles
    const storedUtm = localStorage.getItem('utm_params');
    if (storedUtm) {
      return JSON.parse(storedUtm);
    }
  }
  
  return null;
};
