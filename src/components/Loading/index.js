import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Loading.module.scss';

const cx = classNames.bind(styles);
const LoadingScreen = (props) => {
    const { fullPage = false } = props;
    return (
        <div>
            {fullPage ? (
                <div class={cx('full-page-shadow')}>
                    <div className={cx('spinner')}></div>
                    <p className={cx('full-page-shadow-text')}>Loading...</p>
                </div>
            ) : (
                <div className={cx('loading-container')}>
                    <div className={cx('spinner')}></div>
                    <p className={cx('loading-container-text')}>Loading...</p>
                </div>
            )}
        </div>
    );
};

export default LoadingScreen;
