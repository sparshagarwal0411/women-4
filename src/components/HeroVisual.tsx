import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Points, PointMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function AnimatedStars() {
    const points = useMemo(() => {
        const p = new Float32Array(1500);
        for (let i = 0; i < 1500; i++) {
            p[i] = (Math.random() - 0.5) * 10;
        }
        return p;
    }, []);

    const starRef = useRef<THREE.Points>(null);

    useFrame((state) => {
        if (starRef.current) {
            starRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
            starRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
        }
    });

    return (
        <Points ref={starRef} positions={points} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#ff69b4"
                size={0.015}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.4}
            />
        </Points>
    );
}

function FloatingShapes() {
    return (
        <>
            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                <Sphere args={[1, 24, 24]} position={[2, 1, -2]}>
                    <MeshDistortMaterial
                        color="#ec4899"
                        speed={3}
                        distort={0.4}
                        radius={1}
                        transparent
                        opacity={0.3}
                    />
                </Sphere>
            </Float>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
                <Sphere args={[0.8, 24, 24]} position={[-2, -1, -1]}>
                    <MeshDistortMaterial
                        color="#8b5cf6"
                        speed={2}
                        distort={0.3}
                        radius={0.8}
                        transparent
                        opacity={0.3}
                    />
                </Sphere>
            </Float>
            <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2.5}>
                <Sphere args={[0.5, 24, 24]} position={[0, -2, -3]}>
                    <MeshDistortMaterial
                        color="#ff69b4"
                        speed={4}
                        distort={0.5}
                        radius={0.5}
                        transparent
                        opacity={0.2}
                    />
                </Sphere>
            </Float>
        </>
    );
}

export default function HeroVisual() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60 dark:opacity-40 bg-transparent">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                dpr={[1, 2]}
                gl={{
                    antialias: false,
                    powerPreference: "high-performance",
                    alpha: true,
                    stencil: false,
                    depth: true
                }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ff69b4" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
                <AnimatedStars />
                <FloatingShapes />
            </Canvas>
        </div>
    );
}
