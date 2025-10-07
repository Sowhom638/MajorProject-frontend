import useProductContext from "../context/ProductContext";

function ProductCount({property}) {
    const {products} = useProductContext();
    const filteredProducts = products.filter((product)=> product[property]);
    return ( filteredProducts.length > 0 && <span className="px-2 text-bg-danger rounded-pill">{filteredProducts.length}</span> );
}

export default ProductCount;