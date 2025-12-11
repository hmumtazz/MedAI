
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Cylinder, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';


declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      meshStandardMaterial: any;
      ambientLight: any;
      pointLight: any;
      spotLight: any;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      meshStandardMaterial: any;
      ambientLight: any;
      pointLight: any;
      spotLight: any;
    }
  }
}

const MoleculeParticle = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 1 + position[0]) * 0.1;
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.z = t * 0.1;
    }
  });

  return (
    <group position={position} scale={scale}>
        <Sphere ref={ref} args={[1, 32, 32]}>
        <MeshDistortMaterial
            color={color}
            envMapIntensity={1}
            clearcoat={1}
            roughness={0.2}
            metalness={0.1}
            distort={0.3}
            speed={1.5}
        />
        </Sphere>
        <Sphere args={[0.4, 16, 16]} position={[1.2, 0.5, 0]}>
            <meshStandardMaterial color="#0EA5E9" />
        </Sphere>
        <Sphere args={[0.4, 16, 16]} position={[-0.8, -1, 0.5]}>
            <meshStandardMaterial color="#0EA5E9" />
        </Sphere>
    </group>
  );
};

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <MoleculeParticle position={[0, 0, 0]} color="#0D9488" scale={1.2} />
        </Float>
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
           <MoleculeParticle position={[-3.5, 1.5, -2]} color="#14B8A6" scale={0.5} />
           <MoleculeParticle position={[3.5, -1.5, -3]} color="#0F766E" scale={0.6} />
           <MoleculeParticle position={[2, 2, -4]} color="#99F6E4" scale={0.4} />
        </Float>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export const DnaScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={1} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} color="#0D9488" />
        <Environment preset="studio" />
        
        <Float rotationIntensity={0.4} floatIntensity={0.2} speed={1}>
          <group rotation={[0, 0, Math.PI / 6]}>
            <DNAStrand />
          </group>
        </Float>
      </Canvas>
    </div>
  );
};

const DNAStrand = () => {
    const groupRef = useRef<THREE.Group>(null);
    const count = 20;
    const spacing = 0.4;
    
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
        }
    });

    return (
        <group ref={groupRef}>
            {Array.from({ length: count }).map((_, i) => {
                const y = (i - count / 2) * spacing;
                const angle = i * 0.5;
                const radius = 1.5;
                
                return (
                    <group key={i} position={[0, y, 0]}>
                        <Sphere args={[0.2, 16, 16]} position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}>
                             <meshStandardMaterial color="#0D9488" />
                        </Sphere>
                        <Sphere args={[0.2, 16, 16]} position={[Math.sin(angle + Math.PI) * radius, 0, Math.cos(angle + Math.PI) * radius]}>
                             <meshStandardMaterial color="#0EA5E9" />
                        </Sphere>
                        <Cylinder args={[0.05, 0.05, radius * 2, 8]} rotation={[0, angle + Math.PI / 2, Math.PI / 2]}>
                             <meshStandardMaterial color="#CBD5E1" transparent opacity={0.5} />
                        </Cylinder>
                    </group>
                )
            })}
        </group>
    )
}