import { Popover } from '@mui/material';

import Button from '~/components/Button';
import { memo, useState } from 'react';
import classNames from 'classnames';

const cx = classNames;

function Dropdown({ children, renderButton }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClickDropdown = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const openDropdown = Boolean(anchorEl);
    const idBtn = openDropdown ? 'simple-popover' : undefined;

    const renderDropdown = () => {
        return (
            <>
                <Button
                    aria-describedby={idBtn}
                    className={cx('pl-4 pr-2 pb-3 flex items-center ')}
                    onClick={handleClickDropdown}
                >
                    {renderButton()}
                </Button>
                <Popover
                    id={idBtn}
                    open={openDropdown}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <div className="flex flex-col">{children}</div>
                </Popover>
            </>
        );
    };
    return <>{renderDropdown()}</>;
}

export default memo(Dropdown);
