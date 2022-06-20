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
          <EthereumVault successCallback={props.successCallback} />
        </Grid>
      }
      {sol &&
        <Grid item xs={12}>
          <SolanaVault successCallback={props.successCallback} />
        </Grid>
      }
      {!anyProviderAvailable &&
        <Grid item xs={12} justifyContent="center">
          <Typography variant="p" color="inherit" className="wrap-text">
            Please visit this site with a browser that has an ethereum or solana wallet available.
          </Typography>
        </Grid>
      }
    </Grid>
  )
}
