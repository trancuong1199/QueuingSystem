import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePen } from '@fortawesome/free-solid-svg-icons';
import { onSnapshot, collection } from 'firebase/firestore';
import db from '~/components/Firebase';

import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import style from '../AddProduct/AddProduct.module.scss';
import styless from '../ListProducts/ListProducts.module.scss';
import Button from '~/components/Button';
import { handleGetId } from '../UpdateProduct';

const cx = classNames.bind(styles);
const cv = classNames.bind(style);
const cs = classNames.bind(styless);
let getId;

export const handleDetail = (id) => {
    getId = id;
};

function ProductDetail() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        onSnapshot(collection(db, 'products'), (snapshot) => {
            setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
    }, []);

    return (
        <div className={cv('wrapper')}>
            <header className={cv('products-header')}>
                <h3>Quản lí thiết bị</h3>
            </header>

            <div className={cv('addProduct-main')}>
                <h4 className={cv('addProduct-main-title')}>Thông tin chi tiết</h4>
                {products.map((product) => {
                    if (product.id === getId) {
                        return (
                            <>
                                <div key={product.code}>
                                    <div className={cv('addProduct-form')}>
                                        <div className={cv('addProduct-form-children')}>
                                            <label className={cv('form-label')}>
                                                Mã thiết bị: <span className={cx('detail-value')}>{product.code}</span>
                                            </label>
                                            <label className={cv('form-label')}>
                                                Tên thiết bị: <span className={cx('detail-value')}>{product.name}</span>
                                            </label>
                                            <label className={cv('form-label')} id={cx('detail-title')}>
                                                Địa chỉ IP: <span className={cx('detail-value')}>{product.ip}</span>
                                            </label>
                                        </div>

                                        <div className={cv('addProduct-form-children')}>
                                            <label className={cv('form-label')}>
                                                Loại thiết bị:{' '}
                                                <span className={cx('detail-value')}>{product.type}</span>
                                            </label>
                                            <label className={cv('form-label')}>
                                                Tên đăng nhập:{' '}
                                                <span className={cx('detail-value')}>{product.user}</span>
                                            </label>
                                            <label className={cv('form-label')} id={cx('detail-password')}>
                                                Mật khẩu: <span className={cx('detail-value')}>{product.password}</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className={cv('addService')}>
                                        <label className={cv('form-label')} id={cx('detail-service')}>
                                            Dịch vụ sử dụng:{' '}
                                            <span className={cx('detail-value')}>{product.service}</span>
                                        </label>
                                    </div>
                                </div>
                                <div className={cx('btn')}>
                                    <Button navigate to="/updateProduct" onClick={() => handleGetId(product.id)}>
                                        <FontAwesomeIcon icon={faSquarePen} className={cs('iconPlus')} />
                                        <p className={cs('navigateProduct')}>Cập nhật thiết bị</p>
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

export default ProductDetail;
