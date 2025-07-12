
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
  glowIntensity?: 'low' | 'medium' | 'high';
  onClick?: () => void;
}

const HolographicCard = ({ children, className, glowIntensity = 'medium', onClick }: HolographicCardProps) => {
  const glowClasses = {
    low: 'shadow-[0_0_20px_rgba(0,255,255,0.3)]',
    medium: 'shadow-[0_0_30px_rgba(0,255,255,0.5)]',
    high: 'shadow-[0_0_50px_rgba(0,255,255,0.8)]'
  };

  return (
    <div 
      className={cn(
        'glass-morphism neon-border rounded-xl p-6 transform hover:scale-105 transition-all duration-300',
        glowClasses[glowIntensity],
        'hover:shadow-[0_0_60px_rgba(0,255,255,0.6)]',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default HolographicCard;
