import React from "react";
import styles from "./styles.module.css";
import TicketImg from "@/public/images/ticket-white-img.svg";
import { Grid, SvgIcon } from "@mui/material";

type Props = {
  tickets: number;
};

function MyTickets({ tickets }: Props) {
  return (
    <div
      className={`${styles["container--all"]} ${tickets > 0 ? styles["container--all--blue"] : styles["container--all--dark"]}`}
    >
      <h2 style={{ margin: "0px" }}>My Tickets</h2>
      {tickets == 0 && (
        <p className={styles["text"]}>You have not bought any tickets yet 0.</p>
      )}
      <Grid container spacing={1} style={{ width: "100%", margin: 0 }}>
        {tickets > 0 &&
          Array.from({ length: tickets }, (_, i) => i + 1).map((index) => (
            <Grid item xs={3}>
              <div className={styles["container--ticket"]}>
                <p>{index}</p>
                <SvgIcon
                  component={TicketImg}
                  inheritViewBox
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    cursor: "default",
                  }}
                />
              </div>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default MyTickets;
