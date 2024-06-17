import { Container, Grid, IconButton, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

interface WelcomeBlockProps {
  userName: string;
  handleLogout: () => void;
}

export const WelcomeBlock = (props: WelcomeBlockProps) => {
  return (
    <Container
      sx={{
        backgroundColor: 'white',
        padding: '0.5rem',
        margin: '0.5rem',
        marginTop: '1rem',
        width: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Grid item xs={10}>
        <Typography variant="h6">Welcome {props.userName}</Typography>
      </Grid>
      <Grid item xs={2}>
        <IconButton
          aria-label="logout"
          size="small"
          color="secondary"
          onClick={() => props.handleLogout()}
        >
          <LogoutIcon fontSize="inherit" />
        </IconButton>
      </Grid>
    </Container>
  );
};
