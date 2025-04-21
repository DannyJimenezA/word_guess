import React from 'react';

interface TileProps {
  letter: string;
  solution: string;
  isSubmitted: boolean;
  index: number;
}

const Tile: React.FC<TileProps> = ({ letter, solution, isSubmitted }) => {
  let status: 'correct' | 'present' | 'absent' | '' = '';

  if (isSubmitted) {
    if (letter === solution) {
      status = 'correct';
    } else if (solution.includes(letter)) {
      status = 'present';
    } else {
      status = 'absent';
    }
  }

  return <div className={`tile ${status}`}>{letter}</div>;
};

export default Tile;
