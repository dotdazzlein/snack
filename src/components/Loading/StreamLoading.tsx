import React from 'react'

const StreamLoading = () => {
  return ( 
    <div className='flex items-center justify-center flex-col'>
<div className="container">
  <div className="moon">
    <div className="crater crater1"></div>
    <div className="crater crater2"></div>
    <div className="crater crater3"></div>
    <div className="crater crater4"></div>
    <div className="crater crater5"></div>
    <div className="shadow"></div>
    <div className="eye eye-l"></div>
    <div className="eye eye-r"></div>
    <div className="mouth"></div>
    <div className="blush blush1"></div>
    <div className="blush blush2"></div>
  </div>

  <div className="orbit">
    <div className="rocket">
      <div className="window"></div>
      <div className="fire"></div>
      <div className="gas"></div>
      <div className="gas"></div>
      <div className="gas"></div>
      <div className="gas"></div>
      <div className="gas"></div>
      <div className="gas"></div>
      <div className="gas"></div>
    </div>
  </div>
  <div className="curve">
    <svg viewBox="0 0 500 500">
      <path
        id="loading"
        d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97"
      ></path>
    </svg>
  </div>
</div>
    <h1 className='text-3xl text-gray-400 font-semibold'>Finding you best match.</h1>
    </div>
  )
}

export default StreamLoading