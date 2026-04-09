// components/layout/Navbar.tsx
"use client"; // Wajib pakai ini kalau ada interaksi/animasi di Next.js App Router

import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-extrabold text-blue-600 tracking-tighter">
          DLAB<span className="text-gray-800">VERSE</span>
        </Link>
        <div className="hidden md:flex gap-8 font-medium text-gray-600">
          <Link href="#layanan" className="hover:text-blue-600 transition">Layanan</Link>
          <Link href="#portofolio" className="hover:text-blue-600 transition">Portofolio</Link>
          <Link href="#tentang" className="hover:text-blue-600 transition">Tentang Kami</Link>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-200">
          Hubungi Kami
        </button>
      </div>
    </motion.nav>
  );
}