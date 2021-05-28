import React from 'react';

const Step1 = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'top',
        height: '90vh',
        padding: '45px',
        fontSize: '18pt',
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
          Each Player Gets a color tolkin, A Gold Let it Play Chip,  
        </li>
        <li>
          One player is selected to DJ, they will attach their Phone to a Bluetooth Speaker, Distribute Bottlecaps and Select a Category from the Category Tab.
        </li>
        <li>
          Links to the Spotify playlist are in the Playlist tab
        </li>
        <li>
          At the begining of each players's turn a category is selected.
          The rest of the players add one song anonmously to that player's assigned color playlist, when all songs are added
          the DJ plays the playlist and the Player awards a BottleCap to the song they think best matches the category.
        </li>
        <li>
          The DJ will only Play enough of the song for the player to know the song.  
        </li>
        <li>
          And for the Gold Let it play Chip:  The player may use this chip to have the DJ play the whole song.  The Player who choose the song that uses the Let it play Tolkin 
          is awarded 5 BottleCaps
        </li>


      </ul>
    
    </div>

    
  );
};

export default Step1;