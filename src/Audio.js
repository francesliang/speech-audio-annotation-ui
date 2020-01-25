import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.audioData,
        };
    }
    render() {
        return (
            <AudioPlayer
              autoPlay
              src={this.state.data}
              onPlay={e => console.log("onPlay")}
              // other props here
            />
        )
      }
}


export default Player
