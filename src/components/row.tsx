import React from 'react';
import Tile from './title';

interface RowProps {
  word: string;
  solution: string;
  isSubmitted: boolean;
  wordLength: number;
}

const Row: React.FC<RowProps> = ({ word, solution, isSubmitted, wordLength }) => {
  const letters = word.padEnd(wordLength).split('');

  return (
    <div className={`row len-${wordLength}`}>
      {letters.map((letter, i) => (
        <Tile
          key={i}
          letter={letter}
          solution={solution[i]}
          isSubmitted={isSubmitted}
          index={i}
        />
      ))}
    </div>
  );
};

export default Row;
