
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface AudioPlayerProps {
  audioUrl: string;
  duration: number;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, duration }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate mock waveform data for visualization
  const generateWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const barWidth = 3;
    const barCount = Math.floor(width / (barWidth + 1));

    ctx.clearRect(0, 0, width, height);

    // Generate random waveform pattern
    for (let i = 0; i < barCount; i++) {
      const barHeight = Math.random() * height * 0.7 + height * 0.1;
      const x = i * (barWidth + 1);
      const y = (height - barHeight) / 2;
      
      // Highlight played portion
      if ((i / barCount) * duration <= currentTime) {
        ctx.fillStyle = '#3b82f6'; // Blue for played portion
      } else {
        ctx.fillStyle = '#e5e7eb'; // Gray for unplayed portion
      }
      
      ctx.fillRect(x, y, barWidth, barHeight);
    }
  };

  useEffect(() => {
    generateWaveform();
  }, [currentTime, duration]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipTime = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSeek = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const audio = audioRef.current;
    if (!canvas || !audio) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / canvas.width;
    const newTime = percentage * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const changePlaybackSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setPlaybackSpeed(nextSpeed);
    
    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = nextSpeed;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => skipTime(-10)}
          >
            <SkipBack size={14} />
            10s
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={togglePlayPause}
            className="w-12"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => skipTime(10)}
          >
            <SkipForward size={14} />
            10s
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Volume2 size={16} className="text-gray-500" />
          <Button
            variant="outline"
            size="sm"
            onClick={changePlaybackSpeed}
          >
            {playbackSpeed}x
          </Button>
        </div>

        <div className="text-sm text-gray-600 font-mono ml-auto">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      <div className="space-y-2">
        <canvas
          ref={canvasRef}
          width={600}
          height={60}
          className="w-full h-15 cursor-pointer border rounded bg-gray-50"
          onClick={handleSeek}
        />
        
        <Progress value={(currentTime / duration) * 100} className="h-1" />
      </div>
      
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
        style={{ display: 'none' }}
      />
    </div>
  );
};
