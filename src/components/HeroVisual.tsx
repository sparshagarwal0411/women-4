import { Canvas, useFrame } from "@react-three/fiber";
import {
    Float,
    MeshTransmissionMaterial,
    Environment,
    TorusKnot,
    Sphere,
    PresentationControls,
    ContactShadows,
    AdaptiveDpr
} from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

interface PremiumSculptureProps {
    darkMode: boolean;
}

function PremiumSculpture({ darkMode }: PremiumSculptureProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
        }
    });

    const materialProps = useMemo(() => ({
        backside: true,
        samples: 2, // Optimized from 4
        thickness: 1.5,
        chromaticAberration: 0.03, // Subtle
        anisotropy: 0.1,
        distortion: 0.05,
        distortionScale: 0.1,
        temporalDistortion: 0.1,
        clearcoat: 0.8,
        attenuationDistance: 0.5,
        attenuationColor: darkMode ? "#1e1b4b" : "#ffffff",
        color: darkMode ? "#312e81" : "#fce7f3",
    }), [darkMode]);

    return (
        <group>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <TorusKnot
                    ref={meshRef}
                    args={[1.5, 0.4, 128, 24]} // Optimized geometry (was 256, 32)
                    position={[0, 0, 0]}
                >
                    <MeshTransmissionMaterial {...materialProps} />
                </TorusKnot>
            </Float>

            {/* Subtle supporting elements */}
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <Sphere args={[0.2, 16, 16]} position={[3, 1, -2]}>
                    <meshStandardMaterial
                        color={darkMode ? "#4f46e5" : "#8b5cf6"}
                        emissive={darkMode ? "#4f46e5" : "#8b5cf6"}
                        emissiveIntensity={1.5}
                    />
                </Sphere>
            </Float>
            <Float speed={3} rotationIntensity={0.5} floatIntensity={2}>
                <Sphere args={[0.15, 16, 16]} position={[-3, -1, -3]}>
                    <meshStandardMaterial
                        color={darkMode ? "#818cf8" : "#ec4899"}
                        emissive={darkMode ? "#818cf8" : "#ec4899"}
                        emissiveIntensity={1.5}
                    />
                </Sphere>
            </Float>
        </group>
    );
}

interface HeroVisualProps {
    darkMode: boolean;
}

export default function HeroVisual({ darkMode }: HeroVisualProps) {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                dpr={[1, 1.5]} // Optimized DPR (was [1, 2])
                gl={{
                    antialias: true,
                    powerPreference: "high-performance",
                    alpha: true,
                    stencil: false,
                    depth: true
                }}
            >
                <AdaptiveDpr pixelated />
                <color attach="background" args={["transparent"]} />
                <ambientLight intensity={darkMode ? 0.3 : 0.5} />
                <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    intensity={darkMode ? 1.5 : 2}
                    color={darkMode ? "#4f46e5" : "#f9a8d4"}
                />
                <pointLight
                    position={[-10, -10, -10]}
                    intensity={darkMode ? 0.8 : 1}
                    color={darkMode ? "#818cf8" : "#8b5cf6"}
                />

                <PresentationControls
                    global
                    config={{ mass: 2, tension: 500 }}
                    snap={{ mass: 4, tension: 1500 }}
                    rotation={[0, 0.3, 0]}
                    polar={[-Math.PI / 3, Math.PI / 3]}
                    azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
                >
                    <PremiumSculpture darkMode={darkMode} />
                </PresentationControls>

                <ContactShadows
                    position={[0, -3.5, 0]}
                    opacity={darkMode ? 0.6 : 0.4}
                    scale={20}
                    blur={2.5}
                    far={4.5}
                />

                <Environment preset={darkMode ? "night" : "city"} />
            </Canvas>
        </div>
    );
}
