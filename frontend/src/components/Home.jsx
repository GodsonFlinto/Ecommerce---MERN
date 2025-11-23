import { Fragment, useEffect } from "react";
import { getProducts } from "../actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./layouts/Loader";
import Product from "./product/Product";
import { toast } from "react-toastify";
import MetaData from "./layouts/MetaData";
import ReactPaginate from "react-paginate";
import { useState } from "react";

const Home = () => {
  const dispatch = useDispatch();

  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );

  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo.selected + 1);
  };

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: "bottom-center",
      });
    }
    dispatch(getProducts(null, null, null, null, currentPage));
  }, [error, dispatch, currentPage]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products"} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product key={product._id} col={3} product={product} />
                ))}
            </div>
          </section>
          {productsCount > 0 && productsCount > resPerPage ? (
            <div
              className="d-flex justify-content-center mt-5"
              style={{
                "--pagination-color": "#dc3545",
                "--pagination-hover-bg": "#dc3545",
                "--pagination-active-bg": "#dc3545",
              }}
            >
              <style>{`
    .pagination .page-link {
      color: #dc3545;
    }
    .pagination .page-link:hover {
      background-color: #dc3545;
      border-color: #dc3545;
      color: white;
    }
    .pagination .active .page-link {
      background-color: #dc3545;
      border-color: #dc3545;
    }
  `}</style>

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
                forcePage={currentPage - 1}
              />
            </div>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
