
import { LeaderBoardAccountType } from "@/types/commons";
import { NextApiRequest, NextApiResponse } from "next";
import leaderBoardData from "@/leaderBoardData.json"

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<LeaderBoardAccountType[]>
) {
  res.status(200).json(leaderBoardData);
}