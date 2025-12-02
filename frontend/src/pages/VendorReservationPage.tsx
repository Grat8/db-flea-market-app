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

  const vendor = JSON.parse(localStorage.getItem("vendor") || "{}");    // get logged in vendor from local storage
  const vendorId = vendor?.vendor_id ?? null;

  useEffect(() => {
    const fetchBooths = async () => {
      try {
        const boothRes = await axios.get("http://localhost:3000/api/booth");
        const boothData = boothRes.data;

        const boothWithAvailability = await Promise.all(
          boothData.map(async (b: any) => {
            const res = await axios.get(
              `http://localhost:3000/api/booth/${b.id}/reservation`
            );

            const reservations = res.data;
            const reservedSlots: Record<string, any[]> = {};

            reservations.forEach((r: any) => {
              const start = new Date(r.date);
              const day = start.toISOString().split("T")[0];

              if (!reservedSlots[day]) reservedSlots[day] = [];
              reservedSlots[day].push({
                start: start.getHours(),
                duration: r.duration,
                vendorName: r.vendorName ?? "Unknown",
              });
            });

            return { ...b, reservedSlots };
          })
        );

        setBooths(boothWithAvailability);
      } catch (err) {
        console.error("Error fetching booths:", err);
      }
    };

    fetchBooths();
  }, []);

  const handleBoothChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const bid = e.target.value;
    setSelectedBooth(bid);
    setSelectedDay("");
    setStartHour("");
    setEndHour("");

    const booth = booths.find((b) => b.id.toString() === bid);
    if (!booth) return;

    // show next 7 days from today of booths
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return d.toISOString().split("T")[0];
    });

    setAvailableDays(days);
  };

  // updates timeslots based on start time selection and what is already reserved
  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const day = e.target.value;
    setSelectedDay(day);
    setStartHour("");
    setEndHour("");

    const booth = booths.find((b) => b.id.toString() === selectedBooth);
    if (!booth) return;

    const allSlots = Array.from({ length: 9 }, (_, i) => 7 + i);

    const reserved = booth.reservedSlots[day]?.flatMap((r: any) =>
      Array.from({ length: r.duration }, (_, i) => r.start + i)
    ) || [];

    const freeSlots = allSlots.filter((hour) => !reserved.includes(hour));

    setAvailableTimes(freeSlots.map((h) => `${h}:00`));
  };

  const handleSubmit = async () => {
    if (!vendorId) {    // sanity check, will probably never be hit cause this page is restricted to vendors only
      alert("You must be logged in to reserve a booth.");
      return;
    }
    if (!selectedBooth || !selectedDay || !startHour || !endHour) return;

    const start = parseInt(startHour);
    const end = parseInt(endHour);

    if (end <= start ) {
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
      await axios.post("http://localhost:3000/api/reservation", payload);
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

        {/* BOOTH SELECT */}
        <label>
          Select Booth
          <select value={selectedBooth} onChange={handleBoothChange}>
            <option value="">-- Choose Booth --</option>
            {booths.map((b) => (
              <option key={b.id} value={b.id}>
                Booth {b.id} (x:{b.xcor}, y:{b.ycor})
              </option>
            ))}
          </select>
        </label>

        {/* DAY SELECT */}
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

        {/* TIME RANGE SELECT */}
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
            {Array.from({ length: 10 }, (_, i) => 7 + i).filter((num) => {
              for (let i = parseInt(startHour); i < num; i++) {
                if (!availableTimes.includes(`${i}:00`)) {
                  return false;
                }
              }

              return num > parseInt(startHour);
            }).map((t) => (
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
