"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data";
import Link from "next/link"; // Pastikan Anda mengimpor Link dari Next.js

import { ArrowRight } from "lucide-react";

export default function Portfolio() {
    return (
        <section id="portfolio" className="py-32 bg-gray-900 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* --- HEADER SECTION --- */}
                <div className="flex flex-row md:flex-row justify-center items-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    // className="max-w-2xl"
                    >
                        <h2 className="text-5xl text-center md:text-6xl font-black mb-6">Our Best Works</h2>
                        <p className="text-gray-400 text-xl">Helping various industries achieve their digital goals through targeted technological solutions.</p>
                    </motion.div>

                </div>

                <div className="flex flex-col gap-24">

                    {/* --- 1. WEB APP SECTION --- */}
                    <div className="flex flex-col gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="border-b border-gray-800 pb-4"
                        >
                            <h3 className="text-3xl md:text-4xl font-bold text-white">Web App</h3>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {portfolioData.filter(item => item.category === "Web App").map((item, index) => (
                                <ProjectCard key={item.id} item={item} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* --- 2. MOBILE APP SECTION --- */}
                    <div className="flex flex-col gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="border-b border-gray-800 pb-4"
                        >
                            <h3 className="text-3xl md:text-4xl font-bold text-white">Mobile App</h3>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {portfolioData.filter(item => item.category === "Mobile App").map((item, index) => (
                                <ProjectCard key={item.id} item={item} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* --- 3. ENTERTAINMENTS SECTION --- */}
                    <div className="flex flex-col gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="border-b border-gray-800 pb-4"
                        >
                            <h3 className="text-3xl md:text-4xl font-bold text-white">Entertainments</h3>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {portfolioData.filter(item => item.category === "Entertainments").map((item, index) => (
                                <ProjectCard key={item.id} item={item} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* --- 4. ERP SECTION --- */}
                    <div className="flex flex-col gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="border-b border-gray-800 pb-4"
                        >
                            <h3 className="text-3xl md:text-4xl font-bold text-white">ERP</h3>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {portfolioData.filter(item => item.category === "ERP").map((item, index) => (
                                <ProjectCard key={item.id} item={item} index={index} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
function ProjectCard({ item, index }: { item: typeof portfolioData[number]; index: number }) {
    // Isi dari kartu (gambar dan teks)
    const CardContent = (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover="hover"
            className="relative group cursor-pointer rounded-[2.5rem] overflow-hidden bg-gray-800"
        >
            {/* Gambar/Gradient */}
            <motion.div
                variants={{ hover: { scale: 1.1 } }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className={`w-full h-[30rem] bg-gradient-to-br ${item.color} relative origin-center`}
            >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition duration-700"></div>
            </motion.div>

            {/* Konten Teks */}
            <motion.div
                variants={{ hover: { y: -20 } }}
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
    );

    // Jika item memiliki properti "link", bungkus dengan <Link>
    if (item.link) {
        return (
            <Link href={item.link}>
                {CardContent}
            </Link>
        );
    }

    // Jika tidak ada link, kembalikan kartu biasa
    return CardContent;
}