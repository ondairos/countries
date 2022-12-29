import React from "react";

export const Countries = (props) => {
  return (
    <div>
      {props.countriesToShow.length > 10 ? (
        <p>Search the country you want.</p>
      ) : (
        <ul>
          {props.countriesToShow.map((element) => {
            return (
              <li key={element.name}>
                {element.name} :----: {element.capital}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Countries;
