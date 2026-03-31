import * as React from "react";
import { useTheme } from "../../hooks";
import { useKey } from "../../lib/db/react";
import { db } from "../../db/state";
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
    let timeoutId: number | null = null;
    if (typeof window.requestIdleCallback === "function") {
      timeoutId = window.requestIdleCallback(() => setShowWidgets(true), {
        timeout: 2000,
      });
    } else {
      timeoutId = window.setTimeout(() => setShowWidgets(true), 100);
    }
    return () => {
      if (timeoutId === null) {
        return;
      }

      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(timeoutId);
      } else {
        clearTimeout(timeoutId);
      }
    };
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
