import Web3 from 'web3';
import {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import {PasswordManager} from './PasswordManager';
import {BulkGenerator} from './BulkGenerator';
import {EthVault} from './EthVault';

export default function App() {
  const web3 = Web3.givenProvider ? new Web3(Web3.givenProvider) : undefined;
  const [passwordSignature, setPasswordSignature] = useState("");

  const handleUnlockVault = (signature) => {
    setPasswordSignature(signature);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Web3 Password Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          {passwordSignature === "" && <Route path="*" element={<EthVault web3={web3} successCallback={handleUnlockVault} />} />}
          {passwordSignature !== "" && <Route path="/" element={<PasswordManager web3={web3} passwordSignature={passwordSignature} />} />}
          {passwordSignature !== "" && <Route path="/bulk" element={<BulkGenerator web3={web3} passwordSignature={passwordSignature} />} />}
        </Routes>
      </Container>
    </div>
  );
}
