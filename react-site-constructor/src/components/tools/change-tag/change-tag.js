import React, {useRef, useState, useEffect} from 'react'
import {ToolsBody} from '../__body/tools__body'
import {ToolsBlock} from '../__block/tools__block'
import {PreviewTag} from '../__preview-tag/tools__preview-tag'
import {LabelRadioInputs, Button, LabelCheckboxInput, LabelInput} from '../__block-items/tools__block-items'
import {PATH_LIST, ACTIONS_LIST, EMPTY_TAGS, CONSTRUCTOR, TAGS} from '../../../constants/constants'
import {_focus, _selectElement, _moveTagActions, _emptyTag, _clearTextNode,
        _clearMoveTag, _editTagActions, _clearEditTag, _editTextNode} from '../../../functions/functions'

import './change-tag.css';

const moveTag = (selectElementRef, actionRadioInputRef, withChildren, pathRadioInputRef, EmptyTag) => {

    const workSpaceBody = document.getElementById('WORKSPACE').contentDocument.body

    const addFocus = (e) => _focus(e, workSpaceBody, 'add')
    const removeFocus = (e) => _focus(e, workSpaceBody, 'remove')
    const selectElement = (e) => _selectElement(e, workSpaceBody, selectElementRef)
    const moveTagActions = (e) => _moveTagActions(e, actionRadioInputRef, withChildren, selectElementRef, 
                                                      pathRadioInputRef, EmptyTag)
    const clear = (e) => _clearMoveTag(e, workSpaceBody, addFocus, removeFocus, selectElement, 
                                        moveTagActions, clear, selectElementRef, EmptyTag)
    if(workSpaceBody) {
        workSpaceBody.addEventListener('mouseover', addFocus)
        workSpaceBody.addEventListener('mouseout', removeFocus)
        workSpaceBody.addEventListener('dblclick', selectElement)
        workSpaceBody.addEventListener('click', moveTagActions)
        workSpaceBody.addEventListener('contextmenu', clear)
    }

}

const editTag = (selectElementRef, oldTagNameRef, setAttributesObj, setEditTagName, tagBodyRef, emptyTag,
                 setEditAttributeName, setEditAttributeValue, editElementRef) => {
    const workSpaceBody = document.getElementById('WORKSPACE').contentDocument.body

    const addFocus = (e) => _focus(e, workSpaceBody, 'add')
    const removeFocus = (e) => _focus(e, workSpaceBody, 'remove')
    const selectElement = (e) => _selectElement(e, workSpaceBody, selectElementRef)
    const editTagActions = (e) => _editTagActions(oldTagNameRef, selectElementRef, 
                                                  setAttributesObj, setEditTagName, tagBodyRef, CONSTRUCTOR)
    const clear = (e) => _clearEditTag(e, workSpaceBody, CONSTRUCTOR, addFocus, removeFocus, selectElement, 
                                        editTagActions, clear, selectElementRef, emptyTag, setEditTagName,
                                        setAttributesObj, setEditAttributeName, setEditAttributeValue, tagBodyRef,
                                        oldTagNameRef, editElementRef)

    if(workSpaceBody) {
        workSpaceBody.addEventListener('mouseover', addFocus)
        workSpaceBody.addEventListener('mouseout', removeFocus)
        workSpaceBody.addEventListener('dblclick', selectElement)
        workSpaceBody.addEventListener('click', editTagActions)
        workSpaceBody.addEventListener('contextmenu', clear)
    }

}

const textNode = (selectElementRef, emptyTag) => {
    const workSpaceBody = document.getElementById('WORKSPACE').contentDocument.body

    const addFocus = (e) => _focus(e, workSpaceBody, 'add')
    const removeFocus = (e) => _focus(e, workSpaceBody, 'remove')
    const editTextNode = (e) => _editTextNode(e, selectElementRef, workSpaceBody)
    const clear = (e) => _clearTextNode(e, workSpaceBody, addFocus, removeFocus, editTextNode,
                                         clear, selectElementRef, emptyTag)

    if(workSpaceBody) {
        workSpaceBody.addEventListener('mouseover', addFocus)
        workSpaceBody.addEventListener('mouseout', removeFocus)
        workSpaceBody.addEventListener('click', editTextNode)
        workSpaceBody.addEventListener('contextmenu', clear)
    }
}

const ChangeTag =  () => {

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

    const ShowTag = () => {
        const attributes = Object.entries(attributesObj).map(([key, value]) => {
           return `${key}="${value}"`
        })
        if (TAGS.includes(editTagName)  && !EMPTY_TAGS.includes(editTagName)) {
            return <div className="show-tag">
                        {`<${editTagName} ${attributes.join(' ')}>...</${editTagName}>`}
                   </div>
        }else if (EMPTY_TAGS.includes(editTagName)) {
            return <div className="show-tag">
            {`<${editTagName} ${attributes.join(' ')}/>`}
       </div>
        }else {
            return <></>
        }
    }


    useEffect(() => {editElementRef.current = CONSTRUCTOR.querySelector('.tools__preview-tag').lastChild;
                     emptyTag()})

    return (
        <div className="tools__change-tag change-tag">
            <ToolsBody>
                <ToolsBlock attributes={{onChange:(e) => {pathRadioInputRef.current = e.target.value}}}>
                    <LabelRadioInputs listPath={PATH_LIST} 
                                      radioInputRef={pathRadioInputRef.current}
                                      name="change-tag-path"/>
                </ToolsBlock>
                <ToolsBlock>
                    <div onChange = {(e)=>{actionRadioInputRef.current = e.target.value;
                                           hideBlock('.change-tag .tools__block')}}>   
                    <LabelRadioInputs listPath={ACTIONS_LIST}
                                      radioInputRef={actionRadioInputRef.current}
                                      name="change-tag-action"/>
                    </div>
                    <LabelCheckboxInput  attributes={{onChange:() => {setWithChildren(!withChildren)},
                                         checked: withChildren}}
                                         classLabel="checkbox-with-children">
                        With Children
                    </LabelCheckboxInput>
                </ToolsBlock>
                <ToolsBlock>
                    <Button attributes={{onClick:() => {moveTag(selectElementRef, 
                                                                actionRadioInputRef, 
                                                                withChildren, 
                                                                pathRadioInputRef,
                                                                emptyTag)}}}>
                        Move Tag
                    </Button>
                    <Button attributes={{onClick:() => {editTag(selectElementRef, oldTagNameRef, 
                                                                setAttributesObj, setEditTagName, 
                                                                tagBodyRef, emptyTag,
                                                                setEditAttributeName, setEditAttributeValue, 
                                                                editElementRef);
                                                        CONSTRUCTOR.querySelector('.change-tag .tools__block:nth-child(4)').classList.remove('hide-block')}}}>
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
                    <Button attributes={{onClick:() => {textNode(selectElementRef, emptyTag)}}}>
                        Edit Text Node
                    </Button>
                </ToolsBlock>
            </ToolsBody>
            <PreviewTag>
                <ShowTag/>
                <TagEditor/>
            </PreviewTag>
        </div>
    )
}

export {ChangeTag}