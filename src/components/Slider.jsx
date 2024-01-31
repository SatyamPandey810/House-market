import React, { useEffect, useState } from 'react';
import { ImLocation2 } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase.config';
import { collection, getDoc, getDocs, limit, orderBy, query } from 'firebase/firestore';
import Spinner from './Spinner';
import 'react-slideshow-image/dist/styles.css'
import { Fade } from 'react-slideshow-image';
// import "../../styles/slider.css";
import "../styles/slider.css"


const Slider = () => {
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const userPic = "https://openclipart.org/download/247319/abstract-user-flat-3.svg";



    useEffect(() => {
        const fetchListing = async () => {

            const listingRef = collection(db, 'listings')
            const q = query(listingRef, orderBy('timestamp', 'desc'), limit(5))
            const querySnap = await getDocs(q)
            let listings = [];
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                });

            });
            setListings(listings)
            setLoading(false)
        }
        fetchListing()
        // eslint-disable-next-line
    }, [])
    if (loading) {
        return <Spinner />
    }


    return (
        <>
            <div style={{ width: '100%' }}>
                {listings === null ? (
                    <Spinner />
                ) : (
                    <div className="slide-container">
                        <Fade className="mySwipe">
                            {listings.map(({ data, id }) => (
                                <div key={id}>

                                    <div className="carouse" >
                                        <img
                                            src={data.imgUrls[0]}
                                            alt={data.name}
                                            className='carouselImg'
                                            onClick={() => { navigate(`/category/${data.type}/${id}`) }}
                                        />

                                    </div>
                                    <h4 className=" swipe p-4 m-0 ">
                                        {/* <img alt="user pic" src={userPic} height={35} width={35} /> */}
                                        <ImLocation2 size={20} className="ms-2" /> Recently Added :{" "}
                                        <br />
                                        <span className="ms-4 mt-2"> {data.name}</span>
                                        <span className="ms-2">
                                            | Price ( $ {data.regularPrice} )
                                        </span>
                                    </h4>
                                </div>

                            ))}
                        </Fade>
                    </div>

                )}
            </div>
        </>
    );
}

export default Slider;
