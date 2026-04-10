import type { Metadata } from "next";
// 1. Import font yang kamu mau dari next/font/google
import { Plus_Jakarta_Sans } from "next/font/google"; 
import "./globals.css";

// 2. Konfigurasi font-nya
const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // Masukkan ketebalan yang dibutuhkan
  variable: "--font-plus-jakarta", // (Opsional) buat variabel CSS
});

export const metadata: Metadata = {
  title: "Dlabverse Studio",
  description: "Transformasi Digital Tanpa Batas bersama Dlabverse.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      {/* 3. Masukkan font ke dalam tag body */}
      <body className={`${plusJakarta.className} antialiased text-gray-900`}>
        {children}
      </body>
    </html>
  );
}