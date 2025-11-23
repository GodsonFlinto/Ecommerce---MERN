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

  const clearFilters = () => {
    setCategory(null);
    setRating(0);
    setPrice([1, 1000]);
    setPriceChanged([1, 1000]);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Search Products"} />
          
          <section id="products" className="mt-4">
            <div className="container-fluid">
              <div className="row">
                {/* Left Sidebar - Filters */}
                <div className="col-md-3 col-lg-3">
                  <div className="bg-white shadow-sm" style={{ 
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'sticky',
                    top: '20px'
                  }}>
                    {/* Filter Header */}
                    <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                      <h5 className="mb-0 font-weight-bold">
                        <i className="fa fa-filter mr-2 text-muted"></i>
                        Filters
                      </h5>
                      <button 
                        onClick={clearFilters}
                        className="btn btn-link btn-sm text-danger p-0"
                        style={{ 
                          fontSize: '12px',
                          fontWeight: '600',
                          textDecoration: 'none'
                        }}
                      >
                        CLEAR ALL
                      </button>
                    </div>

                    {/* Category Filter */}
                    <div className="border-bottom">
                      <div className="p-3 pb-0">
                        <h6 className="font-weight-bold mb-3" style={{ fontSize: '14px' }}>
                          CATEGORY
                        </h6>
                      </div>
                      <ul className="list-unstyled px-3 pb-3">
                        {categories.map((cat) => (
                          <li
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className="py-2 px-2"
                            style={{
                              cursor: "pointer",
                              fontSize: '14px',
                              color: category === cat ? "#dc3545" : "#212529",
                              fontWeight: category === cat ? "600" : "400",
                              backgroundColor: category === cat ? "#fff5f5" : "transparent",
                              borderRadius: '4px',
                              transition: 'all 0.2s',
                              marginBottom: '4px'
                            }}
                          >
                            {category === cat && (
                              <i className="fa fa-check-circle mr-2" style={{ fontSize: '12px' }}></i>
                            )}
                            {cat}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Price Filter */}
                    <div className="border-bottom">
                      <div className="p-3">
                        <h6 className="font-weight-bold mb-3" style={{ fontSize: '14px' }}>
                          PRICE RANGE
                        </h6>
                        <div onMouseUp={() => setPriceChanged(price)} className="px-2">
                          <Slider
                            range={true}
                            marks={{
                              1: { style: { fontSize: '11px', color: '#6c757d', marginTop: '5px' }, label: '$1' },
                              1000: { style: { fontSize: '11px', color: '#6c757d', marginTop: '5px' }, label: '$1000' },
                            }}
                            min={1}
                            max={1000}
                            defaultValue={price}
                            value={price}
                            onChange={(price) => setPrice(price)}
                            handleRender={(renderProps) => {
                              return (
                                <Tooltip
                                  overlay={`$${renderProps.props["aria-valuenow"]}`}
                                >
                                  <div {...renderProps.props} />
                                </Tooltip>
                              );
                            }}
                            trackStyle={[{ backgroundColor: '#dc3545', height: 5 }]}
                            railStyle={{ backgroundColor: '#e9ecef', height: 5 }}
                            handleStyle={[
                              { 
                                borderColor: '#dc3545', 
                                backgroundColor: '#fff',
                                boxShadow: '0 2px 6px rgba(220, 53, 69, 0.4)',
                                width: 18,
                                height: 18,
                                marginTop: -6.5,
                                borderWidth: 3
                              },
                              { 
                                borderColor: '#dc3545', 
                                backgroundColor: '#fff',
                                boxShadow: '0 2px 6px rgba(220, 53, 69, 0.4)',
                                width: 18,
                                height: 18,
                                marginTop: -6.5,
                                borderWidth: 3
                              }
                            ]}
                          />
                          <div className="d-flex justify-content-between mt-4">
                            <span className="badge badge-light border px-3 py-2" style={{ fontSize: '13px' }}>
                              ${price[0]}
                            </span>
                            <span className="text-muted">to</span>
                            <span className="badge badge-light border px-3 py-2" style={{ fontSize: '13px' }}>
                              ${price[1]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Ratings Filter */}
                    <div>
                      <div className="p-3 pb-0">
                        <h6 className="font-weight-bold mb-3" style={{ fontSize: '14px' }}>
                          CUSTOMER RATINGS
                        </h6>
                      </div>
                      <ul className="list-unstyled px-3 pb-3">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <li
                            key={star}
                            onClick={() => setRating(star)}
                            className="py-2 px-3 d-flex align-items-center"
                            style={{
                              cursor: "pointer",
                              backgroundColor: rating === star ? "#fff5f5" : "transparent",
                              borderRadius: '6px',
                              transition: 'all 0.2s',
                              marginBottom: '6px',
                              border: rating === star ? '1px solid #ffe5e5' : '1px solid transparent'
                            }}
                          >
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              backgroundColor: rating === star ? '#dc3545' : '#f8f9fa',
                              padding: '6px 12px',
                              borderRadius: '4px',
                              marginRight: '10px',
                              minWidth: '45px',
                              justifyContent: 'center'
                            }}>
                              <span style={{ 
                                fontSize: '14px', 
                                fontWeight: '600',
                                color: rating === star ? '#fff' : '#212529',
                                marginRight: '3px'
                              }}>
                                {star}
                              </span>
                              <i className="fa fa-star" style={{ 
                                fontSize: '11px',
                                color: rating === star ? '#fff' : '#ffc107'
                              }}></i>
                            </div>
                            <span style={{ 
                              fontSize: '14px', 
                              color: rating === star ? '#212529' : '#6c757d',
                              fontWeight: rating === star ? '500' : '400'
                            }}>
                              & above
                            </span>
                            {rating === star && (
                              <i className="fa fa-check-circle ml-auto text-danger" style={{ fontSize: '14px' }}></i>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Right Content - Products */}
                <div className="col-md-9 col-lg-9">
                  {/* Results Header */}
                  <div className="bg-white shadow-sm p-3 mb-4 d-flex justify-content-between align-items-center" style={{ borderRadius: '8px' }}>
                    <div>
                      <h1 className="mb-1" style={{ fontSize: '24px', fontWeight: '600', color: '#212529' }}>
                        {keyword ? (
                          <>
                            Search Results for <span className="text-danger">"{keyword}"</span>
                          </>
                        ) : (
                          'All Products'
                        )}
                      </h1>
                      <small className="text-muted">
                        {productsCount} {productsCount === 1 ? 'product' : 'products'} found
                      </small>
                    </div>
                    {(category || rating > 0 || price[0] !== 1 || price[1] !== 1000) && (
                      <div>
                        <span className="badge badge-danger px-3 py-2">
                          <i className="fa fa-filter mr-2"></i>
                          Filters Active
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Products Grid */}
                  <div className="row">
                    {productsCount > 0 ? (
                      products.map((product) => (
                        <Product key={product._id} col={4} product={product} />
                      ))
                    ) : (
                      <div className="col-12">
                        <div className="bg-white shadow-sm text-center p-5" style={{ borderRadius: '8px' }}>
                          <i className="fa fa-search" style={{ fontSize: '64px', color: '#dee2e6', marginBottom: '20px' }}></i>
                          <h3 className="mb-3">No Products Found</h3>
                          <p className="text-muted mb-4">
                            We couldn't find any products matching your search criteria.
                          </p>
                          <button
                            onClick={clearFilters}
                            className="btn btn-danger btn-lg px-5"
                            style={{ borderRadius: '50px' }}
                          >
                            Clear All Filters
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pagination */}
                  {productsCount > 0 && productsCount > resPerPage && (
                    <div className="d-flex justify-content-center mt-5 mb-5">
                      <ReactPaginate
                        previousLabel={"← Prev"}
                        nextLabel={"Next →"}
                        breakLabel={"..."}
                        onPageChange={setCurrentPageNo}
                        pageCount={Math.ceil(productsCount / resPerPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        containerClassName={"pagination"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                        forcePage={currentPage - 1}
                      />
                      
                      <style>{`
                        .pagination {
                          box-shadow: 0 2px 8px rgba(0,0,0,.1);
                          background: #fff;
                          padding: 10px 15px;
                          border-radius: 50px;
                        }
                        .pagination .page-link {
                          color: #212529;
                          border: none;
                          margin: 0 4px;
                          font-weight: 500;
                          font-size: 14px;
                          padding: 10px 16px;
                          border-radius: 8px;
                          transition: all 0.2s;
                        }
                        .pagination .page-link:hover {
                          background-color: #fff5f5;
                          color: #dc3545;
                          transform: translateY(-2px);
                        }
                        .pagination .active .page-link {
                          background-color: #dc3545;
                          color: white;
                          box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
                        }
                        .pagination .page-item.disabled .page-link {
                          color: #6c757d;
                          background: transparent;
                        }
                      `}</style>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductSearch;