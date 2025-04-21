// import React, { useState, useEffect } from 'react';
// import Board from './components/board';
// import Keyboard from './components/keyboard';
// import { getKeyboardStatus } from './utils/keyboardStatus';
// import { fetchRandomWord } from './utils/fetchWord';
// import './App.css';

// const MAX_ATTEMPTS = 6;
// const WORD_LENGTH = 5;


// const App: React.FC = () => {
//   const [wordOfTheDay, setWordOfTheDay] = useState<string | null>(null);
//   const [attempts, setAttempts] = useState<string[]>([]);
//   const [currentInput, setCurrentInput] = useState<string>('');
//   const [gameOver, setGameOver] = useState<boolean>(false);
//   const [gameResult, setGameResult] = useState<'win' | 'lose' | null>(null);

//   // 🟡 Cargar palabra desde la API
//   useEffect(() => {
//     const loadWord = async () => {
//       const word = await fetchRandomWord(WORD_LENGTH);
//       if (word) setWordOfTheDay(word);
//       else alert('Error cargando la palabra. Intenta recargar la página.');
//     };

//     loadWord();
//   }, []);

//   // const handleKeyPress = (key: string) => {
//   //   if (!wordOfTheDay || gameOver) return;

//   //   if (key === 'ENTER') {
//   //     if (currentInput.length === wordOfTheDay.length) {
//   //       const guess = currentInput.toUpperCase();
//   //       const newAttempts = [...attempts, guess];
//   //       setAttempts(newAttempts);
//   //       setCurrentInput('');

//   //       if (guess === wordOfTheDay) {
//   //         setGameOver(true);
//   //         setTimeout(() => alert('🎉 ¡Ganaste!'), 200);
//   //       } else if (newAttempts.length >= MAX_ATTEMPTS) {
//   //         setGameOver(true);
//   //         setTimeout(() => alert(`😢 Te quedaste sin intentos. Era: ${wordOfTheDay}`), 200);
//   //       }
//   //     }
//   //   } else if (key === 'BACKSPACE') {
//   //     setCurrentInput((prev) => prev.slice(0, -1));
//   //   } else if (/^[A-Z]$/.test(key)) {
//   //     if (currentInput.length < wordOfTheDay.length) {
//   //       setCurrentInput((prev) => prev + key);
//   //     }
//   //   }
//   // };

//   const handleKeyPress = (key: string) => {
//     if (!wordOfTheDay || gameOver) return;
  
//     if (key === 'ENTER') {
//       if (currentInput.length === wordOfTheDay.length) {
//         const guess = currentInput.toUpperCase();
//         const newAttempts = [...attempts, guess];
//         setAttempts(newAttempts);
//         setCurrentInput('');
  
//         if (guess === wordOfTheDay) {
//           setGameOver(true);
//           setGameResult('win');
//         } else if (newAttempts.length >= MAX_ATTEMPTS) {
//           setGameOver(true);
//           setGameResult('lose');
//         }
        
//       }
//     } else if (key === 'BACKSPACE') {
//       setCurrentInput((prev) => prev.slice(0, -1));
//     } else if (/^[A-Z]$/.test(key)) {
//       if (currentInput.length < wordOfTheDay.length) {
//         setCurrentInput((prev) => prev + key);
//       }
//     }
//   };
  
//   const resetGame = async () => {
//     setAttempts([]);
//     setCurrentInput('');
//     setGameOver(false);
//     setGameResult(null);
//     const newWord = await fetchRandomWord(WORD_LENGTH);
//     if (newWord) setWordOfTheDay(newWord);
//   };
  

//   // 🧠 Escuchar teclado físico
//   useEffect(() => {
//     const onKeyDown = (e: KeyboardEvent) => {
//       const key = e.key.toUpperCase();
//       if (key === 'ENTER' || key === 'BACKSPACE' || /^[A-Z]$/.test(key)) {
//         handleKeyPress(key);
//       }
//     };

//     window.addEventListener('keydown', onKeyDown);
//     return () => window.removeEventListener('keydown', onKeyDown);
//   }, [currentInput, attempts, wordOfTheDay, gameOver]);

