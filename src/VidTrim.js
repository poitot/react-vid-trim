import Slider from './Slider';
import './VidTrim.css';
import React, { useState } from 'react';
import VideoInput from './VideoInput';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

function VidTrim(props) {

  var ffmpeg = createFFmpeg({log: true});
  ffmpeg.setProgress(({ratio}) => {
    setProgress((ratio * 100).toPrecision(2));
  })

  const [start_val, set_start_val] = useState(0);
  const [end_val, set_end_val] = useState(0);
  const [vid, set_vid] = useState();
  const [vid_loaded, set_vid_loaded] = useState(false);
  const [vid_duration, set_vid_duration] = useState(0);
  const [dataUrl, setDataUrl] = useState();
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState();

  var data = "";
  
  function onSlideChangeStart(event) {
    console.log(event.target.value);
    set_start_val(event.target.value);
    set_end_val(Math.max(end_val, event.target.value));
  }

  function onSlideChangeEnd(event) {
    set_end_val(Math.max(start_val, event.target.value));
  }

  function secondsToTimeStamp (s) {
    var date = new Date(0);
    date.setSeconds(s);
    var timeString = date.toISOString().substring(11, 19);
    return timeString;
  }

  async function handleClick(event) {

    setProcessing(true);
    await ffmpeg.load();
    await ffmpeg.FS('writeFile', 'in.avi', await fetchFile(vid));
    await ffmpeg.run('-ss', secondsToTimeStamp(start_val), '-to', secondsToTimeStamp(end_val), '-i', 'in.avi', 'out.mp4');
    setProgress(100);
    data = (await ffmpeg.FS('readFile', 'out.mp4'));
    setDataUrl(URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'})));
  }

    return (
    <div className="VidTrim">
      <div>
        <VideoInput vid_load={set_vid_loaded} set_vid_duration={set_vid_duration} set_vid={set_vid} width={"60%"} height={"30%"}></VideoInput>
        <div id="Sliders">
            <Slider value={start_val} max={vid_duration} disabled={vid_loaded} title={"Start Trim"} changeSlide={onSlideChangeStart} convertTime={secondsToTimeStamp}></Slider>
            
            <Slider value={end_val} min={start_val} max={vid_duration} disabled={vid_loaded} title={"End Trim"} changeSlide={onSlideChangeEnd} convertTime={secondsToTimeStamp}></Slider>
        </div>
        <div id="btnContainer">
          <button id="btnConvert" onClick={handleClick} disabled={!vid_loaded}>Trim Video</button>
        </div>
        <div>
          {processing && <p className="details">Processing: {progress}%</p>}
        </div>
      </div>
      <div id="output-video">
        {dataUrl && <VideoInput source={dataUrl} width={"60%"} height={"30%"}></VideoInput>}
      </div>
    </div>
  );
}

export default VidTrim;
