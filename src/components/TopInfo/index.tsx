'use client';

import React from "react";
import { Paper } from "@mui/material";

type TopInfoProps = {
  eth: string;
  ethBonus: string;
}

function TopInfo ({eth, ethBonus }: TopInfoProps){
  return (
    <Paper elevation={3} className="container--top-info">
      SoyUnPapelito
    </Paper>
  )
}