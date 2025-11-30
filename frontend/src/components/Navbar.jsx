import React, { useState, useEffect } from "react";

export default function Navbar() {

  const [vendor, setVendor] = useState(JSON.parse(localStorage.getItem("vendor")));

  const handleLogout = () => {
    localStorage.removeItem("vendor");
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setVendor(JSON.parse(localStorage.getItem("vendor")));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <nav className="w-full flex justify-between items-center px-10 py-4 shadow bg-white">
      <div className="text-2xl font-bold">Fleamarket</div>

      <div className="flex space-x-6">
        <a href="/" className="hover:text-blue-600">Home</a>
        <a href="/vendors" className="hover:text-blue-600">Vendors</a>
      
        {/* vendor logged in only */}
        {vendor && (
          <>
            <a href="/stats" className="hover:text-blue-600">Dashboard</a>
            <a href="/booths" className="hover:text-blue-600">Booths</a>
            <a href="/reserve" className="hover:text-blue-600">Reserve Booth</a>
          </>
        )}
        
        {/* dynamic login/logout selection */}
        {vendor ? (
          <a href="/login" onClick={handleLogout} className="hover:text-blue-600">
            Logout
          </a>
        ) : (
          <a href="/login" className="hover:text-blue-600">Login</a>
        )}

        <a href="/about" className="hover:text-blue-600">About</a>
      </div>
    </nav>
  );
}
