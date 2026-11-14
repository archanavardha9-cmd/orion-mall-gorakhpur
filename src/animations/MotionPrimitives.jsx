import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';

const VARIANTS = {
  rise: {
    hidden: { opacity: 0, y: 64, scale: 0.985 },
    visible: { opacity: 1, y: 0, scale: 1 }
  },
  drop: {
    hidden: { opacity: 0, y: -48, scale: 0.985 },
    visible: { opacity: 1, y: 0, scale: 1 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 84, scale: 0.985 },
    visible: { opacity: 1, x: 0, scale: 1 }
  },
  slideRight: {
    hidden: { opacity: 0, x: -84, scale: 0.985 },
    visible: { opacity: 1, x: 0, scale: 1 }
  },
  scaleDepth: {
    hidden: { opacity: 0, scale: 0.88, y: 28 },
    visible: { opacity: 1, scale: 1, y: 0 }
  },
  pop: {
    hidden: { opacity: 0, scale: 0.82, y: 18 },
    visible: { opacity: 1, scale: 1, y: 0 }
  },
  curtain: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 }
  },
  blurRise: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 }
  }
};

export function DramaticReveal({
  children,
  variant = 'rise',
  delay = 0,
  duration = 0.45,
  amount = 0.12,
  className = ''
}) {
  const chosen = VARIANTS[variant] || VARIANTS.rise;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={chosen}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      style={{ willChange: 'transform, opacity' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Depth container */
export function DepthEmergeSection({ children, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
}

/* Depth container */
export function ParallaxDepth({ children, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      {children}
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

export function KineticLineReveal({
  text,
  className = '',
  as = 'h2',
  delay = 0,
  duration = 0.45
}) {
  const Tag = as;

  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: '110%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1]
        }}
        style={{ willChange: 'transform, opacity' }}
      >
        <Tag className={className}>{text}</Tag>
      </motion.div>
    </div>
  );
}
