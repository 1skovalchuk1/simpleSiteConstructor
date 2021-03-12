import React from 'react'
import {ToolsBlock} from '../__block/tools__block'
import {PreviewTag} from '../__preview-tag/tools__preview-tag'
import {ShowTag} from '../__block-items/tools__block-items';
import {LabelInput, LabelCheckboxInput, Button, CheckIcon, LabelRadioInputs} from '../__block-items/tools__block-items';
import {CONSTRUCTOR, TAGS, EMPTY_TAGS, PATH_LIST} from '../../../constants/constants'
import {clearForm, saveHTML} from './add-HTML-functions'
import {addTag} from './add-HTML-action-functions'

const TagCreator = (props) => {
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

const ToolsFirstBlock = (props) => {
    return (
        <ToolsBlock attributes={{onChange:(e) => {props.pathRadioInputRef.current = e.target.value}}}>
            <LabelRadioInputs listPath={PATH_LIST}
                              radioInputRef={props.pathRadioInputRef.current}
                              name="add-HTML"/>
        </ToolsBlock>
    )
}

const ToolsSecondBlock = (props) => {
    return (
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
                <Button attributes={{onClick: () => addTag(props.addTag)}}>
                    Add tag
                </Button>
                <Button attributes={{onClick: () => clearForm(props.clearForm)}}>
                    Clear form
                </Button>
            </div>
        </ToolsBlock>
    )
}

const ToolsThirdBlock = (props) => {
    return (
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
    )

}

const ToolsFourthBlock = (props) => {
    return (
        <ToolsBlock classBlock="tools__block--last">
        <LabelCheckboxInput  attributes={{onChange:() => {props.setShowEmptyTag(!props.showEmptyTag)},
                                          checked: props.showEmptyTag}}>
            Show Empty Tags
        </LabelCheckboxInput>
        <div className="label-wrapper">
            <Button attributes={{onClick:() => {saveHTML()}}}>
                Save Project
            </Button>
        </div>
        </ToolsBlock>
    )
}

const AddHTMLpreviewTag = (props) => {
    return (
        <PreviewTag>
        <ShowTag attributesObj={props.addAttributesObj}
                 tagName={props.addTagName}
                 tagBody={props.addTagBody}
                 TAGS={TAGS}
                 EMPTY_TAGS={EMPTY_TAGS}/>

        <TagCreator addTagName={props.addTagName}
                    addAttributesObj={props.addAttributesObj}
                    addTagBody={props.addTagBody}/>
        </PreviewTag>

    )
}



export {TagCreator, ToolsFirstBlock, ToolsSecondBlock, ToolsThirdBlock, ToolsFourthBlock, AddHTMLpreviewTag}