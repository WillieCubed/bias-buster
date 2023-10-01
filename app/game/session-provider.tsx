"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { GameSession, Player, RoundData } from "./session-types";
import { makeGameMatch } from "./server-client";
import { useAuth } from "../auth-provider";

type GameContextProps = {
  gameSession: GameSession | null;
  socket: WebSocket | null;
  connect: () => void;
  sendMessage: (message: string) => void;
  disconnect: () => void;
  changeSession: (gameId: string) => Promise<void>;
};

export const GameContext = createContext<GameContextProps>({
  gameSession: null,
  socket: null,
  connect: () => undefined,
  sendMessage: () => undefined,
  disconnect: () => undefined,
  changeSession: async () => undefined,
});

/**
 * A state provider for the game session.
 *
 * This component must be used to wrap all components that use the game session.
 * It provides an entrypoint for managing the game session state and manages
 * the connection to the server.
 */
export function GameSessionProvider({ children }: PropsWithChildren) {
  const [gameSession, setGameSession] = useState<GameSession | null>(null); // replace null with your actual game session object
  const socket = useMemo(() => {
    return new WebSocket(`ws://localhost:8080/game-session`);
  }, []);

  function connect() {
    // connect to websocket
  }

  function disconnect() {
    // disconnect from websocket
    socket.close();
  }

  function sendMessage(message: string) {
    // Encode message in JSON and send to websocket
    socket.send(message);
  }

  async function changeSession(gameId: string) {
    setGameSession({
      gameId,
      round: 0,
      totalRounds: 2,
      players: [
        {
          id: "1",
          name: "Willie",
          points: 0,
        },
        {
          id: "2",
          name: "Liam",
          points: 0,
        },
      ],
      rules: [],
    });
  }

  function endSession() {
    disconnect();
    setGameSession(null);
  }

  useEffect(() => {
    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        disconnect();
      }
    };
  }, [socket]);

  return (
    <GameContext.Provider
      value={{
        gameSession,
        socket,
        connect,
        changeSession,
        disconnect,
        sendMessage,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

type GameMessage = {
  type: string;
  payload: any;
};

/**
 * A client-side hook for managing the game session.
 */
export function useGameSession() {
  const {
    gameSession: game,
    socket,
    connect,
    disconnect,
    changeSession,
  } = useContext(GameContext);
  const { user } = useAuth();
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
  const [currentRoundData, setCurrentRoundData] = useState<RoundData | null>(
    null,
  );
  const [roundOver, setRoundOver] = useState<boolean>(false);

  const gameId = game?.gameId ?? null;

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onmessage = (event) => {};
  }, [socket]);

  async function notifySelection(snippetId: string) {
    const message = JSON.stringify({
      type: "select",
      payload: {
        gameId,
        snippetId,
      },
    });
  }

  function markReady() {
    // TODO: Notify server that player is ready
    setIsReady(true);
    const message = JSON.stringify({
      type: "ready",
      payload: {
        gameId,
      },
    });
    socket?.send(message);
  }

  function markNotReady() {
    // TODO: Notify server that player is not ready
    setIsReady(false);
  }

  /**
   *
   */
  async function initOrConnect() {
    if (!user) {
      throw new Error("User not logged in");
    }
    if (game) {
      connect();
    }
    const gameId = await makeGameMatch([], user.id);
    try {
      await changeSession(gameId);
    } catch (error) {
      console.error(error);
    }
  }

  const gameActive = !!game;
  const currentRound = game?.round ?? -1;
  const totalRounds = game?.totalRounds ?? -1;

  function updateArticles() {
    setCurrentRoundData({
      articles: [
        {
          articleId: "article-1",
          title:
            "U.S. Provided Canada With Intelligence on Killing of Sikh Leader",
          content: `American spy agencies provided information to Ottawa after the killing of a Sikh separatist leader in the Vancouver area, but Canada developed the most definitive intelligence that led it to accuse India of orchestrating the plot, according to Western allied officials.
  In the aftermath of the killing, U.S. intelligence agencies offered their Canadian counterparts context that helped Canada conclude that India had been involved. Yet what appears to be the “smoking gun,” intercepted communications of Indian diplomats in Canada indicating involvement in the plot, was gathered by Canadian officials, allied officials said.
  While Secretary of State Antony J. Blinken has called on India to cooperate with the Canadian investigation, American officials have largely tried to avoid triggering any diplomatic blowback from India. But the disclosure of the involvement of U.S. intelligence risks ensnaring Washington in the diplomatic battle between Canada and India at a time when it is keen to develop New Delhi as a closer partner.
  The United States did not learn about the plot, or evidence pointing to India’s involvement in it, until after operatives had killed the Sikh leader, Hardeep Singh Nijjar, allied officials said.`,
        },
        {
          articleId: "article-2",
          title:
            "U.S. Provided Canada With Intelligence on Killing of Sikh Leader",
          content: `American spy agencies provided information to Ottawa after the killing of a Sikh separatist leader in the Vancouver area, but Canada developed the most definitive intelligence that led it to accuse India of orchestrating the plot, according to Western allied officials.
  In the aftermath of the killing, U.S. intelligence agencies offered their Canadian counterparts context that helped Canada conclude that India had been involved. Yet what appears to be the “smoking gun,” intercepted communications of Indian diplomats in Canada indicating involvement in the plot, was gathered by Canadian officials, allied officials said.
  While Secretary of State Antony J. Blinken has called on India to cooperate with the Canadian investigation, American officials have largely tried to avoid triggering any diplomatic blowback from India. But the disclosure of the involvement of U.S. intelligence risks ensnaring Washington in the diplomatic battle between Canada and India at a time when it is keen to develop New Delhi as a closer partner.
  The United States did not learn about the plot, or evidence pointing to India’s involvement in it, until after operatives had killed the Sikh leader, Hardeep Singh Nijjar, allied officials said.`,
          modificationData: {
            prompt:
              "Rewrite the article, but make information about Donald Trump less reliable.",
            originalContent: "",
          },
        },
      ],
      currentRound: currentRoundData?.currentRound ?? -1,
      totalRounds: currentRoundData?.totalRounds ?? -1,
    });
  }

  const articles = currentRoundData?.articles ?? [];

  return {
    players,
    gameId,
    gameActive,
    currentRound,
    totalRounds,
    initOrConnect,
    notifySelection,
    isReady,
    markReady,
    markNotReady,
    currentRoundData,
    updateArticles,
    roundOver,
    articles,
    setRoundOver,
  };
}

export default GameSessionProvider;
