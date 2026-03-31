import { API } from "../../types";

export type WikimediaDate = "today" | "custom";

export interface Data {
  date: WikimediaDate;
  customDate?: string;
  showTitle: boolean;
}

export interface Image {
  image: {
    description: {
      html: any;
      text: any;
    };
    artist: {
      html: any;
      text: any;
    };
    image: {
      source: any;
    };
  };
}

type Cache = Image;

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  date: "today",
  showTitle: true,
};
