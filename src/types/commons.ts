import type { ReactNode } from "react";

export type LeaderBoardAccountType = {
  address: string;
  position: number;
  tickets: number;
  eth: number;
  sr: number;
};

export enum ActionModalStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type ActionModalContextStateType = {
  open: boolean;
  title: string;
  loadComponent: ReactNode;
  contentComponent: ReactNode;
  status: ActionModalStatus;
};

export type TicketsContextType = {
  max: number;
  tickets: number[];
};
