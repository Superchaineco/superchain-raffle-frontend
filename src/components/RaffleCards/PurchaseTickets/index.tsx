import { Stack, Typography } from "@mui/material";
import styles from "./styles.module.css";
import PurchaseTicketsInput from "./Input";
import { useContext } from "react";
import { TicketsContext } from "../Raffle";

type Props = {
  isConnected: boolean;
};

function PurchaseTickets({ isConnected }: Props) {
  const ticketsContext = useContext(TicketsContext);
  return (
    <div
      className={`${styles["container--all"]} ${styles[`${isConnected ? "container--all--blue" : "container--all--dark"}`]}`}
    >
      <h3 style={{ margin: "0px" }}>Claim tickets</h3>
      {!isConnected && (
        <>
          <p className={styles["text"]}>
            You need to connect your wallet before you can proceed with claiming
            your tickets.
          </p>
          <button className={styles["button--connect"]}>Connect</button>
        </>
      )}
      {isConnected && (
        <>
          <p className={styles["text"]}>
            You can purchase up to <strong> {ticketsContext.state.max} </strong>{" "}
            more tickets this week.
          </p>
          <Stack spacing={1}>
            <PurchaseTicketsInput />
            <Stack
              className={styles["container--purchase--info"]}
              direction="row"
              justifyContent={"space-between"}
              spacing={2}
            >
              <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
                <p>Price: </p>
                <Typography fontWeight='600' className={styles["purchase-tickets--value"]}>
                  FREE
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </>
      )}
    </div>
  );
}

export default PurchaseTickets;
