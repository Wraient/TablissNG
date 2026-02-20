import { Config } from "../../types";
import Minigames from "./Minigames";
import MinigamesSettings from "./MinigamesSettings";
import { messages } from "./messages";

const config: Config = {
  key: "widget/minigames",
  name: messages.name,
  description: messages.description,
  dashboardComponent: Minigames,
  settingsComponent: MinigamesSettings,
};

export default config;
