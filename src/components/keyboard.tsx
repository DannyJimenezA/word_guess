// import React from 'react';

// interface KeyboardProps {
//   onKeyPress: (key: string) => void;
// }

// const KEYS: string[][] = [
//   ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
//   ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
//   ['ENTER', 'W', 'X', 'C', 'V', 'B', 'N', 'BACKSPACE'],
// ];

// const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress }) => {
//   return (
//     <div className="keyboard">
//       {KEYS.map((row, rowIndex) => (
//         <div key={rowIndex} className="keyboard-row">
//           {row.map((key) => (
//             <button
//               key={key}
//               onClick={() => onKeyPress(key)}
//               className="keyboard-key"
//             >
//               {key}
//             </button>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Keyboard;

import React from 'react';
import type { LetterStatus } from '../utils/keyboardStatus';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  keyStatus: Map<string, LetterStatus>;
}

const KEYS: string[][] = [
  ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
  ['ENTER', 'W', 'X', 'C', 'V', 'B', 'N', 'BACKSPACE'],
];

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, keyStatus }) => {
  return (
    <div className="keyboard">
      {KEYS.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => {
            const status = keyStatus.get(key) || '';
            return (
              <button
                key={key}
                onClick={() => onKeyPress(key)}
                className={`keyboard-key ${status}`}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
