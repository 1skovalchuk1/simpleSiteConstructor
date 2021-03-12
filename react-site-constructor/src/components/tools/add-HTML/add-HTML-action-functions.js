import {CONSTRUCTOR} from '../../../constants/constants'
import {_focus, _selectElement, _joinTagAction, _clearAddTag} from '../../../common-functions/common-action-functions'
import {addEventsListener} from '../../../common-functions/common-functions'

const _addTag = (CONSTRUCTOR, selectElementRef, pathRadioInputRef, addElementRef, emptyTag, 
                 addEventsListener, _focus, _selectElement, _joinTagAction, _clearAddTag) => {
    const workSpaceBody = document.getElementById('WORKSPACE').contentDocument.body
    const addFocus = (e) => _focus(e, workSpaceBody, 'add')
    const removeFocus = (e) => _focus(e, workSpaceBody, 'remove')
    const selectElement = (e) => _selectElement(e, workSpaceBody, selectElementRef)
    const action = () => _joinTagAction(workSpaceBody, selectElementRef, pathRadioInputRef, addElementRef, emptyTag, addFocus, removeFocus)
    const clear = (e) => _clearAddTag(e, CONSTRUCTOR, workSpaceBody, selectElementRef, 
                                      addFocus, removeFocus, selectElement, action, clear)
    if (addElementRef.current) {
        if (workSpaceBody.children.length){
            CONSTRUCTOR.querySelectorAll('.tools__block').forEach((item) => {item.classList.add('hide-block')})
            addEventsListener(workSpaceBody, addFocus, removeFocus, selectElement, action, clear)
        }else {
            workSpaceBody.append(addElementRef.current.cloneNode(true))
        }
    }
}

const addTag = (props) => _addTag(CONSTRUCTOR, props.selectElementRef, props.pathRadioInputRef, props.addElementRef, 
                                  props.emptyTag, addEventsListener, _focus, _selectElement, _joinTagAction, _clearAddTag)

export {addTag}
