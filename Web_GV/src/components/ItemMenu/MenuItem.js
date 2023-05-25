import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineExpandMore } from 'react-icons/md';
import classNames from 'classnames';
import style from './itemMenu.scss';

const cx = classNames.bind(style);

function MenuItem({ icon, menuItems }) {
    const navigate = useNavigate();

    const [display, setDisplay] = useState({
        item1: false,
        item2: false,
    });

    const handleClick = (item) => {
        setDisplay({
            ...display,
            [item]: !display[item],
        });
    };

    //const menuItems = [{ name: 'Thông tin chung', subItems: ['Sub Item 1', 'Sub Item 2'] }];
    return (
        <ul>
            {menuItems.map((item) => (
                <li key={item.name}>
                    <div
                        className={cx('memu flex flex-row items-center p-2 relative')}
                        onClick={() => handleClick(item.name)}
                    >
                        <div className="text-gray-500 text-xl">{icon}</div>
                        <div className="ml-2 text-gray-500">{item.name}</div>
                        <div className="text-gray-500 text-xl absolute right-4">
                            <MdOutlineExpandMore />
                        </div>
                    </div>
                    {display[item.name] && (
                        <ul>
                            {item.subItems.map((subItem) => (
                                <li
                                    className={cx(' menu-item text-xs text-gray-500 p-2')}
                                    key={subItem.name}
                                    onClick={() => navigate('/' + subItem.to)}
                                >
                                    {subItem.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default MenuItem;
