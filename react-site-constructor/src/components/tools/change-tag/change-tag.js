import {React} from 'react'
import {ToolsBody} from '../__body/tools__body'
import {ToolsBlock} from '../__block/tools__block'

import './change-tag.css';

const ChangeTag = () => {
    return (
        <div className="tools__change-tag change-tag">
            <ToolsBody>
                <ToolsBlock>change tag</ToolsBlock>
            </ToolsBody>
        </div>
    )
}

export {ChangeTag}