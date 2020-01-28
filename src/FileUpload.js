import React from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';

import AnnotationTable from "./AnnotationTable";


class FileUploader extends React.Component {
    constructor() {
        super()
        this.state = { audio_file: undefined }
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
            this.setState({ audio_file: meta.name })
        }
    }

    render() {
        let page;
        if (this.state.audio_file !== undefined) {
            page =
              <div>
                  <Dropzone
                    getUploadParams={this.getUploadParams}
                    onChangeStatus={this.handleChangesStatus}
                    //onSubmit={handleSubmit}
                    styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
                  />
                  <AnnotationTable file={this.state.audio_file}/>
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
