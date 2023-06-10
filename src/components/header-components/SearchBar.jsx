import React, { useEffect } from "react";

import "/src/styles/header-component-styles/SearchBar.css";

export function SearchBar({ onSearch }) {
  const [search, setSearch] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);

  const fetchSuggestions = async (currentInput) => {
    const options = {
      method: "GET",
    };

    const host = "http://api.weatherapi.com/v1/search.json?";
    const key = "c9ea430da233494d80d231236222412";
    const input = currentInput;
    const callURL = host + "key=" + key + "&q=" + input;

    try {
      const response = await fetch(callURL, options);
      const fetchedSuggestions = await response.json();
      setSuggestions(fetchedSuggestions);
    } catch (error) {
      console.log(error);
    }
  };

  // This hook is needed to get the updated suggestions array (instead of previous).
  useEffect(() => {
    console.log("Updated suggestions:", suggestions);
  }, [suggestions]);

  const getCurrentInput = (e) => {
    const currUserInput = e.target.value;
    setSearch(currUserInput);

    //API does not fetch anything if input.length < 3. This prevents unnecessary API calls.
    currUserInput.length >= 3 ? fetchSuggestions(currUserInput) : null;
  };

  const submitInput = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <div>
      <form id="search-bar" onSubmit={submitInput}>
        <input
          id="input-box"
          type="text"
          placeholder="Search for a City..."
          name="search"
          value={search}
          onChange={getCurrentInput}
          action=""
        ></input>
        <button id="submit-city" type="submit">
          <img
            id="search-icon"
            src="/assets/icons/magnifying-glass-icon.png"
            alt="Search Icon"
          ></img>
        </button>
      </form>

      <div id="suggestions">
        {suggestions.length > 0
          ? suggestions.map((suggestion) => (
              <div key={suggestion.id} className="single-suggestion"></div>
            ))
          : null}
      </div>
    </div>
  );
}
