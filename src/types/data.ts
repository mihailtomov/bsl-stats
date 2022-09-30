export interface PlayerData {
  id?: string;
  nickname?: string;
  race?: string;
  country?: string;
  won?: number;
  lost?: number;
  total?: number;
  winrate?: string;
}

export type CountryCodes = Record<string, string>;
