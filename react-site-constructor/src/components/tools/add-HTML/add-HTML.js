import React from 'react'
import {ToolsBody} from '../__body/tools__body'
import {ToolsFirstBlock, ToolsSecondBlock, ToolsThirdBlock, 
        ToolsFourthBlock, AddHTMLpreviewTag} from './add-HTML-components'

import './add-HTML.css'

const AddHTML = (props) => {

    return (
        <div className="tools__add-HTML add-HTML">
            <ToolsBody>
                <ToolsFirstBlock pathRadioInputRef={props.pathRadioInputRef}/>

                <ToolsSecondBlock addTagName={props.addTagName}
                                  setAddTagName={props.setAddTagName}
                                  addTagBody={props.addTagBody}
                                  setAddTagBody={props.setAddTagBody}
                                  addTag={props}
                                  clearForm={props}/>

                <ToolsThirdBlock addAttributeName={props.addAttributeName}
                                 setAddAttributeName={props.setAddAttributeName}
                                 addAttributeValue={props.addAttributeValue}
                                 setAddAttributeValue={props.setAddAttributeValue}
                                 addAttribute={props.addAttribute}
                                 removeAttribute={props.removeAttribute}/>

                <ToolsFourthBlock showEmptyTag={props.showEmptyTag}
                                  setShowEmptyTag={props.setShowEmptyTag}/>
            </ToolsBody>

            <AddHTMLpreviewTag addAttributesObj={props.addAttributesObj}
                               addTagName={props.addTagName}
                               addTagBody={props.addTagBody}/>
        </div>
    )
}

export {AddHTML}