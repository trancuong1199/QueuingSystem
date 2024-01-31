import Sidebar from '../DefaultLayout/Sidebar';
import Overview from './Overview';
import classNames from 'classnames/bind';
import styles from './DashboardLayout.module.scss';

const cx = classNames.bind(styles);

function DashboardLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <div className={cx('content')}>{children}</div>
            <Overview />
        </div>
    );
}

export default DashboardLayout;
