import React from 'react'
import {ToolsBody} from '../__body/tools__body'
import {ToolsFirstBlock, ToolsSecondBlock, ToolsThirdBlock, ToolsFourthBlock, ToolsFifthBlock,
        EditHTMLpreviewTag} from './edit-HTML-components'

import './edit-HTML.css';

const EditHTML =  (props) => {

    return (
        <div className="tools__edit-HTML edit-HTML">
            <ToolsBody>
                <ToolsFirstBlock pathRadioInputRef={props.pathRadioInputRef}/>

                <ToolsSecondBlock actionRadioInputRef={props.actionRadioInputRef}
                                  withChildren={props.withChildren}
                                  setWithChildren={props.setWithChildren}/>

                <ToolsThirdBlock moveTag={props}
                                 editTag={props}
                                 setShowEmptyTag={props.setShowEmptyTag}
                                 showEmptyTag={props.showEmptyTag}/>

                <ToolsFourthBlock editTagName={props.editTagName}
                                  setEditTagName={props.setEditTagName}
                                  editAttributeName={props.editAttributeName}
                                  setEditAttributeName={props.setEditAttributeName}
                                  editAttributeValue={props.editAttributeValue}
                                  setEditAttributeValue={props.setEditAttributeValue}
                                  addAttribute={props.addAttribute}
                                  removeAttribute={props.removeAttribute}/>
                <ToolsFifthBlock editTextNode={props}/>
            </ToolsBody>

            <EditHTMLpreviewTag editAttributesObj={props.editAttributesObj}
                                editTagName={props.editTagName}
                                getTag={props}/>
        </div>
    )
}

export {EditHTML}