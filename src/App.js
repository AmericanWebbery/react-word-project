import React, { useState, useEffect } from "react";
import "./App.css";
require("dotenv").config();

function App() {
  // add your own API keys in an .env file
  const WORD_API_KEY = process.env.REACT_APP_WORD_API;
  const WORD_API = `https://random-word-api.herokuapp.com/word?key=${process.env.REACT_APP_WORD_API}&number=1`;

  const [word, setWord] = useState("");

  const FETCH_WORD = () => {
    fetch(WORD_API)
      .then(response => {
        return response.json();
      })
      .then(response => setWord(response));
  };

  useEffect(() => {
    FETCH_WORD();
  }, []);

  console.log(word);

  return (
    <div className="App">
      <h1>REACT-WORD-PROJECT</h1>
      <p>
        A random word will be fetched from an online random word generator and a
        second request will be made to the giphy API to return a gif based on
        that word.
      </p>
      <p>
        The word is: <span className="word">{word}</span>
      </p>
    </div>
  );
}

export default App;
