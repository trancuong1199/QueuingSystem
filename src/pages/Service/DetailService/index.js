import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft, faSquarePen, faMagnifyingGlass, faCircle } from '@fortawesome/free-solid-svg-icons';
import { onSnapshot, collection } from 'firebase/firestore';
import { MdDateRange } from 'react-icons/md';
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai';
import db from '~/components/Firebase';
import 'flatpickr/dist/themes/confetti.css';
import Flatpickr from 'react-flatpickr';

import classNames from 'classnames/bind';
import style from '~/pages/Products/ListProducts/ListProducts.module.scss';
import styles from './DetailService.module.scss';
import styleList from '../ListServices/ListServices.module.scss';
import styless from '~/components/Dropdown/Dropdown.module.scss';
import tables from '~/components/Table/Table.module.scss';
import Button from '~/components/Button';
import Dropdown from '~/components/Dropdown';
import { handleGetId } from '../UpdateService';

const cv = classNames.bind(style);
const cx = classNames.bind(styles);
const cm = classNames.bind(styless);
const sl = classNames.bind(styleList);
const tb = classNames.bind(tables);

let getId;

export const handleDetail = (id) => {
    getId = id;
};

function DetailService() {
    const [date, setDate] = useState(new Date());
    const [nextDate, setNextDate] = useState(new Date());

    const [isSevices, setServices] = useState([]);
    const [selected, setSelected] = useState('Mời chọn');
    const options = ['Hoạt động', 'Ngưng hoạt động'];

    useEffect(() => {
        onSnapshot(collection(db, 'services'), (snapshot) => {
            setServices(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
    }, []);

    return (
        <div className={cx('wrapper')}>
            <header className={cx('detail-header')}>
                <h4>Quản lí dịch vụ</h4>
            </header>
            <main className={cx('detail-main')}>
                <div className={cx('detail-main-left')}>
                    {isSevices.map((service) => {
                        if (service.id === getId) {
                            return (
                                <>
                                    <div className={cx('detail-main-left__top')}>
                                        <p>Thông tin dịch vụ</p>
                                        <label>
                                            Mã dịch vụ: <span className={cx('detail-value')}>{service.code}</span>
                                        </label>
                                        <label>
                                            Tên dịch vụ: <span className={cx('detail-value')}>{service.name}</span>
                                        </label>
                                        <label>
                                            Mô tả: <span className={cx('detail-value')}>{service.description}</span>
                                        </label>
                                    </div>

                                    <div className={cx('btn')}>
                                        <Button update to="/updateService" onClick={() => handleGetId(service.id)}>
                                            <FontAwesomeIcon icon={faSquarePen} className={cv('iconPlus')} />
                                            <p className={cv('navigateProduct')}>Cập nhật danh sách</p>
                                        </Button>
                                        <Button update back to="/listServices">
                                            <FontAwesomeIcon icon={faRotateLeft} className={cv('iconPlus')} />
                                            <p className={cv('navigateProduct')}>Quay lại</p>
                                        </Button>
                                    </div>
                                </>
                            );
                        }
                    })}

                    <div className={cx('detail-main-left__bottom')}>
                        <p>Quy tắc cập số</p>
                        <div className={cx('detail-main-left__children')}>
                            <label>Tăng tự động từ: </label>
                            <div className={cx('detail-main-left__children--number')}>
                                <input type="text" placeholder="0001" />
                                <span>Đến</span>
                                <input type="text" placeholder="9999" />
                            </div>
                        </div>
                        <div className={cx('detail-main-left__children')}>
                            <label>Prefix: </label>
                            <div className={cx('detail-main-left__children--number')}>
                                <input type="text" placeholder="0001" />
                            </div>
                        </div>
                        <label>Reset mỗi ngày</label>
                        <span>Ví dụ: 201-2001</span>
                    </div>
                </div>
                <div className={cx('detail-main-right')}>
                    <div className={cx('detail-main-right__header')}>
                        <div className={cm('option-selected-children')}>
                            <label className={cx('header__option-selected-title')}>Trạng thái</label>
                            <Dropdown selected={selected} setSelected={setSelected} options={options} small />
                        </div>

                        <div>
                            <label className={cx('header__option-selected-title')}>Chọn thời gian</label>
                            <div className={sl('service-date')}>
                                <div className={sl('service-date-children')}>
                                    <Flatpickr
                                        value={date} // giá trị ngày tháng
                                        // các option thêm cho thư viện
                                        options={{
                                            dateFormat: 'd-m-Y', // format ngày giờ
                                        }}
                                        // event
                                        onChange={(dateSelect) => setDate(dateSelect)}
                                        className={cx('service-input')}
                                    />

                                    <MdDateRange className={sl('date-icon')} />
                                </div>

                                <AiFillCaretRight className={sl('service-icon')} />
                                <div className={sl('service-date-children')}>
                                    <Flatpickr
                                        value={nextDate} // giá trị ngày tháng
                                        // các option thêm cho thư viện
                                        options={{
                                            dateFormat: 'd-m-Y', // format ngày giờ
                                        }}
                                        // event
                                        onChange={(dateSelect) => setNextDate(dateSelect)}
                                        className={cx('service-input')}
                                    />
                                    <MdDateRange className={sl('date-icon')} />
                                </div>
                            </div>
                        </div>
                        <div className={cx('products-header__option-search')}>
                            <label className={cx('header__option-selected-title')}>Từ khóa</label>
                            <div className={cx('search')}>
                                <input placeholder="Nhập từ khóa" />
                                <button className={cx('search-btn')}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('detail-main-right__info')}>
                        <table className={cx('table')}>
                            <thead className={tb('table-header')}>
                                <tr>
                                    <th className={cx('number')}>Số thứ tự</th>
                                    <th className={cx('status')}>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className={tb('table-results')}>
                                    <td className={cx('table-results-children')}>20000111</td>
                                    <td className={cx('table-results-children')}>
                                        <div className={cx('notiResult')}>
                                            <span>
                                                <FontAwesomeIcon className={tb('onIcon')} icon={faCircle} />
                                            </span>
                                            <p>Hoạt động</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr className={tb('table-change')}>
                                    <td className={cx('table-results-children')}>999999</td>
                                    <td className={cx('table-results-children')}>
                                        <div className={cx('notiResult')}>
                                            <span>
                                                <FontAwesomeIcon className={tb('offIcon')} icon={faCircle} />
                                            </span>
                                            <p>Không hoạt động</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default DetailService;
