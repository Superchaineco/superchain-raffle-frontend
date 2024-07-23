
import type { ClaimRewardsModalData } from "@/types/rewardsCard";
import type { NextApiRequest, NextApiResponse } from "next";
import claimRewardsModalData from "@/claimRewardsModalData.json"

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ClaimRewardsModalData>
) {
  res.status(200).json(claimRewardsModalData);
}
