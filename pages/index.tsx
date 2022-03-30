import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography
} from '@material-ui/core';
import AutorenewIcon from '@material-ui/icons/Autorenew';

import WalletConnectConfirm from '../components/modal/walletconnectconfirm';
import useStyles, { TextInput, Button } from "../public/styles/index";
import { hooks, metaMask } from '../connector/metaMask'

const { useChainId, useAccounts, useError, useIsActivating, useIsActive, useProvider, useENSNames } = hooks

const Home: NextPage = () => {
  const [nep, setNep] = useState('');
  const [bsc, setBsc] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);
  const chainId = useChainId()
  const accounts = useAccounts();
  const isActive = useIsActive();
  const isActivating = useIsActivating();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);
  var classes = useStyles();

  useEffect(() => {
    void metaMask.connectEagerly()
  }, [])

  const handleChangeNep = (e:any) => {
    setNep(e.target.value);
    const newBsc = parseFloat(e.target.value) * 3;
    setBsc(newBsc.toFixed(2));
  }

  const handleChangeBsc = (e:any) => {
    const newNep = parseFloat(e.target.value) / 3;
    setNep(newNep.toFixed(2));
    setBsc(e.target.value);
  }
  
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  }

  const handleConnect = () => {
    metaMask.activate(undefined);
  }

  const handleDisconnect = () => {
    metaMask.deactivate(); 
  }

  const handleCheckWallet = () => {
    setOpenConfirm(true);
  }

  return (
    <Box className={classes.body}>
      <Container maxWidth="sm" className={classes.container}>
        <Box className={classes.header}>
          <Typography variant="h3">Neptune Mutural</Typography>
        </Box>
        <Card>
          <CardContent className={classes.cardContent}>
            <Box className={classes.cardHeader}>
              <Typography variant="h4">Crypto Converter</Typography>
            </Box>
            <Box className={classes.cardBody}>
              <Typography variant="subtitle1">NEP</Typography>
              <TextInput type="number" inputProps={{ 'aria-label': 'NEP' }} value={nep} onChange={handleChangeNep} />
              <Box className={classes.swapWrapper}>
                <AutorenewIcon />
              </Box>
              <Typography variant="subtitle1">BSC</Typography>
              <TextInput type="number" inputProps={{ 'aria-label': 'BSC' }} value={bsc} onChange={handleChangeBsc} />
              <Box className={classes.btnWrapper}>
                <Button color="primary" onClick={handleCheckWallet}>Check Wallet Details</Button>
              </Box>
              <WalletConnectConfirm
                open={openConfirm}
                chainId={chainId}
                isActive={isActive}
                isActivating={isActivating}
                accounts={accounts}
                provider={provider}
                ENSNames={ENSNames}
                handleClose={handleCloseConfirm}
                handleConnect={handleConnect}
                handleDisconnect={handleDisconnect}
              />
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default Home
