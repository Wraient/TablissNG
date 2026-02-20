import React, { useCallback, useEffect, useState } from "react";
import { useIntl, MessageDescriptor } from "react-intl";
import { API } from "../../types";
import { Data, defaultData, GameType, GAMES } from "./types";
import { messages } from "./messages";
import Pong from "./games/Pong";
import Snake from "./games/Snake";
import Breakout from "./games/Breakout";
import WhackAMole from "./games/WhackAMole";
import "./Minigames.sass";

const gameMessages: Record<GameType, MessageDescriptor> = {
  pong: messages.gamePong,
  snake: messages.gameSnake,
  breakout: messages.gameBreakout,
  "whack-a-mole": messages.gameWhackamole,
};

const Minigames: React.FC<API<Data>> = ({ data = defaultData, setData }) => {
  const intl = useIntl();
  const [currentScore, setCurrentScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [gameKey, setGameKey] = useState(0);

  const pauseEnabled = data.pauseWithSpace ?? true;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!playing || gameOver) return;

      const key = e.key.toLowerCase();
      const isGameKey = [
        "w",
        "a",
        "s",
        "d",
        "arrowup",
        "arrowdown",
        "arrowleft",
        "arrowright",
        " ",
      ].includes(key);

      if (isGameKey) {
        e.preventDefault();
      }

      if (e.code === "Space" && pauseEnabled) {
        setPaused((p) => !p);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [pauseEnabled, playing, gameOver]);

  const handleStart = useCallback(() => {
    setPlaying(true);
  }, []);

  const handleScore = useCallback((score: number) => {
    setCurrentScore(score);
  }, []);

  const handleGameOver = useCallback(
    (score: number) => {
      setCurrentScore(score);
      setPlaying(false);
      setGameOver(true);
      setPaused(false);
      const current = data.highScores?.[data.selectedGame] ?? 0;
      if (score > current) {
        setIsNewHighScore(true);
        setData({
          ...data,
          highScores: {
            ...data.highScores,
            [data.selectedGame]: score,
          },
        });
      }
    },
    [data, setData],
  );

  const handleRestart = useCallback(() => {
    setCurrentScore(0);
    setPlaying(false);
    setGameOver(false);
    setPaused(false);
    setIsNewHighScore(false);
    setGameKey((k) => k + 1);
  }, []);

  const switchGame = useCallback(
    (game: GameType) => {
      setData({ ...data, selectedGame: game });
      setCurrentScore(0);
      setPlaying(false);
      setGameOver(false);
      setPaused(false);
      setIsNewHighScore(false);
      setGameKey((k) => k + 1);
    },
    [data, setData],
  );

  const renderGame = () => {
    const props = {
      onStart: handleStart,
      onScore: handleScore,
      onGameOver: handleGameOver,
      paused,
    };
    switch (data.selectedGame) {
      case "pong":
        return <Pong key={gameKey} {...props} />;
      case "snake":
        return <Snake key={gameKey} {...props} />;
      case "breakout":
        return <Breakout key={gameKey} {...props} />;
      case "whack-a-mole":
        return <WhackAMole key={gameKey} {...props} />;
    }
  };

  const highScore = data.highScores?.[data.selectedGame] ?? 0;

  return (
    <div className="Minigames">
      {(data.showGameSelector ?? true) && (
        <div className="game-tabs">
          {GAMES.map((game) => (
            <button
              key={game}
              className={`button ${data.selectedGame === game ? "button--primary" : "button--secondary"}`}
              onClick={() => switchGame(game)}
            >
              {intl.formatMessage(gameMessages[game])}
            </button>
          ))}
        </div>
      )}

      <div className="game-scoreboard">
        <span>
          {intl.formatMessage(messages.score)}: {currentScore}
        </span>
        <span>
          {intl.formatMessage(messages.highScore)}: {highScore}
        </span>
      </div>

      <div className="game-canvas-wrapper">
        {renderGame()}

        {!gameOver && !playing && (
          <div className="game-overlay">
            <span>{intl.formatMessage(messages.clickToStart)}</span>
          </div>
        )}

        {paused && playing && !gameOver && (
          <div className="game-overlay">
            <span>{intl.formatMessage(messages.paused)}</span>
          </div>
        )}

        {gameOver && (
          <div className="game-overlay game-over-overlay">
            <div className="game-over-text">
              {intl.formatMessage(messages.gameOver)}
            </div>
            {isNewHighScore && (
              <div className="new-high-score">
                🎉 {intl.formatMessage(messages.newHighScore)}
              </div>
            )}
            <div className="final-score">
              {intl.formatMessage(messages.score)}: {currentScore}
            </div>
            <button className="button button--primary" onClick={handleRestart}>
              {intl.formatMessage(messages.play)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Minigames;
