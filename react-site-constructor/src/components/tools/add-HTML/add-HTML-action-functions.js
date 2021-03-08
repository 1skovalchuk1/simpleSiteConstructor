
const _addTag = (CONSTRUCTOR, selectElementRef, pathRadioInputRef, newElementRef, emptyTag, 
                  addEventsListener, _focus, _selectElement, _joinTagAction, _clearAddTag) => {
    const workSpaceBody = document.getElementById('WORKSPACE').contentDocument.body
    const addFocus = (e) => _focus(e, workSpaceBody, 'add')
    const removeFocus = (e) => _focus(e, workSpaceBody, 'remove')
    const selectElement = (e) => _selectElement(e, workSpaceBody, selectElementRef)
    const action = () => _joinTagAction(selectElementRef, pathRadioInputRef, newElementRef)
    const clear = (e) => _clearAddTag(e, CONSTRUCTOR, workSpaceBody, selectElementRef, emptyTag, 
                                      addFocus, removeFocus, selectElement, action, clear)
    if (newElementRef.current) {
        if (workSpaceBody.children.length){
            CONSTRUCTOR.querySelectorAll('.tools__block').forEach((item) => {item.classList.add('hide-block')})
            addEventsListener(workSpaceBody, addFocus, removeFocus, selectElement, action, clear)
        }else {
            workSpaceBody.append(newElementRef.current.cloneNode(true))
        }
    }
}

export {_addTag}
