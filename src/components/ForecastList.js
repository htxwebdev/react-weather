import React from 'react'

const ForecastList = ({ forecastday }) => {
    const dayBuilder = d => {
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

        return `${day}`;
    };
    return (
        <div className="forecast">
            {forecastday.map((day, index) => (
                <div className="row" key={index}>
                    <div className="day">{dayBuilder(new Date(day.dt * 1000))}</div>
                    <div className="icon">{day.weather[0].main}</div>
                    <div className="temp">{day.main.temp_min} | {day.main.temp_max}</div>
                </div>
            ))}

        </div>
    )
}

export default ForecastList
