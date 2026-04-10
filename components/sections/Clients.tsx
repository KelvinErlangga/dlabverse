"use client";

import { motion } from "framer-motion";
import { clientsData } from "@/data";

export default function Clients() {
  return (
    <section className="py-12 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-8">
        <p className="text-sm font-bold tracking-widest text-gray-400 uppercase">
          Trusted by Innovative Companies
        </p>
      </div>

      <div className="relative flex w-full max-w-7xl mx-auto overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          className="flex flex-nowrap gap-16 items-center w-max"
        >
          {clientsData.map((client, index) => {
            const Icon = client.icon;
            return (
              <div key={index} className="flex items-center gap-3 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all cursor-pointer">
                <Icon size={32} className="text-blue-600" />
                <span className="text-xl font-bold text-gray-800">{client.name}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}