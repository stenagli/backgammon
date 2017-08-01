import React from 'react';
import ReactDOM from 'react-dom';
import Board from './containers/Board'

$(function() {
  ReactDOM.render(
    <Board />,
    document.getElementById('app')
  );
});
