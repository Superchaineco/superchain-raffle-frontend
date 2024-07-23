import { ReactNode } from "react";

export type LeaderBoardAccountType = {
  address: string;
  position: number;
  tickets: number;
  eth: number;
  sr: number;
};


export type ActionModalContextStateType = {
  open: boolean;
  title: string;
  loadComponent: ReactNode;
  contentComponent: ReactNode;
}
