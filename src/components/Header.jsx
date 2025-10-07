import { FaRegUserCircle } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from 'react-router-dom';
import useProductContext from '../context/ProductContext';
import ProductCount from './ProductCount';

const Header = () => {
    const { search, setSearch } = useProductContext();
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex align-items-center justify-content-center">
            <div className="container-fluid container">
                <Link className="navbar-brand" to="/">MyShoppingApp</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex w-100">
                        <input
                            className="rounded-pill me-2 text-center"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>

                    <ul className="navbar-nav">
                        <li className="nav-item m-1">
                            <Link className="nav-link" to="/wishlist">
                                <div className="d-flex">
                                    <CiHeart size={24} /><ProductCount property="isWished" />
                                </div>
                            </Link>
                        </li>
                        <li className="nav-item m-1">
                            <Link className="nav-link" to="/cart">
                            <div className="d-flex">
                                    <LuShoppingCart size={24} /><ProductCount property="isCarted" />
                                </div>
                            </Link>
                        </li>
                        <li className="nav-item m-1">
                            <Link className="btn btn-outline-success" to="/user">
                                <FaRegUserCircle size={24} />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;