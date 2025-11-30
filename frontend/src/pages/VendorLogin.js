import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function VendorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const vendor = localStorage.getItem("vendor");
    if (vendor) {
      const { vendor_id } = JSON.parse(vendor);
      navigate(`/vendor/${vendor_id}`);
    }
  }, [navigate]);

  // if redirected from forgot-password page, show success message and optionally prefill email
  useEffect(() => {
    if (location?.state) {
      const { successMessage, email: prefillEmail } = location.state;
      if (successMessage) setMsg(successMessage);
      if (prefillEmail) setEmail(prefillEmail);
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/vendor/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("vendor", JSON.stringify(data));   // save login to local storage
      window.dispatchEvent(new Event("storage"));  // auto-updates navbar
      navigate(`/vendor/${data.vendor_id}`);
    } else {
      setMsg(data.error || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-xl shadow w-96" onSubmit={handleLogin}>
        <h2 className="text-xl font-bold mb-4">Vendor Login</h2>

        <input
          className="w-full p-2 mb-3 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-3 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
          <div className="flex items-center justify-between mb-3">
            <Link to="/register" className="text-sm text-blue-600 hover:underline">New to the system? Register here</Link>
            <Link to="/forgot-password" className="text-sm text-red-600 hover:underline">Forgot password?</Link>
          </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>

        {msg && <p className="mt-3 text-center text-sm text-red-500">{msg}</p>}
        {/* forgot-password handled on its own page */}
      </form>
    </div>
  );
}
