import { Container, Grid, IconButton, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { logout, selectUserName } from '../../features/auth/authSlice';

export const WelcomeBlock = () => {
  const dispatch = useAppDispatch();
  const userName = useAppSelector(selectUserName);
  const handleLogout = () => {
    dispatch(logout());
  };

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
        <Typography variant="h6">Welcome {userName}</Typography>
      </Grid>
      <Grid item xs={2}>
        <IconButton
          aria-label="logout"
          size="small"
          color="secondary"
          onClick={() => handleLogout()}
        >
          <LogoutIcon fontSize="inherit" />
        </IconButton>
      </Grid>
    </Container>
  );
};
