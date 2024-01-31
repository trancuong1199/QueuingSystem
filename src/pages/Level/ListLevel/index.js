import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import db from '~/components/Firebase';

import Button from '~/components/Button';
import styles from '~/pages/Products/ListProducts/ListProducts.module.scss';
import tables from '~/components/Table/Table.module.scss';
import { handleGetId } from '../UpdateLevel';
import LoadingScreen from '~/components/Loading';
import NoData from '~/components/NoData';
import SearchInput from '~/components/SearchInput';
import constants from '~/constants';

const cx = classNames.bind(styles);
const tb = classNames.bind(tables);
var unorm = require('unorm');

function ListLevel() {
    const [isLoading, setIsLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const handleSearch = (searchTerm) => {
        const searchTermLower = unorm.nfd(searchTerm).toLowerCase();

        const matchingProducts = searchResults.filter((product) =>
            unorm.nfd(product.name).toLowerCase().includes(searchTermLower),
        );
        setSearchResults(matchingProducts);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                onSnapshot(collection(db, 'level'), (snapshot) => {
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

    return (
        <div className={cx('wrapper')}>
            <header className={cx('products-header')}>
                <h3>{constants.strings.TITLE.listRoles}</h3>
                <SearchInput onSearch={handleSearch} />
            </header>
            <div className={cx('products-main')}>
                <div>
                    <table className={tb('table')}>
                        <thead className={tb('table-header')}>
                            <tr>
                                <th className={tb('idProduct')}>Tên vai trò</th>
                                <th className={tb('nameProduct')}>Số người dùng</th>
                                <th className={tb('addressProduct')}>Mô tả</th>
                                <th className={tb('detailProduct')}></th>
                            </tr>
                        </thead>
                        {isLoading ? (
                            <LoadingScreen />
                        ) : (
                            <tbody>
                                {searchResults.length > 0 ? (
                                    searchResults.map((level, index) => (
                                        <tr
                                            className={index % 2 === 0 ? tb('table-results') : tb('table-change')}
                                            key={index}
                                        >
                                            <th>{level.name}</th>
                                            <td>{level.quantityUserUse}</td>
                                            <td>{level.detail}</td>
                                            <td>
                                                <Button link to="/updateLevel">
                                                    <p
                                                        className={cx('table-results-detail')}
                                                        onClick={() => handleGetId(level.id)}
                                                    >
                                                        Cập nhật
                                                    </p>
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
                        )}
                    </table>
                </div>
            </div>

            <Button navigate to="/addLevel">
                <FontAwesomeIcon icon={faSquarePlus} className={cx('iconPlus')} />
                <p className={cx('navigateProduct')}>Thêm vai trò</p>
            </Button>
        </div>
    );
}

export default ListLevel;
