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
                    <p>????????? ??????</p>
                    <h3>?????????</h3>
                </div>

                <div className='login_auth'>
                    <div className='login_authOptions'>
                        <div className='login_authOption'>
                            <img className='login_authLogo' src='https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png' alt='' />
                            <p onClick={handleGoogleLogin}>?????? ???????????? ?????????</p>
                        </div>
                        <div className='login_authOption'>
                            <img className='login_authLogo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1365px-Facebook_f_logo_%282019%29.svg.png' alt='' />
                            <p onClick={handleFacebookLogin}>???????????? ???????????? ?????????</p>
                        </div>
                        <div className='login_authDesc'>
                            <p>
                                <span style={{ color: 'blue', cursor: 'pointer' }}>???????????? ????????????
                                </span>
                                ?????? ??? ?????????{' '}
                                <span style={{ color: 'blue', cursor: 'pointer' }}>
                                    ??????????????????
                                </span>
                                ???{' '}
                                <span style={{ color: 'blue', cursor: 'pointer' }}>
                                    ????????? ?????? ??????
                                </span>
                                ??? ?????? ???????????? ????????? ???????????????.</p>
                        </div>
                    </div>
                    <div className='login_emailPass'>
                        <div className='login_label'>
                            <h4>?????????</h4>
                        </div>
                        <div className='login_inputFields'>
                            <div className='login_inputField'>
                                <input type='text' placeholder='?????????' value={email} onChange={onEmailChange} />
                            </div>
                            <div className='login_inputField'>
                                <input type='password' placeholder='????????????' value={password} onChange={onPasswordChange} />
                            </div>
                        </div>
                        <div className='login_forgButt'>
                            <small>???????????? ??????</small>
                            <button type='submit' onClick={handleLogin}>?????????</button>
                        </div>
                        <button onClick={handleRegister}>????????????</button>
                    </div>
                </div >
                <div className='login_lang'>
                    <p>????????????</p>
                    <ArrowForwardIos fontSize='small' />
                </div>
                <div className='login_footer'>
                    <p>About</p>
                    <p>????????????</p>
                    <p>??????????????????</p>
                    <p>??????1</p>
                    <p>??????2</p>
                    <p>??????3</p>
                </div>
            </div>
        </div >
    )
}

export default Login