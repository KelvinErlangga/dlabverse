import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Title */}
          <div className="flex-shrink-0">
            <Link href="/bmkg" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-blue-500/20 transition-all">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <span className="font-bold tracking-tight text-white text-lg">BMKG<span className="text-blue-400">Hub</span></span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Beranda
              </Link>
              <Link href="/bmkg/cuaca" className="text-slate-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Prakiraan Cuaca
              </Link>
              <Link href="/bmkg/gempa" className="text-slate-300 hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Info Gempa Bumi
              </Link>
            </div>
          </div>
          
          {/* Mobile menu */}
          <div className="md:hidden flex items-center">
             <Link href="/bmkg/cuaca" className="text-xs font-bold text-blue-400 border border-blue-500/30 px-3 py-1.5 rounded-full mr-2">Cuaca</Link>
             <Link href="/bmkg/gempa" className="text-xs font-bold text-orange-400 border border-orange-500/30 px-3 py-1.5 rounded-full">Gempa</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}