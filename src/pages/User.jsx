// UserProfile.jsx
import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import useProductContext from '../context/ProductContext';
import Header from '../components/Header';
import useFetch from '../../useFetch';

const User = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState(123456);
  const { addresses, addAddress } = useProductContext();
  const { data: cartedProducts, loading, error } = useFetch(`${import.meta.env.VITE_API_URL}/products/cart/cartItems`);

  // Static user profile data
  const userProfile = {
    name: "Sowhom Ghosh",
    email: "sowhom.ghosh@example.com",
    phone: "+91 98765 43210",
    address: addresses || "No Address is mentioned"
  };

  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="row">
          {/* Profile Section */}
          <div className="col-lg-4 mb-4">
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0"><FaUser className="me-2" /> User Profile</h4>
              </div>
              <div className="card-body">
                <div className="text-center mb-4">
                  <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center"
                    style={{ width: '120px', height: '120px' }}>
                    <FaUser size={60} className="text-secondary" />
                  </div>
                  <h5 className="mt-3">{userProfile.name}</h5>
                </div>

                <div className="profile-info">
                  <div className="d-flex align-items-start mb-3">
                    <FaEnvelope className="text-primary mt-1 me-3" />
                    <div>
                      <small className="text-muted">Email</small>
                      <p className="mb-0">{userProfile.email}</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start mb-3">
                    <FaPhone className="text-primary mt-1 me-3" />
                    <div>
                      <small className="text-muted">Phone</small>
                      <p className="mb-0">{userProfile.phone}</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start">
                    <FaMapMarkerAlt className="text-primary mt-1 me-3" />
                    <div>
                      <small className="text-muted">Address</small>
                      <ul className="mb-0">{userProfile.address?.length ? userProfile.address?.map(add => (
                        <li key={add._id}><b>{add.firstName} {add.lastName}</b> - {add.street}, {add.city}, {add.district}, {add.state} - {add.zipcode}</li>
                      )) : (
                        <li><p>No address is added. Please add new address</p></li>
                      )}</ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {cartedProducts?.products?.length === 0 ? (
              <div>
                {loading && <p>Loading cart items...</p>}
                {error && <p>Error loading cart items: {error.message}</p>}
              <p className="text-muted">No items in cart.</p>
              </div>
            ) : (
              <div className="row g-3">
                <p className="my-1"><u>Ordered Items</u></p>
                {cartedProducts?.products?.map((product) => (
                  <div>
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
            )}
          </div>

          {/* Add new Address Section */}
          <div className="col-lg-8">
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
        </div>
      </div>
    </>
  );
};

export default User;