import {React} from 'react';
import './tools__block.css';

const ToolsBlock = (props) => {
    return (
        <div className={`tools__block ${props.classBlock}`} {...props.attributes}>{props.children}</div>
    )
}

ToolsBlock.defaultProps = {
    classBlock: ''
}

export {ToolsBlock}