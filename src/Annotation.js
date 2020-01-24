import React from 'react';

import Table from 'react-bootstrap/Table';
import Player from "./Audio";


class AnnotationTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            file: undefined,
            items: [],
            clips: []
        };
    }

    retrieveAudioClips() {
      console.log("Get audio data", this.state.file)
      fetch("http://localhost:5000/get_audio_clips/" + this.state.file)
        .then(res => res.json())
        .then(
          (result) => {
              console.log('audio clips', result)
              this.setState({
                  clips: result
              });
          },
          (error) => {
              this.setState({
                  error: error
              });
          }
        )
    }

    render() {
        const { error, file, items, clips } = this.state;
        return (
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
                  <td><input type="text" name="annotation" /></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
          </Table>
        )
    }
}

export default AnnotationTable
