"use client";

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
        <Link href="/" className="text-2xl font-extrabold text-blue-600 tracking-tighter cursor-pointer">
          DLAB<span className="text-gray-800">VERSE</span>
        </Link>
        <div className="hidden md:flex gap-8 font-medium text-gray-600">
          <Link href="#services" className="hover:text-blue-600 transition cursor-pointer">Services</Link>
          <Link href="#portfolio" className="hover:text-blue-600 transition cursor-pointer">Portfolio</Link>
          <Link href="#team" className="hover:text-blue-600 transition cursor-pointer">Our Team</Link>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-200 cursor-pointer">
          Contact Us
        </button>
      </div>
    </motion.nav>
  );
}