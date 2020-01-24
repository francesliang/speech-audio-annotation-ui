import React from 'react';

import Player from "./Audio";


class Annotation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            items: [],
            clips: []
        };
    }

    retrieveAudioClips(fileName) {
      console.log("Get audio data", fileName)
      fetch("http://localhost:5000/get_audio_clips/" + fileName)
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
        return (
            <tr>
              <td>1</td>
              <td><Player /></td>
              <td><input type="text" name="annotation" /></td>
              <td></td>
              <td></td>

            </tr>
        )
    }
}

export default Annotation
