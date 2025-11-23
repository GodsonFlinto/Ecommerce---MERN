import React from 'react'

const ProductReview = ({reviews}) => {
  return (
    <div className="reviews w-75 mt-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h3 className="mb-0" style={{ fontWeight: '600', fontSize: '24px' }}>
          Customer Reviews
          <span className="badge badge-danger ml-3" style={{ fontSize: '14px', padding: '8px 12px' }}>
            {reviews?.length || 0}
          </span>
        </h3>
      </div>
      
      <hr style={{ borderTop: '2px solid #dee2e6' }} />
      
      {reviews && reviews.length > 0 ? (
        reviews.map(review => (
          <div 
            key={review._id} 
            className="review-card my-4 p-4 bg-white shadow-sm"
            style={{ 
              borderRadius: '8px',
              border: '1px solid #f0f0f0',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
            }}
          >
            <div className="d-flex align-items-center mb-3">
              {/* User Avatar */}
              <div 
                className="d-flex align-items-center justify-content-center mr-3"
                style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '18px'
                }}
              >
                {review.user.name.charAt(0).toUpperCase()}
              </div>
              
              <div className="flex-grow-1">
                <p className="mb-1" style={{ fontWeight: '600', fontSize: '16px', color: '#212529' }}>
                  {review.user.name}
                </p>
                <div className="d-flex align-items-center">
                  <div className="rating-outer" style={{ marginRight: '10px' }}>
                    <div 
                      className="rating-inner" 
                      style={{width: `${review.rating / 5 * 100}%`}}
                    ></div>
                  </div>
                  <span 
                    className="badge badge-light" 
                    style={{ 
                      fontSize: '13px',
                      padding: '4px 10px',
                      color: '#dc3545',
                      border: '1px solid #ffe5e5',
                      backgroundColor: '#fff5f5'
                    }}
                  >
                    {review.rating}/5
                  </span>
                </div>
              </div>
            </div>
            
            <p 
              className="review_comment mb-0" 
              style={{ 
                fontSize: '15px',
                lineHeight: '1.6',
                color: '#495057',
                paddingLeft: '58px'
              }}
            >
              {review.comment}
            </p>
          </div>
        ))
      ) : (
        <div className="text-center py-5">
          <i className="fa fa-comment-o" style={{ fontSize: '48px', color: '#dee2e6', marginBottom: '20px' }}></i>
          <h5 className="text-muted">No reviews yet</h5>
          <p className="text-muted">Be the first to review this product!</p>
        </div>
      )}
    </div>
  )
}

export default ProductReview