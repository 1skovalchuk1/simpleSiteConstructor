const _moveTag = (selectElementRef, actionRadioInputRef, pathRadioInputRef, withChildren, emptyTag, 
                  addEventsListener, _focus, _selectElement, _moveTagAction, _clearMoveTag) => {

    const workSpaceBody = document.getElementById('WORKSPACE').contentDocument.body

    const addFocus = (e) => _focus(e, workSpaceBody, 'add')
    const removeFocus = (e) => _focus(e, workSpaceBody, 'remove')
    const selectElement = (e) => _selectElement(e, workSpaceBody, selectElementRef)
    const action = (e) => _moveTagAction(e, actionRadioInputRef, withChildren, selectElementRef, 
                                            pathRadioInputRef, emptyTag)
    const clear = (e) => _clearMoveTag(e, workSpaceBody, addFocus, removeFocus, selectElement, 
                                        action, clear, selectElementRef, emptyTag)
    if(workSpaceBody) {
        addEventsListener(workSpaceBody, addFocus, removeFocus, selectElement, action, clear)
    }

}

const _editTag = (CONSTRUCTOR, selectElementRef, oldTagNameRef, tagBodyRef, editElementRef, setAttributesObj, 
                  setEditTagName, setEditAttributeName, setEditAttributeValue, emptyTag, addEventsListener,
                  _focus, _selectElement, _editTagAction, _clearEditTag) => {
    const workSpaceBody = document.getElementById('WORKSPACE').contentDocument.body

    const addFocus = (e) => _focus(e, workSpaceBody, 'add')
    const removeFocus = (e) => _focus(e, workSpaceBody, 'remove')
    const selectElement = (e) => _selectElement(e, workSpaceBody, selectElementRef)
    const action = () => _editTagAction(oldTagNameRef, selectElementRef, 
                                                  setAttributesObj, setEditTagName, tagBodyRef, CONSTRUCTOR)
    const clear = (e) => _clearEditTag(e, workSpaceBody, CONSTRUCTOR, addFocus, removeFocus, selectElement, 
                                       action, clear, selectElementRef, emptyTag, setEditTagName,
                                       setAttributesObj, setEditAttributeName, setEditAttributeValue, tagBodyRef,
                                       oldTagNameRef, editElementRef)

    if(workSpaceBody) {
        addEventsListener(workSpaceBody, addFocus, removeFocus, selectElement, action, clear)
    }

}

const _editTextNode = (selectElementRef, emptyTag, _focus, _editTextNodeAction, _clearTextNode) => {
    const workSpaceBody = document.getElementById('WORKSPACE').contentDocument.body

    const addFocus = (e) => _focus(e, workSpaceBody, 'add')
    const removeFocus = (e) => _focus(e, workSpaceBody, 'remove')
    const editTextNode = (e) => _editTextNodeAction(e, selectElementRef, workSpaceBody)
    const clear = (e) => _clearTextNode(e, workSpaceBody, addFocus, removeFocus, editTextNode,
                                         clear, selectElementRef, emptyTag)

    if(workSpaceBody) {
        workSpaceBody.addEventListener('mouseover', addFocus)
        workSpaceBody.addEventListener('mouseout', removeFocus)
        workSpaceBody.addEventListener('click', editTextNode)
        workSpaceBody.addEventListener('contextmenu', clear)
    }
}

export {_moveTag, _editTag, _editTextNode}