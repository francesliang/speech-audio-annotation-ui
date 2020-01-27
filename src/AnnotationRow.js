import React from 'react';
import axios from "axios";

import Player from "./Audio";


class AnnotationRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            clipName: this.props.clipName,
            annotation: "",
            modelPrediction: "",
            confidence: undefined
        };
    }

    retrieveAudioData() {
        console.log("Get audio data")
        axios.post("http://localhost:5000/infer", {
            audio_clip: this.state.clipName
        })
          .then(response => {
              this.setState({
                  modelPrediction: response.data.sentence,
                  confidence: response.data.confidence
              })
          })
          .catch(function (error) {
              console.log("retrieveAudioData error", error);
          });
    }

    componentDidMount() {
        this.retrieveAudioData()
    }

    render() {
        let player = null;
        let audioSrc = "http://localhost:5000/get_audio/" + this.state.clipName;
        if (this.state.audioData !== undefined) {
            player = <Player src={audioSrc} />
        }
        player = <Player audioSrc={audioSrc} />
        return (
            <tr>
              <td>{this.state.id}</td>
              <td>
                {this.state.clipName}
                {player}
              </td>
              <td><input type="text" name="annotation" /></td>
              <td>{this.state.modelPrediction}</td>
              <td>{this.state.confidence}</td>
            </tr>
        )

    }
}

export default AnnotationRow
