"use client";

import { useState, useEffect } from "react";
import CuacaCard from "@/components/layout/CuacaCard";
import { getWeather } from "@/lib/api"; 

interface Area { 
  code: string; 
  name: string; 
}

export default function CuacaPage() {
  // --- STATE LOKASI ---
  const [provinces, setProvinces] = useState<Area[]>([]);
  const [regencies, setRegencies] = useState<Area[]>([]);
  const [districts, setDistricts] = useState<Area[]>([]);
  const [villages, setVillages] = useState<Area[]>([]); // Data Kelurahan

  const [selectedProv, setSelectedProv] = useState("");
  const [selectedReg, setSelectedReg] = useState("");
  const [selectedDist, setSelectedDist] = useState("");
  const [selectedVill, setSelectedVill] = useState(""); // Pilihan Radio Button
  
  const [locLoading, setLocLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  // --- STATE CUACA ---
  const [weatherData, setWeatherData] = useState<any>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState("");

  const BASE_URL = "/api-wilayah"; 

  // 1. Fetch Provinsi awal & Coba Auto-Detect GPS
  useEffect(() => {
    fetch(`${BASE_URL}/provinces.json`)
      .then((res) => res.json())
      .then((json) => {
        setProvinces(json.data);
        autoDetectLocation();
      })
      .catch(() => setStatusMsg("Gagal memuat daftar provinsi."));
  }, []);

  // Logika GPS (Dengan Fallback ke Default)
  const autoDetectLocation = () => {
    setStatusMsg("Mendeteksi lokasi GPS Anda...");
    if (!navigator.geolocation) {
      fallbackToDefault("Browser tidak mendukung GPS.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await res.json();
          const cityName = (data.address.city || data.address.town || data.address.county || "").toUpperCase();
          
          if (cityName) {
            setStatusMsg(`Lokasi GPS terdeteksi: ${cityName}.`);
          }
          
          fetchWeatherAction("31.71.03.1001"); // Default: Gambir
          setTimeout(() => setStatusMsg(""), 4000);

        } catch (err) {
          fallbackToDefault("Gagal menerjemahkan kordinat GPS.");
        }
      },
      (err) => {
        fallbackToDefault("Akses GPS ditolak/gagal.");
      },
      { timeout: 10000 }
    );
  };

  const fallbackToDefault = (msg: string) => {
    setStatusMsg(`${msg} Memuat lokasi default...`);
    fetchWeatherAction("31.71.03.1001");
    setTimeout(() => setStatusMsg(""), 3000);
  };

  // 2. Load Kabupaten
  useEffect(() => {
    if (!selectedProv) return;
    setLocLoading(true);
    fetch(`${BASE_URL}/regencies/${selectedProv}.json`)
      .then((res) => res.json())
      .then((json) => setRegencies(json.data))
      .finally(() => setLocLoading(false));
  }, [selectedProv]);

  // 3. Load Kecamatan
  useEffect(() => {
    if (!selectedReg) return;
    setLocLoading(true);
    fetch(`${BASE_URL}/districts/${selectedReg}.json`)
      .then((res) => res.json())
      .then((json) => setDistricts(json.data))
      .finally(() => setLocLoading(false));
  }, [selectedReg]);

  // 4. Load Kelurahan/Desa
  useEffect(() => {
    if (!selectedDist) return;
    setLocLoading(true);
    fetch(`${BASE_URL}/villages/${selectedDist}.json`)
      .then((res) => res.json())
      .then((json) => setVillages(json.data))
      .finally(() => setLocLoading(false));
  }, [selectedDist]);

  // 5. Eksekusi Fetch Data BMKG
  const fetchWeatherAction = async (adm4Code: string) => {
    setWeatherLoading(true);
    setWeatherError("");
    setWeatherData(null);

    try {
      const data = await getWeather(adm4Code);
      if (!data || !data.data || data.data.length === 0) {
        setWeatherError("Data Cuaca Tidak Tersedia. Stasiun BMKG belum menyediakan data prakiraan cuaca spesifik untuk wilayah kelurahan ini.");
      } else {
        setWeatherData(data.data[0]);
      }
    } catch (err) {
      setWeatherError("Terjadi kesalahan saat menghubungkan ke server BMKG.");
    } finally {
      setWeatherLoading(false);
    }
  };

  // 6. Handle Tombol Tampilkan Cuaca
  const handleTampilkan = () => {
    if (!selectedVill) return;
    fetchWeatherAction(selectedVill);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-400">Dashboard Cuaca BMKG</h1>
        
        {/* --- KOMPONEN LOCATION SELECTOR --- */}
        <div className="bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-slate-800 mb-10 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h3 className="text-xl text-white font-semibold flex items-center gap-3">
              <span className="bg-blue-500 w-2 h-6 rounded-full inline-block"></span>
              Pilih Lokasi Pantauan
            </h3>
            
            <div className="flex items-center gap-4">
              {statusMsg && <span className="text-xs text-blue-400 animate-pulse">{statusMsg}</span>}
              <button 
                onClick={autoDetectLocation}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 px-4 rounded-lg flex items-center gap-2 transition border border-slate-700"
              >
                📍 Gunakan Lokasi GPS Saat Ini
              </button>
            </div>
          </div>

          {/* Grid Layout 3 Kolom untuk Dropdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* Provinsi */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">1. Provinsi</label>
              <select
                value={selectedProv}
                onChange={(e) => {
                  setSelectedProv(e.target.value);
                  setSelectedReg(""); setSelectedDist(""); setSelectedVill("");
                  setRegencies([]); setDistricts([]); setVillages([]);
                }}
                className="bg-slate-950 text-white border border-slate-700 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
              >
                <option value="">Pilih Provinsi</option>
                {provinces.map((p) => <option key={p.code} value={p.code}>{p.name}</option>)}
              </select>
            </div>

            {/* Kabupaten */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">2. Kota/Kabupaten</label>
              <select
                disabled={!selectedProv || locLoading}
                value={selectedReg}
                onChange={(e) => {
                  setSelectedReg(e.target.value);
                  setSelectedDist(""); setSelectedVill("");
                  setDistricts([]); setVillages([]);
                }}
                className="bg-slate-950 text-white border border-slate-700 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50 cursor-pointer"
              >
                <option value="">Pilih Kabupaten</option>
                {regencies.map((r) => <option key={r.code} value={r.code}>{r.name}</option>)}
              </select>
            </div>

            {/* Kecamatan */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">3. Kecamatan</label>
              <select
                disabled={!selectedReg || locLoading}
                value={selectedDist}
                onChange={(e) => {
                  setSelectedDist(e.target.value);
                  setSelectedVill("");
                  setVillages([]);
                }}
                className="bg-slate-950 text-white border border-slate-700 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50 cursor-pointer"
              >
                <option value="">Pilih Kecamatan</option>
                {districts.map((d) => <option key={d.code} value={d.code}>{d.name}</option>)}
              </select>
            </div>
          </div>

          {/* RADIO BUTTONS KELURAHAN (Muncul jika Kecamatan sudah dipilih) */}
          {villages.length > 0 && (
            <div className="border-t border-slate-800 pt-6 animate-in fade-in slide-in-from-top-4">
              <label className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-4 block flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                4. Pilih Kelurahan / Desa ({villages.length})
              </label>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-60 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#334155 transparent' }}>
                {villages.map((v) => (
                  <label 
                    key={v.code} 
                    className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedVill === v.code 
                        ? 'border-blue-500 bg-blue-500/10' 
                        : 'border-slate-700 bg-slate-950 hover:bg-slate-800'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="kelurahan" 
                      value={v.code} 
                      checked={selectedVill === v.code} 
                      onChange={(e) => setSelectedVill(e.target.value)} 
                      className="mt-1 accent-blue-500 w-4 h-4 cursor-pointer"
                    />
                    <span className={`text-sm font-medium line-clamp-2 ${selectedVill === v.code ? 'text-blue-400' : 'text-slate-300'}`}>
                      {v.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Tombol Eksekusi Tampilkan */}
          <div className="mt-8 flex justify-end border-t border-slate-800 pt-6">
            <button
              onClick={handleTampilkan}
              disabled={!selectedVill || locLoading || weatherLoading}
              className={`px-8 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                selectedVill && !locLoading && !weatherLoading
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]" 
                  : "bg-slate-800 text-slate-500 cursor-not-allowed"
              }`}
            >
              {locLoading || weatherLoading ? (
                 <span className="flex items-center gap-2">
                   <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div> 
                   Memproses Data...
                 </span>
              ) : "Tampilkan Cuaca Kelurahan Ini"}
            </button>
          </div>
        </div>

        {/* --- HASIL CUACA --- */}
        {weatherLoading ? (
           <div className="text-center py-16">
             <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
             <p className="text-slate-400 animate-pulse font-medium">Mengambil data stasiun BMKG terdekat...</p>
           </div>
        ) : weatherError ? (
          <div className="bg-slate-900 border border-red-500/30 rounded-2xl p-8 text-center mt-8 shadow-xl">
            <p className="text-red-400 font-bold text-xl mb-2">Pencarian Terhenti</p>
            <p className="text-slate-400">{weatherError}</p>
          </div>
        ) : weatherData ? (
          <>
            <CuacaCard 
              lokasi={weatherData.lokasi} 
              currentWeather={weatherData.cuaca[0][0]} 
            />

            {/* Prakiraan Cuaca Lengkap Mendatang (Horizontal Scroll) */}
            <div className="mt-12 bg-slate-900/40 p-6 md:p-8 rounded-3xl border border-slate-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
                <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Prakiraan Cuaca Terperinci
                </h3>
                <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full w-fit">Geser untuk melihat lebih lanjut →</span>
              </div>
              
              <div className="flex overflow-x-auto pb-6 pt-2 gap-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'thin', scrollbarColor: '#3b82f6 transparent' }}>
                {weatherData.cuaca[0].map((forecast: any, idx: number) => {
                  const dateObj = new Date(forecast.local_datetime);
                  const time = dateObj.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' });
                  const day = dateObj.toLocaleDateString("id-ID", { weekday: 'short', day: 'numeric', month: 'short' });
                  
                  return (
                    <div 
                      key={idx} 
                      className="min-w-[140px] md:min-w-[160px] shrink-0 snap-start bg-slate-800/80 border border-slate-700/50 p-5 rounded-2xl flex flex-col items-center hover:bg-slate-700 hover:border-blue-500/50 transition-all duration-300 shadow-lg group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-colors"></div>

                      <span className="text-xs font-bold text-blue-400 mb-1 z-10">{day}</span>
                      <span className="text-lg font-black text-slate-200 mb-4 z-10">{time}</span>
                      
                      <img 
                        src={forecast.image} 
                        alt={forecast.weather_desc} 
                        className="w-16 h-16 object-contain mb-4 drop-shadow-2xl group-hover:scale-110 transition-transform z-10"
                      />
                      
                      <span className="text-3xl font-black text-white z-10">{forecast.t}°</span>
                      <span className="text-xs text-slate-400 mt-3 text-center capitalize font-medium leading-tight h-8 z-10 flex items-center justify-center">
                        {forecast.weather_desc}
                      </span>

                      <div className="mt-3 pt-3 border-t border-slate-700/50 w-full flex justify-between text-[10px] text-slate-400 font-mono z-10">
                        <span title="Kelembapan Udara">💧 {forecast.hu}%</span>
                        <span title="Kecepatan Angin">💨 {forecast.ws} km/j</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : null}

      </div>
    </main>
  );
}