import { Link, useNavigate } from "react-router-dom";
import CartPrice from "../components/CartPrice";
import Header from "../components/Header";
import useProductContext from "../context/ProductContext";
import useFetch from "../../useFetch";
import { useEffect } from "react";

import { useLocation } from 'react-router-dom';

function CheckOut() {
  const location = useLocation();
  const { orderedItems, totalAmount, shippingAddress } = location.state || {};

    const { selectedAddress } = useProductContext();
    const { data: cartedProducts, loading, error } = useFetch(`${import.meta.env.VITE_API_URL}/products/cart/cartItems`);


    

    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });



    return cartedProducts?.products?.length > 0 ? (
        <>
            <Header />
            <main className="container my-4">
                <div className="row">
                    {/* Success Card */}
                    <div className="card border-0 shadow-lg my-4 mx-auto col-lg-4 col-md-12 mx-3" style={{ maxWidth: '600px' }}>
                        <div className="card-body text-center p-5">
                            {/* Success Icon */}
                            <div className="mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="64"
                                    height="64"
                                    fill="currentColor"
                                    className="bi bi-check-circle-fill text-success"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                </svg>
                            </div>

                            {/* Success Message */}
                            <h2 className="card-title fw-bold text-success mb-3">
                                Order Placed Successfully!
                            </h2>

                            {/* Subtitle */}
                            <p className="text-muted mb-4">
                                Thank you for your purchase.
                            </p>

                            {/* Action Button */}
                            <Link to="/products/category/all"
                                className="btn btn-outline-success px-4 py-2 fw-semibold"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                    {/* Cart Items Section */}
                    <div className="col-lg-4 col-md-12 mb-4">
                        <h4 className="mb-3">Order Summary</h4>
                            <div className="row g-3">
                                {cartedProducts?.products?.map((product) => (
                                    <div key={product._id}>
                                        <div className="col" key={product._id}>
                                            <div className="card h-100">
                                                <div className="row g-0 align-items-center">
                                                    <div className="col-5">
                                                        <img
                                                            src={product.img}
                                                            className="img-fluid rounded m-2"
                                                            alt={product.name}
                                                            style={{ maxHeight: '80px', objectFit: 'cover' }}
                                                        />
                                                    </div>
                                                    <div className="col-7">
                                                        <div className="card-body py-2">
                                                            <h6 className="card-title mb-1">{product.name}</h6>
                                                            <p className="card-text mb-0">
                                                                <small className="text-muted">
                                                                    {product.quantity} item{product.quantity > 1 ? 's' : ''}
                                                                </small>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        
                    </div>
                    {/* Price Summary & Address */}
                    <div className="col-lg-4 col-md-12">
                        <div className="sticky-top" style={{ top: '80px' }}>
                            <CartPrice pageType="CheckOut" />

                            {/* Shipment Address */}
                            <div className="mt-4 p-3 border rounded">
                                <p className="mb-1">
                                    <strong>Ordered On:</strong> {formattedDate}
                                </p>
                                <p className="mb-0">
                                    <strong>Shipping Address:</strong> {selectedAddress || "Not selected"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    ) : (
        <>
            <Header />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <main className="container text-center my-5">
                <p><b>Nothing is ordered</b></p>
                <Link to="/products/category/all"
                                className="btn btn-outline-success px-4 py-2 fw-semibold"
                            >
                                Continue Shopping
                            </Link>
            </main>
        </>
    );
}

export default CheckOut;