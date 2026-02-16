import { motion } from "framer-motion";

interface HeroVisualProps {
    darkMode: boolean;
}

export default function HeroVisual({ darkMode }: HeroVisualProps) {
    return (
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
            {/* Dynamic Logo Zoom Intro */}
            <motion.div
                initial={{ opacity: 0, scale: 3, filter: "blur(20px)" }}
                animate={{
                    opacity: [0, 1, 1, 0.2],
                    scale: [3, 1, 0.8, 0.7],
                    filter: ["blur(20px)", "blur(0px)", "blur(0px)", "blur(4px)"],
                }}
                transition={{
                    duration: 3.5,
                    times: [0, 0.3, 0.7, 1],
                    ease: "easeInOut",
                }}
                className="relative w-[300px] md:w-[600px] lg:w-[800px] aspect-square flex items-center justify-center"
            >
                <img
                    src="/WomenPreneur.png"
                    alt="WomenPreneur Logo"
                    className={`w-full h-full object-contain transition-all duration-1000 ${darkMode ? "drop-shadow-[0_0_80px_rgba(168,85,247,0.4)] brightness-125" : "drop-shadow-[0_0_60px_rgba(244,114,182,0.3)]"
                        }`}
                />

            </motion.div>

            {/* Persistent Very Subtle Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/5 via-transparent to-purple-500/5 dark:from-primary-900/10 dark:to-purple-900/10" />

            {/* Floating particles or subtle movement can be added here if needed, 
          but keeping it clean as per request for logo background */}
        </div>
    );
}
