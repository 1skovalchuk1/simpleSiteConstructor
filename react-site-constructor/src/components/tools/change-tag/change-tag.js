import {useRef, useState} from 'react'
import {ToolsBody} from '../__body/tools__body'
import {ToolsBlock} from '../__block/tools__block'
import {LabelRadioInputs, Button, LabelCheckboxInput} from '../__block-items/tools__block-items'
import {PATH_LIST, ACTIONS_LIST} from '../../../constants/constants'
import {_focus, _selectElement, _changeTagActions} from '../../../functions/functions'

import './change-tag.css';

const actions = (workSpaceBody, selectElementRef, actionRadioInputRef, withChildren, pathRadioInputRef) => {
    const addFocus = (e) => _focus(e, workSpaceBody, 'add')
    const removeFocus = (e) => _focus(e, workSpaceBody, 'remove')
    const selectElement = (e) => _selectElement(e, workSpaceBody, selectElementRef)
    const changeTagActions = (e) => _changeTagActions(e, actionRadioInputRef, withChildren, selectElementRef, pathRadioInputRef)

    if(workSpaceBody) {
        workSpaceBody.addEventListener('mouseover', addFocus)
        workSpaceBody.addEventListener('mouseout', removeFocus)
        workSpaceBody.addEventListener('dblclick', selectElement)
        workSpaceBody.addEventListener('click', changeTagActions)
    }

}

const ChangeTag = () => {

    const workSpaceBody = document.getElementById('WORKSPACE').contentDocument.body

    const [withChildren, setWithChildren] = useState(true)

    const pathRadioInputRef = useRef('append')
    const actionRadioInputRef = useRef('copy')
    const selectElementRef = useRef()

    return (
        <div className="tools__change-tag change-tag">
            <ToolsBody>
                <ToolsBlock attributes={{onChange:(e) => {pathRadioInputRef.current = e.target.value}}}>
                    <LabelRadioInputs listPath={PATH_LIST} 
                                      radioInputRef={pathRadioInputRef.current}
                                      name="change-tag-path"/>
                </ToolsBlock>
                <ToolsBlock>
                    <div onChange = {(e)=>{actionRadioInputRef.current = e.target.value}}>   
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
                    <Button attributes={{onClick:() => {actions(workSpaceBody, 
                                                                selectElementRef, 
                                                                actionRadioInputRef, 
                                                                withChildren, 
                                                                pathRadioInputRef)}}}>
                        Select Element
                    </Button>
                </ToolsBlock>
            </ToolsBody>
        </div>
    )
}

export {ChangeTag}