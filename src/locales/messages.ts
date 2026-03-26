import { defineMessages } from "react-intl";

export const sectionMessages = defineMessages({
  open: {
    id: "section.open",
    defaultMessage: "Open",
    description: "Text for opening the section",
  },
  close: {
    id: "section.close",
    defaultMessage: "Close",
    description: "Text for closing the section",
  },
  displaySettings: {
    id: "section.displaySettings",
    defaultMessage: "Display Settings",
    description: "Display settings section title",
  },
  fontSettings: {
    id: "section.fontSettings",
    defaultMessage: "Font Settings",
    description: "Font settings section title",
  },
});

export const pluginMessages = defineMessages({
  poweredBy: {
    id: "plugins.poweredBy",
    defaultMessage: "Powered by",
    description: "Attribution text for external services",
  },
  apply: {
    id: "plugins.apply",
    defaultMessage: "Apply",
    description: "Apply button title",
  },
  yourName: {
    id: "plugins.yourName",
    defaultMessage: "Your name",
    description: "Your name title",
  },
  namePlaceholder: {
    id: "plugins.namePlaceholder",
    defaultMessage: "Optional name",
    description: "Placeholder text for name input",
  },
  timeZone: {
    id: "plugins.timeZone",
    defaultMessage: "Time Zone",
    description: "Label for time zone selection",
  },
  freeMoveSave: {
    id: "plugins.freeMove.save",
    defaultMessage: "Save Position",
    description: "Save Position button title",
  },
  deprecationWarning: {
    id: "plugins.deprecationWarning",
    defaultMessage:
      "This widget is outdated. Please use the {widget} widget instead.",
    description: "General warning that a widget is outdated",
  },
});

export const timingMessages = defineMessages({
  everyNewTab: {
    id: "plugins.everyNewTab",
    defaultMessage: "Every new tab",
    description: "Every new tab title",
  },
  every5min: {
    id: "plugins.every5min",
    defaultMessage: "Every 5 minutes",
    description: "Every 5 minutes title",
  },
  every15min: {
    id: "plugins.every15min",
    defaultMessage: "Every 15 minutes",
    description: "Every 15 minutes title",
  },
  everyHour: {
    id: "plugins.everyHour",
    defaultMessage: "Every hour",
    description: "Every hour title",
  },
  everyDay: {
    id: "plugins.everyDay",
    defaultMessage: "Every day",
    description: "Every day title",
  },
  everyWeek: {
    id: "plugins.everyWeek",
    defaultMessage: "Every week",
    description: "Every week title",
  },
  // everyCustom
});

export const weekdayFullMessages = defineMessages({
  sunday: {
    id: "plugins.workHours.day.sunday",
    defaultMessage: "Sunday",
    description: "Sunday full day name",
  },
  monday: {
    id: "plugins.workHours.day.monday",
    defaultMessage: "Monday",
    description: "Monday full day name",
  },
  tuesday: {
    id: "plugins.workHours.day.tuesday",
    defaultMessage: "Tuesday",
    description: "Tuesday full day name",
  },
  wednesday: {
    id: "plugins.workHours.day.wednesday",
    defaultMessage: "Wednesday",
    description: "Wednesday full day name",
  },
  thursday: {
    id: "plugins.workHours.day.thursday",
    defaultMessage: "Thursday",
    description: "Thursday full day name",
  },
  friday: {
    id: "plugins.workHours.day.friday",
    defaultMessage: "Friday",
    description: "Friday full day name",
  },
  saturday: {
    id: "plugins.workHours.day.saturday",
    defaultMessage: "Saturday",
    description: "Saturday full day name",
  },
});

