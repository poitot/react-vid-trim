import React from 'react';
import './Slider.css';

function Slider (props) {

    return (
        
    <div className="Slider" style={{textAlign: 'center'}}>

        <p className='sliderTitle'>{props.title}</p>
        <p >{props.convertTime(props.value)}</p>
        <input step={1} value={props.value} disabled={!props.disabled} min={0} max={props.max} type="range" onInput={props.changeSlide} style={{width: "100%"}} ></input>

    </div>
    );
    
}

export default Slider;