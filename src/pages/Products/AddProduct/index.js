import classNames from 'classnames/bind';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import db from '~/components/Firebase';
import styles from './AddProduct.module.scss';
import Dropdown from '~/components/Dropdown';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
const $ = document.querySelector.bind(document);

function Products() {
    const [selected, setSelected] = useState('Mời chọn');
    const options = ['Kiosk', 'Display'];

    const handleAddProduct = async () => {
        const code = $('#codeProduct').value;
        const name = $('#nameProduct').value;
        const ip = $('#ipProduct').value;
        const user = $('#user').value;
        const password = $('#password').value;
        const service = $('#service').value;

        const collectionRef = collection(db, 'products');
        const payload = {
            name: name,
            code: code,
            ip: ip,
            user: user,
            password: password,
            service: service,
            type: selected,
        };

        await addDoc(collectionRef, payload);
        toast.success('Thêm thành công', {
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
                <h4 className={cx('addProduct-main-title')}>Thêm thiết bị</h4>
                <div className={cx('addProduct-form')}>
                    <div className={cx('addProduct-form-children')}>
                        <label className={cx('form-label')}>
                            Mã thiết bị:<span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Nhập mã thiết bị"
                            className={cx('form-input')}
                            id={cx('codeProduct')}
                        />
                        <label className={cx('form-label')}>
                            Tên thiết bị:<span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Nhập tên thiết bị"
                            className={cx('form-input')}
                            id={cx('nameProduct')}
                        />
                        <label className={cx('form-label')}>
                            Địa chỉ IP:<span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Nhập địa chỉ IP"
                            className={cx('form-input')}
                            id={cx('ipProduct')}
                        />
                    </div>

                    <div className={cx('addProduct-form-children')}>
                        <label className={cx('form-label')}>
                            Loại thiết bị:<span>*</span>
                        </label>
                        <Dropdown selected={selected} setSelected={setSelected} options={options} large />
                        <label className={cx('form-label')}>
                            Tên đăng nhập:<span>*</span>
                        </label>
                        <input type="text" placeholder="Nhập tài khoản" className={cx('form-input')} id={cx('user')} />
                        <label className={cx('form-label')}>
                            Mật khẩu:<span>*</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu"
                            className={cx('form-input')}
                            id={cx('password')}
                        />
                    </div>
                </div>
                <div className={cx('addService')}>
                    <label className={cx('form-label')}>
                        Dịch vụ sử dụng:<span>*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Nhập dịch vụ sử dụng"
                        className={cx('form-input')}
                        id={cx('service')}
                    />
                </div>
                <label className={cx('form-label')}>
                    <span>*</span>
                    Là trường thông tin bắt buộc
                </label>
            </div>

            <footer className={cx('products-footer')}>
                <Button outline to="/listProducts" className={cx('btn-cancel')}>
                    Hủy bỏ
                </Button>
                <Button primary onClick={handleAddProduct}>
                    Thêm thiết bị
                </Button>
            </footer>
            <ToastContainer />
        </div>
    );
}

export default Products;
