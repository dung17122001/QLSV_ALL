import { createTheme } from '@mui/material';

const { palette } = createTheme();

export const cusTheme = createTheme({
    palette: {
        black: palette.augmentColor({ color: { main: '#2A2A2A' } }),
        yellow: palette.augmentColor({ color: { main: '#FDAE03' } }),
        blue: palette.augmentColor({ color: { main: '#0000FF' } }),
    },
});
