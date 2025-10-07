import { Link, useNavigate } from "react-router-dom";
import useProductContext from '../context/ProductContext';
import useFetch from "../../useFetch";
import { useEffect } from "react";
function CartPrice({ pageType }) {
    const { finalPrice, setFinalPrice, selectedAddress, preservedCart, setPreservedCart, toggleIsCarted } = useProductContext();
    const { data: cartedProducts, loading, error } = useFetch(`${import.meta.env.VITE_API_URL}/products/cart/cartItems`);
    const navigate = useNavigate();
    let itemNumber = 0, totalPrice = 0, discount = 0, deliveryCharges = 0;
    if (cartedProducts && cartedProducts?.products?.length > 0) {
        itemNumber = cartedProducts?.products.reduce((acc, product) => acc += product.quantity, 0);
        totalPrice = cartedProducts?.products.reduce((acc, product) => acc += product.price * product.quantity, 0);

        setFinalPrice(totalPrice - discount + deliveryCharges);
    }
    useEffect(() => {
        if (cartedProducts && Array.isArray(cartedProducts) && cartedProducts.length > 0) {
            setPreservedCart([...cartedProducts, preservedCart]);
        }
    }, [cartedProducts]);

    // , preservedCart, getCartedProducts
    let linkDirection, linkContent;
    const handlePlaceOrder = async () => {
        // Get carted products from context
        const cartItems = cartedProducts?.products || [];
        const total = cartItems.reduce((sum, p) => sum + p.price * p.quantity, 0);

        // Make sure address is selected (and is an object, not string)
        if (selectedAddress === 'Not yet selected') {
            alert('Please select a shipping address');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cartItems,
                    address: selectedAddress, // must be address object!
                    totalAmount: total
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Order failed');
            }

            // ✅ Navigate to checkout WITH order summary
            navigate('/checkout', {
                state: {
                    orderedItems: cartItems,
                    totalAmount: total,
                    shippingAddress: selectedAddress
                }

            });
            cartedProducts?.products?.length > 0 && cartedProducts?.products?.forEach(product => { if (product.isCarted) toggleIsCarted(product._id) });
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };
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
                    {linkContent && linkDirection &&
                        <Link to={linkDirection}
                            onClick={pageType === "address" ? handlePlaceOrder : null}
                            className="btn btn-primary w-100 mt-3">{linkContent}</Link>}
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