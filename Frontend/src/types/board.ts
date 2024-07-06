import { ApiCard } from "./card";

export interface ApiBoard {
  id: number;
  name: string;
  workspaceID: number;
  cards : ApiCard[];
}
