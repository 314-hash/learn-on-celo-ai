
import { useEffect, useState } from 'react';

const LaserCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);
      
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsMoving(false), 100);
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div 
      className="laser-cursor"
      style={{ 
        left: position.x, 
        top: position.y,
        transform: `scale(${isMoving ? 1.2 : 1})`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      <div className="laser-dot" />
      <div className="laser-rings" />
      <div className="laser-trail" />
      <div 
        className="laser-trail" 
        style={{ '--trail-rotation': '45deg' } as React.CSSProperties} 
      />
      <div 
        className="laser-trail" 
        style={{ '--trail-rotation': '90deg' } as React.CSSProperties} 
      />
      <div 
        className="laser-trail" 
        style={{ '--trail-rotation': '135deg' } as React.CSSProperties} 
      />
    </div>
  );
};

export default LaserCursor;
