"use client";

import { useState } from "react";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

const fruits = [
  { name: "Apple", img: "/apple.png" },
  { name: "Banana", img: "/banana.png" },
  { name: "Cherry", img: "/cherry.png" },
  { name: "Lemon", img: "/lemon.png" },
];

export default function SlotMachine() {
  const [grid, setGrid] = useState<string[][]>([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const interval = setInterval(() => {
      setGrid(prev => {
        const newGrid = prev.map(row => [...row]);
        // shift rows down
        newGrid[2] = newGrid[1];
        newGrid[1] = newGrid[0];
        // generate new top row
        newGrid[0] = Array.from({ length: 3 }, () => {
          const f = fruits[Math.floor(Math.random() * fruits.length)];
          return f.name;
        });
        return newGrid;
      });
    }, 200);
    setTimeout(() => {
      clearInterval(interval);
      setSpinning(false);
    }, 2000);
  };

  // win condition computed inline for rendering
  const winCondition =
    (grid[0][0] && grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2]) ||
    (grid[1][0] && grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2]) ||
    (grid[2][0] && grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2]) ||
    (grid[0][0] && grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0]) ||
    (grid[0][1] && grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1]) ||
    (grid[0][2] && grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-3 gap-2">
        {grid.map((row, rIdx) =>
          row.map((fruitName, cIdx) => {
            const fruit = fruits.find(f => f.name === fruitName);
            return (
              <div key={`${rIdx}-${cIdx}`} className="w-20 h-20 flex items-center justify-center border rounded">
                {fruit && (
                  <img src={fruit.img} alt={fruit.name} className="w-16 h-16 object-contain" />
                )}
              </div>
            );
          })
        )}
      </div>
      <button
        onClick={spin}
        disabled={spinning}
        className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
      >
        {spinning ? "Spinning..." : "Spin"}
      </button>
      {winCondition && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <p className="text-green-800 font-semibold">You win!</p>
          <Share text={`I just won on the Fruit Slot Machine! ${url}`} />
        </div>
      )}
    </div>
  );
}
