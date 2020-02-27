import React, { useState, Fragment } from "react";
import { GoogleMap, withGoogleMap, Marker } from "react-google-maps";
import Icon from "./icons";

const api = {
  key: process.env.REACT_APP_WEATHER_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState({})

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });

      fetch(`${api.base}forecast?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setForecast(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = d => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const MapWithAMarker = withGoogleMap(props => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: props.mapLat, lng: props.mapLon }}
    >
      <Marker position={{ lat: props.mapLat, lng: props.mapLon }} />
    </GoogleMap>
  ));

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? `app ${weather.weather[0].main.toLowerCase()}`
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <Fragment>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
              <p>Forecast: </p>
            </div>

            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}&deg; F</div>
              <div className="weather"></div>

              <div className="weather-info">
                <div className="conditions">
                  <div className="weather-icon">
                    <Icon name={weather.weather[0].main} />
                  </div>
                  <div className="weather-icon-text">
                    {weather.weather[0].main}
                  </div>
                </div>
                <div className="feels-like">
                  <div className="label">Feels like</div>
                  <div className="data">{weather.main.feels_like}</div>
                </div>
                <div className="humidity">
                  <div className="label">Humidity</div>
                  <div className="data">{weather.main.humidity}</div>
                </div>
                <div className="wind">
                  <div className="label">Wind</div>
                  <div className="data">{weather.wind.speed}</div>
                </div>
              </div>
            </div>

            {typeof forecast.list != "undefined" ? (
              <div className="forecast">
                {forecast.city.name}
                <p>{dateBuilder(new Date(forecast.list[0].dt * 1000))}</p>
              </div>
            ) : ("")}
            <MapWithAMarker
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              mapLat={
                typeof weather.main != "undefined" ? weather.coord.lat : 7
              }
              mapLon={
                typeof weather.main != "undefined" ? weather.coord.lon : 7
              }
            />
          </Fragment>
        ) : (
            ""
          )};
      </main>
    </div>
  );
}

export default App;
