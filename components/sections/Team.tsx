"use client";

import { motion } from "framer-motion";
import { teamData } from "@/data";

export default function Team() {
  return (
    <section id="team" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 text-lg">The brilliant minds behind the scenes ready to transform your ideas into reality.</p>
          </motion.div>
        </div>

        {/* BAGIAN INI YANG DIPERBAIKI (lg:grid-cols-3 dan max-w-5xl mx-auto) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamData.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200">
                <img src={member.image} alt={member.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-blue-600 font-medium text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}