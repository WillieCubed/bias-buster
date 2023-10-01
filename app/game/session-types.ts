export type ArticleQuestion = {
  articleId: string;
  /**
   * The title of the article.
   */
  title: string;
  /**
   * The plain text content of the article.
   */
  content: string;
  modificationData?: {
    originalContent: string;
    prompt: string;
  };
};

export type RoundData = {
  articles: ArticleQuestion[];
  currentRound: number;
  totalRounds: number;
};

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
