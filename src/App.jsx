import { useState, useEffect } from 'react';
import './index.css';

const App = () => {

  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSlectedVoice] = useState(null);
  const [rate, setRate] = useState(1);

  return (
    <section className="container">
      <div className="top"></div>
      <div className="text-box">
        <textarea value={text} onChange={(e) => setText(e.target.value)} 
          placeholder='Type something here...'></textarea>
      </div>
      <div className="tools-box">
        <div className="box box-1">
          <button>
          <ion-icon name="play-back-outline"></ion-icon>
          </button>
          <button><ion-icon name="play-outline"></ion-icon>
            <span>Play</span>
          </button>
          <button>
          <ion-icon name="play-forward-outline"></ion-icon>
          </button>
        </div>
      </div>

    </section>
  )
}

export default App
