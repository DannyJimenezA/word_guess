// import React from 'react';
// import Row from './row';

// interface BoardProps {
//   attempts: string[];
//   currentInput: string;
//   wordOfTheDay: string;
// }

// const MAX_ATTEMPTS = 6;

// const Board: React.FC<BoardProps> = ({ attempts, currentInput, wordOfTheDay }) => {
//   const rows = [];

//   for (let i = 0; i < MAX_ATTEMPTS; i++) {
//     const word = attempts[i] || (i === attempts.length ? currentInput : '');
//     rows.push(
//       <Row key={i} word={word} solution={wordOfTheDay} />
//     );
//   }

//   return <div className="board">{rows}</div>;
// };

// export default Board;

import React from 'react';
import Row from './row';

interface BoardProps {
  attempts: string[];
  currentInput: string;
  wordOfTheDay: string;
}

const MAX_ATTEMPTS = 6;

const Board: React.FC<BoardProps> = ({ attempts, currentInput, wordOfTheDay }) => {
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
      />
    );
  }

  return <div className="board">{rows}</div>;
};

export default Board;
