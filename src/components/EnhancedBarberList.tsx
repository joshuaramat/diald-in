import React, { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
import clsx from 'clsx';

interface Barber {
  name: string;
  specialty: string;
  image: string;
  alt: string;
}

interface EnhancedBarberListProps {
  barbers: Barber[];
  onBarberSelect?: (barber: Barber) => void;
}

// React Bits inspired animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const shimmerVariants = {
  initial: { x: "-100%" },
  animate: { 
    x: "100%",
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

const BarberCard: React.FC<{ 
  barber: Barber; 
  index: number;
  onSelect?: (barber: Barber) => void;
}> = ({ barber, index, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    onSelect?.(barber);
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ 
        scale: 1.03,
        y: -8,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      className={clsx(
        "relative cursor-pointer rounded-xl p-4 transition-colors duration-300",
        "bg-white/5 border border-white/10 backdrop-blur-sm",
        "hover:bg-white/10 hover:border-[var(--color-accent)]/50",
        isSelected && "border-[var(--color-accent)] bg-[var(--color-accent)]/10"
      )}
      style={{ 
        boxShadow: isHovered 
          ? '0 20px 40px rgba(212, 168, 106, 0.15)' 
          : '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <AnimatePresence>
          {isHovered && (
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              exit="initial"
              className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Avatar */}
        <motion.div
          className="relative mb-3 overflow-hidden rounded-full"
          whileHover={{ 
            scale: 1.05,
            transition: { type: "spring", stiffness: 400, damping: 25 }
          }}
        >
          <div 
            className={clsx(
              "w-18 h-18 rounded-full border-3 transition-colors duration-300",
              isSelected ? "border-white" : "border-[var(--color-accent)]"
            )}
            style={{
              background: `url(${barber.image}) center/cover`,
              width: '72px',
              height: '72px',
            }}
          />
          
          {/* Animated ring */}
          <AnimatePresence>
            {(isHovered || isSelected) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  rotate: 360,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 0.3 },
                  scale: { type: "spring", stiffness: 400, damping: 25 }
                }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-[var(--color-accent)]/60"
                style={{ padding: '6px' }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Name */}
        <motion.h3
          className={clsx(
            "font-semibold transition-colors duration-300",
            isSelected ? "text-[var(--color-accent)]" : "text-white"
          )}
          animate={{
            y: isHovered ? -2 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {barber.name}
        </motion.h3>

        {/* Animated underline */}
        <motion.div
          className="mt-1 h-0.5 bg-[var(--color-accent)]"
          initial={{ width: 0 }}
          animate={{ 
            width: (isHovered || isSelected) ? "100%" : 0 
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />

        {/* Selection indicator */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--color-accent)] rounded-full flex items-center justify-center"
            >
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.path d="M20 6L9 17l-5-5" />
              </motion.svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const EnhancedBarberList: React.FC<EnhancedBarberListProps> = ({ 
  barbers, 
  onBarberSelect 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="grid grid-cols-2 gap-4"
    >
      {barbers.map((barber, index) => (
        <BarberCard
          key={barber.name}
          barber={barber}
          index={index}
          onSelect={onBarberSelect}
        />
      ))}
    </motion.div>
  );
}; 