import { useModelStore } from "../store/model-store";

const wallColor = "#CECEC8";
const floorColor = "#e0c097";

export default function Room() {
  const { width, depth, height } = useModelStore((s) => s.roomSize);

  return (
    <>
      {/* Back Wall */}
      <mesh position={[0, height / 2, -depth / 2]}>
        <boxGeometry args={[width, height, 0.1]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Left Wall */}
      <mesh
        position={[-width / 2, height / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <boxGeometry args={[depth, height, 0.1]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Right Wall */}
      <mesh
        position={[width / 2, height / 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <boxGeometry args={[depth, height, 0.1]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color={floorColor} />
      </mesh>
    </>
  );
}
