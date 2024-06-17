import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useResponsiveView = () => {
    const theme = useTheme();
    const isMobileView = useMediaQuery(theme.breakpoints.down('md'));
    const isTabletView = useMediaQuery(theme.breakpoints.down('lg'));
    const isDesktopView = useMediaQuery(theme.breakpoints.up('lg'));

    return { isMobileView, isTabletView, isDesktopView };
};

export default useResponsiveView;