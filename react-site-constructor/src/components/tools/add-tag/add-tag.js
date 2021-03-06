import React, {useState, useRef, useEffect} from 'react'
import {ToolsBody} from '../__body/tools__body'
import {ToolsBlock} from '../__block/tools__block'
import {PreviewTag} from '../__preview-tag/tools__preview-tag'
import {LabelInput, LabelCheckboxInput, 
        Button, CheckIcon, LabelRadioInputs} from '../__block-items/tools__block-items';
import {CONSTRUCTOR, TAGS, EMPTY_TAGS, PATH_LIST} from '../../../constants/constants'
import {_focus, _selectElement, _joinTag, _clearAddTag, _emptyTag} from '../../../functions/functions'

import './add-tag.css';

const actions = (selectElementRef, radioInputRef, newElementRef, EmptyTag) => {
    const workSpaceBody = document.getElementById('WORKSPACE').contentDocument.body
    const newElement = newElementRef.current
    
    const addFocus = (e) => _focus(e, workSpaceBody, 'add')
    const removeFocus = (e) => _focus(e, workSpaceBody, 'remove')
    const selectElement = (e) => _selectElement(e, workSpaceBody, selectElementRef)
    const joinTag = () => _joinTag(selectElementRef, radioInputRef, newElement)
    const clear = (e) => _clearAddTag(e, CONSTRUCTOR, workSpaceBody, selectElementRef, EmptyTag, 
                                      addFocus, removeFocus, selectElement, joinTag, clear)

    if (newElement) {
        if (workSpaceBody && workSpaceBody.children.length){
            // TODO make function
            CONSTRUCTOR.querySelectorAll('.tools__block')
                    .forEach((item) => {item.classList.add('hide-block')})
            // 
            workSpaceBody.addEventListener('mouseover', addFocus)
            workSpaceBody.addEventListener('mouseout', removeFocus)
            workSpaceBody.addEventListener('dblclick', selectElement)
            workSpaceBody.addEventListener('click', joinTag)
            workSpaceBody.addEventListener('contextmenu', clear)
        }else {
            workSpaceBody.append(newElement.cloneNode(true))
            // TODO make function
            CONSTRUCTOR.querySelector('.tools__block:nth-child(1)').classList.remove('hide-block')
        }
    }
}

const AddTag = () => {

    const [tagName, setTagName] = useState('')
    const [tagBody, setTagBody] = useState('')
    const [attributesObj, setAttributesObj] = useState({})
    const [attributeName, setAttributeName] = useState('')
    const [attributeValue, setAttributeValue] = useState('')
    const [showEmptyTag, setShowEmptyTag] = useState(false)
    
    const newElementRef = useRef()
    const radioInputRef = useRef('append')
    const selectElementRef = useRef()

    const emptyTag = () => _emptyTag(newElementRef, showEmptyTag, EMPTY_TAGS)

    const addAttribute = () => {
        const newObj = {...attributesObj, [attributeName]: attributeValue}
        setAttributesObj(newObj)
    }

    const removeAttribute = () => {
        const newObj = {...attributesObj}
        delete newObj[attributeName]
        setAttributesObj(newObj)
    }

    const TagCreator = () => {
        if (CONSTRUCTOR) {
            if (TAGS.includes(tagName) && !EMPTY_TAGS.includes(tagName)) {
                CONSTRUCTOR.querySelector('.label-wrapper:nth-child(2)').classList.remove('hide-block')
                return React.createElement(tagName, attributesObj,`${tagBody}`)
            }else if (EMPTY_TAGS.includes(tagName)) {
                CONSTRUCTOR.querySelector('.label-wrapper:nth-child(2)').classList.add('hide-block')
                return React.createElement(tagName, attributesObj)
            }else {
                return <></>
            }
        }
    }

    const ShowTag = () => {
        const attributes = Object.entries(attributesObj).map(([key, value]) => {
           return `${key}="${value}"`
        })
        if (TAGS.includes(tagName)  && !EMPTY_TAGS.includes(tagName)) {
            return <div className="show-tag">
                        {`<${tagName} ${attributes.join(' ')}>${tagBody}</${tagName}>`}
                   </div>
        }else if (EMPTY_TAGS.includes(tagName)) {
            return <div className="show-tag">
            {`<${tagName} ${attributes.join(' ')}/>`}
       </div>
        }else {
            return <></>
        }
    }

    const clearForm = () => {
        setTagName('')
        setTagBody('')
        setAttributesObj({})
        setAttributeName('')
        setAttributeValue('')
        radioInputRef.current = 'append'
    }

    const save = () => {
        fetch('http://localhost:3001', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=UTF-8'
            },
            body: document.getElementById('WORKSPACE').contentDocument.children[0].outerHTML
        });
    }

    useEffect(() => {newElementRef.current = CONSTRUCTOR.querySelector('.tools__preview-tag').lastChild;
                     emptyTag()})

    return (
        <div className="tools__add-tag add-tag">
            <ToolsBody>
                <ToolsBlock
                            attributes={{onChange:(e) => {radioInputRef.current = e.target.value}}}>
                    <LabelRadioInputs listPath={PATH_LIST} 
                                      radioInputRef={radioInputRef.current}
                                      name="add-tag"/>
                </ToolsBlock>
                <ToolsBlock>
                    <LabelInput attributes={{type:"text",
                                             value: tagName,
                                             onChange:(e) => {setTagName(e.target.value)}}}>Tag Name
                        <CheckIcon value={TAGS.includes(tagName)}/>
                    </LabelInput>
                    <LabelInput attributes={{type:"text",
                                             value: tagBody,
                                             onChange:(e) => {setTagBody(e.target.value)}}}>Tag Body
                    </LabelInput>
                        <div className="label-wrapper">
                            <Button attributes={{onClick: () => actions(selectElementRef, 
                                                                        radioInputRef, 
                                                                        newElementRef,
                                                                        emptyTag)}}>
                                Add tag
                            </Button>
                            <Button attributes={{onClick: () => clearForm()}}>
                                Clear form
                            </Button>
                        </div>
                </ToolsBlock>
                <ToolsBlock>
                    <LabelInput attributes={{type:"text",
                                             value: attributeName,
                                             onChange:(e) => {setAttributeName(e.target.value)}}}>Attribute Name
                    </LabelInput>
                    <LabelInput attributes={{type:"text",
                                             value: attributeValue,
                                             onChange:(e) => {setAttributeValue(e.target.value)}}}>Attribute Value
                    </LabelInput>
                        <div className="label-wrapper">
                            <Button attributes={{onClick:() => {addAttribute()}}}>Add Attribute
                            </Button>
                            <Button attributes={{onClick:() => {removeAttribute()}}}>Remove Attribute
                            </Button>
                        </div>
                </ToolsBlock>
                <ToolsBlock classBlock="tools__block--last">
                    <LabelCheckboxInput  attributes={{onChange:() => {setShowEmptyTag(!showEmptyTag)},
                                                      checked: showEmptyTag}}>
                        Show Empty Tags
                    </LabelCheckboxInput>
                    <Button attributes={{onClick:() => {save()}}}>SAVE
                    </Button>
                </ToolsBlock>
            </ToolsBody>
            <PreviewTag>
                <ShowTag/>
                <TagCreator/>
            </PreviewTag>
        </div>
    )
}

export {AddTag}