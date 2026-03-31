import { API } from "../../types";

export interface TopSitesList {
  sites: Array<{ url: string; title?: string }>;
}

export type Data = {
  columns: number;
  linkOpenStyle: boolean;
  linksNumbered: boolean;
  iconProvider: string;
  maxTextLength: number;
};

export type Cache = TopSitesList;

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  columns: 3,
  linkOpenStyle: false,
  linksNumbered: false,
  iconProvider: "_favicon_google",
  maxTextLength: 0,
};

export const defaultCache: Cache = {
  sites: [],
};
