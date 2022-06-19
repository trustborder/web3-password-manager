import React, {useState} from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';

import {extractDomain, generateByteData, projectOntoCharacterSet} from './PasswordUtils';
import {Disclaimer} from './Disclaimer';
import {HowToUse} from './HowToUse';

export function PasswordManager(props) {
  const [domain, setDomain] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "Password copied",
  })

  const handleChange = (event) => {
    setDomain(event.target.value);
  }

  const handleGeneratePassword = (event) => {
    let salt = domain;
    let updatedSnackbar = {open: true, severity: "success", message: "Password copied"}
    try {
      salt = extractDomain(domain);
    } catch(err) {
      updatedSnackbar = {open: true, severity: "warning", message: "Password copied for invalid domain"};
    }

    let byteData = generateByteData(props.web3, props.passwordSignature, salt);
    let password = projectOntoCharacterSet(byteData, []);

    window.navigator.clipboard.writeText(password).catch(err => console.log(err));

    setSnackbar({...snackbar, ...updatedSnackbar});
    setDomain("");
  }

  const handleSnackbarClose = (event) => setSnackbar({...snackbar, open: false});

  return (
    <Box>
      <TextField fullWidth label="URL or domain" variant="outlined" sx={{ mt: 2 }} value={domain} onChange={handleChange} />
      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleGeneratePassword}>
        Copy Password 
      </Button>
      <Disclaimer />
      <HowToUse />
      <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <Alert severity={snackbar.severity} onClose={handleSnackbarClose} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
