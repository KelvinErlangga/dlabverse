interface QuakeData {
  Tanggal: string;
  Jam: string;
  Magnitude: string;
  Kedalaman: string;
  Wilayah: string;
  Potensi: string;
  Dirasakan: string;
  Shakemap: string;
  Lintang: string;
  Bujur: string;
}

interface GempaCardProps {
  quake: QuakeData;
}

export default function GempaCard({ quake }: GempaCardProps) {
  const isTsunami = quake.Potensi.toLowerCase().includes("tsunami");

  return (
    <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col lg:flex-row">
      {/* Peta Guncangan (Shakemap) */}
      <div className="w-full lg:w-5/12 bg-slate-950 relative p-4 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
        <img 
          src={`https://data.bmkg.go.id/DataMKG/TEWS/${quake.Shakemap}`} 
          alt="Peta Guncangan Gempa"
          className="w-full h-auto object-cover rounded-xl border border-slate-800"
        />
      </div>

      {/* Informasi Detail Gempa */}
      <div className="w-full lg:w-7/12 p-8 md:p-10 flex flex-col justify-between">
        <div>
          {/* Header Gempa */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8 pb-8 border-b border-slate-800">
            <div className="bg-orange-500 text-white w-20 h-20 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.3)] shrink-0">
              <span className="text-3xl font-black">{quake.Magnitude}</span>
              <span className="text-xs font-bold uppercase tracking-wider">SR</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white leading-tight mb-2">
                Gempa Bumi Terkini
              </h2>
              <p className="text-slate-400 font-medium">
                {quake.Tanggal} • {quake.Jam}
              </p>
            </div>
          </div>

          {/* List Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 mb-8 text-sm md:text-base">
            <div>
              <p className="text-slate-500 mb-1 text-xs uppercase tracking-wider font-semibold">Pusat Gempa</p>
              <p className="text-slate-100 font-medium">{quake.Wilayah}</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1 text-xs uppercase tracking-wider font-semibold">Kedalaman</p>
              <p className="text-slate-100 font-medium">{quake.Kedalaman}</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1 text-xs uppercase tracking-wider font-semibold">Koordinat</p>
              <p className="text-slate-100 font-medium">{quake.Lintang}, {quake.Bujur}</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1 text-xs uppercase tracking-wider font-semibold">Dirasakan (Skala MMI)</p>
              <p className="text-slate-100 font-medium">{quake.Dirasakan || "Tidak ada data rilis"}</p>
            </div>
          </div>
        </div>

        {/* Warning Badge */}
        <div className={`p-5 rounded-xl font-bold text-center flex items-center justify-center gap-3 border shadow-lg ${
          isTsunami 
            ? "bg-red-500/10 text-red-500 border-red-500/30" 
            : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
        }`}>
          {isTsunami ? (
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          ) : (
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          )}
          {quake.Potensi}
        </div>
      </div>
    </div>
  );
}