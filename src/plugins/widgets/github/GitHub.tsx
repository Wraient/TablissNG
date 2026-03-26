import { FC } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useIntl } from "react-intl";
import "./GitHub.sass";
import { useTheme } from "../../../hooks/useTheme";
import {
  monthShortMessages,
  weekdayShortMessages,
} from "../../../locales/messages";
import { legendMessages, messages, tooltipMessages } from "./messages";
import { Props, defaultData } from "./types";

const GitHubCalendarWidget: FC<Props> = ({ data = defaultData }) => {
  const intl = useIntl();
  const months = {
    jan: intl.formatMessage(monthShortMessages.jan),
    feb: intl.formatMessage(monthShortMessages.feb),
    mar: intl.formatMessage(monthShortMessages.mar),
    apr: intl.formatMessage(monthShortMessages.apr),
    may: intl.formatMessage(monthShortMessages.may),
    jun: intl.formatMessage(monthShortMessages.jun),
    jul: intl.formatMessage(monthShortMessages.jul),
    aug: intl.formatMessage(monthShortMessages.aug),
    sep: intl.formatMessage(monthShortMessages.sep),
    oct: intl.formatMessage(monthShortMessages.oct),
    nov: intl.formatMessage(monthShortMessages.nov),
    dec: intl.formatMessage(monthShortMessages.dec),
  };
  const weekdays = {
    sun: intl.formatMessage(weekdayShortMessages.sun),
    mon: intl.formatMessage(weekdayShortMessages.mon),
    tue: intl.formatMessage(weekdayShortMessages.tue),
    wed: intl.formatMessage(weekdayShortMessages.wed),
    thu: intl.formatMessage(weekdayShortMessages.thu),
    fri: intl.formatMessage(weekdayShortMessages.fri),
    sat: intl.formatMessage(weekdayShortMessages.sat),
  };
  const legend = {
    less: intl.formatMessage(legendMessages.less),
    more: intl.formatMessage(legendMessages.more),
  };
  const { isDark } = useTheme();

  if (!data.username) return null;

  // Localization for the calendar
  const labels = {
    months: [
      months.jan,
      months.feb,
      months.mar,
      months.apr,
      months.may,
      months.jun,
      months.jul,
      months.aug,
      months.sep,
      months.oct,
      months.nov,
      months.dec,
    ],
    weekdays: [
      weekdays.sun,
      weekdays.mon,
      weekdays.tue,
      weekdays.wed,
      weekdays.thu,
      weekdays.fri,
      weekdays.sat,
    ],
    totalCount: intl
      .formatMessage(messages.totalCount)
      .replace("[count]", "{{count}}")
      .replace("[year]", "{{year}}"),
    legend: {
      less: legend.less,
      more: legend.more,
    },
  };

  return (
    <a
      className="GitHub"
      href={
        data.clickAction !== "none"
          ? `https://github.com/${data.clickAction === "profile" ? data.username : ""}`
          : undefined
      }
      target="_blank"
      rel="noopener noreferrer"
      style={{
        cursor: data.clickAction === "none" ? "default" : "pointer",
        textDecoration: "none",
      }}
    >
      <GitHubCalendar
        showColorLegend={data.showColorLegend}
        showMonthLabels={data.showMonthLabels}
        showTotalCount={data.showTotalCount}
        username={data.username}
        labels={labels}
        colorScheme={isDark ? "dark" : "light"}
        theme={{
          light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
          dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
        }}
        tooltips={
          data.showTooltips
            ? {
                activity: {
                  text: (activity) => {
                    if (activity.count === 0) {
                      return intl.formatMessage(tooltipMessages.noActivity, {
                        date: activity.date,
                      });
                    }

                    return intl.formatMessage(tooltipMessages.activity, {
                      count: activity.count,
                      date: activity.date,
                    });
                  },
                },
              }
            : undefined
        }
      />
    </a>
  );
};

export default GitHubCalendarWidget;
