import {React, useState} from 'react';
import Button from '@mui/material/Button';

import {getAccount, signTypedMessage} from './EthereumUtils';

export function EthereumVault(props) {
  const [disableButton, setDisableButton] = useState(false);

  const handleUnlockVault = (event) => {
    setDisableButton(true);

    let account = getAccount();
    let signingMessage = getSigningMessage("Dummy Message");
    account.then(account => {
      signTypedMessage([account, JSON.stringify(signingMessage)]).then(signature => {
        props.successCallback(signature);
        setDisableButton(false);
      }).catch(err => {
        console.log("Failed to sign message:", err);
        setDisableButton(false);
      });
    });
  };

  return (
    <Button fullWidth disabled={disableButton} variant="contained" onClick={handleUnlockVault}>
      Unlock Ethereum Vault
    </Button>
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
