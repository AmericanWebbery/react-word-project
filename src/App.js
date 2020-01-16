import React, { useState, useEffect } from "react";
import "./App.css";
require("dotenv").config();

function App() {
  const [word, setWord] = useState("");
  const [gif, setGif] = useState("");
  const [altText, setAltText] = useState("");
  // console.log(gif);

  // add your own API keys in an .env file
  const WORD_API_KEY = process.env.REACT_APP_WORD_API;
  const word_url = `https://random-word-api.herokuapp.com/word?key=${WORD_API_KEY}&number=1`;
  const GIPHY_API_KEY = process.env.REACT_APP_GIPHY_API;

  const fetch_word = async () => {
    setGif("");
    setAltText("");
    const word_res = await fetch(word_url);
    const word_json = await word_res.json();
    setWord(word_json);
    try {
      const giphy_url = await `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${word_json}&limit=1&offset=0&rating=R&lang=en`;
      const giphy_res = await fetch(giphy_url);
      const giphy_json = await giphy_res.json();
      setGif(giphy_json.data[0].images.original.webp);
      setAltText(giphy_json.data[0].title);
    } catch (err) {
      fetch_word();
      // console.log(err);
    }
  };

  useEffect(() => {
    fetch_word();
  }, []);

  return (
    <div className="App">
      <h1>REACT-WORD-PROJECT</h1>
      <p>
        A random word will be fetched from an online random word generator and a
        second request will be made to the giphy API to return a gif based on
        that word.
      </p>
      <p>
        The word is: <span className="word">{word}</span>&nbsp;
        <button onClick={fetch_word}>Get Gif</button>
      </p>
      <p>
        If a gif cannot be found for the word, a request is made for a new word.
      </p>

      <p>
        <img src={gif} alt={altText} />
      </p>
    </div>
  );
}

export default App;
