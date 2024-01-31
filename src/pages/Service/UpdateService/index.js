import { useState, useEffect } from 'react';
import { collection, onSnapshot, setDoc, doc } from 'firebase/firestore';
import db from '~/components/Firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from '~/pages/Service/AddService/AddService.module.scss';
import style from '~/pages/Products/AddProduct/AddProduct.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
const cv = classNames.bind(style);
const $ = document.querySelector.bind(document);

let getId;

export const handleGetId = (id) => {
    getId = id;
};

function AddAccount() {
    const [isServices, setServices] = useState([]);

    useEffect(() => {
        onSnapshot(collection(db, 'services'), (snapshot) => {
            setServices(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
    }, []);

    const handleUpdate = async () => {
        const code = $('#codeProduct').value;
        const name = $('#nameProduct').value;
        const description = $('#des').value;
        const docRef = doc(db, 'services', getId);
        const payload = { code: code, name: name, description: description };

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
        <div className={cv('wrapper')}>
            <header className={cv('products-header')}>
                <h3>Quản lí dịch vụ</h3>
            </header>

            <div className={cv('addProduct-main')}>
                <h4 className={cv('addProduct-main-title')}>Thông tin dịch vụ</h4>
                {isServices.map((service) => {
                    if (service.id === getId) {
                        return (
                            <div className={cv('addProduct-form')} key={service.id}>
                                <div className={cv('addProduct-form-children')}>
                                    <label className={cv('form-label')}>
                                        Mã dịch vụ:<span>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nhập mã thiết bị"
                                        className={cv('form-input')}
                                        id={cv('codeProduct')}
                                        defaultValue={service.code}
                                    />
                                    <label className={cv('form-label')}>
                                        Tên dịch vụ:<span>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nhập tên thiết bị"
                                        className={cv('form-input')}
                                        id={cv('nameProduct')}
                                        defaultValue={service.name}
                                    />
                                </div>

                                <div className={cv('addProduct-form-children')}>
                                    <label className={cv('form-label')}>Mô tả:</label>
                                    <textarea
                                        type="text"
                                        placeholder="Mô tả dịch vụ"
                                        className={cx('description')}
                                        id={cx('des')}
                                        defaultValue={service.description}
                                    />
                                </div>
                            </div>
                        );
                    }
                })}
                <h4 className={cv('addProduct-main-title')} id={cv('rule-title')}>
                    Quy tắc cấp số
                </h4>

                <div className={cx('rule-main')}>
                    <div className={cx('rule-main-children')}>
                        <div className={cx('rule-main-children__left')}>
                            <input type="checkbox" checked />
                            <span>Tăng tự động từ: </span>
                        </div>
                        <div className={cx('rule-main-children__right')}>
                            <input type="text" placeholder="00001" />
                            <span>Đến</span>
                            <input type="text" placeholder="99999" />
                        </div>
                    </div>
                    <div className={cx('rule-main-children')}>
                        <div className={cx('rule-main-children__left')}>
                            <input type="checkbox" />
                            <span>Prefix: </span>
                        </div>
                        <div className={cx('rule-main-children__right')}>
                            <input type="text" placeholder="00001" />
                        </div>
                    </div>
                    <div className={cx('rule-main-children')}>
                        <div className={cx('rule-main-children__left')}>
                            <input type="checkbox" />
                            <span>Surfix: </span>
                        </div>
                        <div className={cx('rule-main-children__right')}>
                            <input type="text" placeholder="00001" />
                        </div>
                    </div>
                    <div className={cx('rule-main-children')}>
                        <div className={cx('rule-main-children__left')}>
                            <input type="checkbox" />
                            <span>Reset mỗi ngày </span>
                        </div>
                    </div>
                </div>

                <label className={cx('require')}>
                    <span>*</span>
                    Là trường thông tin bắt buộc
                </label>
            </div>
            <footer className={cv('products-footer')}>
                <Button outline to="/listServices" className={cv('btn-cancel')}>
                    Hủy bỏ
                </Button>
                <Button primary onClick={handleUpdate}>
                    Cập nhập
                </Button>
                <ToastContainer />
            </footer>
        </div>
    );
}

export default AddAccount;
