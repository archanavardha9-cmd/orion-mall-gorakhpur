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
    hidden: { opacity: 0, y: 40, scale: 0.98, clipPath: 'inset(18% 0% 0% 0%)' },
    visible: { opacity: 1, y: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }
  },
  blurRise: {
    hidden: { opacity: 0, y: 44, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
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
  const ref = useRef(null);
  const inView = useInView(ref, { amount, margin: '0px 0px -8% 0px' });
  const [hasEntered, setHasEntered] = useState(false);
  const chosen = VARIANTS[variant] || VARIANTS.rise;

  useEffect(() => {
    if (inView) setHasEntered(true);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={chosen}
      transition={{
        duration,
        delay: inView ? delay : 0,
        ease: [0.22, 1, 0.36, 1]
      }}
      style={{ willChange: 'transform, opacity' }}
      className={className}
      data-revealed={hasEntered ? 'true' : 'false'}
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

  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 1], [0.35, 0.9, 1]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        style={{ scale, y, opacity, willChange: 'transform, opacity' }}
        className="origin-center"
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
      <motion.div style={{ y, x, willChange: 'transform' }}>{children}</motion.div>
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
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2, margin: '0px 0px -8% 0px' });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: '110%', opacity: 0 }}
        animate={inView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
        transition={{
          duration,
          delay: inView ? delay : 0,
          ease: [0.22, 1, 0.36, 1]
        }}
        style={{ willChange: 'transform, opacity' }}
      >
        <Tag className={className}>{text}</Tag>
      </motion.div>
    </div>
  );
}
