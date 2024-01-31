import classNames from 'classnames/bind';
import { IoIosNotifications } from 'react-icons/io';
import { AiOutlineCamera } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { onSnapshot, collection } from 'firebase/firestore';
import db from '~/components/Firebase';

import Sidebar from './Sidebar';
import styles from './DefaultLayout.module.scss';
import { Link } from 'react-router-dom';
import constants from '~/constants';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const auth = getAuth();
    const [user, setUser] = useState();
    const dummyData = [
        {
            id: 1,
            name: 'The Cat',
        },
    ];
    const notiData = [
        { id: 1, title: 'Noti 1' },
        { id: 2, title: 'Noti 2' },
        { id: 3, title: 'Noti 3' },
        { id: 4, title: 'Noti 4' },
        { id: 5, title: 'Noti 5' },
    ];
    const [account, setAccount] = useState(dummyData);

    // useEffect(() => {
    //     setUser(auth.currentUser);

    //     onSnapshot(collection(db, 'account'), (snapshot) => {
    //         setAccount(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //     });
    // }, []);
    return (
        <div className={cx('container')}>
            <Sidebar />
            <div className={cx('content')}>
                <div className={cx('content-header')}>
                    <h2 className={cx('content-header-title')}>{constants.strings.TITLE.infoPersonal}</h2>
                    <div className={cx('content-header-right')}>
                        <div className={cx('content-header-right1')}>
                            <IoIosNotifications className={cx('content-header-icon')} />
                            <div className={cx('dropdownList')}>
                                {notiData.map((value) => (
                                    <Link to="/user">
                                        <p key={value.id} className={cx('option-item')}>
                                            {value.title}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <Link className={cx('content-header-right-children')} to="/user">
                            <img
                                src="https://cafefcdn.com/thumb_w/640/203337114487263232/2023/1/23/photo1674485787104-16744857876021160009780.jpeg"
                                alt="logo"
                            />
                            {account.map((value) => {
                                // auth.currentUser.uid ||
                                if (value.id == 1) {
                                    return (
                                        <div className={cx('content-header-right-children-info')} key={value.id}>
                                            <h4>Xin chào</h4>
                                            <h3>{value.name}</h3>
                                        </div>
                                    );
                                }
                            })}
                        </Link>
                    </div>
                </div>
                <div className={cx('content-main')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
