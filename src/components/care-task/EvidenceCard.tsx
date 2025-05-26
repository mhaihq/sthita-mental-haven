
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Check, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface EvidenceCardProps {
  evidence: {
    text: string;
    timestamp: string;
    importance: string;
    audioUrl?: string;
    duration?: number;
  };
  onSaveToLog: () => void;
  onReject: () => void;
  status: 'pending' | 'saved' | 'rejected';
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({
  evidence,
  onSaveToLog,
  onReject,
  status
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(evidence.duration || 25); // Default 25 seconds
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
    const barWidth = 2;
    const barCount = Math.floor(width / (barWidth + 1));

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#e5e7eb'; // Gray color for background bars

    // Generate random waveform pattern
    for (let i = 0; i < barCount; i++) {
      const barHeight = Math.random() * height * 0.8 + height * 0.1;
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
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
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

  const getStatusColor = () => {
    switch (status) {
      case 'saved': return 'bg-green-50 border-green-200';
      case 'rejected': return 'bg-red-50 border-red-200';
      default: return 'bg-white border-gray-200';
    }
  };

  return (
    <Card className={`${getStatusColor()} transition-colors`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="shrink-0">
              {evidence.timestamp}
            </Badge>
            <Badge 
              className={`text-xs ${
                evidence.importance === 'high' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {evidence.importance} priority
            </Badge>
          </div>
          
          {status !== 'pending' && (
            <div className="flex items-center gap-1">
              {status === 'saved' ? (
                <>
                  <Check size={16} className="text-green-600" />
                  <span className="text-sm text-green-600 font-medium">Saved</span>
                </>
              ) : (
                <>
                  <X size={16} className="text-red-600" />
                  <span className="text-sm text-red-600 font-medium">Rejected</span>
                </>
              )}
            </div>
          )}
        </div>

        <div className="mb-4">
          <p className="text-gray-700 italic">"{evidence.text}"</p>
        </div>

        {/* Audio Player Section */}
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <div className="flex items-center gap-3 mb-3">
            <Button
              variant="outline"
              size="sm"
              onClick={togglePlayPause}
              className="shrink-0"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </Button>
            
            <div className="flex-1">
              <canvas
                ref={canvasRef}
                width={300}
                height={60}
                className="w-full h-15 cursor-pointer border rounded"
                onClick={handleSeek}
              />
            </div>
            
            <div className="text-sm text-gray-600 font-mono shrink-0">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          
          <Progress value={(currentTime / duration) * 100} className="h-1" />
          
          {/* Hidden audio element - in production this would be the actual audio file */}
          <audio
            ref={audioRef}
            src={evidence.audioUrl || '#'} // Placeholder - would be real audio URL
            preload="metadata"
            style={{ display: 'none' }}
          />
        </div>

        {/* Action Buttons */}
        {status === 'pending' && (
          <div className="flex gap-2">
            <Button
              onClick={onSaveToLog}
              className="flex-1 bg-green-600 hover:bg-green-700"
              size="sm"
            >
              <Check size={14} className="mr-1" />
              Save to Log
            </Button>
            <Button
              onClick={onReject}
              variant="outline"
              className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
              size="sm"
            >
              <X size={14} className="mr-1" />
              Reject
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
