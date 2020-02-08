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
            confidence: undefined,
            recognition: ""
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
              console.log("RetrieveAudioData Inference error", error);
          });

        axios.post("http://localhost:5000/recognise", {
            audio_clip: this.props.clipName
        })
          .then(response => {
              this.setState({
                  recognition: response.data.transcript,
              })
          })
          .catch(function (error) {
              console.log("RetrieveAudioData Recognition error", error);
          });
    }

    componentDidMount() {
        this.retrieveAudioData()
    }

    componentDidUpdate(prevProps) {
        if (this.props.clipName !== prevProps.clipName) {
            this.setState({
                annotation: "",
                modelPrediction: "",
                confidence: undefined,
                recognition: ""
            })
            this.retrieveAudioData()
        }
    }

    updateAnnotation(evt) {
        this.setState({ annotation: evt.target.value })
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
              <td>
                <textarea
                  value={this.state.annotation}
                  onChange={evt => this.updateAnnotation(evt)}
                  type="text"
                  id="annotation-text" />
              </td>
              <td>{this.state.modelPrediction}</td>
              <td>{this.state.confidence}</td>
              <td>{this.state.recognition}</td>
              <td>
                <AnnotationForm
                  clipId={this.props.id}
                  clipName={this.props.clipName}
                  annotation={this.state.annotation}
                />
              </td>
            </tr>
        )

    }
}

export default AnnotationRow
