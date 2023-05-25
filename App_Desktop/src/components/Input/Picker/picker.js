import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import classNames from 'classnames';
import { useState, memo } from 'react';

const cx = classNames;
function Picker({ type, widthInput, label }) {
    const [value, setValue] = useState(null);
    var Comp = DatePicker;
    if (type === 'time') {
        Comp = TimePicker;
    }

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Comp
                label={label}
                inputProps={{ readOnly: true }}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => (
                    <TextField size="small" sx={{ width: widthInput, paddingRight: 1 }} {...params} />
                )}
            />
        </LocalizationProvider>
    );
}

export default memo(Picker);
