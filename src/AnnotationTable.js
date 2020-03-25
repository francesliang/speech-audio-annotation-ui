import React from 'react';

import Table from 'react-bootstrap/Table';
import AnnotationRow from "./AnnotationRow";
import Pagination from "./Pagination";


class AnnotationTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            allClips: [],
            currentClips: [],
            currentPage: null,
            totalPage: null
        };
    }

    retrieveAudioClips() {
      console.log("Get audio clips", this.props.file)
      fetch("http://localhost:5000/get_audio_clips/" + this.props.file)
        .then(res => res.json())
        .then(
          (result) => {
              this.setState({
                  allClips: result
              });
          },
          (error) => {
              console.log('Get audio clips error', error)
              this.setState({
                  error: error
              });
          }
        )
    }

    componentDidMount() {
        this.retrieveAudioClips()
        const { data: allClips = [] } = this.state.allClips;
    }

    componentDidUpdate(prevProps) {
        if (this.props.file !== prevProps.file) {
            this.retrieveAudioClips()
        }
    }

    onPageChanged = data => {
        const {currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentClips = this.state.allClips.slice(offset, offset + pageLimit);

        this.setState({ currentPage, currentClips, totalPages });
    }


    render() {
        let rows;
        const { allClips, currentClips, currentPage, totalPages } = this.state;
        const totalClips = allClips.length;

        if (totalClips === 0) return null;

        rows = currentClips.map((item, index) => (
            <AnnotationRow
              id={index}
              clipName={item}
              key={index}
              annotationFileName={this.props.annotationFileName}
              annotationThreshold={this.props.annotationThreshold}
              runRecognition={this.props.runRecognition}
              automate={this.props.automate}
            />
        ));

        const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();

        return (
            <div>
              <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                <div className="d-flex flex-row align-items-center">

                  <h2 className={headerClass}>
                    <strong className="text-secondary">{totalClips}</strong> Audio Clips
                  </h2>

                    <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                      Page <span className="font-weight-bold">{ currentPage }</span> / <span className="font-weight-bold">{ totalPages }</span>
                    </span>

                </div>

                <div className="d-flex flex-row py-4 align-items-center">
                  <Pagination totalRecords={totalClips} pageLimit={10} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                </div>
              </div>
              <div style={{marginTop: "50px"}}>
                  <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Audio</th>
                          <th>Annotation</th>
                          <th>DeepSpeech</th>
                          <th>Confidence</th>
                          <th>Google Speech-to-Text</th>
                          <th>Annotate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows}
                      </tbody>
                  </Table>
              </div>
            </div>
        )
    }
}

export default AnnotationTable
