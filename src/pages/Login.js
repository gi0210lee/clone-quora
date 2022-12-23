import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from '@firebase/auth';
import { ArrowForwardIos } from '@mui/icons-material'
import React, { useState } from 'react'
import { auth, googleProvider, facebookProvider } from '../firebase';
import './Login.css'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const onEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value)
    }

    const onPasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value)
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)

            // const user = userCredential.user;
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage)
        }

        setEmail('')
        setPassword('')
    }

    const handleRegister = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;
                // ...
                // console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                alert(errorCode, errorMessage)
            });

        setEmail('')
        setPassword('')
    }

    const handleGoogleLogin = (e) => {
        e.preventDefault();

        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // The signed-in user info.
                // const user = result.user;
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...

                alert(errorCode, errorMessage)
            });
    }

    const handleFacebookLogin = (e) => {
        e.preventDefault();

        signInWithPopup(auth, facebookProvider)
            .then((result) => {
                // The signed-in user info.
                // const user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;

                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);

                // ...
                alert(errorCode, errorMessage)
            });
    }

    return (
        <div className='login'>
            <div className='login_container'>
                <div className='login_logo'>
                    <img src="https://w.namu.la/s/db5f018830fd4efbec2edd6c146d9ec9ff096fd249ebacbc5cd0c29e62e167f09b7444ee8980397e00d98374a1987bdcb508b4eab1296a005294655a75d4ffb7b8141d08044e6a10b7b3501ca8b8edc421de3bc0c725c2cdebee2c882a825d2b" alt='' />
                </div>
                <div className='login_desc'>
                    <p>리액트 구축</p>
                    <h3>리액트</h3>
                </div>

                <div className='login_auth'>
                    <div className='login_authOptions'>
                        <div className='login_authOption'>
                            <img className='login_authLogo' src='https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png' alt='' />
                            <p onClick={handleGoogleLogin}>구글 아이디로 로그인</p>
                        </div>
                        <div className='login_authOption'>
                            <img className='login_authLogo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1365px-Facebook_f_logo_%282019%29.svg.png' alt='' />
                            <p onClick={handleFacebookLogin}>페이스북 아이디로 로그인</p>
                        </div>
                        <div className='login_authDesc'>
                            <p>
                                <span style={{ color: 'blue', cursor: 'pointer' }}>이메일로 회원가입
                                </span>
                                하기 시 본사의{' '}
                                <span style={{ color: 'blue', cursor: 'pointer' }}>
                                    개인정보정책
                                </span>
                                과{' '}
                                <span style={{ color: 'blue', cursor: 'pointer' }}>
                                    서비스 제공 정책
                                </span>
                                에 대해 동의하는 것으로 간주합니다.</p>
                        </div>
                    </div>
                    <div className='login_emailPass'>
                        <div className='login_label'>
                            <h4>로그인</h4>
                        </div>
                        <div className='login_inputFields'>
                            <div className='login_inputField'>
                                <input type='text' placeholder='이메일' value={email} onChange={onEmailChange} />
                            </div>
                            <div className='login_inputField'>
                                <input type='password' placeholder='비밀번호' value={password} onChange={onPasswordChange} />
                            </div>
                        </div>
                        <div className='login_forgButt'>
                            <small>비밀번호 찾기</small>
                            <button type='submit' onClick={handleLogin}>로그인</button>
                        </div>
                        <button onClick={handleRegister}>회원가입</button>
                    </div>
                </div >
                <div className='login_lang'>
                    <p>언어설정</p>
                    <ArrowForwardIos fontSize='small' />
                </div>
                <div className='login_footer'>
                    <p>About</p>
                    <p>오시는길</p>
                    <p>비지니스문의</p>
                    <p>풋터1</p>
                    <p>풋터2</p>
                    <p>풋터3</p>
                </div>
            </div>
        </div >
    )
}

export default Login