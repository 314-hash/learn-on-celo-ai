import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import HolographicCard from './HolographicCard';
import { Play, Pause, Volume2, Download, ExternalLink } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl?: string;
  title?: string;
  ipfsCid?: string;
}

const AudioPlayer = ({ 
  audioUrl = "/api/placeholder-audio", 
  title = "AI-Generated Summary",
  ipfsCid = "QmXxxxxYourIPFSCIDHere"
}: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedData = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
    };
  }, [audioUrl]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    
    const newTime = (value[0] / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newVolume = value[0] / 100;
    audio.volume = newVolume;
    setVolume(newVolume);
  };

  const formatTime = (time: number) => {
    if (!isFinite(time)) return "0:00";
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold hologram-text">Audio Learning</h2>
        <p className="text-cyan-300">Listen to your AI-generated summary</p>
      </div>

      {/* Desktop Player */}
      <div className="hidden md:block">
        <HolographicCard className="space-y-6 p-6 md:p-8">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-sm text-gray-400">Duration: {formatTime(duration)}</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <Progress value={progressPercentage} className="h-2 cursor-pointer" />
            </div>

            <div className="flex items-center justify-center space-x-6">
              <Button
                onClick={togglePlayPause}
                disabled={isLoading}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" />
                )}
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <Volume2 className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <Progress value={volume * 100} className="h-2" />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="outline" 
              className="flex-1 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Audio
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-purple-400 text-purple-400 hover:bg-purple-400/10"
              onClick={() => window.open(`https://ipfs.io/ipfs/${ipfsCid}`, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View on IPFS
            </Button>
          </div>
        </HolographicCard>
      </div>

      {/* Mobile Player - Fixed at Bottom */}
      <div className="md:hidden">
        <HolographicCard className="space-y-4 p-4 mb-20">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="text-xs text-gray-400">Duration: {formatTime(duration)}</p>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <Progress value={progressPercentage} className="h-1" />
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 text-xs"
            >
              <Download className="w-3 h-3 mr-1" />
              Download
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1 border-purple-400 text-purple-400 hover:bg-purple-400/10 text-xs"
              onClick={() => window.open(`https://ipfs.io/ipfs/${ipfsCid}`, '_blank')}
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              IPFS
            </Button>
          </div>
        </HolographicCard>

        {/* Fixed Mobile Controls */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-cyan-400/30 p-4 z-50">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex-1">
              <div className="text-sm font-medium text-white truncate">{title}</div>
              <div className="text-xs text-gray-400">{formatTime(currentTime)} / {formatTime(duration)}</div>
            </div>
            
            <Button
              onClick={togglePlayPause}
              disabled={isLoading}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 ml-4"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
        className="hidden"
      />
    </div>
  );
};

export default AudioPlayer;