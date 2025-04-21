import React from 'react';
import type { LetterStatus } from '../utils/keyboardStatus';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  keyStatus: Map<string, LetterStatus>;
}

const KEYS: string[][] = [
  ['Q', 'w', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N','M', 'BACKSPACE'],
];

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, keyStatus }) => {
  return (
    <div className="keyboard">
      {KEYS.map((row, rowIndex) => (
        <div key={rowIndex} className={`keyboard-row row-${rowIndex + 1}`}>
          {row.map((key) => {
            const status = keyStatus.get(key) || '';
            return (
              <button
                key={key}
                className={`keyboard-key ${status} ${key === 'ENTER' || key === 'BACKSPACE' ? 'wide-key' : ''}`}
                onClick={() => onKeyPress(key)}
              >
                {key === 'BACKSPACE' ? '⌫' : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
