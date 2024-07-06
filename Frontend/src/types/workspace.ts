import { ApiBoard } from "./board";

export interface ApiWorkspace {
  id: number;
  name: string;
  Description: string;
  amIOwner: boolean;
  amIMember: boolean;
  boards: ApiBoard[];
}

