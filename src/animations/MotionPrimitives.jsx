import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const VARIANTS = {
  rise: {
    hidden: { opacity: 0, y: 54 },
    visible: { opacity: 1, y: 0 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 72 },
    visible: { opacity: 1, x: 0 }
  },
  slideRight: {
    hidden: { opacity: 0, x: -72 },
    visible: { opacity: 1, x: 0 }
  },
  scaleDepth: {
    hidden: { opacity: 0, scale: 0.9, y: 36 },
    visible: { opacity: 1, scale: 1, y: 0 }
  },
  curtain: {
    hidden: { opacity: 0, y: 32, clipPath: 'inset(16% 0% 0% 0%)' },
    visible: { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }
  }
};

export function DramaticReveal({
  children,
  variant = 'rise',
  delay = 0,
  duration = 0.72,
  className = ''
}) {
  const chosen = VARIANTS[variant] || VARIANTS.rise;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.14 }}
      variants={chosen}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Continuous scroll-driven 3D depth emergence (works smoothly both down and up) */
export function DepthEmergeSection({ children, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center']
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [56, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.25, 0.85, 1]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        style={{ scale, y, opacity }}
        className="will-change-transform origin-center"
      >
        {children}
      </motion.div>
    </div>
  );
}

/* Scroll-linked directional horizontal or vertical glide */
export function ParallaxDepth({ children, offset = 52, horizontal = 0, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const x = useTransform(scrollYProgress, [0, 1], [-horizontal, horizontal]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y, x }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

export function Interactive3DTilt({ children, className = '', intensity = 8 }) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (0.5 - y) * intensity,
      rotateY: (x - 0.5) * intensity
    });
  };

  const resetTilt = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 24, mass: 0.6 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function KineticLineReveal({ text, className = '', as = 'h2', delay = 0 }) {
  const Tag = as;
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: false, amount: 0.16 }}
        transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <Tag className={className}>{text}</Tag>
      </motion.div>
    </div>
  );
}
