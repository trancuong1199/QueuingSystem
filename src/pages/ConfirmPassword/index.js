import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './ConfirmPassword.module.scss';
import images from '~/assets/images';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function ConfirmPassword() {
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        const email = document.querySelector('#input').value;
        if (email == '') {
            toast.error('Mời nhập email của bạn', {
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
            try {
                const auth = getAuth();
                await sendPasswordResetEmail(auth, email, {
                    url: 'http://localhost:3000',
                });
                toast.success('Mời vào Email xác nhận mật khẩu mới', {
                    position: 'top-center',
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            } catch (error) {
                toast.error('Email không chính xác', {
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
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('singIn-left')}>
                <h5 className={cx('err')}></h5>

                <img src={images.logo} alt="logo" />
                <div className={cx('inner')}>
                    <label htmlFor={cx('name')} className={cx('inner-detail')} id={cx('inner__title')}>
                        Đặt lại mật khẩu
                    </label>
                    <label htmlFor={cx('inputName')} className={cx('inner-detail')}>
                        Vui lòng nhập Email để đặt lại mật khẩu của bạn<strong>*</strong>
                    </label>
                    <input type="text" placeholder="Mời nhập email..." id={cx('input')} className={cx('inputEmail')} />
                </div>
                <div className={cx('btn')}>
                    <Button outline to="/">
                        Hủy
                    </Button>
                    <Button primary onClick={handleForgotPassword}>
                        Tiếp tục
                    </Button>
                </div>
                <ToastContainer />
            </div>
            <div className={cx('singIn-right')}>
                <img src={images.confirmPassword} alt="img-signIn" />
            </div>
        </div>
    );
}

export default ConfirmPassword;
