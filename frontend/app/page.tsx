"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import LightRays from "@/components/LightRays";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Light Rays Background */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.8}
          lightSpread={1.5}
          rayLength={2.5}
          pulsating={true}
          fadeDistance={1.2}
          saturation={1.2}
          followMouse={true}
          mouseInfluence={0.15}
          noiseAmount={0.05}
          distortion={0.1}
          className="w-full h-full"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-black/90" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          {/* Logo / Brand Name */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-6xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
                Meter
              </span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto max-w-xl text-lg text-white/70 sm:text-xl md:text-2xl"
          >
            Know when your documents are read.
            <br />
            <span className="text-white/50">
              Track opens, time spent, and page-level engagement.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:gap-4"
          >
            <Link href="/upload">
              <Button
                size="lg"
                className="min-w-[180px] rounded-xl bg-white px-8 py-4 text-base font-medium text-black transition-all duration-200 hover:bg-gray-200"
              >
                Upload Document
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="min-w-[180px] rounded-xl border-white/20 bg-white/5 px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/10"
              >
                View Demo
              </Button>
            </Link>
          </motion.div>

          {/* Status Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 text-sm text-white/40"
          >
            No signup required • Start tracking in seconds
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 z-[2] h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  );
}

