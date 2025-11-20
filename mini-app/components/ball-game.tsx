"use client";

import { useEffect, useRef, useState } from "react";

export default function BallGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ball = new Image();
    ball.src = "/ball.png";

    const width = canvas.width;
    const height = canvas.height;
    let x = width / 2;
    let y = height / 2;
    let vx = 3;
    let vy = 3;
    const radius = 20;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = "#ff6f61";
      ctx.fill();
      ctx.closePath();
    }

    function update() {
      if (!isPlaying) return;
      x += vx;
      y += vy;

      if (x + radius > width || x - radius < 0) vx = -vx;
      if (y + radius > height || y - radius < 0) vy = -vy;

      // Simple scoring: increase when ball hits top
      if (y - radius <= 0) setScore((s) => s + 1);

      draw();
      requestAnimationFrame(update);
    }

    ball.onload = () => {
      draw();
    };

    const handleClick = () => {
      if (!isPlaying) {
        setIsPlaying(true);
        update();
      }
    };

    canvas.addEventListener("click", handleClick);

    return () => {
      canvas.removeEventListener("click", handleClick);
    };
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="border rounded"
      />
      <p className="text-lg">Score: {score}</p>
      {!isPlaying && (
        <button
          onClick={() => setIsPlaying(true)}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Start Game
        </button>
      )}
    </div>
  );
}
