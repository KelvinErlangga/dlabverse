import Link from "next/link";

export default function BmkgHomePage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
      {/* Background Ornamen */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-600/10 blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center z-10 w-full mb-16 mt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 text-xs text-slate-400 mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Sumber Data Langsung dari API Resmi BMKG
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
          Satu Portal Untuk <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            Cuaca & Keselamatan
          </span>
        </h1>
        
        <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto mb-12">
          Akses informasi prakiraan cuaca tingkat kelurahan dan pemantauan gempa bumi terkini di seluruh wilayah Indonesia secara seketika (real-time).
        </p>

        {/* Fitur Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto text-left">
          
          <Link href="/bmkg/cuaca" className="group relative bg-slate-900/40 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/60 transition-all duration-300 overflow-hidden shadow-xl flex flex-col justify-between min-h-[280px]">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
               <svg className="w-32 h-32 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17 19.5a2.5 2.5 0 01-5 0v-5.22l-1.75 2.1a1 1 0 11-1.54-1.28l3.5-4.2a1 1 0 011.54 0l3.5 4.2a1 1 0 11-1.54 1.28l-1.75-2.1v5.22zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
            </div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">Prakiraan Cuaca</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Pantau suhu, kelembapan, kecepatan angin, dan prakiraan cuaca jam-demi-jam secara mendetail hingga tingkat Desa/Kelurahan di seluruh Indonesia.
              </p>
            </div>
            
            <div className="relative z-10 flex items-center text-sm font-bold text-blue-400 group-hover:translate-x-2 transition-transform">
              Buka Dashboard Cuaca →
            </div>
          </Link>

          <Link href="/bmkg/gempa" className="group relative bg-slate-900/40 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 hover:border-orange-500/50 hover:bg-slate-800/60 transition-all duration-300 overflow-hidden shadow-xl flex flex-col justify-between min-h-[280px]">
             <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
               <svg className="w-32 h-32 text-orange-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.14l6.93 13.86H5.07L12 6.14zM11 10h2v5h-2v-5zm0 6h2v2h-2v-2z"/></svg>
            </div>

            <div className="relative z-10">
              <div className="w-14 h-14 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">Info Gempa Bumi</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Dapatkan notifikasi magnitudo, lokasi titik pusat gempa, peta guncangan (shakemap), dan peringatan dini potensi Tsunami secara real-time.
              </p>
            </div>

            <div className="relative z-10 flex items-center text-sm font-bold text-orange-400 group-hover:translate-x-2 transition-transform">
              Lihat Data Gempa →
            </div>
          </Link>

        </div>
      </div>
      
      <div className="mt-auto pt-8 border-t border-slate-800/50 w-full text-center text-slate-500 text-xs">
        Data disediakan oleh Badan Meteorologi, Klimatologi, dan Geofisika (BMKG) Republik Indonesia.
      </div>
    </main>
  );
}