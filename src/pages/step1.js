import React from 'react';

const Step1 = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'top',
        height: '70vh',
        padding: '45px',
        fontSize: '18pt',
        backgroundColor: '#E1E4E9',
      }}>
      <h1>How to Play</h1>
      
      <ul>
        <li>
          A music matching Game for up to 8 Players
        </li>
        <li>
          Each Player chooses a color
        </li>
        <li>
          Each Player Gets a color token, A Gold Let it Play Chip,  
        </li>
        <li>
          One player is selected to DJ, they will attach their Phone to a Bluetooth Speaker, Distribute Bottlecaps.
        </li>
        <li>
          Links to the Spotify playlist are in the Playlist tab
        </li>
        <li>
          At the begining of each players's turn they select a category. They are now the Judge.
          The rest of the players add one song anonymously to that player's assigned color playlist, when all songs are added
          the DJ plays the playlist and the Judge awards a BottleCap to the song they think best matches the category.
        </li>
        <li>
          The Judge will indicate to the DJ when they have heard enough of the song.  
        </li>
        <li>
          And for the Gold Let it play Chip:  Anyone may use this chip to have the DJ play the whole song.  The Player who choose the song the Let it play Tolken is used on 
          is awarded 5 BottleCaps
        </li>


      </ul>
    
    </div>

    
  );
};

export default Step1;