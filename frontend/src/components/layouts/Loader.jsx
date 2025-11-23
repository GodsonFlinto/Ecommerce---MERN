import React from 'react'

const Loader = () => {
  return (
    <div className='loader-container d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <svg className="w-16 h-16 text-red-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
          <div 
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full"
            style={{ animation: 'cartBounce 0.6s ease-in-out infinite' }}
          ></div>
        </div>
        <p className="mt-3 text-red-600 font-semibold">Loading...</p>
        <style>{`
          @keyframes cartBounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
          }
        `}</style>
      </div>
    </div>
  )
}

export default Loader