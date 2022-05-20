import * as Mui from '@mui/material';

export const useMobileView = () => {
    let theme = Mui.useTheme();
    let isMobileView = Mui.useMediaQuery(theme.breakpoints.down('md'));

    return isMobileView;
}