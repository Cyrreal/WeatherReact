import React, { useState, useEffect } from "react";
import s from "./Components/MainPage/MainPage.module.css";
import Loader from "./YrhW.gif";
import "./App.css";
import { CityPage } from "./Components/CityPage";
import { MainPage } from "./Components/MainPage";
import axios from "axios";
export type WeatherType = {
  name: string;
};
export type Main = {
  temp: number;
};

export type CurentWeather = {
  description: string;
  temp: number;
  name: string;
};
const API_endpoint = "http://api.openweathermap.org/geo/1.0/reverse?";
const API_key = "a44763c6c3839a45a3942f0d92a8bb3b";

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isGeo, setIsGeo] = useState(false);
  const [error, setError] = useState("");
  const [cityName, setCityName] = useState("");
  const [weatherDataInCurrentCity, setWeatherInCurrentCity] = useState<
    CurentWeather[]
  >([]);
  const [changeCityStatus, setChangeCityStatus] = useState(false);

  console.log(cityName);
  const limit = 1;

  console.log(isGeo);
  const getIp = async () => {
    if (isGeo === false) {
      const res = await axios.get("https://api.ipify.org/?format=json");

      const cityByIp = await axios.get(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_38nQZzdTsm4C9PFIdiAE9383WbSKe&ipAddress=${res.data.ip}`
      );
      return setCityName(cityByIp.data.location.city), setIsGeo(true);
    }
  };

  const onChange = (position: GeolocationPosition) => {
    const { coords } = position;
    const { latitude, longitude } = coords;
    console.log(latitude);
    setLatitude(latitude);
    setLongitude(longitude);
    setIsGeo(true);
  };
  const onError = (error: any) => {
    setError(error.message);
  };

  useEffect(() => {
    const geoposition = navigator.geolocation;
    if (!geoposition) {
      const e: any = new Error("Геолокацию невозможно определить");
      setError(e);
      return;
    }
    const geo = geoposition.watchPosition(onChange, onError);
    return () => geoposition.clearWatch(geo);
  }, []);

  useEffect(() => {
    if (isGeo === true) {
      const openWeather = `${API_endpoint}lat=${latitude}&lon=${longitude}&limit=${limit}&appid=${API_key}`;
      fetch(openWeather)
        .then((response) => response.json())
        .then((data) => {
          return setCityName(data[0].name);
        });
    }
  }, [isGeo]);

  useEffect(() => {
    if (isGeo === true) {
      const weatherInCityData = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_key}`;
      fetch(weatherInCityData)
        .then((response) => response.json())
        .then((data) =>
          setWeatherInCurrentCity([
            data.main.temp,
            data.weather[0].description,
            data.name,
          ])
        );
    }
  }, [cityName]);

  console.log(error);
  useEffect(() => {
    if (error !== "") {
      getIp();
    }
  }, [error]);

  console.log(weatherDataInCurrentCity);
  return (
    <div className="wrapper">
      {isGeo !== false ? (
        <MainPage
          props={weatherDataInCurrentCity}
          setChangeCityStatus={setChangeCityStatus}
          changeCityStatus={changeCityStatus}
          setCityName={setCityName}
          isGeo={isGeo}
        />
      ) : (
        <div className={s.container}>
          <div className={s.content}>
            <img src={Loader} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
