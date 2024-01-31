import { useState } from 'react';
import { BiShow, BiHide } from 'react-icons/bi';
import { confirmPasswordReset, getAuth } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './ChangePassword.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const HandleShowHide = ({ children }) => {
    const text = children;
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={cx('password')}>
            <input type={showPassword ? 'text' : 'password'} placeholder={text} />

            <div className={cx('icon-show')} onClick={() => setShowPassword((prevState) => !prevState)}>
                {showPassword ? <BiShow /> : <BiHide />}
            </div>
        </div>
    );
};

function useQuery() {
    const location = useLocation();
    return new URLSearchParams(location.search);
}

function ChangePassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const query = useQuery();
    const navigate = useNavigate();

    const resetPassword = async () => {
        if (newPassword == '' || confirmPassword == '') {
            toast.error('Mời nhập đầy đủ thông tin', {
                position: 'top-center',
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        } else if (newPassword !== confirmPassword) {
            toast.error('Nhập lại mật khẩu không chính xác', {
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
                await confirmPasswordReset(auth, query.get('oobCode'), newPassword);
                setTimeout(() => {
                    toast.success('Thay đổi mật khẩu thành công', {
                        position: 'top-center',
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                }, 500);
                navigate('/');
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('singIn-left')}>
                <img src={images.logo} alt="logo" />
                <label htmlFor={cx('name')} id={cx('inner-title')}>
                    Đặt lại mật khẩu mới
                </label>
                <div className={cx('inner')}>
                    <label htmlFor={cx('name')}>Mật khẩu:</label>
                    <div value={newPassword} onChange={(e) => setNewPassword(e.target.value)}>
                        <HandleShowHide>Mời nhập mật khẩu...</HandleShowHide>
                    </div>
                    <label htmlFor={cx('nameAgain')}>Nhập lại mật khẩu:</label>
                    <div value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                        <HandleShowHide>Mời nhập lại mật khẩu...</HandleShowHide>
                    </div>
                </div>
                <div className={cx('btn')}>
                    <Button primary onClick={resetPassword}>
                        Xác nhận
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

export default ChangePassword;
