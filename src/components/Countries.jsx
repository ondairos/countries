import React, { useState, useEffect } from "react";
const weather_api_key = import.meta.env.VITE_TEST_VAR;
import axios from "axios";


export const Countries = (props) => {
  // country selection state
  const [selectedCountry, setSelectedCountry] = useState(null);
  // weather state
  const [weather, setWeather] = useState(null);

  // toggle clicked for button
  function handleClick(country) {
    // set the state to null when the "Hide" button is clicked, which will hide the country details.
    setSelectedCountry(selectedCountry === country ? null : country);
  }

    // get api data from openweather api
    useEffect(() => {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=38.37581315&lon=26.064655246170453&appid=${weather_api_key}`).then((res) => {
        setWeather(res.data);
      });
    }, []);

  return (
    <div>
      {props.countriesToShow.length == 1 ? (
        <>
          <p>Name: {props.countriesToShow[0].name}</p>
          <p>Capital: {props.countriesToShow[0].capital}</p>
          <p>Area: {props.countriesToShow[0].area}</p>
          {/* use .languages.map() to extract the name of the language */}
          <p>
            <b>Languages</b>:{" "}
            {props.countriesToShow[0].languages.map((country) => (
              <li>{country.name}</li>
            ))}
          </p>
          <img src={props.countriesToShow[0].flags.png} alt="" />
          <p>Chios Temperature: {weather.main.temp}</p>
          <p>Chios Pressure: {weather.main.pressure}</p>
          <p>Chios Humidity: {weather.main.humidity}</p>
        </>
      ) : props.countriesToShow.length > 10 ? (
        <p>Search the country you want.</p>
      ) : (
        <ul>
          {props.countriesToShow.map((element) => {
            return (
              <li key={element.name}>
                {element.name}{" "}
                <button onClick={() => handleClick(element)}>
                  {selectedCountry === element ? "Hide" : "Show"}
                </button>
                {selectedCountry === element ? (
                  <>
                    <p>Name: {element.name}</p>
                    <p>Capital: {element.capital}</p>
                    <p>Area: {element.area}</p>
                    {/* use .languages.map() to extract the name of the language */}
                    <p>
                      <b>Languages</b>:{" "}
                      {element.languages.map((country) => country.name + " ")}
                    </p>
                    <img src={element.flags.png} alt="" />
                  </>
                ) : (
                  ""
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Countries;
