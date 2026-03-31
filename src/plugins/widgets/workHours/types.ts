import { API } from "../../types";

export type Data = {
  startTime: string;
  endTime: string;
  flipPercentage: boolean;
  days: number[];
};

export type Props = API<Data>;

export const defaultData: Data = {
  startTime: "09:00",
  endTime: "17:00",
  flipPercentage: false,
  days: [1, 2, 3, 4, 5],
};