export const monthShortMessages = defineMessages({
  jan: {
    id: "plugins.github.month.jan",
    defaultMessage: "Jan",
    description: "January short name for GitHub calendar",
  },
  feb: {
    id: "plugins.github.month.feb",
    defaultMessage: "Feb",
    description: "February short name for GitHub calendar",
  },
  mar: {
    id: "plugins.github.month.mar",
    defaultMessage: "Mar",
    description: "March short name for GitHub calendar",
  },
  apr: {
    id: "plugins.github.month.apr",
    defaultMessage: "Apr",
    description: "April short name for GitHub calendar",
  },
  may: {
    id: "plugins.github.month.may",
    defaultMessage: "May",
    description: "May short name for GitHub calendar",
  },
  jun: {
    id: "plugins.github.month.jun",
    defaultMessage: "Jun",
    description: "June short name for GitHub calendar",
  },
  jul: {
    id: "plugins.github.month.jul",
    defaultMessage: "Jul",
    description: "July short name for GitHub calendar",
  },
  aug: {
    id: "plugins.github.month.aug",
    defaultMessage: "Aug",
    description: "August short name for GitHub calendar",
  },
  sep: {
    id: "plugins.github.month.sep",
    defaultMessage: "Sep",
    description: "September short name for GitHub calendar",
  },
  oct: {
    id: "plugins.github.month.oct",
    defaultMessage: "Oct",
    description: "October short name for GitHub calendar",
  },
  nov: {
    id: "plugins.github.month.nov",
    defaultMessage: "Nov",
    description: "November short name for GitHub calendar",
  },
  dec: {
    id: "plugins.github.month.dec",
    defaultMessage: "Dec",
    description: "December short name for GitHub calendar",
  },
});

export const weekdayShortMessages = defineMessages({
  sun: {
    id: "plugins.github.weekday.sun",
    defaultMessage: "Sun",
    description: "Sunday short name for GitHub calendar",
  },
  mon: {
    id: "plugins.github.weekday.mon",
    defaultMessage: "Mon",
    description: "Monday short name for GitHub calendar",
  },
  tue: {
    id: "plugins.github.weekday.tue",
    defaultMessage: "Tue",
    description: "Tuesday short name for GitHub calendar",
  },
  wed: {
    id: "plugins.github.weekday.wed",
    defaultMessage: "Wed",
    description: "Wednesday short name for GitHub calendar",
  },
  thu: {
    id: "plugins.github.weekday.thu",
    defaultMessage: "Thu",
    description: "Thursday short name for GitHub calendar",
  },
  fri: {
    id: "plugins.github.weekday.fri",
    defaultMessage: "Fri",
    description: "Friday short name for GitHub calendar",
  },
  sat: {
    id: "plugins.github.weekday.sat",
    defaultMessage: "Sat",
    description: "Saturday short name for GitHub calendar",
  },
});

export const backgroundMessages = defineMessages({
  customDate: {
    id: "backgrounds.customDate",
    defaultMessage: "Custom date",
    description: "Label for custom date selection",
  },
  dateOfPicture: {
    id: "backgrounds.dateOfPicture",
    defaultMessage: "Date of the picture",
    description: "Label for the date when the picture was taken",
  },
  showTitle: {
    id: "backgrounds.showTitle",
    defaultMessage: "Show title",
    description: "Toggle for showing/hiding image titles",
  },
  showControls: {
    id: "backgrounds.showControls",
    defaultMessage: "Show controls",
    description: "Toggle for always showing background controls",
  },
  today: {
    id: "backgrounds.today",
    defaultMessage: "Today",
    description: "Label for selecting today's date",
  },
  date: {
    id: "backgrounds.date",
    defaultMessage: "Date",
    description: "Label for date input",
  },
  locale: {
    id: "backgrounds.locale",
    defaultMessage: "Locale",
    description: "Label for locale selection",
  },
  search: {
    id: "backgrounds.search",
    defaultMessage: "Search",
    description: "Search mode for background sources",
  },
  searchTerm: {
    id: "backgrounds.searchTerm",
    defaultMessage: "Search Term",
    description: "Label for background search term input",
  },
});
