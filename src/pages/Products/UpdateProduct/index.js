import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { collection, onSnapshot, setDoc, doc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import db from '~/components/Firebase';
import styles from './UpdateProduct.module.scss';
import Dropdown from '~/components/Dropdown';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
const $ = document.querySelector.bind(document);

let getId;

export const handleGetId = (id) => {
    getId = id;
};

function UpdateProduct() {
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState('Mời chọn');
    const options = ['Kiosk', 'Display'];

    useEffect(() => {
        onSnapshot(collection(db, 'products'), (snapshot) => {
            setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
    }, []);

    const handleUpdate = async () => {
        const id = $('#idProduct').value;
        const name = $('#nameProduct').value;
        const ip = $('#ipProduct').value;
        const user = $('#user').value;
        const password = $('#password').value;
        const service = $('#service').value;

        const docRef = doc(db, 'products', getId);
        const payload = {
            code: id,
            name: name,
            ip: ip,
            user: user,
            password: password,
            service: service,
            type: selected,
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
                <h4 className={cx('addProduct-main-title')}>Cập nhật thiết bị</h4>
                {products.map((product) => {
                    if (product.id === getId) {
                        return (
                            <div key={product.code}>
                                <div className={cx('addProduct-form')}>
                                    <div className={cx('addProduct-form-children')}>
                                        <label className={cx('form-label')}>
                                            Mã thiết bị:<span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Nhập mã thiết bị"
                                            className={cx('form-input')}
                                            id={cx('idProduct')}
                                            defaultValue={product.code}
                                        />
                                        <label className={cx('form-label')}>
                                            Tên thiết bị:<span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Nhập tên thiết bị"
                                            className={cx('form-input')}
                                            id={cx('nameProduct')}
                                            defaultValue={product.name}
                                        />
                                        <label className={cx('form-label')}>
                                            Địa chỉ IP:<span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Nhập địa chỉ IP"
                                            className={cx('form-input')}
                                            id={cx('ipProduct')}
                                            defaultValue={product.ip}
                                        />
                                    </div>

                                    <div className={cx('addProduct-form-children')}>
                                        <label className={cx('form-label')}>
                                            Loại thiết bị:<span>*</span>
                                        </label>
                                        <Dropdown
                                            selected={selected}
                                            setSelected={setSelected}
                                            options={options}
                                            large
                                        />

                                        <label className={cx('form-label')}>
                                            Tên đăng nhập:<span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Nhập tài khoản"
                                            className={cx('form-input')}
                                            id={cx('user')}
                                            defaultValue={product.user}
                                        />
                                        <label className={cx('form-label')}>
                                            Mật khẩu:<span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Nhập mật khẩu"
                                            className={cx('form-input')}
                                            id={cx('password')}
                                            defaultValue={product.password}
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
                                        defaultValue={product.service}
                                    />
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
                <Button outline to="/listProducts" className={cx('btn-cancel')}>
                    Hủy bỏ
                </Button>
                <Button primary onClick={handleUpdate}>
                    Cập nhật
                </Button>
                <ToastContainer />
            </footer>
        </div>
    );
}

export default UpdateProduct;
