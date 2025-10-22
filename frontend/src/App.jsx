import { useState } from "react";
import "./App.css";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetail from "./components/product/ProductDetail";
import { HelmetProvider } from "react-helmet-async";
import ProductSearch from "./components/product/ProductSearch";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <div className="app">
          <HelmetProvider>
            <Header />
            <div className="container container-fluid">
              <ToastContainer theme="dark" />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/search/:keyword" element={<ProductSearch />}/>
              </Routes>
            </div>
            <Footer />
          </HelmetProvider>
        </div>
      </Router>
    </>
  );
}

export default App;
