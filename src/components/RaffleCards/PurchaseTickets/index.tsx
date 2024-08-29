import { Stack, Typography } from "@mui/material";
import styles from "./styles.module.css";
import PurchaseTicketsInput from "./Input";
import { useContext } from "react";
import { TicketsContext } from "../Raffle";

type Props = {
  wallet: boolean;
};

function PurchaseTickets({ wallet }: Props) {
  const ticketsContext = useContext(TicketsContext);
  return (
    <div
      className={`${styles["container--all"]} ${styles[`${wallet ? "container--all--blue" : "container--all--dark"}`]}`}
    >
      <h3 style={{ margin: "0px" }}>Purchase tickets</h3>
      {!wallet && (
        <>
          <p className={styles["text"]}>
            You need to connect your wallet before you can proceed with claiming
            your tickets.
          </p>
          <button className={styles["button--connect"]}>Connect</button>
        </>
      )}
      {wallet && (
        <>
          <p className={styles["text"]}>
            You can purchase up to <strong> {ticketsContext.state.max} </strong>{" "}
            more tickets this round.
          </p>
          <Stack spacing={1}>
            <PurchaseTicketsInput />
            <Stack
              className={styles["container--purchase--info"]}
              direction="row"
              justifyContent={"space-between"}
              spacing={2}
            >
              <Stack direction={"row"} alignItems={"center"} spacing={0.2}>
                <p>Price: </p>
                <Typography className={styles["purchase-tickets--value"]}>
                  0.002
                </Typography>
                <p>ETH</p>
              </Stack>
              <Stack direction={"row"} alignItems={"center"} spacing={0.2}>
                <p>Total: </p>
                <Typography className={styles["purchase-tickets--value"]}>
                  0.000
                </Typography>
                <p>ETH</p>
              </Stack>
            </Stack>
          </Stack>
        </>
      )}
    </div>
  );
}

export default PurchaseTickets;
