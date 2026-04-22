/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Play, Pause, SkipForward, SkipBack, Music2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { DUMMY_TRACKS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const skipBackward = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleEnded = () => {
      skipForward();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="w-full max-w-[300px] flex flex-col gap-4">
      <audio ref={audioRef} src={currentTrack.url} />
      
      <div className="neon-border-magenta p-4 bg-void-black/50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-1 opacity-20 group-hover:opacity-100 transition-opacity">
            <Music2 size={12} className="text-neon-magenta animate-spin-slow" />
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTrack.id}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="flex flex-col mb-4"
          >
            <span className="text-[10px] text-neon-magenta uppercase tracking-widest mb-1 opacity-60">Frequency Layer</span>
            <h3 className="glitch-text text-lg font-bold truncate" data-text={currentTrack.title}>
              {currentTrack.title}
            </h3>
            <span className="text-xs opacity-50 font-pixel uppercase">{currentTrack.artist}</span>
          </motion.div>
        </AnimatePresence>

        <div className="w-full h-1 bg-void-black border border-neon-magenta/30 mb-6 overflow-hidden relative">
          <motion.div 
            className="h-full bg-neon-magenta shadow-[0_0_10px_#ff00ff]"
            style={{ width: `${progress}%` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        </div>

        <div className="flex items-center justify-center gap-6">
          <button onClick={skipBackward} className="text-neon-cyan hover:text-white transition-colors">
            <SkipBack size={20} />
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-12 h-12 flex items-center justify-center border border-neon-magenta text-neon-magenta hover:bg-neon-magenta hover:text-black transition-all rounded-full shadow-[0_0_15px_rgba(255,0,255,0.3)]"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
          </button>

          <button onClick={skipForward} className="text-neon-cyan hover:text-white transition-colors">
            <SkipForward size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1 p-2 bg-neon-cyan/5 border-l-2 border-neon-cyan">
         <span className="text-[8px] opacity-40 uppercase tracking-tighter">System Console</span>
         <div className="text-[9px] font-pixel text-neon-cyan animate-pulse">
            BUFFERING_STREAM... OK
         </div>
      </div>
    </div>
  );
}
