import React, { useState } from "react";
import "./VendorReservationPage.css";

const VendorReservationPage: React.FC = () => {
    const [vendorName, setVendorName] = useState("");
    const [vendorEmail, setVendorEmail] = useState("");
    const [vendorPhone, setVendorPhone] = useState("");

    const [selectedBooth, setSelectedBooth] = useState("");
    const [selectedTimes, setSelectedTimes] = useState("");

    return (
        <div className="vendor-page-container">

            {/* Vendor Registration Section */}
            <div className="section">
                <h2 className="section-title">Vendor Registration</h2>
                <hr className="section-divider" />

                <form className="vendor-form">
                    <label>
                        Vendor Name
                        <input
                            type="text"
                            value={vendorName}
                            onChange={(e) => setVendorName(e.target.value)}
                        />
                    </label>

                    <label>
                        Email
                        <input
                            type="email"
                            value={vendorEmail}
                            onChange={(e) => setVendorEmail(e.target.value)}
                        />
                    </label>

                    <label>
                        Phone
                        <input
                            type="text"
                            value={vendorPhone}
                            onChange={(e) => setVendorPhone(e.target.value)}
                        />
                    </label>
                </form>
            </div>


            {/* Booth Reservation Section */}
            <div className="section">
                <h2 className="section-title">Booth Reservation</h2>
                <hr className="section-divider" />

                <div className="booth-form">
                    <label>
                        Select Booth
                        <select
                            value={selectedBooth}
                            onChange={(e) => setSelectedBooth(e.target.value)}
                        >
                            <option value="">-- Choose Booth --</option>
                            <option value="1">Booth 1</option>
                            <option value="2">Booth 2</option>
                            <option value="3">Booth 3</option>
                        </select>
                    </label>

                    <label>
                        Time Slot
                        <select
                            value={selectedTimes}
                            onChange={(e) => setSelectedTimes(e.target.value)}
                        >
                            <option value="">-- Choose Time --</option>
                            <option value="8am-10am">8am - 10am</option>
                            <option value="10am-12pm">10am - 12pm</option>
                            <option value="12pm-2pm">12pm - 2pm</option>
                        </select>
                    </label>

                    <button className="submit-button">Submit Registration</button>
                </div>
            </div>

        </div>
    );
};

export default VendorReservationPage;
