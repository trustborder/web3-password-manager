import Grid from '@mui/material/Grid';

import {EthereumVault} from './EthereumVault';
import {ethereumAvailable} from './EthereumUtils';
import {SolanaVault} from './SolanaVault';
import {solanaAvailable} from './SolanaUtils';

export function UnlockVault(props) {
  const eth = ethereumAvailable();
  const sol = solanaAvailable();

  const anyProviderAvailable = eth || sol;

  return (
    <Grid container rowSpacing={2} sx={{mt: 1}}>
      {eth &&
        <Grid item xs={12}>
          <EthereumVault successCallback={props.successCallback} />
        </Grid>}
      {sol &&
        <Grid item xs={12}>
          <SolanaVault successCallback={props.successCallback} />
        </Grid>}
    </Grid>
  )
}
