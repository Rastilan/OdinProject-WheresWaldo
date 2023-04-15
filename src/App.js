import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import zelda from "./image/ZeldaFind.png";
import majoraIMG from "./image/majora.jpg";
import miphaIMG from "./image/mipha.jpg";
import moonIMG from "./image/moon.jpg";

function App() {

  const [time, setTime] = useState(0);
  const [win, setWin] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const [winTime, setWinTime] = useState(null);
  const [moon, setMoon] = useState(false);
  const [majora, setMajora] = useState(false);
  const [mipha, setMipha] = useState(false);


  let secondsPassed = 0;


  function handleStartTimer() {
    setStartTime(Date.now());
    setNow(Date.now());
    {
      document.getElementById('start-button').parentElement.style.display = "none";
      
    }

    setInterval(() => {
      setNow(Date.now());
    }, 1000);
  }

    
    if(startTime != null && now != null){
      secondsPassed = (now - startTime) /1000;
    }
  





  const handleMouseClick = (e) => {
    console.log(e.pageX, e.pageY)
    handleCheckClick(e.pageX, e.pageY);
  }



  const handleCheckClick = (x, y) => {
    
    if (win === false){
    //Majoras Mask Moon (X:8960 / 9030 ) (Y; 8 / 60)
      if(x > 8960 && x < 9030 && y > 63 && y < 115){
        if(mipha === true && majora === true){
          setWin(true);
          setWinTime(secondsPassed);
        }
        else {
          setMoon(true);
        }
        
      }
      // Mipha (X:3835 / 3915 ) (Y; 1400 / 1490)
      else if(x > 3835 && x < 3915 && y > 1455 && y < 1545){

        if(moon === true && majora === true){
          setWin(true);
          setWinTime(secondsPassed);
        }
        else {
          setMipha(true);
        }
      }  
      // Majora (X:180 / 275 ) (Y; 2880 / 2965)
      else if(x > 195 && x < 275 && y > 2935 && y < 3025){
        if(mipha === true && majora === true){
          setWin(true);
          setWinTime(secondsPassed);
        }
        else {
          setMajora(true);
        }

      }  
    }
    else { console.log(win.winner); }
  }
  document.addEventListener('click', handleMouseClick, true);

  return (
    
    
  <div className="App">
    {win ? <div class="end-overlay"> You won in {winTime} seconds!!</div> : <div class='hidden'> </div>}
      <div class="start-overlay">
        <div>Find the characters!</div>
        <div>
          <div> Moon <img src={moonIMG} alt="moon"/> </div>
          <div> Majora <img src={majoraIMG} alt="majora"/> </div>
          <div> Mipha <img src={miphaIMG} alt="mipha"/> </div>
        </div>
        <button id="start-button" onClick={handleStartTimer}>start</button>
      </div>

      <div class="nav" height="150px" >
        <div>Timer : {secondsPassed.toFixed(0)}</div>
      </div>

      


    <div class="objects">
        <div>Objects to find:</div>
          <div> Moon {moon ? <img src={moonIMG} alt="moon" class="found"/> : <img src={moonIMG} alt="moon"/>}  </div>
          <div> Majora {majora ? <img src={majoraIMG} alt="majora" class="found"/> : <img src={majoraIMG} alt="majora"/>}  </div>
          <div> Mipha {mipha ? <img src={miphaIMG} alt="mipha" class="found"/> : <img src={miphaIMG} alt="mipha"/>}  </div>
    </div>
    {moon ? <img src={moonIMG} alt="moon" class="foundMoon"/> : ''}
    {majora ? <img src={majoraIMG} alt="majora" class="foundMajora"/> : ''}
    {mipha ? <img src={miphaIMG} alt="mipha" class="foundMipha"/> : ''}
    <img class="waldo" src={zelda} alt="zelda"/>
  </div>
    
  );
  
}

export default App;
