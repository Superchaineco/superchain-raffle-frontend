import { Stack, Typography } from '@mui/material';
import styles from './styles.module.css';
import PurchaseTicketsInput from './Input';

type Props = {
  isMaximumReached: boolean;
  isConnected: boolean;
  max: number;
  currentEntries: number;
};

function PurchaseTickets({
  isMaximumReached,
  isConnected,
  max,
  currentEntries,
}: Props) {
  return (
    <div
      className={`${styles['container--all']} ${styles[`${isConnected && !isMaximumReached ? 'container--all--blue' : 'container--all--dark'}`]}`}
    >
      <h3 style={{ margin: '0px' }}>Claim tickets</h3>
      {!isConnected && (
        <>
          <p className={styles['text']}>
            You need to connect your wallet before you can proceed with claiming
            your tickets.
          </p>
          <button className={styles['button--connect']}>Connect</button>
        </>
      )}
      {isConnected && (
        <>
          <p className={styles['text']}>
            {isMaximumReached ? (
              'You can claim tickets again when this round is over.'
            ) : (
              <>
                You can claim up to <strong>{max - currentEntries}</strong> more
                tickets this week.
              </>
            )}
          </p>

          <Stack spacing={1}>
            <PurchaseTicketsInput max={isMaximumReached ? 0 : max - currentEntries} />
            <Stack
              className={styles['container--purchase--info']}
              direction='row'
              justifyContent={'space-between'}
              spacing={2}
            >
              <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
                <p>Price: </p>
                <Typography
                  fontWeight='600'
                  className={styles['purchase-tickets--value']}
                >
                  FREE
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </>
      )}
    </div>
  );
}

export default PurchaseTickets;
