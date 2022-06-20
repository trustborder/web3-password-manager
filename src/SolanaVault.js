import {React, useState} from 'react';
import Button from '@mui/material/Button';

import {connect, signMessage} from './SolanaUtils';

export function SolanaVault(props) {
  const [disableButton, setDisableButton] = useState(false);

  const handleUnlockVault = (event) => {
    setDisableButton(true);

    let account = connect();
    account.catch(err => {
      console.log(err);
      props.notify("error", "Failed to connect to solana: " + err.message);
      setDisableButton(false);
    });

    let signingMessage = getSigningMessage("Dummy Message");
    account.then(() => {
      signMessage(signingMessage).then(signature => {
        props.successCallback(signature.signature);
        setDisableButton(false);
      }).catch(err => {
        console.log(err);
        props.notify("error", "Failed to sign message: " + err.message);
        setDisableButton(false);
      });
    });
  };

  return (
    <Button fullWidth disabled={disableButton} variant="contained" onClick={handleUnlockVault}>
      Unlock Solana Vault
    </Button>
  )
}

function getSigningMessage(masterPassword) {
  return masterPassword
}
