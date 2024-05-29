import styles from "./styles.module.css";

function PurchaseTickets() {
  return (
    <div
      className={`${styles["container--all"]} ${styles["container--all--dark"]}`}
    >
      <div className={styles["container--content"]}>
        <h3 style={{ margin: "0px" }}>Purchase tickets</h3>
        <p>
          You can purchase up to <strong> 9 </strong> more tickets this round.
        </p>
      </div>
      <button className={styles["button--connect"]}>Connect</button>
    </div>
  );
}

export default PurchaseTickets;
