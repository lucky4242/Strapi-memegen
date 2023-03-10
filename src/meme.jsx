import react from "react";
import "./style.css";
import React, { useState, useEffect } from "react";

function Meme(props) {
  const [appData, setAppData] = useState({
    firstline: "",
    secondline: "",
  });

  // const [newMemeData, setNewMemeData] = useState([]);
  const [memeList, setmemeList] = useState([]);
  const [randomMeme, setrandomMeme] = useState(null);

  function meme() {
    fetch("http://localhost:1337/api/memes?populate=meme")
      .then((res) => res.json())
      .then((meme) => {
        setmemeList(meme.data);
      });
  }
  useEffect(() => {
    meme();
  }, []);

  function getRandomMeme() {
    const randomNumber = Math.floor(Math.random() * memeList.length);
    let randomMemeURL =
      memeList[randomNumber].attributes.meme.data[0].attributes.formats.large
        .url;
    setrandomMeme(randomMemeURL);
  }

  function enterLine(event) {
    setAppData((prevAppData) => {
      return {
        ...prevAppData,
        [event.target.name]: event.target.value,
      };
    });
  }
  console.log(appData);
  return (
    <div className="meme-container">
      <nav className="navbar">
        <img className="memeLogo" src={props.memeLogo} alt="memeLogo" />
        <p className="title">Strapi Meme Generator</p>
      </nav>
      <div className="input-field">
        <input
          type="text"
          placeholder="Enter the first line..."
          name="firstline"
          onChange={enterLine}
          value={appData.firstline}
        />
        <input
          type="text"
          placeholder="Enter the second line..."
          name="secondline"
          onChange={enterLine}
          value={appData.secondline}
        />
      </div>

      <button className="generateBTN" onClick={getRandomMeme}>
        Load Strapi Meme
      </button>
      {randomMeme !== null && (
        <div className="meme-image">
          <img
            className="imageMeme"
            src={`http://localhost:1337${randomMeme}`}
            alt="Meme Not Responding "
          />
          <h2 className="first">{appData.firstline}</h2>
          <h2 className="second">{appData.secondline}</h2>
        </div>
      )}
    </div>
  );
}

export default Meme;
