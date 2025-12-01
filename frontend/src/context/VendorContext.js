import { createContext, useState, useContext, useEffect } from 'react';

const VendorContext = createContext();

export const VendorProvider = ({ children }) => {

    const [loggedInVendor, setLoggedInVendor] = useState(() => {
      const stored = localStorage.getItem('vendor');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Error parsing stored vendor:', e);
        }
      }
      return null;
    });

  // Save to localStorage whenever it changes
  useEffect(() => {
    if (loggedInVendor) {
      localStorage.setItem('vendor', JSON.stringify(loggedInVendor));
    }
  }, [loggedInVendor]);

  const logout = () => {
    setLoggedInVendor(null);
    localStorage.removeItem('vendor');
  };

  return (
    <VendorContext.Provider value={{ loggedInVendor, setLoggedInVendor, logout }}>
      {children}
    </VendorContext.Provider>
  );
};

export const useVendor = () => {
  const context = useContext(VendorContext);
  if (!context) {
    throw new Error('useVendor must be used within VendorProvider');
  }
  return context;
};
