import { useState, useEffect } from 'react';
import { BsCalendar, BsCalendarCheck } from 'react-icons/bs';
import { BsArrowUp, BsArrowDown, BsBookmarkDash } from 'react-icons/bs';
import { FiPhoneIncoming } from 'react-icons/fi';
import { AiOutlineMessage } from 'react-icons/ai';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { BsFillCircleFill } from 'react-icons/bs';
import { TfiLayersAlt } from 'react-icons/tfi';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import classNames from 'classnames/bind';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    LineElement,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
} from 'chart.js';

import styles from './Dashboard.module.scss';
import Dropdown from '~/components/Dropdown';
import constants from '~/constants';
import dummyData from '~/utils/dummyData';

const cx = classNames.bind(styles);

const CalendarContainer = styled.div`
    .react-calendar__navigation__label__labelText,
    .react-calendar__navigation__arrow {
        color: var(--menu-color) !important;
    }
    button {
        &:hover {
            background-color: var(--hover-color) !important;
            color: #000 !important;
        }
    }

    .react-calendar__tile--now {
        background-color: var(--hover-color) !important;
        border-radius: 10px;
    }

    .react-calendar__tile--active {
        background-color: var(--btn-color) !important;
        border-radius: 10px;
    }
`;

ChartJS.register(Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler);

