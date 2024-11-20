import { Grid, Stack, SvgIcon, Typography } from '@mui/material';
import EthIcon from '@/public/images/eth-icon.svg';
import SrIcon from '@/public/images/optimism.svg';
import TicketsIcon from '@/public/images/tickets-icon-blue.svg';
import React from 'react';
import styles from './styles.module.css';
import { checksumAddress, formatUnits, formatEther } from 'viem';

type Props = {
  winners: {
    user: {
      id: `0x${string}`;
    };
    ticketNumber: string;
    ethAmount: string;
    opAmount: string;
  }[];
};

export default function RaffleHistoryTable({ winners }: Props) {
  if (winners.length === 0) {
    return (
      <Typography textAlign="center" variant="h6">
        No winners yet
      </Typography>
    );
  }

  return (
    <Stack
      className={styles['container--all']}
      spacing={2}
      paddingY={1}
      sx={{
        overflow: 'auto', 
        minWidth: '100%', 
      }}
    >
      {winners.map((winner, index) => (
        <Grid
          container
          key={index}
          alignItems="center"
          justifyContent="space-between"
          px={2}
          py={1}
          sx={{
            minWidth: '100%', 
            flexWrap: 'nowrap', 
          }}
          gap={2}
        >
          <Grid
            item
            xs={12}
            sm={5}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexGrow: 1,
              minWidth: 0, 
            }}
          >
            <div
              className={`${styles['container--rank']} ${styles[`rank--${index <= 2 ? index + 1 : 'off-podium'}`]}`}
            >
              <Typography margin={0} className={styles['text-rank']}>
                {index + 1}
              </Typography>
            </div>
            <Typography
              margin={0}
              className={styles['text-rank']}
              noWrap
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {checksumAddress(winner.user.id).substring(0, 6)}...
              {checksumAddress(winner.user.id).slice(-3)}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sm={7}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 4,
              flexGrow: 2,
              minWidth: 0, 
            }}
          >
            {/* Tickets */}
            <Stack direction="row" alignItems="center" gap={1} flexGrow={1} minWidth={0}>
              <Typography className={styles['text-rank']}>{winner.ticketNumber}</Typography>
              <SvgIcon
                component={TicketsIcon}
                inheritViewBox
                style={{
                  width: '20px',
                  height: '16px',
                }}
              />
            </Stack>

            {/* ETH Amount */}
            <Stack direction="row" alignItems="center" gap={0.5} flexGrow={1} minWidth={0}>
              <Typography className={styles['text-rank']}>
                {formatEther(BigInt(winner.ethAmount))}
              </Typography>
              <SvgIcon
                component={EthIcon}
                inheritViewBox
                style={{
                  width: '20px',
                  height: '16px',
                }}
              />
            </Stack>

            {/* OP Amount */}
            <Stack direction="row" alignItems="center" gap={1} flexGrow={1} minWidth={0}>
              <Typography className={styles['text-rank']}>
                {formatUnits(BigInt(winner.opAmount), 18)}
              </Typography>
              <SvgIcon
                component={SrIcon}
                inheritViewBox
                style={{
                  width: '20px',
                  height: '16px',
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      ))}
    </Stack>
  );
}
