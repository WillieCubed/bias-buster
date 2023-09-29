"use client";

import { useGameSession } from "../../session-provider";

/**
 * A list of players in the current game session.
 *
 * This component may only be used within a GameSessionProvider.
 */
export default function GameSessionPlayerList() {
  const { players } = useGameSession();
  const playeritems = players.map((player) => (
    <div className="flex space-x-4" key={player.name}>
      <div className="h-10 w-10 bg-blue-500 rounded-full"></div>
      <div className="">
        <div className="text-title-medium">{player.name}</div>
        <div className="text-label-large">{player.points} points</div>
      </div>
    </div>
  ));

  return <div className="space-y-4">{playeritems}</div>;
}
