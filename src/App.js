import React from "react";
import Input from "./components/Input";
import Weather from "./components/Weather";
import { convertToFlag } from "./utils";

class App extends React.Component {
  state = {
    location: "san jose",
    isLoading: false,
    displayLocation: "",
    weather: {},
    error: {},
  };

  fetchWeather = async () => {
    try {
      this.setState({ isLoading: true });
      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      this.setState({
        displayLocation: `${name} ${convertToFlag(country_code)}`,
      });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();

      this.setState({ weather: weatherData.daily });
    } catch (err) {
      this.setState({ error: err });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleChange(e) {
    this.setState({ location: e.target.value });
  }

  render() {
    return (
      <div className="app">
        <h1>Weekly Weather</h1>
        <Input
          location={this.state.location}
          handleChange={this.handleChange}
        />
        <button onClick={this.fetchWeather}>
          Get {this.state.location}
          {this.state.location ? `'s` : ""} Weather
        </button>
        {this.state.isLoading && <p className="loader"> Loading... </p>}
        {this.state.weather.weathercode && (
          <Weather
            weather={this.state.weather}
            location={this.state.displayLocation}
          />
        )}
        {this.state.error.message && <p>{this.state.error.message}</p>}
      </div>
    );
  }
}

export default App;
