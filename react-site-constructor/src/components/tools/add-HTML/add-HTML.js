import React from 'react'
import {ToolsBody} from '../__body/tools__body'
import {ToolsBlock} from '../__block/tools__block'
import {PreviewTag} from '../__preview-tag/tools__preview-tag'
import {LabelInput, LabelCheckboxInput, ShowTag, Button, CheckIcon, LabelRadioInputs} from '../__block-items/tools__block-items';
import {CONSTRUCTOR, TAGS, EMPTY_TAGS, PATH_LIST} from '../../../constants/constants'
import {_focus, _selectElement, _joinTagAction, _clearAddTag} from '../../../common-functions/common-action-functions'
import {addEventsListener} from '../../../common-functions/common-functions'
import {_addTag} from './add-HTML-action-functions'

import './add-HTML.css';

const AddHTML = (props) => {

    const addTag = () => _addTag(CONSTRUCTOR, props.selectElementRef, props.pathRadioInputRef, props.addElementRef, 
                                 props.emptyTag, addEventsListener, _focus, _selectElement, _joinTagAction, _clearAddTag)

    const TagCreator = () => {
        if (CONSTRUCTOR) {
            if (TAGS.includes(props.addTagName) && !EMPTY_TAGS.includes(props.addTagName)) {
                CONSTRUCTOR.querySelector('.label-wrapper:nth-child(2)').classList.remove('hide-block')
                return React.createElement(props.addTagName, props.addAttributesObj,`${props.addTagBody}`)
            }else if (EMPTY_TAGS.includes(props.addTagName)) {
                CONSTRUCTOR.querySelector('.label-wrapper:nth-child(2)').classList.add('hide-block')
                return React.createElement(props.addTagName, props.addAttributesObj)
            }else {
                return <></>
            }
        }
    }

    const clearForm = () => {
        props.setAddTagName('')
        props.setAddTagBody('')
        props.setAddAttributesObj({})
        props.setAddAttributeName('')
        props.setAddAttributeValue('')
        props.pathRadioInputRef.current = 'append'
    }

    const save = () => {
        fetch('http://localhost:3001/html', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=UTF-8'
            },
            body: document.getElementById('WORKSPACE').contentDocument.children[0].outerHTML
        });
    }

    return (
        <div className="tools__add-HTML add-HTML">
            <ToolsBody>
                <ToolsBlock attributes={{onChange:(e) => {props.pathRadioInputRef.current = e.target.value}}}>
                    <LabelRadioInputs listPath={PATH_LIST} 
                                      radioInputRef={props.pathRadioInputRef.current}
                                      name="add-HTML"/>
                </ToolsBlock>
                <ToolsBlock>
                    <LabelInput attributes={{type:"text",
                                             value: props.addTagName,
                                             onChange:(e) => {props.setAddTagName(e.target.value)}}}>
                        Tag Name
                        <CheckIcon value={TAGS.includes(props.addTagName)}/>
                    </LabelInput>
                    <LabelInput attributes={{type:"text",
                                             value: props.addTagBody,
                                             onChange:(e) => {props.setAddTagBody(e.target.value)}}}>
                        Tag Body
                    </LabelInput>
                        <div className="label-wrapper">
                            <Button attributes={{onClick: () => addTag()}}>
                                Add tag
                            </Button>
                            <Button attributes={{onClick: () => clearForm()}}>
                                Clear form
                            </Button>
                        </div>
                </ToolsBlock>
                <ToolsBlock>
                    <LabelInput attributes={{type:"text",
                                             value: props.addAttributeName,
                                             onChange:(e) => {props.setAddAttributeName(e.target.value)}}}>
                        Attribute Name
                    </LabelInput>
                    <LabelInput attributes={{type:"text",
                                             value: props.addAttributeValue,
                                             onChange:(e) => {props.setAddAttributeValue(e.target.value)}}}>
                        Attribute Value
                    </LabelInput>
                        <div className="label-wrapper">
                            <Button attributes={{onClick:() => {props.addAttribute()}}}>
                                Add Attribute
                            </Button>
                            <Button attributes={{onClick:() => {props.removeAttribute()}}}>
                                Remove Attribute
                            </Button>
                        </div>
                </ToolsBlock>
                <ToolsBlock classBlock="tools__block--last">
                    <LabelCheckboxInput  attributes={{onChange:() => {props.setShowEmptyTag(!props.showEmptyTag)},
                                                      checked: props.showEmptyTag}}>
                        Show Empty Tags
                    </LabelCheckboxInput>
                    <div className="label-wrapper">
                        <Button attributes={{onClick:() => {save()}}}>
                            Save Project
                        </Button>
                    </div>
                </ToolsBlock>
            </ToolsBody>
            <PreviewTag>
                <ShowTag attributesObj={props.addAttributesObj}
                         tagName={props.addTagName}
                         tagBody={props.addTagBody}
                         TAGS={TAGS}
                         EMPTY_TAGS={EMPTY_TAGS}/>
                <TagCreator/>
            </PreviewTag>
        </div>
    )
}

export {AddHTML}