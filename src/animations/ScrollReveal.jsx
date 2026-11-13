import { DramaticReveal } from './MotionPrimitives';

export function ScrollReveal({
  children,
  variant = 'rise',
  delay = 0,
  duration = 0.42,
  amount,
  className = ''
}) {
  return (
    <DramaticReveal
      variant={variant}
      delay={delay}
      duration={duration}
      amount={amount}
      className={className}
    >
      {children}
    </DramaticReveal>
  );
}

