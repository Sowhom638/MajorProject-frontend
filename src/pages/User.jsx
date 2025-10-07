// UserProfile.jsx
import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaShoppingBag } from 'react-icons/fa';
import useProductContext from '../context/ProductContext';
import Header from '../components/Header';
import useFetch from '../../useFetch';

const UserProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState(123456);

  const { addresses, addAddress } = useProductContext();
  const { data: ordersData, loading, error } = useFetch(`${import.meta.env.VITE_API_URL}/orders`);

  // Static user info
  const userProfile = {
    name: "Sowhom Ghosh",
    email: "sowhom.ghosh@example.com",
    phone: "+91 98765 43210",
  };

  const orders = ordersData?.orders || [];
  const hasOrders = orders.length > 0;

  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="row g-4">
          {/* Left Column: Profile + Orders */}
          <div className="col-lg-4">
            {/* Profile Card */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0 d-flex align-items-center">
                  <FaUser className="me-2" /> User Profile
                </h5>
              </div>
              <div className="card-body text-center">
                <div className="mx-auto mb-3">
                  <div className="bg-light rounded-circle d-flex flex-column align-items-center justify-content-center">
                    <FaUser size={40} className="text-secondary" />
                    <h5 className="mb-3">{userProfile.name}</h5>
                  </div>
                </div>
                

                <div className="text-start mt-3">
                  <div className="d-flex align-items-start mb-3">
                    <FaEnvelope className="text-primary mt-1 me-3" />
                    <div>
                      <small className="text-muted">Email</small>
                      <p className="mb-0 fw-medium">{userProfile.email}</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start mb-3">
                    <FaPhone className="text-primary mt-1 me-3" />
                    <div>
                      <small className="text-muted">Phone</small>
                      <p className="mb-0 fw-medium">{userProfile.phone}</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start">
                    <FaMapMarkerAlt className="text-primary mt-1 me-3" />
                    <div>
                      <small className="text-muted">Saved Addresses</small>
                      {addresses && addresses.length > 0 ? (
                        <ul className="mb-0 ps-3">
                          {addresses.map((add) => (
                            <li key={add._id} className="mb-1">
                              <b>{add.firstName} {add.lastName}</b> – {add.street}, {add.city}, {add.district}, {add.state} – {add.zipcode}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mb-0 text-muted fst-italic">No address saved</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="card shadow-sm">

              <div className="card-body">
                {loading ? (
                  <p className="text-muted">Loading orders...</p>
                ) : error ? (
                  <p className="text-danger">Failed to load orders: {error.message}</p>
                ) : hasOrders ? (
                  <div className="row g-3">
                    <h5 className="mb-0 d-flex align-items-center">
                  <u>Order History</u>
                </h5>
                    {orders.map((order) =>
                      order.items.map((item) => (
                        <div className="col-12" key={`${order._id}-${item.productId}`}>
                          <div className="d-flex align-items-center">
                            <img
                              src={item.img}
                              alt={item.name}
                              className="rounded"
                              style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                            />
                            <div className="ms-3">
                              <h6 className="mb-1">{item.name}</h6>
                              <p className="mb-0 text-muted">
                                {item.quantity} item{item.quantity > 1 ? 's' : ''} • ₹{item.price * item.quantity}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <p className="text-muted text-center my-3">No orders yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Add Address Form */}
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-header bg-info text-white">
                <h5 className="mb-0">Add New Address</h5>
              </div>
              <div className="card-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addAddress({ firstName, lastName, street, city, district, state, zipcode });
                    // Reset form
                    setFirstName('');
                    setLastName('');
                    setStreet('');
                    setCity('');
                    setDistrict('');
                    setState('');
                    setZipcode(123456);
                  }}
                >
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="firstName" className="form-label fw-medium">
                        First Name <span className="text-danger">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        id="firstName"
                        className="form-control"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="lastName" className="form-label fw-medium">
                        Last Name <span className="text-danger">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        id="lastName"
                        className="form-control"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="streetName" className="form-label fw-medium">
                      Street Address <span className="text-danger">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      id="streetName"
                      className="form-control"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label htmlFor="cityName" className="form-label fw-medium">
                        City <span className="text-danger">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        id="cityName"
                        className="form-control"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="districtName" className="form-label fw-medium">
                        District <span className="text-danger">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        id="districtName"
                        className="form-control"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="stateName" className="form-label fw-medium">
                        State <span className="text-danger">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        id="stateName"
                        className="form-control"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6">
                      <label htmlFor="zipcode" className="form-label fw-medium">
                        Zipcode <span className="text-danger">*</span>
                      </label>
                      <input
                        required
                        type="number"
                        id="zipcode"
                        className="form-control"
                        value={zipcode}
                        onChange={(e) => setZipcode(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary px-4 py-2">
                    Add Address
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;