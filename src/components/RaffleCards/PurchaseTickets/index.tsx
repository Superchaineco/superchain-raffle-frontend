import { Stack } from "@mui/material";
import styles from "./styles.module.css";
import PurchaseTicketsInput from "./Input";

type Props = {
  wallet: any;
  maxCuantity: number;
};

function PurchaseTickets({ wallet, maxCuantity }: Props) {
  return (
    <div
      className={`${styles["container--all"]} ${styles[`${wallet ? "container--all--blue" : "container--all--dark"}`]}`}
    >
      <h3 style={{ margin: "0px" }}>Purchase tickets</h3>
      <p className={styles["text"]}>
        You can purchase up to <strong> {maxCuantity} </strong> more tickets
        this round.
      </p>
      {!wallet && (
        <>
          <button className={styles["button--connect"]}>Connect</button>
        </>
      )}
      {wallet && (
        <Stack>
          <PurchaseTicketsInput maxCuantity={maxCuantity} />
        </Stack>
      )}
    </div>
  );
}

export default PurchaseTickets;
