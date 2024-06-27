import { LeaderBoardAccountType } from "@/types/commons";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<LeaderBoardAccountType>
) {
  res
    .status(200)
    .json({
      address: "0xD0be338562D78fAf8B3Sv567a9943bfaab0a3051e",
      position: 5,
      tickets: 12,
      eth: 0.12,
      sr: 150,
    });
}
