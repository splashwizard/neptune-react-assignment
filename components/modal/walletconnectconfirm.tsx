import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Box,
  Typography,
  CircularProgress
} from '@material-ui/core';
import type { MetaMask } from '@web3-react/metamask'
import type { Web3ReactHooks } from '@web3-react/core'
import { formatEther } from '@ethersproject/units'
import type { BigNumber } from '@ethersproject/bignumber'

import { Button } from "../../public/styles/index";
import useStyles from "./style";
import { useEffect, useState } from 'react';

function useBalances(
  provider?: ReturnType<Web3ReactHooks['useProvider']>,
  accounts?: string[]
): BigNumber[] | undefined {
  const [balances, setBalances] = useState<BigNumber[] | undefined>()

  useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false

      void Promise.all(accounts.map((account) => provider.getBalance(account))).then((balances) => {
        if (!stale) {
          setBalances(balances)
        }
      })

      return () => {
        stale = true
        setBalances(undefined)
      }
    }
  }, [provider, accounts])

  return balances
}

type WalletConnectConfirmProps = {
  open: boolean;
  chainId: ReturnType<Web3ReactHooks['useChainId']>;
  isActive: boolean;
  isActivating: boolean;
  accounts: ReturnType<Web3ReactHooks['useAccounts']>;
  provider: ReturnType<Web3ReactHooks['useProvider']>;
  ENSNames: ReturnType<Web3ReactHooks['useENSNames']>;
  handleClose: () => void;
  handleConnect: () => void;
  handleDisconnect: () => void;
}

const WalletConnectConfirm = ({
  open,
  chainId,
  isActive,
  isActivating,
  accounts,
  provider,
  ENSNames,
  handleClose,
  handleConnect,
  handleDisconnect
} : WalletConnectConfirmProps) => {
  const balances = useBalances(provider, accounts)
  var classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Wallet Details</DialogTitle>
      <DialogContent>
        {isActive ? (
          <Box className={classes.content}>
            <Box className={classes.itemWrapper}>
              <Typography variant="subtitle2" style={{fontWeight: 'bold'}}>KEY</Typography>
              <Typography variant="subtitle2" style={{fontWeight: 'bold'}}>VALUE</Typography>
            </Box>
            <Box className={classes.itemWrapper}>
              <Typography variant="subtitle1">Account</Typography>
              {accounts !== undefined && accounts.length > 0 && (
                <Typography variant="subtitle1">{ENSNames?.[0] ?? accounts[0]}</Typography>
              )}
            </Box>
            <Box className={classes.itemWrapper}>
              <Typography variant="subtitle1">Chain ID</Typography>
              <Typography variant="subtitle1">{chainId}</Typography>
            </Box>
            <Box className={classes.itemWrapper}>
              <Typography variant="subtitle1">Balance</Typography>
              {balances !== undefined && balances.length > 0 && (
                <Typography variant="subtitle1">{balances?.[0] ? `Ξ ${formatEther(balances[0])}` : null}</Typography>
              )}
            </Box>
          </Box>
        ) : (
          <DialogContentText id="alert-dialog-description">
            Wallet not connected. Please click the &quot;Connect Now&quot; button below.
          </DialogContentText>
        )}
      </DialogContent>
      {isActive ? (
        <DialogActions style={{padding: '16px', flexDirection: 'column'}}>
          <Button variant="contained" onClick={handleDisconnect} color="secondary" style={{width: '100%', marginLeft: 0}}>
            Disconnect
          </Button>
        </DialogActions>
      ) : (
        <DialogActions style={{padding: '16px'}}>
          <Button variant="contained" onClick={handleConnect} color="primary" style={{flex: 1}} autoFocus>
            {isActivating && (
              <CircularProgress
                size="14px"
                className={classes.progress}
              />
            )}
            Connect
          </Button>
          <Button variant="contained" onClick={handleClose} style={{flex: 1}}>
            Cancel
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default WalletConnectConfirm;