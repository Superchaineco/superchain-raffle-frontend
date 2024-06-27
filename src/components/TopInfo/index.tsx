"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Chip } from "@mui/material";
import { motion } from "framer-motion";

type TopInfoProps = {
  eth: string;
  ethBonus: string;
};

function TopInfo({ eth, ethBonus }: TopInfoProps) {
  const [isShowed, setIsShowed] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowed(false);
    }, 5000);
    return () => clearTimeout(timer);
  });
  return (
    <motion.div
      initial={{ transform: "translateY(-80px)" }}
      animate={{
        transform: isShowed ? "translateY(0px)" : "translateY(-80px)",
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.2,
      }}
      className={styles["container--top-info"]}
    >
      <p className={styles["main-text"]}>Op Collective contribution</p>
      <Chip
        label={`${eth} ETH`}
        className={styles["eth-chip"]}
        color="default"
      ></Chip>
      <p className={styles["eth-bonus"]}>{`+${ethBonus} ETH/24h`}</p>
    </motion.div>
  );
}

export default TopInfo;
