import React, { useState } from "react";
import "./App.css";
import PolaroidViewer from "./components/PolaroidViewer";


function App() {
  return (
    <>
      <main>
        <PolaroidViewer />
        {/* <img src="photo-box.png" alt="photos storage box"></img> */}
      </main>
    </>
  );
}

export default App;
