import React from 'react';

function EllipsisText({ text }) {
    return (
        <div className="w3-container">
            <p className="ellipsis-text w3-tooltip">
                <span className="w3-text w3-round w3-pale-yellow w3-tooltip-content">{text}</span>
                {text}
            </p>
        </div>
    );
}

export default EllipsisText;
