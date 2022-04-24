import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const route = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/editHero`

const EditHero = () => {
  const { register, handleSubmit } = useForm()
  const [prevImgs, setPrevImgs] = useState(JSON.parse(localStorage.getItem('hero')).images)
  const [prevHeroInfo, setPrevHeroInfo] = useState(JSON.parse(localStorage.getItem('hero')))
  const navigate = useNavigate()

  const onSubmit = (d) => {
    const data = new FormData()
    data.append('nickname', d.nickname || prevHeroInfo.nickname)
    data.append('real_name', d.real_name || prevHeroInfo.real_name)
    data.append('origin_description', d.origin_description || prevHeroInfo.origin_description)
    data.append('superpowers', d.superpowers || prevHeroInfo.superpowers)
    data.append('catch_phrase', d.catch_phrase || prevHeroInfo.catch_phrase)
    if (d.images) {
      Object.values(d.images).forEach(file=>{
        data.append("images", file);
      })
    }
    if (prevImgs.length > 0) {
      Object.values(prevImgs).forEach(file=>{
        data.append("prevImgs", file._id);
      })
    }

    axios.put(`${route}/${prevHeroInfo._id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    localStorage.clear()
    setPrevHeroInfo({})
    setPrevImgs([])
    navigate('/')
  }

  const deleteImg = e => {
    const imgId = e.target.dataset.id
    setPrevImgs(prevState => prevState.filter(elem => elem._id !== imgId))
  }
  
  return (
    <>
      <NavBar />
      <div className="container-fluid text-center mt-5">
        <div className="row d-flex mt-5 justify-content-center">
          <div className="col-4">
            <h3>Edit whatever u want.</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="nickname" className="form-label">Hero nickname</label>
                <input {...register('nickname')} placeholder={prevHeroInfo.nickname ? prevHeroInfo.nickname : ''} type="text" className="form-control" id="nickname" />
              </div>
              <div className="mb-3">
                <label htmlFor="real_name" className="form-label">Hero real name</label>
                <input {...register('real_name')} placeholder={prevHeroInfo.real_name ? prevHeroInfo.real_name : ''} type="text" className="form-control" id="real_name" />
              </div>
              <div className="mb-3">
                <label htmlFor="origin_description" className="form-label">Hero origin description</label>
                <textarea placeholder={prevHeroInfo.origin_description ? prevHeroInfo.origin_description : ''} {...register('origin_description')} className="form-control" id="origin_description" rows={4} style={{resize: 'none'}}>
                </textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="superpowers" className="form-label">Hero superpowers</label>
                <textarea placeholder={prevHeroInfo.superpowers ? prevHeroInfo.superpowers : ''} {...register('superpowers')} className="form-control" id="superpowers" rows={2} style={{resize: 'none'}}>
                </textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="catch_phrase" className="form-label">Hero catch phrase</label>
                <textarea placeholder={prevHeroInfo.catch_phrase ? prevHeroInfo.catch_phrase : ''} {...register('catch_phrase')} className="form-control" id="catch_phrase" rows={2} style={{resize: 'none'}}>
                </textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="images" className="form-label">Add one or multiple hero pictures</label>
                <input {...register('images')} multiple required={prevImgs.length === 0 ? true : false} type="file" className="form-control" id="images" accept="image/*" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
          <div className="col-4 d-flex flex-wrap flex-column align-items-center ">
            <h3>Click on the picture to remove.</h3>
            {
              prevImgs.length > 0 ?
              prevImgs.map(element => (
                <img onClick={deleteImg} className='m-2 hoverable' data-id={element._id} key={element._id} src={`data:${element.contentType};base64,${element.imageBase64}`} alt={element._id} height={200} />
              ))
              :
              <h4 className='mt-5 text-warning'>All uploaded images have been deleted!</h4>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default EditHero