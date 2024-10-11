import React, { useState, useEffect } from "react";
import "./App.css";
import PolaroidViewer from "./components/PolaroidViewer";
import Header from "./components/Header";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchApiData() {
      const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url =
        "https://api.nasa.gov/planetary/apod" + `?api_key=${NASA_API_KEY}`;

      const today = new Date().toDateString();
      const localKey = `NASA=${today}`;

      // Check if data is in local storage
      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey));
        console.log(apiData.hdurl);
        setData(apiData);
        console.log("fetched from local storage");
        return;
      }

      localStorage.clear();

      try {
        const res = await fetch(url);
        const apiData = await res.json();
        localStorage.setItem(localKey, JSON.stringify(apiData));
        setData(apiData);
        console.log("fetched from API today");
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchApiData();
  }, []);
  return (
    <>
      <Header />
      {data ? (
        <PolaroidViewer data={data} />
      ) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      <div className="storage-icon-div">
        <img src="/photo-box.png" alt="" />
      </div>
    </>
  );
}

export default App;
