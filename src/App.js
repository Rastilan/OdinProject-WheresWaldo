//App.js

import './App.css';

// importing components
import React, { useState, useEffect,useRef } from 'react';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { Timer } from './components/Timer';
import {  db } from './components/firebase';
import Leaderboard from './components/Leaderboard';
// importing images
import zelda from "./image/ZeldaFind.png";
import majoraIMG from "./image/majora.jpg";
import miphaIMG from "./image/mipha.jpg";
import moonIMG from "./image/moon.jpg";




function App() {

  // our hooks
  const [win, setWin] = useState(false);
  const [winTime, setWinTime] = useState(null);
  const [moon, setMoon] = useState(false);
  const [majora, setMajora] = useState(false);
  const [mipha, setMipha] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState(null);
  const timerRef = useRef(null);
  const [playerName, setPlayerName] = useState('');
  const [showSubmitButton, setShowSubmitButton] = useState(true);

  // checks click location to see if it hit one of our objects to find
  const handleMouseClick = (e) => {
    let x = e.pageX;
    let y = e.pageY;
  
    if (!win) {
      // Majoras Mask Moon (X:8960 / 9030 ) (Y; 8 / 60)
      if (x > 8960 && x < 9030 && y > 63 && y < 115) {
        setMoon(true);
      }
      // Mipha (X:3835 / 3915 ) (Y; 1400 / 1490)
      else if (x > 3835 && x < 3915 && y > 1455 && y < 1545) {
        setMipha(true);
      }
      // Majora (X:180 / 275 ) (Y; 2880 / 2965)
      else if (x > 195 && x < 275 && y > 2935 && y < 3025) {
        setMajora(true);
      }
    }
  };

  //Checks if all three images are found
  useEffect(() => {
    if (moon && mipha && majora) {
      setWin(true);
      setWinTime(timerRef.current.getTime()); // Set the winTime based on the current timer value
    }
  }, [moon, mipha, majora]);


  // event listener added and removed to avoid memory leaks
  useEffect(() => {
    document.addEventListener('click', handleMouseClick, true);
    return () => {
      document.removeEventListener('click', handleMouseClick, true);
    };
  }, []);

  // submit our score!
  const handleScoreSubmission = () => {
    if (winTime !== null && playerName !== '') {
      db.collection('highscores')
        .add({
          winTime: winTime,
          playerName: playerName,
        })
        .then(() => {
          // Fetch leaderboard data after submitting score
          db.collection('highscores')
            .orderBy('winTime', 'asc')
            .limit(10)
            .get()
            .then((querySnapshot) => {
              const leaderboardData = querySnapshot.docs.map((doc) => doc.data());
              setLeaderboardData(leaderboardData);
              setShowSubmitButton(false);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="App">
      {win ? (
        <div>
          {showSubmitButton ? (
            <div className="end-overlay">
              <h1>Congratulations!</h1>
              <p>You won in {winTime} seconds!!</p>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name"
              />
              <button onClick={handleScoreSubmission}>Submit</button>
            </div>
          ) : (
            <div className="leaderboard-container">
              <Leaderboard leaderboardData={leaderboardData} />
            </div>
          )}
        </div>
      ) : (
        <div className="hidden"></div>
      )}

    <div className="nav" height="150px">
      <Timer 
        moonIMG={moonIMG} 
        majoraIMG={majoraIMG} 
        miphaIMG={miphaIMG}
        ref={timerRef}
      />
    

    <div class="objects">
      <div>Objects to find:</div>
      <div>
        Moon {moon ? <img src={moonIMG} alt="moon" class="found" /> : <img src={moonIMG} alt="moon" />}
      </div>
      <div>
        Majora {majora ? <img src={majoraIMG} alt="majora" class="found" /> : <img src={majoraIMG} alt="majora" />}
      </div>
      <div>
        Mipha {mipha ? <img src={miphaIMG} alt="mipha" class="found" /> : <img src={miphaIMG} alt="mipha" />}
      </div>
    </div>
    </div>
    
    {moon ? <img src={moonIMG} alt="moon" class="foundMoon"/> : ''}
    {majora ? <img src={majoraIMG} alt="majora" class="foundMajora"/> : ''}
    {mipha ? <img src={miphaIMG} alt="mipha" class="foundMipha"/> : ''}
    <img class="waldo" src={zelda} alt="zelda"/>
  </div>
    
  );
  
}

export default App;