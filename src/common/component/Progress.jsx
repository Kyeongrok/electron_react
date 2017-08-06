import React, {Component} from 'react';
require("../css/progress.css");

class Progress extends Component {
    render() {
        return (
            <div className="loading-container">
                <div className="loading"></div>
                <div id="loading-text">April Skin</div>
            </div>
        );
    }
}

export default Progress;