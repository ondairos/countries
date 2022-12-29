import React from "react";

export const Countries = (props) => {
  return (
    <div>
      <ul>
        {props.countriesToShow.map((element) => {
          return <li key={element.name}>{element.name} :----: {element.capital}</li>;
        })}
      </ul>
    </div>
  );
};

export default Countries;
