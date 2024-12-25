import { useState, useEffect } from "react";
import "./index.css";

const App = () => {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSlectedVoice] = useState(null);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const fetchVoices = () => {
      const synthVoices = synth.getVoices();
      if (synthVoices.length > 0) {
        setVoices(synthVoices);
        setSlectedVoice(synthVoices[0]?.name || null);
      }

      if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = fetchVoices;
      }
    };
    fetchVoices();
  }, []);

  const handleSpeak = () => {
    if (!text.trim()) {
      alert("Please enter some text to speak");
      return;
    }

    // Cancel any speaking synthesis going on.
    window.speechSynthesis.cancel();

    // Create a speech utterance;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;

    // Set the selected voice
    const voice = voices.find((v) => v.name === selectedVoice);

    if (voice) {
      utterance.voice = voice;
    } else {
      alert("No voice is selected or available");
      return;
    }

    window.speechSynthesis.speak(utterance);
  };

  const handleRateIncrease = () => {
    // Maximum rate of 10;
    setRate((prevRate) => Math.min(prevRate + 0.1, 10));
  };

  const handleRateDecrease = () => {
    // Minmum rate 0f 0.1;
    setRate((prevRate) => Math.max(prevRate - 0.1, 0.1));
  };

  return (
    <section className="container">
      <div className="top"></div>
      <div className="text-box">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something here..."
        ></textarea>
      </div>
      <div className="tools-box">
        <div className="box box-1">
          <button onClick={handleRateDecrease}>
            <ion-icon name="play-back-outline"></ion-icon>
          </button>
          <button onClick={handleSpeak}>
            <ion-icon name="play-outline"></ion-icon>
            <span>Play</span>
          </button>
          <button onClick={handleRateIncrease}>
            <ion-icon name="play-forward-outline"></ion-icon>
          </button>
        </div>
        <div className="box box-2">
          {selectedVoice && (
            <select
              value={selectedVoice}
              onChange={(e) => setSlectedVoice(e.target.value)}
            >
              {voices.length > 0 ? (
                voices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name}({voice.lang})
                  </option>
                ))
              ) : (
                <option>Loading Voices...</option>
              )}
            </select>
          )}
        </div>
        <div className="box box-3">
          <span>Rate: {rate.toFixed(1)}</span>
        </div>
      </div>
    </section>
  );
};

export default App;
