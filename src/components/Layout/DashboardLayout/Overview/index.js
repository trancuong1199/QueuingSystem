import classNames from 'classnames/bind';
import styles from './Overview.module.scss';

const cx = classNames.bind(styles);

function Overview() {
    return (
        <div className={cx('wrapper')}>
            <h2>Overview</h2>
        </div>
    );
}

export default Overview;
