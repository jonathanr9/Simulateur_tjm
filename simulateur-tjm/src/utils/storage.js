// Fonctions pour faciliter l'utilisation du localStorage et sessionStorage

// LocalStorage
export const localStorage = {
  setItem: (key, value) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  },
  
  getItem: (key) => {
    if (typeof window !== 'undefined') {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  },
  
  removeItem: (key) => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
  }
};

// SessionStorage
export const sessionStorage = {
  setItem: (key, value) => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    }
  },
  
  getItem: (key) => {
    if (typeof window !== 'undefined') {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  },
  
  removeItem: (key) => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(key);
    }
  }
};
