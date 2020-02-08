import React from 'react';
import './App.css';

import {InputGroup, FormControl} from 'react-bootstrap';
import FileUploader from "./FileUpload";


class App extends React.Component {
    constructor(){
        super()
        this.state = {
            projectName: undefined,
            modelThreshold: undefined,
            isGoogleStt: undefined,
            isAutomated: undefined
        }
    }

    handleTextChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleCheckboxChange(e) {
        this.setState({ [e.target.name]: e.target.checked });
    }

    render() {
      console.log(this.state);
      return (
        <div className="App">
          <div className="container" style={{paddingTop: "1rem"}}>
              <div style={{marginBottom: "50px"}}>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">Project Name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      name="projectName"
                      onChange={e => this.handleTextChange(e)}
                      aria-label="project-name"
                      aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon2">Model Confidence Threshold</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      name="modelThreshold"
                      onChange={e => this.handleTextChange(e)}
                      aria-label="threshold"
                      aria-describedby="basic-addon2"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon3">Run Google Speech-to-Text</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl disabled aria-label="" />
                    <InputGroup.Append>
                      <InputGroup.Checkbox name="isGoogleStt" onChange={e => this.handleCheckboxChange(e)}/>
                    </InputGroup.Append>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon4">Automate annotation</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl disabled aria-label="" />
                    <InputGroup.Append>
                      <InputGroup.Checkbox name="isAutomated" onChange={e => this.handleCheckboxChange(e)}/>
                    </InputGroup.Append>
                </InputGroup>
              </div>
              <FileUploader />
          </div>
        </div>
      );
    }
}

export default App;
