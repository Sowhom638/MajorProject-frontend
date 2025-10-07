import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import CartPrice from "../components/CartPrice";
import { ToastContainer } from "react-toastify";
import useFetch from "../../useFetch";
function Cart() {
    const {data: cartedProducts, loading, error} = useFetch(`${import.meta.env.VITE_API_URL}/products/cart/cartItems`);

    return cartedProducts?.products?.length ? (
        <>
            <Header />
            <main className="container my-4">
                <h2 className="my-4">Cart List ({cartedProducts?.products?.length || 0})</h2>
                <div className="row">
                    <div className="col-md-9">
                        <div className="row g-4">
                            {cartedProducts?.products?.map(product => (
                                <ProductCard key={product._id} productId={product._id} pageType="cart" />
                            ))}
                        </div>
                    </div>
                    <div className="col-md-3">
                        <CartPrice pageType="cart" />
                    </div>
                </div>

            </main>

            <ToastContainer position="bottom-right" />
        </>
    ) : (
        <>
            <Header />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <main className="container my-4">
                    <h2 className="my-4">Cart List</h2>
                    <h3 className="text-center">No product is cartlisted</h3>
                </main>
        </>
    );
}

export default Cart;