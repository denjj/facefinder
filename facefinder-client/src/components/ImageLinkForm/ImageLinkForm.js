import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <br></br><br></br>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input className='f4 pa2 w-70 center' type='text' placeholder='(Enter an image url to get started!)' onChange={onInputChange} />
          <button className='w-30 bn grow f4 link ph3 pv2 dib white bg-dark-blue'
          onClick={onButtonSubmit}>Detect</button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm;