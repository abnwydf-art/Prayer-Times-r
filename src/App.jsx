import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import "./index.css";
import Prayer from "./Component/Prayer";
import { useEffect } from "react";

function App() {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [dateTime, setDateTime] = useState("");
  const [City, setCity] = useState("Riyadh");

  const cities = [
    { name: "الرياض", value: "Riyadh" },

    { name: "مكه", value: "Makkah" },

    { name: "جده", value: "Jeddah" },
    { name: "الخبر", value: "Al Khobar" },
    { name: "الدمام", value: "Dammam" },
  ];

  console.log(City);

  useEffect(() => {
    const fetchPrayerTimes = async (cityName) => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${cityName}&country=Saudi Arabia&method=2`,
        );
        const data_Prayar = await response.json();
        setPrayerTimes(data_Prayar.data.timings);
        setDateTime(data_Prayar.data.date.gregorian.date);

        console.log(data_Prayar.data.date.gregorian.date);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };
    fetchPrayerTimes(City);
  }, [City]);

  const forTime = (time) => {
    if (!time) {
      return "00:00";
    }
    let [hour, minute] = time.split(":").map(Number);
    const perd = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${perd}`;
  };

  return (
    <>
      <section>
        <div className='container'>
          <div className='top_sec'>
            <div className='city'>
              <h3>المدينه</h3>
              <select name='' id='' onChange={(e) => setCity(e.target.value)}>
                {cities.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='date'>
              <h3>التاريخ</h3>
              <h4>{dateTime}</h4>
            </div>
          </div>
          <Prayer name='الفجر' time={forTime(prayerTimes.Fajr)} />
          <Prayer name='الظهر' time={forTime(prayerTimes.Dhuhr)} />
          <Prayer name='العصر' time={forTime(prayerTimes.Asr)} />
          <Prayer name='المغرب' time={forTime(prayerTimes.Maghrib)} />
          <Prayer name='العشاء' time={forTime(prayerTimes.Isha)} />
        </div>
      </section>
    </>
  );
}
export default App;
