import type { NextApiRequest, NextApiResponse } from "next";
import { WelcomeBackData } from "@/types/welcomeBack";
import welcomeBackData from "@/welcomeBackData.json";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<WelcomeBackData>
) {
  res.status(200).json(welcomeBackData);
}
