import { Card, Stack, SvgIcon, Typography } from "@mui/material";
import SRIcon from "@/public/images/sr-icon.svg";
import RedirectIcon from "@/public/images/redirect-icon.svg";
import React from "react";
import styles from "./styles.module.css";
import RewardsInfoCard from "@/components/common/RewardsInfoCard";

type Props = {
  data: {
    eth: number;
    srPoints: number;
    tickets: number[];
  };
};

export default function ActionModalContentTicketsInfo({ data }: Props) {
  return (
    <>
      <Stack width={"100%"} spacing={1}>
        <Typography className={styles["text--while"]}>
          You have claimed:
        </Typography>
        <Stack
          spacing={1.5}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
          paddingX={4}
        >
          <Card className={styles["container--tickets--info"]}>
            <Typography className={styles["tickets--info--text"]}>
              Tickets
            </Typography>
            <Stack
              width={"100%"}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              spacing={1}
            >
              {data.tickets.map((ticket, index) => (
                <Typography
                  key={index}
                  className={styles["tickets--info--value"]}
                >
                  {ticket}
                </Typography>
              ))}
            </Stack>
          </Card>
          <RewardsInfoCard
            text="SR Points"
            value={data.srPoints}
            icon={SRIcon}
          />
        </Stack>
      </Stack>
      <Stack
        style={{ cursor: "pointer" }}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={1}
      >
        <Typography className={styles["text"]}>{"View on explorer"}</Typography>
        <SvgIcon
          component={RedirectIcon}
          inheritViewBox
          style={{
            width: "20px",
            height: "20px",
          }}
        />
      </Stack>
    </>
  );
}
