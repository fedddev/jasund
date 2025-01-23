import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { MathUtils, Vector3 } from "three";
import { CoolName } from "./components/CoolName";
import { Sky } from "./components/Sky";
import { CssPanel } from "./components/CssPanel";

export function App() {
  return (
    <Canvas
      style={{ width: "100vw", height: "100vh", background: "black" }}
      camera={{ fov: 0.75, near: 0.1, far: 10000, position: [0, 0, 0] }}
    >
      <OrbitControls
        target={new Vector3(0, 0, -30)}
        enableZoom={true}
        zoomSpeed={0.15}
        rotateSpeed={0.0015}
        enablePan={false}
        enableRotate={true}
        minAzimuthAngle={-MathUtils.degToRad(15)}
        maxAzimuthAngle={MathUtils.degToRad(15)}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Sky />
      <CoolName />
      <CssPanel />
    </Canvas>
  );
}
