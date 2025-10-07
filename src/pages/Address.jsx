import Header from "../components/Header";
import useProductContext from '../context/ProductContext';
import CartPrice from "../components/CartPrice";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import useFetch from "../../useFetch";
function Address() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState(123456);
    const { addresses, addAddress, setSelectedAddress } = useProductContext();
    const { data: cartedProducts, loading, error } = useFetch(`${import.meta.env.VITE_API_URL}/products/cart/cartItems`);

    return cartedProducts ? (
        <>
            <Header />
            <main className="container py-3">
                <Link style={{ textDecoration: 'none' }} to="/cart"><IoIosArrowBack /> Back to Cart</Link>
                <h2 className="my-4">Choose Address </h2>
                <div className="row">
                    {/* Form Column */}
                    <div className="col-lg-8 col-md-12 mb-4 mb-lg-0">
                        {addresses.length > 0 ? addresses.map(address => (
                            <div className="card mb-3 d-flex align-items-center flex-row" key={address._id}>
                                <input required className="form-check-input mt-0 mx-2" type="radio" name="address" value={`${address.firstName} ${address.lastName}  - ${address.street}, ${address.city}, ${address.district}, ${address.state}, ${address.zipcode}`}
                                    onChange={(e) => setSelectedAddress(e.target.value)} />
                                <div className="card-body"><b>{address.firstName} {address.lastName}</b> - {address.street}, {address.city}, {address.district}, {address.state}, {address.zipcode}</div>
                            </div>
                        )) : <p className="text-muted">No saved addresses. Please add a new address.</p>}
                        <h2 className="my-4">Add New Address</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            addAddress({ firstName, lastName, street, city, district, state, zipcode });
                            setFirstName('');
                            setLastName('');
                            setStreet('');
                            setCity('');
                            setDistrict('');
                            setState('');
                            setZipcode(123456);
                        }}>
                            {/* First & Last Name */}
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="firstName" className="form-label">First Name<span className="text-danger">*</span></label>
                                    <input required type="text" id="firstName" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="lastName" className="form-label">Last Name<span className="text-danger">*</span></label>
                                    <input required type="text" id="lastName" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </div>
                            </div>

                            {/* Street */}
                            <div className="mb-3">
                                <label htmlFor="streetName" className="form-label">Street Address<span className="text-danger">*</span></label>
                                <input required type="text" id="streetName" className="form-control" value={street} onChange={(e) => setStreet(e.target.value)} />
                            </div>

                            {/* City, District, State */}
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="cityName" className="form-label">City<span className="text-danger">*</span></label>
                                    <input required type="text" id="cityName" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="districtName" className="form-label">District<span className="text-danger">*</span></label>
                                    <input required type="text" id="districtName" className="form-control" value={district} onChange={(e) => setDistrict(e.target.value)} />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="stateName" className="form-label">State<span className="text-danger">*</span></label>
                                    <input required type="text" id="stateName" className="form-control" value={state} onChange={(e) => setState(e.target.value)} />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="zipcode" className="form-label">State<span className="text-danger">*</span></label>
                                    <input required type="number" id="zipcode" className="form-control" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
                                </div>
                            </div>
                            <button className="btn btn-primary" type="submit">Add Address</button>
                        </form>
                    </div>

                    {/* Order Summary Column */}
                    <div className="col-lg-4 col-md-12">
                        <h5 className="mb-3">Order Summary</h5>
                        {cartedProducts?.products?.length === 0 ? (
                            <p className="text-muted">No items in cart.</p>
                        ) : (
                            cartedProducts?.products?.map((product) => (
                                <div className="card mb-3" key={product._id}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="col-4 col-md-5">
                                            <img
                                                src={product.img}
                                                className="img-fluid rounded-start"
                                                alt={product.name}
                                                style={{ maxHeight: '100px', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className="col-8 col-md-7">
                                            <div className="card-body py-2">
                                                <h6 className="card-title mb-1">{product.name}</h6>
                                                <p className="card-text mb-0">
                                                    <small className="text-muted">
                                                        {product.quantity} item{product.quantity > 1 ? 's' : ''}
                                                    </small>
                                                </p>
                                                <p className="card-text mb-0">
                                                    <strong>₹{product.price}</strong> x {product.quantity} = <strong>₹{product.price * product.quantity}</strong>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        <hr />
                        <CartPrice pageType="address" />
                    </div>
                </div>
            </main>
        </>
    ) : (
        <>
            <Header />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
        </>
    );
}

export default Address;