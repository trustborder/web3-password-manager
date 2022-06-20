import React, {useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import {extractDomain, generateByteData, projectOntoCharacterSet} from './PasswordUtils';
import {Disclaimer} from './Disclaimer';
import {HowToUse} from './HowToUse';

export function PasswordManager(props) {
  const [domain, setDomain] = useState("");
  const [password, setPassword] = useState("");
  const [passwordInputType, setPasswordInputType] = useState("text");
  const [displayCopyButton, setDisplayCopyButton] = useState(false);

  useEffect(() => {
    try {
      let salt = extractDomain(domain);
      let byteData = generateByteData(props.passwordSignature, salt, 40);

      setPassword(projectOntoCharacterSet(byteData, [], 40));
    } catch (err) {}
  }, [domain, props.passwordSignature]);

  let notify = props.notify
  useEffect(() => {
    try {
      window.navigator.permissions.query({name: "clipboard-write"}).then(result => {
        setDisplayCopyButton(result.state === "granted");
      }).catch(err => {
        notify("error", "Can't query permissions: " + err.message);
      });
    } catch (err) {
      // Mobile wallets don't have a permissions object under navigator
      console.log(err);
    }
  }, [notify]);

  const handleDomainChange = (event) => {
    setDomain(event.target.value);
  };

  const handleCopyPassword = (event) => {
    window.navigator.clipboard.writeText(password).then(() => {
      props.notify("success", "Password copied");
    }).catch(err => {
      console.log(err);
      props.notify("error",  "Failed to copy password: " + err.message);
    });
  }

  const handlePasswordHover = (event) => {
    setPasswordInputType((!displayCopyButton || event.type === "mouseover") ? "text" : "password"); 
  };

  return (
    <Box>
      <Grid container spacing={2} sx={{mt: 1}}>
        <Grid item xs={12}>
          <TextField fullWidth size="small" label="URL or domain" variant="outlined" value={domain} onChange={handleDomainChange} />
        </Grid>
        <Grid item xs>
          <TextField fullWidth readOnly size="small" type={passwordInputType} onMouseOut={handlePasswordHover} onMouseOver={handlePasswordHover} value={password} />
        </Grid>
        {displayCopyButton && <Grid item alignItems="stretch" style={{display: "flex"}} xs={3}>
          <Button fullWidth variant="contained" onClick={handleCopyPassword} endIcon={<ContentCopyIcon />}>
            Copy Password
          </Button>
        </Grid>}
      </Grid>
      <Disclaimer />
      <HowToUse />
    </Box>
  )
}
