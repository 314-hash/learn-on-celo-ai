
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Brain, Zap, Shield, Sparkles, BookOpen, Headphones } from 'lucide-react';
import LaserCursor from '@/components/LaserCursor';
import MatrixRain from '@/components/MatrixRain';
import FloatingParticles from '@/components/FloatingParticles';
import HolographicCard from '@/components/HolographicCard';
import ConnectWallet from '@/components/ConnectWallet';
import ContentSubmission from '@/components/ContentSubmission';

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'connect' | 'dashboard'>('landing');

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

  if (currentView === 'connect') {
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
        <div className="relative z-20 min-h-screen flex items-center justify-center p-8">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <Button
              onClick={() => setCurrentView('landing')}
              className="mb-8 bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
            >
              ← Back to Home
            </Button>
            <ConnectWallet />
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'dashboard') {
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
        <div className="relative z-20 min-h-screen flex items-center justify-center p-8">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
              <Button
                onClick={() => setCurrentView('landing')}
                className="mb-8 bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
              >
                ← Back to Home
              </Button>
              <h1 className="text-5xl font-bold hologram-text mb-4">Learning Dashboard</h1>
              <p className="text-xl text-cyan-300">Submit content and let AI create your personalized learning materials</p>
            </div>
            <ContentSubmission />
          </div>
        </div>
      </div>
    );
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
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-6">
              <h1 className="text-7xl font-bold hologram-text leading-tight">
                AutoLearner AI
              </h1>
              <p className="text-2xl text-cyan-300 max-w-2xl mx-auto">
                Transform any content into personalized learning materials using AI and blockchain technology
              </p>
              <div className="text-lg text-gray-400">
                Powered by <span className="text-yellow-400 font-semibold">Celo Blockchain</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                onClick={() => setCurrentView('connect')}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-4 px-8 rounded-xl border-2 border-cyan-400 hover:border-purple-400 transition-all duration-300 text-lg transform hover:scale-105"
              >
                Connect Wallet
              </Button>
              <Button
                onClick={() => setCurrentView('dashboard')}
                className="bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 font-semibold py-4 px-8 rounded-xl transition-all duration-300 text-lg transform hover:scale-105"
              >
                Try Demo
              </Button>
            </div>
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
            <Button
              onClick={() => setCurrentView('connect')}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-4 px-12 rounded-xl border-2 border-cyan-400 hover:border-purple-400 transition-all duration-300 text-xl transform hover:scale-105"
            >
              Get Started Now
            </Button>
          </HolographicCard>
        </div>
      </div>
    </div>
  );
};

export default Index;
