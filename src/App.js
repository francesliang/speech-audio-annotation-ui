import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

import AnnotationTable from "./Annotation";
import FileUploader from "./FileUpload";


function App() {
  return (
    <div className="App">
      <div className="container">
          <FileUploader />
          <AnnotationTable />
      </div>
    </div>
  );
}

export default App;
