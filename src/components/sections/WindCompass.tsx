"use client";

import { motion } from "framer-motion";
import { Navigation, Wind } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WindCompassProps {
  speed: number;        // km/h
  direction: number;    // degrees
  directionLabel: string;
  className?: string;
}

export default function WindCompass({ 
  speed, 
  direction, 
  directionLabel,
  className = "" 
}: WindCompassProps) {
  // Wind speed categories for Beaufort scale simulation
  const getWindCategory = (speed: number) => {
    if (speed < 6) return { label: "Calm", color: "text-blue-400", intensity: "low" };
    if (speed < 20) return { label: "Breeze", color: "text-cyan-500", intensity: "medium" };
    if (speed < 39) return { label: "Strong", color: "text-orange-500", intensity: "high" };
    return { label: "Gale", color: "text-red-500", intensity: "extreme" };
  };

  const category = getWindCategory(speed);

  // Generate wind particle animation config
  const windParticles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 0.15,
    duration: 2 + Math.random(),
  }));

  return (
    <Card className={`bg-slate-800/60 backdrop-blur-md border-slate-700 overflow-hidden ${className}`}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wind className="w-5 h-5 text-cyan-400" />
            <h3 className="text-white font-semibold">Wind Conditions</h3>
          </div>
          <span className={`text-sm font-medium ${category.color}`}>
            {category.label}
          </span>
        </div>

        {/* Compass Container */}
        <div className="relative flex items-center justify-center">
          {/* Background Compass Rose */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="180" height="180" viewBox="0 0 180 180" className="opacity-20">
              {/* Compass circles */}
              <circle cx="90" cy="90" r="70" stroke="white" strokeWidth="1" fill="none" />
              <circle cx="90" cy="90" r="50" stroke="white" strokeWidth="0.5" fill="none" />
              <circle cx="90" cy="90" r="30" stroke="white" strokeWidth="0.5" fill="none" />
              {/* Cardinal directions */}
              <text x="90" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">N</text>
              <text x="155" y="95" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">E</text>
              <text x="90" y="160" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">S</text>
              <text x="25" y="95" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">W</text>
            </svg>
          </div>

          {/* Animated Arrow */}
          <motion.div
            animate={{ rotate: direction }}
            transition={{ 
              type: "spring", 
              stiffness: 50,
              damping: 20,
              duration: 1.5 
            }}
            className="relative z-10"
          >
            <Navigation 
              className="w-20 h-20 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]" 
              strokeWidth={2.5}
            />
          </motion.div>

          {/* Wind Particles Animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {windParticles.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{ 
                  x: "50%", 
                  y: "50%", 
                  opacity: 0,
                  scale: 0
                }}
                animate={{
                  x: [
                    "50%",
                    `${50 + Math.cos((direction * Math.PI) / 180) * 40}%`,
                  ],
                  y: [
                    "50%",
                    `${50 + Math.sin((direction * Math.PI) / 180) * 40}%`,
                  ],
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0.5],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Wind Data Display */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-3">
            <div className="text-slate-400 text-xs mb-1">Speed</div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">{speed}</span>
              <span className="text-xs text-slate-400">km/h</span>
            </div>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-3">
            <div className="text-slate-400 text-xs mb-1">Direction</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{directionLabel}</span>
              <span className="text-xs text-slate-400">{direction}°</span>
            </div>
          </div>
        </div>

        {/* Beaufort Scale Indicator */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((speed / 40) * 100, 100)}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className={`h-full ${
                speed < 6 ? "bg-blue-500" :
                speed < 20 ? "bg-cyan-500" :
                speed < 39 ? "bg-orange-500" :
                "bg-red-500"
              }`}
            />
          </div>
          <span className="text-xs text-slate-400 whitespace-nowrap">
            {speed.toFixed(1)} km/h
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
