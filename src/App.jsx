import react from "react";
import "./style.css";
import Meme from "./meme.jsx";
import memeLogo from "./images.jpg";

function App() {
  return (
    <div className="app-container">
      <Meme memeLogo={memeLogo} />
    </div>
  );
}

export default App;
