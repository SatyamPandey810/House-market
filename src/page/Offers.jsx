import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { toast } from 'react-toastify';
import { collection, getDocs, limit, orderBy, query, startAfter, where, } from 'firebase/firestore';
import { db } from '../firebase.config';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';
import "../styles/offers.css"


const Offers = () => {
    const [listing, setListing] = useState('');
    const [loading, setLoading] = useState(true);
    const [lastFetchListing, setLastFetchListing] = useState(null)

    useEffect(() => {
        const fetchListing = async () => {
            try {
                //refrence
                const listingsRef = collection(db, "listings");
                //query
                const q = query(
                    listingsRef,
                    where("offer", "==", true),
                    orderBy("timestamp", "desc"),
                    limit(10)
                );
                //execute query
                const querySnap = await getDocs(q);
                const lastVisible = querySnap.docs[querySnap.docs.length - 1]
                setLastFetchListing(lastVisible)
                const listings = [];
                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data(),
                    });

                });
                setListing(listings)
                setLoading(false)
            } catch (error) {
                toast.error('Unable to fetch data')
            }

        }
        fetchListing()
    }, [])


    const fetchLoadMoreListing = async () => {
        try {
            //refrence
            const listingsRef = collection(db, "listings");
            //query
            const q = query(
                listingsRef,
                where("offer", "==", true),
                orderBy("timestamp", "desc"),
                startAfter(lastFetchListing),
                limit(10)
            );
            //execute query
            const querySnap = await getDocs(q);
            const lastVisible = querySnap.docs[querySnap.docs.length - 1];
            setLastFetchListing(lastVisible);
            const listings = [];
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            setListing((prevState) => [...prevState, ...listings]);
            setLoading(false);
        } catch (error) {
            toast.error("Unble to fetch data");
        }
    };

    return (
        <Layout title="Best offer on House">
            <div className="offers pt-3 container-fluid">
                <h1>
                    {" "}
                    <img
                        src="/assets/offer.png"
                        alt="offers"
                        className="offer-img"
                    />{" "}
                    Best Offers..
                </h1>
                {loading ? (
                    <Spinner />
                ) : listing && listing.length > 0 ? (
                    <>
                        <div>
                            {listing.map((list) => (
                                <ListingItem listing={list.data} id={list.id} key={list.id} />
                            ))}
                        </div>
                    </>
                ) : (
                    <p>There are no corrent offer</p>
                )}
            </div>
            <div className="d-flex align-items-center justify-content-center mb-4 mt-4">
                {lastFetchListing && (
                    <button
                        className="load-btn"
                        onClick={fetchLoadMoreListing}
                    >
                        load more
                    </button>
                )}
            </div>
        </Layout>
    );
}

export default Offers;
