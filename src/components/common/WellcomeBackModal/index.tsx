import {
  Box,
  Button,
  Fade,
  Modal,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from '@mui/material';
import WellcomeBackImg from '@/public/images/welcome-back-img.svg';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import RewardsInfoCard from '../RewardsInfoCard';
import ETHIcon from '@/public/images/eth-icon.svg';
import SRIcon from '@/public/images/optimism.svg';
import MyTicketsIcon from '@/public/images/tickets-icon-opaque.svg';
import CloseIcon from '@/public/images/close-icon.svg';
import styles from './styles.module.css';
import WellcomeBackModalTicketsToolTip from './TicketsToolTip';
import useGetClaimablePrizes from '@/hooks/useGetClaimablePrizes';
import useGetRaffles from '@/hooks/useGetRaffles';
import useGetRoundDetails from '@/hooks/useGetRoundDetails';
import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk';
import { Address, encodeFunctionData, formatEther } from 'viem';
import { useGetWinningTickets } from '@/hooks/useGetWinningTickets';
import { SUPER_CHAIN_RAFFLE_ABI } from '@/constants';
import { ActionModalStatus } from '@/types/commons';
import { Interface } from 'ethers';
import { ActionModalContext } from '@/views/DashBoard';
import { useQueryClient } from '@tanstack/react-query';

function WellcomeBackModal() {
  const { safe, sdk } = useSafeAppsSDK();
  const { data: rafflesData } = useGetRaffles();
  const { data: claimablePrizes, status: claimablePrizesStatus  } =
    useGetClaimablePrizes(
      rafflesData?.raffles[0].id as Address,
      safe.safeAddress as Address
    );
  const queryClient = useQueryClient();
  const { actionModalContextState, setActionModalContextState } =
    useContext(ActionModalContext);
  const previousRoundId = useMemo(() => {
    const initRaffleTimestamp = rafflesData?.raffles[0].initTimestamp;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const secondsPerRound = 604800;
    const previousRoundNumber = Math.floor(
      (currentTimestamp - Number(initRaffleTimestamp)) / secondsPerRound
    );
    return previousRoundNumber.toString();
  }, [rafflesData]);

  const { data: roundDetails } = useGetRoundDetails(
    rafflesData?.raffles[0].id as Address,
    previousRoundId
  );

  const { data: winningTicketsData } = useGetWinningTickets(
    safe.safeAddress as Address,
    previousRoundId
  );

  const isClaimable = useMemo(() => {
    return (
      claimablePrizes &&
      (BigInt(claimablePrizes[0]) > BigInt(0) ||
        BigInt(claimablePrizes[1]) > BigInt(0))
    );
  }, [claimablePrizes]);

  const [open, setOpen] = useState(false);
  const handleClose = async () => {
    setOpen(false);
    setActionModalContextState({
      open: true,
      title: "Reeling in Your Rewards",
      loadComponent: <></>,
      status: ActionModalStatus.LOADING,
      contentComponent: <></>,
    });
    try {
      const iface = new Interface(SUPER_CHAIN_RAFFLE_ABI);
      const calldata = iface.encodeFunctionData("claim");
      const txs = [
        {
          to: rafflesData?.raffles[0].id as Address,
          value: '0',
          data: calldata,
        },
      ];
      try {
        const transaction = await sdk.txs.send({ txs });
        let transactionConfirmed = false;
        let maxRetries = 10;
        while (!transactionConfirmed && maxRetries > 0) {
          const status = await sdk.txs.getBySafeTxHash(transaction.safeTxHash);
          if (status.txStatus == "SUCCESS") {
            transactionConfirmed = true;
          } else {
            await new Promise((resolve) => setTimeout(resolve, 5000));
            maxRetries--;
          }
        }
        if (transactionConfirmed) {
          setActionModalContextState({
            open: true,
            title: "Rewards Claimed!",
            loadComponent: <></>,
            status: ActionModalStatus.SUCCESS,
            contentComponent: <></>,
          });
          queryClient.invalidateQueries({ queryKey: ['claimablePrizes'] });
        }
      } catch (e) {
        setActionModalContextState({
          open: true,
          title: "Something went wrong",
          loadComponent: <></>,
          status: ActionModalStatus.ERROR,
          contentComponent: <></>,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    if (isClaimable) {
      setOpen(true);
    }
  }, [isClaimable]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        },
      }}
    >
      <Fade in={open} timeout={500}>
        <Box className={styles['container--modal']}>
          <SvgIcon
            component={CloseIcon}
            onClick={handleClose}
            inheritViewBox
            style={{
              width: '12px',
              height: '12px',
              position: 'absolute',
              top: '12px',
              right: '12px',
              cursor: 'pointer',
            }}
          />
          <Stack
            direction={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            className={styles['container--content']}
            padding={4}
          >
            <Typography id='modal-modal-title' variant='h2' component='h2'>
              Welcome back!
            </Typography>
            <SvgIcon
              component={WellcomeBackImg}
              inheritViewBox
              style={{ width: '120px', height: '120px' }}
            />
            <Stack direction={'row'} spacing={0.5} paddingTop={1}>
              <Typography className={styles['text--while']}>
                While you were away,
              </Typography>
              <Typography className={styles['text--while--strong']}>
                you&apos;ve won:
              </Typography>
            </Stack>
            <Stack
              direction={'row'}
              spacing={1.5}
              justifyContent={'center'}
              alignItems={'center'}
              width={'100%'}
              paddingX={4}
              paddingY={2}
            >
              <RewardsInfoCard
                text='ETH'
                value={
                  claimablePrizes ? formatEther(BigInt(claimablePrizes[0])) : 0
                }
                icon={ETHIcon}
              />
              <RewardsInfoCard
                text='OP'
                value={
                  claimablePrizes ? formatEther(BigInt(claimablePrizes[1])) : 0
                }
                icon={SRIcon}
              />
            </Stack>
            <Tooltip
              title={
                <WellcomeBackModalTicketsToolTip
                  winningTickets={[
                    {
                      raffleName: 'Weekly OP Raffle',
                      tickets: winningTicketsData?.round.winningTickets || [],
                    },
                  ]}
                />
              }
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 200 }}
              arrow
              placement='top'
            >
              <Button
                className={styles['text--my-tickets']}
                endIcon={
                  <SvgIcon
                    component={MyTicketsIcon}
                    inheritViewBox
                    style={{ width: '20px', height: '20px' }}
                  />
                }
              >
                My Winning Tickets
              </Button>
            </Tooltip>
          </Stack>
          <Button
            className={styles['button--claim-rewards']}
            variant='text'
            onClick={handleClose}
          >
            Claim Rewards
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}

export default WellcomeBackModal;
