import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [owner, setOwner] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);

    if (!email.trim() || !newPassword) {
      setMsg('Email and new password are required');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/vendor/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), phone: phone.trim(), owner: owner.trim(), newPassword }),
      });
      const json = await res.json();
      if (!res.ok) {
        setMsg(json.error || 'Failed to update password');
      } else {
        // success: navigate back to login and pass success message and prefill email
        navigate('/login', { state: { successMessage: json.message || 'Password updated', email: email.trim() } });
      }
    } catch (err) {
      console.error(err);
      setMsg('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form className="bg-white p-6 rounded-xl shadow w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

        <input
          className="w-full p-2 mb-3 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 mb-3 border rounded"
          placeholder="Phone (as on your vendor record)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="w-full p-2 mb-3 border rounded"
          placeholder="Owner name (as on your vendor record)"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-3 border rounded"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <div className="flex items-center justify-between">
          <button type="submit" disabled={loading} className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}>
            {loading ? 'Saving...' : 'Set new password'}
          </button>
          <button type="button" onClick={() => navigate('/login')} className="text-sm text-blue-600 hover:underline">Back to login</button>
        </div>

        {msg && <p className="mt-3 text-sm text-red-600">{msg}</p>}
      </form>
    </div>
  );
}
