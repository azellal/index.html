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

  const handleInputChange = (row: number, col: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1];
    const char = value.toUpperCase();
    
    if (char && !/^[A-Z]$/.test(char)) return;

    const newInput = [...userInput.map(r => [...r])];
    newInput[row][col] = char;
    setUserInput(newInput);

    // Check if correct
    const newIsCorrect = [...isCorrect.map(r => [...r])];
    newIsCorrect[row][col] = char === grid[row][col];
    setIsCorrect(newIsCorrect);

    // Auto-focus next cell
    if (char !== '') {
      focusNextCell(row, col);
    }

    // Check completion
    checkCompletion(newInput);
  };

  const focusNextCell = (row: number, col: number) => {
    // Basic logic: find if there's an empty cell in the same row or column
    // For simplicity, let's just find the next cell in the grid that belongs to a word
    let found = false;
    
    // Try current row first
    for (let c = col + 1; c < grid[row].length; c++) {
      if (grid[row][c] !== '') {
        const nextInput = document.querySelector(`input[data-pos="${row}-${c}"]`) as HTMLInputElement;
        nextInput?.focus();
        found = true;
        break;
      }
    }

    if (!found) {
      // Try next rows
      for (let r = row + 1; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
          if (grid[r][c] !== '') {
            const nextInput = document.querySelector(`input[data-pos="${r}-${c}"]`) as HTMLInputElement;
            nextInput?.focus();
            found = true;
            break;
          }
        }
        if (found) break;
      }
    }
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
            row.map((cell, cIdx) => (
              <div 
                key={`${rIdx}-${cIdx}`} 
                className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center relative
                  ${cell === '' ? 'bg-transparent' : 'bg-white rounded-lg shadow-sm border-2 border-slate-200'}`}
              >
                {cell !== '' && (
                  <input
                    type="text"
                    maxLength={1}
                    data-pos={`${rIdx}-${cIdx}`}
                    value={userInput[rIdx][cIdx]}
                    onChange={(e) => handleInputChange(rIdx, cIdx, e.target.value)}
                    onFocus={() => setSelectedCell({ row: rIdx, col: cIdx })}
                    className={`w-full h-full text-center font-black text-xl md:text-2xl outline-none bg-transparent uppercase
                      ${isCorrect[rIdx][cIdx] ? 'text-emerald-600' : 'text-slate-700'}`}
                  />
                )}
                {/* Number or indicator could go here if needed */}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex-1 space-y-4 max-w-xs">
        <div className="bg-sky-50 p-6 rounded-3xl border-2 border-sky-100">
          <h3 className="font-black text-sky-800 mb-4 flex items-center gap-2">
            <HelpCircle size={20} /> Indices
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-black text-sky-400 uppercase tracking-widest mb-2">Horizontalement</h4>
              <ul className="space-y-2">
                {clues.filter(c => c.orientation === 'across').map((c, i) => (
                  <li key={i} className="text-sm font-bold text-slate-700 leading-tight">
                    • {c.clue}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black text-sky-400 uppercase tracking-widest mb-2">Verticalement</h4>
              <ul className="space-y-2">
                {clues.filter(c => c.orientation === 'down').map((c, i) => (
                  <li key={i} className="text-sm font-bold text-slate-700 leading-tight">
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
