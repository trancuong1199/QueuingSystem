import classNames from 'classnames/bind';
import { AiFillCaretRight } from 'react-icons/ai';
import { BsFillFileEarmarkArrowDownFill } from 'react-icons/bs';
import { MdDateRange } from 'react-icons/md';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import 'flatpickr/dist/themes/confetti.css';
import Flatpickr from 'react-flatpickr';
import { toast } from 'react-toastify';

import db from '~/components/Firebase';
import Button from '~/components/Button';
import styles from '~/pages/Products/ListProducts/ListProducts.module.scss';
import style from '~/components/Dropdown/Dropdown.module.scss';
import stylesMain from '~/pages/Service/ListServices/ListServices.module.scss';
import tables from '~/components/Table/Table.module.scss';
import LoadingScreen from '~/components/Loading';
import constants from '~/constants';

const cx = classNames.bind(styles);
const cv = classNames.bind(style);
const tb = classNames.bind(tables);
const cm = classNames.bind(stylesMain);

function Report() {
    const [isSevices, setServices] = useState([]);
    const [numbers, setNumber] = useState([]);
    const [date, setDate] = useState(new Date());
    const [nextDate, setNextDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);

    const [selected, setSelected] = useState('Mời chọn');
    const [service, setService] = useState('Mời chọn');
    const [isAddress, setIsAddress] = useState('Mời chọn');

    const currDate = new Date();
    const displayDate = currDate.getDate() + '/' + (currDate.getMonth() + 1) + '/' + currDate.getFullYear();
    const displayTime = currDate.getHours() + ':' + currDate.getMinutes();

    let dataServices = [];

    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1500));
                onSnapshot(collection(db, 'services'), (snapshot) => {
                    setServices(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                });

                onSnapshot(collection(db, 'number'), (snapshot) => {
                    setNumber(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                });
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    isSevices.map((value) => {
        dataServices.push(value.name);
    });

    return (
        <div className={cx('wrapper')}>
            <header className={cx('products-header')}>
                <h3>{constants.strings.TITLE.managementReport}</h3>
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
                                <th className={tb('idProduct')} id={cx('updateNumber')} style={{ width: '15%' }}>
                                    Số thứ tự
                                </th>
                                <th className={tb('addressProduct')}>Tên dịch vụ</th>
                                <th className={tb('activeProduct')}>Thời gian cấp</th>
                                <th className={tb('activeProduct')}>Tình trạng</th>
                                <th className={tb('activeProduct')}>Nguồn cấp</th>
                            </tr>
                        </thead>
                        {isLoading ? (
                            <LoadingScreen />
                        ) : (
                            <tbody>
                                {numbers.map((number, index) => (
                                    <tr
                                        className={index % 2 == 0 ? tb('table-results') : tb('table-change')}
                                        key={index}
                                    >
                                        <th>{number.numberical}</th>
                                        <th className={cm('fixFont')}>{number.nameService}</th>
                                        <th className={cm('fixFont')}>
                                            {displayTime + ' - '}
                                            {displayDate}
                                        </th>
                                        <td>
                                            <div className={tb('notiResult')}>
                                                <span>
                                                    {number.status === 'Bỏ qua' ? (
                                                        <FontAwesomeIcon className={tb('offIcon')} icon={faCircle} />
                                                    ) : (
                                                        <FontAwesomeIcon className={tb('onIcon')} icon={faCircle} />
                                                    )}
                                                </span>

                                                <p>{number.status === 'Bỏ qua' ? 'Bỏ qua' : 'Đang chờ'}</p>
                                            </div>
                                        </td>
                                        <th className={cm('fixFont')}>{number.addressCreate}</th>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
                <Button navigate to="/dashboard">
                    <BsFillFileEarmarkArrowDownFill className={cx('iconPlus')} style={{ marginLeft: '15px' }} />
                    <p className={cx('navigateProduct')} style={{ marginLeft: '15px' }}>
                        Tải về
                    </p>
                </Button>
            </div>
        </div>
    );
}

export default Report;
