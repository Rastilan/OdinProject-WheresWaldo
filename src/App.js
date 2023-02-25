import './App.css';
import React, { useState } from 'react';
import zelda from "./Image/ZeldaFind.png";

function App() {

  const [time, setTime] = useState({ time: 0 });
  const [clickX, setClickX] = useState(0);
  const [clickY, setClickY] = useState(0);
  const [moon, setMoon] = useState(false);
  const [mipha, setMipha] = useState(false);
  const [majora, setMajora] = useState(false);
  const [win, setWin] = useState({winner: false});
  

  const handleMouseClick = (e) => {
    setClickX(e.pageX);
    setClickY(e.pageY);
    handleCheckClick(e.pageX, e.pageY);
  }

  const handleWinCheck = () => {
    setTimeout(() =>{
      if(moon == true && mipha == true && majora == true) {
        setWin({winner: true});
      }
    }, 1000);

  }

  const handleCheckClick = (x, y) => {
    //Majoras Mask Moon (X:8960 / 9030 ) (Y; 8 / 60)
    if(x > 8960 && x < 9030 && y > 8 && y < 60){
      console.log('moon found')
      setMoon(true); 
    }
    // Mipha (X:3835 / 3915 ) (Y; 1400 / 1490)
    else if(x > 3835 && x < 3915 && y > 1400 && y < 1490){
      setMipha(true);
    }  
    // Majora (X:180 / 275 ) (Y; 2880 / 2965)
    else if(x > 180 && x < 275 && y > 2880 && y < 2965){
      setMajora(true);
    }  
    handleWinCheck();
  }
  document.addEventListener('click', handleMouseClick, true);
  return (
    
    <div className="App">
      <img src={zelda} alt="zelda"/>
    </div>
    
  );
  
}

export default App;
