import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FlashcardGrid from './FlashcardGrid';
import InteractiveQuiz from './InteractiveQuiz';
import AudioPlayer from './AudioPlayer';
import HolographicCard from './HolographicCard';
import { Brain, HelpCircle, Volume2, ArrowLeft } from 'lucide-react';

interface LearningInterfaceProps {
  onBack?: () => void;
  contentTitle?: string;
}

const LearningInterface = ({ 
  onBack, 
  contentTitle = "Blockchain Fundamentals" 
}: LearningInterfaceProps) => {
  const [activeTab, setActiveTab] = useState("flashcards");

  return (
    <div className="min-h-screen relative">
      {/* Background Effects - keeping same as main app */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(/lovable-uploads/fbebb6b6-d73a-4fe3-9d67-49a94b2edbd7.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="fixed inset-0 bg-black/70 z-1" />
      <div className="fixed inset-0 cyber-grid-bg z-2" />

      {/* Content */}
      <div className="relative z-20 min-h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            {onBack && (
              <Button
                onClick={onBack}
                variant="outline"
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            )}
            
            <div className="text-center flex-1">
              <h1 className="text-3xl md:text-4xl font-bold hologram-text">
                Learning Center
              </h1>
              <p className="text-cyan-300 mt-2">
                Studying: <span className="text-white font-medium">{contentTitle}</span>
              </p>
            </div>

            <div className="w-32"> {/* Spacer for balance */}</div>
          </div>

          {/* Navigation Tabs */}
          <HolographicCard className="p-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-transparent h-auto p-1">
                <TabsTrigger 
                  value="flashcards" 
                  className="flex items-center space-x-2 py-3 px-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-cyan-300 text-gray-400"
                >
                  <Brain className="w-4 h-4" />
                  <span className="hidden sm:inline">Flashcards</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="quiz" 
                  className="flex items-center space-x-2 py-3 px-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-cyan-300 text-gray-400"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Quiz</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="audio" 
                  className="flex items-center space-x-2 py-3 px-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-cyan-300 text-gray-400"
                >
                  <Volume2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Audio</span>
                </TabsTrigger>
              </TabsList>

              <div className="mt-8">
                <TabsContent value="flashcards" className="space-y-6 mt-0">
                  <FlashcardGrid />
                </TabsContent>

                <TabsContent value="quiz" className="space-y-6 mt-0">
                  <InteractiveQuiz />
                </TabsContent>

                <TabsContent value="audio" className="space-y-6 mt-0">
                  <AudioPlayer 
                    title={`${contentTitle} - AI Summary`}
                    ipfsCid="QmBlockchainLearningContentCID"
                  />
                </TabsContent>
              </div>
            </Tabs>
          </HolographicCard>

          {/* Footer Info */}
          <HolographicCard className="text-center p-6 opacity-80">
            <p className="text-sm text-gray-400">
              🔗 <span className="text-cyan-400">Powered by Celo Blockchain</span> • 
              🤖 <span className="text-purple-400">AI-Generated Content</span> • 
              📚 <span className="text-yellow-400">Learn-to-Earn Ready</span>
            </p>
          </HolographicCard>
        </div>
      </div>
    </div>
  );
};

export default LearningInterface;
