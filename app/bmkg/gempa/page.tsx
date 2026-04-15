import React from "react";

// --- FUNGSI FETCH DI SERVER (BEBAS CORS) ---
async function getLatestQuake() {
  try {
    // Revalidate setiap 60 detik agar data selalu up-to-date
    const res = await fetch("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json", { 
      next: { revalidate: 60 } 
    });
    if (!res.ok) throw new Error("Gagal mengambil data gempa terbaru");
    const data = await res.json();
    return data.Infogempa.gempa;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getFeltQuakes() {
  try {
    const res = await fetch("https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json", { 
      next: { revalidate: 60 } 
    });
    if (!res.ok) throw new Error("Gagal mengambil riwayat gempa");
    const data = await res.json();
    return data.Infogempa.gempa.slice(0, 6); // Ambil 6 gempa terakhir saja
  } catch (error) {
    console.error(error);
    return [];
  }
}

// --- SERVER COMPONENT UTAMA ---
export default async function GempaPage() {
  // Ambil kedua data secara paralel agar lebih cepat
  const [latestQuake, feltQuakes] = await Promise.all([
    getLatestQuake(),
    getFeltQuakes()
  ]);

  if (!latestQuake) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="bg-red-500/10 border border-red-500/30 p-8 rounded-2xl text-center">
          <p className="text-red-400 font-bold text-xl mb-2">Gagal Memuat Data</p>
          <p className="text-slate-400">Server BMKG sedang tidak dapat diakses saat ini.</p>
        </div>
      </div>
    );
  }

  // Cek potensi Tsunami untuk pewarnaan Badge
  const isTsunami = latestQuake.Potensi.toLowerCase().includes("tsunami");

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-orange-500 flex items-center gap-3">
          <span className="relative flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-orange-500"></span>
          </span>
          Pusat Informasi Gempa Bumi
        </h1>

        {/* --- HIGHLIGHT GEMPA TERBARU (HERO SECTION) --- */}
        <div className="bg-slate-900/50 rounded-3xl border border-slate-800 mb-12 shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* Bagian Kiri: Peta Guncangan (Shakemap) */}
          <div className="w-full lg:w-5/12 bg-slate-950 relative p-4 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-800">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
            <img 
              src={`https://data.bmkg.go.id/DataMKG/TEWS/${latestQuake.Shakemap}`} 
              alt="Peta Guncangan Gempa"
              className="w-full h-auto object-cover rounded-xl border border-slate-800 relative z-0"
            />
            {/* Overlay Magnitudo Besar */}
            <div className="absolute top-6 right-6 z-20 bg-orange-500 text-white w-20 h-20 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.4)] border border-orange-400">
              <span className="text-3xl font-black leading-none">{latestQuake.Magnitude}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Magnitudo</span>
            </div>
          </div>

          {/* Bagian Kanan: Detail Informasi Gempa */}
          <div className="w-full lg:w-7/12 p-6 md:p-10 flex flex-col justify-between">
            <div>
              <div className="mb-6 pb-6 border-b border-slate-800/50">
                <h2 className="text-2xl font-bold text-white mb-2">Gempa Bumi Terkini</h2>
                <p className="text-slate-400 font-medium flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  {latestQuake.Tanggal} • {latestQuake.Jam}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 mb-8 text-sm md:text-base">
                <div>
                  <p className="text-slate-500 mb-1 text-xs uppercase tracking-wider font-bold">Pusat Gempa</p>
                  <p className="text-slate-100 font-semibold leading-snug">{latestQuake.Wilayah}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1 text-xs uppercase tracking-wider font-bold">Kedalaman</p>
                  <p className="text-slate-100 font-semibold">{latestQuake.Kedalaman}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1 text-xs uppercase tracking-wider font-bold">Titik Koordinat</p>
                  <p className="text-slate-100 font-semibold font-mono text-sm">{latestQuake.Lintang}, {latestQuake.Bujur}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1 text-xs uppercase tracking-wider font-bold">Dirasakan (Skala MMI)</p>
                  <p className="text-slate-100 font-semibold line-clamp-2">{latestQuake.Dirasakan || "-"}</p>
                </div>
              </div>
            </div>

            {/* Warning Badge (Tsunami / Tidak) */}
            <div className={`p-4 rounded-xl font-bold text-sm md:text-base text-center flex items-center justify-center gap-3 border shadow-lg ${
              isTsunami 
                ? "bg-red-500/10 text-red-500 border-red-500/30" 
                : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
            }`}>
              {isTsunami ? "⚠️ PERINGATAN POTENSI TSUNAMI" : "✅ TIDAK BERPOTENSI TSUNAMI"}
              <span className="hidden md:inline">• {latestQuake.Potensi}</span>
            </div>
          </div>
        </div>

        {/* --- LIST GEMPA DIRASAKAN SEBELUMNYA --- */}
        {feltQuakes.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-6 text-white border-b border-slate-800 pb-3">
              Riwayat Gempa Dirasakan Terakhir
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {feltQuakes.map((quake: any, index: number) => {
                // Tentukan warna berdasarkan besaran magnitudo
                const mag = parseFloat(quake.Magnitude);
                let magColor = "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
                if (mag >= 5.0 && mag < 6.0) magColor = "text-orange-400 bg-orange-400/10 border-orange-400/20";
                if (mag >= 6.0) magColor = "text-red-400 bg-red-400/10 border-red-400/20";

                return (
                  <div key={index} className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 hover:bg-slate-800/80 transition-colors group">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`px-3 py-1 rounded-lg border font-bold text-lg flex items-center gap-1 ${magColor}`}>
                        <span>{quake.Magnitude}</span>
                        <span className="text-[10px] uppercase mt-1">SR</span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400 font-medium">{quake.Tanggal}</p>
                        <p className="text-xs text-slate-500">{quake.Jam}</p>
                      </div>
                    </div>
                    
                    <h4 className="text-sm font-bold text-slate-200 mb-2 line-clamp-2" title={quake.Wilayah}>
                      {quake.Wilayah}
                    </h4>
                    
                    <div className="flex items-center gap-4 text-xs text-slate-400 font-mono mt-4 pt-4 border-t border-slate-800/50">
                      <span title="Kedalaman">⬇️ {quake.Kedalaman}</span>
                      <span title="Koordinat">📍 {quake.Lintang}, {quake.Bujur}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}