import { Container, Grid } from '@mui/material';

import { Header } from '../components/molecules/Header';
import TodoPanel from '../components/molecules/TodoPanel';

const RightPanel = () => {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
        style={{ height: '90vh' }}
      >
        <Grid item style={{ flex: '1 1 auto' }}>
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
            <Header />
          </Container>
        </Grid>
        <Grid item style={{ flex: '6 1 auto' }}>
          <TodoPanel />
        </Grid>
      </Grid>
    </>
  );
};
export default RightPanel;
