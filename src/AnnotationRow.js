import React from 'react';
import axios from "axios";

import Player from "./Audio";
import AnnotationForm from "./AnnotationForm";


class AnnotationRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            annotation: "",
            modelPrediction: "",
            confidence: undefined
        };
    }

    retrieveAudioData() {
        axios.post("http://localhost:5000/infer", {
            audio_clip: this.props.clipName
        })
          .then(response => {
              this.setState({
                  modelPrediction: response.data.sentence,
                  confidence: response.data.confidence
              })
          })
          .catch(function (error) {
              console.log("RetrieveAudioData error", error);
          });
    }

    componentDidMount() {
        this.retrieveAudioData()
    }

    componentDidUpdate(prevProps) {
        if (this.props.clipName !== prevProps.clipName) {
            this.retrieveAudioData()
        }
    }

    render() {
        let audioSrc = "http://localhost:5000/get_audio/" + this.props.clipName;
        return (
            <tr>
              <td>{this.props.id}</td>
              <td>
                {this.props.clipName}
                <Player audioSrc={audioSrc} />
              </td>
              <td><input type="text" name="annotation" /></td>
              <td>{this.state.modelPrediction}</td>
              <td>{this.state.confidence}</td>
              <td>
                <AnnotationForm
                  clipId={this.props.id}
                  clipName={this.props.clipName}
                  annotation=""
                />
              </td>
            </tr>
        )

    }
}

export default AnnotationRow
