import {useState} from 'react';
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
  const [passwordSignature, setPasswordSignature] = useState("");

  const handleUnlockVault = (signature) => {
    setPasswordSignature(signature);
  };

  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Web3 Password Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          {passwordSignature === "" && <Route path="*" element={<EthVault successCallback={handleUnlockVault} />} />}
          {passwordSignature !== "" && <Route path={process.env.REACT_APP_URL_BASE + "/"} element={<PasswordManager passwordSignature={passwordSignature} />} />}
          {passwordSignature !== "" && <Route path={process.env.REACT_APP_URL_BASE + "/bulk"} element={<BulkGenerator passwordSignature={passwordSignature} />} />}
        </Routes>
      </Container>
    </div>
  );
}
