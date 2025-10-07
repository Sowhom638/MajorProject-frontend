import { Link } from 'react-router-dom';
import useProductContext from '../context/ProductContext';
import { FaHeart } from "react-icons/fa";
import { toast } from 'react-toastify';
function ProductCard({ productId, pageType }) {
    const { products, toggleIsCarted, toggleIsWished, decreaseQuantity, increaseQuantity } = useProductContext();
    const filteredProduct = products.find(product => product._id === productId);
    const cartNotify = () => !filteredProduct.isCarted ? toast.success("Added to Cart!") : toast.warning("Removed from Cart!");;
    const wishlistNotify = () => !filteredProduct.isWished ? toast.success("Added to Wishlist!") : toast.warning("Removed from Wishlist!");;
    const itemInc = () => toast.success("Increased Quantity!");
    const itemDec = () => toast.info("Decreased Quantity!");
    let buttonContent = '';
    if (pageType === "wishlist") {
        if (filteredProduct.isCarted) {
            buttonContent = "Remove from Cart";
        } else {
            buttonContent = "Move to Cart";
        }
    } else {
        filteredProduct.isCarted ? buttonContent = "Remove from Cart" : buttonContent = "Add to Cart";
    }
    return (
        <>
            <div key={filteredProduct._id} className="col-md-4">
                <div className="card h-100">
                    <Link to={`/products/${filteredProduct._id}`}>
                        <img
                            src={filteredProduct.img}
                            alt={filteredProduct.name}
                            className="card-img-top"
                            style={{ height: '50vh', objectFit: 'cover' }}
                        />
                    </Link>
                    <div className="card-body d-flex flex-column">
                        <Link to={`/products/${filteredProduct._id}`} style={{ textDecoration: 'none', }}>
                            <h5 className="card-title">{filteredProduct.name}</h5>
                        </Link>
                        <p className="text-muted">₹{filteredProduct.price}</p>
                        {/* Quantity Button */}
                        <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
                            <p>⭐ {filteredProduct.rating}</p>
                            <div className='d-flex align-items-center gap-2'>
                                <button
                                    className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                                    style={{ width: '36px', height: '36px', fontSize: '18px' }}
                                    onClick={() => {
                                        decreaseQuantity(filteredProduct._id)
                                        itemDec();
                                    }}
                                    disabled={filteredProduct.quantity <= 1}
                                >
                                    -
                                </button>

                                <div className="border border-secondary rounded px-3 py-1"
                                    style={{ minWidth: '40px', textAlign: 'center', fontWeight: '500' }}>
                                    {filteredProduct.quantity}
                                </div>

                                <button
                                    className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
                                    style={{ width: '36px', height: '36px', fontSize: '18px' }}
                                    onClick={() => {
                                        increaseQuantity(filteredProduct._id);
                                        itemInc();
                                    }}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="mt-auto d-flex gap-2">
                            {/* Add to Cart / Remove from Cart Button */}
                            <button
                                className={`btn flex-grow-1 d-flex align-items-center justify-content-center gap-1 py-2 ${filteredProduct.isCarted ? "btn-outline-secondary" : "btn-primary"
                                    }`}
                                onClick={() => {
                                    toggleIsCarted(filteredProduct._id);
                                    cartNotify();
                                }}
                            >
                                {buttonContent}
                            </button>
                            {/* Wishlist Heart Button */}
                            <button
                                className="btn btn-outline-secondary d-flex align-items-center justify-content-center p-2 rounded-circle"
                                style={{ width: '42px', height: '42px' }}
                                onClick={() => {
                                    toggleIsWished(filteredProduct._id);
                                    wishlistNotify();
                                }}
                            >
                                <FaHeart
                                    size={18}
                                    className={filteredProduct.isWished ? "text-danger" : "text-secondary"}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default ProductCard;