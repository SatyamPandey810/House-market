import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { BsFillEyeFill } from "react-icons/bs";
import { db } from "../firebase.config"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Oauth from '../components/Oauth';
import "../styles/signup.css";

const SignUp = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: ''
    })
    const { name, email, password } = formData;
    const submit = (event) => {
        setFormData(prevState => ({
            ...prevState,
            [event.target.id]: event.target.value
        }))

    }
    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            updateProfile(auth.currentUser, { displayName: name })
            const formDataCopy = { ...formData }
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp()
            await setDoc(doc(db, "users", user.uid), formDataCopy);
            toast.success('Signup successfully')
            navigate('/')

        } catch (error) {
            console.log(error);
            toast.error('Somthin went wrong');
        }
    }
    return (
        <Layout title="signup - house marketplace">
            <div className='row signup-container'>
                <div className="col-md-6 signup-container-col-1">
                    <img src="./assets/signup.svg" alt="welcome" />
                </div>
                <div className="col-md-6 signup-container-col-2">
                    <form onSubmit={submitHandler}>
                        <h4 className='mt-2 text-center'>Sign up</h4>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Enter Name</label>
                            <input type="text"
                                className="form-control"
                                id="name"
                                aria-describedby="namelHelp"
                                value={name}
                                onChange={submit} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email"
                                className="form-control"
                                id="email"
                                aria-describedby="emailHelp"
                                value={email}
                                onChange={submit} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type={showPassword ? 'text' : 'password'}
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={submit} />
                        </div>
                        <div className='mb-3'>
                            show password
                            <BsFillEyeFill className='text-danger ms-2' onClick={() => { setShowPassword((prevState) => !prevState) }} style={{ cursor: "pointer" }} />
                        </div >
                        <button type="submit" className="btn signup-button">Sign up</button>
                        <span className="ms-4">Already User</span>{''}
                        <Link to="/signin" className='mx-2'>Login</Link>
                        <div className="mt-3">
                            <Oauth />
                        </div>


                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default SignUp;
