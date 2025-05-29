import { Canvas } from "@react-three/fiber";
import { OrbitControls, TransformControls } from "@react-three/drei";
import Room from "./room";
import { useRef, useEffect, useState } from "react";
import { useModelStore } from "../store/model-store";
import { GLBModel } from "./glb-model";
import * as THREE from "three";
import { useSpring, a } from "@react-spring/three";

interface VisualizerCanvasProps {
  lightsOn: boolean;
}

export default function VisualizerCanvas({ lightsOn }: VisualizerCanvasProps) {
  const models = useModelStore((s) => s.models);
  const selectedIndex = useModelStore((s) => s.selectedIndex);
  const setSelectedIndex = useModelStore((s) => s.setSelectedIndex);
  const updateModelPosition = useModelStore((s) => s.updateModelPosition);

  const groupRefs = useRef<(THREE.Group | null)[]>([]);
  const transformRef = useRef<any>(null);
  const orbitRef = useRef<any>(null);

  const [transformTarget, setTransformTarget] = useState<THREE.Object3D | null>(
    null
  );

  const { ambientIntensity, directionalIntensity } = useSpring({
    ambientIntensity: lightsOn ? 0.5 : 0.05,
    directionalIntensity: lightsOn ? 0.8 : 0.1,
    config: { tension: 100, friction: 20 },
  });

  useEffect(() => {
    const controls = transformRef.current;
    if (!controls) return;

    const callback = (e: any) => {
      if (orbitRef.current) {
        orbitRef.current.enabled = !e.value;
      }
    };

    controls.addEventListener("dragging-changed", callback);
    return () => controls.removeEventListener("dragging-changed", callback);
  }, []);

  useEffect(() => {
    if (selectedIndex !== null && groupRefs.current[selectedIndex]) {
      setTransformTarget(groupRefs.current[selectedIndex]);
    } else {
      setTransformTarget(null);
    }
  }, [selectedIndex, models.length]);

  return (
    <Canvas
      camera={{ position: [0, 5, 10], fov: 50 }}
      className="w-full h-full"
      onPointerMissed={() => {
        setSelectedIndex(null);
      }}
    >
      <a.ambientLight intensity={ambientIntensity} />
      <a.directionalLight
        position={[5, 10, 5]}
        intensity={directionalIntensity}
      />
      <Room />
      <OrbitControls ref={orbitRef} makeDefault />

      {models.map((model, index) => (
        <GLBModel
          key={index}
          url={model.url}
          position={model.position}
          rotation={model.rotation}
          isSelected={selectedIndex === index}
          onClick={() => setSelectedIndex(index)}
          category={model.category}
          ref={(ref: THREE.Group | null) => {
            groupRefs.current[index] = ref ?? null;

            if (selectedIndex === index && ref) {
              setTransformTarget(ref);
            }
          }}
        />
      ))}

      {transformTarget && (
        <TransformControls
          key={selectedIndex ?? "none"}
          ref={transformRef}
          object={transformTarget}
          mode="translate"
          onObjectChange={() => {
            if (selectedIndex !== null && groupRefs.current[selectedIndex]) {
              const pos = groupRefs.current[selectedIndex].position;
              updateModelPosition(selectedIndex, [pos.x, pos.y, pos.z]);
            }
          }}
        />
      )}
    </Canvas>
  );
}
