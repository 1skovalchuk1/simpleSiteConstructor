import React, {useRef, useState, useEffect} from 'react'
import {ToolsBody} from '../__body/tools__body'
import {ToolsBlock} from '../__block/tools__block'
import {PreviewTag} from '../__preview-tag/tools__preview-tag'
import {LabelRadioInputs, Button, LabelCheckboxInput, LabelInput, ShowTag} from '../__block-items/tools__block-items'
import {PATH_LIST, ACTIONS_LIST, EMPTY_TAGS, CONSTRUCTOR, TAGS} from '../../../constants/constants'
import {_focus, _selectElement, _moveTagAction, _clearTextNode,
        _clearMoveTag, _editTagAction, _clearEditTag, _editTextNodeAction} from '../../../common-functions/common-action-functions'
import {_emptyTag, addEventsListener} from '../../../common-functions/common-functions'
import {_moveTag, _editTag, _editTextNode} from './edit-HTML-action-functions'

import './edit-HTML.css';

const EditHTML =  () => {

    const [withChildren, setWithChildren] = useState(true)
    const [showEmptyTag, setShowEmptyTag] = useState(false)
    const [editTagName, setEditTagName] = useState('')
    const [attributesObj, setAttributesObj] = useState({})
    const [editAttributeName, setEditAttributeName] = useState('')
    const [editAttributeValue, setEditAttributeValue] = useState('')

    const pathRadioInputRef = useRef('append')
    const actionRadioInputRef = useRef('copy')
    const selectElementRef = useRef()
    const editElementRef = useRef()
    const oldTagNameRef = useRef('')
    const tagBodyRef = useRef('')

    const moveTag = () => _moveTag(selectElementRef, actionRadioInputRef, pathRadioInputRef, withChildren, emptyTag, 
                                   addEventsListener, _focus, _selectElement, _moveTagAction, _clearMoveTag)
                
    const editTag = () => _editTag(CONSTRUCTOR, selectElementRef, oldTagNameRef, tagBodyRef, editElementRef, 
                                   setAttributesObj, setEditTagName, setEditAttributeName, setEditAttributeValue, 
                                   emptyTag, addEventsListener, _focus, _selectElement, _editTagAction, _clearEditTag)
    
    const editTextNode = () => _editTextNode(selectElementRef, emptyTag, _focus, _editTextNodeAction, _clearTextNode)

    const emptyTag = () => _emptyTag(editElementRef, showEmptyTag, EMPTY_TAGS)

    const addAttribute = () => {
        const newObj = {...attributesObj, [editAttributeName]: editAttributeValue}
        setAttributesObj(newObj)
    }

    const removeAttribute = () => {
        const newObj = {...attributesObj}
        delete newObj[editAttributeName]
        setAttributesObj(newObj)
    }

    const getTag = () => {
        const attributes = Object.entries(attributesObj).map(([key, value]) => {
           return `${key}="${value}"`
        })
        if (TAGS.includes(editTagName)  && !EMPTY_TAGS.includes(editTagName)) {
            return {__html: `<${editTagName} ${attributes.join(' ')}>${tagBodyRef.current}</${editTagName}>`};
                   
        }else if (EMPTY_TAGS.includes(editTagName)) {
            return {__html: `<${editTagName} ${attributes.join(' ')}/>`};
        }else {
            return {__html: ''};
        }
    }

    const TagEditor = () => {
        return <div className="tag-editor" dangerouslySetInnerHTML={getTag()}/>
    }

    const hideBlock = (querySelector) => {
        if (actionRadioInputRef.current === 'remove') {
            CONSTRUCTOR.querySelector(querySelector).classList.add('hide-block')
        }else {CONSTRUCTOR.querySelector(querySelector).classList.remove('hide-block')}
    }

    useEffect(() => {editElementRef.current = CONSTRUCTOR.querySelector('.tools__preview-tag').lastChild;
                     emptyTag()})

    return (
        <div className="tools__edit-HTML edit-HTML">
            <ToolsBody>
                <ToolsBlock attributes={{onChange:(e) => {pathRadioInputRef.current = e.target.value}}}>
                    <LabelRadioInputs listPath={PATH_LIST} 
                                      radioInputRef={pathRadioInputRef.current}
                                      name="change-tag-path"/>
                </ToolsBlock>
                <ToolsBlock>
                    <div onChange = {(e)=>{actionRadioInputRef.current = e.target.value;
                                           hideBlock('.edit-HTML .tools__block')}}>   
                    <LabelRadioInputs listPath={ACTIONS_LIST}
                                      radioInputRef={actionRadioInputRef.current}
                                      name="edit-HTML-action"/>
                    </div>
                    <LabelCheckboxInput  attributes={{onChange:() => {setWithChildren(!withChildren)},
                                         checked: withChildren}}
                                         classLabel="checkbox-with-children">
                        With Children
                    </LabelCheckboxInput>
                </ToolsBlock>
                <ToolsBlock>
                    <Button attributes={{onClick:() => {moveTag()}}}>
                        Move Tag
                    </Button>
                    <Button attributes={{onClick:() => {editTag(selectElementRef, oldTagNameRef, 
                                                                setAttributesObj, setEditTagName, 
                                                                tagBodyRef, emptyTag,
                                                                setEditAttributeName, setEditAttributeValue, 
                                                                editElementRef);
                                                        CONSTRUCTOR.querySelector('.edit-HTML .tools__block:nth-child(4)').classList.remove('hide-block')}}}>
                        Edit Tag
                    </Button>
                    <LabelCheckboxInput  attributes={{onChange:() => {setShowEmptyTag(!showEmptyTag)},
                                                      checked: showEmptyTag}}>
                        Show Empty Tags
                    </LabelCheckboxInput>
                </ToolsBlock>
                <ToolsBlock classBlock="hide-block">
                    <LabelInput attributes={{type:"text",
                                             value: editTagName,
                                             onChange:(e) => {setEditTagName(e.target.value)}}}>Edit Tag Name
                    </LabelInput>
                    <LabelInput attributes={{type:"text",
                                             value: editAttributeName,
                                             onChange:(e) => {setEditAttributeName(e.target.value)}}}>Edit Attribute Name
                    </LabelInput>
                    <LabelInput attributes={{type:"text",
                                             value: editAttributeValue,
                                             onChange:(e) => {setEditAttributeValue(e.target.value)}}}>Edit Attribute Value
                    </LabelInput>
                        <div className="label-wrapper">
                            <Button attributes={{onClick:() => {addAttribute()}}}>Add Attribute
                            </Button>
                            <Button attributes={{onClick:() => {removeAttribute()}}}>Remove Attribute
                            </Button>
                        </div>
                </ToolsBlock>
                <ToolsBlock>
                    <Button attributes={{onClick:() => {editTextNode(selectElementRef, emptyTag)}}}>
                        Edit Text Node
                    </Button>
                </ToolsBlock>
            </ToolsBody>
            <PreviewTag>
                <ShowTag atributesObj={attributesObj}
                         tagName={editTagName}
                         tagBody={'...'}
                         TAGS={TAGS}
                         EMPTY_TAGS={EMPTY_TAGS}/>
                <TagEditor/>
            </PreviewTag>
        </div>
    )
}

export {EditHTML}