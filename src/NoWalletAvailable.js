import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import {PhantomIcon} from './PhantomIcon';

export function NoWalletAvailable() {
  return (
    <React.Fragment>
      <Typography variant="h3" color="inherit" noWrap>
        No wallet found
      </Typography>
      <Typography variant="p" color="inherit" className="wrap-text">
        Please visit this site with a browser that has an ethereum or solana wallet available.
        Alternatively, select your installed mobile wallet below.
      </Typography>
      <Stack spacing={2}>
        <Button startIcon={<PhantomIcon />} href={phantomURL()} variant="contained">
          Phantom
        </Button>
        <Button href={coinbaseURL()} variant="contained">
          Coinbase Wallet 
        </Button>
      </Stack>
    </React.Fragment>
  )
}

function phantomURL() {
  return "https://phantom.app/ul/browse/" + encodeURIComponent(process.env.REACT_APP_HOST + process.env.REACT_APP_URL_BASE) + "?ref=" + encodeURIComponent(process.env.REACT_APP_HOST);
}

function coinbaseURL() {
  return "https://go.cb-w.com/dapp?cb_url=" + encodeURIComponent(process.env.REACT_APP_HOST + process.env.REACT_APP_URL_BASE);
}
