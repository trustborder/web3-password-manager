import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function HowSignatureWorks() {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" color="inherit" noWrap>
        What are you signing?
      </Typography>
      <Typography variant="p" color="inherit" className="wrap-text">
        Clicking a vault unlock button will prompt your wallet to sign a message.
        This message is the "password" to unlock your vault.
        Using the resulting signature, the application will derive passwords for other website for you.
        Right now, you have no choice over the password.
        The resulting signature will never be broadcast anywhere and should not be shared.
      </Typography>
    </Box>
  );
}
