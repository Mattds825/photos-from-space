import React, { useState, useEffect } from "react";

const Header = () => {

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    console.log("should animate");
    setAnimate(true);
  },[]);

  return (
    <header>
      <h1>
        <span id="headerSpan1" className={animate ? "headerSpan animate" : "headerSpan"}>Photos</span>
        <span id="headerSpan2" className={animate ? "headerSpan animate" : "headerSpan"}> From</span>
        <span id="headerSpan3" className={animate ? "headerSpan animate" : "headerSpan"}> Space</span>
      </h1>

      <button>
        <i className="fa-solid fa-circle-info"></i>
      </button>
    </header>
  );
};

export default Header;
