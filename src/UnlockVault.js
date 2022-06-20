import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import {EthereumVault} from './EthereumVault';
import {ethereumAvailable} from './EthereumUtils';
import {SolanaVault} from './SolanaVault';
import {solanaAvailable} from './SolanaUtils';

export function UnlockVault(props) {
  const eth = ethereumAvailable();
  const sol = solanaAvailable();

  const anyProviderAvailable = eth || sol;

  return (
    <Grid container rowSpacing={2} sx={{mt: 1}} align="center">
      {eth &&
        <Grid item xs={12}>
          <EthereumVault notify={props.notify} successCallback={props.successCallback} />
        </Grid>
      }
      {sol &&
        <Grid item xs={12}>
          <SolanaVault notify={props.notify} successCallback={props.successCallback} />
        </Grid>
      }
      {!anyProviderAvailable &&
        <Grid item xs={12} justifyContent="center">
          <Typography variant="p" color="inherit" className="wrap-text">
            Please visit this site with a browser that has an ethereum or solana wallet available.
            Alternatively, if you have phantom installed on your mobile device, click <a href={phantomURL()}>here</a>.
          </Typography>
        </Grid>
      }
    </Grid>
  )
}

function phantomURL() {
  return "https://phantom.app/ul/browse/https%3A%2F%2Ftrustborder.github.io%2Fweb3-password-manager?ref=https%3A%2F%2Ftrustborder.github.io"
}
