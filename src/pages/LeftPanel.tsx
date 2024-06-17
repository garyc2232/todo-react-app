import { Grid } from '@mui/material';

import { WelcomeBlock } from '../components/molecules/WelcomeBlock';
import { ListPanel } from '../components/organisms/ListPanel';

import { memo } from 'react';
import { MenuFooter } from '../components/molecules/MenuFooter';
const LeftPanel = () => {
  // memo this as it would change
  const MemoWelcomeBlock = memo(() => <WelcomeBlock />);
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
          <MemoWelcomeBlock />
        </Grid>
        <Grid item style={{ flex: '6 1 60%' }}>
          <ListPanel />
        </Grid>
        <Grid item style={{ flex: '1 1 auto' }}>
          <MenuFooter />
        </Grid>
      </Grid>
    </>
  );
};
export default LeftPanel;
