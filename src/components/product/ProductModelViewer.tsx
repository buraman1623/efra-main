"use client";

import React, { useRef, Component, ReactNode, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Environment,
  ContactShadows,
  Center,
} from "@react-three/drei";
import * as THREE from "three";
import { models } from "@/lib/assets/images";
import { useLocale } from "@/lib/i18n/LocaleProvider";

// Catch 404s or missing .glb files safely
class ModelErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface ModelProps {
  url: string;
}

function Model({ url }: ModelProps) {
  const { scene } = useGLTF(url);
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Center>
      <group ref={meshRef}>
        <primitive object={scene} scale={1.5} />
      </group>
    </Center>
  );
}

function PlaceholderShape() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <Center>
      <group ref={meshRef}>
        <mesh castShadow receiveShadow>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshStandardMaterial
            color="#fbbf24"
            wireframe
            emissive="#b45309"
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.3, 0]} />
          <meshStandardMaterial
            color="#27272a"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </group>
    </Center>
  );
}

interface ProductModelViewerProps {
  modelUrl?: string | null;
  fallbackModelType?: "crusher" | "tractor" | "ballMill" | "placeholder";
}

export default function ProductModelViewer({
  modelUrl,
  fallbackModelType = "placeholder",
}: ProductModelViewerProps) {
  const urlToLoad =
    modelUrl || models[fallbackModelType] || models.placeholder;
  const { t } = useLocale();

  if (urlToLoad) {
    useGLTF.preload(urlToLoad);
  }

  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[600px] bg-gradient-to-b from-[var(--color-bg-elevated)] to-[var(--color-bg)] rounded-brand-xl overflow-hidden relative cursor-grab active:cursor-grabbing border border-[var(--color-border)] shadow-brand-sm">
      <div className="absolute top-4 left-4 z-10 bg-brand-surface/80 backdrop-blur-sm text-[var(--color-text)] text-xs font-semibold px-3 py-1.5 rounded-full border border-brand-border flex items-center gap-2 shadow-brand-sm">
        <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse" />
        {t.products.interactive3dViewer}
      </div>

      <Canvas shadows camera={{ position: [0, 2, 5], fov: 45 }}>
        <color attach="background" args={["var(--color-bg-elevated)"]} />
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[10, 10, 5]}
          intensity={1.5}
          shadow-mapSize={[1024, 1024]}
        />

        <ModelErrorBoundary fallback={<PlaceholderShape />}>
          <Suspense fallback={<PlaceholderShape />}>
            <Model url={urlToLoad} />
          </Suspense>
        </ModelErrorBoundary>

        <Environment preset="city" />
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.5}
          scale={10}
          blur={2}
          far={4}
        />
        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          minDistance={2}
          maxDistance={10}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}