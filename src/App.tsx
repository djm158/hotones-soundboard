import React from "react";
import "./App.css";

import { SoundButton } from "./components/SoundButton";
import { Key } from "./components/SoundButton";
const beep = require("./assets/sounds/brettbaker.mp3");

function App() {
  return (
    <div>
      <SoundButton text="brett baker" keyCode={Key.Numpad5} sound={beep}></SoundButton>
    </div>
  );
}

export default App;
