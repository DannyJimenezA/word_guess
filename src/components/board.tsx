import React from 'react';
import Row from './row';

interface BoardProps {
  attempts: string[];
  currentInput: string;
  wordOfTheDay: string;
}

const MAX_ATTEMPTS = 6;

const Board: React.FC<BoardProps> = ({ attempts, currentInput, wordOfTheDay }) => {
  const wordLength = wordOfTheDay.length;
  const rows = [];

  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const word = attempts[i] || (i === attempts.length ? currentInput : '');
    const isSubmitted = i < attempts.length;

    rows.push(
      <Row
        key={i}
        word={word}
        solution={wordOfTheDay}
        isSubmitted={isSubmitted}
        wordLength={wordLength} // ✅ importante
      />
    );
  }

  return <div className="board">{rows}</div>;
};

export default Board;
