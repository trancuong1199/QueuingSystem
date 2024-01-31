import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faMagnifyingGlass, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import db from '~/components/Firebase';

import Button from '~/components/Button';
import styles from './ListProducts.module.scss';
import style from '~/components/Dropdown/Dropdown.module.scss';
import tables from '~/components/Table/Table.module.scss';
import Dropdown from '~/components/Dropdown';
import { handleDetail } from '../ProductDetail';
import { handleGetId } from '../UpdateProduct';
import ExpandableText from '~/components/ExpandableText';
import SearchInput from '~/components/SearchInput';
import NoData from '~/components/NoData';
import LoadingScreen from '~/components/Loading';
import utils from '~/utils';
import constants from '~/constants';

var unorm = require('unorm');
const cx = classNames.bind(styles);
const cv = classNames.bind(style);
const tb = classNames.bind(tables);

function ListProducts() {
    const [isProducts, setProducts] = useState([]);
    const [selected, setSelected] = useState('Hoạt động');
    const [isConnect, setIsConnect] = useState('Mời chọn');
    const [isLoading, setIsLoading] = useState(true);
    const [searchResults, setSearchResults] = useState(isProducts);

    useEffect(() => {
        const fetchData = async () => {
            try {
                onSnapshot(collection(db, 'products'), (snapshot) => {
                    setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                    setSearchResults(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                });
                await new Promise((resolve) => setTimeout(resolve, 1500));
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (searchTerm) => {
        const searchTermLower = unorm.nfd(searchTerm).toLowerCase();

        const matchingProducts = isProducts.filter((product) =>
            unorm.nfd(product.name).toLowerCase().includes(searchTermLower),
        );
        setSearchResults(matchingProducts);
    };

    console.log('product.active ==>', searchResults);
    return (
        <div className={cx('wrapper')}>
            <header className={cx('products-header')}>
                <h3>{constants.strings.TITLE.listProducts}</h3>
                <div className={cx('products-header__option')}>
                    <div className={cx('products-header__option-selected')}>
                        <div className={cv('option-selected-children')}>
                            <label className={cv('header__option-selected-title')}>Trạng thái hoạt động</label>
                            <Dropdown
                                selected={selected}
                                setSelected={setSelected}
                                options={utils.masterData.STATUS}
                                medium
                            />
                        </div>
                        <div>
                            <label className={cv('header__option-selected-title')}>Trạng thái kết nối</label>
                            <Dropdown
                                selected={isConnect}
                                setSelected={setIsConnect}
                                options={utils.masterData.CONNECT}
                                medium
                            />
                        </div>
                    </div>
                    <SearchInput onSearch={handleSearch} />
                </div>
            </header>
            <div className={cx('products-main')}>
                <table className={tb('table')}>
                    <thead className={tb('table-header')}>
                        <tr>
                            <th className={tb('idProduct')} style={{ width: '10%' }}>
                                Mã thiết bị
                            </th>
                            <th className={tb('nameProduct')} style={{ width: '10%' }}>
                                Tên thiết bị
                            </th>
                            <th className={tb('addressProduct')}>Địa chỉ IP</th>
                            <th className={tb('activeProduct')}>Trạng thái hoạt động</th>
                            <th className={tb('connectProduct')}>Trạng thái kết nối</th>
                            <th className={tb('serviceProduct')}>Dịch vụ sử dụng</th>
                            <th className={tb('detailProduct')}></th>
                            <th className={tb('updateProduct')}></th>
                        </tr>
                    </thead>

                    {isLoading ? (
                        <LoadingScreen />
                    ) : (
                        <>
                            <tbody>
                                {searchResults.length > 0 ? (
                                    searchResults.map((product, index) => (
                                        <tr
                                            className={index % 2 === 0 ? tb('table-results') : tb('table-change')}
                                            key={product.ip}
                                        >
                                            <td>{product.code}</td>
                                            <td>{product.name}</td>
                                            <td>{product.ip}</td>
                                            <td>
                                                <div className={tb('notiResult')}>
                                                    <span>
                                                        {product.active === 'Ngưng hoạt động' ? (
                                                            <FontAwesomeIcon
                                                                className={tb('offIcon')}
                                                                icon={faCircle}
                                                            />
                                                        ) : (
                                                            <FontAwesomeIcon className={tb('onIcon')} icon={faCircle} />
                                                        )}
                                                    </span>

                                                    <p>
                                                        {product.active === 'Ngưng hoạt động'
                                                            ? 'Ngưng hoạt động'
                                                            : 'Hoạt động'}
                                                    </p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={tb('notiResult')}>
                                                    <span>
                                                        {product.connect === 'Ngưng kết nối' ? (
                                                            <FontAwesomeIcon
                                                                className={tb('offIcon')}
                                                                icon={faCircle}
                                                            />
                                                        ) : (
                                                            <FontAwesomeIcon className={tb('onIcon')} icon={faCircle} />
                                                        )}
                                                    </span>
                                                    <p>
                                                        {product.connect === 'Ngưng kết nối'
                                                            ? 'Ngưng kết nối'
                                                            : 'Kết nối'}
                                                    </p>
                                                </div>
                                            </td>
                                            <td>
                                                <ExpandableText>{product.service}</ExpandableText>
                                            </td>
                                            <td>
                                                <Button
                                                    link
                                                    to="/productDetail"
                                                    onClick={() => handleDetail(product.id)}
                                                >
                                                    <p className={cx('table-results-detail')}>Chi tiết</p>
                                                </Button>
                                            </td>
                                            <td>
                                                <Button
                                                    link
                                                    to="/updateProduct"
                                                    onClick={() => handleGetId(product.id)}
                                                >
                                                    <p className={cx('table-results-detail')}>Cập nhật</p>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <NoData />
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </>
                    )}
                </table>
            </div>
            <Button navigate to="/addProduct">
                <FontAwesomeIcon icon={faSquarePlus} className={cx('iconPlus')} />
                <p className={cx('navigateProduct')}>Thêm thiết bị</p>
            </Button>
        </div>
    );
}

export default ListProducts;
