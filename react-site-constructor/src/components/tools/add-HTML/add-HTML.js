import React, {useState, useRef, useEffect} from 'react'
import {ToolsBody} from '../__body/tools__body'
import {ToolsBlock} from '../__block/tools__block'
import {PreviewTag} from '../__preview-tag/tools__preview-tag'
import {LabelInput, LabelCheckboxInput, ShowTag, Button, CheckIcon, LabelRadioInputs} from '../__block-items/tools__block-items';
import {CONSTRUCTOR, TAGS, EMPTY_TAGS, PATH_LIST} from '../../../constants/constants'
import {_focus, _selectElement, _joinTagAction, _clearAddTag} from '../../../common-functions/common-action-functions'
import {_emptyTag, addEventsListener} from '../../../common-functions/common-functions'
import {_addTag} from './add-HTML-action-functions'

import './add-HTML.css';

const AddHTML = () => {

    const [tagName, setTagName] = useState('')
    const [tagBody, setTagBody] = useState('')
    const [attributesObj, setAttributesObj] = useState({})
    const [attributeName, setAttributeName] = useState('')
    const [attributeValue, setAttributeValue] = useState('')
    const [showEmptyTag, setShowEmptyTag] = useState(false)
    
    const newElementRef = useRef()
    const pathRadioInputRef = useRef('append')
    const selectElementRef = useRef()

    const emptyTag = () => _emptyTag(newElementRef, showEmptyTag, EMPTY_TAGS)

    const addTag = () => _addTag(CONSTRUCTOR, selectElementRef, pathRadioInputRef, newElementRef, emptyTag, 
                                   addEventsListener, _focus, _selectElement, _joinTagAction, _clearAddTag)

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

    const clearForm = () => {
        setTagName('')
        setTagBody('')
        setAttributesObj({})
        setAttributeName('')
        setAttributeValue('')
        pathRadioInputRef.current = 'append'
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

    useEffect(() => {newElementRef.current = CONSTRUCTOR.querySelector('.tools__preview-tag').lastChild;
                     emptyTag()})

    return (
        <div className="tools__add-HTML add-HTML">
            <ToolsBody>
                <ToolsBlock attributes={{onChange:(e) => {pathRadioInputRef.current = e.target.value}}}>
                    <LabelRadioInputs listPath={PATH_LIST} 
                                      radioInputRef={pathRadioInputRef.current}
                                      name="add-HTML"/>
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
                    <div className="label-wrapper">
                        <Button attributes={{onClick:() => {save()}}}>
                            Save Project
                        </Button>
                    </div>
                </ToolsBlock>
            </ToolsBody>
            <PreviewTag>
                <ShowTag atributesObj={attributesObj}
                         tagName={tagName}
                         tagBody={tagBody}
                         TAGS={TAGS}
                         EMPTY_TAGS={EMPTY_TAGS}/>
                <TagCreator/>
            </PreviewTag>
        </div>
    )
}

export {AddHTML}