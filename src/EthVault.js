import {React, useState} from 'react';

import {signTypedMessage} from './EthereumUtils';
import {getAccount} from './EthereumUtils';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export function EthVault(props) {
  const [disableButton, setDisableButton] = useState(false);

  const handleUnlockVault = (event) => {
    setDisableButton(true);
    let account = getAccount();
    let signingMessage = getSigningMessage("Dummy Message");
    account.then(account => {
      signTypedMessage([account, JSON.stringify(signingMessage)]).then(signature => {
        props.successCallback(signature);
      }).catch(err => {
        console.log("Failed to sign message:", err);
        setDisableButton(false);
      });
    });
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Button fullWidth disabled={disableButton} variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleUnlockVault}>
        Unlock Ethereum Vault
      </Button>
    </Box>
  )
}

function getSigningMessage(masterPassword) {
  return {
    "types": {
      "EIP712Domain": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "version",
          "type":"string"
        }
      ],
      "Message": [
        {
          "name": "Login",
          "type": "string"
        }
      ]
    },
    "primaryType": "Message",
    "domain": {
      "name": "web3-password-manager",
      "version": "1",
      "chainId": null,
      "verifyingContract": "",
      "salt": ""
    },
    "message": {
      "Login": masterPassword
    }
  }
}