//   // 🟩 Obtener estado del teclado (solo si ya hay palabra)
//   const keyboardStatus = wordOfTheDay
//     ? getKeyboardStatus(attempts, wordOfTheDay)
//     : new Map();

//   if (!wordOfTheDay) {
//     return <div className="app"><h2>Cargando palabra...</h2></div>;
//   }

//   return (
//     <div className="app">
//       <h1>Word Challenge</h1>
//       <Board
//         attempts={attempts}
//         currentInput={currentInput}
//         wordOfTheDay={wordOfTheDay}
//       />
//       <Keyboard onKeyPress={handleKeyPress} keyStatus={keyboardStatus} />
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import Board from './components/board';
import Keyboard from './components/keyboard';
import { getKeyboardStatus } from './utils/keyboardStatus';
import { fetchRandomWord } from './utils/fetchWord';
import './App.css';

const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;

const App: React.FC = () => {
  const [wordOfTheDay, setWordOfTheDay] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<'win' | 'lose' | null>(null);

  // 🟡 Cargar palabra desde la API
  useEffect(() => {
    const loadWord = async () => {
      const word = await fetchRandomWord(WORD_LENGTH);
      if (word) setWordOfTheDay(word);
      else alert('Error cargando la palabra. Intenta recargar la página.');
    };

    loadWord();
  }, []);

  const handleKeyPress = (key: string) => {
    if (!wordOfTheDay || gameOver) return;

    if (key === 'ENTER') {
      if (currentInput.length === wordOfTheDay.length) {
        const guess = currentInput.toUpperCase();
        const newAttempts = [...attempts, guess];
        setAttempts(newAttempts);
        setCurrentInput('');

        if (guess === wordOfTheDay) {
          setGameOver(true);
          setGameResult('win');
        } else if (newAttempts.length >= MAX_ATTEMPTS) {
          setGameOver(true);
          setGameResult('lose');
        }
      }
    } else if (key === 'BACKSPACE') {
      setCurrentInput((prev) => prev.slice(0, -1));
    } else if (/^[A-Z]$/.test(key)) {
      if (currentInput.length < wordOfTheDay.length) {
        setCurrentInput((prev) => prev + key);
      }
    }
  };

  // const resetGame = async () => {
  //   setAttempts([]);
  //   setCurrentInput('');
  //   setGameOver(false);
  //   setGameResult(null);
  //   const newWord = await fetchRandomWord(WORD_LENGTH);
  //   if (newWord) setWordOfTheDay(newWord);
  // };

  // 🧠 Escuchar teclado físico
  
  const resetGame = async () => {
    setWordOfTheDay(null); // fuerza estado de carga
    setAttempts([]);
    setCurrentInput('');
    setGameOver(false);
    setGameResult(null);
  
    let newWord: string | null = null;
    do {
      newWord = await fetchRandomWord(WORD_LENGTH);
    } while (newWord === wordOfTheDay);
  
    if (newWord) setWordOfTheDay(newWord);
  };
  
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (key === 'ENTER' || key === 'BACKSPACE' || /^[A-Z]$/.test(key)) {
        handleKeyPress(key);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentInput, attempts, wordOfTheDay, gameOver]);

  const keyboardStatus = wordOfTheDay
    ? getKeyboardStatus(attempts, wordOfTheDay)
    : new Map();

  if (!wordOfTheDay) {
    return <div className="app"><h2>Cargando palabra...</h2></div>;
  }

  return (
    <div className="app">
      <h1>Word Challenge</h1>
      <Board
        attempts={attempts}
        currentInput={currentInput}
        wordOfTheDay={wordOfTheDay}
      />
      <Keyboard onKeyPress={handleKeyPress} keyStatus={keyboardStatus} />

      {gameOver && (
        <div className="end-message">
          {gameResult === 'win' ? (
            <p>🎉 ¡Ganaste!</p>
          ) : (
            <p>😢 Te quedaste sin intentos. La palabra era: <strong>{wordOfTheDay}</strong></p>
          )}
          <button onClick={resetGame}>🔁 Jugar de nuevo</button>
        </div>
      )}
    </div>
  );
};

export default App;
