import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import CardItem from '../components/CardItem'
import axios from 'axios'
import Modal from '../components/Modal'

const route = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/getHeroes`

const Main = () => {
  const [heroes, setHeroes] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [maxPages, setMaxPages] = useState(2)
  const [currPage, setCurrPage] = useState(1)
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(0)
  const [singleHero, setSingleHero] = useState({
    nickname: '',
    real_name: '',
    origin_description: '',
    superpowers: '',
    catch_phrase: '',
    images: [
      {
        filename: '',
        contentType: '',
        imageBase64: ''
      }
    ]
  })

  const fetchHeroes = async uri => {
    const { data } = await axios.get(uri)
    if (limit === 0) {
      setMaxPages(data.length)
      setLimit(5)
      setHeroes(data)
      return
    }
    setHeroes(data.slice(0, 5))
  }

  const handleNext = e => {
    e.preventDefault()
    if (currPage < maxPages) {
      setSkip(prevState => prevState + 5)
      setCurrPage(prevState => prevState + 1)
      fetchHeroes(`${route}?limit=${limit}&skip=${skip}`)
    }
  }

  const handlePrev = e => {
    e.preventDefault()
    if (currPage > 1) {
      setSkip(prevState => prevState - 5)
      setCurrPage(prevState => prevState - 1)
      fetchHeroes(`${route}?limit=${limit}&skip=${skip}`)
    }
  }

  useEffect( () => {
    fetchHeroes(`${route}?limit=${limit}&skip=${skip}`)
  })  

    return (
    <>
      <NavBar />
      <Modal singleHero={singleHero} setSingleHero={setSingleHero} showModal={showModal} setShowModal={setShowModal} />
      <div className="container mt-5 mb-5">
        <h2 className='text-center'>Below you have the opportunity to see your favorite and not so heroes.</h2>
        
        <div className="row mt-5">
          {
            heroes.length > 0 ?
            heroes.map(hero => (
              <CardItem setSingleHero={setSingleHero} setShowModal={setShowModal} setHeroes={setHeroes} key={hero._id} imgUrl={`data:${hero.images[0].contentType};base64,${hero.images[0].imageBase64}`} nickname={hero.nickname} id={hero._id} />
            ))
            :
            <h4 className='text-center mt-5 text-warning'>We have nothing to show you at this point. Please feel free to add new heroes.</h4>
          }
        </div>

        {
          heroes.length > 0 &&
          (
            <div className="mt-2 d-flex align-items-center justify-content-center" style={{minWidth: "1290px"}}>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li onClick={handlePrev} className="page-item"><a className="page-link" href="/">Prev</a></li>
                  <li onClick={handleNext} className="page-item"><a className="page-link" href="/">Next</a></li>
                </ul>
              </nav>
          </div>
          )
        }
      </div>
    </>
  )
}

export default Main