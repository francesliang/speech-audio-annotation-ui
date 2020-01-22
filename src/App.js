import React from 'react';
import logo from './logo.svg';
import './App.css';


import Table from 'react-bootstrap/Table';

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
              </tbody>
          </Table>
      </div>
    </div>
  );
}

export default App;
