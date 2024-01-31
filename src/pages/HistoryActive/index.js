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
import LoadingScreen from '~/components/Loading';
import constants from '~/constants';

const cx = classNames.bind(styles);
const cv = classNames.bind(style);
const tb = classNames.bind(tables);
const cm = classNames.bind(stylesMain);

function HistoryActive() {
    const [isSevices, setServices] = useState([]);
    const [date, setDate] = useState(new Date());
    const [nextDate, setNextDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                onSnapshot(collection(db, 'services'), (snapshot) => {
                    setServices(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
                <h3>{constants.strings.TITLE.historyLog}</h3>
                <div className={cx('products-header__option')}>
                    <div className={cx('products-header__option-selected')}>
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
                </div>
            </header>
            <div className={cx('products-main')}>
                <div>
                    <table className={tb('table')}>
                        <thead className={tb('table-header')}>
                            <tr>
                                <th className={tb('idProduct')}>Tên đăng nhập</th>
                                <th className={tb('nameProduct')}>Thời gian tác động</th>
                                <th className={tb('addressProduct')}>IP thực hiện</th>
                                <th className={tb('activeProduct')}>Thao tác thực hiện</th>
                            </tr>
                        </thead>
                        {isLoading ? (
                            <LoadingScreen />
                        ) : (
                            <tbody>
                                {isSevices.map((service, index) => (
                                    <tr
                                        className={index % 2 == 0 ? tb('table-results') : tb('table-change')}
                                        key={service.code}
                                    >
                                        <th>{service.code}</th>
                                        <th className={cm('fixFont')}>{service.name}</th>
                                        <th className={cm('fixFont')}>{service.description}</th>
                                        <td>
                                            <div className={tb('notiResult')}>
                                                <span>
                                                    {service.status === 'Ngưng hoạt động' ? (
                                                        <FontAwesomeIcon className={tb('offIcon')} icon={faCircle} />
                                                    ) : (
                                                        <FontAwesomeIcon className={tb('onIcon')} icon={faCircle} />
                                                    )}
                                                </span>

                                                <p>
                                                    {service.status === 'Ngưng hoạt động'
                                                        ? 'Ngưng hoạt động'
                                                        : 'Hoạt động'}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </div>
    );
}

export default HistoryActive;
