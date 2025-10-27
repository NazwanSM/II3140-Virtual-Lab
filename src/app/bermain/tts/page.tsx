'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { ArrowLeft} from 'lucide-react';
import { useRouter } from 'next/dist/client/components/navigation';


const puzzleData = {
    rows: 14,
    cols: 15,

    grid: [

        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],

    numbers: [

        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 0, 0, 6, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 7, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    
    answers: [

        [null, null, null, null, null, null, null, null, 'S', null, null, null, null, null, null],
        [null, null, null, null, 'A', 'P', 'O', 'T', 'E', 'K', null, null, null, null, null],
        [null, null, null, null, null, 'U', null, null, 'R', null, null, null, null, null, null],
        [null, null, null, 'E', null, 'E', null, 'K', 'U', 'A', 'L', 'I', 'T', 'A', 'S'],
        [null, null, null, 'J', null, 'B', null, null, null, null, null, null, null, 'N', null],
        [null, null, 'K', 'A', 'P', 'I', 'T', 'A', 'L', null, null, null, null, 'T', null],
        [null, null, null, 'A', null, null, 'A', null, null, null, null, null, null, 'R', null],
        [null, null, null, 'N', null, null, 'N', null, null, null, null, null, null, 'E', null],
        [null, null, null, null, 'R', null, 'Y', null, null, null, null, null, null, null, null],
        [null, null, null, null, 'I', 'J', 'A', 'Z', 'A', 'H', null, null, null, null, null],
        ['N', 'A', 'P', 'A', 'S', null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, 'I', null, null, null, null, null, null, null, null, null, null],
        [null, 'E', 'F', 'E', 'K', 'T', 'I', 'F', null, null, null, null, null, null, null],
        [null, null, null, null, 'O', null, null, null, null, null, null, null, null, null, null],
    ],

    clues: {
        across: [
            { num: 2, clue: "Tempat penjualan obat-obatan; kata baku dari 'Apotik' (6)", answer: "APOTEK" },
            { num: 5, clue: "Bentuk baku dari kata 'kwalitas' (8)", answer: "KUALITAS" },
            { num: 7, clue: "Huruf pertama pada kalimat dan nama orang harus ditulis dengan huruf ... (7)", answer: "KAPITAL" },
            { num:10, clue: "Dokumen resmi tanda kelulusan sekolah; sering salah ditulis menjadi 'ijasah' (7)", answer: "IJAZAH" },
            { num:11, clue: "Bentuk baku dari kata 'nafas' (5)", answer: "NAPAS" },
            { num:12, clue: "Kalimat yang mampu menyampaikan gagasan secara jelas dan tepat disebut kalimat ... (8)", answer: "EFEKTIF" },
        ],
        down: [
            { num: 1, clue: "Kalimat perintah atau ajakan diakhiri dengan tanda ... (1)", answer: "SERU" },
            { num: 3, clue: "Pedoman resmi penulisan huruf, tanda baca, dan ejaan Bahasa Indonesia (1)", answer: "PUEBI" },
            { num: 4, clue: "Aturan penulisan huruf besar-kecil, tanda baca, dan penulisan kata disebut ... (1)", answer: "EJAAN" },
            { num: 6, clue: "Bentuk baku dari kata 'antri' (1)", answer: "ANTRE" },
            { num: 8, clue: "Kalimat berupa pertanyaan disebut kalimat ... (1)", answer: "TANYA" },
            { num: 9, clue: "Bentuk baku dari kata 'resiko' (1)", answer: "RISIKO" },
        ],
    },
};

export default function CrosswordGame() {
    const { rows, cols, grid, numbers, answers, clues } = puzzleData;
    const router = useRouter();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [gridState, setGridState] = useState(
        Array(rows)
        .fill(null)
        .map(() => Array(cols).fill(''))
    );

    const [activeCell, setActiveCell] = useState({ row: 0, col: 0 });
    const [direction, setDirection] = useState('across');

    const [message, setMessage] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [cellStatus, setCellStatus] = useState<('correct' | 'incorrect' | null)[][]>(
        Array(rows).fill(null).map(() => Array(cols).fill(null))
    );
    const [isSoundActive, setIsSoundActive] = useState(true);

    useEffect(() => {
        audioRef.current = new Audio('/sound/background-music.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;

        if (isSoundActive) {
            audioRef.current.play().catch(err => {
                console.log('Autoplay prevented:', err);
            });
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            if (isSoundActive) {
                audioRef.current.play().catch(err => {
                    console.log('Play prevented:', err);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isSoundActive]);

    const toggleSound = () => {
        setIsSoundActive(!isSoundActive);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        const { row, col } = activeCell;
        if (grid[row][col] === 0) return;

        setMessage('');
        
        if (isChecked) {
            setIsChecked(false);
            setCellStatus(Array(rows).fill(null).map(() => Array(cols).fill(null)));
        }

        if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
            const newGridState = gridState.map((r) => [...r]);
            newGridState[row][col] = e.key.toUpperCase();
            setGridState(newGridState);

            let nextRow = row;
            let nextCol = col;

            if (direction === 'across') {
                nextCol++;
            } else {
                nextRow++;
            }

            while (nextRow < rows && nextCol < cols) {
                if (grid[nextRow]?.[nextCol] === 1) {
                    setActiveCell({ row: nextRow, col: nextCol });
                    return;
                }
                if (direction === 'across') {
                    nextCol++;
                } else {
                    nextRow++;
                }
            }
        }

        if (e.key === 'Backspace') {
            const newGridState = gridState.map((r) => [...r]);
            newGridState[row][col] = '';
            setGridState(newGridState);

            let prevRow = row;
            let prevCol = col;

            if (direction === 'across') {
                prevCol--;
            } else {
                prevRow--;
            }

            while (prevRow >= 0 && prevCol >= 0) {
                if (grid[prevRow][prevCol] === 1) {
                    setActiveCell({ row: prevRow, col: prevCol });
                    return;
                }
                if (direction === 'across') {
                    prevCol--;
                } else {
                    prevRow--;
                }
            }
        }

        if (e.key === ' ' || e.key === 'Tab') {
            e.preventDefault();
            setDirection(direction === 'across' ? 'down' : 'across');
        }
    };

    const handleCellClick = (row: number, col: number) => {
        if (grid[row][col] === 0) return;

        if (activeCell.row === row && activeCell.col === col) {
            setDirection(direction === 'across' ? 'down' : 'across');
        }

        setActiveCell({ row, col });
    };

    const handleClueClick = (dir: string, num: number) => {
        let startRow, startCol;

        outerLoop: for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (numbers[r][c] === num) {
                    const isValidStart = (dir === 'across' && (c === 0 || grid[r][c - 1] === 0) && grid[r][c+1] === 1) ||
                                        (dir === 'down' && (r === 0 || grid[r - 1][c] === 0) && grid[r+1]?.[c] === 1);

                    if (isValidStart) {
                        startRow = r;
                        startCol = c;
                        break outerLoop;
                    } else if (startRow === undefined) {
                        startRow = r;
                        startCol = c;
                    }
                }
            }
        }

        if (startRow !== undefined && startCol !== undefined && grid[startRow][startCol] === 1) {
            setDirection(dir);
            setActiveCell({ row: startRow, col: startCol });
        }
    };


    const highlightedCells = useMemo(() => {
        const cells = new Set();
        const { row: startRow, col: startCol } = activeCell;

        if (grid[startRow][startCol] === 0) return cells;

        if (direction === 'across') {
            let currentCol = startCol;
            while (currentCol > 0 && grid[startRow][currentCol - 1] === 1) {
                currentCol--;
            }
            while (currentCol < cols && grid[startRow][currentCol] === 1) {
                cells.add(`${startRow}-${currentCol}`);
                currentCol++;
            }
        } else {
            let currentRow = startRow;
            while (currentRow > 0 && grid[currentRow - 1][startCol] === 1) {
                currentRow--;
            }
            while (currentRow < rows && grid[currentRow][startCol] === 1) {
                cells.add(`${currentRow}-${startCol}`);
                currentRow++;
            }
        }
        return cells;
    }, [activeCell, direction, grid, rows, cols]);


    const checkAnswers = () => {
        let allCorrect = true;
        const newCellStatus: ('correct' | 'incorrect' | null)[][] = Array(rows).fill(null).map(() => Array(cols).fill(null));

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c] === 1) {
                    const userAnswer = gridState[r][c]?.toUpperCase() || '';
                    const correctAnswer = answers[r][c]?.toUpperCase() || '';

                    if (userAnswer !== '') {
                        if (userAnswer === correctAnswer) {
                            newCellStatus[r][c] = 'correct';
                        } else {
                            newCellStatus[r][c] = 'incorrect';
                            allCorrect = false;
                        }
                    } else {
                        if (correctAnswer !== '') {
                            allCorrect = false;
                        }
                    }
                }
            }
        }

        setCellStatus(newCellStatus);
        setIsChecked(true);

        if (allCorrect) {
            setMessage('Selamat! Semua jawaban benar!');
            audioRef.current = new Audio('/sound/success-sound.mp3');
            audioRef.current.play();
        } else {
            setMessage('Masih ada jawaban yang salah. Coba lagi!');
        }
    };

    useEffect(() => {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c] === 1) {
                    setTimeout(() => {
                        setActiveCell({ row: r, col: c });
                    }, 0);
                    return;
                }
            }
        }
    }, []);

    const activeClue = useMemo(() => {
        const { row: activeRow, col: activeCol } = activeCell;
        if (grid[activeRow][activeCol] === 0) return null;

        let clueNum = 0;
        let tempRow = activeRow;
        let tempCol = activeCol;

        if (direction === 'across') {
        while (tempCol >= 0 && grid[tempRow][tempCol] === 1) {
            if (numbers[tempRow][tempCol] > 0) {
                if(tempCol === 0 || grid[tempRow][tempCol-1] === 0) {
                    clueNum = numbers[tempRow][tempCol];
                }
            }
            if (clueNum > 0) break; 
            if(tempCol === 0) break;
            tempCol--;
        }
            if (clueNum === 0 && numbers[activeRow][activeCol] > 0 && (activeCol === 0 || grid[activeRow][activeCol-1] === 0)) {
            clueNum = numbers[activeRow][activeCol];
            }

        return clues.across.find(clue => clue.num === clueNum)?.clue || null;

        } else {
        while (tempRow >= 0 && grid[tempRow][tempCol] === 1) {
            if (numbers[tempRow][tempCol] > 0) {
                if (tempRow === 0 || grid[tempRow - 1]?.[tempCol] === 0) {
                    clueNum = numbers[tempRow][tempCol];
                }
            }
            if (clueNum > 0) break;
            if (tempRow === 0) break;
            tempRow--;
        }
            if (clueNum === 0 && numbers[activeRow][activeCol] > 0 && (activeRow === 0 || grid[activeRow-1]?.[activeCol] === 0)) {
            clueNum = numbers[activeRow][activeCol];
            }
        return clues.down.find(clue => clue.num === clueNum)?.clue || null;
        }

    }, [activeCell, direction, grid, numbers, clues]);

    return (
        <div className="dashboard-page p-6 md:p-10 font-sans" >
            <header className="flex justify-between items-center mb-8 relative z-50 mx-auto">
                <div className="flex items-center gap-4 md:gap-6">
                    <button onClick={() => router.push("/dashboard")} className="cursor-pointer hover:opacity-90 transition-opacity">
                        <Image src="/LogoAksaraSmall.png" alt="Logo" width={128} height={32} />
                    </button>
                </div>
                <button 
                    onClick={toggleSound}
                    className="cursor-pointer hover:scale-105 transition-all duration-300"
                >
                    <Image 
                        src={isSoundActive ? "/button-sound-active.png" : "/button-sound-mute.png"} 
                        alt={isSoundActive ? "Sound Active" : "Sound Mute"} 
                        width={56} 
                        height={56} 
                    />
                </button>
            </header>

            <div className="max-w-7xl mx-auto mb-4">
                <div className="bg-linear-to-r from-[#E57373] to-[#C62828] rounded-4xl border-4 border-gray-800 p-4 flex items-center gap-4 shadow-lg relative z-50">
                    <button 
                        onClick={() => router.back()}
                        className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors cursor-pointer"
                    >
                        <ArrowLeft size={28} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl md:text-2xl font-bold text-white flex-1 text-center pr-12 relative z-50">
                        Teka - Teki Silang
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="flex flex-col">
                <div
                    tabIndex={0}
                    className={`grid gap-px bg-gray-400 border-4 border-gray-800 rounded-2xl outline-none w-full max-w-[600px] mx-auto shadow-xl overflow-hidden`}
                    style={{
                    gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                    aspectRatio: `${cols} / ${rows}`,
                    }}
                    onKeyDown={handleKeyDown}
                >
                    {grid.map((rowArr, r) =>
                    rowArr.map((cell, c) => {
                        const isBlocker = cell === 0;
                        const cellNumber = numbers[r][c] || 0;
                        const isActive = activeCell.row === r && activeCell.col === c;
                        const isHighlighted = highlightedCells.has(`${r}-${c}`);
                        const status = cellStatus[r][c];

                        let cellClasses = 'relative w-full h-full flex items-center justify-center ';

                        if (isBlocker) {
                            cellClasses += 'bg-gray-800';
                        } else {
                            if (status === 'correct') {
                                cellClasses += 'bg-green-200';
                            } else if (status === 'incorrect') {
                                cellClasses += 'bg-red-200';
                            } else if (isActive) {
                                cellClasses += 'bg-blue-300';
                            } else if (isHighlighted) {
                                cellClasses += 'bg-yellow-100';
                            } else {
                                cellClasses += 'bg-white';
                            }
                            cellClasses += ' border border-gray-400 transition-colors duration-150 cursor-pointer hover:bg-gray-50';
                        }

                        return (
                        <div
                            key={`${r}-${c}`}
                            className={cellClasses}
                            onClick={() => handleCellClick(r, c)}
                            role={!isBlocker ? "textbox" : "presentation"}
                            aria-label={!isBlocker ? `Cell R${r+1} C${c+1}` : "Blocked cell"}
                        >
                            {!isBlocker && (
                            <>
                                {cellNumber > 0 && (
                                <span className="absolute top-0.5 left-1 text-[9px] sm:text-[11px] font-bold text-gray-700" >
                                    {cellNumber}
                                </span>
                                )}
                                <span className="text-base sm:text-xl md:text-2xl font-bold uppercase text-gray-900 select-none">
                                {gridState[r][c]}
                                </span>
                            </>
                            )}
                        </div>
                        );
                    })
                    )}
                </div>
                    {message && (
                        <p className={`mt-4 text-center text-sm md:text-base font-semibold ${message.includes('Selamat') ? 'text-green-600' : 'text-red-600'}`}>
                            {message}
                        </p>
                    )}
                </div>

                <div className="flex-1 flex flex-col bg-white p-4 border border-gray-300 rounded-lg shadow-md overflow-hidden z-10">
                    <div className="hidden md:block w-full mb-3 p-2 bg-yellow-100 border border-yellow-300 rounded-md text-sm text-yellow-800 text-center min-h-10">
                        {activeClue || 'Klik kotak atau petunjuk'}
                    </div>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto mb-4 pr-2">
                        <div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-700 sticky top-0 bg-white pb-1">Mendatar</h3>
                            <ul className="space-y-1.5">
                            {clues.across.map(({ num, clue }) => (
                                <li
                                key={`a-${num}`}
                                onClick={() => handleClueClick('across', num)}
                                className="text-xs sm:text-sm text-gray-700 hover:text-blue-600 cursor-pointer p-1 rounded transition-colors"
                                >
                                <span className="font-bold w-5 inline-block mr-1">{num}.</span> {clue}
                                </li>
                            ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-700 sticky top-0 bg-white pb-1">Menurun</h3>
                            <ul className="space-y-1.5">
                            {clues.down.map(({ num, clue }) => (
                                <li
                                key={`d-${num}`}
                                onClick={() => handleClueClick('down', num)}
                                className="text-xs sm:text-sm text-gray-700 hover:text-blue-600 cursor-pointer p-1 rounded transition-colors"
                                >
                                <span className="font-bold w-5 inline-block mr-1">{num}.</span> {clue}
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                    <div className="mt-auto flex justify-end items-center">
                        {message && (
                            <p className={`text-sm font-medium grow mr-4 md:hidden ${message.includes('Selamat') ? 'text-green-600' : 'text-red-600'}`}>
                                {message}
                            </p>
                        )}
                    </div>
                </div>
                    <button
                        onClick={checkAnswers}
                        className="transition-all hover:scale-105 cursor-pointer flex items-center justify-center z-10"
                    >
                        <Image src="/button-periksa.png" alt="Periksa" width={180} height={180}  />
                    </button>
            </div>
        </div>
    );
}