import classNames from 'classnames/bind';
import { AiOutlineCamera } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { onSnapshot, collection } from 'firebase/firestore';
import db from '~/components/Firebase';

import styles from './User.module.scss';

const cx = classNames.bind(styles);

function User() {
    const auth = getAuth();
    const [user, setUser] = useState();
    const dummyData = [
        {
            id: 1,
            name: 'Tran A',
            phone: '0123456789',
            email: 'tran@gmail.com',
            userName: 'cuong',
            password: '123456',
            level: 'Founder',
        },
    ];
    const [account, setAccount] = useState(dummyData);

    // useEffect(() => {
    //     setUser(auth.currentUser);

    //     onSnapshot(collection(db, 'account'), (snapshot) => {
    //         setAccount(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //     });
    // }, []);
    return (
        <div className={cx('wrapper')}>
            {account.map((value) => {
                if (value.id == auth.currentUser.uid || 1) {
                    return (
                        <>
                            <div className={cx('user')}>
                                <img
                                    src="https://media-vov.emitech.vn/sites/default/files/styles/large/public/2023-01/s9.jpg"
                                    alt="avatar"
                                />
                                <div>
                                    <AiOutlineCamera className={cx('user-icon')} />
                                </div>
                                <span>{value.name}</span>
                            </div>
                            <div className={cx('user-form')}>
                                <div className={cx('user-form-middle')}>
                                    <label>Tên người dùng</label>
                                    <input disabled placeholder={value.name} />
                                    <label>Số điện thoại</label>
                                    <input disabled placeholder={value.phone} />
                                    <label>Email:</label>
                                    <input disabled placeholder={value.email} />
                                </div>

                                <div className={cx('user-form-middle')}>
                                    <label>Tên đăng nhập</label>
                                    <input disabled placeholder={value.userName} />
                                    <label>Mật khẩu</label>
                                    <input disabled placeholder={value.password} />
                                    <label>Vai trò:</label>
                                    <input disabled placeholder={value.level} />
                                </div>
                            </div>
                        </>
                    );
                }
            })}
        </div>
    );
}

export default User;
