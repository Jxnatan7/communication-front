import {Box, Typography} from '@mui/material';

const Header = function ({title}: {title?: string}) {
  return (
    <Box
      sx={{
        width: '100%',
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#495848',
        marginBottom: '32px',
      }}
    >
      <Typography variant="h4" fontWeight={700} color="#fff">
        {title || 'Veja suas comunicações'}
      </Typography>
    </Box>
  );
};

export default Header;
