import React, {useState} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import {generateByteData, projectOntoCharacterSet, characterSetOptions} from './PasswordUtils';

export function BulkGenerator(props) {
  const [numPasswords, setNumPasswords] = useState(100);
  const [passwordLength, setPasswordLength] = useState(32);
  const [characterSetSelector, setCharacterSetSelector] = useState(characterSetOptions.reduce((agg, value) => ({...agg, [value]: false}), {}));

  const handleGeneratePasswords = (event) => {
    let projectedCharacterSet = [] 
    for (let idx in characterSetOptions) {
      let option = characterSetOptions[idx]
      if (characterSetSelector[option]) {
        projectedCharacterSet.push(option);
      }
    }

    let passwords = [];
    let totalPasswords = Math.max(1, numPasswords || 0);
    for (let i = 0; i < totalPasswords; i++) {
      let byteData = generateByteData(props.passwordSignature, Math.random(), passwordLength);
      let password = projectOntoCharacterSet(byteData, projectedCharacterSet);
      passwords.push(password);
    }

    window.navigator.clipboard.writeText(passwords.join("\n")).catch(err => {
      console.log(err)
      props.notify("error",  "Failed to copy password: " + err.message);
    });
  }

  const handleNumOnChange = (event) => {
    setNumPasswords(event.target.value || 0);
  }

  const handleCharacterSetOnChange = (event) => {
    setCharacterSetSelector({
      ...characterSetSelector,
      [event.target.name]: event.target.checked,
    });
  };

  const handlePasswordLengthInput = (event) => {
    setPasswordLength(Math.min(64, Math.max(1, event.target.value || 1)));
  };

  return (
    <Box sx={{mt: 2}}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <TextField label="Number of passwords" size="small" type="number" InputLabelProps={{shrink: true}} value={numPasswords} onChange={handleNumOnChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Password length" type="number" size="small" value={passwordLength} onChange={handlePasswordLengthInput} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Grid container>
            <Grid item xs={2}>
              { 
                characterSetOptions.map(function(set, i) {
                  return <FormControlLabel label={set} key={set} control={
                    <Checkbox checked={characterSetSelector[set]} onChange={handleCharacterSetOnChange} name={set} />
                  }/>;
                })
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Button fullWidth variant="contained" sx={{mt: 2}} onClick={handleGeneratePasswords}>
        Generate random passwords
      </Button>
    </Box>
  )
}

