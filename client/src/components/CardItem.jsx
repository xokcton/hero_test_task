import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const route = `http://localhost:${process.env.REACT_APP_SERVER_PORT}`

const CardItem = ({ setSingleHero, setShowModal, setHeroes, imgUrl, nickname, id }) => {
  const [heroId, setHeroId] = React.useState('')
  const navigate = useNavigate()

  const handleDeletion = async e => {
    e.preventDefault()
    setHeroId(e.target.dataset.id)
    await axios.delete(`${route}/deleteHero/${heroId}`)
    setHeroes(prevState => prevState.filter(elem => elem._id !== heroId))
  }

  const handleInspect = async e => {
    e.preventDefault()
    setHeroId(e.target.dataset.id)
    const { data } = await axios.get(`${route}/getOneHero/${heroId}`)
    setShowModal(true)
    setSingleHero(data)
  }

  const handleEdit = async e => {
    e.preventDefault()
    setHeroId(e.target.dataset.id)
    const { data } = await axios.get(`${route}/getOneHero/${heroId}`)
    localStorage.setItem('hero', JSON.stringify(data))
    navigate(`/editHero/${heroId}`)
  }

  return (
    <>
      <div className="col-sm-4">
        <div className="card m-3" style={{width: '18rem'}}>
          <img src={imgUrl} className={nickname} alt="panda" />
          <div className="card-body">
            <h5 className="card-title text-center">{nickname}</h5>
            <div className='mt-2 d-flex align-items-center justify-content-around'>
              <button onClick={handleInspect} data-id={id} className='btn btn-primary'>Inspect</button>
              <button onClick={handleEdit} data-id={id} className='btn btn-warning'>Edit</button>
              <button onClick={handleDeletion} data-id={id} className="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardItem