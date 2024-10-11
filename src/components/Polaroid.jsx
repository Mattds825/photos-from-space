import React, { useRef, useState, useEffect } from "react";

const Polaroid = ({ imageUrl, title, date, description }) => {

  return (
    <div className="polaroid">
          <div className="front">
            <div className="image-container">
              <img
                className="polaroid-image"
                src={imageUrl}
                alt="polaroid Cover"
              />
            </div>
            <div className="image-text-container">
              <h2 className="polaroid-title">{title}</h2>
              <p className="polaroid-author">{date}</p>
            </div>
          </div>
          <div className="sideA"></div>
          <div className="back">
            <div className="description-container">
              <p>
                {description}
              </p>
            </div>            
          </div>
          <div className="sideB"></div>
          <div className="shadow"></div>
        </div>
  );
};

export default Polaroid;
