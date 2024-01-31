import React from 'react';
import Home from './page/Home';
import { Route, Routes } from 'react-router-dom';
import Offers from './page/Offers';
import SignIn from './page/SignIn';
import SignUp from './page/SignUp';
import Profile from './page/Profile';
import { ToastContainer } from 'react-toastify';
import PrivateRoutes from './components/privateRoutes';
import ForgotPassword from './page/ForgotPassword';
import Category from './page/Category';
import CreateListing from './page/CreateListing';
import Listing from './page/Listing';
import Contact from './page/Contact';
import EditListing from './page/EditListing';
const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/editlisting/:listingId" element={<EditListing />} />
            <Route path="/signin" element={<SignIn />} /> 
            <Route path="/profile" element={<PrivateRoutes />} >
                <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/contact/:landlordId" element={<Contact />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/category/:categoryName/:listingId" element={<Listing />} />
        </Routes>
    );
}

export default App;
