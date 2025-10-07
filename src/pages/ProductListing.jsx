import React, { useEffect, useState, useMemo } from 'react';
import useProductContext from '../context/ProductContext';
import Header from '../components/Header';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { ToastContainer } from 'react-toastify';
import useFetch from '../../useFetch';

function ProductListing() {
    const { categoryId } = useParams();
    const { products, search, allCategories } = useProductContext();

    // Fetch category data (for single category) or get all categories
    const { data, loading, error } = useFetch(`${import.meta.env.VITE_API_URL}/categories/${categoryId}`);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [minRating, setMinRating] = useState(0);
    const [sortVal, setSortVal] = useState("LowToHigh");

    useEffect(() => {
        if (data) {
            if (categoryId === "all") {
                setSelectedCategories(allCategories.map(cat => cat.name));
            } else {
                if (data.category?.name) {
                    setSelectedCategories([data.category.name]);
                }
            }
        }
    }, [data, categoryId, products]);

    function handleSelectedCategory(e) {
        const { value, checked } = e.target;
        setSelectedCategories(prev => {
            if (checked) {
                return [...prev, value];
            } else {
                return prev.filter(category => category !== value);
            }
        });
    }

    let filteredProducts = products.filter(product => selectedCategories?.some(cat => product.category.includes(cat)));
    filteredProducts = filteredProducts.filter(product => product.rating >= minRating);
    filteredProducts = filteredProducts.filter(product => {
        if (product.category.some(cat => cat.toLowerCase().includes(search.toLowerCase())) || product.name.toLowerCase().includes(search.toLowerCase())) {
            return true;
        }
    });

    if (sortVal === "LowToHigh") {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    }

    const allPossibleCategories = [...allCategories.map(cat => cat.name)];

    // Loading and error states
    if (loading && !data) {
        return (
            <div className="container my-4">
                <p>Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container my-4">
                <p>Error loading products: {error.message}</p>
            </div>
        );
    }

    return (
        <>
            <Header />
            <main className="container my-4">
                <h2 className="my-4">Products</h2>
                <div className="row">
                    <div className="col-md-2 my-1">
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <label htmlFor="categoryFilter" className="card-title"><b>Category</b></label>
                                    <div id="categoryFilter">
                                        {allPossibleCategories.map(category => (
                                            <div key={category}>
                                                <input
                                                    type='checkbox'
                                                    name='category'
                                                    value={category}
                                                    checked={selectedCategories.includes(category)}
                                                    onChange={handleSelectedCategory}
                                                /> {category}<br />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="ratingFilter" className="form-label">
                                        <b>Min Rating:</b> <span id="ratingValue">{minRating}</span>
                                    </label>
                                    <input
                                        type="range"
                                        id="ratingFilter"
                                        className="form-range"
                                        value={minRating}
                                        min="0"
                                        max="5"
                                        step="0.5"
                                        onChange={(e) => setMinRating(parseFloat(e.target.value))}
                                    />
                                </div>

                                <label htmlFor="sortByPrice"><b>Sort By Price:</b></label>
                                <div id="sortByPrice">
                                    <input
                                        type="radio"
                                        name="sortByPrice"
                                        onChange={(e) => setSortVal(e.target.value)}
                                        value="LowToHigh"
                                        checked={sortVal === "LowToHigh"}
                                    /> Low to High<br />
                                    <input
                                        type="radio"
                                        name="sortByPrice"
                                        onChange={(e) => setSortVal(e.target.value)}
                                        value="HighToLow"
                                        checked={sortVal === "HighToLow"}
                                    /> High to Low<br />
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedCategories(allPossibleCategories);
                                    setMinRating(0);
                                    setSortVal("LowToHigh");
                                }}
                                className='border border-secondary m-2'
                            >
                                Reset Filter
                            </button>
                        </div>
                    </div>

                    {/* Product Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className="col-md-10 my-1">
                            <div className="row g-2">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product._id} productId={product._id} />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="col-md-10 my-1 d-flex justify-content-center align-items-center">
                            <h3>No Products Found</h3>
                        </div>
                    )}
                </div>
            </main>
            <ToastContainer position="bottom-right" />
        </>
    );
}

export default ProductListing;