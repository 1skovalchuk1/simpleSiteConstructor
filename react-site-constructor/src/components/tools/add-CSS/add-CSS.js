import React, {useState} from 'react'
import {ToolsBody} from '../__body/tools__body'
import {ToolsBlock} from '../__block/tools__block'
import {PreviewTag} from '../__preview-tag/tools__preview-tag'
import {LabelInput,  Button, CheckIcon} from '../__block-items/tools__block-items';
import {CSS_PROPERTIES} from '../../../constants/constants'
// import {_focus, _selectElement, _joinTagAction, _clearAddTag} from '../../../common-functions/common-action-functions'
// import {_emptyTag, addEventsListener} from '../../../common-functions/common-functions'
// import {_actions} from './add-tag-action-functions'

import './add-CSS.css';

const AddCSS = () => {

    const [querySelectorAll, setQuerySelectorAll] = useState('')
    const [CSSproperty, setCSSproperty] = useState('')
    const [CSSvalue, setCSSvalue] = useState('')

    const checkQuerySelector = () => {
        try {
            const workSpaceBody = document.getElementById('WORKSPACE').contentDocument.body
            if (querySelectorAll) {
                const queryLength =  workSpaceBody.querySelectorAll(querySelectorAll).length
                console.dir(workSpaceBody.querySelectorAll(querySelectorAll))
                return queryLength
            }
        }catch (e) {
          }
    }

    const getCSSobj = () => {
        if (querySelectorAll.length) {
            const CSSobj = {
                querySelectorAll: {
                    [CSSproperty]: CSSvalue,
                }
            }
            return CSSobj
        }
    }
    const removeCSS = () => {}

    return (
        <div className="tools__add-CSS add-CSS">
            <ToolsBody>
                <ToolsBlock>
                    <LabelInput attributes={{type:"text",
                                             value: querySelectorAll,
                                             onChange:(e) => {setQuerySelectorAll(e.target.value)}}}>querySelectorAll
                        <CheckIcon value={checkQuerySelector()}/>
                    </LabelInput>
                    <LabelInput attributes={{type:"text",
                                             value: CSSproperty,
                                             onChange:(e) => {setCSSproperty(e.target.value)}}}>CSS Property
                        <CheckIcon classCheck="check-icon-margin" value={CSS_PROPERTIES.includes(CSSproperty)}/>
                    </LabelInput>
                    <LabelInput attributes={{type:"text",
                                             value: CSSvalue,
                                             onChange:(e) => {setCSSvalue(e.target.value)}}}>CSS Value
                    </LabelInput>
                        <div className="label-wrapper">
                            <Button attributes={{onClick: () => getCSSobj()}}>
                                Add CSS
                            </Button>
                            <Button attributes={{onClick: () => removeCSS()}}>
                                Remove CSS
                            </Button>
                        </div>
                </ToolsBlock>
            </ToolsBody>
            <PreviewTag>
            </PreviewTag>
        </div>
    )
}

export {AddCSS}