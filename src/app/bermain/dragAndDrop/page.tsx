'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const allGameData = [
    {
        paragraph: "Ketika saya akan memasuki ruang ujian ini, saya merasa {0} tidak akan dapat mengikuti ujian dengan tenang. Akan tetapi, setelah saya berdoa, perasaan itu menjadi berkurang. Ternyata saya {1} ketakutan. Begitu lembar soal saya buka, saya menarik {2} panjang dan mengucapkan nama Tuhan, perasaan saya semakin tenang sehingga dapat menjawab soal dengan baik.",
        blanks: [
            { id: 0, correctAnswer: "khawatir" },
            { id: 1, correctAnswer: "hanya" },
            { id: 2, correctAnswer: "napas" }
        ],
        options: [
            { id: "opt1", text: "kawatir", isCorrect: false },
            { id: "opt2", text: "kuatir", isCorrect: false },
            { id: "opt3", text: "khawatir", isCorrect: true },
            { id: "opt4", text: "khuwatir", isCorrect: false },
            { id: "opt5", text: "hanya", isCorrect: true },
            { id: "opt6", text: "cuma", isCorrect: false },
            { id: "opt7", text: "nafas", isCorrect: false },
            { id: "opt8", text: "napas", isCorrect: true }
        ]
    },
    {
        paragraph: "Banyak perusahaan kini menuntut karyawan yang memiliki {0} tinggi agar mampu bersaing. Namun, apabila seseorang hanya memiliki ijazah tanpa {1} praktis, maka peluang naik jabatan menjadi {2}.",
        blanks: [
            { id: 0, correctAnswer: "kualifikasi" },
            { id: 1, correctAnswer: "kompetensi" },
            { id: 2, correctAnswer: "kecil" }
        ],
        options: [
            { id: "opt1", text: "kualifikasi", isCorrect: true },
            { id: "opt2", text: "kwalifikasi", isCorrect: false },
            { id: "opt3", text: "kompetensi", isCorrect: true },
            { id: "opt4", text: "kompentensi", isCorrect: false },
            { id: "opt5", text: "lebih besar", isCorrect: false },
            { id: "opt6", text: "kecil", isCorrect: true }
        ]
    },
    {
        paragraph: "Arno menyerahkan {0} kartu tanda penduduk plus kartu keluarga untuk mendapatkan beras murah. Panitia lantas memberinya kupon beras dan menyuruhnya {1}. Akan tetapi, mereka kecewa karena berasnya tidak ada. Sementara itu, warga terus berdatangan. Mereka pun kecewa dan mengatakan bahwa mereka {2}.",
        blanks: [
            { id: 0, correctAnswer: "fotokopi" },
            { id: 1, correctAnswer: "antre" },
            { id: 2, correctAnswer: "tertipu" }
        ],
        options: [
            { id: "opt1", text: "fotokopi", isCorrect: true },
            { id: "opt2", text: "photocopy", isCorrect: false },
            { id: "opt3", text: "potocopy", isCorrect: false },
            { id: "opt4", text: "antre", isCorrect: true },
            { id: "opt5", text: "antri", isCorrect: false },
            { id: "opt6", text: "tertipu", isCorrect: true },
            { id: "opt7", text: "ketipu", isCorrect: false }
        ]
    }
];

