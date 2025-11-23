import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${keyword}`);
  };

  useEffect(() => {
    if (location.pathname === "/") setKeyword("");
  }, [location]);

  return (
    <form onSubmit={searchHandler} style={{ width: "90%" }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          background: "white",
          borderRadius: "50px",
          padding: "3px",
          overflow: "hidden",
          border: "1px solid #ccc",
        }}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: "15px",
            padding: "10px 15px",
            borderRadius: "50px",
          }}
        />

        <button
          style={{
            background: "#d7263d",
            border: "none",
            color: "white",
            padding: "10px 18px",
            fontSize: "16px",
            borderRadius: "100px",
            cursor: "pointer",
          }}
        >
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
};

export default Search;
