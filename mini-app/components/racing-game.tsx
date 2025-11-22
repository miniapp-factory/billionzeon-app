"use client";

import { useState } from "react";

export default function RacingGame() {
  const [isRacing, setIsRacing] = useState(false);

  const startRace = () => {
    setIsRacing(true);
    // Placeholder: race logic would go here
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Speed Drift: Urban Rush</h1>
      <p className="text-center">
        Tap 'RACE' to start the race. Swipe left/right to steer, hold right for boost, tap left for drift.
      </p>
      <button
        onClick={startRace}
        className="px-6 py-3 bg-primary text-white rounded hover:bg-primary/80"
      >
        RACE
      </button>
      {isRacing && <p className="mt-4 text-green-600">Race in progress...</p>}
    </div>
  );
}
