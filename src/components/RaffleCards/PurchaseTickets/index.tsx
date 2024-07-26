import { Stack } from "@mui/material";
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
      <p className={styles["text"]}>
        You can purchase up to <strong> {ticketsContext.state.max} </strong>{" "}
        more tickets this round.
      </p>
      {!wallet && (
        <>
          <button className={styles["button--connect"]}>Connect</button>
        </>
      )}
      {wallet && (
        <Stack>
          <PurchaseTicketsInput />
        </Stack>
      )}
    </div>
  );
}

export default PurchaseTickets;
