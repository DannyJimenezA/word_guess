// export type LetterStatus = 'correct' | 'present' | 'absent';

// export function getKeyboardStatus(attempts: string[], solution: string): Map<string, LetterStatus> {
//   const statusMap = new Map<string, LetterStatus>();

//   for (const word of attempts) {
//     const letterStates: LetterStatus[] = Array(word.length).fill('absent');
//     const solutionLetters = solution.split('');
//     const usedIndices = new Set<number>();

//     // Paso 1: Letras correctas (verdes)
//     for (let i = 0; i < word.length; i++) {
//       if (word[i] === solution[i]) {
//         letterStates[i] = 'correct';
//         usedIndices.add(i);
//       }
//     }

//     // Paso 2: Letras presentes (amarillas)
//     for (let i = 0; i < word.length; i++) {
//       if (letterStates[i] === 'correct') continue;

//       const letter = word[i];
//       const foundIndex = solutionLetters.findIndex((solLetter, idx) => solLetter === letter && !usedIndices.has(idx));

//       if (foundIndex !== -1) {
//         letterStates[i] = 'present';
//         usedIndices.add(foundIndex);
//       }
//     }

//     // Actualiza el estado global del teclado
//     for (let i = 0; i < word.length; i++) {
//       const key = word[i];
//       const status = letterStates[i];

//       const prev = statusMap.get(key);

//       if (prev === 'correct') continue;
//       if (prev === 'present' && status === 'absent') continue;

//       statusMap.set(key, status);
//     }
//   }

//   return statusMap;
// }

export type LetterStatus = 'correct' | 'present' | 'absent';

function normalizeChar(char: string): string {
  return char.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function getKeyboardStatus(attempts: string[], solution: string): Map<string, LetterStatus> {
  const statusMap = new Map<string, LetterStatus>();

  for (const word of attempts) {
    const letterStates: LetterStatus[] = Array(word.length).fill('absent');
    const solutionLetters = solution.split('');
    const usedIndices = new Set<number>();

    // Paso 1: Letras correctas
    for (let i = 0; i < word.length; i++) {
      if (normalizeChar(word[i]) === normalizeChar(solution[i])) {
        letterStates[i] = 'correct';
        usedIndices.add(i);
      }
    }

    // Paso 2: Letras presentes
    for (let i = 0; i < word.length; i++) {
      if (letterStates[i] === 'correct') continue;

      const letter = normalizeChar(word[i]);
      const foundIndex = solutionLetters.findIndex((solLetter, idx) =>
        normalizeChar(solLetter) === letter && !usedIndices.has(idx)
      );

      if (foundIndex !== -1) {
        letterStates[i] = 'present';
        usedIndices.add(foundIndex);
      }
    }

    // Actualiza el estado del teclado
    for (let i = 0; i < word.length; i++) {
      const key = word[i]; // conserva tilde
      const status = letterStates[i];

      const prev = statusMap.get(key);

      if (prev === 'correct') continue;
      if (prev === 'present' && status === 'absent') continue;

      statusMap.set(key, status);
    }
  }

  return statusMap;
}
