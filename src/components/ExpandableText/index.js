import classNames from 'classnames/bind';
import { useState } from 'react';

import Button from '~/components/Button';
import styles from './ExpandableText.module.scss';

const cx = classNames.bind(styles);

const ExpandableText = ({ children }) => {
    const text = children;
    const limit = 15;
    console.log('text ==> ', text.length);
    const [isReadMore, setIsReadMore] = useState(true);

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <>
            {text?.length < limit ? (
                <span className={cx('service-title')}>{text}</span>
            ) : (
                <div className={cx('table-results-service')}>
                    <span className={cx('service-title')}>{isReadMore ? text.slice(0, limit) + '...' : text}</span>
                    <Button link>
                        <p className={cx('table-results-detail')} onClick={toggleReadMore}>
                            {isReadMore ? 'Xem thêm' : 'Rút gọn'}
                        </p>
                    </Button>
                </div>
            )}
        </>
    );
};

export default ExpandableText;
