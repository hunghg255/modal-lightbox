import React from 'react';

import './App.css';

import ModalLightbox from './components/ModalLightbox/ModalLightbox'

import img1 from './image/img1.jpg';
import img2 from './image/img2.jpg';
import img3 from './image/img3.jpg';

const collection = [
  { src: img1, caption: "Caption eight" },
  { src: img2, caption: "Caption nine" },
  { src: img3, caption: "Caption ten" },
];

function App() {
  return (
    <div className="App">
      <ModalLightbox
          input={collection}
          ratio={`3:2`}
        />
    </div>
  );
}

export default App;
