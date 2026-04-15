import Cell from "./Cell";
import { Player } from "../utils/GameLogic";

interface BoardProps {
    squares: Player[];
    onClick: (i: number) => void;
    winningLine: number[] | null;
}

export default function Board({ squares, onClick, winningLine }: BoardProps) {
    return (
        <div className="grid grid-cols-3 gap-3 p-4 bg-gray-900 rounded-2xl shadow-2xl border border-gray-800">
            {squares.map((square, i) => (
                <Cell
                    key={i}
                    value={square}
                    onClick={() => onClick(i)}
                    isWinningCell={winningLine?.includes(i) ?? false}
                />
            ))}
        </div>
    );
}