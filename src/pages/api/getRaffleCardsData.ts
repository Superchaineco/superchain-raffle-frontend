import type { NextApiRequest, NextApiResponse } from "next";
import raffleCardsData from "@/raffleCardsData.json";
import type { RaffleCardsData } from "@/types/raffleCards";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RaffleCardsData[]>
) {
  res.status(200).json(raffleCardsData);
}
