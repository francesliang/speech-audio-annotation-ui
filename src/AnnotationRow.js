import React from 'react';
import axios from "axios";

import Player from "./Audio";


class AnnotationRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            clipName: null,
            audioData: null,
            sampleRate: null,
            annotation: "",
            modelPrediction: "",
            confidence: null
        };
    }

    retrieveAudioData() {
        console.log("Get audio data")
        fetch("http://localhost:5000/get_audio/" + this.state.clipName)
          .then(
            (result) => {
                this.setState({
                    audioData: result
                });
            }
          )
    }

    retrieveInference() {
        console.log("Run inference")
        axios.post("http://localhost:5000/infer/", {
            audio_data: this.state.audioData,
            sample_rate: this.state.sampleRate
        })
        .then(function (response) {
            console.log("Inference response", response);
        })
        .catch(function (error) {
            console.log("Inference error", error);
        });
    }

    componentDidMount() {
        this.retrieveAudioData()
        this.retrieveInference()
    }

    render() {
        return (
            <tr>
              <td>{this.state.id}</td>
              <td><Player data={this.state.audioData}/></td>
              <td><input type="text" name="annotation" /></td>
              <td>{this.state.modelPrediction}</td>
              <td>{this.state.confidence}</td>
            </tr>
        )

    }
}

export default AnnotationRow
