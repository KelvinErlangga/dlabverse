import React from "react";

// 1. Definisikan semua tipe data sesuai parameter BMKG
interface CuacaCardProps {
  lokasi: {
    provinsi: string;
    kota: string;
    kecamatan: string;
    desa: string;
    timezone: string;
  };
  currentWeather: {
    utc_datetime: string;
    local_datetime: string;
    t: number;
    hu: number;
    weather_desc: string;
    weather_desc_en: string;
    ws: number;
    wd: string;
    tcc: number;
    vs_text: string;
    analysis_date: string;
    image: string;
  };
}

export default function CuacaCard({ lokasi, currentWeather }: CuacaCardProps) {
  // Format waktu lokal untuk tampilan yang lebih rapi
  const localTime = new Date(currentWeather.local_datetime).toLocaleString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-800/50 mb-10 overflow-hidden relative flex flex-col gap-8">
      {/* Background glow effect */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* --- BAGIAN ATAS: Informasi Utama --- */}
      <div className="flex flex-col md:flex-row items-center justify-between z-10 w-full text-center md:text-left">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight">
            {lokasi.desa}, {lokasi.kota}
          </h2>
          <p className="text-slate-400 text-sm md:text-base mb-2 font-medium tracking-wide">
            {lokasi.kecamatan}, {lokasi.provinsi} • {lokasi.timezone}
          </p>
          <p className="text-blue-400/80 text-xs mb-6 font-mono">
            Waktu Lokal: {localTime}
          </p>
          
          <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6">
            <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              {currentWeather.t}°C
            </span>
            <div className="text-slate-300 pb-2 flex flex-col items-center md:items-start">
              <p className="capitalize text-2xl font-semibold text-blue-400">
                {currentWeather.weather_desc}
              </p>
              <p className="text-sm text-slate-500 italic">
                {currentWeather.weather_desc_en}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-0 drop-shadow-2xl">
          <img 
            src={currentWeather.image} 
            alt={currentWeather.weather_desc}
            className="w-40 h-40 md:w-48 md:h-48 object-contain scale-110 hover:scale-125 transition-transform duration-500"
          />
        </div>
      </div>

      {/* --- BAGIAN BAWAH: Grid Detail Parameter BMKG --- */}
      <div className="z-10 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-700/50">
        
        {/* Kelembapan */}
        <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Kelembapan (hu)</p>
          <p className="text-xl font-semibold text-white flex items-center gap-2">
            💧 {currentWeather.hu}%
          </p>
        </div>

        {/* Angin (Kecepatan & Arah) */}
        <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Angin (ws & wd)</p>
          <p className="text-xl font-semibold text-white flex items-center gap-2">
            💨 {currentWeather.ws} <span className="text-sm font-normal text-slate-300">km/j dari {currentWeather.wd}</span>
          </p>
        </div>

        {/* Tutupan Awan */}
        <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Tutupan Awan (tcc)</p>
          <p className="text-xl font-semibold text-white flex items-center gap-2">
            ☁️ {currentWeather.tcc}%
          </p>
        </div>

        {/* Jarak Pandang */}
        <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Jarak Pandang (vs)</p>
          <p className="text-xl font-semibold text-white flex items-center gap-2">
            👁️ {currentWeather.vs_text}
          </p>
        </div>
      </div>

      {/* Footer Meta Data Info */}
      <div className="z-10 flex flex-col sm:flex-row justify-between text-[10px] text-slate-500 font-mono mt-2 pt-4 border-t border-slate-800">
        <span>UTC: {currentWeather.utc_datetime}</span>
        <span>Analysis Date: {currentWeather.analysis_date}</span>
      </div>

    </div>
  );
}