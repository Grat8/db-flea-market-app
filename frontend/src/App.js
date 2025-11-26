import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import VendorList from "./pages/VendorList";
import VendorLogin from "./pages/VendorLogin";
import VendorDetails from "./pages/VendorDetails";
import VendorDashboard from "./pages/VendorDashboard";
import ProductDetails from "./pages/ProductDetails";
import BoothListingPage from "./pages/BoothListingPage";
import VendorReservationPage from "./pages/VendorReservationPage";
import VendorRegistration from "./pages/VendorRegistration";

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vendors" element={<VendorList />} />
          <Route path="/login" element={<VendorLogin />} />
          <Route path="/register" element={<VendorRegistration />} />
          <Route path="/vendor/:id" element={<VendorDetails />} />
          <Route path="/stats" element={<VendorDashboard />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/booths" element={<BoothListingPage />} />
          <Route path="/reserve" element={<VendorReservationPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
