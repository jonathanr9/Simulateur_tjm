// Fonctions pour le localStorage et sessionStorage

export const localStore = {
  setItem: (key, value) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  },
  
  getItem: (key) => {
    if (typeof window !== 'undefined') {
      const item = window.localStorage.getItem(key);
      try {
        return item ? JSON.parse(item) : null;
      } catch (e) {
        console.error("Erreur de parsing:", e);
        return null;
      }
    }
    return null;
  },
  
  removeItem: (key) => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
  }
};

export const sessionStore = {
  setItem: (key, value) => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    }
  },
  
  getItem: (key) => {
    if (typeof window !== 'undefined') {
      const item = window.sessionStorage.getItem(key);
      try {
        return item ? JSON.parse(item) : null;
      } catch (e) {
        console.error("Erreur de parsing:", e);
        return null;
      }
    }
    return null;
  },
  
  removeItem: (key) => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(key);
    }
  }
};
