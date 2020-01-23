import React from 'react';

import Player from "./Audio";

class Annotation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            items: []
        };
    }

    render() {
        return (
            <tr>
              <td>1</td>
              <td><Player /></td>
              <td><input type="text" name="annotation" /></td>
              <td></td>
              <td></td>

            </tr>
        )
    }
}

export default Annotation
