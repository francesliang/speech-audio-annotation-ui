import React from 'react';
import axios from "axios";
import './App.css';

import {InputGroup, FormControl, Accordion, Card, Button} from 'react-bootstrap';
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
        this.requestTraining = this.requestTraining.bind(this)
    }

    handleTextChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleCheckboxChange(e) {
        this.setState({ [e.target.name]: e.target.checked });
    }

    requestTraining(){
        axios.get("http://localhost:5000/train")
          .then(response => {
              console.log("Start training");
          })
          .catch(function (error) {
              console.log(error);
          });
    }

    render() {
      console.log(this.state);
      return (
        <div className="App">
          <div className="container" style={{paddingTop: "1rem"}}>
              <div style={{marginBottom: "50px"}}>
                  <Accordion defaultActiveKey="" style={{borderBottom: "1px solid rgba(0, 0, 0, 0.125)", textAlign: "left"}}>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={Button} variant="" eventKey="0" style={{fontWeight: "bold"}}>
                            Project Configurations
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                  <InputGroup.Text style={{backgroundColor: "rgb(217, 217, 217, 0.3)"}}>Project Name</InputGroup.Text>
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
                                  <InputGroup.Text style={{backgroundColor: "rgb(217, 217, 217, 0.3)"}}>Model Confidence Threshold</InputGroup.Text>
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
                                  <InputGroup.Text style={{backgroundColor: "rgb(217, 217, 217, 0.3)"}}>Run Google Speech-to-Text</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl disabled aria-label="" style={{backgroundColor: "rgb(217, 217, 217, 0.2)"}}/>
                                <InputGroup.Append style={{backgroundColor: "rgb(217, 217, 217, 0.3)"}}>
                                  <InputGroup.Checkbox name="isGoogleStt" onChange={e => this.handleCheckboxChange(e)}/>
                                </InputGroup.Append>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                  <InputGroup.Text style={{backgroundColor: "rgb(217, 217, 217, 0.3)"}}>Automate annotation</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl disabled aria-label="" style={{backgroundColor: "rgb(217, 217, 217, 0.2)"}}/>
                                <InputGroup.Append>
                                  <InputGroup.Checkbox name="isAutomated" onChange={e => this.handleCheckboxChange(e)}/>
                                </InputGroup.Append>
                            </InputGroup>
                            <button onClick={this.requestTraining} className="btn btn-primary">Train Model</button>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                  </Accordion>
              </div>
              <FileUploader
                annotationFileName={this.state.projectName}
                annotationThreshold={this.state.modelThreshold}
                runRecognition={this.state.isGoogleStt}
                automate={this.state.isAutomated}
              />
          </div>
        </div>
      );
    }
}

export default App;
