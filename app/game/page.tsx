"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameSession } from "./session-provider";
import GameSessionPlayerList from "./[gameId]/components/GameSessionPlayerList";

/**
 * A matchmaking page where a user can start a new game.
 *
 * When the page loads, the client makes a request to the matchmaking server to
 * either create a new game session or join an existing one. The client then
 * waits for other players to join the game session. The client can also invite
 * other players to join the game session by sharing a pre-generated link based
 * on the game session ID.
 */
export default function GameStartPage() {
  const { gameId, initOrConnect, isReady, markReady, markNotReady, players } =
    useGameSession();

  useEffect(() => {
    initOrConnect();
  }, []);

  const playerCount = players.length;
  const playersText =
    playerCount > 1 ? `${playerCount} players` : "Waiting for players";
  const canContinue = playerCount > 1;

  const router = useRouter();

  const handleStartMatch = () => {
    router.push(`/game/${gameId}`);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto lg:grid lg:grid-cols-6">
      <section className="mt-8 space-y-6 lg:col-span-4">
        <div className="space-y-6">
          <div className="text-headline-large">Player vs Player</div>
          <div className="text-title-medium">
            Waiting for other players&hellip;
          </div>
        </div>
        <div>
          <InviteOthersBox gameId={gameId} />
        </div>
        {/* TODO: Add once available */}
        {/* <section id="options">
          <div className="text-headline-small">Match Options</div>
          <div className="text-title-large">Game Settings</div>
        </section> */}
      </section>
      <section className="p-4 space-y-6 rounded-xl bg-surface-foreground lg:col-span-2">
        <div className="text-headline-small">Current Players</div>
        <GameSessionPlayerList />
        <div>{playersText}</div>
        <div>
          <button
            className="px-4 py-2 bg-primary text-on-primary disabled:bg-gray-600 rounded-md"
            disabled={!canContinue}
            onClick={handleStartMatch}
          >
            Start match
          </button>
        </div>
      </section>
    </div>
  );
}

interface InviteOthersBoxProps {
  gameId: string | null;
}

function InviteOthersBox({ gameId }: InviteOthersBoxProps) {
  const gameIdSegment = gameId ? `${gameId}` : "...";
  return (
    <div className="space-y-4">
      <div className="text-label-large">Invite others to join</div>
      <div className="inline-block p-4 rounded-lg bg-surface-foreground space-x-2">
        <span className="text-title-medium">
          {process.env.NEXT_PUBLIC_APP_URL}/game/<span>{gameIdSegment}</span>
        </span>
      </div>
    </div>
  );
}

function PlayerItem() {
  return <div></div>;
}
