import { Canvas, useFrame } from "@react-three/fiber";
import {
    Float,
    MeshTransmissionMaterial,
    Environment,
    TorusKnot,
    Sphere,
    PresentationControls,
    ContactShadows
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function PremiumSculpture() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <TorusKnot ref={meshRef} args={[1.5, 0.4, 256, 32]} position={[0, 0, 0]}>
                    <MeshTransmissionMaterial
                        backside
                        samples={4}
                        thickness={2}
                        chromaticAberration={0.05}
                        anisotropy={0.1}
                        distortion={0.1}
                        distortionScale={0.1}
                        temporalDistortion={0.2}
                        clearcoat={1}
                        attenuationDistance={0.5}
                        attenuationColor="#ffffff"
                        color="#fce7f3"
                    />
                </TorusKnot>
            </Float>

            {/* Subtle supporting elements */}
            <Float speed={3} rotationIntensity={2} floatIntensity={2}>
                <Sphere args={[0.2, 32, 32]} position={[3, 1, -2]}>
                    <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={2} />
                </Sphere>
            </Float>
            <Float speed={4} rotationIntensity={1} floatIntensity={3}>
                <Sphere args={[0.15, 32, 32]} position={[-3, -1, -3]}>
                    <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={2} />
                </Sphere>
            </Float>
        </group>
    );
}

export default function HeroVisual() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    powerPreference: "high-performance",
                    alpha: true,
                }}
            >
                <color attach="background" args={["transparent"]} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#f9a8d4" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />

                <PresentationControls
                    global
                    config={{ mass: 2, tension: 500 }}
                    snap={{ mass: 4, tension: 1500 }}
                    rotation={[0, 0.3, 0]}
                    polar={[-Math.PI / 3, Math.PI / 3]}
                    azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
                >
                    <PremiumSculpture />
                </PresentationControls>

                <ContactShadows
                    position={[0, -3.5, 0]}
                    opacity={0.4}
                    scale={20}
                    blur={2}
                    far={4.5}
                />

                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
