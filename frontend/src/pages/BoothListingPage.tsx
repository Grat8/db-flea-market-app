import React from 'react';
import "./BoothListingPage.css";
// import { useState } from "react";

interface Booth {
    id: number;
    reserved: boolean;
    vendor: String | null;
    reservedTimes: String | null;
}

// TODO need to update to use DB, this is dummy data
const booths: Booth[] = [
    { id: 1, reserved: false, vendor: null, reservedTimes: null},
    { id: 2, reserved: true, vendor: "Paul", reservedTimes: "11-7-2025:11:00-12:00"},
    { id: 3, reserved: false, vendor: null, reservedTimes: null},
    { id: 4, reserved: true, vendor: "John", reservedTimes: "11-7-2025:11:00-12:00"},
    { id: 5, reserved: false, vendor: null, reservedTimes: null},
    { id: 6, reserved: false, vendor: null, reservedTimes: null},
    { id: 7, reserved: false, vendor: null, reservedTimes: null},
    { id: 8, reserved: false, vendor: null, reservedTimes: null},
    { id: 9, reserved: true, vendor: "James", reservedTimes: "11-7-2025:11:00-12:00"},
    { id: 10, reserved: false, vendor: null, reservedTimes: null},
];

export default function BoothListingPage() {
    // const [state, setState] = useState<boolean>() // change
    const reservedBooths = booths.filter(b => b.vendor !== null && b.reserved);

    return (
        <div className="booth-listing-page">
            <div className="booth-page-container">
                <h1 className="page-title">Booth Availability</h1>
                <hr className="availability-divider" />

                {/* Legend */}
                <div className="legend-container">
                    <div className="legend-item">
                        <div className="legend-color available"></div>
                        <span>Available</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color reserved"></div>
                        <span>Reserved</span>
                    </div>
                </div>

                {/* Booth Grid */}
                <div className="booth-grid-container">
                    <div className="booth-grid">
                        {booths.map((booth) => (
                            <div
                                key={booth.id}
                                className={`booth-tile ${booth.reserved ? "reserved" : "available"}`}
                            >
                                Booth {booth.id}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="booth-details">
                <h2 className="booth-details-title">Booth Details</h2>
                <hr className="details-divider" />

                {reservedBooths.length === 0 ? (
                    <p className="no-details">No reserved booths.</p>
                ) : (
                    <div className="details-table-container">
                        <table className="details-table">
                            <thead>
                            <tr>
                                <th>Booth #</th>
                                <th>Vendor Name</th>
                                <th>Time Reserved</th>
                            </tr>
                            </thead>
                            <tbody>
                            {reservedBooths.map((b) => (
                                <tr key={b.id}>
                                    <td>{b.id}</td>
                                    <td>{b.vendor}</td>
                                    <td>{b.reservedTimes}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}