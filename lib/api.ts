"use server"; // WAJIB ADA DI BARIS PALING ATAS

export async function getWeather(adm4Code: string) {
  try {
    const url = `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${adm4Code}`;
    const res = await fetch(url, { next: { revalidate: 3600 } }); 
    
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return null; 
    }

    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}