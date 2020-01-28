import React from 'react';
import axios from "axios";


class AnnotationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.formHandler = this.formHandler.bind(this)
    }

    formHandler() {
        axios.post("http://localhost:5000/annotate", {
            clip_id: this.props.clipId,
            clip_name: this.props.clipName,
            annotation: this.props.annotation
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
