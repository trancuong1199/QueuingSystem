import classNames from 'classnames/bind';
import { AiFillCaretDown } from 'react-icons/ai';
import { useState } from 'react';

import styles from './Dropdown.module.scss';

const cx = classNames.bind(styles);

function Dropdown(props) {
    const { selected, setSelected, options, medium, small, large, multi = false } = props;
    let DropdownSelect = 'div';
    const classes = cx('wrapper', { medium, small, large });
    const [isActive, setIsActive] = useState(false);

    return (
        <DropdownSelect className={classes}>
            <span className={cx('select-label')} id={cx('add-title')} onClick={(e) => setIsActive(!isActive)}>
                <p className={cx('select-title')}>{selected}</p>
                {isActive ? (
                    <AiFillCaretDown className={cx('dropdownIconActive')} />
                ) : (
                    <AiFillCaretDown className={cx('dropdownIcon')} />
                )}
            </span>
            {isActive && (
                <ul className={cx('dropdownList')} style={multi ? { height: '180px' } : {}}>
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={(e) => {
                                setSelected(option);
                                setIsActive(false);
                            }}
                            className={cx('option-item')}
                            id={cx('itemLarge')}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </DropdownSelect>
    );
}

export default Dropdown;
