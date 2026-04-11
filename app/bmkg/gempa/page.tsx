// app/gempa/page.tsx
import { getLatestQuake } from "@/lib/api";

export default async function GempaPage() {
  const quake = await getLatestQuake();

  if (!quake) {
    return <div className="text-red-400">Gagal memuat data gempa.</div>;
  }

  const isTsunami = quake.Potensi.toLowerCase().includes("tsunami");

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-orange-500">Info Gempa Terkini</h1>

        <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col md:flex-row">
          {/* Visual Shakemap */}
          <div className="w-full md:w-1/2 bg-slate-800">
            <img
              src={`https://data.bmkg.go.id/DataMKG/TEWS/${quake.Shakemap}`}
              alt="Shakemap Gempa"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Data Gempa */}
          <div className="p-8 w-full md:w-1/2 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shadow-lg shadow-orange-500/30">
                {quake.Magnitude}
              </div>
              <div>
                <p className="text-sm text-slate-400">Skala Richter</p>
                <p className="font-semibold">{quake.Tanggal} • {quake.Jam}</p>
              </div>
            </div>

            <div className="space-y-4 mb-6 text-slate-300">
              <p><strong>Lokasi:</strong> {quake.Wilayah}</p>
              <p><strong>Kedalaman:</strong> {quake.Kedalaman}</p>
              <p><strong>Koordinat:</strong> {quake.Lintang}, {quake.Bujur}</p>
              <p><strong>Dirasakan:</strong> {quake.Dirasakan}</p>
            </div>

            <div className={`p-4 rounded-lg font-semibold text-center border ${isTsunami
              ? "bg-red-500/20 text-red-400 border-red-500/50"
              : "bg-green-500/10 text-green-400 border-green-500/30"
              }`}>
              {quake.Potensi}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}