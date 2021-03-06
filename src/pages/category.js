import React, {useState} from "react";
import "./Button.css";

import {Button} from "./Button.js";


function Category() {

  const LIST =  [
    
    'Love Song', 
    'Springsteen',
    "Dylan",
    "Road Trip",
    'Fight song', 
    'Massachusettes',
    'football',
    'JamBand',
    'Drinking Songs',
    'Love Song', 
    'TV theme',
    'Scary Movie',
    'Advertisment Jingle',
    'classic',
    'Classical',
    'War Movie',
    'Sleeping',
    'Breakfast',
    'Played at Sporting Events',
    'I wanna Sex You Up',
    'Number(s) in the title',
    'Best Collaboration', 
    'Slowest Song (Tempo)',
    'Makes You think of College roommate',
    'Non-Traditional Instrument',
    'Classic Rock',
    'Fastest Song (Tempo)',
    'Sci-Fi',
    'Fantasy',
    'Alternative Rock',
    'Indie Rock',
    'New Music',
    'Your Favorite Song',
    'Blues Influence',
    'the 1980s',
    'For Driving Really Fast',
    'Reggae',
    'Ska',
    'Romance',
    'Bromance',
    'Winter Wonderland',
    'Color(s) in the Title',
    'The 1960s',
    'Weird Al Yankovic',
    'Lead Zepplin',
    'Doors',
    'Beastie Boys',
    'Satirical',
    'Hip Hop',
    'One Word Band (or Artist)',
    'Pick Me up',
    'The 1970s',
    'Cover Song',
    'the 2000s',
    'From a Videogame',
    'Re-make/Cover Song',
    'Boy, Im Angry',
    'A Duet',
    'Heavy Metal time',
    'Jazz Influence',
    'It Means Spring',
    'Foreign Song',
    'Comedy',
    'Most Obscure Song',
    'Drop the "N" Bomb',
    'Silly',
    'On the Beach',
    'It means Winter',
    'Action/Adventure',
    'Guilty Pleasures',
    'It Means Fall',
    'Religion/Almighty',
    'From an Obscure Movie',
    'Funk-a-Delic',
    'Played at a wedding Reception',
    'Ruined by a Commercial',
    'Song about Rain',
    'One hit Wonder',
    'Movie Theme Song',
    'Sounds like Porn',
    'From a Movie',
    'the 1990s',
    'Middle School Roller Skating Party',
    'Your favorite Band',
    'Band that starts with "The"',
    'We have Both Kinds; Country and Western',
    'TV Theme Song',
    'It means Summer',
    'Foreign Language',
    'Folk',
    'Working out',
    'Da Club',
    'Eminem',
    'Accoustic',
    'Wine song',
    'Old Country',
    'Song about Rainbows',
    'Song with a Day of the Week in the title',
    'Song with Womens Name',
    'Song with Mans Name',
    'Song involving Transportation',

  ];
  const randomNumb = Math.ceil((((Math.random(.5)*LIST.length)+(Math.random(1.5)*LIST.length+2))/2));
  const [count, setCount] = useState(0)
  
  const rand = () => {
    setCount(randomNumb)
  } 

  return (
     
    <div 
    style={{ backgroundColor: '#E1E4E9',}}
    className="App">
    <br></br>
      <Button  
        type="button"
        onClick={rand}
        buttonStyle="btn--primary--outline"
        buttonSize="btn--large"
        
      >Random Category
      </Button>  <br></br>
      <h1 style={{fontSize: '45pt'}}>{LIST[randomNumb]}</h1>
      <br></br>
      <br></br><br></br><br></br>
      <br></br><br></br><br></br><br></br>
      <br></br><br></br><br></br><br></br>
      <br></br><br></br><br></br><br></br><br></br>
      <br></br><br></br><br></br>
      <br></br><br></br><br></br><br></br>
      <br></br><br></br><br></br><br></br>
      <br></br><br></br><br></br><br></br><br></br>
      <br></br><br></br><br></br>
      <br></br><br></br><br></br><br></br>
      <br></br><br></br><br></br><br></br>
      <br></br><br></br><br></br><br></br><br></br>
      <br></br><br></br><br></br>
      <br></br><br></br><br></br><br></br>
      <br></br><br></br><br></br><br></br>
      <br></br><br></br><br></br><br></br><br></br>
      <br></br><br></br><br></br>
      <br></br><br></br><br></br><br></br>
      <br></br><br></br><br></br><br></br>
      <br></br><br></br><br></br><br></br><br></br>
      <br></br><br></br><br></br>
      <br></br><br></br><br></br><br></br>
      <br></br><br></br><br></br><br></br>
      <br></br><br></br><br></br><br></br>
      <h1>{LIST[count]}</h1>
      </div>
    
  );
}


export default Category;
