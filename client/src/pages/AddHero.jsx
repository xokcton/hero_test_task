import React from 'react'
import { useForm } from 'react-hook-form'
import NavBar from '../components/NavBar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddHero = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (d) => {
    const route = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/addHero`
    const data = new FormData()

    data.append('nickname', d.nickname)
    data.append('real_name', d.real_name)
    data.append('origin_description', d.origin_description)
    data.append('superpowers', d.superpowers)
    data.append('catch_phrase', d.catch_phrase)
    Object.values(d.images).forEach(file=>{
      data.append("images", file);
    })
    
    await axios.post(route, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    navigate('/')
  } 

  return (
    <>
      <NavBar />
      <div className="container-fluid text-center mt-5">
        <h1>Here u can add some new heroes.</h1>
        <div className="row d-flex mt-5 justify-content-center align-items-center">
          <div className="col-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="nickname" className="form-label">Hero nickname</label>
                <input {...register('nickname')} required type="text" className="form-control" id="nickname" />
              </div>
              <div className="mb-3">
                <label htmlFor="real_name" className="form-label">Hero real name</label>
                <input {...register('real_name')} required type="text" className="form-control" id="real_name" />
              </div>
              <div className="mb-3">
                <label htmlFor="origin_description" className="form-label">Hero origin description</label>
                <textarea {...register('origin_description')} required className="form-control" id="origin_description" rows={4} style={{resize: 'none'}}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="superpowers" className="form-label">Hero superpowers</label>
                <textarea {...register('superpowers')} required className="form-control" id="superpowers" rows={2} style={{resize: 'none'}}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="catch_phrase" className="form-label">Hero catch phrase</label>
                <textarea {...register('catch_phrase')} required className="form-control" id="catch_phrase" rows={2} style={{resize: 'none'}}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="images" className="form-label">Add one or multiple hero pictures</label>
                <input {...register('images')} multiple required type="file" className="form-control" id="images" accept="image/*" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddHero