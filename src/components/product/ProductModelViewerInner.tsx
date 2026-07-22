"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Float,
  MeshDistortMaterial,
} from "@react-three/drei";
import type { Group } from "three";
import { cn } from "@/lib/utils";

type MachineVariant = "crusher" | "tractor" | "ballMill" | "default";

function resolveVariant(modelNumber?: string, modelUrl?: string | null): MachineVariant {
  const key = `${modelNumber ?? ""} ${modelUrl ?? ""}`.toLowerCase();
  if (key.includes("gcm") || key.includes("crusher")) return "crusher";
  if (key.includes("tr-") || key.includes("tractor")) return "tractor";
  if (key.includes("bm-") || key.includes("ball")) return "ballMill";
  return "default";
}

function CrusherMesh() {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.25;
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1.6, 0.8, 1.2]} />
        <meshStandardMaterial color="#4E4742" metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh position={[0, 1.1, 0]} castShadow>
        <coneGeometry args={[0.55, 0.9, 4]} />
        <meshStandardMaterial color="#E05B2B" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[-0.9, 0.15, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 1.4, 16]} />
        <meshStandardMaterial color="#35302C" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0.9, 0.15, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 1.4, 16]} />
        <meshStandardMaterial color="#35302C" metalness={0.8} roughness={0.25} />
      </mesh>
    </group>
  );
}

function TractorMesh() {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.2;
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[1.4, 0.5, 0.9]} />
        <meshStandardMaterial color="#E05B2B" metalness={0.4} roughness={0.5} />
      </mesh>
      <mesh position={[0.35, 0.75, 0]} castShadow>
        <boxGeometry args={[0.5, 0.45, 0.55]} />
        <meshStandardMaterial color="#000000" metalness={0.3} roughness={0.6} />
      </mesh>
      {[
        [-0.55, 0.2, 0.35],
        [-0.55, 0.2, -0.35],
        [0.55, 0.2, 0.35],
        [0.55, 0.2, -0.35],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.15, 24]} />
          <meshStandardMaterial color="#35302C" metalness={0.6} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}

function BallMillMesh() {
  const drum = useRef<Group>(null);
  useFrame((_, delta) => {
    if (drum.current) drum.current.rotation.z += delta * 0.35;
  });

  return (
    <group>
      <mesh position={[-0.7, 0.2, 0]} castShadow>
        <boxGeometry args={[0.3, 0.4, 0.5]} />
        <meshStandardMaterial color="#4E4742" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.7, 0.2, 0]} castShadow>
        <boxGeometry args={[0.3, 0.4, 0.5]} />
        <meshStandardMaterial color="#4E4742" metalness={0.7} roughness={0.3} />
      </mesh>
      <group ref={drum} position={[0, 0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.45, 0.45, 1.6, 32]} />
          <meshStandardMaterial color="#9B3311" metalness={0.65} roughness={0.35} />
        </mesh>
      </group>
    </group>
  );
}

function DefaultMesh() {
  const mesh = useRef<Group>(null);
  useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.3;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={mesh}>
        <mesh castShadow>
          <icosahedronGeometry args={[0.75, 1]} />
          <MeshDistortMaterial
            color="#E05B2B"
            metalness={0.6}
            roughness={0.25}
            distort={0.25}
            speed={1.5}
          />
        </mesh>
      </group>
    </Float>
  );
}

function MachineScene({ variant }: { variant: MachineVariant }) {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-4, 3, -2]} intensity={0.35} color="#FA834E" />
      <Environment preset="warehouse" />
      {variant === "crusher" && <CrusherMesh />}
      {variant === "tractor" && <TractorMesh />}
      {variant === "ballMill" && <BallMillMesh />}
      {variant === "default" && <DefaultMesh />}
      <ContactShadows
        position={[0, -0.35, 0]}
        opacity={0.45}
        scale={8}
        blur={2.5}
        far={4}
      />
      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        minDistance={2.5}
        maxDistance={6}
      />
    </>
  );
}

export interface ProductModelViewerInnerProps {
  modelNumber?: string;
  modelUrl?: string | null;
  className?: string;
}

export default function ProductModelViewerInner({
  modelNumber,
  modelUrl,
  className,
}: ProductModelViewerInnerProps) {
  const variant = resolveVariant(modelNumber, modelUrl);

  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-brand-lg border border-brand-border/30 bg-gradient-to-br from-brand-primary to-brand-surface",
        className
      )}
    >
      <Canvas
        shadows
        camera={{ position: [2.8, 1.8, 3.2], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <MachineScene variant={variant} />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-primary/80 to-transparent p-4">
        <p className="text-label uppercase tracking-widest text-brand-accent/90">
          Interactive 3D Preview
        </p>
        <p className="text-body-sm text-brand-light/60">
          Drag to rotate · Scroll to zoom
        </p>
      </div>
    </div>
  );
}
