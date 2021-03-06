import React from 'react';
import ReactDOM from 'react-dom';
import Board from './containers/Board'

$(function() {
  let appDiv =  document.getElementById('app');

  if(appDiv){
    ReactDOM.render(
      <Board gameId={appDiv.dataset.gameid} />,
      appDiv
    );
  }
});
