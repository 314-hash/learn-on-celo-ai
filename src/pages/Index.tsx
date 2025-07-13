import { useState } from 'react';
import { useCelo } from '@celo/react-celo';
import ConnectWallet from '@/components/ConnectWallet';
import ContentSubmission from '@/components/ContentSubmission';
import LearningInterface from '@/components/LearningInterface';
import LaserCursor from '@/components/LaserCursor';
import MatrixRain from '@/components/MatrixRain';
import FloatingParticles from '@/components/FloatingParticles';
import HolographicCard from '@/components/HolographicCard';
import { useLearningData } from '@/hooks/useLearningData';
import { Brain, Zap, Shield, Users, BookOpen, Clock, CheckCircle, Sparkles, Headphones } from 'lucide-react';

const Index = () => {
  const { address } = useCelo();
  const { items: learningItems, loading: itemsLoading } = useLearningData();
  const [currentView, setCurrentView] = useState<'landing' | 'learning'>('landing');
  const [selectedContent, setSelectedContent] = useState<string | null>(null);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Transform any content into bite-sized summaries using advanced AI'
    },
    {
      icon: Sparkles,
      title: 'Smart Flashcards',
      description: 'Auto-generated Anki-style flashcards for effective memorization'
    },
    {
      icon: BookOpen,
      title: 'Interactive Quizzes',
      description: '5-question quizzes to test your understanding and retention'
    },
    {
      icon: Headphones,
      title: 'Audio Learning',
      description: 'Text-to-speech conversion for learning on the go'
    },
    {
      icon: Shield,
      title: 'Blockchain Verified',
      description: 'All learning progress stored securely on Celo blockchain'
    },
    {
      icon: Zap,
      title: 'Learn-to-Earn',
      description: 'Earn tokens and NFT badges for completing learning milestones'
    }
  ];

  if (currentView === 'learning') {
    return <LearningInterface onBack={() => setCurrentView('landing')} contentTitle={selectedContent || "Blockchain Fundamentals"} />;
  }

  return (
    <div className="min-h-screen relative">
      {/* Background */}
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
      
      {/* Effects */}
      <LaserCursor />
      <MatrixRain />
      <FloatingParticles />
      
      {/* Content */}
      <div className="relative z-20 min-h-screen">
        {/* Hero Section */}
        <div className="min-h-screen flex items-center justify-center p-8">
          {/* Main Content */}
          <div className="max-w-6xl mx-auto space-y-16">
            {/* Hero Section */}
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold hologram-text">
                  AutoLearner AI
                </h1>
                <p className="text-xl md:text-2xl text-cyan-300 max-w-3xl mx-auto">
                  Transform any content into personalized learning experiences powered by AI and secured on Celo blockchain
                </p>
              </div>

              <ConnectWallet />
            </div>

            {/* User Dashboard - Show when wallet is connected */}
            {address && (
              <>
                {/* Learning Content Grid */}
                {learningItems.length > 0 && (
                  <HolographicCard className="space-y-6">
                    <h2 className="text-2xl font-bold hologram-text text-center">Your Learning Library</h2>
                    <div className="grid gap-4 md:gap-6">
                      {learningItems.map((item) => (
                        <div 
                          key={item.id}
                          className="p-4 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-cyan-400/30 hover:border-cyan-400 transition-all cursor-pointer"
                          onClick={() => {
                            if (item.processed) {
                              setSelectedContent(item.sourceURI);
                              setCurrentView('learning');
                            }
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <BookOpen className="w-5 h-5 text-cyan-400" />
                              <div>
                                <p className="font-medium text-white truncate max-w-md">
                                  {item.sourceURI}
                                </p>
                                <p className="text-xs text-gray-400">
                                  <Clock className="w-3 h-3 inline mr-1" />
                                  {new Date(item.timestamp * 1000).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {item.processed ? (
                                <div className="flex items-center gap-1 text-green-400">
                                  <CheckCircle className="w-4 h-4" />
                                  <span className="text-xs">Ready</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1 text-yellow-400">
                                  <div className="w-3 h-3 border border-yellow-400 border-t-transparent rounded-full animate-spin" />
                                  <span className="text-xs">Processing</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </HolographicCard>
                )}

                {/* Content Submission */}
                <ContentSubmission onContentProcessed={() => {
                  console.log('Content submitted to blockchain');
                  // Items will be automatically reloaded by the hook
                }} />
              </>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold hologram-text mb-6">Revolutionary Features</h2>
              <p className="text-xl text-cyan-300">Experience the future of personalized learning</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <HolographicCard key={index} className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-cyan-300">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </HolographicCard>
                );
              })}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="py-20 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold hologram-text mb-16">How It Works</h2>
            
            <div className="space-y-12">
              {[
                { step: '01', title: 'Connect Wallet', desc: 'Link your Celo wallet to access the platform' },
                { step: '02', title: 'Submit Content', desc: 'Upload videos, PDFs, blogs, or podcasts for processing' },
                { step: '03', title: 'AI Processing', desc: 'Our AI creates summaries, flashcards, quizzes, and audio' },
                { step: '04', title: 'Learn & Earn', desc: 'Study with your materials and earn tokens for progress' }
              ].map((item, index) => (
                <HolographicCard key={index} className="flex items-center gap-8">
                  <div className="text-6xl font-bold hologram-text">{item.step}</div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-cyan-300 mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-lg">{item.desc}</p>
                  </div>
                </HolographicCard>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 px-8">
          <HolographicCard className="max-w-2xl mx-auto text-center space-y-8" glowIntensity="high">
            <h2 className="text-4xl font-bold hologram-text">Ready to Start Learning?</h2>
            <p className="text-xl text-cyan-300">Join the future of AI-powered education on the blockchain</p>
            <div className="text-lg text-gray-400">
              Powered by <span className="text-yellow-400 font-semibold">Celo Blockchain</span>
            </div>
          </HolographicCard>
        </div>
      </div>
    </div>
  );
};

export default Index;