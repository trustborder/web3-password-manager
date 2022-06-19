import React, {useState} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';

import {generateByteData, projectOntoCharacterSet, characterSetOptions} from './PasswordUtils';

export function BulkGenerator(props) {
  const [numPasswords, setNumPasswords] = useState(100);
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
      let byteData = generateByteData(props.web3, props.passwordSignature, Math.random());
      let password = projectOntoCharacterSet(byteData, projectedCharacterSet);
      passwords.push(password);
    }

    window.navigator.clipboard.writeText(passwords.join("\n")).catch(err => console.log(err));
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

  return (
    <Box>
      <TextField label="Number of passwords" type="number" InputLabelProps={{shrink: true}} value={numPasswords} onChange={handleNumOnChange} sx={{mt: 2}} />
      <FormGroup>
        { 
          characterSetOptions.map(function(set, i) {
            return <FormControlLabel label={set} key={set} control={
              <Checkbox checked={characterSetSelector[set]} onChange={handleCharacterSetOnChange} name={set} />
            }/>;
          })
        }
      </FormGroup>
      <Button fullWidth variant="contained" sx={{mt: 2}} onClick={handleGeneratePasswords}>
        Generate random passwords
      </Button>
    </Box>
  )
}

