import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import clsx from 'clsx';

// React Bits inspired hover card component
interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'lift' | 'glow' | 'tilt';
}

export const HoverCard: React.FC<HoverCardProps> = ({ 
  children, 
  className, 
  variant = 'lift' 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    lift: {
      rest: { y: 0, scale: 1 },
      hover: { y: -8, scale: 1.02 }
    },
    glow: {
      rest: { boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' },
      hover: { boxShadow: '0 20px 40px rgba(212, 168, 106, 0.15)' }
    },
    tilt: {
      rest: { rotateX: 0, rotateY: 0 },
      hover: { rotateX: 5, rotateY: 5 }
    }
  };

  return (
    <motion.div
      className={clsx('cursor-pointer', className)}
      variants={variants[variant]}
      initial="rest"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{ perspective: 1000 }}
    >
      {children}
      
      {/* Shimmer effect overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
            style={{ zIndex: 1 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// React Bits inspired magnetic button
interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className
}) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    onClick?.();
  };

  return (
    <motion.button
      ref={buttonRef}
      className={clsx(
        'relative overflow-hidden font-semibold transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'px-6 py-3 rounded-xl flex items-center justify-center gap-2',
        {
          'bg-[var(--color-accent)] text-black border-2 border-[var(--color-accent)] hover:bg-white focus:ring-[var(--color-accent)]': variant === 'primary',
          'bg-transparent text-white border-2 border-white hover:bg-white hover:text-black focus:ring-white': variant === 'secondary',
        },
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute rounded-full bg-white/30"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Shimmer effect */}
      <motion.div
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

// React Bits inspired stagger container
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className,
  staggerDelay = 0.1
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// React Bits inspired loading indicator
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  return (
    <motion.div
      className={clsx(
        'border-2 border-current border-t-transparent rounded-full',
        sizeClasses[size]
      )}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
};

// React Bits inspired floating element
interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className
}) => {
  return (
    <motion.div
      className={className}
      animate={{ 
        y: [0, -10, 0],
        rotate: [0, 1, -1, 0]
      }}
      transition={{ 
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

// Export a demo component showcasing all interactions
export const InteractiveShowcase: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6">Enhanced Micro-Interactions</h2>
      
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HoverCard variant="lift" className="relative p-6 bg-white/5 border border-white/10 rounded-xl">
          <h3 className="text-xl font-semibold text-white mb-2">Lift Effect</h3>
          <p className="text-gray-300">Hover to see the lift and scale animation</p>
        </HoverCard>

        <HoverCard variant="glow" className="relative p-6 bg-white/5 border border-white/10 rounded-xl">
          <h3 className="text-xl font-semibold text-white mb-2">Glow Effect</h3>
          <p className="text-gray-300">Hover to see the enhanced shadow glow</p>
        </HoverCard>

        <HoverCard variant="tilt" className="relative p-6 bg-white/5 border border-white/10 rounded-xl">
          <h3 className="text-xl font-semibold text-white mb-2">Tilt Effect</h3>
          <p className="text-gray-300">Hover to see the 3D tilt animation</p>
        </HoverCard>

        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <h3 className="text-xl font-semibold text-white mb-4">Interactive Buttons</h3>
          <div className="flex gap-4">
            <MagneticButton variant="primary">
              Primary Button
            </MagneticButton>
            <MagneticButton variant="secondary">
              Secondary Button
            </MagneticButton>
          </div>
        </div>
      </StaggerContainer>

      <div className="flex items-center justify-center gap-4">
        <LoadingSpinner size="sm" />
        <LoadingSpinner size="md" />
        <LoadingSpinner size="lg" />
      </div>

      <FloatingElement className="flex justify-center">
        <div className="w-16 h-16 bg-[var(--color-accent)] rounded-full flex items-center justify-center">
          <span className="text-black font-bold">Float</span>
        </div>
      </FloatingElement>
    </div>
  );
}; 