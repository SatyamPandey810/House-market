import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { toast } from 'react-toastify';
import "../styles/forgotpassword.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()


    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email)
            navigate('/signin')

        } catch (error) {
            toast.error('Somthing went wrong')
        }
    }
    return (
        <Layout title="forgot password page">
            <div className='row forgot-password-container'>
                <div className="col-md-7 forgot-password-col1">
                    <img src="./assets/forgot-password.svg" alt="forgot-img" />
                </div>
                <div className="col-md-5 forgot-password-col2">
                    <h1>Reset your password</h1>
                    <form onSubmit={submitHandler}>
                        <div className="container mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            <div id="emailHelp" className="form-text text-light">
                                reset email will sent to this email
                            </div>
                        </div>
                        <div className='d-flex justify-content-between btn-goup'>
                            <button type="submit" className="btn">Reset</button>
                            <Link to='/signin' className="btn signin">Sign in</Link>
                        </div>
                    </form>
                </div>

            </div>
        </Layout>
    );
}

export default ForgotPassword;
