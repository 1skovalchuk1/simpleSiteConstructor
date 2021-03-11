import React from 'react'
import {ToolsBody} from '../__body/tools__body'
import {ToolsBlock} from '../__block/tools__block'
import {PreviewTag} from '../__preview-tag/tools__preview-tag'
import {LabelRadioInputs, Button, LabelCheckboxInput, LabelInput, ShowTag} from '../__block-items/tools__block-items'
import {PATH_LIST, ACTIONS_LIST, EMPTY_TAGS, CONSTRUCTOR, TAGS} from '../../../constants/constants'
import {_focus, _selectElement, _moveTagAction, _clearTextNode,
        _clearMoveTag, _editTagAction, _clearEditTag, _editTextNodeAction} from '../../../common-functions/common-action-functions'
import {addEventsListener} from '../../../common-functions/common-functions'
import {_moveTag, _editTag, _editTextNode} from './edit-HTML-action-functions'

import './edit-HTML.css';

const EditHTML =  (props) => {

    const moveTag = () => _moveTag(props.selectElementRef, props.actionRadioInputRef, props.pathRadioInputRef,
                                   props.withChildren, props.emptyTag, 
                                   addEventsListener, _focus, _selectElement, _moveTagAction, _clearMoveTag)
                
    const editTag = () => _editTag(CONSTRUCTOR, props.selectElementRef, props.oldTagNameRef, props.tagBodyRef,
                                   props.editElementRef, props.setEditAttributesObj, props.setEditTagName,
                                   props.setEditAttributeName, props.setEditAttributeValue, props.emptyTag, 
                                   addEventsListener, _focus, _selectElement, _editTagAction, _clearEditTag)
    
    const editTextNode = () => _editTextNode(props.selectElementRef, props.emptyTag, _focus,
                                             _editTextNodeAction, _clearTextNode)

    const getTag = () => {
        const attributes = Object.entries(props.editAttributesObj).map(([key, value]) => {
           return `${key}="${value}"`
        })
        if (TAGS.includes(props.editTagName)  && !EMPTY_TAGS.includes(props.editTagName)) {
            return {
                __html: `<${props.editTagName} ${attributes.join(' ')}>${props.tagBodyRef.current}</${props.editTagName}>`};
                   
        }else if (EMPTY_TAGS.includes(props.editTagName)) {
            return {__html: `<${props.editTagName} ${attributes.join(' ')}/>`};
        }else {
            return {__html: ''};
        }
    }

    const TagEditor = () => {
        return <div className="tag-editor" dangerouslySetInnerHTML={getTag()}/>
    }

    const hideBlock = (querySelector) => {
        if (props.actionRadioInputRef.current === 'remove') {
            CONSTRUCTOR.querySelector(querySelector).classList.add('hide-block')
        }else {CONSTRUCTOR.querySelector(querySelector).classList.remove('hide-block')}
    }

    return (
        <div className="tools__edit-HTML edit-HTML">
            <ToolsBody>
                <ToolsBlock attributes={{onChange:(e) => {props.pathRadioInputRef.current = e.target.value}}}>
                    <LabelRadioInputs listPath={PATH_LIST} 
                                      radioInputRef={props.pathRadioInputRef.current}
                                      name="change-tag-path"/>
                </ToolsBlock>
                <ToolsBlock>
                    <div onChange = {(e)=>{props.actionRadioInputRef.current = e.target.value;
                                           hideBlock('.edit-HTML .tools__block')}}>   
                    <LabelRadioInputs listPath={ACTIONS_LIST}
                                      radioInputRef={props.actionRadioInputRef.current}
                                      name="edit-HTML-action"/>
                    </div>
                    <LabelCheckboxInput  attributes={{onChange:() => {props.etWithChildren(!props.withChildren)},
                                         checked: props.withChildren}}
                                         classLabel="checkbox-with-children">
                        With Children
                    </LabelCheckboxInput>
                </ToolsBlock>
                <ToolsBlock>
                    <Button attributes={{onClick:() => {moveTag()}}}>
                        Move Tag
                    </Button>
                    <Button attributes={{onClick:() => {editTag(props.selectElementRef, props.oldTagNameRef, 
                                                                props.setEditAttributesObj, props.setEditTagName, 
                                                                props.tagBodyRef, props.emptyTag,
                                                                props.setEditAttributeName, props.setEditAttributeValue, 
                                                                props.editElementRef);
                                                        CONSTRUCTOR.querySelector('.edit-HTML .tools__block:nth-child(4)').classList.remove('hide-block')}}}>
                        Edit Tag
                    </Button>
                    <LabelCheckboxInput  attributes={{onChange:() => {props.setShowEmptyTag(!props.showEmptyTag)},
                                                      checked: props.showEmptyTag}}>
                        Show Empty Tags
                    </LabelCheckboxInput>
                </ToolsBlock>
                <ToolsBlock classBlock="hide-block">
                    <LabelInput attributes={{type:"text",
                                             value: props.editTagName,
                                             onChange:(e) => {props.setEditTagName(e.target.value)}}}>
                        Edit Tag Name
                    </LabelInput>
                    <LabelInput attributes={{type:"text",
                                             value: props.editAttributeName,
                                             onChange:(e) => {props.setEditAttributeName(e.target.value)}}}>
                        Edit Attribute Name
                    </LabelInput>
                    <LabelInput attributes={{type:"text",
                                             value: props.editAttributeValue,
                                             onChange:(e) => {props.setEditAttributeValue(e.target.value)}}}>
                        Edit Attribute Value
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
                <ToolsBlock>
                    <Button attributes={{onClick:() => {editTextNode(props.selectElementRef, props.emptyTag)}}}>
                        Edit Text Node
                    </Button>
                </ToolsBlock>
            </ToolsBody>
            <PreviewTag>
                <ShowTag attributesObj={props.editAttributesObj}
                         tagName={props.editTagName}
                         tagBody={'...'}
                         TAGS={TAGS}
                         EMPTY_TAGS={EMPTY_TAGS}/>
                <TagEditor/>
            </PreviewTag>
        </div>
    )
}

export {EditHTML}