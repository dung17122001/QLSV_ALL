import { TextField } from '@mui/material';

function InputText({ width, type, readOnly, ...props }) {
    let bgInput = '';
    let disable = false;
    if (!!readOnly) {
        bgInput = '#FFF7E6';
        disable = true;
    }

    const cusSX = { width: width, mb: 2, background: bgInput, borderRadius: 1 };
    return (
        <>
            <TextField {...props} sx={cusSX} disabled={disable} />
        </>
    );
}

export default InputText;
