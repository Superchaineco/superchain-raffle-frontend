import { getLeaderBoardData } from "@/functions/fetchFunctions";
import type { LeaderBoardAccountType } from "@/types/commons";
import { Box, Stack } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import LeaderBoardProfileCard from "./ProfileCard";
import styles from "./styles.module.css";
import LeaderBoardProfileCardSkeleton from "./CardSkeleton";
import { motion } from "framer-motion";

function LeaderBoard({ myInfo }: { myInfo: LeaderBoardAccountType }) {
  const { data, status } = useQuery("leaderBoardData", getLeaderBoardData);

  return (
    <Stack alignItems={"center"} justifyContent={"center"} spacing={1}>
      <Stack width={"100%"} alignItems={"start"} justifyContent={"center"}>
        <p className={styles["title"]}>Top users of all-time</p>
      </Stack>
      {status === "loading" ? (
        <>
          <LeaderBoardProfileCardSkeleton />
          <LeaderBoardProfileCardSkeleton />
          <LeaderBoardProfileCardSkeleton />
        </>
      ) : myInfo ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              opacity: 1,
              transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
              },
            },
            hidden: {
              opacity: 0,
              transition: {
                when: "afterChildren",
              },
            },
          }}
          style={{ width: "100%" }}
        >
          {data.map((account: LeaderBoardAccountType) => (
            <motion.div
              key={account.address}
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: -100 },
              }}
            >
              <Box mb={1}>
                <LeaderBoardProfileCard
                  account={account}
                  isMyProfileCard={myInfo.address == account.address}
                />
              </Box>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div></div>
      )}
    </Stack>
  );
}

export default LeaderBoard;
