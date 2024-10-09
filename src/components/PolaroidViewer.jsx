import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import Polaroid from "./Polaroid";

const PolaroidViewer = () => {
  // useEffect(() => {
  //   const fetchPhotoData = async () => {
  //     const response = await axios.get(
  //       'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'
  //     );
  //     setPhotoData(response.data);
  //   };

  //   fetchPhotoData();
  // }, []);

  // if (!photoData) return <div>Loading...</div>;

  // Path to the local image (public folder)
  const imageUrl = "/mars.png";

  // Static data for title, date, and description (for testing purposes)
  const title = "Mars Surface";
  const date = "2024-10-07";
  const description =
    "This is a sample image of Mars' surface, showcasing the rocky terrain and reddish hue of the planet.";

  return (
    <Canvas style={{ width: "100vw", height: "100vh" }}>
      <ambientLight />
      <OrbitControls enableZoom={false} />
      <Polaroid
         imageUrl={imageUrl}
         title={title}
         date={date}
         description={description}
      />
    </Canvas>
  );
};

export default PolaroidViewer;
