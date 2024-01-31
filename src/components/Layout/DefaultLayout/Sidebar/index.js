import { TbLayoutDashboard } from 'react-icons/tb';
import { RiCustomerService2Line, RiMore2Line } from 'react-icons/ri';
import { GoSignOut } from 'react-icons/go';
import { TfiTablet, TfiLayersAlt, TfiAgenda, TfiSettings } from 'react-icons/tfi';
import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import { Link, NavLink } from 'react-router-dom';
import Button from '~/components/Button';
import constants from '~/constants';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('inner')}>
                <NavLink className={cx('logo')} to="/dashboard">
                    <img
                        src="https://img.freepik.com/premium-vector/abstract-colorful-logo-design_650075-1506.jpg"
                        alt="Alta Media"
                    />
                </NavLink>
                <div className={cx('menu')}>
                    <NavLink
                        style={({ isActive }) => {
                            return {
                                backgroundColor: isActive ? '#fff2e7' : '',
                                color: isActive ? '#ff9138' : '',
                            };
                        }}
                        activeClassName="active"
                        className={cx('menu-children')}
                        to="/dashboard"
                    >
                        <TbLayoutDashboard className={cx('menu-icon')} />
                        {constants.strings.TITLE.dashBoard}
                    </NavLink>
                    <NavLink
                        style={({ isActive }) => {
                            return {
                                backgroundColor: isActive ? '#fff2e7' : '',
                                color: isActive ? '#ff9138' : '',
                            };
                        }}
                        activeClassName="active"
                        className={cx('menu-children')}
                        to="/listProducts"
                    >
                        <TfiTablet className={cx('menu-icon')} />
                        {constants.strings.TITLE.product}
                    </NavLink>
                    <NavLink
                        style={({ isActive }) => {
                            return {
                                backgroundColor: isActive ? '#fff2e7' : '',
                                color: isActive ? '#ff9138' : '',
                            };
                        }}
                        activeClassName="active"
                        className={cx('menu-children')}
                        to="/listServices"
                    >
                        <RiCustomerService2Line className={cx('menu-icon')} />
                        {constants.strings.TITLE.service}
                    </NavLink>
                    <NavLink
                        style={({ isActive }) => {
                            return {
                                backgroundColor: isActive ? '#fff2e7' : '',
                                color: isActive ? '#ff9138' : '',
                            };
                        }}
                        activeClassName="active"
                        className={cx('menu-children')}
                        to="/listNumber"
                    >
                        <TfiLayersAlt className={cx('menu-icon')} />
                        {constants.strings.TITLE.number}
                    </NavLink>
                    <NavLink
                        style={({ isActive }) => {
                            return {
                                backgroundColor: isActive ? '#fff2e7' : '',
                                color: isActive ? '#ff9138' : '',
                            };
                        }}
                        activeClassName="active"
                        className={cx('menu-children')}
                        to="/report"
                    >
                        <TfiAgenda className={cx('menu-icon')} />
                        {constants.strings.TITLE.report}
                    </NavLink>
                    <div className={cx('menu-children')}>
                        <TfiSettings className={cx('menu-icon')} />
                        {constants.strings.TITLE.setting}
                        <RiMore2Line className={cx('menu-icon__more')} />
                        <ul className={cx('system-children')}>
                            <NavLink
                                style={({ isActive }) => {
                                    return {
                                        backgroundColor: isActive ? '#fff2e7' : '',
                                        color: isActive ? '#ff9138' : '',
                                    };
                                }}
                                activeClassName="active"
                                className={cx('system-children__link')}
                                to="/listLevel"
                            >
                                {constants.strings.TITLE.managementReport}
                            </NavLink>
                            <NavLink
                                style={({ isActive }) => {
                                    return {
                                        backgroundColor: isActive ? '#fff2e7' : '',
                                        color: isActive ? '#ff9138' : '',
                                    };
                                }}
                                activeClassName="active"
                                className={cx('system-children__link')}
                                to="/listAccounts"
                            >
                                {constants.strings.TITLE.managementAccount}
                            </NavLink>
                            <NavLink
                                style={({ isActive }) => {
                                    return {
                                        backgroundColor: isActive ? '#fff2e7' : '',
                                        color: isActive ? '#ff9138' : '',
                                    };
                                }}
                                activeClassName="active"
                                className={cx('system-children__link')}
                                to="/historyActive"
                            >
                                {constants.strings.TITLE.historyUser}
                            </NavLink>
                        </ul>
                    </div>
                </div>
                <div className={cx('menu-btn')}>
                    <Button logout to="/">
                        <GoSignOut className={cx('btn-icon')} />
                        {constants.strings.TITLE.logOut}
                    </Button>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
