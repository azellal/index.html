import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { HelpCircle } from 'lucide-react';

interface Clue {
  word: string;
  clue: string;
  orientation: 'across' | 'down';
  row: number;
  col: number;
}

interface CrosswordGameProps {
  clues: Clue[];
  onComplete: () => void;
}

export const CrosswordGame: React.FC<CrosswordGameProps> = ({ clues, onComplete }) => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [userInput, setUserInput] = useState<string[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean[][]>([]);
  const [activeClue, setActiveClue] = useState<Clue | null>(null);

  // Initialize grid
  useEffect(() => {
    let maxRow = 0;
    let maxCol = 0;

    clues.forEach(c => {
      if (c.orientation === 'across') {
        maxRow = Math.max(maxRow, c.row);
        maxCol = Math.max(maxCol, c.col + c.word.length - 1);
      } else {
        maxRow = Math.max(maxRow, c.row + c.word.length - 1);
        maxCol = Math.max(maxCol, c.col);
      }
    });

    const newGrid = Array.from({ length: maxRow + 1 }, () => Array(maxCol + 1).fill(''));
    const newUserInput = Array.from({ length: maxRow + 1 }, () => Array(maxCol + 1).fill(''));
    const newIsCorrect = Array.from({ length: maxRow + 1 }, () => Array(maxCol + 1).fill(false));

    clues.forEach(c => {
      for (let i = 0; i < c.word.length; i++) {
        if (c.orientation === 'across') {
          newGrid[c.row][c.col + i] = c.word[i].toUpperCase();
        } else {
          newGrid[c.row + i][c.col] = c.word[i].toUpperCase();
        }
      }
    });

    setGrid(newGrid);
    setUserInput(newUserInput);
    setIsCorrect(newIsCorrect);
  }, [clues]);

  const getCluesForCell = (row: number, col: number) => {
    return clues.filter(c => {
      if (c.orientation === 'across') {
        return c.row === row && col >= c.col && col < c.col + c.word.length;
      } else {
        return c.col === col && row >= c.row && row < c.row + c.word.length;
      }
    });
  };

  const isCellInClue = (row: number, col: number, clue: Clue | null) => {
    if (!clue) return false;
    if (clue.orientation === 'across') {
      return row === clue.row && col >= clue.col && col < clue.col + clue.word.length;
    } else {
      return col === clue.col && row >= clue.row && row < clue.row + clue.word.length;
    }
  };

  const handleCellFocus = (row: number, col: number) => {
    setSelectedCell({ row, col });
    const cellClues = getCluesForCell(row, col);
    if (!activeClue || !cellClues.includes(activeClue)) {
      setActiveClue(cellClues[0] || null);
    }
  };

  const handleCellClick = (row: number, col: number) => {
    const cellClues = getCluesForCell(row, col);
    if (cellClues.length > 1 && activeClue) {
      const currentIndex = cellClues.indexOf(activeClue);
      if (currentIndex !== -1) {
        const nextIndex = (currentIndex + 1) % cellClues.length;
        setActiveClue(cellClues[nextIndex]);
      }
    }
  };

  const handleClueClick = (clue: Clue) => {
    setActiveClue(clue);
    const input = document.querySelector(`input[data-pos="${clue.row}-${clue.col}"]`) as HTMLInputElement;
    input?.focus();
  };

  const handleInputChange = (row: number, col: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1];
    const char = value.toUpperCase();
    
    if (char && !/^[A-ZÉÈÊËÀÁÂÄÇÎÏÔÖÙÛÜ]$/i.test(char)) return; // Allow some French characters just in case

    const newInput = [...userInput.map(r => [...r])];
    newInput[row][col] = char;
    setUserInput(newInput);

    // Check if correct
    const newIsCorrect = [...isCorrect.map(r => [...r])];
    newIsCorrect[row][col] = char === grid[row][col];
    setIsCorrect(newIsCorrect);

    // Auto-focus next cell
    if (char !== '' && activeClue) {
      focusNextCellInClue(row, col, activeClue);
    }

    // Check completion
    checkCompletion(newInput);
  };

  const focusNextCellInClue = (row: number, col: number, clue: Clue) => {
    let nextRow = row;
    let nextCol = col;

    if (clue.orientation === 'across') {
      nextCol = col + 1;
      if (nextCol >= clue.col + clue.word.length) return; // End of word
    } else {
      nextRow = row + 1;
      if (nextRow >= clue.row + clue.word.length) return; // End of word
    }

    const nextInput = document.querySelector(`input[data-pos="${nextRow}-${nextCol}"]`) as HTMLInputElement;
    nextInput?.focus();
  };

  const checkCompletion = (currentInput: string[][]) => {
    let allFilled = true;
    let allCorrect = true;

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        if (grid[r][c] !== '') {
          if (currentInput[r][c] === '') allFilled = false;
          if (currentInput[r][c] !== grid[r][c]) allCorrect = false;
        }
      }
    }

    if (allFilled && allCorrect) {
      setTimeout(onComplete, 1000);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start justify-center p-4">
      <div className="bg-slate-100 p-4 rounded-2xl shadow-inner inline-block">
        <div 
          className="grid gap-1" 
          style={{ 
            gridTemplateRows: `repeat(${grid.length}, minmax(0, 1fr))`,
            gridTemplateColumns: `repeat(${grid[0]?.length || 0}, minmax(0, 1fr))`
          }}
        >
          {grid.map((row, rIdx) => 
            row.map((cell, cIdx) => {
              const inActiveClue = isCellInClue(rIdx, cIdx, activeClue);
              const isSelected = selectedCell?.row === rIdx && selectedCell?.col === cIdx;
              
              let bgClass = "bg-white";
              if (cell === '') {
                bgClass = "bg-transparent";
              } else if (isSelected) {
                bgClass = "bg-sky-200 ring-2 ring-sky-400 z-10";
              } else if (inActiveClue) {
                bgClass = "bg-sky-100";
              }

              return (
                <div 
                  key={`${rIdx}-${cIdx}`} 
                  className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center relative rounded-lg
                    ${cell === '' ? '' : 'shadow-sm border-2 border-slate-200'}
                    ${bgClass} transition-colors`}
                >
                  {cell !== '' && (
                    <input
                      type="text"
                      maxLength={1}
                      data-pos={`${rIdx}-${cIdx}`}
                      value={userInput[rIdx][cIdx]}
                      onChange={(e) => handleInputChange(rIdx, cIdx, e.target.value)}
                      onFocus={() => handleCellFocus(rIdx, cIdx)}
                      onClick={() => handleCellClick(rIdx, cIdx)}
                      className={`w-full h-full text-center font-black text-xl md:text-2xl outline-none bg-transparent uppercase
                        ${isCorrect[rIdx][cIdx] ? 'text-emerald-600' : 'text-slate-700'}`}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="flex-1 space-y-4 max-w-xs w-full">
        <div className="bg-sky-50 p-6 rounded-3xl border-2 border-sky-100 h-full">
          <h3 className="font-black text-sky-800 mb-4 flex items-center gap-2">
            <HelpCircle size={20} /> Indices
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-black text-sky-400 uppercase tracking-widest mb-2">Horizontalement</h4>
              <ul className="space-y-2">
                {clues.filter(c => c.orientation === 'across').map((c, i) => (
                  <li 
                    key={i} 
                    onClick={() => handleClueClick(c)}
                    className={`text-sm font-bold text-slate-700 leading-tight p-2 rounded-xl cursor-pointer transition-colors
                      ${activeClue === c ? 'bg-sky-200 text-sky-900 shadow-sm' : 'hover:bg-sky-100'}`}
                  >
                    • {c.clue}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black text-sky-400 uppercase tracking-widest mb-2">Verticalement</h4>
              <ul className="space-y-2">
                {clues.filter(c => c.orientation === 'down').map((c, i) => (
                  <li 
                    key={i} 
                    onClick={() => handleClueClick(c)}
                    className={`text-sm font-bold text-slate-700 leading-tight p-2 rounded-xl cursor-pointer transition-colors
                      ${activeClue === c ? 'bg-sky-200 text-sky-900 shadow-sm' : 'hover:bg-sky-100'}`}
                  >
                    • {c.clue}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
