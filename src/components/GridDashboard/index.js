import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Loading.module.scss';

const cx = classNames.bind(styles);
const GridDashboard = (props) => {
    const { title, value, valuePer, iconTop, iconBottom } = props;
    return (
        <div className={cx('main-left__statistics--children')}>
            <div className={cx('statistics--children__top')}>
                <div className={cx('statistics--children__top--icon')}>
                    <BsCalendar className={cx('icon-assigned')} />
                </div>
                <span>{title}</span>
            </div>
            <div className={cx('statistics--children__bottom')}>
                <h4>{value}</h4>
                <h5>
                    <BsArrowUp />
                    {valuePer}%
                </h5>
            </div>
        </div>
    );
};

export default GridDashboard;
