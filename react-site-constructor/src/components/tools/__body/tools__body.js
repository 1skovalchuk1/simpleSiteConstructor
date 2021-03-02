import {React} from 'react'

import './tools__body.css';

const ToolsBody = (props) => {
    return (
        <div className="tools__body">{props.children}</div>
    )
}

export {ToolsBody}