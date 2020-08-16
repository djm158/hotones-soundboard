import React from "react";
import "./App.css";

// import { SoundButton } from "./components/SoundButton";
// import { Key } from "./components/SoundButton";
// import Modal from "react-modal";
import UserProvider from "./auth/UserProvider";
import Application from "./auth/Application";

// const beep = require("./assets/sounds/brettbaker.mp3");
// Modal.setAppElement("#modal-soundboard");

function App() {

  return (
    <UserProvider>
      <Application />
    </UserProvider>
  );
}

export default App;
