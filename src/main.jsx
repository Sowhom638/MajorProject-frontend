import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Address from './pages/Address.jsx'
import Cart from './pages/Cart.jsx'
import CheckOut from './pages/CheckOut.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import ProductListing from './pages/ProductListing.jsx'
import User from './pages/User.jsx'
import WishList from "./pages/WishList.jsx";
import { ProductProvider } from './context/ProductContext.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/user/address",
    element: <Address />
  },
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "/checkOut",
    element: <CheckOut />
  },
  {
    path: "/products/:productId",
    element: <ProductDetails />
  },
  {
    path: "/products/category/:categoryId",
    element: <ProductListing />
  },
  {
    path: "/user",
    element: <User />
  },
  {
    path: "/wishList",
    element: <WishList />
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider>
    <RouterProvider router={router} />
    </ProductProvider>
  </StrictMode>,
)
