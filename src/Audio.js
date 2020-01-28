import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


class Player extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <AudioPlayer
              autoPlayAfterSrcChange={false}
              src={this.props.audioSrc}
              onPlay={e => console.log("onPlay")}
              // other props here
            />
        )
      }
}

export default Player
