import { useState, useEffect, useRef } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { onSnapshot, collection, addDoc } from 'firebase/firestore';
import db from '~/components/Firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import style from '~/pages/Products/AddProduct/AddProduct.module.scss';
import styles from './AddNumber.module.scss';
import Button from '~/components/Button';
import Dropdown from '~/components/Dropdown';
import constants from '~/constants';

const cv = classNames.bind(style);
const cx = classNames.bind(styles);

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function AddNumber() {
    let temp = getRndInteger(2000000, 2500000);

    const [isSevices, setServices] = useState([]);
    const [service, setService] = useState('Chọn dịch vụ');
    const [number, setNumber] = useState(temp);

    const popUp = useRef(null);
    const modal = useRef(null);
    const customerName = useRef(null);

    let dataServices = [];

    const currDate = new Date();
    const displayDate = currDate.getDate() + '/' + (currDate.getMonth() + 1) + '/' + currDate.getFullYear();
    const endDate = currDate.getDate() + 1 + '/' + (currDate.getMonth() + 1) + '/' + currDate.getFullYear();
    const displayTime = currDate.getHours() + ':' + currDate.getMinutes();

    useEffect(() => {
        onSnapshot(collection(db, 'services'), (snapshot) => {
            setServices(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
    }, []);

    isSevices.map((value) => {
        dataServices.push(value.name);
    });

    const handleOffPopUp = async () => {
        popUp.current.style.display = 'none';
        modal.current.style.display = 'none';
        setNumber(temp);
    };

    const handleAddNumber = async () => {
        if (customerName.current.value == '' || service == 'Chọn dịch vụ') {
            toast.error('Mời nhập đầy đủ thông tin!', {
                position: 'top-center',
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        } else {
            popUp.current.style.display = 'block';
            modal.current.style.display = 'block';

            const collectionRef = collection(db, 'number');
            const payload = {
                name: customerName.current.value,
                numberical: number,
                nameService: service,
                addressCreate: `Nguồn cấp ${getRndInteger(2, 6)}`,
                createdDate: displayTime + ' - ' + displayDate,
                endDate: displayTime + ' - ' + endDate,
                status: 'Đang chờ',
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
        }
    };

    return (
        <div className={cv('wrapper')}>
            <header className={cv('products-header')}>
                <h3>{constants.strings.TITLE.managementNumber}</h3>
            </header>

            <div className={cx('addNumber')}>
                <div ref={modal} className={cx('modal')} onClick={handleOffPopUp}></div>
                <h4 className={cx('addNumber-title')}>Cấp số mới</h4>
                <span className={cx('addNumber-choice')}>Dịch vụ khách hàng lựa chọn</span>
                <div className={cx('addNumber-main')}></div>
                <div className={cx('dropdown')}>
                    <Dropdown selected={service} setSelected={setService} options={dataServices} medium />
                </div>
                <div className={cx('customerName')}>
                    <label className={cx('customerName-title')}>Nhập tên khách hàng:</label>
                    <input
                        ref={customerName}
                        type="text"
                        className={cx('customerName-input')}
                        placeholder="Mời nhập tên khách hàng..."
                    />
                </div>
                <div className={cx('btn')}>
                    <Button outline to="/listNumber" class={cx('btn-outline')}>
                        Hủy bỏ
                    </Button>
                    <Button primary onClick={handleAddNumber}>
                        In số
                    </Button>
                </div>
                <div ref={popUp} className={cx('pop-up')}>
                    <ImCancelCircle className={cx('pop-up__icon')} onClick={handleOffPopUp} />

                    <div className={cx('pop-up__main')}>
                        <label>Số thứ tự được cấp</label>
                        <span>{number}</span>
                        <p>
                            DV: {service} <strong>(tại quầy số {getRndInteger(0, 5)})</strong>
                        </p>
                    </div>
                    <div className={cx('pop-up__time')}>
                        <label>
                            Thời gian cấp: {displayTime + ' - '}
                            {displayDate}
                        </label>
                        <label>
                            Hạn sử dụng: {displayTime + ' - '}
                            {endDate}
                        </label>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default AddNumber;
