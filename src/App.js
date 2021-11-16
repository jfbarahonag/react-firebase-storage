import './App.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import React, { useEffect, useState } from 'react';
import storage from './firebase/firebase'

function App() {
  const allInputs = []
  
  const [imagesAsFiles, setImagesAsFiles] = useState(allInputs)
  const [imagesAsUrls, setImagesAsUrls] = useState(allInputs)

  useEffect(() => {
    // console.log(imagesAsFiles)
  },)

  const handleImageAsFile = e => {
    for (let index = 0; index < e.target.files.length; index++) {
      
      const image = e.target.files[index]
      
      if (image.type !== 'image/jpeg')
      {
        console.log(`Type not valid -> ${image.name}, ignored`);
        continue
      }

      setImagesAsFiles(prevImages => {
        const current = [...prevImages, image]
        return current
      })
    }
  }

  const handleFireBaseUpload = e => {
    e.preventDefault()
    console.log(`Start upload`);

    // console.log(imagesAsFiles)
    
    // check files list
    if (imagesAsFiles.length <= 0) {
      console.error(`No image was selected`);
      return
    }
    for (const image of imagesAsFiles) {
      const storageRef = ref(storage, `/images/${image.name}`)
      //TODO: Add security to prevent repeat multiple images with the same name
      uploadBytes(storageRef, image)
        .then(snapshot => {
          getDownloadURL(storageRef)
            .then(url => {
              console.log(url)
              // setImagesAsUrls(prevUrls => {
              //   return([...prevUrls, url])
              // })
            })
        })
    }
    
  }

  return (
    <div className="App">
      <form onSubmit={ handleFireBaseUpload }>
        <input
          type="file"
          multiple
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
