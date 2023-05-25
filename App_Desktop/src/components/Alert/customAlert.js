import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function CustomAlert(props) {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity={props.severity}>{props.message}</Alert>
        </Stack>
    );
}

export default CustomAlert;
