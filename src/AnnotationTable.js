import React from 'react';

import Table from 'react-bootstrap/Table';
import AnnotationRow from "./AnnotationRow";


class AnnotationTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            clips: []
        };
    }

    retrieveAudioClips() {
      console.log("Get audio clips", this.props.file)
      fetch("http://localhost:5000/get_audio_clips/" + this.props.file)
        .then(res => res.json())
        .then(
          (result) => {
              this.setState({
                  clips: result
              });
          },
          (error) => {
              console.log('Get audio clips error', error)
              this.setState({
                  error: error
              });
          }
        )
    }

    componentDidMount() {
        this.retrieveAudioClips()
    }

    componentDidUpdate(prevProps) {
        if (this.props.file !== prevProps.file) {
            this.retrieveAudioClips()
        }
    }

    render() {
        let rows;
        rows = this.state.clips.map((item, index) => (
            <AnnotationRow id={index} clipName={item} key={index}/>
        ));
        return (
          <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Audio</th>
                  <th>Annotation</th>
                  <th>DeepSpeech</th>
                  <th>Confidence</th>
                  <th>Annotate</th>
                </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
          </Table>
        )
    }
}

export default AnnotationTable
