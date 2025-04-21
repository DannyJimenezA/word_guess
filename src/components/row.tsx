import React from 'react';
import Tile from './tile';

interface RowProps {
  word: string;
  solution: string;
  isSubmitted: boolean;
  wordLength: number;
}

const Row: React.FC<RowProps> = ({ word, solution, isSubmitted, wordLength }) => {
  const letters = word.padEnd(wordLength).split('');
  const solutionArray = solution.split('');
  const tileStates: ('correct' | 'present' | 'absent')[] = Array(wordLength).fill('absent');

  if (isSubmitted) {
    const usedIndices = new Set<number>();

    // Paso 1: Letras correctas
    for (let i = 0; i < wordLength; i++) {
      if (letters[i] === solutionArray[i]) {
        tileStates[i] = 'correct';
        usedIndices.add(i);
      }
    }

    // Paso 2: Letras presentes
    for (let i = 0; i < wordLength; i++) {
      if (tileStates[i] === 'correct') continue;
      const letter = letters[i];

      const matchIndex = solutionArray.findIndex(
        (solLetter, idx) => solLetter === letter && !usedIndices.has(idx)
      );

      if (matchIndex !== -1) {
        tileStates[i] = 'present';
        usedIndices.add(matchIndex);
      }
    }
  }

  return (
    <div className={`row len-${wordLength}`}>
      {letters.map((letter, i) => (
        <Tile
          key={i}
          letter={letter}
          isSubmitted={isSubmitted}
          index={i}
          status={isSubmitted ? tileStates[i] : undefined}
        />
      ))}
    </div>
  );
};

export default Row;
