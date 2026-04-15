export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;

// Definisi bentuk balok dan warnanya (menggunakan class Tailwind)
export const TETROMINOS = {
    0: { shape: [[0]], color: 'bg-gray-900 border-gray-800/50' },
    I: { shape: [[0, 'I', 0, 0], [0, 'I', 0, 0], [0, 'I', 0, 0], [0, 'I', 0, 0]], color: 'bg-cyan-400 border-cyan-500' },
    J: { shape: [[0, 'J', 0], [0, 'J', 0], ['J', 'J', 0]], color: 'bg-blue-500 border-blue-600' },
    L: { shape: [[0, 'L', 0], [0, 'L', 0], [0, 'L', 'L']], color: 'bg-orange-500 border-orange-600' },
    O: { shape: [['O', 'O'], ['O', 'O']], color: 'bg-yellow-400 border-yellow-500' },
    S: { shape: [[0, 'S', 'S'], ['S', 'S', 0], [0, 0, 0]], color: 'bg-green-500 border-green-600' },
    T: { shape: [[0, 0, 0], ['T', 'T', 'T'], [0, 'T', 0]], color: 'bg-purple-500 border-purple-600' },
    Z: { shape: [['Z', 'Z', 0], [0, 'Z', 'Z'], [0, 0, 0]], color: 'bg-red-500 border-red-600' },
};

// Fungsi memunculkan balok acak
export const randomTetromino = () => {
    const tetrominos = 'IJLOSTZ';
    const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)] as keyof typeof TETROMINOS;
    return TETROMINOS[randTetromino];
};

// Membuat papan kosong 20x10
export const createStage = () =>
    Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, 'clear']));

// Deteksi tabrakan
export const checkCollision = (player: any, stage: any, { x: moveX, y: moveY }: { x: number, y: number }) => {
    for (let y = 0; y < player.tetromino.length; y += 1) {
        for (let x = 0; x < player.tetromino[y].length; x += 1) {
            if (player.tetromino[y][x] !== 0) {
                // Potongan logika yang benar di dalam checkCollision
                if (
                    !stage[y + player.pos.y + moveY] || // Mencegah bablas ke bawah
                    !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] || // Mencegah bablas ke kiri/kanan
                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear' // Mencegah menabrak balok lain
                ) {
                    return true;
                }
            }
        }
    }
    return false;
};