import { MyRewardsData } from "@/types/rewardsCard";
import myRewardsData from "@/myRewardsData.json" 
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MyRewardsData[]>
) {
  res
    .status(200)
    .json(myRewardsData);
}
