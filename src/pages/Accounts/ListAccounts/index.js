import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faMagnifyingGlass, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import db from '~/components/Firebase';

import Button from '~/components/Button';
import styles from '~/pages/Products/ListProducts/ListProducts.module.scss';
import style from '~/components/Dropdown/Dropdown.module.scss';
import tables from '~/components/Table/Table.module.scss';
import Dropdown from '~/components/Dropdown';
import { handleGetId } from '../UpdateAccount';
import SearchInput from '~/components/SearchInput';
import NoData from '~/components/NoData';
import LoadingScreen from '~/components/Loading';
import constants from '~/constants';

const cx = classNames.bind(styles);
const cv = classNames.bind(style);
const tb = classNames.bind(tables);
var unorm = require('unorm');

function ListAccounts() {
    const [accounts, setAccounts] = useState([]);
    const [selected, setSelected] = useState('Mời chọn');
    const options = ['Kế toán', 'Marketing'];
    const [searchResults, setSearchResults] = useState(accounts);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                onSnapshot(collection(db, 'account'), (snapshot) => {
                    setAccounts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                    setSearchResults(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                });
                await new Promise(() =>
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 2000),
                );
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (searchTerm) => {
        const searchTermLower = unorm.nfd(searchTerm);
        const matchingServices = accounts.filter((account) =>
            unorm.nfd(account.name).toLowerCase().includes(searchTermLower),
        );
        setSearchResults(matchingServices);
    };
    return (
        <div className={cx('wrapper')}>
            <header className={cx('products-header')}>
                <h3>{constants.strings.TITLE.listAccount}</h3>
                <div className={cx('products-header__option')}>
                    <div className={cx('products-header__option-selected')}>
                        <div className={cv('option-selected-children')}>
                            <label className={cv('header__option-selected-title')}>Tên vai trò</label>
                            <Dropdown selected={selected} setSelected={setSelected} options={options} medium />
                        </div>
                    </div>
                    <SearchInput onSearch={handleSearch} />
                </div>
            </header>
            <div className={cx('products-main')}>
                <div>
                    <table className={tb('table')}>
                        <thead className={tb('table-header')}>
                            <tr>
                                <th className={tb('idProduct')}>Tên đăng nhập</th>
                                <th className={tb('nameProduct')}>Họ tên</th>
                                <th className={tb('addressProduct')}>Số điện thoại</th>
                                <th className={tb('activeProduct')}>Email</th>
                                <th className={tb('connectProduct')}>Vai trò</th>
                                <th className={tb('accountStatus')}>Trạng thái hoạt động</th>
                                <th className={tb('detailProduct')}></th>
                            </tr>
                        </thead>
                        {isLoading ? (
                            <LoadingScreen />
                        ) : (
                            <tbody>
                                {searchResults.length > 0 ? (
                                    searchResults.map((account, index) => (
                                        <tr
                                            className={index % 2 === 0 ? tb('table-results') : tb('table-change')}
                                            key={account.email}
                                        >
                                            <th>{account.userName}</th>
                                            <td>{account.name}</td>
                                            <td>{account.phone}</td>
                                            <td>
                                                <span>{account.email}</span>
                                            </td>
                                            <td>{account.level}</td>
                                            <td>
                                                <div className={tb('notiResult')}>
                                                    <span>
                                                        {account.status === 'Không hoạt động' ? (
                                                            <FontAwesomeIcon
                                                                className={tb('offIcon')}
                                                                icon={faCircle}
                                                            />
                                                        ) : (
                                                            <FontAwesomeIcon className={tb('onIcon')} icon={faCircle} />
                                                        )}
                                                    </span>
                                                    <p>
                                                        {account.status === 'Không hoạt động'
                                                            ? 'Không hoạt động'
                                                            : 'Hoạt động'}
                                                    </p>
                                                </div>
                                            </td>
                                            <td>
                                                <Button
                                                    link
                                                    to="/updateAccount"
                                                    onClick={() => handleGetId(account.id)}
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
                        )}
                    </table>
                </div>
            </div>

            <Button navigate to="/addAccount">
                <FontAwesomeIcon icon={faSquarePlus} className={cx('iconPlus')} />
                <p className={cx('navigateProduct')}>Thêm tài khoản</p>
            </Button>
        </div>
    );
}

export default ListAccounts;
