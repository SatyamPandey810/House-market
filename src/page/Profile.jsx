import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { getAuth, updateProfile } from "firebase/auth";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase.config';
import ListingItem from '../components/ListingItem';
import "../styles/profile.css";

const Profile = () => {
    const auth = getAuth();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState(null);

    useEffect(() => {
        const fetchUserListings = async () => {
            const listingRef = collection(db, 'listings');
            const q = query(listingRef, where('useRef', "==", auth.currentUser.uid), orderBy('timestamp', 'desc'))
            const querySnap = await getDocs(q);
            let listings = [];
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            setListings(listings)
            setLoading(false)
        }
        fetchUserListings()
    }, [auth.currentUser.uid])
    const [changeDetail, setChangeDetail] = useState(false)
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    });
    const { name, email } = formData;

    const logoutHandler = () => {
        auth.signOut()
        toast.success('Logout successfully')
        navigate('/')
    }
    const inputChange = (event) => {
        setFormData(prevState => ({
            ...prevState,
            [event.target.id]: event.target.value
        }))
    }
    //submit handler
    const onSubmit = async () => {
        try {
            if (auth.currentUser.displayName !== name) {
                await updateProfile(auth.currentUser, {
                    displayName: name
                })
                const userRef = doc(db, "users", auth.currentUser.uid)
                await updateDoc(userRef, { name })
                toast.success('User updated')
            }
        } catch (error) {
            toast.error('Somthin went wrog')
        }
    }


    // Delete handler
    const onDelete = async (listingId) => {
        if (window.confirm("Are you sure! want to delete")) {
            await deleteDoc(doc(db, 'listings', listingId))
            const updatedListings = listings.filter((listing) => listing.id !== listingId)
            setListings(updatedListings)
            toast.success('Listing deleted successfully')
        }
    }

    //edit handler

    const onEdit = (listingId) => {
        navigate(`/editlisting/${listingId}`)
    }

    return (
        <Layout>
            <div className='row profile-container'>
                <div className="col-md-6 profile-container-col1">
                    <img src="./assets/profile.svg" alt="profile" />
                </div>
                <div className="col-md-6 profile-container-col2">
                    <div className="container mt-4  d-flex justify-content-between">
                        <h2>Profile Details</h2>
                        <button className="btn btn-danger" onClick={logoutHandler}>
                            Logout
                        </button>
                    </div>
                    <div className="mt-4 card">
                        <div className="card-header">
                            <div className='d-flex justify-content-between'>
                                <p>Your Personal Details</p>
                                <span style={{ cursor: "pointer" }} onClick={() => {
                                    changeDetail && onSubmit();
                                    setChangeDetail(prevState => !prevState)
                                }}>
                                    {changeDetail ? (<IoCheckmarkDoneCircle color='blue' />) :
                                        (<FaEdit color='green' />)
                                    }
                                </span>
                            </div>
                        </div>
                        <div className='card-body'>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                    <input type="text"
                                        className="form-control"
                                        id="name"
                                        value={name}
                                        onChange={inputChange}
                                        disabled={!changeDetail}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        aria-describedby="emailHelp"
                                        onChange={inputChange}
                                        disabled={!changeDetail}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='mt-3 create-listing'>
                        <Link to="/create-listing"><FaArrowAltCircleRight color='red' />  &nbsp; Sale or Rent Your Home
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt-4 your-listings">
                {
                    listings && listings?.length > 0 && (
                        <>
                            <h3 className="mt-4">Your listings</h3>
                            <div>
                                {
                                    listings.map((listing) => (
                                        <ListingItem
                                            key={listing.id}
                                            listing={listing.data}
                                            id={listing.id}
                                            onDelete={() => onDelete(listing.id)}
                                            onEdit={() => onEdit(listing.id)}
                                        />
                                    ))
                                }
                            </div>
                        </>
                    )
                }
            </div>

        </Layout>
    );
}

export default Profile;
