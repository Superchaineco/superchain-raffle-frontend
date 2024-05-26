'use client';

import Optimisim from "@/public/images/optimisim-icon.svg";
import Mode from "@/public/images/mode-icon.svg";
import Base from "@/public/images/base-icon.svg";
import React from "react";
import styles from "../../styles/views/dashBoard.module.css";
import { RaffleCard, RewardsCard, TopInfo } from "@/components";
import { ProfileCard } from "@/components/ProfileCard";

function DashBoard() {
  return (
    <div className={styles['container--all']}>
      {/* <TopInfo eth='0.01' ethBonus='0.004' /> */}

      <div className={styles['container--raffle-cards']}>
        <RaffleCard
          raffleCardText='48 Hour OP Raffle'
          raffleCardChipsText={{ left: 0.002, right: 'Optimisim' }}
          chipColor='red'
          entriesColor='blue'
          endsIn='1d: 01h: 22m'
          prizePot='0.05🎉 + 100🎉'
          totalEntries='34/250'
          entries='1'
            networkIcon={Optimisim}
        />
        <RaffleCard
          raffleCardText='48 Hour OP Raffle'
          raffleCardChipsText={{ left: 0.002, right: 'Base' }}
          chipColor='blue'
          entriesColor='opaque'
          endsIn='1d: 01h: 22m'
          prizePot='0.05🎉 + 100🎉'
          totalEntries='34/250'
          entries='1'
            networkIcon={Base}
        />
        <RaffleCard
          raffleCardText='48 Hour OP Raffle'
          raffleCardChipsText={{ left: 0.002, right: 'Mode' }}
          chipColor='yellow'
          entriesColor='opaque'
          endsIn='1d: 01h: 22m'
          prizePot='0.05🎉 + 100🎉'
          totalEntries='34/250'
          entries='1'
            networkIcon={Mode}
        />
      </div>
      <div className={styles['container--profile-rewards']}>
        <ProfileCard
          rank={3}
          userHash='0xD0be...051e'
          eth={0.12}
          srp={150}
          entries={12}
        />
        <RewardsCard
          optimisimEth={0.05}
          optimisimSrp={25}
          baseEth={0.05}
          baseSrp={25}
          modeEth={0.0}
          modeSrp={0}
        />
      </div>
    </div>
  );
}
export { DashBoard };
