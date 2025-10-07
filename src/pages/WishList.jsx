import { ToastContainer } from "react-toastify";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import useProductContext from '../context/ProductContext';
import useFetch from "../../useFetch";

function WishList() {
    const { search } = useProductContext();
    const {data: wishedProducts, loading, error} = useFetch(`${import.meta.env.VITE_API_URL}/products/wishlist/wishlistItems`);
    const filteredWishedProducts = wishedProducts?.product?.filter(product => {
        if (product.category.some(cat => cat.toLowerCase().includes(search.toLowerCase())) || product.name.toLowerCase().includes(search.toLowerCase())) {
            return true;
        }
    });

    return filteredWishedProducts?.length ? (
        <>
            <Header />
            <main className="container my-4">
                <h2 className="my-4">Wishlist ({filteredWishedProducts?.length || 0})</h2>
                <div className="row px-5 g-4">
                    {filteredWishedProducts?.map(product => (
                        <ProductCard key={product._id} productId={product._id} pageType="wishlist" />
                    ))}
                </div>
            </main>

            <ToastContainer position="bottom-right" />
        </>
    ) : (
        <>
        <Header />
                <main className="container my-4">
                    {loading && <p>Loading wishlist...</p>}
                    {error && <p className="text-danger">Error loading wishlist: {error}</p>}
                    <h2 className="my-4">Wishlist</h2>
                    <h3 className="text-center">No product is wishlisted</h3>
                </main>
        </>
    );
}

export default WishList;