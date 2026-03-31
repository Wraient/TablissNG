import * as React from "react";
import { useTheme } from "../../hooks";
import { useKey } from "../../lib/db/react";
import { db } from "../../db/state";
import { runWhenIdle } from "../../utils";
import Background from "./Background";
import "./Dashboard.sass";
import Overlay from "./Overlay";
import Widgets from "./Widgets";

const Dashboard: React.FC = () => {
  const { isDark } = useTheme();
  const theme = isDark ? "dark" : "";
  const [settingsIconPosition] = useKey(db, "settingsIconPosition");
  const [showWidgets, setShowWidgets] = React.useState(false);

  React.useEffect(() => {
    return runWhenIdle(() => setShowWidgets(true), {
      delay: 100,
      timeout: 2000,
    });
  }, []);

  return (
    <div className={`Dashboard fullscreen ${theme} ${settingsIconPosition}`}>
      <Background />
      {showWidgets && <Widgets />}
      <Overlay />
    </div>
  );
};

export default React.memo(Dashboard);
