import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function VendorRegistration() {
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg(null);

    // basic client-side validation
    if (!name.trim() || !email.trim() || !password) {
      setMsg("Please provide name, email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://db-flea-market-app.onrender.com/api/vendor/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          owner: owner.trim(),
          phone: phone.trim(),
          email: email.trim(),
          description: description.trim(),
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMsg(data.error || data.message || "Registration failed");
        setSuccess(false);
      } else {
        setSuccess(true);
        setMsg("Registration successful. Redirecting to login...");
        // optional: redirect to login after short delay
        setTimeout(() => navigate("/login"), 1200);
      }
    } catch (err) {
      console.error(err);
      setMsg("Network error - please try again.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form className="bg-white p-6 rounded-xl shadow w-full max-w-xl" onSubmit={handleRegister}>
        <h2 className="text-2xl font-bold mb-4">Vendor Registration</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            className="w-full p-2 border rounded"
            placeholder="Vendor Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full p-2 border rounded"
            placeholder="Owner Name (optional)"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />

          <input
            className="w-full p-2 border rounded"
            placeholder="Phone (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            className="w-full p-2 border rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="w-full p-2 border rounded"
            value=""
            onChange={() => {}}
            hidden
          />
        </div>

        <textarea
          rows={3}
          className="w-full p-2 mt-3 border rounded"
          placeholder="Short description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex items-center justify-between mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          <Link to="/login" className="text-sm text-blue-600 hover:underline">Already have an account?</Link>
        </div>

        {msg && (
          <p className={`mt-3 text-sm ${success ? 'text-green-600' : 'text-red-600'}`}>{msg}</p>
        )}
      </form>
    </div>
  );
}
