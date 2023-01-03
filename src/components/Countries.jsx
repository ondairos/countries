import React, { useState, useEffect } from "react";
import axios from "axios";

const weather_api_key = import.meta.env.VITE_TEST_VAR;

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

  // get api data from openweathermap api
  useEffect(() => {
    // create array of promises for the API requests
    if (props.countriesToShow.length === 1) {
      const promises = props.countriesToShow.map((element) => {
        return axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${element.capital}&appid=${weather_api_key}`
        );
      });

      // wait for all of the promises to complete
      Promise.all(promises).then((results) => {
        // set the weather state to the data from the API
        setWeather(results.map((result) => result.data));
      });
    }
  }, [props.countriesToShow]);

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
          {weather && weather.length > 0 ? (
            <>
              <p>Capital: {weather[0].name}</p>
              <p>Temperature: {weather[0].main.temp}</p>
              <p>Pressure: {weather[0].main.pressure}</p>
              <p>Humidity: {weather[0].main.humidity}</p>
            </>
          ) : (
            <p>No weather data available</p>
          )}
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
