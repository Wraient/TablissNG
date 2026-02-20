export type GameType = "pong" | "snake" | "breakout" | "whack-a-mole";

export const GAMES: GameType[] = ["pong", "snake", "breakout", "whack-a-mole"];

export interface Data {
  selectedGame: GameType;
  highScores: Record<GameType, number>;
  showGameSelector: boolean;
  pauseWithSpace: boolean;
}

export const defaultData: Data = {
  selectedGame: "pong",
  showGameSelector: true,
  pauseWithSpace: true,
  highScores: {
    pong: 0,
    snake: 0,
    breakout: 0,
    "whack-a-mole": 0,
  },
};
