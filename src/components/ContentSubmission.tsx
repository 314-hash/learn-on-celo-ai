import { useState } from 'react';
import { useCelo } from '@celo/react-celo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Link, FileText, Mic } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HolographicCard from './HolographicCard';
import { useLearningData } from '@/hooks/useLearningData';

interface ContentSubmissionProps {
  onContentProcessed?: () => void;
}

const ContentSubmission = ({ onContentProcessed }: ContentSubmissionProps) => {
  const { address } = useCelo();
  const { submitContent } = useLearningData();
  const { toast } = useToast();
  const [contentUrl, setContentUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedType, setSelectedType] = useState<'youtube' | 'pdf' | 'blog' | 'podcast'>('youtube');

  const contentTypes = [
    { id: 'youtube', label: 'YouTube Video', icon: Link, placeholder: 'https://youtube.com/watch?v=...' },
    { id: 'pdf', label: 'PDF Document', icon: FileText, placeholder: 'Upload PDF file...' },
    { id: 'blog', label: 'Blog/Article', icon: FileText, placeholder: 'https://blog.example.com/article' },
    { id: 'podcast', label: 'Podcast', icon: Mic, placeholder: 'https://podcast.example.com/episode' },
  ];

  const handleSubmit = async () => {
    if (!address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first",
        variant: "destructive"
      });
      return;
    }
    
    if (!contentUrl.trim()) return;
    
    setIsProcessing(true);
    
    try {
      await submitContent(contentUrl.trim());
      toast({
        title: "Content submitted!",
        description: "Your content is being processed by AI. This may take a few minutes.",
      });
      
      // Clear form
      setContentUrl('');
      onContentProcessed?.();
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission failed",
        description: "Please try again. Make sure you have enough CELO for gas fees.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <HolographicCard className="max-w-2xl mx-auto" glowIntensity="high">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold hologram-text mb-2">Submit Learning Content</h2>
          <p className="text-cyan-300">Transform any content into bite-sized learning materials</p>
        </div>

        {/* Content Type Selector */}
        <div className="grid grid-cols-2 gap-3">
          {contentTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id as typeof selectedType)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedType === type.id
                    ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300'
                    : 'border-gray-600 bg-gray-800/20 text-gray-400 hover:border-cyan-500'
                }`}
              >
                <Icon className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-medium">{type.label}</div>
              </button>
            );
          })}
        </div>

        {/* Input Field */}
        <div className="space-y-4">
          <Input
            type="text"
            placeholder={contentTypes.find(t => t.id === selectedType)?.placeholder}
            value={contentUrl}
            onChange={(e) => setContentUrl(e.target.value)}
            className="bg-black/50 border-cyan-400/50 text-white placeholder-gray-400 text-lg py-6"
          />

          <Button
            onClick={handleSubmit}
            disabled={!contentUrl.trim() || isProcessing || !address}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-4 px-6 rounded-xl border-2 border-cyan-400 hover:border-purple-400 transition-all duration-300 text-lg"
          >
            {isProcessing ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting to Blockchain...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Submit for AI Processing
              </div>
            )}
          </Button>
        </div>

        {/* Processing Status */}
        {isProcessing && (
          <div className="space-y-4 p-4 bg-cyan-400/10 border border-cyan-400/30 rounded-xl">
            <div className="text-center">
              <div className="text-cyan-300 font-medium mb-2">Submitting to Celo blockchain...</div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full animate-pulse" style={{ width: '100%' }} />
              </div>
            </div>
            <div className="text-sm text-center text-gray-300">
              After blockchain confirmation, AI processing will begin automatically
            </div>
          </div>
        )}

        {!address && (
          <div className="p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-xl text-center">
            <p className="text-yellow-300">Please connect your wallet to submit content</p>
          </div>
        )}
      </div>
    </HolographicCard>
  );
};

export default ContentSubmission;