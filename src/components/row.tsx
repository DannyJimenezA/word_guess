// import React from 'react';

// interface RowProps {
//   word: string;
//   solution: string;
//   isSubmitted: boolean;
// }

// type LetterStatus = 'correct' | 'present' | 'absent' | '';

// const getLetterStatus = (letter: string, index: number, solution: string): LetterStatus => {
//   if (letter === solution[index]) return 'correct';
//   if (solution.includes(letter)) return 'present';
//   return 'absent';
// };

// const Row: React.FC<RowProps> = ({ word, solution, isSubmitted }) => {
//   const paddedWord = word.padEnd(solution.length);
//   const letters = paddedWord.toUpperCase().split('');

//   return (
//     <div className="row">
//       {letters.map((letter, i) => {
//         const status: LetterStatus = isSubmitted ? getLetterStatus(letter, i, solution) : '';
//         return (
//           <div key={i} className={`tile ${status}`}>
//             {letter}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Row;

import React from 'react';

interface RowProps {
  word: string;
  solution: string;
  isSubmitted: boolean;
}

type LetterStatus = 'correct' | 'present' | 'absent' | '';

const Row: React.FC<RowProps> = ({ word, solution, isSubmitted }) => {
  const paddedWord = word.padEnd(solution.length);
  const letters = paddedWord.toUpperCase().split('');
  const statuses: LetterStatus[] = Array(solution.length).fill('');

  if (isSubmitted) {
    const solutionArray = solution.toUpperCase().split('');
    const usedIndices: boolean[] = Array(solution.length).fill(false);

    // Paso 1: marcar letras correctas
    letters.forEach((letter, i) => {
      if (letter === solutionArray[i]) {
        statuses[i] = 'correct';
        usedIndices[i] = true;
      }
    });

    // Paso 2: marcar letras presentes (pero mal ubicadas)
    letters.forEach((letter, i) => {
      if (statuses[i] !== '') return; // ya es correct

      const index = solutionArray.findIndex(
        (solLetter, j) => solLetter === letter && !usedIndices[j]
      );

      if (index !== -1) {
        statuses[i] = 'present';
        usedIndices[index] = true;
      } else {
        statuses[i] = 'absent';
      }
    });
  }

  return (
    <div className="row">
      {letters.map((letter, i) => (
        <div key={i} className={`tile ${statuses[i]}`}>
          {letter}
        </div>
      ))}
    </div>
  );
};

export default Row;
