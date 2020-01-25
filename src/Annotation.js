import React from 'react';

import Table from 'react-bootstrap/Table';
import AnnotationRow from "./AnnotationRow";


class AnnotationTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            file: undefined,
            clips: []
        };
    }

    retrieveAudioClips() {
      console.log("Get audio clips", this.state.file)
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

    componentDidMount() {
        this.retrieveAudioClips()
    }

    render() {
        const { error, file, clips } = this.state;
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
                <AnnotationRow />
              </tbody>
          </Table>
        )
    }
}

export default AnnotationTable
