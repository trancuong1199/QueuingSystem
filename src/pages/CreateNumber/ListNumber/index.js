import classNames from 'classnames/bind';
import { AiFillCaretRight } from 'react-icons/ai';
import { MdDateRange } from 'react-icons/md';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faMagnifyingGlass, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import 'flatpickr/dist/themes/confetti.css';
import Flatpickr from 'react-flatpickr';

import db from '~/components/Firebase';
import Button from '~/components/Button';
import styles from '~/pages/Products/ListProducts/ListProducts.module.scss';
import style from '~/components/Dropdown/Dropdown.module.scss';
import stylesMain from '~/pages/Service/ListServices/ListServices.module.scss';
import tables from '~/components/Table/Table.module.scss';
import Dropdown from '~/components/Dropdown';
import { handleDetail } from '../DetailNumber';
import SearchInput from '~/components/SearchInput';
import NoData from '~/components/NoData';
import LoadingScreen from '~/components/Loading';
import utils from '~/utils';

var unorm = require('unorm');

const cx = classNames.bind(styles);
const cv = classNames.bind(style);
const tb = classNames.bind(tables);
const cm = classNames.bind(stylesMain);

function ListNumber() {
    const [numbers, setNumber] = useState([]);
    const [date, setDate] = useState(new Date());
    const [nextDate, setNextDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);

    const [selected, setSelected] = useState('Mời chọn');
    const [service, setService] = useState('Mời chọn');
    const [isAddress, setIsAddress] = useState('Mời chọn');
    const address = ['Nguồn cấp 1', 'Nguồn cấp 2'];

    const currDate = new Date();
    const displayDate = currDate.getDate() + '/' + (currDate.getMonth() + 1) + '/' + currDate.getFullYear();
    const displayTime = currDate.getHours() + ':' + currDate.getMinutes();
    const [searchResults, setSearchResults] = useState(numbers);

    let dataServices = [];

    useEffect(() => {
        const fetchData = async () => {
            try {
                onSnapshot(collection(db, 'number'), (snapshot) => {
                    setNumber(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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

    searchResults.map((value) => {
        dataServices.push(value.name);
    });

    const handleSearch = (searchTerm) => {
        const searchTermLower = unorm.nfd(searchTerm);
        const matchingNumbers = numbers.filter((number) =>
            unorm.nfd(number.name).toLowerCase().includes(searchTermLower),
        );
        setSearchResults(matchingNumbers);
    };

    return (
        <div className={cx('wrapper')}>
            <header className={cx('products-header')}>
                <h3>Quản lí cấp số</h3>
                <div className={cx('products-header__option')}>
                    <div className={cx('products-header__option-selected')}>
                        <div className={cv('option-selected-children')}>
                            <label className={cv('header__option-selected-title')}>Tên dịch vụ</label>
                            <Dropdown
                                selected={service}
                                setSelected={setService}
                                options={dataServices}
                                small
                                multi={true}
                            />
                        </div>
                        <div className={cv('option-selected-children')}>
                            <label className={cv('header__option-selected-title')}>Tình trạng</label>
                            <Dropdown
                                selected={selected}
                                setSelected={setSelected}
                                options={utils.masterData.STATUS}
                                small
                            />
                        </div>
                        <div className={cv('option-selected-children')}>
                            <label className={cv('header__option-selected-title')}>Nguồn cấp</label>
                            <Dropdown selected={isAddress} setSelected={setIsAddress} options={address} small />
                        </div>
                        <div>
                            <label className={cv('header__option-selected-title')}>Chọn thời gian</label>
                            <div className={cm('service-date')}>
                                <div className={cm('service-date-children')}>
                                    <Flatpickr
                                        value={date} // giá trị ngày tháng
                                        // các option thêm cho thư viện
                                        options={{
                                            dateFormat: 'd-m-Y', // format ngày giờ
                                        }}
                                        // event
                                        onChange={(dateSelect) => setDate(dateSelect)}
                                        className={cm('service-input')}
                                    />

                                    <MdDateRange className={cm('date-icon')} />
                                </div>

                                <AiFillCaretRight className={cm('service-icon')} />
                                <div className={cm('service-date-children')}>
                                    <Flatpickr
                                        value={nextDate} // giá trị ngày tháng
                                        // các option thêm cho thư viện
                                        options={{
                                            dateFormat: 'd-m-Y', // format ngày giờ
                                        }}
                                        // event
                                        onChange={(dateSelect) => setNextDate(dateSelect)}
                                        className={cm('service-input')}
                                    />
                                    <MdDateRange className={cm('date-icon')} />
                                </div>
                            </div>
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
                                <th className={tb('idProduct')} id={cx('updateNumber')}>
                                    STT
                                </th>
                                <th className={tb('nameProduct')}>Tên khách hàng</th>
                                <th className={tb('addressProduct')}>Tên dịch vụ</th>
                                <th className={tb('activeProduct')}>Thời gian cấp</th>
                                <th className={tb('activeProduct')}>Hạn sử dụng</th>
                                <th className={tb('activeProduct')}>Trạng thái</th>
                                <th className={tb('activeProduct')}>Nguồn cấp</th>
                                <th className={cm('updateService')} id={cx('update')}></th>
                            </tr>
                        </thead>
                        {isLoading ? (
                            <LoadingScreen />
                        ) : (
                            <tbody>
                                {searchResults.length > 0 ? (
                                    searchResults.map((number, index) => (
                                        <tr
                                            className={index % 2 == 0 ? tb('table-results') : tb('table-change')}
                                            key={index}
                                        >
                                            <th>{number.numberical}</th>
                                            <th className={cm('fixFont')}>{number.name}</th>
                                            <th className={cm('fixFont')}>{number.nameService}</th>
                                            <th className={cm('fixFont')}>
                                                {displayTime + ' - '}
                                                {displayDate}
                                            </th>
                                            <th className={cm('fixFont')}>
                                                {displayTime + ' - '}
                                                {displayDate}
                                            </th>
                                            <td>
                                                <div className={tb('notiResult')}>
                                                    <span>
                                                        {number.status === 'Bỏ qua' ? (
                                                            <FontAwesomeIcon
                                                                className={tb('offIcon')}
                                                                icon={faCircle}
                                                            />
                                                        ) : (
                                                            <FontAwesomeIcon className={tb('onIcon')} icon={faCircle} />
                                                        )}
                                                    </span>

                                                    <p>{number.status === 'Bỏ qua' ? 'Bỏ qua' : 'Đang chờ'}</p>
                                                </div>
                                            </td>
                                            <th className={cm('fixFont')}>{number.addressCreate}</th>
                                            <td>
                                                <Button link to="/detailNumber" onClick={() => handleDetail(number.id)}>
                                                    <p className={cx('table-results-detail')}>Chi tiết</p>
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
            <Button navigate to="/addNumber">
                <FontAwesomeIcon icon={faSquarePlus} className={cx('iconPlus')} />
                <p className={cx('navigateProduct')}>Cấp số mới</p>
            </Button>
        </div>
    );
}

export default ListNumber;
