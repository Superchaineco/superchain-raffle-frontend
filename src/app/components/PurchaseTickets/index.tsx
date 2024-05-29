import styles from "./styles.module.css"

function PurchaseTickets() {
  return (
    <div className={styles["container--all"]}>
      <h3>Purchase tickets</h3>
      <p>You can purchase up to <strong> 9 </strong>  more tickets this round.</p>
    </div>

  )
}

export default PurchaseTickets