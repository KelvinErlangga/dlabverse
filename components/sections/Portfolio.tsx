"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Portfolio() {
  const router = useRouter();

  return (
    <section id="portfolio" className="py-32 bg-gray-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="max-w-2xl"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">Our Best Works</h2>
            <p className="text-gray-400 text-xl">Helping various industries achieve their digital goals through targeted technological solutions.</p>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ x: 10 }}
            onClick={() => router.push("/portfolio")}
            className="hidden md:flex items-center gap-3 text-blue-400 font-bold text-xl hover:text-blue-300 transition cursor-pointer"
          >
            View All Projects <ArrowRight size={24} />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {portfolioData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}

              // Ini jurus pegasnya (Spring)
              whileHover="hover"
              className="relative group cursor-pointer rounded-[2.5rem] overflow-hidden bg-gray-800"
            >
              {/* Gambar/Gradient yang akan membesar (Zoom In) saat di hover */}
              <motion.div
                variants={{
                  hover: { scale: 1.1 }
                }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className={`w-full h-[30rem] bg-gradient-to-br ${item.color} relative origin-center`}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition duration-700"></div>
              </motion.div>

              {/* Konten teks yang akan naik ke atas saat di hover */}
              <motion.div
                variants={{
                  hover: { y: -20 }
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="absolute bottom-0 left-0 w-full p-10 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"
              >
                <div className="inline-block bg-white/10 backdrop-blur-md text-white text-sm font-bold px-5 py-2 rounded-full mb-4 border border-white/20">
                  {item.category}
                </div>
                <h3 className="text-3xl font-black text-white mb-3">{item.title}</h3>
                <p className="text-gray-300 text-lg line-clamp-2">{item.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}