import { Player } from "../utils/GameLogic";

interface GameStatusProps {
  winner: Player;
  isDraw: boolean;
  xIsNext: boolean;
}

export default function GameStatus({ winner, isDraw, xIsNext }: GameStatusProps) {
  if (winner) {
    return <h2 className="text-3xl font-bold mb-6 text-green-400">Pemenang: {winner} 🎉</h2>;
  }
  if (isDraw) {
    return <h2 className="text-3xl font-bold mb-6 text-yellow-400">Hasil: Seri! 🤝</h2>;
  }
  return (
    <h2 className="text-2xl font-semibold mb-6 text-gray-300">
      Giliran: <span className={xIsNext ? "text-blue-400" : "text-red-400"}>{xIsNext ? "X" : "O"}</span>
    </h2>
  );
}