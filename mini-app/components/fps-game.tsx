"use client";

import { useEffect, useRef, useState } from "react";

export default function FPSGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Placeholder: In a real implementation, this would initialize a WebGL or WebGPU context
    // and load 8K textures, ray‑traced lighting, and motion‑captured animations.
    // For now, we just clear the canvas and display a simple message.

    function draw() {
      if (!ctx) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#fff";
      ctx.font = "24px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("2087 FPS Demo", canvas.width / 2, canvas.height / 2);
    }

    draw();

    const handleClick = () => {
      if (!isPlaying) {
        setIsPlaying(true);
        // In a real game, start the game loop here.
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
        width={800}
        height={600}
        className="border rounded"
      />
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
