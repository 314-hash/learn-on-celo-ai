
import { useEffect, useState } from 'react';

const MatrixRain = () => {
  const [characters, setCharacters] = useState<Array<{
    id: number;
    char: string;
    left: number;
    animationDelay: number;
    animationDuration: number;
  }>>([]);

  useEffect(() => {
    const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const newCharacters = [];

    for (let i = 0; i < 50; i++) {
      newCharacters.push({
        id: i,
        char: matrixChars[Math.floor(Math.random() * matrixChars.length)],
        left: Math.random() * 100,
        animationDelay: Math.random() * 5,
        animationDuration: 2 + Math.random() * 3,
      });
    }

    setCharacters(newCharacters);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {characters.map((char) => (
        <div
          key={char.id}
          className="matrix-char"
          style={{
            left: `${char.left}%`,
            animationDelay: `${char.animationDelay}s`,
            animationDuration: `${char.animationDuration}s`,
          }}
        >
          {char.char}
        </div>
      ))}
    </div>
  );
};

export default MatrixRain;
