import './App.css';

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

  return (
    <div className="App">
      <form>
        <input
          type="file"
          onChange={handleImageAsFile}
        />
      </form>
    </div>
  );
}

export default App;