function Dashboard() {
    const [value, onChange] = useState(new Date());
    const [service, setService] = useState('Ngày');
    const dataFilter = ['Ngày', 'Tháng', 'Năm'];
    const [data, setData] = useState(dummyData.dashboard0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (service === 'Tháng') {
                    setData(dummyData.dashboard1);
                } else if (service === 'Năm') {
                    setData(dummyData.dashboard2);
                } else {
                    setData(dummyData.dashboard0);
                }
                await new Promise((resolve) => setTimeout(resolve, 1500));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [service]);
    return (
        <div>
            <div className={cx('title')}>
                <h3>{constants.strings.TITLE.dashBoardNumber}</h3>
                <h3>{constants.strings.TITLE.overview}</h3>
            </div>
            <div className={cx('wrapper')}>
                <div className={cx('main-left')}>
                    <div className={cx('main-left__statistics')}>
                        <div className={cx('main-left__statistics--children')}>
                            <div className={cx('statistics--children__top')}>
                                <div className={cx('statistics--children__top--icon')}>
                                    <BsCalendar className={cx('icon-assigned')} />
                                </div>
                                <span>Số thứ tự đã cấp</span>
                            </div>
                            <div className={cx('statistics--children__bottom')}>
                                <h4>{data.numberCreated}</h4>
                                <h5>
                                    <BsArrowUp />
                                    {data.numberCreatedPer}%
                                </h5>
                            </div>
                        </div>

                        <div className={cx('main-left__statistics--children')}>
                            <div className={cx('statistics--children__top')}>
                                <div className={cx('statistics--children__top--icon')} id={cx('bg-icon-used')}>
                                    <BsCalendarCheck className={cx('icon-assigned')} id={cx('icon-used')} />
                                </div>
                                <span>Số thứ tự đã sử dụng</span>
                            </div>
                            <div className={cx('statistics--children__bottom')}>
                                <h4>{data.numberUsed}</h4>
                                <h5 className={cx('icon-down')}>
                                    <BsArrowDown />
                                    {data.numberUsedPer}%
                                </h5>
                            </div>
                        </div>

                        <div className={cx('main-left__statistics--children')}>
                            <div className={cx('statistics--children__top')}>
                                <div className={cx('statistics--children__top--icon')} id={cx('bg-icon-wait')}>
                                    <FiPhoneIncoming className={cx('icon-assigned')} id={cx('icon-wait')} />
                                </div>
                                <span>Số thứ tự đang chờ</span>
                            </div>
                            <div className={cx('statistics--children__bottom')}>
                                <h4>{data.numberWaited}</h4>
                                <h5>
                                    <BsArrowUp />
                                    {data.numberWaitedPer}%
                                </h5>
                            </div>
                        </div>

                        <div className={cx('main-left__statistics--children')}>
                            <div className={cx('statistics--children__top')}>
                                <div className={cx('statistics--children__top--icon')} id={cx('bg-icon-skip')}>
                                    <BsBookmarkDash className={cx('icon-assigned')} id={cx('icon-skip')} />
                                </div>
                                <span>Số thứ tự đã bỏ qua</span>
                            </div>
                            <div className={cx('statistics--children__bottom')}>
                                <h4>{data.numberCancled}</h4>
                                <h5 className={cx('icon-down')}>
                                    <BsArrowDown />
                                    {data.numberCancledPer}%
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className={cx('main-left__chart')}>
                        <div className={cx('main-left__chart--top')}>
                            <div className={cx('chart--top__title')}>
                                <h4>Bảng thống kê theo ngày</h4>
                                <span>{data.day}</span>
                            </div>
                            <div className={cx('chart--top__filter')}>
                                <h4>Xem theo</h4>
                                <Dropdown selected={service} setSelected={setService} options={dataFilter} small />
                            </div>
                        </div>

                        <div className={cx('main-left__chart--bottom')}>
                            <Line data={data} options={dummyData.options}></Line>
                        </div>
                    </div>
                </div>

                <div className={cx('main-right')}>
                    <div>
                        <div className={cx('main-right__data')}>
                            <div className={cx('data-right')}>
                                <div className={cx('data-right-chart')}>
                                    <figure className={cx('pie-chart')}>
                                        <div className={cx('pie-chart-children')}>
                                            <span>90%</span>
                                        </div>
                                    </figure>
                                </div>
                                <div className={cx('data-right-result')}>
                                    <span>4.221</span>
                                    <p>
                                        <HiOutlineDesktopComputer className={cx('data-left-icon')} />
                                        Thiết bị
                                    </p>
                                </div>
                            </div>
                            <div className={cx('data-left')}>
                                <p>
                                    <BsFillCircleFill className={cx('data-left-activeIcon')} />
                                    Đang hoạt động: <strong>3.799</strong>
                                </p>
                                <p>
                                    <BsFillCircleFill className={cx('data-left-stopIcon')} />
                                    Ngưng hoạt động: <strong>422</strong>
                                </p>
                            </div>
                        </div>
                        <div className={cx('main-right__data')}>
                            <div className={cx('data-right')}>
                                <div className={cx('data-right-chart')}>
                                    <figure className={cx('pie-chart')} id={cx('service-chart')}>
                                        <div className={cx('pie-chart-children')} id={cx('service-chart-children')}>
                                            <span>76%</span>
                                        </div>
                                    </figure>
                                </div>
                                <div className={cx('data-right-result')} id={cx('result-service')}>
                                    <span>276</span>
                                    <p>
                                        <AiOutlineMessage className={cx('data-left-icon')} />
                                        Dịch vụ
                                    </p>
                                </div>
                            </div>
                            <div className={cx('data-left')}>
                                <p>
                                    <BsFillCircleFill className={cx('data-left-activeIcon')} id={cx('icon-service')} />
                                    Đang hoạt động: <strong id={cx('info-service')}>3.799</strong>
                                </p>
                                <p>
                                    <BsFillCircleFill className={cx('data-left-stopIcon')} />
                                    Ngưng hoạt động: <strong id={cx('info-service')}>422</strong>
                                </p>
                            </div>
                        </div>
                        <div className={cx('main-right__data')}>
                            <div className={cx('data-right')}>
                                <figure className={cx('data-right-chart')}>
                                    <div className={cx('pie-chart')} id={cx('number-chart')}>
                                        <div className={cx('pie-chart-children')} id={cx('number-chart-children')}>
                                            <span>86%</span>
                                        </div>
                                    </div>
                                </figure>
                                <div className={cx('data-right-result')} id={cx('result-number')}>
                                    <span>4.221</span>
                                    <p>
                                        <TfiLayersAlt className={cx('data-left-icon')} />
                                        Cấp số
                                    </p>
                                </div>
                            </div>
                            <div className={cx('data-left')} id={cx('data-number')}>
                                <p>
                                    <BsFillCircleFill className={cx('data-left-activeIcon')} id={cx('icon-number')} />
                                    Đang hoạt động: <strong id={cx('info-number')}>3.721</strong>
                                </p>
                                <p>
                                    <BsFillCircleFill className={cx('data-left-stopIcon')} />
                                    Ngưng hoạt động: <strong id={cx('info-number')}>486</strong>
                                </p>
                                <p>
                                    <BsFillCircleFill className={cx('data-left-stopIcon')} id={cx('iconSkip-number')} />
                                    Bỏ qua: <strong id={cx('info-number')}>32</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('main-right__calendar')}>
                        <CalendarContainer>
                            <Calendar onChange={onChange} value={value} className={cx('react-calendar__navigation')} />
                        </CalendarContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
