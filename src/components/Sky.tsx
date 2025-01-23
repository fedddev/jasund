import { Color, ShaderMaterial, SphereGeometry } from "three";
import { useFrame } from "@react-three/fiber";
import skyVertexShader from "../shaders/sky/vertex.glsl";
import skyFragmentShader from "../shaders/sky/fragment.glsl";

export const Sky: React.FC = () => {
  const skyGeo = new SphereGeometry(300.0);
  skyGeo.scale(-1, 1, 1);
  const skyMat = new ShaderMaterial({
    vertexShader: skyVertexShader,
    fragmentShader: skyFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uSkyColorDay: { value: new Color(1.0, 0.6, 0.2) }, // Daytime color (orange/yellow)
      uSkyColorNight: { value: new Color(0.2, 0.2, 0.5) }, // Nighttime color (blue/indigo)
      uRotationSpeed: { value: Math.PI / 24 }, // Rotation speed (e.g., 1 rotation per day)
    },
  });
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  const totalMinutes = hours * 60 + minutes;
  const timeOfDay = totalMinutes / 1440; // 1440 minutes in a day
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (skyMat && skyMat.uniforms.uTime.value > 0.0) {
      skyMat.uniforms.uTime.value = timeOfDay + elapsedTime;
    }
  });
  return <mesh geometry={skyGeo} material={skyMat} position={[0, 0, 0]} />;
};
