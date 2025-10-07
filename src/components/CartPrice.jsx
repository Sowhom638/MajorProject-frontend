import { Link } from "react-router-dom";
import useProductContext from '../context/ProductContext';
import useFetch from "../../useFetch";
function CartPrice({ pageType }) {
    const { finalPrice, setFinalPrice, selectedAddress } = useProductContext();
    const { data: cartedProducts, loading, error } = useFetch(`${import.meta.env.VITE_API_URL}/products/cart/cartItems`);

    let itemNumber = 0, totalPrice = 0, discount = 0, deliveryCharges = 0;
    if (cartedProducts && cartedProducts?.products?.length > 0) {
        itemNumber = cartedProducts?.products.reduce((acc, product) => acc += product.quantity, 0);
        totalPrice = cartedProducts?.products.reduce((acc, product) => acc += product.price * product.quantity, 0);

        setFinalPrice(totalPrice - discount + deliveryCharges);
    }

    let linkDirection, linkContent;
    if (pageType === "address") {
        if (selectedAddress !== "Not yet selected") {
            linkDirection = "/checkOut";
            linkContent = "Proceed to Checkout";
        }
    } else if (pageType === "cart") {
        linkDirection = "/user/address";
        linkContent = "Choose Address";
    }
    return cartedProducts?.products?.length > 0 ? (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Price Details</h5>
                    <p className="card-text">Price ({itemNumber} items): <span className="float-end">{totalPrice}</span></p>
                    <p className="card-text">Discount: <span className="float-end">{discount}</span></p>
                    <p className="card-text">Delivery Charges: <span className="float-end">{deliveryCharges}</span></p>
                    <hr />
                    <h6>Total Amount: <span className="float-end">₹{finalPrice}</span></h6>
                    {selectedAddress === "Not yet selected" && pageType === "address" && <p className="text-danger">* Please select an address to proceed</p>}
                    {linkContent && linkDirection && <Link to={linkDirection} className="btn btn-primary w-100 mt-3">{linkContent}</Link>}
                </div>
            </div>
        </>
    ) : (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
        </>
    );
}

export default CartPrice;