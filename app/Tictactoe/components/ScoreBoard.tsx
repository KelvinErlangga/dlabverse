interface ScoreBoardProps {
  scores: { X: number; O: number };
}

export default function ScoreBoard({ scores }: ScoreBoardProps) {
  return (
    <div className="flex gap-8 mb-8">
      <div className="flex flex-col items-center bg-gray-800 px-6 py-3 rounded-lg border border-gray-700 shadow-md">
        <span className="text-blue-400 font-bold text-lg">Player X</span>
        <span className="text-3xl font-black text-white">{scores.X}</span>
      </div>
      <div className="flex flex-col items-center bg-gray-800 px-6 py-3 rounded-lg border border-gray-700 shadow-md">
        <span className="text-red-400 font-bold text-lg">Player O</span>
        <span className="text-3xl font-black text-white">{scores.O}</span>
      </div>
    </div>
  );
}