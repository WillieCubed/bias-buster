"use client";

import ProgressBar from "@ramonak/react-progress-bar";
import { useState, useEffect } from "react";
import { useGameSession } from "../../session-provider";

const ROUND_DURATION = 30;

export default function RoundStatusIndicator() {
  const { currentRound, totalRounds, roundOver, setRoundOver } =
    useGameSession();
  const [remainingTime, setRemainingTime] = useState(30);

  const remainingTimeText = roundOver
    ? "Time is up!"
    : `${remainingTime} seconds left`;

  useEffect(() => {
    const timer = setInterval(() => {
      if (remainingTime <= 0) {
        setRoundOver(true);
        clearInterval(timer);
        return;
      }
      setRemainingTime((prevTime: number) => prevTime - 1);
    }, 1_000);

    return () => clearInterval(timer);
  }, [roundOver]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="text-title-small">
          Round {currentRound} / {totalRounds}
        </div>
        <div className="text-headline-small">
          Which one is more AI-generated?
        </div>
      </div>
      <div className="space-y-2">
        {/* Yes, remainingTime is passed as a string due the progress bar library appending % to countdown otherwise */}
        <ProgressBar
          completed={`${remainingTime}`}
          labelSize="14px"
          maxCompleted={ROUND_DURATION}
          height="16px"
          ariaValuemax={ROUND_DURATION}
        />
        <div className="text-title-small">{remainingTimeText}</div>
      </div>
    </div>
  );
}
