import React from 'react'
import { SvgIcon } from '@mui/material'
import { LeaderBoardAccountType } from '@/types/commons'
import EthIcon from '@/public/images/profile-info-eth-icon.svg'
import SrIcon from '@/public/images/profile-info-sr-icon.svg'
import styles from "./styles.module.css"

type Props = {
  account: LeaderBoardAccountType
}

function UserLeaderBoardCard({account }: Props) {
  return (
    <div className={styles["container--all"]}>
      <div className={styles["container--rank"]}>
        <p>{account.position}</p>
      </div>
      <div className={styles["container--user"]}>
        <span></span>
        <p>{account.address}</p>
      </div>
      <div className={styles["container--super-chain--points"]}>
        <div className={styles["container--super-chain--point"]}>

          <SvgIcon
            component={EthIcon}
            inheritViewBox
            style={{
              width: "20px",
              height: "16px",
              cursor: "pointer",
            }}
          />
        </div>
        <div className={styles["container--super-chain--point"]}>
          <SvgIcon
            component={SrIcon}
            inheritViewBox
            style={{
              width: "20px",
              height: "16px",
              cursor: "pointer",
            }}
          />

        </div>
        <div className={styles["container--super-chain--point"]}>
          <SvgIcon
            component={SrIcon}
            inheritViewBox
            style={{
              width: "20px",
              height: "16px",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default UserLeaderBoardCard