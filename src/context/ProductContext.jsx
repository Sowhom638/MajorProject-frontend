import { createContext, useContext, useState, useEffect } from "react";
import useFetch from '../../useFetch';

const ProductContext = createContext();

// const addressData = [
//     {
//         _id: 1,
//         firstName: "John",
//         lastName: "Doe",
//         street: "123 Main St",
//         city: "New York",
//         district: "Manhattan",
//         state: "NY",
//         zipcode: 311414
//     }
// ];

export function ProductProvider({ children }) {
    // State for products
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Other states
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('Not yet selected');
    const [search, setSearch] = useState("");
    const [finalPrice, setFinalPrice] = useState(0);
    const [preservedCart, setPreservedCart] = useState(() => {
        const saved = localStorage.getItem('preservedCart');
        if (!saved || saved === "undefined") {
            return [];
        }
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.warn("Failed to parse preservedCart from localStorage", e);
            return [];
        }
    });

    // Fetch products
    const { data: productsData, loading: productsLoading, error: productsError } = useFetch(`${import.meta.env.VITE_API_URL}/products`);

    // Fetch categories
    const { data: categoriesData, loading: categoriesLoading, error: categoriesError } = useFetch(`${import.meta.env.VITE_API_URL}/categories`);

    // Fetch addresses
    const { data: addressesData, loading: addressesLoading, error: addressesError } = useFetch(`${import.meta.env.VITE_API_URL}/addresses`);

    const allCategories = categoriesData?.categories ? [...categoriesData.categories] : [];

    // Persist preservedCart to localStorage
    useEffect(() => {
        localStorage.setItem('preservedCart', JSON.stringify(productsData?.product?.length > 0 ? [...productsData?.product?.filter(product => product.isCarted)] : []));
    }, [preservedCart]);

    // Initialize products when data is available
    useEffect(() => {
        if (productsData) {
            // Add default properties if they don't exist in your API response
            const productsWithDefaults = productsData.product?.map(product => ({
                ...product,
                isCarted: product.isCarted || false,
                isWished: product.isWished || false,
                quantity: product.quantity || 1
            })) || [];
            setProducts(productsWithDefaults);
            setLoading(false);
        }
        if (addressesData) {
            setAddresses(addressesData.addresses || []);
        }
    }, [productsData]);

    // Handle products error
    useEffect(() => {
        if (productsError) {
            setError(productsError);
            setLoading(false);
        }
    }, [productsError]);

    async function addAddress(formData) {
        try {
            // 🔁 Replace with your actual API endpoint
            const response = await fetch(`${import.meta.env.VITE_API_URL}/addresses`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to create address");

            const data = await response.json();
            console.log("Success:", data);
            alert("Address created successfully!");
            // Optional: reset form or redirect
        } catch (err) {
            console.error(err);
            alert("Error creating Address. Please try again.");
        };
    }

    async function toggleIsCarted(selectedId) {
        const currentProduct = products.find(p => p._id === selectedId);
        if (!currentProduct) return;
        setProducts(prevProducts =>
            prevProducts.map((product) =>
                product._id === selectedId
                    ? { ...product, isCarted: !currentProduct.isCarted }
                    : product
            )
        );
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${selectedId}`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    productId: selectedId,
                    isCarted: !currentProduct.isCarted
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update cart status');
            }
        } catch (error) {
            console.error('Update failed:', error);

            // Revert optimistic update on error
            setProducts(prevProducts =>
                prevProducts.map((product) => {
                    if (product._id === selectedId) {
                        return { ...product, isCarted: currentProduct.isCarted };
                    }
                    return product;
                })
            );
        }
    }

    async function toggleIsWished(selectedId) {
        const currentProduct = products.find(p => p._id === selectedId);
        if (!currentProduct) return;
        setProducts(prevProducts =>
            prevProducts.map((product) =>
                product._id === selectedId
                    ? { ...product, isWished: !currentProduct.isWished }
                    : product
            )
        );
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${selectedId}`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    productId: selectedId,
                    isWished: !currentProduct.isWished
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update cart status');
            }
        } catch (error) {
            console.error('Update failed:', error);

            // Revert optimistic update on error
            setProducts(prevProducts =>
                prevProducts.map((product) => {
                    if (product._id === selectedId) {
                        return { ...product, isWished: currentProduct.isWished };
                    }
                    return product;
                })
            );
        }
    }

    async function increaseQuantity(selectedId) {
        const currentProduct = products.find(p => p._id === selectedId);
        if (!currentProduct) return;

        const newQuantity = currentProduct.quantity + 1;
        setProducts(prevProducts =>
            prevProducts.map((product) =>
                (product._id === selectedId)
                    ? { ...product, quantity: newQuantity } : product)
        );
        try {
            // Send POST request to update on server
            const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${selectedId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: selectedId,
                    quantity: newQuantity
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update quantity');
            }


        } catch (error) {
            console.error('Update failed:', error);

            // Revert optimistic update on error
            setProducts(prevProducts =>
                prevProducts.map((product) => {
                    if (product._id === selectedId) {
                        return { ...product, quantity: product.quantity - 1 };
                    }
                    return product;
                })
            );
        }

    }

    async function decreaseQuantity(selectedId) {
        const currentProduct = products.find(p => p._id === selectedId);
        if (!currentProduct) return;

        const newQuantity = currentProduct.quantity - 1;
        setProducts(prevProducts =>
            prevProducts.map((product) =>
                (product._id === selectedId)
                    ? { ...product, quantity: newQuantity } : product)
        );
        try {
            // Send POST request to update on server
            const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${selectedId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: selectedId,
                    quantity: newQuantity
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update quantity');
            }

            // Optional: Update with server response if needed
            const updatedProduct = await response.json();
            console.log('Quantity updated successfully:', updatedProduct);

        } catch (error) {
            console.error('Update failed:', error);

            // Revert optimistic update on error
            setProducts(prevProducts =>
                prevProducts.map((product) => {
                    if (product._id === selectedId) {
                        return { ...product, quantity: product.quantity + 1 };
                    }
                    return product;
                })
            );
        }
    }

    // Show loading state while fetching
    if (loading || productsLoading || categoriesLoading) {
        return <div>Loading...</div>;
    }

    // Show error state if needed
    if (error || productsError || categoriesError) {
        return <div>Error: {error?.message || productsError?.message || categoriesError?.message}</div>;
    }

    return (
        <ProductContext.Provider
            value={{
                products,
                addresses,
                search,
                setSearch,
                addAddress,
                selectedAddress,
                setSelectedAddress,
                finalPrice,
                setFinalPrice,
                preservedCart,
                setPreservedCart,
                allCategories,
                toggleIsCarted,
                toggleIsWished,
                decreaseQuantity,
                increaseQuantity
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};

export default useProductContext;