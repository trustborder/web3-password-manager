import Grid from '@mui/material/Grid';

import {EthereumVault} from './EthereumVault';
import {ethereumAvailable} from './EthereumUtils';
import {SolanaVault} from './SolanaVault';
import {solanaAvailable} from './SolanaUtils';
import {NoWalletAvailable} from './NoWalletAvailable';

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
        <Grid item xs={12}>
          <NoWalletAvailable />
        </Grid>
      }
    </Grid>
  )
}
