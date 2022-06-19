import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function HowToUse() {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" color="inherit" noWrap>
        How to use 
      </Typography>
      <Typography variant="p" color="inherit" className="wrap-text">
        Simply copy the url for a website you want a password for and click the copy button.
        Note that subdomains matter, this will give you different passwords for www.mysite.com and mysite.com.
      </Typography>
    </Box>
  );
}


