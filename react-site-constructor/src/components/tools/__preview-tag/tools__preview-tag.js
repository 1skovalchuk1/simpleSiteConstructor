import React from 'react';

import './tools__preview-tag.css'

const PreviewTag = (props) => {
    return (
        <div className="tools__preview-tag">{props.children}</div>
    )
}

export {PreviewTag}