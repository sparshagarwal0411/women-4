import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ReactNode } from "react";

interface TiltCarouselProps {
    children: ReactNode[];
}

export default function TiltCarousel({ children }: TiltCarouselProps) {
    return (
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center py-10 px-4 overflow-visible">
            {children.map((child, index) => (
                <TiltCard key={index} delay={index * 0.1}>
                    {child}
                </TiltCard>
            ))}
        </div>
    );
}

function TiltCard({ children, delay }: { children: ReactNode; delay: number }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);

    const springConfig = { damping: 20, stiffness: 300 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const xPct = (mouseX / width - 0.5) * 200;
        const yPct = (mouseY / height - 0.5) * 200;
        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 0, rotateY: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.16, 1, 0.3, 1]
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative w-full max-w-[400px] h-full"
        >
            <div
                style={{ transform: "translateZ(50px)" }}
                className="w-full h-full"
            >
                {children}
            </div>

            {/* Decorative background depth effect */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-3xl blur-2xl -z-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                style={{ transform: "translateZ(-20px)" }}
            />
        </motion.div>
    );
}
