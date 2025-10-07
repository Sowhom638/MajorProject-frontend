import { Link } from "react-router-dom";
import useFetch from '../../useFetch';
import useProductContext from "../context/ProductContext";

function data() {
    const { data, loading, error } = useFetch(`${import.meta.env.VITE_API_URL}/categories`);
    const {allCategories} = useProductContext();
    
    return data ? (
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4 justify-content-center">
          {allCategories.map((category) => (
            <div className="col" key={category.name}>
              <Link
                to={`/products/category/${category._id}`}
                className="text-decoration-none w-100"
              >
                <div className="position-relative rounded overflow-hidden shadow-sm h-100">
                  <img
                    src={category.img}
                    className="img-fluid w-100"
                    alt={category.name}
                    style={{ height: '175px', objectFit: 'cover', objectPosition: 'center' }}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                    <span className="bg-white bg-opacity-50 text-dark fw-bold py-2 px-3 rounded shadow-sm text-center">
                      {category.name.toUpperCase()}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div> ) : (
          <div>
            {loading && <p>Loading categories...</p>}
            {error && <p>Error loading categories: {error.message}</p>}
          </div>
          
        );
}

export default data;