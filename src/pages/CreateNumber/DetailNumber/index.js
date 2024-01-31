import { useState, useEffect } from 'react';
import { TbArrowBackUp } from 'react-icons/tb';
import { onSnapshot, collection } from 'firebase/firestore';
import db from '~/components/Firebase';

import classNames from 'classnames/bind';
import styles from '~/pages/Products/ProductDetail/ProductDetail.module.scss';
import style from '~/pages/Products/AddProduct/AddProduct.module.scss';
import styless from './DetailNumber.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
const cv = classNames.bind(style);
const cs = classNames.bind(styless);
let getId;

export const handleDetail = (id) => {
    getId = id;
};

function DetailNumber() {
    const [isNumbers, setIsNumbers] = useState([]);

    useEffect(() => {
        onSnapshot(collection(db, 'number'), (snapshot) => {
            setIsNumbers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
    }, []);

    return (
        <div className={cv('wrapper')}>
            <header className={cv('products-header')}>
                <h3>Quản lí cấp số</h3>
            </header>

            <div className={cv('addProduct-main')}>
                <h4 className={cv('addProduct-main-title')}>Thông tin chi tiết</h4>
                {isNumbers.map((number) => {
                    if (number.id === getId) {
                        return (
                            <>
                                <div key={number.id}>
                                    <div className={cv('addProduct-form')}>
                                        <div className={cv('addProduct-form-children')}>
                                            <label className={cv('form-label')}>
                                                Họ và tên:
                                                <span className={cx('detail-value')}>{number.name}</span>
                                            </label>
                                            <label className={cv('form-label')}>
                                                Tên dịch vụ:
                                                <span className={cx('detail-value')}>{number.nameService}</span>
                                            </label>
                                            <label className={cv('form-label')} id={cx('detail-title')}>
                                                Số thứ tự:{' '}
                                                <span className={cx('detail-value')}>{number.numberical}</span>
                                            </label>
                                            <label className={cv('form-label')} id={cx('detail-title')}>
                                                Thời gian cấp:
                                                <span className={cx('detail-value')}>{number.createdDate}</span>
                                            </label>
                                            <label className={cv('form-label')} id={cx('detail-title')}>
                                                Hạn sử dụng:{' '}
                                                <span className={cx('detail-value')}>{number.endDate}</span>
                                            </label>
                                        </div>

                                        <div className={cv('addProduct-form-children')}>
                                            <label className={cv('form-label')}>
                                                Nguồn cấp:{' '}
                                                <span className={cx('detail-value')}>{number.addressCreate}</span>
                                            </label>
                                            <label className={cv('form-label')}>
                                                Trạng thái <span className={cx('detail-value')}>{number.status}</span>
                                            </label>
                                            <label className={cv('form-label')} id={cx('detail-password')}>
                                                Số điện thoại:
                                                <span className={cx('detail-value')}></span>
                                            </label>
                                            <label className={cv('form-label')} id={cx('detail-password')}>
                                                Địa chỉ Email:
                                                <span className={cx('detail-value')}></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('btn')}>
                                    <Button navigate to="/listNumber">
                                        <TbArrowBackUp className={cs('iconPlus')} />
                                        <p className={cs('navigateProduct')}>Quay lại</p>
                                    </Button>
                                </div>
                            </>
                        );
                    }
                })}
            </div>
        </div>
    );
}

export default DetailNumber;
