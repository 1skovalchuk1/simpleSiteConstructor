import {ToolsBlock} from '../__block/tools__block'
import {PreviewTag} from '../__preview-tag/tools__preview-tag'
import {LabelRadioInputs, Button, LabelCheckboxInput, LabelInput, ShowTag} from '../__block-items/tools__block-items'
import {PATH_LIST, ACTIONS_LIST, EMPTY_TAGS, CONSTRUCTOR, TAGS} from '../../../constants/constants'
import {getTag, hideBlock} from './edit-HTML-functions'
import {moveTag, editTag, editTextNode} from './edit-HTML-action-functions'

const TagEditor = (props) => {
    return <div className="tag-editor" dangerouslySetInnerHTML={getTag(props.getTag)}/>
}

const ToolsFirstBlock = (props) => {
    return (
        <ToolsBlock attributes={{onChange:(e) => {props.pathRadioInputRef.current = e.target.value}}}>
            <LabelRadioInputs listPath={PATH_LIST}
                              radioInputRef={props.pathRadioInputRef.current}
                              name="change-tag-path"/>
        </ToolsBlock>
    )
}

const ToolsSecondBlock = (props) => {
    return (
        <ToolsBlock>
            <div onChange = {(e)=>{props.actionRadioInputRef.current = e.target.value;
                                hideBlock(props, '.edit-HTML .tools__block')}}>   
            <LabelRadioInputs listPath={ACTIONS_LIST}
                            radioInputRef={props.actionRadioInputRef.current}
                            name="edit-HTML-action"/>
            </div>
            <LabelCheckboxInput  attributes={{onChange:() => {props.setWithChildren(!props.withChildren)},
                                checked: props.withChildren}}
                                classLabel="checkbox-with-children">
                With Children
            </LabelCheckboxInput>
        </ToolsBlock>
    )
}

const ToolsThirdBlock = (props) => {
    return (
        <ToolsBlock>
            <Button attributes={{onClick:() => {moveTag(props.moveTag)}}}>
                Move Tag
            </Button>
            <Button attributes={{onClick:() => {editTag(props.moveTag);
                                                CONSTRUCTOR.querySelector('.edit-HTML .tools__block:nth-child(4)')
                                                           .classList.remove('hide-block')}}}>
                Edit Tag
            </Button>
            <LabelCheckboxInput  attributes={{onChange:() => {props.setShowEmptyTag(!props.showEmptyTag)},
                                              checked: props.showEmptyTag}}>
                Show Empty Tags
            </LabelCheckboxInput>
        </ToolsBlock>
    )
}

const ToolsFourthBlock = (props) => {
    return (
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
    )
}

const ToolsFifthBlock = (props) => {
    return (
        <ToolsBlock>
            <Button attributes={{onClick:() => {editTextNode(props.editTextNode)}}}>
                Edit Text Node
            </Button>
        </ToolsBlock>
    )
}

const EditHTMLpreviewTag = (props) => {
    return (
        <PreviewTag>
            <ShowTag attributesObj={props.editAttributesObj}
                     tagName={props.editTagName}
                     tagBody={'...'}
                     TAGS={TAGS}
                     EMPTY_TAGS={EMPTY_TAGS}/>
            <TagEditor getTag={props.getTag}/>
        </PreviewTag>

    )
}



export {TagEditor, ToolsFirstBlock, ToolsSecondBlock, ToolsThirdBlock, ToolsFourthBlock,
        ToolsFifthBlock, EditHTMLpreviewTag}