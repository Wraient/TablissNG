import { startOfDay } from "date-fns";
import { format, toZonedTime } from "date-fns-tz";

import { API } from "../../types";
import { gameQuery as query } from "./query";

function getEstString(date: Date) {
  const dateUTC = startOfDay(date); // Ensure it's the start of the day
  const dateEST = toZonedTime(dateUTC, "America/New_York"); // Convert to EST/EDT
  return format(dateEST, "yyyyMMdd");
}

export async function getCurrentGames(loader: API["loader"]) {
  loader.push();
  const { data } = await fetch("https://nba.rickyg.io/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: query(getEstString(new Date())) }),
  })
    .then((res) => res.json())
    .finally(() => loader.pop());

  return { timestamp: Date.now(), games: data ? data.schedule : [] };
}
