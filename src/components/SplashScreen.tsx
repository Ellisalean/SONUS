import { motion } from 'motion/react';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onAnimationComplete={() => setTimeout(onFinish, 6000)} // Matches animation video length
            className="flex items-center justify-center w-screen h-screen bg-slate-950 p-0 m-0"
        >
            <video
                src="/sonus-logo-animation.mp4"
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
            />
        </motion.div>
    );
}
