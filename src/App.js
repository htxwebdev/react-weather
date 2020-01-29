import React, { useState, Fragment } from "react";
import { GoogleMap, withGoogleMap, Marker } from "react-google-maps";

const api = {
  key: process.env.REACT_APP_WEATHER_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
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
          ? weather.main.temp > 80
            ? "app warm"
            : "app"
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
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}&deg; F</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>

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
        )}
      </main>
    </div>
  );
}

export default App;
