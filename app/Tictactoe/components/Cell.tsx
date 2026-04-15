import { Player } from "../utils/GameLogic";


interface CellProps {
    value: Player;
    onClick: () => void;
    isWinningCell: boolean;
}

export default function Cell({ value, onClick, isWinningCell }: CellProps) {
    return (
        <button
            className={`h-24 w-24 sm:h-32 sm:w-32 flex items-center justify-center text-5xl sm:text-7xl font-bold rounded-xl transition-all duration-300 ease-in-out shadow-lg
        ${value ? 'cursor-default' : 'cursor-pointer hover:bg-gray-700 active:scale-95'}
        ${isWinningCell ? 'bg-green-600 text-white animate-pulse shadow-green-500/50' : 'bg-gray-800 text-gray-200 hover:bg-gray-750'}
        ${value === 'X' ? 'text-blue-400' : value === 'O' ? 'text-red-400' : ''}
      `}
            onClick={onClick}
            disabled={!!value}
        >
            {value}
        </button>
    );
}