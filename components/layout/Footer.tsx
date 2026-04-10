export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-20 border-b border-gray-800">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Transform Your Ideas?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss your company's technology needs. Our experts are ready to provide the best solutions.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl cursor-pointer">
              Get Free Consultation Now
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <span className="text-2xl font-extrabold tracking-tighter cursor-pointer">
            DLAB<span className="text-blue-500">VERSE</span>
          </span>
          <p className="text-gray-400 mt-2 text-sm">© {new Date().getFullYear()} Dlabverse Studio. All rights reserved.</p>
        </div>
        <div className="flex gap-6 text-gray-400">
          <a href="#" className="hover:text-white transition cursor-pointer">Instagram</a>
          <a href="#" className="hover:text-white transition cursor-pointer">LinkedIn</a>
          <a href="#" className="hover:text-white transition cursor-pointer">GitHub</a>
        </div>
      </div>
    </footer>
  );
}