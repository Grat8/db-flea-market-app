import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import VendorList from "./pages/VendorList";
import VendorLogin from "./pages/VendorLogin";
import VendorDetails from "./pages/VendorDetails";
import VendorDashboard from "./pages/VendorDashboard";
import ProductDetails from "./pages/ProductDetails";
import BoothList from "./pages/BoothList";
import VendorReservation from "./pages/VendorReservation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vendors" element={<VendorList />} />
        <Route path="/login" element={<VendorLogin />} />
        <Route path="/vendor/:id" element={<VendorDetails />} />
        <Route path="/stats" element={<VendorDashboard />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/booths" element={<BoothList />} />
        <Route path="/reserve" element={<VendorReservation />} />
      </Routes>
    </Router>
  );
}

export default App;
