import React from 'react'
import NavBar from '../components/NavBar'
import { Link } from "react-router-dom"

const Error = () => {
  return (
    <>
      <NavBar />
      <div className='container d-flex justify-content-center align-items-center' style={{minHeight: '80vh', overflow: 'hidden'}}>
        <div className="container-fluid mt-5 text-center">
        <h1>Something went wrong!<br/></h1>
          <h2>Probably, u should go back to <Link to="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
            <a className="nav-link" href="/">Main page</a>
          </Link> or just leave this website!
          </h2>
        </div>
      </div>
    </>
  )
}

export default Error