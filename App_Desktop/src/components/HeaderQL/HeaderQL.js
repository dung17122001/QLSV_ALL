import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { AiOutlineSearch, AiFillSetting, AiFillDelete } from 'react-icons/ai';
import { IoIosAddCircle } from 'react-icons/io';

function HeaderQL({ onPressSearch, onPressAdd, onPressUpdate, onPressDelete, placeholder }) {
    const [valueSearch, setValueSearch] = useState('');

    return (
        <div>
            <div className="flex justify-center flex-row items-center m-2">
                <input
                    type="text"
                    className="block p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                    placeholder={placeholder}
                    value={valueSearch}
                    onChange={(e) => {
                        setValueSearch(e.target.value);
                    }}
                />
                <div className="ml-6">
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<AiOutlineSearch />}
                        onClick={() => onPressSearch(valueSearch)}
                    >
                        Tìm kiếm
                    </Button>
                </div>
                <div className="ml-6">
                    <Button variant="contained" size="small" startIcon={<IoIosAddCircle />} onClick={onPressAdd}>
                        Thêm
                    </Button>
                </div>
                <div className="ml-6">
                    <Button variant="contained" size="small" startIcon={<AiFillSetting />} onClick={onPressUpdate}>
                        Sửa
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HeaderQL;
