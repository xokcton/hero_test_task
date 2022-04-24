import React from 'react'

const Modal = ({singleHero, setSingleHero, showModal, setShowModal }) => {

  const handleClose = () => {
    setSingleHero({
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
    setShowModal(false)
  }

  return(
    <div style={{display: `${showModal ? 'block' : 'none'}`}} className={showModal ? "modal fade show" : "modal fade"} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{singleHero.nickname}</h5>
          </div>
          <div className="modal-body">
            <div className='mt-1'>
              <b>Real Name: </b>
              {singleHero.real_name}
            </div>
            <div className='mt-1'>
              <b>Origin description: </b>
              {singleHero.origin_description}
            </div>
            <div className='mt-1'>
              <b>Superpowers: </b>
              {singleHero.superpowers}
            </div>
            <div className='mt-1'>
              <b>Catch phrase: </b>
              {singleHero.catch_phrase}
            </div>
            <div className='mt-1'>
              <b>Set of images: </b><br/>
              <div className='d-flex flex-column align-items-center justify-content-center'>
                {singleHero.images.map(element => (
                  <img key={element._id} className='mt-2' src={`data:${element.contentType};base64,${element.imageBase64}`} alt={singleHero.nickname} height={150} />
                ))}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal