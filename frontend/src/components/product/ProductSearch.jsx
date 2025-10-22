import React, { Fragment, useEffect } from "react";
import { getProducts } from "../../actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from ".././layouts/Loader";
import Product from ".././product/Product";
import { toast } from "react-toastify";
import MetaData from ".././layouts/MetaData";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";

const ProductSearch = () => {
  const dispatch = useDispatch();

  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [priceChanged, setPriceChanged] = useState(price);
  const [category, setCategory] = useState(null);
  const [rating, setRating] = useState(0);

  const { keyword } = useParams();

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo.selected + 1);
  };

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: "bottom-center",
      });
    }
    dispatch(getProducts(keyword, priceChanged, category, rating, currentPage));
  }, [error, dispatch, currentPage, keyword, priceChanged, category, rating]);

  const categories = [
    "Electronics",
    "Laptops",
    "Mobile Phones",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Search Products"} />
          <h1 id="products_heading">Search Results</h1>
          <section id="products" className="container mt-5">
            <div className="d-flex flex-column flex-md-row gap-4">
              <div
                className="p-4 shadow-sm border rounded-3 bg-white mb-4 mb-md-0"
                style={{ flex: "0 0 260px", height: "fit-content" }}
              >
                {/* Price Filter */}
                <div onMouseUp={() => setPriceChanged(price)}>
                  <h4 className="mb-3">Filter by Price</h4>
                  <Slider
                    range={true}
                    marks={{
                      1: "$1",
                      1000: "$1000",
                    }}
                    min={1}
                    max={1000}
                    defaultValue={price}
                    onChange={(price) => {
                      setPrice(price);
                    }}
                    handleRender={(renderProps) => {
                      return (
                        <Tooltip
                          overlay={`$${renderProps.props["aria-valuenow"]}`}
                        >
                          <div {...renderProps.props} />
                        </Tooltip>
                      );
                    }}
                  />
                </div>
                <hr className="my-5" />
                {/* Category Filter */}
                <div className="mt-3">
                  <h3 className="mb-3">Categories</h3>
                  <ul className="pl-0">
                    {categories.map((cat) => (
                      <li
                        style={{
                          cursor: "pointer",
                        //   listStyle: "none",
                          color: category === cat ? "#f39c12" : "#333",
                          fontWeight: category === cat ? "600" : "400",
                        }}
                        key={cat}
                        onClick={() => {
                          setCategory(cat);
                        }}
                      >
                        {cat}
                      </li>
                    ))}
                  </ul>
                </div>
                <hr className="my-5" />
                {/* Ratings Filter */}
                <div className="mt-3">
                  <h3 className="mb-3">Ratings</h3>
                  <ul className="pl-0">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <li
                        style={{
                          cursor: "pointer",
                          listStyle: "none",
                          opacity: rating === star ? 1 : 0.7,
                        }}
                        key={star}
                        onClick={() => {
                          setRating(star);
                        }}
                      >
                        <div className="rating-outer">
                          <div
                            className="rating-inner"
                            style={{
                              width: `${star * 20}%`,
                            }}
                          ></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex-grow-1 ml-5 pt-5">
                <div className="row g-4">
                  {productsCount > 0 ? (
                    products.map((product) => (
                      <Product key={product._id} col={4} product={product} />
                    ))
                  ) : (
                    <h4 className="text-center ml-5">No Products Found</h4>
                  )}
                </div>
              </div>
            </div>
          </section>
          {productsCount > 0 && productsCount > resPerPage ? (
            <div className="d-flex justify-content-center mt-5">
              <ReactPaginate
                previousLabel={"Prev"}
                nextLabel={"Next"}
                breakLabel={"..."}
                onPageChange={setCurrentPageNo}
                pageCount={Math.ceil(productsCount / resPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
                forcePage={currentPage - 1} // syncs current page with state
              />
            </div>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductSearch;
