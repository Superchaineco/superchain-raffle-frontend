import {
  Autocomplete,
  Box,
  Modal,
  Stack,
  SvgIcon,
  TextField,
  Fade,
  Skeleton,
} from '@mui/material';
import CloseIcon from '@/public/images/close-icon.svg';
import PrizePotIcon from '@/public/images/trophy-icon.svg';
import EthIcon from '@/public/images/eth-icon.svg';
import SrIcon from '@/public/images/optimism.svg';
import TotalEntriesIcon from '@/public/images/tickets-icon-gray-dotted.svg';
import React, { useContext, useMemo, useState } from 'react';
import styles from './styles.module.css';
import { RaffleHistoryModalContext } from '@/views/DashBoard';
import RaffleInfo from '../RaffleCards/RaffleInfo';
import RaffleHistoryTable from './HistoryTable';
import { useGetRounds } from '@/hooks/useGetRounds';
import { formatEther, formatUnits } from 'viem';

export default function RaffleHistoryModal() {
  const { raffleHistoryModalState, setRaffleHistoryModalState } = useContext(
    RaffleHistoryModalContext
  );

  const currentRound = raffleHistoryModalState.currentRound;
  const [roundSelected, setRoundSelected] = useState(
    currentRound.toString()
  );

  const raffleRounds = useMemo(() => {
    const rounds = [];
    for (let i = 1; i <= currentRound; i++) {
      rounds.push({ label: `Round ${i}` });
    }
    return rounds;
  }, [currentRound]);

  const { data, loading } = useGetRounds(roundSelected);

  const handleClose = () => {
    setRaffleHistoryModalState({
      open: false,
      currentRound: raffleHistoryModalState.currentRound,
    });
  };

  return (
    <Modal
      open={raffleHistoryModalState.open}
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
      <Fade in={raffleHistoryModalState.open} timeout={500}>
        <Box className={styles['container--modal']}>
          <SvgIcon
            component={CloseIcon}
            onClick={handleClose}
            inheritViewBox
            style={{
              width: '12px',
              height: '12px',
              position: 'absolute',
              top: '20px',
              right: '20px',
              cursor: 'pointer',
            }}
          />
          <Stack spacing={2}>
            <h4 className={styles['title']}>Weekly Superchain Raffle</h4>
            <Autocomplete
              disableClearable
              disablePortal
              id='combo-box-demo'
              options={raffleRounds}
              defaultValue={raffleRounds[currentRound - 1]}
              className={styles['dropdown']}
              onChange={(event, value) => {
                setRoundSelected(value.label.split(' ')[1]);
              }}
              size='small'
              renderInput={(params) => <TextField {...params} />}
            />
            {!data || loading ? (
              <Stack direction={'row'} spacing={2}>
                <Skeleton />
                <Skeleton />
              </Stack>
            ) : (
              <>
                <Stack direction={'row'} spacing={2}>
                  <RaffleInfo
                    icon={PrizePotIcon}
                    primary='Prize pot'
                    secondary1={formatEther(BigInt(data?.round.prizeEth))}
                    secondary2={formatUnits(BigInt(data?.round.prizeOp), 18)}
                    iconS1={EthIcon}
                    iconS2={SrIcon}
                    noMainCard={false}
                  />
                  <RaffleInfo
                    icon={TotalEntriesIcon}
                    primary='Total entries'
                    secondary1={data.round.ticketsSold + '/' + 250}
                    noMainCard={false}
                  />
                </Stack>
                <RaffleHistoryTable winners={data.round.winners} />
              </>
            )}
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}
