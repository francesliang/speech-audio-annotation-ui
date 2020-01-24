import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

import Table from 'react-bootstrap/Table';
import Player from "./Audio";
import Annotation from "./Annotation";
import FileUploader from "./FileUpload";


function App() {
  return (
    <div className="App">
      <div className="container">
          <FileUploader />
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
                <Annotation />
              </tbody>
          </Table>
      </div>
    </div>
  );
}

export default App;
