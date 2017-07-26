import React from 'react';
require("../css/progress.css");

var Progress = React.createClass({
    render : function() {
        return (
            <div className="loading-container">
                <div className="loading"></div>
                <div id="loading-text">April Skin</div>
            </div>
        );
    }
});

export default Progress;