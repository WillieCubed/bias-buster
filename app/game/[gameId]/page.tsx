import GameCanvas from "./components/GameCanvas";
import PlayerList from "./components/GameSessionPlayerList";
import RoundStatusIndicator from "./components/RoundStatusIndicator";

export const dynamic = "force-dynamic";

type GameSessionPageProps = {
  params: {
    gameId: string;
  };
};

/**
 * The main UI for an active game.
 */
export default function GameSessionPage({}: GameSessionPageProps) {
  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-x-4 p-4">
      <section className="pb-12 lg:col-span-4 lg:col-start-3 lg:row-span-1">
        <RoundStatusIndicator />
      </section>
      <section className="space-y-6 lg:col-span-2 lg:col-start-1 lg:row-span-1">
        <div className="text-title-large">Player Progress</div>
        <PlayerList />
      </section>
      <main className="lg:col-span-8">
        <GameCanvas />
      </main>
    </div>
  );
}
