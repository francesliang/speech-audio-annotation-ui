import React from 'react';
import axios from "axios";


class AnnotationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.formHandler = this.formHandler.bind(this)
    }

    formHandler() {
        axios.post(process.env.REACT_APP_API_URL + "/annotate", {
            clip_id: this.props.clipId,
            clip_name: this.props.clipName,
            annotation: this.props.annotation,
            annotation_file: this.props.annotationFileName
        })
          .then(response => {
              console.log("Submitted annotation form")
          })
          .catch(function (error) {
              console.log("Annotation form submission error", error);
          });

    }

    render() {
        return(
            <button onClick={this.formHandler} className="btn btn-primary">Save</button>
        )
    }
}

export default AnnotationForm
