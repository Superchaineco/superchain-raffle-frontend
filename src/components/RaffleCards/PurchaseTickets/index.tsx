import styles from "./styles.module.css";

type Props = {
  wallet: any;
};

function PurchaseTickets({ wallet }: Props) {
  return (
    <div
      className={`${styles["container--all"]} ${styles[`${wallet ? "container--all--blue" : "container--all--dark"}`]}`}
    >
      <h3 style={{ margin: "0px" }}>Purchase tickets</h3>
      <p className={styles["text"]}>
        You can purchase up to <strong> 9 </strong> more tickets this round.
      </p>
      {!wallet && (
        <>
          <button className={styles["button--connect"]}>Connect</button>
        </>
      )}
      {wallet && (
        <>
        
        </>
      )}
    </div>
  );
}

export default PurchaseTickets;
