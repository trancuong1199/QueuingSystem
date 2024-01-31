import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { setDoc, doc, onSnapshot, collection } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import db from '~/components/Firebase';
import styles from '~/pages/Products/UpdateProduct/UpdateProduct.module.scss';
import Dropdown from '~/components/Dropdown';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
const $ = document.querySelector.bind(document);

function AddAccount() {
    const [addEmail, setAddEmail] = useState('');
    const [addPassword, setAddPassword] = useState('');
    const [isLevel, setIsLevel] = useState([]);
    let dataLevel = [];

    useEffect(() => {
        onSnapshot(collection(db, 'level'), (snapshot) => {
            setIsLevel(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
    }, []);

    isLevel.map((value) => {
        dataLevel.push(value.name);
    });

    // Dropdown
    const [selected, setSelected] = useState('Mời chọn');
    const [isStatus, setIsStatus] = useState('Mời chọn');
    const status = ['Hoạt động', 'Không hoạt động'];

    const addAccount = async () => {
        const auth = getAuth();
        const name = $('#idProduct').value;
        const user = $('#user').value;
        const phone = $('#phone').value;
        const confirmPassword = $('#confirmPassword').value;
        let formData;

        if (addPassword == confirmPassword) {
            formData = {
                email: addEmail,
                password: addPassword,
                name: name,
                userName: user,
                phone: phone,
                confirmPassword: confirmPassword,
                level: selected,
                status: isStatus,
            };

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, addEmail, addPassword);
                const account = userCredential.user;

                await setDoc(doc(db, 'account', account.uid), formData);
            } catch (error) {
                console.log(error.message);
            }
            toast.success('Thêm tài khoản thành công', {
                position: 'top-center',
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        } else {
            toast.error('Nhập lại mật khẩu', {
                position: 'top-center',
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <header className={cx('products-header')}>
                <h3>Quản lí tài khoản</h3>
            </header>

            <div className={cx('addProduct-main')}>
                <h4 className={cx('addProduct-main-title')}>Thông tin tài khoản</h4>
                <div>
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
                            />
                            <label className={cx('form-label')}>
                                Số điện thoại:<span>*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Nhập số điện thoại"
                                className={cx('form-input')}
                                id={cx('phone')}
                            />
                            <label className={cx('form-label')}>
                                Email:<span>*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Nhập Email"
                                className={cx('form-input')}
                                id={cx('ipProduct')}
                                onChange={(e) => {
                                    setAddEmail(e.target.value);
                                }}
                            />
                            <label className={cx('form-label')}>
                                Vai trò:<span>*</span>
                            </label>
                            <Dropdown selected={selected} setSelected={setSelected} options={dataLevel} large />
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
                            />
                            <label className={cx('form-label')}>
                                Mật khẩu:<span>*</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Nhập mật khẩu"
                                className={cx('form-input')}
                                id={cx('password')}
                                onChange={(e) => {
                                    setAddPassword(e.target.value);
                                }}
                            />
                            <label className={cx('form-label')}>
                                Nhập lại mật khẩu:<span>*</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                                className={cx('form-input')}
                                id={cx('confirmPassword')}
                            />

                            <label className={cx('form-label')}>
                                Tình trạng:<span>*</span>
                            </label>
                            <Dropdown selected={isStatus} setSelected={setIsStatus} options={status} large />
                        </div>
                    </div>
                </div>

                <label className={cx('form-label')}>
                    <span>*</span>
                    Là trường thông tin bắt buộc
                </label>
            </div>

            <footer className={cx('products-footer')}>
                <Button outline to="/listAccounts" className={cx('btn-cancel')}>
                    Hủy bỏ
                </Button>
                <Button primary onClick={addAccount}>
                    Thêm
                </Button>
                <ToastContainer />
            </footer>
        </div>
    );
}

export default AddAccount;
