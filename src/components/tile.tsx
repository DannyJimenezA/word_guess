import React from 'react';

interface TileProps {
  letter: string;
  isSubmitted: boolean;
  index: number;
  status?: 'correct' | 'present' | 'absent';
}

const Tile: React.FC<TileProps> = ({ letter, isSubmitted, status }) => {
  const className = `tile ${isSubmitted && status ? status : ''}`;
  return <div className={className}>{letter}</div>;
};

export default Tile;
