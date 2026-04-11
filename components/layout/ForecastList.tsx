interface ForecastItem {
    local_datetime: string;
    t: number;
    weather_desc: string;
    image: string;
}

interface ForecastListProps {
    forecasts: ForecastItem[];
}

export default function ForecastList({ forecasts }: ForecastListProps) {
    // Ambil maksimal 6 data ke depan untuk UI yang pas di grid
    const displayForecasts = forecasts.slice(1, 7);

    return (
        <div className="mt-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Prakiraan Berikutnya
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {displayForecasts.map((forecast, idx) => {
                    const dateObj = new Date(forecast.local_datetime);
                    const timeString = dateObj.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' });
                    const dayString = dateObj.toLocaleDateString("id-ID", { weekday: 'short' });

                    return (
                        <div
                            key={idx}
                            className="bg-slate-800/40 backdrop-blur-sm p-5 rounded-2xl flex flex-col items-center justify-center border border-slate-700/50 hover:bg-slate-800 hover:border-blue-500/30 transition-all cursor-default group"
                        >
                            <div className="text-center mb-3">
                                <span className="block font-medium text-slate-300 group-hover:text-white transition-colors">{timeString}</span>
                                <span className="text-xs text-slate-500">{dayString}</span>
                            </div>

                            <img
                                src={forecast.image}
                                alt={forecast.weather_desc}
                                className="w-14 h-14 mb-3 drop-shadow-md group-hover:scale-110 transition-transform"
                            />

                            <span className="font-bold text-2xl text-white">{forecast.t}°</span>
                            <span className="text-xs text-slate-400 mt-1 capitalize text-center leading-tight">
                                {forecast.weather_desc}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}