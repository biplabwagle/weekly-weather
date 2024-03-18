import React from "react";
import Day from "./Day";
class Weather extends React.Component {
  render() {
    const { weather, location } = this.props;
    const {
      temperature_2m_max: max,
      temperature_2m_min: min,
      time: dates,
      weathercode: codes,
    } = weather;
    return (
      <div>
        <h2>Weather {location}</h2>
        <ul className="weather">
          {dates.map((date, i) => {
            return (
              <Day
                key={i}
                date={date}
                max={max.at(i)}
                min={min.at(i)}
                code={codes.at(i)}
                isToday={i === 0}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Weather;
