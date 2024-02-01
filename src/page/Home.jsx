import React from 'react';
import Layout from '../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import "../styles/homepage.css"
import Slider from '../components/Slider';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { products, product2 } from '../products';

const Home = () => {
    const navigate = useNavigate()

    return (
        <Layout>
            <Slider />
            <div className="home-cat row d-flex align-items-center justify-content-center">
                <h1 style={{fontFamily: 'cursive'}}>Check Our Featured Category</h1>
                <div className="col-md-5 Imagecontainer">
                    <Zoom scale={0.4} indicators={true} >
                        {
                            products.map((each, index) => (
                                <div key={index} >
                                    <div style={{ width: "100%" }}>
                                        <img src={each} style={{ objectFit: "cover", width: "100%", height: "20rem" }} alt="Slide" />
                                    </div>
                                    <button className="btn" onClick={() => navigate("/category/rent")}>
                                        FOR RENT
                                    </button>
                                </div>
                            ))
                        }
                    </Zoom>
                </div>
                <div className="col-md-5 Imagecontainer">
                    <Zoom scale={0.4} indicators={true} >
                        {
                            product2.map((each, index) => (
                                <div key={index} >
                                    <div style={{ width: "100%" }}>
                                        <img src={each} style={{ objectFit: "cover", width: "100%", height: "20rem" }} alt="Slide" />
                                    </div>
                                    <button className="btn" onClick={() => navigate("/category/sale")}>
                                        FOR SALE
                                    </button>
                                </div>
                            ))
                        }
                    </Zoom>
                </div>
            </div>
        </Layout>
    );
}

export default Home;
