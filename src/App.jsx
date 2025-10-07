import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoryList from "./components/CategoryList";

function App() {


  return (
    <>
      <ToastContainer position="bottom-right" />
      <Header />
      <main className="container py-4">
        <CategoryList />

        {/* Landing Image */}
        <div className="mt-5">
          <img
            src="https://images.unsplash.com/photo-1748515896775-30b183516cc7?q=50&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="img-fluid rounded shadow"
            alt="landing"
            style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover' }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;