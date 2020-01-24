import React from 'react';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'


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
      return (
        <Dropzone
          getUploadParams={this.getUploadParams}
          onChangeStatus={this.handleChangesStatus}
          //onSubmit={handleSubmit}
          styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
        />
      )

    }
}

export default FileUploader
