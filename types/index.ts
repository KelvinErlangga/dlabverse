// types/index.ts
export interface WeatherData {
    lokasi: {
        provinsi: string;
        kota: string;
        kecamatan: string;
        desa: string;
        lon: number;
        lat: number;
        timezone: string;
    };
    cuaca: Array<{
        [x: string]: any;
        datetime: string;
        t: number; // suhu
        hu: number; // kelembapan
        ws: number; // wind speed
        wd: string; // wind direction
        tcc: number; // tutupan awan
        vs_text: string; // visibility
        weather_desc: string;
        image: string;
    }>;
}

export interface QuakeData {
    Tanggal: string;
    Jam: string;
    DateTime: string;
    Coordinates: string;
    Lintang: string;
    Bujur: string;
    Magnitude: string;
    Kedalaman: string;
    Wilayah: string;
    Potensi: string;
    Dirasakan: string;
    Shakemap: string;
}