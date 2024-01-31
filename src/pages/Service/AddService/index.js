import { addDoc, collection } from 'firebase/firestore';
import db from '~/components/Firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import styles from './AddService.module.scss';
import style from '~/pages/Products/AddProduct/AddProduct.module.scss';
import Button from '~/components/Button';
import constants from '~/constants';

const cx = classNames.bind(styles);
const cv = classNames.bind(style);
const $ = document.querySelector.bind(document);

function AddService() {
    const handleAddService = async () => {
        const code = $('#codeProduct').value;
        const name = $('#nameProduct').value;
        const des = $('#des').value;

        const collectionRef = collection(db, 'services');
        const payload = {
            name: name,
            code: code,
            description: des,
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
        <div className={cv('wrapper')}>
            <header className={cv('products-header')}>
                <h3>{constants.strings.TITLE.managementService}</h3>
            </header>

            <div className={cv('addProduct-main')}>
                <h4 className={cv('addProduct-main-title')}>Thông tin dịch vụ</h4>
                <div className={cv('addProduct-form')}>
                    <div className={cv('addProduct-form-children')}>
                        <label className={cv('form-label')}>
                            Mã dịch vụ:<span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Nhập mã thiết bị"
                            className={cv('form-input')}
                            id={cv('codeProduct')}
                        />
                        <label className={cv('form-label')}>
                            Tên dịch vụ:<span>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Nhập tên thiết bị"
                            className={cv('form-input')}
                            id={cv('nameProduct')}
                        />
                    </div>

                    <div className={cv('addProduct-form-children')}>
                        <label className={cv('form-label')}>Mô tả:</label>
                        <textarea
                            type="text"
                            placeholder="Mô tả dịch vụ"
                            className={cx('description')}
                            id={cx('des')}
                        />
                    </div>
                </div>
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
                <Button primary onClick={handleAddService}>
                    Thêm dịch vụ
                </Button>
                <ToastContainer />
            </footer>
        </div>
    );
}

export default AddService;
