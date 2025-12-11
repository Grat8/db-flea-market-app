import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VendorReservationPage.css";

const VendorReservationPage: React.FC = () => {
  const [booths, setBooths] = useState<any[]>([]);
  const [selectedBooth, setSelectedBooth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");

  const vendor = JSON.parse(localStorage.getItem("vendor") || "{}");
  const vendorId = vendor?.vendor_id ?? null;

  // load all booths
  useEffect(() => {
    const fetchBooths = async () => {
      try {
        const boothRes = await axios.get("https://db-flea-market-app.onrender.com/api/booth");
        setBooths(boothRes.data);
      } catch (err) {
        console.error("Error fetching booths:", err);
      }
    };
    fetchBooths();
  }, []);

  // Booth selection
  const handleBoothChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const bid = e.target.value;
    setSelectedBooth(bid);
    setSelectedDay("");
    setStartHour("");
    setEndHour("");

    if (!bid) return;

    // Generate next 7 days for frontend dropdown
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return d.toISOString().split("T")[0];
    });
    setAvailableDays(days);
  };

  // NEW — Day filter fetches from backend using ?day=
  const handleDayChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const day = e.target.value;
    setSelectedDay(day);
    setStartHour("");
    setEndHour("");

    if (!selectedBooth || !day) return;

    let dayReservations = [];
    try {
      const res = await axios.get(
        `https://db-flea-market-app.onrender.com/api/booth/${selectedBooth}/reservation`,
        { params: { day } }
      );
      dayReservations = res.data;
    } catch (err) {
      console.error("Error fetching filtered reservations:", err);
    }

    // Compute reserved hours
    const reservedHours: number[] = [];
    dayReservations.forEach((r: any) => {
      const startHr = new Date(r.date).getHours();
      for (let i = 0; i < r.duration; i++) {
        reservedHours.push(startHr + i);
      }
    });

    const allSlots = Array.from({ length: 9 }, (_, i) => 7 + i);
    const freeSlots = allSlots.filter(h => !reservedHours.includes(h));

    setAvailableTimes(freeSlots.map(h => `${h}:00`));
  };

  // Submit reservation
  const handleSubmit = async () => {
    if (!vendorId) {
      alert("You must be logged in to reserve a booth.");
      return;
    }
    if (!selectedBooth || !selectedDay || !startHour || !endHour) return;

    const start = parseInt(startHour);
    const end = parseInt(endHour);
    if (end <= start) {
      alert("Invalid time range!");
      return;
    }

    const datetime = `${selectedDay}T${start.toString().padStart(2, "0")}:00:00`;
    const duration = end - start;

    const payload = {
      vid: vendorId,
      bid: Number(selectedBooth),
      date: datetime,
      duration: duration,
    };

    try {
      await axios.post("https://db-flea-market-app.onrender.com/api/reservation", payload);
      alert("Reservation added successfully!");
      window.location.reload();
    } catch (err) {
      console.error("Error submitting reservation:", err);
      alert("Error submitting reservation");
    }
  };

  return (
    <div className="vendor-page-container">
      <div className="section">
        <h2 className="section-title">Booth Reservation</h2>
        <hr className="section-divider" />

        <label>
          Select Booth
          <select value={selectedBooth} onChange={handleBoothChange}>
            <option value="">-- Choose Booth --</option>
            {booths.map((b) => (
              <option key={b.id} value={b.id}>
                Booth {b.id}
              </option>
            ))}
          </select>
        </label>

        <label>
          Select Day
          <select
            value={selectedDay}
            onChange={handleDayChange}
            disabled={!selectedBooth}
          >
            <option value="">-- Choose Day --</option>
            {availableDays.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </label>

        <label>
          Start Hour
          <select
            value={startHour}
            onChange={(e) => setStartHour(e.target.value)}
            disabled={!selectedDay}
          >
            <option value="">-- Start Hour --</option>
            {availableTimes.map((t) => (
              <option key={t} value={t.split(":")[0]}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label>
          End Hour
          <select
            value={endHour}
            onChange={(e) => setEndHour(e.target.value)}
            disabled={!startHour}
          >
            <option value="">-- End Hour --</option>
            {Array.from({ length: 10 }, (_, i) => 7 + i)
              .filter((num) => {
                for (let i = parseInt(startHour); i < num; i++) {
                  if (!availableTimes.includes(`${i}:00`)) {
                    return false;
                  }
                }
                return num > parseInt(startHour);
              })
              .map((t) => (
                <option key={t} value={t}>
                  {t}:00
                </option>
              ))}
          </select>
        </label>

        <button
          className="submit-button"
          disabled={!startHour || !endHour}
          onClick={handleSubmit}
        >
          Submit Reservation
        </button>
      </div>
    </div>
  );
};

export default VendorReservationPage;
