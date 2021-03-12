import {addEventsListener} from '../../../common-functions/common-functions'
import {_focus, _selectElement, _moveTagAction, _clearTextNode,
        _clearMoveTag, _editTagAction, _clearEditTag, 
        _editTextNodeAction} from '../../../common-functions/common-action-functions'
import {CONSTRUCTOR} from '../../../constants/constants'

// *****************************************************************************************************

const _moveTag = (selectElementRef, actionRadioInputRef, pathRadioInputRef, withChildren, emptyTag, 
                  addEventsListener, _focus, _selectElement, _moveTagAction, _clearMoveTag) => {

    const workSpaceBody = document.getElementById('WORKSPACE').contentDocument.body

    const addFocus = (e) => _focus(e, workSpaceBody, 'add')
    const removeFocus = (e) => _focus(e, workSpaceBody, 'remove')
    const selectElement = (e) => _selectElement(e, workSpaceBody, selectElementRef)
    const action = (e) => _moveTagAction(e, workSpaceBody, actionRadioInputRef, withChildren, selectElementRef, 
                                         pathRadioInputRef, emptyTag, clear)
    const clear = (e) => _clearMoveTag(e, workSpaceBody, addFocus, removeFocus, selectElement, 
                                        action, clear, selectElementRef, emptyTag)
    if(workSpaceBody) {
        addEventsListener(workSpaceBody, addFocus, removeFocus, selectElement, action, clear)
    }

}

const moveTag = (props) => _moveTag(props.selectElementRef, props.actionRadioInputRef, props.pathRadioInputRef,
                                    props.withChildren, props.emptyTag, addEventsListener, _focus, _selectElement, 
                                    _moveTagAction, _clearMoveTag)

// *****************************************************************************************************

const _editTag = (CONSTRUCTOR, selectElementRef, oldTagNameRef, tagBodyRef, editElementRef, setAttributesObj, 
                  setEditTagName, setEditAttributeName, setEditAttributeValue, emptyTag, addEventsListener,
                  _focus, _selectElement, _editTagAction, _clearEditTag) => {
    const workSpaceBody = document.getElementById('WORKSPACE').contentDocument.body

    const addFocus = (e) => _focus(e, workSpaceBody, 'add')
    const removeFocus = (e) => _focus(e, workSpaceBody, 'remove')
    const selectElement = (e) => _selectElement(e, workSpaceBody, selectElementRef)
    const action = () => _editTagAction(workSpaceBody, oldTagNameRef, selectElementRef, setAttributesObj, 
                                        setEditTagName, tagBodyRef, addFocus, removeFocus)
    const clear = (e) => _clearEditTag(e, workSpaceBody, CONSTRUCTOR, addFocus, removeFocus, selectElement, 
                                       action, clear, selectElementRef, emptyTag, setEditTagName,
                                       setAttributesObj, setEditAttributeName, setEditAttributeValue, tagBodyRef,
                                       oldTagNameRef, editElementRef)
    if(workSpaceBody) {
        addEventsListener(workSpaceBody, addFocus, removeFocus, selectElement, action, clear)
    }
}

const editTag = (props) => _editTag(CONSTRUCTOR, props.selectElementRef, props.oldTagNameRef, props.tagBodyRef,
                                    props.editElementRef, props.setEditAttributesObj, props.setEditTagName,
                                    props.setEditAttributeName, props.setEditAttributeValue, props.emptyTag, 
                                    addEventsListener, _focus, _selectElement, _editTagAction, _clearEditTag)

// *****************************************************************************************************

const _editTextNode = (selectElementRef, emptyTag, _focus, _editTextNodeAction, _clearTextNode) => {
    const workSpaceBody = document.getElementById('WORKSPACE').contentDocument.body

    const addFocus = (e) => _focus(e, workSpaceBody, 'add')
    const removeFocus = (e) => _focus(e, workSpaceBody, 'remove')
    const editTextNode = (e) => _editTextNodeAction(e, selectElementRef, workSpaceBody, addFocus, removeFocus)
    const clear = (e) => _clearTextNode(e, workSpaceBody, addFocus, removeFocus, editTextNode,
                                         clear, selectElementRef, emptyTag)
    if(workSpaceBody) {
        workSpaceBody.addEventListener('mouseover', addFocus)
        workSpaceBody.addEventListener('mouseout', removeFocus)
        workSpaceBody.addEventListener('click', editTextNode)
        workSpaceBody.addEventListener('contextmenu', clear)
    }
}

const editTextNode = (props) => _editTextNode(props.selectElementRef, props.emptyTag, _focus,
                                              _editTextNodeAction, _clearTextNode)

// *****************************************************************************************************

export {_moveTag, _editTag, _editTextNode, moveTag, editTag, editTextNode}