import React from 'react';
import axios from "axios";
import './App.css';

import {InputGroup, FormControl, Accordion, Card, Button, Modal, Spinner} from 'react-bootstrap';
import FileUploader from "./FileUpload";


class App extends React.Component {
    constructor(){
        super()
        this.state = {
            projectName: undefined,
            modelThreshold: undefined,
            isGoogleStt: undefined,
            isAutomated: undefined,
            trainingMessage: undefined,
            trainingEpochs: undefined,
            trainingLr: undefined,
            showTrainingMessage: false
        }
        this.requestTraining = this.requestTraining.bind(this)
        this.handleMessageClose = this.handleMessageClose.bind(this)
    }

    handleTextChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleCheckboxChange(e) {
        this.setState({ [e.target.name]: e.target.checked });
    }

    handleMessageClose() {
        this.setState({ showTrainingMessage: false })
    }

    handleMessageShow() {
        this.setState({ showTrainingMessage: true })
    }

    requestTraining(){
        this.setState({trainingMessage: undefined});
        axios.post(process.env.REACT_APP_API_URL + "/train", {
            annotation_file: this.state.projectName,
            epochs: this.state.trainingEpochs,
            learning_rate: this.state.trainingLr
        })
          .then(response => {
              this.setState({trainingMessage: "Model training has been triggered"});
          })
          .catch(function (error) {
              console.log(error);
              this.setState({trainingMessage: "Model training trigger encountered error:" + error});
          });
        this.handleMessageShow();
    }

    render() {
      let trainingMessage;
      if (this.state.trainingMessage !== undefined) {
          trainingMessage = <p>{this.state.trainingMessage}</p>
      } else {
          trainingMessage = <Spinner animation="border" role="status" variant="primary"><span className="sr-only">Loading...</span></Spinner>
      }

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
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                  <InputGroup.Text style={{backgroundColor: "rgb(217, 217, 217, 0.3)"}}>Model Training Epochs</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                  name="trainingEpochs"
                                  onChange={e => this.handleTextChange(e)}
                                  aria-label="threshold"
                                  aria-describedby="basic-addon2"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                  <InputGroup.Text style={{backgroundColor: "rgb(217, 217, 217, 0.3)"}}>Training Learning Rate</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                  name="trainingLr"
                                  onChange={e => this.handleTextChange(e)}
                                  aria-label="threshold"
                                  aria-describedby="basic-addon2"
                                />
                            </InputGroup>
                            <button onClick={this.requestTraining} className="btn btn-primary">Train Model</button>
                            <Modal show={this.state.showTrainingMessage} onHide={this.handleMessageClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Training Message</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  {trainingMessage}
                                </Modal.Body>
                            </Modal>
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
