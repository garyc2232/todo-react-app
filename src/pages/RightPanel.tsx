import { Container, Grid } from '@mui/material';

import { Header } from '../components/molecules/Header';
import TodoPanel from '../components/organisms/TodoPanel';
import useResponsiveView from '../utils/customHook/useResponsiveView';

const RightPanel = () => {
  const { isMobileView } = useResponsiveView();
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
        style={{ height: '90%' }}
      >
        <Grid item xs={isMobileView ? 4 : 2}>
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
        <Grid
          item
          xs={isMobileView ? 8 : 10}
          sx={{ maxWidth: '100%', overflow: 'auto' }}
        >
          <TodoPanel />
        </Grid>
      </Grid>
    </>
  );
};
export default RightPanel;
