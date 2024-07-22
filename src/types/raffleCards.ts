export type RaffleCardsData = {
  id: string;
  raffleCardText: string;
  raffleCardChip: RaffleCardChip;
  chipColor: string;
  entriesColor: string;
  end: number;
  prizePotEth: number;
  prizePotSr: number;
  totalEntries: number;
  currentEntries: number;
  entries: number;
  networkIcon: string;
  bgImg: string;
  round: number;
};

type RaffleCardChip = {
  value: number;
  network: string;
};
