import React, {useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import {characterSetOptions, extractDomain, generateByteData, projectOntoCharacterSet} from './PasswordUtils';
import {Disclaimer} from './Disclaimer';
import {HowToUse} from './HowToUse';

export function PasswordManager(props) {
  const [domain, setDomain] = useState("");
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(32);
  const [characterSetSelector, setCharacterSetSelector] = useState(characterSetOptions.reduce((agg, value) => ({...agg, [value]: false}), {}));
  const [passwordInputType, setPasswordInputType] = useState("text");
  const [displayCopyButton, setDisplayCopyButton] = useState(false);

  useEffect(() => {
    let projectedCharacterSet = [] 
    for (let idx in characterSetOptions) {
      let option = characterSetOptions[idx]
      if (characterSetSelector[option]) {
        projectedCharacterSet.push(option);
      }
    }

    try {
      let salt = extractDomain(domain);
      let byteData = generateByteData(props.passwordSignature, salt, passwordLength);

      setPassword(projectOntoCharacterSet(byteData, projectedCharacterSet, 40));
    } catch (err) {}
  }, [domain, passwordLength, characterSetSelector, props.passwordSignature]);

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
  
  const handlePasswordLengthInput = (event) => {
    setPasswordLength(Math.min(64, Math.max(1, event.target.value || 1)));
  };

  const handleCharacterSetOnChange = (event) => {
    setCharacterSetSelector({
      ...characterSetSelector,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box>
      <Grid container spacing={2} sx={{mt: 1}}>
        <Grid item xs={12} sm={12}>
          <TextField fullWidth size="small" label="URL or domain" variant="outlined" value={domain} onChange={handleDomainChange} />
        </Grid>
        <Grid item xs={8} sm={2}>
          <TextField label="Password length" type="number" size="small" value={passwordLength} onChange={handlePasswordLengthInput} />
        </Grid>
          { 
            characterSetOptions.map(function(set, i) {
              return <Grid item key={set} xs={4} sm={2}>
              <FormControlLabel label={set} control={
                <Checkbox checked={characterSetSelector[set]} onChange={handleCharacterSetOnChange} name={set} />
              }/>
        </Grid>;
            })
          }
        <Grid item xs={0} sm={2} />
        <Grid item sm>
          <TextField
          fullWidth
          readOnly
          size="small"
          label="Password"
          type={passwordInputType}
          onMouseOut={handlePasswordHover}
          onMouseOver={handlePasswordHover}
          onFocus={event => event.target.select()}
          value={password} />
        </Grid>
        {displayCopyButton && <Grid item alignItems="stretch" style={{display: "flex"}} sm={3}>
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
