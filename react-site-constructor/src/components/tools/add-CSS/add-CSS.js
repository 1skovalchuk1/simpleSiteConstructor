import React, {useState, useRef, useEffect} from 'react'
import {ToolsBody} from '../__body/tools__body'
import {ToolsBlock} from '../__block/tools__block'
import {PreviewTag} from '../__preview-tag/tools__preview-tag'
import {LabelInput, LabelCheckboxInput, ShowTag, Button, CheckIcon, LabelRadioInputs} from '../__block-items/tools__block-items';
// import {CONSTRUCTOR, TAGS, EMPTY_TAGS, PATH_LIST} from '../../../constants/constants'
// import {_focus, _selectElement, _joinTagAction, _clearAddTag} from '../../../common-functions/common-action-functions'
// import {_emptyTag, addEventsListener} from '../../../common-functions/common-functions'
// import {_actions} from './add-tag-action-functions'

import './add-CSS.css';

const AddCSS = () => {

    const [querySelectorAll, setQuerySelectorAll] = useState('')
    const [CSSproperty, setCSSproperty] = useState('')
    const [CSSvalue, setCSSvalue] = useState('')

    const getCSS = () => {}
    const removeCSS = () => {}

    return (
        <div className="tools__add-CSS add-CSS">
            <ToolsBody>
                <ToolsBlock>
                    <LabelInput attributes={{type:"text",
                                             value: querySelectorAll,
                                             onChange:(e) => {setQuerySelectorAll(e.target.value)}}}>querySelectorAll
                        {/* <CheckIcon value={TAGS.includes(tagName)}/> */}
                    </LabelInput>
                    <LabelInput attributes={{type:"text",
                                             value: CSSproperty,
                                             onChange:(e) => {setCSSproperty(e.target.value)}}}>Tag Body
                    </LabelInput>
                    <LabelInput attributes={{type:"text",
                                             value: CSSvalue,
                                             onChange:(e) => {setCSSvalue(e.target.value)}}}>Tag Body
                    </LabelInput>
                        <div className="label-wrapper">
                            <Button attributes={{onClick: () => getCSS()}}>
                                Add tag
                            </Button>
                            <Button attributes={{onClick: () => removeCSS()}}>
                                Clear form
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