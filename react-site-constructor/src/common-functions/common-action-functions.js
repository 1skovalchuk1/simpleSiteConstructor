import {removeEventsListener} from './common-functions';


// **************************************focus*****************************************

const _focus = (e, workSpaceBody, action) => {
    if (e.target !== workSpaceBody){
        e.target.classList[action]('focus')
    }
}

// **************************************selectElement*****************************************

const _selectElement = (e, workSpaceBody, selectElementRef) => {
    if (e.target !== workSpaceBody && !selectElementRef.current){
        console.log('select')
        selectElementRef.current = e.target
    }
}

// **************************************actions*****************************************

const _joinTagAction = (selectElementRef, pathRadioInputRef, newElementRef) => {
    console.log(selectElementRef.current)
    if(selectElementRef.current){
        console.log('join')
        console.log(selectElementRef.current)
        selectElementRef.current[pathRadioInputRef.current](newElementRef.current.cloneNode(true))
    }
}

const _moveTagAction = (e, actionRadioInputRef, withChildren, selectElementRef, 
                           pathRadioInputRef, emptyTag) => {
    if(selectElementRef.current){
        const pathElem = e.target
        switch(actionRadioInputRef.current){
            case 'copy':
                if (withChildren){
                    const cloneElem = selectElementRef.current.cloneNode(true)
                    pathElem[pathRadioInputRef.current](cloneElem)
                }else {
                    const cloneElem = selectElementRef.current.cloneNode(false)
                    pathElem[pathRadioInputRef.current](cloneElem)
                    emptyTag()
                }
                break;
            case 'remove':
                if (withChildren){
                    selectElementRef.current.remove()
                    emptyTag()
                }else {
                    const removeElem = selectElementRef.current
                    Object.values(removeElem.children).forEach((item) => {removeElem.after(item)})
                    removeElem.remove()
                    emptyTag()
                }
                break;
            case 'cut':
                if (withChildren){
                    const cutElem = selectElementRef.current.cloneNode(true)
                    console.log(cutElem, pathElem)
                    pathElem[pathRadioInputRef.current](cutElem)
                    selectElementRef.current.remove()
                    emptyTag()
                }else {
                    const cutElem = selectElementRef.current.cloneNode(false)
                    pathElem[pathRadioInputRef.current](cutElem)
                    Object.values(selectElementRef.current.children)
                          .forEach((item) => {selectElementRef.current.after(item)})
                    selectElementRef.current.remove()
                    emptyTag()
                }
                break;
            default:
                console.log('oops')
        }
    }
}

const _editTagAction = (oldTagNameRef, selectElementRef, setAttributesObj, setEditTagName, tagBodyRef) => {
    if(selectElementRef.current){
        oldTagNameRef.current = selectElementRef.current.tagName.toLowerCase()
        const newAttrList = Object.values(selectElementRef.current.attributes).map((value) => {
            return [value.nodeName, value.nodeValue]
        })
        const newAttrObj = Object.fromEntries(newAttrList)
        tagBodyRef.current = selectElementRef.current.innerHTML
        setAttributesObj(newAttrObj)
        setEditTagName(oldTagNameRef.current)

    }
}

const _editTextNodeAction = (e, selectElementRef, workSpaceBody) => {
    if (e.target !== workSpaceBody && !selectElementRef.current){
        console.log('select')
        selectElementRef.current = e.target
    }
    selectElementRef.current.setAttribute('contenteditable', 'true')
}

// **************************************clear*****************************************

const _clearTextNode = (e, workSpaceBody, addFocus, removeFocus, textNodeAction,
                        clear, selectElementRef, emptyTag) => {
    e.preventDefault()
    console.log('clear')
    console.log(selectElementRef.current)
    selectElementRef.current.removeAttribute('contenteditable')
    workSpaceBody.removeEventListener('mouseover', addFocus)
    workSpaceBody.removeEventListener('mouseout', removeFocus)
    workSpaceBody.removeEventListener('click', textNodeAction)
    workSpaceBody.removeEventListener('contextmenu', clear)
    workSpaceBody.querySelectorAll('.focus').forEach((item) => {item.classList.remove('focus')})
    workSpaceBody.querySelectorAll('[class=""]').forEach((item) => {item.removeAttribute('class')})
    selectElementRef.current = undefined
    emptyTag()
}

const _clearMoveTag = (e, workSpaceBody, addFocus, removeFocus, selectElement, 
                       action, clear, selectElementRef, emptyTag) => {
    e.preventDefault()
    console.log('clear')
    removeEventsListener(workSpaceBody, addFocus, removeFocus, selectElement, action, clear)
    workSpaceBody.querySelectorAll('.focus').forEach((item) => {item.classList.remove('focus')})
    workSpaceBody.querySelectorAll('[class=""]').forEach((item) => {item.removeAttribute('class')})
    selectElementRef.current = undefined
    emptyTag()
}

const _clearEditTag = (e, workSpaceBody, CONSTRUCTOR, addFocus, removeFocus, selectElement, 
                       action, clear, selectElementRef, emptyTag, setEditTagName,
                       setAttributesObj, setEditAttributeName, setEditAttributeValue, tagBodyRef,
                       oldTagNameRef, editElementRef) => {
    const saveEditTag = (selectElementRef, CONSTRUCTOR) => {
        if(selectElementRef.current){
            const newTag = CONSTRUCTOR.querySelector('.tag-editor').firstChild
            selectElementRef.current.after(newTag)
            selectElementRef.current.remove()
        }
    }
    e.preventDefault()
    console.log('clear')
    CONSTRUCTOR.querySelector('.edit-HTML .tools__block:nth-child(4)').classList.add('hide-block')
    saveEditTag(selectElementRef, CONSTRUCTOR)
    removeEventsListener(workSpaceBody, addFocus, removeFocus, selectElement, action, clear)
    workSpaceBody.querySelectorAll('.focus').forEach((item) => {item.classList.remove('focus')})
    workSpaceBody.querySelectorAll('[class=""]').forEach((item) => {item.removeAttribute('class')})
    selectElementRef.current = undefined
    setEditTagName('')
    setAttributesObj('')
    setEditAttributeName('')
    setEditAttributeValue('')
    editElementRef.current = undefined
    oldTagNameRef.current = undefined
    tagBodyRef.current = undefined
    emptyTag()
}

const _clearAddTag = (e, CONSTRUCTOR, workSpaceBody, selectElementRef, emptyTag, 
                      addFocus, removeFocus, selectElement, action, clear) => {
    e.preventDefault()
    console.log('clear')
    removeEventsListener(workSpaceBody, addFocus, removeFocus, selectElement, action, clear)
    workSpaceBody.querySelectorAll('.focus').forEach((item) => {item.classList.remove('focus')})
    workSpaceBody.querySelectorAll('[class=""]').forEach((item) => {item.removeAttribute('class')})
    selectElementRef.current = undefined
    emptyTag()
    CONSTRUCTOR.querySelectorAll('.tools__block').forEach((item) => {item.classList.remove('hide-block')})
}

export {_focus, _selectElement, _joinTagAction, _clearAddTag, _editTextNodeAction, _clearTextNode,
        _moveTagAction, _clearMoveTag, _editTagAction, _clearEditTag}