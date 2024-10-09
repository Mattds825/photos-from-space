import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";

import * as THREE from "three";

const Polaroid = ({ imageUrl, title, date, description }) => {
  const polaroidRef = useRef();
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotationY, setRotationY] = useState(0);
  const [textureFront, setTextureFront] = useState(null);
  const [textureBack, setTextureBack] = useState(null);

  // Create a canvas and draw the image and text
  const createCanvasTextureFront = async () => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        // Set canvas size
        canvas.width = 300; // Adjust size as needed
        canvas.height = 400; // Adjust size as needed

        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Set text styles
        ctx.font = "24px Caveat, cursive";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";



        // Draw title and date
        ctx.fillText(title, canvas.width / 2, 50);
        ctx.fillText(date, canvas.width / 2, 90);


        // Create texture from canvas
        const textureFront = new THREE.Texture(canvas);
        textureFront.needsUpdate = true; // Ensure the texture is updated
        resolve(textureFront);
      };

      img.src = imageUrl;
    });
  };

  const createTextureBack = async () => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas size
      canvas.width = 300; // Adjust size as needed
      canvas.height = 400; // Adjust size as needed

      // Set background color
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // draw description in the center
        ctx.font = "24px Caveat, cursive";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";

        // description should wrap if it's too long
        const words = description.split(" ");
        let line = "";
        let y = 200;
        words.forEach((word) => {
          const testLine = `${line} ${word}`;
          const testWidth = ctx.measureText(testLine).width;
          if (testWidth > 250) {
            ctx.fillText(line, canvas.width / 2, y);
            line = word;
            y += 30;
          } else {
            line = testLine;
          }
        });



        // ctx.fillText(description, canvas.width / 2, canvas.height / 2);

      // Create texture from canvas
      const textureBack = new THREE.Texture(canvas);
      textureBack.needsUpdate = true; // Ensure the texture is updated
      resolve(textureBack);
    });
  };

 // Load the image and create the texture on mount
 useEffect(() => {
    //create the texture for the front of the polaroid
    createCanvasTextureFront().then((loadedTexture) => {
      setTextureFront(loadedTexture);
    });

    //create the texture for the back of the polaroid
    createTextureBack().then((loadedTexture) => {
      setTextureBack(loadedTexture);
    });
  }, [imageUrl]);

  // Handle the flipping of the Polaroid
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Use frame to animate the Y-axis rotation smoothly when flipping
  useFrame(() => {
    if (polaroidRef.current) {
      // Interpolate the rotation Y towards the target rotation (0 or Math.PI)
      polaroidRef.current.rotation.y = THREE.MathUtils.lerp(
        polaroidRef.current.rotation.y,
        isFlipped ? Math.PI : 0,
        0.1
      );
    }
  });

  // Create materials for front (with texture) and back (white)
  const materials = [
    new THREE.MeshBasicMaterial({ color: "#ffffff" }), // Left side
    new THREE.MeshBasicMaterial({ color: "#ffffff" }), // Right side
    new THREE.MeshBasicMaterial({ color: "#ffffff" }), // Top side
    new THREE.MeshBasicMaterial({ color: "#ffffff" }), // Bottom side
    textureFront
      ? new THREE.MeshBasicMaterial({ map: textureFront })
      : new THREE.MeshBasicMaterial({ color: "#ffffff" }), // Front (image)
      textureFront
      ? new THREE.MeshBasicMaterial({ map: textureBack })
      : new THREE.MeshBasicMaterial({ color: "#ffffff" }),, // Back (white)
  ];

  return (
    <mesh
      ref={polaroidRef}
      onClick={handleFlip}
      rotation={[0, rotationY, 0]}
      scale={[1.5, 1.5, 1.5]}
      material={materials}
    >
      {/* Geometry for Polaroid */}
      <boxGeometry args={[3, 3.5, 0.1]} />

      {/* Geometry for Polaroid */}
      <boxGeometry args={[3, 3.5, 0.1]} />
    </mesh>
  );
};

export default Polaroid;
