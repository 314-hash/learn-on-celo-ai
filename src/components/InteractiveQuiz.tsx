import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import HolographicCard from './HolographicCard';
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

const sampleQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What makes Celo blockchain environmentally friendly?",
    options: [
      "It uses Proof of Work consensus",
      "It uses Proof of Stake consensus",
      "It doesn't use any consensus mechanism",
      "It only runs on solar power"
    ],
    correctAnswer: 1,
    explanation: "Celo uses Proof of Stake consensus which requires significantly less energy than Proof of Work."
  },
  {
    id: 2,
    question: "What is the primary purpose of smart contracts?",
    options: [
      "To store cryptocurrency",
      "To automatically execute agreements when conditions are met",
      "To mine new tokens",
      "To create user interfaces"
    ],
    correctAnswer: 1,
    explanation: "Smart contracts automatically execute predefined actions when specific conditions are met, eliminating the need for intermediaries."
  },
  {
    id: 3,
    question: "In DeFi, what does 'liquidity' refer to?",
    options: [
      "The speed of transactions",
      "The ease of converting assets to cash",
      "The number of users on a platform",
      "The security of a protocol"
    ],
    correctAnswer: 1,
    explanation: "Liquidity refers to how easily an asset can be converted to cash or other assets without significantly affecting its price."
  },
  {
    id: 4,
    question: "What is a key benefit of decentralized applications (dApps)?",
    options: [
      "They are faster than traditional apps",
      "They cannot be censored or shut down by a single authority",
      "They are always free to use",
      "They don't require internet connection"
    ],
    correctAnswer: 1,
    explanation: "dApps run on decentralized networks, making them resistant to censorship and single points of failure."
  },
  {
    id: 5,
    question: "What is the role of gas fees in blockchain transactions?",
    options: [
      "To purchase cryptocurrency",
      "To incentivize validators and prevent spam",
      "To store data permanently",
      "To create new smart contracts"
    ],
    correctAnswer: 1,
    explanation: "Gas fees compensate network validators for processing transactions and help prevent spam by making it costly to flood the network."
  }
];

const InteractiveQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const progress = ((currentQuestion + (showAnswer ? 1 : 0)) / sampleQuestions.length) * 100;
  const currentQ = sampleQuestions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correctAnswer;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showAnswer) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    
    setTimeout(() => {
      setShowAnswer(true);
      if (answerIndex === currentQ.correctAnswer) {
        setScore(prev => prev + 1);
      }
    }, 300);
  };

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowAnswer(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowAnswer(false);
    setQuizCompleted(false);
    setScore(0);
  };

  const getScoreColor = () => {
    const percentage = (score / sampleQuestions.length) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (quizCompleted) {
    const percentage = Math.round((score / sampleQuestions.length) * 100);
    
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold hologram-text">Quiz Complete!</h2>
          <Progress value={100} className="h-2" />
        </div>

        <HolographicCard className="text-center space-y-6 p-8" glowIntensity="high">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto" />
          <h3 className="text-3xl font-bold hologram-text">Your Score</h3>
          <div className={`text-6xl font-bold ${getScoreColor()}`}>
            {score}/{sampleQuestions.length}
          </div>
          <div className={`text-2xl ${getScoreColor()}`}>
            {percentage}% Correct
          </div>
          
          {percentage >= 80 && (
            <p className="text-green-400 text-lg">🎉 Excellent work! You've mastered the material!</p>
          )}
          {percentage >= 60 && percentage < 80 && (
            <p className="text-yellow-400 text-lg">👍 Good job! Review the concepts and try again.</p>
          )}
          {percentage < 60 && (
            <p className="text-red-400 text-lg">📚 Keep studying! You'll get it next time.</p>
          )}

          <Button 
            onClick={resetQuiz}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-lg px-8 py-3"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Retake Quiz
          </Button>
        </HolographicCard>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold hologram-text">Interactive Quiz</h2>
        <p className="text-cyan-300">Test your knowledge with these questions</p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Question {currentQuestion + 1} of {sampleQuestions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <HolographicCard className="space-y-6 p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
          {currentQ.question}
        </h3>

        <div className="space-y-3">
          {currentQ.options.map((option, index) => {
            let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ";
            
            if (!showAnswer) {
              buttonClass += selectedAnswer === index 
                ? "border-cyan-400 bg-cyan-400/20 text-cyan-300" 
                : "border-gray-600 hover:border-gray-500 text-gray-300 hover:bg-gray-800/50";
            } else {
              if (index === currentQ.correctAnswer) {
                buttonClass += "border-green-400 bg-green-400/20 text-green-300";
              } else if (selectedAnswer === index && selectedAnswer !== currentQ.correctAnswer) {
                buttonClass += "border-red-400 bg-red-400/20 text-red-300";
              } else {
                buttonClass += "border-gray-600 text-gray-400";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showAnswer}
                className={buttonClass}
              >
                <div className="flex items-center justify-between">
                  <span className="flex-1">{option}</span>
                  {showAnswer && index === currentQ.correctAnswer && (
                    <CheckCircle className="w-5 h-5 text-green-400 ml-2" />
                  )}
                  {showAnswer && selectedAnswer === index && selectedAnswer !== currentQ.correctAnswer && (
                    <XCircle className="w-5 h-5 text-red-400 ml-2" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {showAnswer && (
          <div className={`p-4 rounded-lg border-l-4 ${isCorrect ? 'border-green-400 bg-green-400/10' : 'border-red-400 bg-red-400/10'}`}>
            <div className={`font-semibold mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
            </div>
            {currentQ.explanation && (
              <p className="text-gray-300 text-sm">{currentQ.explanation}</p>
            )}
          </div>
        )}

        {showAnswer && (
          <Button 
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-lg py-3"
          >
            {currentQuestion < sampleQuestions.length - 1 ? 'Next Question' : 'View Results'}
          </Button>
        )}
      </HolographicCard>
    </div>
  );
};

export default InteractiveQuiz;