
import { ProfileData } from "@/types/profileCard";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileData>
) {
  res.status(200).json({ userHash: "0xD0be338",  eth: 0.12, srp: 150, entries: 5, rank: 5});
}