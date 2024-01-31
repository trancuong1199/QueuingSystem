import classNames from 'classnames/bind';
import styles from './SignIn.module.scss';
import { useState } from 'react';
import { BiShow, BiHide } from 'react-icons/bi';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import images from '~/assets/images';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#pw').value;

        if (email == '' && password == '') {
            toast.error('Mời nhập tài khoản và mật khẩu', {
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

                const userCredential = await signInWithEmailAndPassword(auth, email, password);

                if (userCredential.user) {
                    navigate('/listProducts');
                }
            } catch (error) {
                toast.error('Sai tài khoản hoặc mật khẩu', {
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
                <img src={images.logo} alt="logo" />
                <div className={cx('inner')}>
                    <label htmlFor={cx('name')}>
                        Email đăng nhập<strong>*</strong>:
                    </label>
                    <input type="text" placeholder="Mời nhập email đăng nhập..." id={cx('email')} />
                    <label htmlFor={cx('password')}>
                        Mật khẩu<strong>*</strong>:
                    </label>
                    <div className={cx('password')}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Mời nhập mật khẩu..."
                            id={cx('pw')}
                        />
                        <div className={cx('icon-show')} onClick={() => setShowPassword((prevState) => !prevState)}>
                            {showPassword ? <BiShow /> : <BiHide />}
                        </div>
                    </div>
                    <Button text to="/confirmPassword">
                        Quên mật khẩu?
                    </Button>
                </div>
                <Button primary onClick={handleSubmit}>
                    Đăng nhập
                </Button>
                <ToastContainer />
            </div>
            <div className={cx('singIn-right')}>
                <img src={images.signIn} alt="img-signIn" />
                <div className={cx('title')}>
                    <p>Hệ thống</p>
                    <h3>Quản lí xếp hàng</h3>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
