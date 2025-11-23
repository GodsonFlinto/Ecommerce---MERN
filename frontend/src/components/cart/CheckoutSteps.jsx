import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  const activeStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '15px 30px',
    fontWeight: '600',
    fontSize: '15px',
    display: 'flex',
    alignItems: 'center',
    minHeight: '50px',
  };

  const inactiveStyle = {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '15px 30px',
    fontWeight: '600',
    fontSize: '15px',
    display: 'flex',
    alignItems: 'center',
    minHeight: '50px',
  };

  const triangleActiveLeft = {
    width: 0,
    height: 0,
    borderTop: '25px solid transparent',
    borderBottom: '25px solid transparent',
    borderLeft: '25px solid #dc3545',
    background: 'transparent',
  };

  const triangleActiveRight = {
    width: 0,
    height: 0,
    borderTop: '25px solid transparent',
    borderBottom: '25px solid transparent',
    borderRight: '25px solid #dc3545',
    background: 'transparent',
  };

  const triangleInactiveLeft = {
    width: 0,
    height: 0,
    borderTop: '25px solid transparent',
    borderBottom: '25px solid transparent',
    borderLeft: '25px solid #6c757d',
    background: 'transparent',
  };

  const triangleInactiveRight = {
    width: 0,
    height: 0,
    borderTop: '25px solid transparent',
    borderBottom: '25px solid transparent',
    borderRight: '25px solid #6c757d',
    background: 'transparent',
  };

  const linkStyle = {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <Fragment>
      <div className="d-flex justify-content-center mt-5">
        {shipping ? (
          <Link to="/shipping" style={linkStyle}>
            <div style={triangleActiveRight}></div>
            <div style={activeStyle}>Shipping Info</div>
            <div style={triangleActiveLeft}></div>
          </Link>
        ) : (
          <Link to="/shipping" style={linkStyle}>
            <div style={triangleInactiveRight}></div>
            <div style={inactiveStyle}>Shipping Info</div>
            <div style={triangleInactiveLeft}></div>
          </Link>
        )}

        {confirmOrder ? (
          <Link to="/order/confirm" style={linkStyle}>
            <div style={triangleActiveRight}></div>
            <div style={activeStyle}>Confirm Order</div>
            <div style={triangleActiveLeft}></div>
          </Link>
        ) : (
          <Link to="/order/confirm" style={linkStyle}>
            <div style={triangleInactiveRight}></div>
            <div style={inactiveStyle}>Confirm Order</div>
            <div style={triangleInactiveLeft}></div>
          </Link>
        )}

        {payment ? (
          <Link to="/payment" style={linkStyle}>
            <div style={triangleActiveRight}></div>
            <div style={activeStyle}>Payment</div>
            <div style={triangleActiveLeft}></div>
          </Link>
        ) : (
          <Link to="/payment" style={linkStyle}>
            <div style={triangleInactiveRight}></div>
            <div style={inactiveStyle}>Payment</div>
            <div style={triangleInactiveLeft}></div>
          </Link>
        )}
      </div>
    </Fragment>
  );
};

export default CheckoutSteps;