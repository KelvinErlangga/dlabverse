import Navbar from "./Navbar";

export default function BmkgLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      <Navbar />
      
      {/* pt-16 memastikan konten di bawahnya tidak tertimpa Navbar yang fixed */}
      <div className="pt-16">
        {children}
      </div>
    </div>
  );
}