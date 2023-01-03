import React, { useState } from "react";

export const Countries = (props) => {
  const [clicked, setClicked] = useState(false);
  console.log(clicked);

  function handleClick() {
    return setClicked((prevClicked) => !prevClicked);
  }

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
        </>
      ) : props.countriesToShow.length > 10 ? (
        <p>Search the country you want.</p>
      ) : (
        <ul>
          {props.countriesToShow.map((element) => {
            return (
              <li key={element.name}>
                {element.name} <button onClick={handleClick}>Show</button>
                {clicked ? (
                  <>
                    <p>Name: {element.name}</p>
                    <p>Capital: {element.capital}</p>
                    <p>Area: {element.area}</p>
                    {/* use .languages.map() to extract the name of the language */}
                    <p>
                      <b>Languages</b>:{" "}
                      {element.languages.map((country) => (
                        country.name
                      ))}
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
