import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
            <footer className="bg-dark text-light py-4 mt-5">
                <div className="container">
                    <div className="row d-flex justify-content-center flex-wrap">
                        <div className="col-md-5 m-2">
                            <Link
                                to="/products/category/all"
                                className="text-decoration-none d-block"
                            >
                                <div className="card bg-gradient border-0 rounded-3 shadow-sm overflow-hidden h-100">
                                    <div className="card-body d-flex flex-column flex-md-row align-items-center p-3 p-md-4">
                                        <div className="flex-shrink-0 mb-3 mb-md-0 me-md-4">
                                            <img
                                                src="https://images.unsplash.com/photo-1684932516132-493a32d55e97?q=80&w=433&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                className="rounded"
                                                alt="Summer Collection"
                                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className="text-center text-md-start">
                                            <span className="badge bg-light text-dark fw-bold mb-2">NEW ARRIVAL</span>
                                            <h5 className="card-title mb-2">Summer Collection</h5>
                                            <p className="card-text text-muted mb-0">
                                                Discover our latest styles — light, fresh, and perfect for the season.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-5 m-2">
                            <Link
                                to="/products/category/all"
                                className="text-decoration-none d-block"
                            >
                                <div className="card bg-gradient border-0 rounded-3 shadow-sm overflow-hidden h-100">
                                    <div className="card-body d-flex flex-column flex-md-row align-items-center p-3 p-md-4">
                                        <div className="flex-shrink-0 mb-3 mb-md-0 me-md-4">
                                            <img
                                                src="https://images.unsplash.com/photo-1684932516132-493a32d55e97?q=80&w=433&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                className="rounded"
                                                alt="Summer Collection"
                                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className="text-center text-md-start">
                                            <span className="badge bg-light text-dark fw-bold mb-2">NEW ARRIVAL</span>
                                            <h5 className="card-title mb-2">Summer Collection</h5>
                                            <p className="card-text text-muted mb-0">
                                                Discover our latest styles — light, fresh, and perfect for the season.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;