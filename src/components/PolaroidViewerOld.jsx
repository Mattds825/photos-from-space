import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import PolaroidOld from "./PolaroidOld";
import * as THREE from "three";

import { useState, useEffect } from "react";

const PolaroidViewerOld = (props) => {

  const { data } = props;

  const [textureFront, setFrontTexture] = useState(null);

  useEffect(() => {
    console.log(data);
    console.log(data?.hdurl);

    setFrontTexture(createCanvasTextureFront());

  }, []);

  const createCanvasTextureFront = () => {
    console.log("setting front texture");
    const imageUrl = data?.hdurl;

    const canvas = document.createElement('canvas');
    const textureFront = new THREE.CanvasTexture(canvas);
  
    new THREE.TextureLoader().load(imageUrl, texture => {
      console.log(imageUrl);
      const ctx = canvas.getContext('2d');
      const image = texture.image;
  
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Draw the image on the canvas
      ctx.drawImage(image, 0, 0, image.width, image.height);
  
      // Set text styles
      ctx.font = "24px Caveat, cursive";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
  
      // Draw title and date
      ctx.fillText(title, canvas.width / 2, 50);
      ctx.fillText(date, canvas.width / 2, 90);
  
      textureFront.needsUpdate = true; // Ensure the texture is updated
    });

    console.log("returning front texture");
    console.log(textureFront.image);
  
    return textureFront;
  };

  // if (!photoData) return <div>Loading...</div>;

  // Path to the local image (public folder)
  const imageUrl = "/mars.png";

  // Static data for title, date, and description (for testing purposes)
  const title = "Mars Surface";
  const date = "2024-10-07";
  const description =
    "This is a sample image of Mars' surface, showcasing the rocky terrain and reddish hue of the planet.";

  return (
    <Canvas >
      <ambientLight />
      <OrbitControls enableZoom={false} />
      <PolaroidOld
         imageUrl={data?.hdurl}
         title={title}
         date={date}
         description={description}
         frontTexture={textureFront}
      />      
    </Canvas>
  );
};

export default PolaroidViewerOld;
