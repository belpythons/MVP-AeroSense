"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface HeaderProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

const cities = [
  { id: "bontang", name: "Bontang", region: "East Kalimantan" },
  { id: "samarinda", name: "Samarinda", region: "East Kalimantan" },
  { id: "balikpapan", name: "Balikpapan", region: "East Kalimantan" },
];

export default function Header({ selectedCity, onCityChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold text-zinc-900">AeroSense</span>
          </motion.div>

          {/* Desktop City Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center space-x-1 bg-zinc-100 rounded-lg p-1"
          >
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={() => onCityChange(city.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedCity === city.id
                    ? "bg-white text-zinc-900 shadow-sm"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-white/50"
                }`}
              >
                {city.name}
              </button>
            ))}
          </motion.nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-zinc-100 transition-colors"
          >
            <div className="w-5 h-5 flex flex-col justify-center space-y-1">
              <span
                className={`block h-0.5 bg-zinc-600 transition-all duration-200 ${
                  isMenuOpen ? "rotate-45 translate-y-1" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-zinc-600 transition-all duration-200 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-zinc-600 transition-all duration-200 ${
                  isMenuOpen ? "-rotate-45 -translate-y-1" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white border-t border-zinc-200"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="space-y-2">
              {cities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => {
                    onCityChange(city.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCity === city.id
                      ? "bg-zinc-100 text-zinc-900"
                      : "text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  <div className="flex flex-col">
                    <span>{city.name}</span>
                    <span className="text-xs text-zinc-500">{city.region}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
