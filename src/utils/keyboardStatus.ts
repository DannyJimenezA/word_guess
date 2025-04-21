export type LetterStatus = 'correct' | 'present' | 'absent';

export function getKeyboardStatus(
  attempts: string[],
  solution: string
): Map<string, LetterStatus> {
  const statusMap = new Map<string, LetterStatus>();
  const solutionArray = solution.toUpperCase().split('');

  attempts.forEach((attempt) => {
    const attemptLetters = attempt.toUpperCase().split('');
    const usedIndices = Array(solution.length).fill(false);

    // Paso 1: marcar correct
    attemptLetters.forEach((letter, i) => {
      if (letter === solutionArray[i]) {
        statusMap.set(letter, 'correct');
        usedIndices[i] = true;
      }
    });

    // Paso 2: marcar present y absent
    attemptLetters.forEach((letter, i) => {
      if (letter === solutionArray[i]) return;

      const currentStatus = statusMap.get(letter);
      const index = solutionArray.findIndex(
        (solLetter, j) => solLetter === letter && !usedIndices[j]
      );

      if (index !== -1) {
        // solo actualiza si el estado actual no es 'correct'
        if (currentStatus !== 'correct') {
          statusMap.set(letter, 'present');
          usedIndices[index] = true;
        }
      } else {
        if (!currentStatus) {
          statusMap.set(letter, 'absent');
        }
      }
    });
  });

  return statusMap;
}
