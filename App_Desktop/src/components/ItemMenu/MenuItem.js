import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineExpandMore } from 'react-icons/md';
import config from '~/routes/configRoutes';
import classNames from 'classnames';
import style from './itemMenu.scss';
import Button from '../Button/button';
const cx = classNames.bind(style);

function MenuItem({ icon, menuItems }) {
    const navigate = useNavigate();
    const route = config.routeConfig;

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
        <ul className="">
            {menuItems.map((item) => (
                <li key={item.name}>
                    <div className={cx('memu flex flex-row items-center p-2')} onClick={() => handleClick(item.name)}>
                        <div className=" text-xl">{icon}</div>
                        <div className="ml-2 ">{item.name}</div>
                        <div className=" text-xl">
                            <MdOutlineExpandMore />
                        </div>
                    </div>
                    {display[item.name] && (
                        <ul>
                            {item.subItems.map((subItem) => (
                                <li
                                    className={cx(' menu-item text-sm text-gray-500 ')}
                                    key={subItem.name}
                                    //onClick={() => navigate('/' + subItem.to)}
                                >
                                    <Button to={'/' + subItem.to} navLink={true}>
                                        <div className="">{subItem.icon}</div>
                                        <div className="ml-2"> {subItem.name}</div>
                                    </Button>
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
