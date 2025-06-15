import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface EnhancedButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

// React Bits inspired button animations
const buttonVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { type: "spring", stiffness: 400, damping: 25 }
  },
  tap: { 
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

const rippleVariants = {
  initial: { scale: 0, opacity: 0.6 },
  animate: { 
    scale: 4, 
    opacity: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const loadingVariants = {
  initial: { rotate: 0 },
  animate: { 
    rotate: 360,
    transition: { duration: 1, repeat: Infinity, ease: "linear" }
  }
};

const shimmerVariants = {
  initial: { x: "-100%" },
  animate: { 
    x: "100%",
    transition: { duration: 1.5, ease: "easeInOut" }
  }
};

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  onClick,
  href,
  target,
  rel,
  icon,
  iconPosition = 'left',
  className,
}) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled || isLoading) return;

    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    onClick?.();
  };

  const baseClasses = clsx(
    "relative overflow-hidden font-semibold transition-all duration-300",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "flex items-center justify-center gap-2",
    // Size variants
    {
      'px-3 py-2 text-sm rounded-md': size === 'sm',
      'px-4 py-2 text-base rounded-lg': size === 'md',
      'px-6 py-3 text-lg rounded-xl': size === 'lg',
    },
    // Variant styles
    {
      'bg-[var(--color-accent)] text-black border-2 border-[var(--color-accent)] hover:bg-white focus:ring-[var(--color-accent)]': variant === 'primary',
      'bg-transparent text-white border-2 border-white hover:bg-white hover:text-black focus:ring-white': variant === 'outline',
      'bg-[var(--color-accent)] text-black border-2 border-[var(--color-accent)] hover:bg-[#c49c5a] focus:ring-[var(--color-accent)]': variant === 'accent',
    },
    className
  );

  const content = (
    <>
      {/* Shimmer effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          whileHover="animate"
          className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </div>

      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            variants={rippleVariants}
            initial="initial"
            animate="animate"
            exit="initial"
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

      {/* Content */}
      <div className="relative z-10 flex items-center gap-2">
        {isLoading ? (
          <motion.div
            variants={loadingVariants}
            initial="initial"
            animate="animate"
            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
          />
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {icon}
              </motion.span>
            )}
            
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: isLoading ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.span>
            
            {icon && iconPosition === 'right' && (
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {icon}
              </motion.span>
            )}
          </>
        )}
      </div>
    </>
  );

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      variants={buttonVariants}
      initial="initial"
      whileHover={!disabled && !isLoading ? "hover" : "initial"}
      whileTap={!disabled && !isLoading ? "tap" : "initial"}
      className={baseClasses}
      onClick={handleClick}
      disabled={disabled || isLoading}
      href={href}
      target={target}
      rel={rel}
      // Add smooth transition for loading state
      style={{
        cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
      }}
    >
      {content}
    </Component>
  );
}; 