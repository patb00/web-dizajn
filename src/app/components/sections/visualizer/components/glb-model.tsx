import { forwardRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const GLBModel = forwardRef<
  THREE.Group,
  {
    url: string;
    category: string;
    position: [number, number, number];
    rotation: [number, number, number];
    isSelected: boolean;
    onClick: () => void;
  }
>(({ url, category, position, rotation, isSelected, onClick }, ref) => {
  const { scene } = useGLTF(url);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  const targetSizesByCategory: Record<string, number> = {
    closet: 3,
    bed: 2.5,
    table: 2,
    couch: 1.7,
    nightstand: 0.8,
    chair: 1.5,
    lamp: 1.2,
  };

  const targetSize = targetSizesByCategory[category] || 2;

  const autoScale = useMemo(() => {
    const bbox = new THREE.Box3().setFromObject(clonedScene);
    const size = new THREE.Vector3();
    bbox.getSize(size);
    const maxDimension = Math.max(size.x, size.y, size.z);
    const scale = maxDimension > 0 ? targetSize / maxDimension : 1;
    return [scale, scale, scale] as [number, number, number];
  }, [clonedScene, targetSize]);

  const outline = useMemo(() => {
    const outlineScene = clonedScene.clone(true);
    outlineScene.traverse((child: any) => {
      if (child.isMesh) {
        child.material = new THREE.MeshBasicMaterial({
          color: "#246CA9",
          side: THREE.BackSide,
        });
      }
    });
    return outlineScene;
  }, [clonedScene]);

  return (
    <group
      ref={ref as any}
      position={position}
      rotation={rotation}
      scale={autoScale}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {isSelected && <primitive object={outline} scale={[1.05, 1.05, 1.05]} />}
      <primitive object={clonedScene} />
    </group>
  );
});
