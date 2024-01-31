import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { collection, onSnapshot, setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import db from '~/components/Firebase';
import styles from '~/pages/Products/UpdateProduct/UpdateProduct.module.scss';
import Dropdown from '~/components/Dropdown';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
const $ = document.querySelector.bind(document);

let getId;

export const handleGetId = (id) => {
    getId = id;
};

function UpdateAccount() {
    const [accounts, setAccounts] = useState([]);
    const [selected, setSelected] = useState('Mời chọn');
    const [isStatus, setIsStatus] = useState('Mời chọn');
    const [isLevel, setIsLevel] = useState([]);
    let dataLevel = [];

    const status = ['Hoạt động', 'Không hoạt động'];

    useEffect(() => {
        onSnapshot(collection(db, 'account'), (snapshot) => {
            setAccounts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });

        onSnapshot(collection(db, 'level'), (snapshot) => {
            setIsLevel(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
    }, []);

    isLevel.map((value) => {
        dataLevel.push(value.name);
    });

    const handleUpdate = async () => {
        const name = $('#idProduct').value;
        const user = $('#user').value;
        const phone = $('#phone').value;
        const confirmPassword = $('#confirmPassword').value;
        const email = $('#ipProduct').value;
        const password = $('#password').value;

        const docRef = doc(db, 'account', getId);
        const payload = {
            email: email,
            password: password,
            name: name,
            userName: user,
            phone: phone,
            confirmPassword: confirmPassword,
            level: selected,
            status: isStatus,
        };

        setDoc(docRef, payload);
        toast.success('Cập nhật thành công', {
            position: 'top-center',
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    };

    return (
        <div className={cx('wrapper')}>
            <header className={cx('products-header')}>
                <h3>Quản lí thiết bị</h3>
            </header>

            <div className={cx('addProduct-main')}>
                <h4 className={cx('addProduct-main-title')}>Cập nhật tài khoản</h4>
                {accounts.map((account) => {
                    if (account.id === getId) {
                        return (
                            <div key={account.email}>
                                <div className={cx('addProduct-form')}>
                                    <div className={cx('addProduct-form-children')}>
                                        <label className={cx('form-label')}>
                                            Họ tên:<span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Nhập họ tên"
                                            className={cx('form-input')}
                                            id={cx('idProduct')}
                                            defaultValue={account.name}
                                        />
                                        <label className={cx('form-label')}>
                                            Số điện thoại:<span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Nhập số điện thoại"
                                            className={cx('form-input')}
                                            id={cx('phone')}
                                            defaultValue={account.phone}
                                        />
                                        <label className={cx('form-label')}>
                                            Email:<span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Nhập Email"
                                            className={cx('form-input')}
                                            id={cx('ipProduct')}
                                            defaultValue={account.email}
                                        />
                                        <label className={cx('form-label')}>
                                            Vai trò:<span>*</span>
                                        </label>
                                        <Dropdown
                                            selected={selected}
                                            setSelected={setSelected}
                                            options={dataLevel}
                                            large
                                        />
                                    </div>

                                    <div className={cx('addProduct-form-children')}>
                                        <label className={cx('form-label')}>
                                            Tên đăng nhập:<span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Nhập tài khoản"
                                            className={cx('form-input')}
                                            id={cx('user')}
                                            defaultValue={account.userName}
                                        />
                                        <label className={cx('form-label')}>
                                            Mật khẩu:<span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Nhập mật khẩu"
                                            className={cx('form-input')}
                                            id={cx('password')}
                                            defaultValue={account.password}
                                        />
                                        <label className={cx('form-label')}>
                                            Nhập lại mật khẩu:<span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Nhập lại mật khẩu"
                                            className={cx('form-input')}
                                            id={cx('confirmPassword')}
                                            defaultValue={account.confirmPassword}
                                        />

                                        <label className={cx('form-label')}>
                                            Tình trạng:<span>*</span>
                                        </label>
                                        <Dropdown
                                            selected={isStatus}
                                            setSelected={setIsStatus}
                                            options={status}
                                            large
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })}

                <label className={cx('form-label')}>
                    <span>*</span>
                    Là trường thông tin bắt buộc
                </label>
            </div>

            <footer className={cx('products-footer')}>
                <Button outline to="/listAccounts" className={cx('btn-cancel')}>
                    Hủy bỏ
                </Button>
                <Button primary onClick={handleUpdate}>
                    Cập nhật
                </Button>
            </footer>
        </div>
    );
}

export default UpdateAccount;
