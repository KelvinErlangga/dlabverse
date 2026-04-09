// components/sections/Hero.tsx
"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      {/* Background dekorasi */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-[40rem] h-[40rem] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Transformasi Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Tanpa Batas.
            </span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
        >
          Kami merancang dan membangun solusi perangkat lunak yang tidak hanya indah dipandang, tetapi juga mempercepat pertumbuhan bisnis Anda.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold text-lg hover:bg-gray-800 transition transform hover:-translate-y-1 hover:shadow-xl">
            Mulai Proyek Anda
          </button>
          <button className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-semibold text-lg hover:bg-gray-50 transition transform hover:-translate-y-1">
            Lihat Portofolio
          </button>
        </motion.div>
      </div>
    </section>
  );
}