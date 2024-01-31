import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import db from '~/components/Firebase';
import styles from '~/pages/Products/UpdateProduct/UpdateProduct.module.scss';
import Button from '~/components/Button';
import style from '../AddLevel/AddLevel.module.scss';

const cx = classNames.bind(styles);
const cm = classNames.bind(style);
const $ = document.querySelector.bind(document);

let getId;

export const handleGetId = (id) => {
    getId = id;
};

function UpdateLevel() {
    const [isLevel, setIsLevel] = useState([]);

    useEffect(() => {
        onSnapshot(collection(db, 'level'), (snapshot) => {
            setIsLevel(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
    }, []);

    const handleUpdate = async () => {
        const name = $('#idProduct').value;
        const detail = $('#detail').value;

        const docRef = doc(db, 'level', getId);
        const payload = {
            detail: detail,
            name: name,
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
                <h3>Cập nhật vai trò</h3>
            </header>

            <div className={cx('addProduct-main')}>
                <h4 className={cx('addProduct-main-title')}>Thêm vai trò</h4>
                <div>
                    <div className={cx('addProduct-form')}>
                        {isLevel.map((level) => {
                            if (level.id === getId) {
                                return (
                                    <div className={cx('addProduct-form-children')}>
                                        <label className={cx('form-label')}>
                                            Tên vai trò: <span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Nhập họ tên"
                                            className={cx('form-input')}
                                            id={cx('idProduct')}
                                            defaultValue={level.name}
                                        />
                                        <label className={cx('form-label')}>Mô tả:</label>
                                        <textarea
                                            type="text"
                                            placeholder="Nhập mô tả"
                                            className={cx('detail-input')}
                                            id={cm('detail')}
                                            defaultValue={level.detail}
                                        />
                                    </div>
                                );
                            }
                        })}

                        <div className={cx('addProduct-form-children')}>
                            <label className={cm('level-right-title')}>
                                Phân quyền chức năng<span>*</span>
                            </label>
                            <div className={cm('level-right-main')}>
                                <span className={cm('level-right-main__title')}>Nhóm chức năng A</span>
                                <ul className={cm('level-right-main__checkbox')}>
                                    <li>
                                        <input type="checkbox" />
                                        Tất cả
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        Chức năng x
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        Chức năng y
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        Chức năng z
                                    </li>
                                </ul>

                                <span className={cm('level-right-main__title')}>Nhóm chức năng B</span>
                                <ul className={cm('level-right-main__checkbox')}>
                                    <li>
                                        <input type="checkbox" />
                                        Tất cả
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        Chức năng x
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        Chức năng y
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        Chức năng z
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <label className={cx('form-label')}>
                    <span>*</span>
                    Là trường thông tin bắt buộc
                </label>
            </div>

            <footer className={cx('products-footer')}>
                <Button outline to="/listLevel" className={cx('btn-cancel')}>
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

export default UpdateLevel;
