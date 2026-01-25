import { motion, useScroll, useTransform } from 'motion/react';

const ScrollIndicator = () => {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 50], [0.8, 0]);

    return (
        <motion.div
            style={{ opacity }}
            className="flex flex-col items-center justify-center gap-2 pointer-events-none"
        >
            <div className="relative w-[22px] h-[36px] rounded-full border-[1.5px] border-white/80 p-1 box-border">
                <motion.div
                    animate={{
                        y: [0, 14, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    }}
                    className="w-1 h-1 rounded-full bg-white mx-auto mt-1"
                />
            </div>
            <span className="text-white/80 text-[10px] tracking-[0.2em] font-light uppercase">Scroll</span>
        </motion.div>
    );
};

export default ScrollIndicator;
