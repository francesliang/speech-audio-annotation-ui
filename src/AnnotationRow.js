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
        axios.post(process.env.REACT_APP_API_URL + "/infer", {
            audio_clip: this.props.clipName
        })
          .then(response => {
              this.setState({
                  modelPrediction: response.data.sentence,
                  confidence: response.data.confidence
              })
              if (response.data.confidence > this.props.annotationThreshold) {
                  this.setState({
                      annotation: response.data.sentence
                  })
              }
          })
          .catch(function (error) {
              console.log("RetrieveAudioData Inference error", error);
          });

        if (this.props.runRecognition) {
            axios.post(process.env.REACT_APP_API_URL + "/recognise", {
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
        } else {
            this.setState({ recognition: "N/A" })
        }
    }

    componentDidMount() {
        this.retrieveAudioData()
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
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
        let audioSrc = process.env.REACT_APP_API_URL + "/get_audio/" + this.props.clipName;
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
                  annotationFileName={this.props.annotationFileName}
                />
              </td>
            </tr>
        )

    }
}

export default AnnotationRow
