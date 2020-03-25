import React from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';

import AnnotationTable from "./AnnotationTable";


class FileUploader extends React.Component {
    constructor(props) {
        super(props)
        this.state = { audioFile: undefined }
        this.getUploadParams = this.getUploadParams.bind(this)
        this.handleChangesStatus = this.handleChangesStatus.bind(this)
    }

    getUploadParams() {
        return { url: process.env.REACT_APP_API_URL + "/upload" }
    }

    handleChangesStatus({ meta }, status) {
        if (status === "done") {
            this.setState({ audioFile: meta.name })
        }
    }

    render() {
        let page;
        if (this.state.audioFile !== undefined) {
            page =
              <div>
                  <Dropzone
                    getUploadParams={this.getUploadParams}
                    onChangeStatus={this.handleChangesStatus}
                    //onSubmit={handleSubmit}
                    styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
                  />
                  <AnnotationTable
                    file={this.state.audioFile}
                    annotationFileName={this.props.annotationFileName}
                    annotationThreshold={this.props.annotationThreshold}
                    runRecognition={this.props.runRecognition}
                    automate={this.props.automate}
                  />
              </div>;
        } else {
            page =
              <Dropzone
                getUploadParams={this.getUploadParams}
                onChangeStatus={this.handleChangesStatus}
                //onSubmit={handleSubmit}
                styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
              />;
        }
        return (
            <div>{page}</div>
        )
    }
}

export default FileUploader
