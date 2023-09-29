"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type GameContextProps = {
  gameSession: GameSession | null;
  socket: WebSocket | null;
  connect: () => void;
  sendMessage: (message: string) => void;
  disconnect: () => void;
};

export const GameContext = createContext<GameContextProps>({
  gameSession: null,
  socket: null,
  connect: () => undefined,
  sendMessage: () => undefined,
  disconnect: () => undefined,
});

/**
 * A state provider for the game session.
 *
 * This component must be used to wrap all components that use the game session.
 * It provides an entrypoint for managing the game session state and manages
 * the connection to the server.
 */
export function GameSessionProvider({ children }: PropsWithChildren) {
  const gameSession = null; // replace null with your actual game session object
  const socket = useMemo(() => {
    return new WebSocket(`ws://localhost:3000/sessions`);
  }, []);

  function connect() {
    // connect to websocket
  }

  function disconnect() {
    // disconnect from websocket
  }

  function sendMessage(message: string) {
    // Encode message in JSON and send to websocket
    socket.send(message);
  }

  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);
  return (
    <GameContext.Provider
      value={{
        gameSession,
        socket,
        connect,
        disconnect,
        sendMessage,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export type Player = {
  id: string;
  name: string;
  points: number;
};

export type GameOption = {
  id: string;
  label: string;
};

export type GameSession = {
  gameId: string;
  players: Player[];
  round: number;
  totalRounds: number;
  rules: GameOption[];
};

async function getNewGameId(rules: GameOption[]) {
  try {
    const response = await fetch(`/matchmaking`, {
      method: "POST",
      body: JSON.stringify(rules),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    const data = await (response.json() as Promise<{ gameId: string }>);

    return data.gameId;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/**
 * A client-side hook for managing the game session.
 */
export function useGameSession() {
  const [gameId, setGameId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [players, setPlayers] = useState<Player[]>([
    {
      id: "1",
      name: "Player 1",
      points: 0,
    },
    {
      id: "2",
      name: "Player 2",
      points: 0,
    },
  ]);

  const { gameSession: game, socket } = useContext(GameContext);

  function markReady() {
    // TODO: Notify server that player is ready
    setIsReady(true);
  }

  function markNotReady() {
    // TODO: Notify server that player is not ready
    setIsReady(false);
  }

  async function initOrConnect() {
    const gameId = await getNewGameId([]);
    setGameId(gameId);
  }

  const gameActive = !!game;
  const currentRound = game?.round ?? -1;
  const totalRounds = game?.totalRounds ?? -1;

  return {
    players,
    gameId,
    gameActive,
    currentRound,
    totalRounds,
    initOrConnect,
    isReady,
    markReady,
    markNotReady,
  };
}

export default GameSessionProvider;
