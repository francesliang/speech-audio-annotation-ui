import React from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';

import AnnotationTable from "./AnnotationTable";


class FileUploader extends React.Component {
    constructor() {
        super()
        this.state = { audioFile: undefined }
        this.getUploadParams = this.getUploadParams.bind(this)
        this.handleChangesStatus = this.handleChangesStatus.bind(this)
    }

    getUploadParams() {
        return { url: "http://localhost:5000/upload" }
    }

    handleChangesStatus({ meta }, status) {
        console.log("change status")
        console.log(status, meta)
        if (status === "done") {
            console.log(meta.name)
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
                  <AnnotationTable file={this.state.audioFile}/>
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
