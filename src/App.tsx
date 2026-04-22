/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Terminal, Shield, Cpu, Activity } from 'lucide-react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="relative min-h-screen bg-void-black text-neon-cyan selection:bg-neon-magenta selection:text-white overflow-hidden flex flex-col">
      {/* Visual Artifacts */}
      <div className="scanlines" />
      <div className="crt-vignette" />
      <div className="static-noise" />

      {/* Header Rail */}
      <header className="h-12 border-b border-neon-cyan/30 flex items-center justify-between px-6 z-10 bg-void-black/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Terminal size={16} className="animate-pulse" />
          <h1 className="text-sm font-bold tracking-[0.4em] uppercase" data-text="NEON_VOID">
            NEON_VOID <span className="opacity-40 font-pixel text-[10px] ml-2">v4.0.2</span>
          </h1>
        </div>
        <div className="flex items-center gap-6 text-[10px] uppercase font-pixel tracking-widest opacity-60">
            <div className="flex items-center gap-1"><Shield size={10} /> Secure</div>
            <div className="flex items-center gap-1 text-neon-green"><Activity size={10} /> Online</div>
            <div className="hidden md:flex items-center gap-1"><Cpu size={10} /> LLM Core</div>
        </div>
      </header>

      {/* Main Grid Interface */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-0 z-10 overflow-hidden">
        
        {/* Left Sidebar: Manifest Info */}
        <aside className="hidden lg:flex flex-col border-r border-neon-cyan/20 p-6 gap-8 overflow-y-auto bg-void-black/40">
          <section className="flex flex-col gap-4">
             <h2 className="text-[10px] text-neon-magenta uppercase font-bold tracking-[0.3em] border-b border-neon-magenta/30 pb-2">
                Operational_Node
             </h2>
             <p className="text-xs opacity-70 leading-relaxed font-pixel">
                Welcome to the SYNTH-SNAKE protocol. User identity verified. Audio frequencies synchronized. 
                Move through the grid to bypass firewall segments. Avoid collision with self-contained logic loops.
             </p>
          </section>

          <section className="flex flex-col gap-2">
             <h2 className="text-[10px] text-neon-magenta uppercase font-bold tracking-[0.3em] border-b border-neon-magenta/30 pb-2">
                System_Diagnostics
             </h2>
             {[
               { label: 'Latency', val: '4ms', color: 'text-neon-cyan' },
               { label: 'Cores', val: '128x', color: 'text-neon-cyan' },
               { label: 'Uptime', val: '00:44:22', color: 'text-neon-cyan' },
               { label: 'Threats', val: 'ZERO', color: 'text-neon-green' },
             ].map((stat, i) => (
                <div key={i} className="flex justify-between text-[11px]">
                  <span className="opacity-40 uppercase">{stat.label}:</span>
                  <span className={stat.color}>{stat.val}</span>
                </div>
             ))}
          </section>

          <div className="mt-auto h-32 w-full neon-border overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-neon-cyan/20 to-transparent" />
            <div className="flex flex-col gap-1 p-2">
               {Array.from({ length: 8 }).map((_, i) => (
                 <div 
                   key={i} 
                   className="h-1 bg-neon-cyan/50" 
                   style={{ 
                     width: `${Math.random() * 80 + 20}%`,
                     opacity: Math.random() * 0.5 + 0.1,
                     animation: `flicker ${Math.random() * 2 + 0.5}s infinite`
                   }} 
                 />
               ))}
            </div>
            <span className="absolute bottom-2 left-2 text-[8px] opacity-30">ENCRYPTION_STREAM</span>
          </div>
        </aside>

        {/* Center: The Game Void */}
        <section className="flex flex-col items-center justify-center p-6 bg-gradient-radial from-neon-cyan/5 to-transparent">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-2"
          >
            <h2 className="glitch-text text-6xl md:text-8xl lg:text-9xl font-pixel tracking-tighter mb-12 text-neon-cyan" data-text="SYNTH_SNAKE">
              SYNTH_SNAKE
            </h2>
            <SnakeGame />
          </motion.div>
        </section>

        {/* Right Sidebar: Audio & Comms */}
        <aside className="flex flex-col border-l border-neon-cyan/20 p-6 gap-8 bg-void-black/40 overflow-y-auto">
          <section className="flex flex-col gap-4">
            <h2 className="text-[10px] text-neon-magenta uppercase font-bold tracking-[0.3em] border-b border-neon-magenta/30 pb-2">
              Audio_Frequency
            </h2>
            <MusicPlayer />
          </section>

          <section className="flex flex-col gap-4">
             <h2 className="text-[10px] text-neon-magenta uppercase font-bold tracking-[0.3em] border-b border-neon-magenta/30 pb-2">
               Comms_Relay
             </h2>
             <div className="flex flex-col gap-3">
                {[
                  { from: 'SYS', msg: 'Frequency sync stable.', time: '12:01' },
                  { from: 'VOID', msg: 'Data hunger detected.', time: '12:03' },
                  { from: 'CORE', msg: 'Re-routing neural paths...', time: '12:04' },
                ].map((msg, i) => (
                  <div key={i} className="flex flex-col gap-1 border-l border-white/10 pl-3">
                    <div className="flex justify-between text-[8px] opacity-40">
                       <span className="text-neon-cyan font-bold">{msg.from}</span>
                       <span>{msg.time}</span>
                    </div>
                    <p className="text-[10px] font-pixel italic opacity-80">{msg.msg}</p>
                  </div>
                ))}
             </div>
          </section>

          <div className="mt-auto flex justify-center">
             <div className="w-16 h-16 border-2 border-dotted border-neon-cyan/20 rounded-full animate-spin-slow flex items-center justify-center">
                <div className="w-8 h-8 bg-neon-cyan/10 rounded-full animate-pulse" />
             </div>
          </div>
        </aside>
      </main>

      {/* Footer Status Bar */}
      <footer className="h-8 border-t border-neon-cyan/30 flex items-center justify-between px-4 text-[9px] font-mono z-10 bg-void-black/90 uppercase tracking-widest">
        <div className="flex gap-4">
          <span>COORDS: X_77 Y_02</span>
          <span>MODE: SURVIVAL</span>
        </div>
        <div className="flex gap-4">
          <span className="text-neon-magenta animate-pulse">WARNING: LOW_BANDWIDTH</span>
          <span>© 20XX VOID_ENGINEERING</span>
        </div>
      </footer>
    </div>
  );
}
