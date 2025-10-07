// src/components/ProductDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProductContext from '../context/ProductContext';
import { FaHeart } from "react-icons/fa";
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { toast, ToastContainer } from 'react-toastify';

function ProductDetails() {
    const { productId } = useParams();
    const { products, toggleIsCarted, toggleIsWished, decreaseQuantity, increaseQuantity } = useProductContext();
    const [product, setProduct] = useState(null);


    // Find the product when component loads
    useEffect(() => {
        const found = products.find(p => p._id === productId);
        setProduct(found);
    }, [productId, products]);
        const cartNotify = () => product.isCarted ? toast.success("Added to Cart!") : toast.warning("Removed from Cart!");;
    const wishlistNotify = () => product.isWished ? toast.success("Added to Wishlist!") : toast.warning("Removed from Wishlist!");;
    const itemInc = () => toast.success("Increased Quantity!");
    const itemDec = () => toast.info("Decreased Quantity!");

    // Show "not found" if product doesn't exist
    if (!product) {
        return (
            <div className="container my-5 text-center">
                <h3>Product not found</h3>
                <Link to="/products" className="btn btn-primary mt-3">Back to Products</Link>
            </div>
        );
    }

    return (
        <>
            <Header />
            <main className="container my-4">
                <div className="row">
                    {/* Product Image */}
                    <div className="col-md-6 mb-4">
                        <img
                            src={product.img}
                            alt={product.name}
                            className="img-fluid rounded"
                            style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'contain' }}
                        />
                    </div>

                    {/* Product Info */}
                    <div className="col-md-6">
                        <h1>{product.name}</h1>
                        <p className="text-muted">Category: {product.category}</p>
                        <h3 className='text-success'>₹{product.price}</h3>
                        <p>⭐ {product.rating}</p>

                        {/* Quantity Button */}
                        <div className="d-flex align-items-center gap-2">
                            <button
                                className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                                style={{ width: '36px', height: '36px', fontSize: '18px' }}
                                onClick={() => {
                                    decreaseQuantity(product._id);
                                    itemDec();
                                }}
                                disabled={product.quantity <= 1}
                            >
                                -
                            </button>

                            <div className="border border-secondary rounded px-3 py-1"
                                style={{ minWidth: '40px', textAlign: 'center', fontWeight: '500' }}>
                                {product.quantity}
                            </div>

                            <button
                                className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
                                style={{ width: '36px', height: '36px', fontSize: '18px' }}
                                onClick={() => {
                                    increaseQuantity(product._id);
                                    itemInc();
                                }}
                            >
                                +
                            </button>
                        </div>

                        {/* Buttons */}
                        <div className="mt-4 d-flex gap-2">
                            <button
                                className={`btn ${product.isCarted ? 'btn-secondary' : 'btn-primary'}`}
                                onClick={() => {
                                    toggleIsCarted(product._id);
                                    cartNotify();
                                }}
                            >
                                {product.isCarted ? 'Remove from Cart' : 'Add to Cart'}
                            </button>

                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => {
                                    toggleIsWished(product._id);
                                    wishlistNotify();
                                }}
                            >
                                <FaHeart
                                    size={18}
                                    className={product.isWished ? "text-danger" : "text-secondary"}
                                />
                            </button>
                        </div>

                        {/* Description */}
                        <div className="mt-4">
                            <h5>Description</h5>
                            <p>
                                This is a premium {product.category} product.
                                Great quality and comfortable to use.
                            </p>
                        </div>
                    </div>
                </div>
                <br />
                <hr />
                <br />
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className='mb-3'>Related Products</h3>
                    <Link to={`/products/category/all`} className="btn btn-outline-primary">
                        View More ...
                    </Link>
                </div>
                {/* Related Products */}
                <div className="row g-2">
                    {products.filter(p => p.category.some(cat => product.category.some(productCat => productCat.includes(cat)))).slice(0, 4).map((product) => (
                        <ProductCard key={product._id} productId={product._id} />
                    ))}
                </div>
            </main>

            <ToastContainer position="bottom-right" />
        </>
    );
}

export default ProductDetails;