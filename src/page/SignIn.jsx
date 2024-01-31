import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaRegEye } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import Oauth from '../components/Oauth';
import '../styles/signin.css'

const SignIn = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const { email, password } = formData;
    const submit = (event) => {
        setFormData(prevState => ({
            ...prevState,
            [event.target.id]: event.target.value
        }))
    }
    const loginHandler = async (event) => {
        event.preventDefault();
        try {
            const auth = getAuth()
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (userCredential.user) {
                navigate('/')
                toast.success('Login success')
            }
        } catch (error) {
            console.log(error);
            toast.error('Invalid email or password')
        }
    }

    return (
        <Layout title="signin - house marketplace">
            <div className='row m-4 signin-container '>
                <div className="col-md-6">
                    <img src="./assets/loginpage.svg" alt="login" />
                </div>
                <div className="col-md-6 signin-container-col2">
                    <form onSubmit={loginHandler}>
                        <h4 className='text-center'>Sign in</h4>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={submit} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type={showPassword ? 'text' : 'password'} className="form-control" id="password" value={password} onChange={submit} />
                            <span>
                                <FaRegEye className='text-danger ms-2' size={25}
                                    onClick={() => { setShowPassword((prevState) => !prevState) }}
                                    style={{ cursor: "pointer" }} />
                                {" "}
                                show password
                            </span>
                            <Link to="/forgot-password" className='ms-4'>forgot Password</Link>
                        </div>
                        <button type="submit" className="btn signinbutton">Sign in</button>
                        <span className="ms-4 new-user"> New User</span>{" "}
                        <Link to="/signup" className="mx-2">Sign up</Link>
                        <Oauth />
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default SignIn;
