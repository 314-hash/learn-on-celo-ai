import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import HolographicCard from './HolographicCard';
import { CheckCircle, RotateCcw, ArrowRight } from 'lucide-react';

interface Flashcard {
  id: number;
  front: string;
  back: string;
  learned: boolean;
}

const sampleFlashcards: Flashcard[] = [
  {
    id: 1,
    front: "What is blockchain consensus?",
    back: "A mechanism that ensures all network participants agree on the same version of the distributed ledger",
    learned: false
  },
  {
    id: 2,
    front: "Define Smart Contract",
    back: "Self-executing contracts with terms directly written into code, running on blockchain networks",
    learned: false
  },
  {
    id: 3,
    front: "What is DeFi?",
    back: "Decentralized Finance - financial services built on blockchain without traditional intermediaries",
    learned: false
  },
  {
    id: 4,
    front: "Explain Gas Fees",
    back: "Transaction fees paid to network validators for processing and confirming blockchain transactions",
    learned: false
  },
  {
    id: 5,
    front: "What is a Wallet?",
    back: "A digital tool that stores private keys and allows users to interact with blockchain networks",
    learned: false
  }
];

const FlashcardGrid = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(sampleFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  
  const currentCard = flashcards[currentIndex];
  const progress = ((flashcards.filter(card => card.learned).length) / flashcards.length) * 100;
  
  const handleFlip = (cardId: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };
  
  const markAsLearned = () => {
    setFlashcards(prev => 
      prev.map(card => 
        card.id === currentCard.id ? { ...card, learned: true } : card
      )
    );
    nextCard();
  };
  
  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setFlippedCards(new Set());
    }
  };
  
  const resetCards = () => {
    setFlashcards(prev => prev.map(card => ({ ...card, learned: false })));
    setCurrentIndex(0);
    setFlippedCards(new Set());
  };
  
  const isFlipped = flippedCards.has(currentCard?.id);
  const allLearned = flashcards.every(card => card.learned);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold hologram-text">Smart Flashcards</h2>
        <p className="text-cyan-300">Master key concepts with spaced repetition learning</p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Progress: {flashcards.filter(card => card.learned).length}/{flashcards.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {allLearned ? (
        <HolographicCard className="text-center space-y-6 p-8">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
          <h3 className="text-2xl font-bold text-cyan-300">All Flashcards Mastered!</h3>
          <p className="text-gray-400">Great job! You've learned all the concepts.</p>
          <Button 
            onClick={resetCards}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Study Again
          </Button>
        </HolographicCard>
      ) : (
        <>
          {/* Mobile: Single Card */}
          <div className="md:hidden">
            <HolographicCard 
              className="relative h-64 cursor-pointer perspective-1000"
              onClick={() => handleFlip(currentCard.id)}
            >
              <div className={`absolute inset-0 w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                <div className="absolute inset-0 w-full h-full backface-hidden flex items-center justify-center p-6">
                  <div className="text-center">
                    <div className="text-sm text-cyan-400 mb-2">Question {currentIndex + 1}</div>
                    <p className="text-lg font-medium text-white">{currentCard.front}</p>
                    <div className="text-xs text-gray-400 mt-4">Tap to reveal answer</div>
                  </div>
                </div>
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-6 bg-gradient-to-br from-purple-500/20 to-cyan-500/20">
                  <div className="text-center">
                    <div className="text-sm text-purple-400 mb-2">Answer</div>
                    <p className="text-lg text-white">{currentCard.back}</p>
                  </div>
                </div>
              </div>
            </HolographicCard>
            
            <div className="flex gap-4 mt-6">
              <Button 
                onClick={markAsLearned}
                disabled={!isFlipped}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark as Learned
              </Button>
              <Button 
                onClick={nextCard}
                disabled={currentIndex >= flashcards.length - 1}
                variant="outline"
                className="flex-1 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashcards.map((card) => {
              const isCardFlipped = flippedCards.has(card.id);
              return (
                <HolographicCard 
                  key={card.id}
                  className={`relative h-48 cursor-pointer perspective-1000 ${card.learned ? 'opacity-50' : ''}`}
                  onClick={() => handleFlip(card.id)}
                >
                  {card.learned && (
                    <CheckCircle className="absolute top-2 right-2 w-6 h-6 text-green-400 z-10" />
                  )}
                  <div className={`absolute inset-0 w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isCardFlipped ? 'rotate-y-180' : ''}`}>
                    <div className="absolute inset-0 w-full h-full backface-hidden flex items-center justify-center p-4">
                      <div className="text-center">
                        <div className="text-xs text-cyan-400 mb-2">Question {card.id}</div>
                        <p className="text-sm font-medium text-white">{card.front}</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-4 bg-gradient-to-br from-purple-500/20 to-cyan-500/20">
                      <div className="text-center">
                        <div className="text-xs text-purple-400 mb-2">Answer</div>
                        <p className="text-sm text-white">{card.back}</p>
                      </div>
                    </div>
                  </div>
                </HolographicCard>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default FlashcardGrid;