import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { collection, getDocs, limit, orderBy, query, startAfter, where, } from 'firebase/firestore';
import { db } from '../firebase.config';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';

const Category = () => {
    const [listing, setListing] = useState('');
    const [lastFetchListing, setLastFetchListing] = useState(null)
    const [loading, setLoading] = useState(true);
    // const [data, setData] = useState();

    let params = useParams();

    useEffect(() => {
        const fetchListing = async () => {
            try {
                //refrence
                const listingsRef = collection(db, "listings");
                //query
                const q = query(
                    listingsRef,
                    where("type", "==", params.categoryName),
                    orderBy("timestamp", "desc"),
                    limit(1)
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
                    // console.log(doc.data());

                });
                 setListing((prevState) => [...prevState, ...listings]);
                setLoading(false)
            } catch (error) {
                toast.error('Unable to fetch data')
                console.log(error.message);
            }

        }
        fetchListing()
    }, [params.categoryName])

    const fetchLoadMoreListing = async () => {
        try {
            //refrence
            const listingsRef = collection(db, "listings");
            //query
            const q = query(
                listingsRef,
                where("type", "==", params.categoryName),
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
            console.log(error);
            toast.error("Unble to fetch data");
        }
    };

    return (
        <Layout
             title={
        params.categoryName === "rent" ? "Places For Rent" : "Plces For Sale"
      }
    >
      <div className="mt-3 container-fluid">
        <h1>
          {params.categoryName === "rent"
            ? "Places For Rent"
            : "Plces For Sale"}
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
          <p>No Listing For {params.categoryName} </p>
        )}
      </div>
      <div className="d-flex align-items-center justify-content-center mb-4 mt-4">
        {lastFetchListing && (
          <button
            className="btn btn-primary text-center"
            onClick={fetchLoadMoreListing}
          >
            load more
          </button>
        )}
      </div>
        </Layout>
    );
}

export default Category;
