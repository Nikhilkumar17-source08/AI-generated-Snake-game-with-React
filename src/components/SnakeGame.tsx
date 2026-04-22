/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { GRID_SIZE, INITIAL_DIRECTION, INITIAL_SNAKE, TICK_RATE } from '../constants';

interface Point {
  x: number;
  y: number;
}

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [nextDir, setNextDir] = useState<Point>(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Check if food spawned on snake
      if (!currentSnake.some(p => p.x === newFood.x && p.y === newFood.y)) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setNextDir(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setFood(generateFood(INITIAL_SNAKE));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction.y === 0) setNextDir({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (direction.y === 0) setNextDir({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (direction.x === 0) setNextDir({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (direction.x === 0) setNextDir({ x: 1, y: 0 }); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + nextDir.x,
          y: head.y + nextDir.y,
        };

        // Collision Check: Walls
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          setGameOver(true);
          return prevSnake;
        }

        // Collision Check: Self
        if (prevSnake.some(p => p.x === newHead.x && p.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];
        setDirection(nextDir);

        // Food Check
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, TICK_RATE);
    return () => clearInterval(interval);
  }, [gameOver, nextDir, food, generateFood]);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  // Draw Game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const unit = canvas.width / GRID_SIZE;

    // Clear
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid (Subtle)
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.05)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * unit, 0);
        ctx.lineTo(i * unit, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * unit);
        ctx.lineTo(canvas.width, i * unit);
        ctx.stroke();
    }

    // Snake
    snake.forEach((p, i) => {
      ctx.fillStyle = i === 0 ? '#00ffff' : '#ff00ff';
      // Glow effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = i === 0 ? '#00ffff' : '#ff00ff';
      ctx.fillRect(p.x * unit + 1, p.y * unit + 1, unit - 2, unit - 2);
      ctx.shadowBlur = 0;
    });

    // Food
    ctx.fillStyle = '#39ff14';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#39ff14';
    ctx.beginPath();
    ctx.arc((food.x + 0.5) * unit, (food.y + 0.5) * unit, unit / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

  }, [snake, food]);

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="flex justify-between w-full max-w-[400px] font-pixel text-xs">
        <div className="flex flex-col">
            <span className="opacity-50 uppercase tracking-widest text-[8px]">Current Protocol</span>
            <span className="text-neon-cyan glow-sm">SCORE: {score.toString().padStart(5, '0')}</span>
        </div>
        <div className="flex flex-col items-end">
            <span className="opacity-50 uppercase tracking-widest text-[8px]">Machine Record</span>
            <span className="text-neon-magenta glow-sm">HIGHSCORE: {highScore.toString().padStart(5, '0')}</span>
        </div>
      </div>

      <div className="relative group p-1 neon-border">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="bg-black block"
        />
        
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm">
            <h2 className="glitch-text text-4xl mb-4 font-pixel text-neon-magenta" data-text="LINK_SEVERED">
              LINK_SEVERED
            </h2>
            <button
              onClick={resetGame}
              className="px-6 py-2 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black transition-colors font-bold tracking-tighter"
            >
              RECONNECT_NODE
            </button>
          </div>
        )}
      </div>

      <div className="text-[10px] opacity-40 uppercase tracking-[0.2em] animate-pulse">
        Use Arrow Keys to Navigate the Void
      </div>
    </div>
  );
}
