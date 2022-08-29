import './App.css';
import VidTrim from './VidTrim';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <VidTrim></VidTrim>
      </header>
      <footer>
      File size limit is 2GB <a href="https://github.com/ffmpegwasm/ffmpeg.wasm#what-is-the-maximum-size-of-input-file">source</a>
      </footer>
    </div>
  );
}

export default App;
