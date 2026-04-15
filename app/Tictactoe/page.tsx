"use client";

import { useState, useEffect, useCallback } from "react";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import GameStatus from "./components/GameStatus";
import { calculateWinner, Player } from "./utils/GameLogic";
import Link from "next/link";

export default function Home() {
  const [history, setHistory] = useState<Player[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAgainstAI, setIsAgainstAI] = useState(false);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const winData = calculateWinner(currentSquares);
  const winner = winData?.winner || null;
  const winningLine = winData?.line || null;
  const isDraw = !winner && currentSquares.every((square) => square !== null);

  useEffect(() => {
    const savedScores = localStorage.getItem("ticTacScores");
    if (savedScores) setScores(JSON.parse(savedScores));
  }, []);

  useEffect(() => {
    if (winner) {
      setScores((prev) => {
        const newScores = { ...prev, [winner]: prev[winner as keyof typeof prev] + 1 };
        localStorage.setItem("ticTacScores", JSON.stringify(newScores));
        return newScores;
      });
      playSound('/win-sound.mp3');
    }
  }, [winner]);

  const playSound = (src: string) => {
    const audio = new Audio(src);
    audio.play().catch(() => { });
  };

  const handlePlay = useCallback((nextSquares: Player[]) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    playSound('/click-sound.mp3');
  }, [history, currentMove]);

  const handleClick = (i: number) => {
    if (currentSquares[i] || winner) return;
    const nextSquares = currentSquares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    handlePlay(nextSquares);
  };

  useEffect(() => {
    if (isAgainstAI && !xIsNext && !winner && !isDraw) {
      const timer = setTimeout(() => {
        const availableSpots = currentSquares
          .map((sq, i) => (sq === null ? i : null))
          .filter((val) => val !== null) as number[];

        if (availableSpots.length > 0) {
          const randomIdx = Math.floor(Math.random() * availableSpots.length);
          const nextSquares = currentSquares.slice();
          nextSquares[availableSpots[randomIdx]] = "O";
          handlePlay(nextSquares);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [xIsNext, isAgainstAI, currentSquares, winner, isDraw, handlePlay]);

  const undoMove = () => {
    if (currentMove > 0) {
      const stepBack = isAgainstAI ? Math.max(0, currentMove - 2) : currentMove - 1;
      setCurrentMove(stepBack);
    }
  };

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  };

  const resetScore = () => {
    setScores({ X: 0, O: 0 });
    localStorage.removeItem("ticTacScores");
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4 font-sans relative">


      {/* Container Utama: Kolom di Mobile, Baris di Desktop */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 lg:gap-24 w-full max-w-5xl">

        {/* BAGIAN KIRI: Informasi & Kontrol */}
        <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2">
          <h1 className="text-5xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-400 tracking-tight text-center lg:text-left">
            Tic Tac Toe
          </h1>

          <ScoreBoard scores={scores} />

          <div className="h-16 flex items-center">
            <GameStatus winner={winner} isDraw={isDraw} xIsNext={xIsNext} />
          </div>

          {/* Tombol Aksi Utama */}
          <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-4">
            <button
              onClick={undoMove}
              disabled={currentMove === 0 || !!winner}
              className="px-6 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors border border-gray-700"
            >
              ↩ Undo Move
            </button>
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium shadow-lg shadow-blue-600/30 transition-all active:scale-95"
            >
              🔄 Reset Game
            </button>
          </div>

          {/* Pengaturan Tambahan */}
          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4 border-t border-gray-800 pt-8 w-full max-w-md">
            <button
              onClick={() => {
                setIsAgainstAI(!isAgainstAI);
                resetGame();
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors border ${isAgainstAI
                ? "bg-purple-600/20 border-purple-500 text-purple-300"
                : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                }`}
            >
              🤖 Mode AI: {isAgainstAI ? "ON" : "OFF"}
            </button>
            <button
              onClick={resetScore}
              className="px-4 py-2 bg-red-900/30 text-red-400 hover:bg-red-900/50 border border-red-900/50 rounded-lg font-medium transition-colors"
            >
              🗑 Reset Skor
            </button>
          

            <Link href="/" className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2 font-medium z-10">
              ← Kembali
            </Link>
          </div>


        </div>

        {/* BAGIAN KANAN: Papan Permainan */}
        <div className="flex justify-center items-center w-full lg:w-1/2 pt-4 lg:pt-0">
          <Board squares={currentSquares} onClick={handleClick} winningLine={winningLine} />
        </div>

      </div>
    </main>
  );
}