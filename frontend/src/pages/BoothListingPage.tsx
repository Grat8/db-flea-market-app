import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BoothListingPage.css";

export default function BoothListingPage() {

  const navigate = useNavigate(); // for navigating to reservations page

  const [booths, setBooths] = useState<any[]>([]);
  const tdate = new Date();
  const [selectedDay, setSelectedDay] = useState(`${tdate.getFullYear()}-${String(tdate.getMonth() + 1).padStart(2, '0')}-${String(tdate.getDate()).padStart(2, '0')}`);
  const [selectedHour, setSelectedHour] = useState("");

  const containerSize = 400; // map size

useEffect(() => {
  const loadBooths = async () => {
    try {
      const [boothRes, reservationRes] = await Promise.all([
        axios.get("https://db-flea-market-app.onrender.com/api/booth"),
        axios.get(`https://db-flea-market-app.onrender.com/api/reservations?date=${selectedDay}`)
      ]);

      const boothsData = boothRes.data;
      const reservationsData = reservationRes.data;
      const reservedMap: Record<number, { start: number; duration: number; vendorName: string }[]> = {};

      reservationsData.forEach((r: any) => {
        const boothId = r.bid;

        const start = new Date(r.date);
        const day = start.toISOString().split('T')[0];
        const startHour = start.getHours();

        if (!reservedMap[boothId]) reservedMap[boothId] = [];
        reservedMap[boothId].push({
          start: startHour,
          duration: r.duration,
          vendorName: r.vendor_name,
        });
      });

      // map booths with reservations
      const boothsWithReservations = boothsData.map((b: any) => ({
        ...b,
        reservedSlots: {
          [selectedDay]: reservedMap[b.id] || []
        }
      }));

      setBooths(boothsWithReservations);
    } catch (err) {
      console.error("Error loading booths:", err);
    }
  };

  loadBooths();
}, [selectedDay]);



  // scale map dimensions based on booth (x,y) coordinates
  const maxX = Math.max(...booths.map((b) => b.xcor), 0);
  const maxY = Math.max(...booths.map((b) => b.ycor), 0);
  const scaleX = containerSize / (maxX + 5); // padding
  const scaleY = containerSize / (maxY + 5);
  const SCALE = Math.min(scaleX, scaleY);

  const hours = Array.from({ length: 9 }, (_, i) => 7 + i); // market open from 7am-4pm (7-16 military time used)

  const hoursToRange = (hours: number[]) => {
    if (!hours || hours.length === 0) return "";
    const sorted = [...hours].sort((a, b) => a - b);
    return `${sorted[0]}:00 - ${sorted[sorted.length - 1] + 1}:00`;
  };

  return (
    <div className="booth-listing-page">
      <h1 className="page-title">Booth Layout</h1>
      <hr className="availability-divider" />

      {/* Day + Hour selectors */}
      <div className="selectors">
        <label>
          Select Day:
          <input
            type="date"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          />
        </label>

        <label>
          Select Hour:
          <select
            value={selectedHour}
            onChange={(e) => setSelectedHour(e.target.value)}
          >
            <option value="">All hours</option>
            {hours.map((h) => (
              <option key={h} value={h}>
                {h}:00
              </option>
            ))}
          </select>
        </label>
      </div>

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

      {/* Booth Map */}
      <div
        className="booth-map"
        style={{ width: containerSize, height: containerSize }}
      >
        {booths.map((b) => {
          let isReserved = false;

          if (selectedDay && b.reservedSlots) {
            const dayReservations = b.reservedSlots[selectedDay] || [];
            const allReservedHours = dayReservations.flatMap((r: any) =>
              Array.from({ length: r.duration }, (_, i) => r.start + i)
            );

            if (selectedHour) {
              isReserved = allReservedHours.includes(Number(selectedHour));
            } else {
              isReserved = allReservedHours.length > 0;
            }
          }

          return (
            <div
              key={b.id}
              className={`booth-tile ${isReserved ? "reserved" : "available"}`}
              style={{
                left: `${b.xcor * SCALE - 50}px`,
                top: `${b.ycor * SCALE - 50}px`,
              }}
              title={isReserved ? "Reserved" : "Available"}
            >
              {b.id}
            </div>
          );
        })}
      </div>

      {/* Reserved Booths Table */}
      <div className="booth-details">
        <h2 className="booth-details-title">Reserved Booth Timeslots</h2>
        <hr className="details-divider" />

        {selectedDay ? (
          booths.flatMap((b) => {
            const dayReservations = b.reservedSlots[selectedDay] || [];
            return dayReservations.map((r: any) => ({
              boothId: b.id,
              hours: Array.from({ length: r.duration }, (_, i) => r.start + i),
              vendorName: r.vendorName,
            }));
          }).filter((r) =>
            selectedHour ? r.hours.includes(Number(selectedHour)) : r.hours.length > 0
          ).length === 0 ? (
            <p className="no-details">No reserved booths at this time.</p>
          ) : (
            <table className="details-table">
              <thead>
                <tr>
                  <th>Booth #</th>
                  <th>Vendor</th>
                  <th>Reserved Hours</th>
                </tr>
              </thead>
              <tbody>
                {booths.flatMap((b) => {
                  const dayReservations = b.reservedSlots[selectedDay] || [];
                  return dayReservations.map((r: any) => ({
                    boothId: b.id,
                    hours: Array.from({ length: r.duration }, (_, i) => r.start + i),
                    vendorName: r.vendorName,
                  }));
                })
                .filter((r) =>
                  selectedHour ? r.hours.includes(Number(selectedHour)) : r.hours.length > 0
                )
                .map((r, idx) => (
                  <tr key={idx}>
                    <td>{r.boothId}</td>
                    <td>{r.vendorName}</td>
                    <td>{hoursToRange(r.hours)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : (
          <p className="no-details">Select a day to see reservations.</p>
        )}
      </div>

      <button
        className="reserve-button"
        onClick={() => navigate("/reserve")}
      >
        Reserve A Booth
      </button>
    </div>
  );
}
