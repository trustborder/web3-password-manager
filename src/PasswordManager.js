import React, {useState} from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import {extractDomain, generateByteData, projectOntoCharacterSet} from './PasswordUtils';
import {Disclaimer} from './Disclaimer';
import {HowToUse} from './HowToUse';

export function PasswordManager(props) {
  const [domain, setDomain] = useState("");

  const handleChange = (event) => {
    setDomain(event.target.value);
  }

  const handleGeneratePassword = (event) => {
    let salt = domain;
    let updatedSnackbar = {severity: "success", message: "Password copied"}
    try {
      salt = extractDomain(domain);
    } catch(err) {
      updatedSnackbar = {severity: "warning", message: "Password copied for invalid domain"};
    }

    let byteData = generateByteData(props.passwordSignature, salt, 40);
    let password = projectOntoCharacterSet(byteData, [], 40);

    window.navigator.clipboard.writeText(password).then(() => {
      props.notify(updatedSnackbar.severity, updatedSnackbar.message);
      setDomain("");
    }).catch(err => {
      console.log(err);
      props.notify("error",  "Failed to copy password: " + err.message);
    });
  }

  return (
    <Box>
      <TextField fullWidth label="URL or domain" variant="outlined" sx={{ mt: 2 }} value={domain} onChange={handleChange} />
      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleGeneratePassword}>
        Copy Password 
      </Button>
      <Disclaimer />
      <HowToUse />
    </Box>
  )
}
