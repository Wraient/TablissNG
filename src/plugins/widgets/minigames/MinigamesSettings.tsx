import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { API } from "../../types";
import { Data, defaultData, GameType, GAMES } from "./types";
import { messages } from "./messages";

const gameMessages: Record<GameType, typeof messages.gamePong> = {
  pong: messages.gamePong,
  snake: messages.gameSnake,
  breakout: messages.gameBreakout,
  "whack-a-mole": messages.gameWhackamole,
};

const MinigamesSettings: React.FC<API<Data>> = ({
  data = defaultData,
  setData,
}) => {
  const intl = useIntl();

  return (
    <div className="MinigamesSettings">
      <p style={{ opacity: 0.7, fontStyle: "italic", fontSize: "0.9em" }}>
        <FormattedMessage {...messages.distractionWarning} />
      </p>

      <label>
        <FormattedMessage {...messages.selectGame} />
        <select
          value={data.selectedGame}
          onChange={(e) =>
            setData({ ...data, selectedGame: e.target.value as GameType })
          }
        >
          {GAMES.map((game) => (
            <option key={game} value={game}>
              {intl.formatMessage(gameMessages[game])}
            </option>
          ))}
        </select>
      </label>

      <label>
        <input
          type="checkbox"
          checked={data.showGameSelector ?? true}
          onChange={(e) =>
            setData({ ...data, showGameSelector: e.target.checked })
          }
        />{" "}
        <FormattedMessage {...messages.showGameSelector} />
      </label>

      <label>
        <input
          type="checkbox"
          checked={data.pauseWithSpace ?? true}
          onChange={(e) =>
            setData({ ...data, pauseWithSpace: e.target.checked })
          }
        />{" "}
        <FormattedMessage {...messages.pauseWithSpace} />
      </label>

      <button
        className="button button--primary"
        onClick={() =>
          setData({
            ...data,
            highScores: defaultData.highScores,
          })
        }
      >
        <FormattedMessage {...messages.resetHighScores} />
      </button>
    </div>
  );
};

export default MinigamesSettings;
