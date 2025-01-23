import { useEffect, useState, useRef } from "react";
import { Center, Text3D } from "@react-three/drei";
import { useStore } from "../stores/useStore";
import { Box3, Mesh, Vector3 } from "three";

export const CoolName = () => {
  const textRef = useRef<Mesh>(null);
  const startingZ = -30;
  const name = useStore((state) => state.name);
  const [centerX, setCenterX] = useState<number>(0);
  const [centerZ, setCenterZ] = useState<number>(0);
  useEffect(() => {
    if (textRef.current) {
      const bbox = new Box3().setFromObject(textRef.current);
      const size = bbox.getSize(new Vector3());
      console.log("size for ", name, " ", size);
      setCenterX(name.length <= 5 ? 0 : (-size.x * size.x) / 3);

      const angleInRadians = (50 * Math.PI) / 180;
      const distance = ((size.x * 100) / 2) * Math.tan(angleInRadians / 2);
      setCenterZ(startingZ - distance * 5.5);
    }
  }, [textRef.current, name]);
  useEffect(() => {}, [name]);
  return (
    <Center position={[centerX, 0.1, centerZ]}>
      <Text3D ref={textRef} font={"/fonts/RobotoBlack.json"} scale={0.05}>
        {name}
        <meshNormalMaterial />
      </Text3D>
    </Center>
  );
};
