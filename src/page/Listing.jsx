import React, { useEffect, useState } from 'react';
import "../styles/listing.css";
import Layout from '../components/layout/Layout';
import { Link,  useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { PiCurrencyInrBold } from "react-icons/pi";
import { FaBed, FaBath, FaParking, FaHouseDamage, FaArrowCircleRight } from "react-icons/fa";
import Spinner from '../components/Spinner';

const Listing = () => {
    const [listing, setListing] = useState('');
    const [loading, setLoading] = useState(false)
    const params = useParams()


    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, 'listings', params.listingId)
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setListing(docSnap.data());
                setLoading(false)

            }
        }

        fetchListing()
    }, [params.listingId])

    if (loading) {
        return <Spinner />
    }
    return (
        <Layout title={listing.name}>
            <div className="container d-flex align-items-center justify-content-center mt-4">
                <div className="card" style={{ width: "400px" }}>
                    <div className="card-header">
                        {listing.imgUrls === undefined ? (
                            <Spinner />
                        ) : (
                            <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {listing.imgUrls.map((url, index) => (
                                        <div className='img-part' key={index} >
                                            <img
                                                src={listing.imgUrls[index]}
                                                height={200}
                                                width={400}
                                                alt={listing.name}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                    <div className="card-body">
                        <h3>{listing.name}</h3>
                        <p>Property For : {listing.type === "rent" ? "Rent" : "Sale"}</p>
                        <h6>
                            <PiCurrencyInrBold size={30} />:{" "}
                            {listing.regularPrice - listing.discountedPrice}
                        </h6>
                        <p>
                            {listing.offer && (
                                <span>
                                    {listing.offer ? listing.discountedPrice : listing.regularPrice}/- Discount
                                </span>
                            )}
                        </p>

                        <p>
                            <FaBed size={20} /> &nbsp;
                            {listing.bedrooms > 1
                                ? `${listing.bedrooms} Bedrooms`
                                : "1 Bedroom"}
                        </p>
                        <p>
                            <FaBath size={20} /> &nbsp;
                            {listing.bathrooms > 1
                                ? `${listing.bathrooms} bathrooms`
                                : "1 Bathroom"}
                        </p>
                        <p>
                            <FaParking size={20} /> &nbsp;
                            {listing.parking ? `Parking spot`
                                : "no spot for parking"}
                        </p>
                        <p>
                            <FaHouseDamage size={20} /> &nbsp;
                            {listing.furnished ? `furnished house` :
                                "not furnished"}</p>
                        <Link
                            className="btn btn-success"
                            to={`/contact/${listing.useRef}?listingName=${listing.name}`}
                        >
                            Contact Landlord <FaArrowCircleRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </Layout >
    );
}

export default Listing;
