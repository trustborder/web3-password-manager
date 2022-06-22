import React, {useState, useEffect} from 'react';
import {Routes, Route} from "react-router-dom";
import Alert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import ReactGA from 'react-ga';

import './App.css';
import {Disclaimer} from './Disclaimer';
import {PasswordManager} from './PasswordManager';
import {BulkGenerator} from './BulkGenerator';
import {UnlockVault} from './UnlockVault';
import {ErrorBoundary} from './ErrorBoundary';

if (googleAnalyticsAvailable()) {
  ReactGA.initialize(process.env.REACT_APP_GA_TRACKER);
}

export default function App() {
  const [passwordSignature, setPasswordSignature] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "Password copied",
  })

  const notify = (severity, message) => {
    setSnackbar({
      open: true,
      severity: severity,
      message: message,
    });
  };
  const handleSnackbarClose = (event) => setSnackbar({...snackbar, open: false});

  const handleUnlockVault = (signature) => {
    setPasswordSignature(signature);
  };

  useEffect(() => {
    if (googleAnalyticsAvailable()) {
      ReactGA.pageview(window.location.pathname);
    }
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Web3 Password Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <ErrorBoundary notify={notify}>
        <Container>
          <Routes>
            {passwordSignature === "" && <Route path="*" element={<UnlockVault notify={notify} successCallback={handleUnlockVault} />} />}
            {passwordSignature !== "" && <Route path={process.env.REACT_APP_URL_BASE + "/"} element={<PasswordManager notify={notify} passwordSignature={passwordSignature} />} />}
            {passwordSignature !== "" && <Route path={process.env.REACT_APP_URL_BASE + "/bulk"} element={<BulkGenerator notify={notify} passwordSignature={passwordSignature} />} />}
          </Routes>
          <Disclaimer />
        </Container>
      </ErrorBoundary>
      <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <Alert severity={snackbar.severity} onClose={handleSnackbarClose} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

function googleAnalyticsAvailable() {
  return process.env.REACT_APP_GA_TRACKER !== ""
}
