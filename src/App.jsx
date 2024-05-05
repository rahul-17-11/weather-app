import { useState, useEffect } from "react";

import { FaCity } from "react-icons/fa";
import { BsCloudSunFill } from "react-icons/bs";
import { BsCloudHaze2 } from "react-icons/bs";
import { GiSmokeBomb } from "react-icons/gi";
import { FaSun } from "react-icons/fa";
import { IoRainySharp } from "react-icons/io5";
import { IoThunderstorm } from "react-icons/io5";
import { BsSnow2 } from "react-icons/bs";

const WEATHER_KEY = import.meta.env.VITE_WEATHER_KEY;

function App() {
  const [city, setCity] = useState("Pune");
  const [cityData, setCityData] = useState({});
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const dataFetching = async () => {
    if (city && city.length > 0) {
      try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_KEY}`;
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        setCityData(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    dataFetching();
  }, []);

  return (
    <div className=" bg-[url('./assets/bg.jpg')] bg-no-repeat bg-cover w-screen h-screen flex flex-col justify-start items-center gap-2 text-white">
      <h1 className="text-6xl m-3 font-extrabold bg-gradient-to-r from-red-600 via-yellow-400 to-orange-600 inline-block text-transparent bg-clip-text">
        Weather App
      </h1>
      <div className=" flex">
        <input
          className="p-2 border-2 text-slate-200 placeholder:text-gray-600 border-slate-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-purple-200 bg-opacity-20 h-12"
          type="search"
          placeholder="Enter your City"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <button
          className=" p-3 ml-2 flex gap-2 text-slate-100 bg-sky-600 hover:text-white hover:bg-indigo-900 rounded-full"
          onClick={dataFetching}
        >
          Search <FaCity className="text-xl" />
        </button>
      </div>
      <div className="m-2 p-4 gap-2 flex w-screen">
        <div className="ml-3 p-4 gap-2 flex flex-col justify-start items-center w-1/2 h-64 text-3xl rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 bg-purple-200 text-amber-400 ">
          <h2 className="flex items-start justify-start font-bold p-6 bg-fuchsia-700 bg-opacity-50 shadow-pink-700 shadow-lg w-3/4 rounded-md text-4xl">
            {cityData.name}
          </h2>
          {cityData.weather && cityData.weather.length > 0 && (
            <div className=" bg-fuchsia-700 bg-opacity-50 w-2/3 text-amber-300 text-4xl p-2 pl-4 mt-2 h-full gap-2 flex rounded-lg justify-start items-center shadow-pink-700 shadow-lg">
              {cityData.weather[0].main === "Clouds" && <BsCloudSunFill />}
              {cityData.weather[0].main === "Haze" && <BsCloudHaze2 />}
              {cityData.weather[0].main === "Smoke" && <GiSmokeBomb />}
              {cityData.weather[0].main === "Clear" && <FaSun />}
              {cityData.weather[0].main === "Rain" && <IoRainySharp />}
              {cityData.weather[0].main === "Snow" && <BsSnow2 />}
              {cityData.weather[0].main === "Mist" && <GiSmokeBomb />}
              {cityData.weather[0].main === "Dust" && <GiSmokeBomb />}
              {cityData.weather[0].main === "Fog" && <GiSmokeBomb />}
              {cityData.weather[0].main === "Thunderstorm" && (
                <IoThunderstorm />
              )}
              {cityData.weather[0].main === "Drizzle" && <IoRainySharp />}
              <div className="p-2 mt-2 text-sm text-amber-400">
                <p className="text-xl">
                  Temp: {(cityData?.main.temp - 273).toFixed(1)} °C
                </p>
                <p className="text-2xl">{cityData.weather[0].description}</p>
              </div>
            </div>
          )}
        </div>
        <div className="mr-3 p-4 gap-2 bg-purple-200 text-amber-300 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 flex justify-center items-center w-1/2 h-64 text-4xl">
          <div className="p-6 bg-fuchsia-700 bg-opacity-20 shadow-pink-700 shadow-lg rounded-full">
            <p>User Time Zone</p>
            <p>{currentTime}</p>
          </div>
        </div>
      </div>
      {cityData.weather && cityData.weather.length > 0 && (
        <div className="m-5 p-2 flex flex-row justify-center gap-52 text-amber-300  items-center w-full bg-indigo-800 backdrop-filter backdrop-blur-md bg-opacity-20 ">
          <div>
            <p>Temp: {(cityData?.main.temp - 273).toFixed(1)} °C</p>
            <p>Temp Max: {(cityData?.main.temp_max - 273).toFixed(1)} °C</p>
            <p>Humidity: {cityData.main.humidity} %</p>
            <p>Wind Speed: {cityData.wind.speed} m/sec</p>
          </div>
          <div>
            <p>Wind Deg: {(cityData?.wind.deg - 273).toFixed(1)}</p>
            <p>Temp Min: {(cityData?.main.temp_min - 273).toFixed(1)} °C</p>
            <p>Pressure: {cityData.main.pressure}</p>
            <p>Wind Gust: {cityData.wind.gust} m/sec</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
