import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function Geometry() {
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <mesh ref={meshRef}>
            <torusKnotGeometry args={[1, 0.3, 128, 16]} />
            <meshBasicMaterial color="#ea580c" wireframe />
        </mesh>
    );
}

export const Hero3D = () => {
    return (
        <div className="absolute right-0 top-0 w-full md:w-1/2 h-full z-0 opacity-50 md:opacity-100 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 2]}>
                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                    <Geometry />
                </Float>
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/50 to-white" />
        </div>
    );
};
