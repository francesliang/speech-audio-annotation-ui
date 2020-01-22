import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

import Table from 'react-bootstrap/Table';
import Player from "./Audio";


function App() {
  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
      <div class="container">
          <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Audio</th>
                  <th>Annotation</th>
                  <th>DeepSpeech</th>
                  <th>Confidence</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td><Player /></td>
                </tr>
              </tbody>
          </Table>
      </div>
    </div>
  );
}

export default App;
