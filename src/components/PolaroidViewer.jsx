import Polaroid from "./Polaroid";

import { useState, useEffect } from "react";

const PolaroidViewer = (props) => {
  const { data } = props;

  const [prevRotation, setPrevRotation] = useState(0);
  const [rotationCalculation, setRotationCalculation] = useState(0);
  const [polaroidRotationY, setPolaroidRotationY] = useState(0);

  useEffect(() => {
    console.log(data);
    console.log(data?.hdurl);
  }, []);

  //change polaroid style when polaroidRotationY changes
  useEffect(() => {
    // console.log("polaroidRotationY changed");
    // const polaroid = document.querySelector(".polaroid");
    // const body = document.querySelector("body");
    // polaroid.style.transform = `rotateY(${polaroidRotationY}deg)`;
    // // change the cursor to grabbing
    // body.style.cursor = "grabbing";
  }, [polaroidRotationY]);

  const handleMouseDown = (e) => {
    console.log("mouse down");
    const body = document.querySelector("body");
    const polaroid = document.querySelector(".polaroid");
    const section = document.querySelector(".polaroid-showcase");

    // drag sensitivity (the higher the number the less sensitive the drag)
    const sensitivity = 2;

    // Get the x position of the mouse when the mouse is clicked down
    const x = e.clientX;

    // pervious rotation value
    let prev = 0;

    // calculation (stores calculation formula for tracking the mouse and polaroid rotation)
    let calc = 0;

    function rotate(e) {
      setRotationCalculation((e.clientX - x) / sensitivity);

      // rotate the polaroid from the previous rotation value

      setPolaroidRotationY(prevRotation + rotationCalculation);
      
      calc = (e.clientX - x) / sensitivity;
      
      // rotate the polaroid from the previous rotation value
      polaroid.style.transform = `rotateY(${prev + calc}deg)`;
      console.log(prev+calc);
    }
    // rotate the polaroid on mousemove
    section.addEventListener("mousemove", rotate);

    // save rotation for the next click
    setPrevRotation((prev) => prev + rotationCalculation);
    prev += calc;

    // remove the mousemove event listener when the mouse is released
    window.addEventListener("mouseup", () => {
      console.log("mouse up");
      section.removeEventListener("mousemove", rotate);
      body.style.cursor = "default";
    });
  };

  return (
    <section className="polaroid-showcase" onMouseDown={handleMouseDown}>
      <div className="wrapper">
        < Polaroid imageUrl={data?.hdurl} title={data?.title} date={data?.date} description={data?.explanation} />
      </div>
    </section>
    // <Polaroid
    //   imageUrl={data?.hdurl}
    //   title={title}
    //   date={date}
    //   description={description}
    // />
  );
};

export default PolaroidViewer;
