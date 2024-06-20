import { Skeleton, Stack } from "@mui/material";
import React from "react";
import styles from "./styles.module.css"

export default function LeaderBoardProfileCardSkeleton() {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      width={"100%"}
      height={"70px"}
      className={styles["container--all"]}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-center"}
        spacing={2}
      >
        <Skeleton variant="circular" width={"32px"} height={"32px"} />
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-center"}
          spacing={1}
        >
          <Skeleton variant="circular" width={40} height={40}/>
          <Skeleton variant="text" width={400}/>
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"end"}
        width={"30%"}
        spacing={3}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"30%"}
          spacing={1}
        >
          <Skeleton variant="text" height={20} width={32}/>
          <Skeleton variant="circular" width={20} height={20}/>
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-center"}
          width={"30%"}
          spacing={1}
        >
          <Skeleton variant="text" height={20} width={32}/>
          <Skeleton variant="circular" width={20} height={20}/>
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-center"}
          width={"30%"}
          spacing={1}
        >
          <Skeleton variant="text" height={20} width={32}/>
          <Skeleton variant="circular" width={20} height={20}/>
        </Stack>
      </Stack>
    </Stack>
  );
}
