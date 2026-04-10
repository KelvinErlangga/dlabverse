"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Variants } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Mengambil posisi scroll layar
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Manipulasi pergerakan berdasarkan scroll
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const bgY1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  // Jurus: Teks muncul huruf per huruf
  const textContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
  };

  const textItem: Variants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    show: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 }
    },
  };

  const title = "Digital Transformation";

  return (
    <section ref={targetRef} className="relative h-[120vh] flex items-start justify-center pt-40 overflow-hidden bg-white">
      {/* Background Bola Parallax */}
      <motion.div style={{ y: bgY1 }} className="absolute top-0 left-[-10%] w-[40rem] h-[40rem] bg-blue-200/50 rounded-full mix-blend-multiply filter blur-3xl"></motion.div>
      <motion.div style={{ y: bgY2 }} className="absolute top-[30%] right-[-10%] w-[40rem] h-[40rem] bg-purple-200/50 rounded-full mix-blend-multiply filter blur-3xl"></motion.div>

      {/* Konten Utama yang bereaksi terhadap Scroll */}
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 text-center max-w-5xl mx-auto px-6"
      >
        <motion.div variants={textContainer} initial="hidden" animate="show">
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-tight mb-6 perspective-[1000px]">
            {/* Memecah teks menjadi huruf */}
            {title.split("").map((char, index) => (
              <motion.span 
                key={index} 
                variants={textItem} 
                className="inline-block origin-bottom"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <br />
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 inline-block"
            >
              Without Limits.
            </motion.span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto"
        >
          Empowering your vision with cutting-edge software solutions designed to scale your business to new heights.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          {/* Tombol dengan interaksi Spring */}
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "#1e40af" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="px-10 py-5 bg-blue-600 text-white rounded-full font-bold text-lg cursor-pointer shadow-2xl shadow-blue-500/30"
          >
            Start Your Project
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="px-10 py-5 bg-white text-gray-900 border-2 border-gray-100 rounded-full font-bold text-lg cursor-pointer"
          >
            View Portfolio
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}