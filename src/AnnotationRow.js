import React from 'react';
import axios from "axios";

import Player from "./Audio";


class AnnotationRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            clipName: this.props.clipName,
            audioData: null,
            sampleRate: null,
            annotation: "",
            modelPrediction: "",
            confidence: null
        };
    }

    retrieveAudioData() {
        console.log("Get audio data")
        axios.get("http://localhost:5000/get_audio/" + this.state.clipName)
          .then(response => {
            console.log('audio data result', response.data);
            this.setState({
                audioData: response.data.audio_data,
                sampleRate: response.data.sample_rate
            });
            return axios.post("http://localhost:5000/infer", {
                audio_data: this.state.audioData,
                sample_rate: this.state.sampleRate
            })
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
        return (
            <tr>
              <td>{this.state.id}</td>
              <td>
                {this.state.clipName}
                <Player audioData={this.state.audioData}/>
              </td>
              <td><input type="text" name="annotation" /></td>
              <td>{this.state.modelPrediction}</td>
              <td>{this.state.confidence}</td>
            </tr>
        )

    }
}

export default AnnotationRow
