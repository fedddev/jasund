import React, { useState, useEffect } from "react";
import { getCorrectName } from "../utils/getCorrectName";
import { useStore } from "../stores/useStore";

interface Country {
  name: { common: string };
  cca3: string;
}

const labelStyle = {
  fontSize: "1.15rem",
  fontWeight: "bold",
  marginRight: "10px",
};

const selectStyle = {
  fontSize: "1.1rem", // Increases the font size
  padding: "1px", // Adds padding for a larger clickable area
  border: "2px solid #ccc", // Optional: Define a border
  borderRadius: "5px", // Optional: Round the corners
  backgroundColor: "#f9f9f9", // Optional: Light background
  width: "100%", // Optional: Make it responsive to the container
  maxWidth: "400px", // Optional: Limit maximum width
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", // Optional: Add a subtle shadow
};

export const CountryDropdowns: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [dropdown1, setDropdown1] = useState<string>("Japan");
  const [dropdown2, setDropdown2] = useState<string>("USA");
  const name = useStore((state) => state.name);
  const setName = useStore((state) => state.setName);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    setName(getCorrectName(dropdown1, dropdown2));
  }, [dropdown1, dropdown2]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data: Country[] = await response.json();
        // Modify "United States of America" to "USA"
        const modifiedData = data.map((country) => {
          if (country.name.common === "United States") {
            return { ...country, name: { common: "USA" } };
          }
          return country;
        });
        // Sort countries alphabetically by name (optional)
        const sortedCountries = modifiedData.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div>
      <div
        className="interaction-row"
        style={{
          display: "grid",
          gridTemplateColumns: "65% 25%",
          gridTemplateRows: "auto",
          width: "100%",
          gap: "10px",
        }}
      >
        {/* First Dropdown */}
        <div className="dropdowns">
          <h2 style={{ margin: "0" }}>Select Countries</h2>
          <div className="dropdown-field">
            <label
              className="country-label"
              htmlFor="dropdown1"
              style={labelStyle}
            >
              Country 1:
            </label>
            <select
              id="dropdown1"
              value={dropdown1}
              style={selectStyle}
              onChange={(e) => setDropdown1(e.target.value)}
            >
              <option value="">-- Select a Country --</option>
              {countries.map((country) => (
                <option key={country.cca3} value={country.name.common}>
                  {country.name.common}
                </option>
              ))}
            </select>
          </div>

          {/* Second Dropdown */}
          <div className="dropdown-field">
            <label
              className="country-label"
              htmlFor="dropdown2"
              style={labelStyle}
            >
              Country 2:
            </label>
            <select
              id="dropdown2"
              value={dropdown2}
              style={selectStyle}
              onChange={(e) => setDropdown2(e.target.value)}
            >
              <option value="">-- Select a Country --</option>
              {countries.map((country) => (
                <option key={country.cca3} value={country.name.common}>
                  {country.name.common}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="speak-button">
          <h2 style={{ margin: "0 0 25px 0" }}>Say your name: </h2>
          <span style={{ marginLeft: "25%" }}>
            <button className="speak-btn" onClick={() => speak(name)}>
              <img src="/speaker.svg" alt="Click to hear Jasun'd name" />
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};
