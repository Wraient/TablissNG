import { API } from "../../types";

type Data = {
  text: string;
  separator: string;
  strings: string[];
  atNewline: boolean;
  timeout: number;
  paused: boolean;
};

export type Props = API<Data>;

export const defaultData: Data = {
  text: "",
  strings: [""],
  separator: "",
  atNewline: true,
  timeout: 0,
  paused: false,
};
