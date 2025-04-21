import React, { useEffect, useState } from 'react';
import Board from './components/board';
import Keyboard from './components/keyboard';
import { getKeyboardStatus } from './utils/keyboardStatus';
import { fetchRandomWord } from './utils/fetchWord';
import './App.css';

const MAX_ATTEMPTS = 6;

const App: React.FC = () => {
  const [wordLength, setWordLength] = useState<number>(5);
  const [wordOfTheDay, setWordOfTheDay] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<'win' | 'lose' | null>(null);
  const [incompleteAttempt, setIncompleteAttempt] = useState<boolean>(false); // ⬅️ Nuevo estado

  const loadWord = async (length: number) => {
    const word = await fetchRandomWord(length);
    if (word) {
      setWordOfTheDay(word);
    } else {
      alert('Error al cargar la palabra.');
    }
  };

  useEffect(() => {
    loadWord(wordLength);
  }, [wordLength]);

  const handleWordLengthChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLength = parseInt(e.target.value, 10);
    setWordLength(newLength);
    setAttempts([]);
    setCurrentInput('');
    setGameOver(false);
    setGameResult(null);
    await loadWord(newLength);
  };

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
      } else {
        // ⛔ Si no está completa la palabra, mostrar advertencia
        setIncompleteAttempt(true);
        setTimeout(() => setIncompleteAttempt(false), 2000);
      }
    } else if (key === 'BACKSPACE') {
      setCurrentInput((prev) => prev.slice(0, -1));
    } else if (/^[A-ZÑ]$/.test(key)) {
      if (currentInput.length < wordOfTheDay.length) {
        setCurrentInput((prev) => prev + key);
      }
    }
  };

  const resetGame = async () => {
    setAttempts([]);
    setCurrentInput('');
    setGameOver(false);
    setGameResult(null);
    await loadWord(wordLength);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (key === 'ENTER' || key === 'BACKSPACE' || /^[A-ZÑ]$/.test(key)) {
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
      <h1>Adivina la Palabra</h1>

      <div className="selector">
        <label htmlFor="wordLength">Longitud:</label>
        <select
          id="wordLength"
          value={wordLength}
          onChange={handleWordLengthChange}
        >
          <option value={5}>5 Letras</option>
          <option value={6}>6 Letras</option>
          <option value={7}>7 Letras</option>
        </select>
      </div>

      <Board
        attempts={attempts}
        currentInput={currentInput}
        wordOfTheDay={wordOfTheDay}
      />

      <Keyboard onKeyPress={handleKeyPress} keyStatus={keyboardStatus} />

      {/* ⚠️ Alerta de intento incompleto */}
      {incompleteAttempt && (
        <div className="warning-message">
          ⚠️ Debes completar la palabra antes de enviarla.
        </div>
      )}

      {gameOver && (
        <div className="end-message">
          {gameResult === 'win' ? (
            <p>🎉 ¡Ganaste!</p>
          ) : (
            <p>😢 Te quedaste sin intentos. La palabra era: <strong>{wordOfTheDay}</strong></p>
          )}
          <button onClick={resetGame}>🔄 Jugar de nuevo</button>
        </div>
      )}
    </div>
  );
};

export default App;
