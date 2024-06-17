import { Box, Container, Drawer, Fab, Grid } from '@mui/material';
import styled from '@emotion/styled';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import useResponsiveView from '../utils/customHook/useResponsiveView';
import RightPanel from './RightPanel';
import LeftPanel from './LeftPanel';

const CustomBox = styled(Box)`
  background-color: #eee;
  height: 90vh;
  border-radius: 10px;
  padding: 5px;
`;

const BottomRightFab = styled(Fab)`
  margin: 0px;
  top: auto;
  right: 20px;
  bottom: 10px;
  left: auto;
  position: fixed;
`;

const CustomDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    min-width: 40%;
    padding: 20px 10px;
  }
`;

const Home = () => {
  const { isMobileView, isTabletView } = useResponsiveView();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <Grid container spacing={isTabletView ? 2 : 4}>
        {!isMobileView && (
          <Grid item md={3}>
            <Container maxWidth="sm">
              <CustomBox>
                <LeftPanel />
              </CustomBox>
            </Container>
          </Grid>
        )}
        <Grid item xs={12} md={9}>
          <Container maxWidth="md">
            <CustomBox>
              <RightPanel />
            </CustomBox>
          </Container>
        </Grid>
      </Grid>
      {isMobileView && (
        <>
          <BottomRightFab
            color="primary"
            aria-label="Open menu"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            <MenuIcon />
          </BottomRightFab>
          <CustomDrawer
            anchor={'left'}
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <LeftPanel />
          </CustomDrawer>
        </>
      )}
    </>
  );
};

export default Home;
