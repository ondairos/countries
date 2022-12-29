import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState("");

  // get api data
  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  // search logic

  const countriesToShow =
    showCountries !== ""
      ? countries.filter((element) => {
          return element.name
            .toLowerCase()
            .includes(showCountries.toLowerCase());
        })
      : countries;


  function handleCountryChange(event) {
    event.preventDefault();
    setShowCountries(event.target.value);
  }

  return (
    <div className="App">
      <h1>Countries</h1>
      <p>
        find countries:{" "}
        <input value={showCountries} onChange={handleCountryChange} />
      </p>
      <div>
        <ul>
          <Countries data={countries} countriesToShow={countriesToShow} />
        </ul>
      </div>
    </div>
  );
}

export default App;
