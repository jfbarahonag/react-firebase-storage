import './App.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import React, { useState } from 'react';
import storage from './firebase/firebase'

function App() {
  const allInputs = { imgUrl: '' }
  const [imageAsFile, setImageAsFile] = useState('')
  const [imageAsUrl, setImageAsUrl] = useState(allInputs)

  const handleImageAsFile = e => {
    console.log(e);
    const image = e.target.files[0]
    setImageAsFile(imageFile => (image))
  }

  const handleFireBaseUpload = e => {
    e.preventDefault()
    console.log(`Start upload`);
    if (imageAsFile === '') {
      console.error(`Not an image, the image file is a ${typeof (imageAsFile)}`);
      return
    }
    const storageRef = ref(storage, `/images/${imageAsFile.name}`)
    uploadBytes(storageRef, imageAsFile)
      .then(snapshot => {
        getDownloadURL(storageRef)
          .then(url => {
            console.log(url);
          })
      })
  }

  return (
    <div className="App">
      <form onSubmit={ handleFireBaseUpload }>
        <input
          type="file"
          onChange={handleImageAsFile}
        />
        <button>
          Upload to Firebase
        </button>
      </form>
    </div>
  );
}

export default App;