export default function DragAndDropGame() {
    const router = useRouter();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [usedOptions, setUsedOptions] = useState<Set<string>>(new Set());
    const [draggedItem, setDraggedItem] = useState<string | null>(null);
    const [checked, setChecked] = useState(false);
    const [results, setResults] = useState<{ [key: number]: boolean }>({});
    const [message, setMessage] = useState('');
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

    const gameData = allGameData[currentQuestionIndex];

    const handleDragStart = (e: React.DragEvent, optionText: string) => {
        setDraggedItem(optionText);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, blankId: number) => {
        e.preventDefault();
        
        if (draggedItem) {
            const oldAnswer = answers[blankId];
            if (oldAnswer) {
                setUsedOptions(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(oldAnswer);
                    return newSet;
                });
            }

            setAnswers(prev => ({ ...prev, [blankId]: draggedItem }));
            setUsedOptions(prev => new Set(prev).add(draggedItem));
            setDraggedItem(null);
            
            if (checked) {
                setChecked(false);
                setResults({});
                setMessage('');
            }
        }
    };

    const handleRemoveAnswer = (blankId: number) => {
        const answer = answers[blankId];
        if (answer) {
            setAnswers(prev => {
                const newAnswers = { ...prev };
                delete newAnswers[blankId];
                return newAnswers;
            });
            setUsedOptions(prev => {
                const newSet = new Set(prev);
                newSet.delete(answer);
                return newSet;
            });
            
            if (checked) {
                setChecked(false);
                setResults({});
                setMessage('');
            }
        }
    };

    const checkAnswers = () => {
        const newResults: { [key: number]: boolean } = {};
        let allCorrect = true;
        let allFilled = true;

        gameData.blanks.forEach(blank => {
            const userAnswer = answers[blank.id];
            if (!userAnswer) {
                allFilled = false;
            } else {
                const isCorrect = userAnswer === blank.correctAnswer;
                newResults[blank.id] = isCorrect;
                if (!isCorrect) allCorrect = false;
            }
        });

        if (!allFilled) {
            setMessage('Lengkapi semua jawaban terlebih dahulu!');
            return;
        }

        setResults(newResults);
        setChecked(true);

        if (allCorrect) {
            setMessage('Selamat! Semua jawaban benar! 🎉');
        } else {
            setMessage('Masih ada jawaban yang salah. Coba lagi!');
        }
    };

    const renderParagraph = () => {
        const parts = gameData.paragraph.split(/(\{\d+\})/);
        
        return parts.map((part, index) => {
            const match = part.match(/\{(\d+)\}/);
            if (match) {
                const blankId = parseInt(match[1]);
                const answer = answers[blankId];
                const result = results[blankId];

                return (
                    <span
                        key={index}
                        className={`inline-flex items-center min-w-[120px] mx-1 px-3 py-1 border-2 border-dashed rounded-lg ${
                            checked
                                ? result
                                    ? 'border-green-600 bg-green-100'
                                    : 'border-red-600 bg-red-100'
                                : 'border-gray-400 bg-gray-50'
                        } ${!answer ? 'border-gray-800' : ''}`}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, blankId)}
                    >
                        {answer ? (
                            <span className="flex items-center justify-between w-full">
                                <span className="font-semibold text-gray-900">{answer}</span>
                                <button
                                    onClick={() => handleRemoveAnswer(blankId)}
                                    className="ml-2 text-red-600 hover:text-red-800 font-bold"
                                    title="Hapus"
                                >
                                    ×
                                </button>
                            </span>
                        ) : (
                            <span className="text-gray-400 text-sm">tarik ke sini</span>
                        )}
                    </span>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

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
                <div className="bg-linear-to-r from-[#E57373] to-[#C62828] rounded-3xl border-4 border-gray-800 p-4 flex items-center gap-4 shadow-lg relative z-10">
                    <button 
                        onClick={() => router.back()}
                        className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors cursor-pointer"
                    >
                        <ArrowLeft size={28} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl md:text-2xl font-bold text-white flex-1 text-center pr-12 relative z-50">
                        Drag and Drop - Soal {currentQuestionIndex + 1}/{allGameData.length}
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto space-y-6">
                <div className="bg-white border-4 border-gray-800 rounded-3xl p-8 shadow-xl relative z-10">
                    <p className="text-lg md:text-xl text-gray-900 leading-relaxed">
                        {renderParagraph()}
                    </p>
                </div>

                <div className="bg-white border-4 border-gray-800 rounded-3xl p-6 shadow-xl relative z-10">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {gameData.options.map((option) => {
                            const isUsed = usedOptions.has(option.text);
                            
                            return (
                                <div
                                    key={option.id}
                                    draggable={!isUsed}
                                    onDragStart={(e) => !isUsed && handleDragStart(e, option.text)}
                                    className={`px-6 py-3 rounded-full border-3 border-gray-800 font-semibold text-lg transition-all ${
                                        isUsed
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                                            : 'bg-[#D4AF37] text-gray-900 cursor-move hover:scale-105 hover:shadow-lg'
                                    }`}
                                >
                                    {option.text}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                    {message && (
                        <div className={`px-6 py-3 rounded-2xl border-2 font-semibold text-lg ${
                            message.includes('Selamat') 
                                ? 'bg-green-100 border-green-600 text-green-800' 
                                : message.includes('salah')
                                ? 'bg-red-100 border-red-600 text-red-800'
                                : 'bg-yellow-100 border-yellow-600 text-yellow-800'
                        }`}>
                            {message}
                        </div>
                    )}
                    
                    <div className="flex gap-4">
                        <button
                            onClick={checkAnswers}
                            disabled={checked}
                            className={`transition-all hover:scale-105 cursor-pointer flex items-center justify-center z-10 ${
                                checked ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            <Image src="/button-periksa.png" alt="Periksa" width={180} height={180}  />
                        </button>

                        {checked && (
                            <button
                                onClick={() => {
                                    if (currentQuestionIndex < allGameData.length - 1) {
                                        setCurrentQuestionIndex(prev => prev + 1);
                                        setAnswers({});
                                        setUsedOptions(new Set());
                                        setChecked(false);
                                        setResults({});
                                        setMessage('');
                                    } else {
                                        setMessage('🎉 Selamat! Anda telah menyelesaikan semua soal!');
                                        setTimeout(() => {
                                            router.push('/bermain');
                                        }, 2000);
                                    }
                                }}
                                className="transition-all hover:scale-105 cursor-pointer flex items-center justify-center z-10"
                            >
                                {currentQuestionIndex < allGameData.length - 1 ? <Image src="/button-selanjutnya.png" alt="Selanjutnya" width={180} height={180} /> : <Image src="/button-selesai.png" alt="Selesai" width={180} height={180} />}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

