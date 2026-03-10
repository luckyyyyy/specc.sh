/**
 * LandingGrid — Landing page background animation component
 * 1:1 port from miu2d/packages/ui/src/landing/GridBackground.tsx
 * Colors changed to blue/indigo palette to match specc.sh theme
 */

import { motion } from "framer-motion";
import React from "react";

// Grid size constant (kept consistent with miu2d)
const GRID_SIZE = 60;

// ── Glowing lines moving along grid lines ──────────────────────────────────────────
export function GridLine({
  delay = 0,
  duration = 4,
  row,
  isHorizontal = true,
}: {
  delay?: number;
  duration?: number;
  row: number;
  isHorizontal?: boolean;
}) {
  const position = row * GRID_SIZE;
  const [hasCompletedFirst, setHasCompletedFirst] = React.useState(false);
  const [screenSize, setScreenSize] = React.useState(1920);

  React.useEffect(() => {
    setScreenSize(isHorizontal ? window.innerWidth : window.innerHeight);
  }, [isHorizontal]);

  const initialPosition = -120;
  const firstDuration = duration;

  const handleAnimationComplete = React.useCallback(() => {
    if (!hasCompletedFirst) {
      setHasCompletedFirst(true);
    }
  }, [hasCompletedFirst]);

  if (isHorizontal) {
    return (
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: position,
          left: 0,
          width: 120,
          height: 2,
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.8), rgba(139,92,246,0.6), transparent)",
          boxShadow:
            "0 0 20px rgba(99,102,241,0.5), 0 0 40px rgba(99,102,241,0.3)",
        }}
        initial={{ x: initialPosition }}
        animate={{
          x: hasCompletedFirst
            ? ["-120px", `${screenSize + 120}px`]
            : `${screenSize + 120}px`,
        }}
        transition={{
          duration: hasCompletedFirst ? duration : firstDuration,
          delay: hasCompletedFirst ? 0 : delay,
          repeat: hasCompletedFirst ? Number.POSITIVE_INFINITY : 0,
          ease: "linear",
        }}
        onAnimationComplete={handleAnimationComplete}
      />
    );
  }

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: position,
        top: 0,
        width: 2,
        height: 120,
        background:
          "linear-gradient(180deg, transparent, rgba(99,102,241,0.8), rgba(139,92,246,0.6), transparent)",
        boxShadow:
          "0 0 20px rgba(99,102,241,0.5), 0 0 40px rgba(99,102,241,0.3)",
      }}
      initial={{ y: initialPosition }}
      animate={{
        y: hasCompletedFirst
          ? ["-120px", `${screenSize + 120}px`]
          : `${screenSize + 120}px`,
      }}
      transition={{
        duration: hasCompletedFirst ? duration : firstDuration,
        delay: hasCompletedFirst ? 0 : delay,
        repeat: hasCompletedFirst ? Number.POSITIVE_INFINITY : 0,
        ease: "linear",
      }}
      onAnimationComplete={handleAnimationComplete}
    />
  );
}

// ── Grid intersection node flicker ──────────────────────────────────────────────────
export function GridNode({
  row,
  col,
  delay = 0,
}: {
  row: number;
  col: number;
  delay?: number;
}) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full pointer-events-none"
      style={{
        left: col * GRID_SIZE - 4,
        top: row * GRID_SIZE - 4,
        background:
          "radial-gradient(circle, rgba(99,102,241,0.8) 0%, transparent 70%)",
        boxShadow: "0 0 10px rgba(99,102,241,0.6)",
      }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0.5, 1.5, 0.5],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  );
}

// ── Gradient floating glow orbs ──────────────────────────────────────────────────
export function FloatingOrb({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-30 ${className}`}
      animate={{
        y: [0, -30, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  );
}

// ── Static CSS grid background ────────────────────────────────────────────────
export function GridPattern({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 opacity-[0.03] dark:opacity-[0.08] ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
        backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
      }}
    />
  );
}
