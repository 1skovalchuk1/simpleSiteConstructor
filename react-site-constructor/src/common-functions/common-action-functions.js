import {removeEventsListener} from './common-functions';

// **************************************focus*****************************************

const _focus = (e, workSpaceBody, action) => {
    if (e.target !== workSpaceBody){
        e.target.classList[action]('focus')
        console.log('focus')
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

const _joinTagAction = (workSpaceBody, selectElementRef, pathRadioInputRef, newElementRef, 
                        emptyTag, addFocus, removeFocus) => {
    if(selectElementRef.current){
        console.log('action')
        selectElementRef.current[pathRadioInputRef.current](newElementRef.current.cloneNode(true))
        workSpaceBody.removeEventListener('mouseover', addFocus)
        workSpaceBody.removeEventListener('mouseout', removeFocus)
        emptyTag()
    }
}

const _moveTagAction = (e, workSpaceBody, actionRadioInputRef, withChildren, selectElementRef, 
                        pathRadioInputRef, emptyTag, clear) => {
    if(selectElementRef.current && e.target !== workSpaceBody){
        const pathElem = e.target
        console.log('action')
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
                    clear(e)
                    emptyTag()
                }else {
                    const removeElem = selectElementRef.current
                    Object.values(removeElem.children).forEach((item) => {removeElem.after(item)})
                    removeElem.remove()
                    clear(e)
                    emptyTag()
                }
                break;
            case 'cut':
                if (withChildren){
                    const cutElem = selectElementRef.current.cloneNode(true)
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

const _editTagAction = (workSpaceBody, oldTagNameRef, selectElementRef, setAttributesObj, setEditTagName, tagBodyRef,
                        addFocus, removeFocus) => {
    if(selectElementRef.current){
        console.log('action')
        selectElementRef.current.classList.remove('focus')
        selectElementRef.current.classList.remove('show-empty-tag')
        if (selectElementRef.current.getAttribute('class') === ''){selectElementRef.current.removeAttribute('class')}
        oldTagNameRef.current = selectElementRef.current.tagName.toLowerCase()
        const newAttrList = Object.values(selectElementRef.current.attributes).map((value) => {
            return [value.nodeName, value.nodeValue]
        })
        const newAttrObj = Object.fromEntries(newAttrList)
        tagBodyRef.current = selectElementRef.current.innerHTML
        setAttributesObj(newAttrObj)
        setEditTagName(oldTagNameRef.current)
        selectElementRef.current.classList.add('focus')
        workSpaceBody.removeEventListener('mouseover', addFocus)
        workSpaceBody.removeEventListener('mouseout', removeFocus)
    }
}

const _editTextNodeAction = (e, selectElementRef, workSpaceBody, addFocus, removeFocus) => {
    if (e.target !== workSpaceBody && !selectElementRef.current){
        console.log('select')
        selectElementRef.current = e.target
        workSpaceBody.removeEventListener('mouseover', addFocus)
        workSpaceBody.removeEventListener('mouseout', removeFocus)
    }
    console.log('action')
    selectElementRef.current.setAttribute('contenteditable', 'true')
}

// **************************************clear*****************************************

const _clearTextNode = (e, workSpaceBody, addFocus, removeFocus, textNodeAction,
                        clear, selectElementRef, emptyTag) => {
    e.preventDefault()
    console.log('clear')
    if (selectElementRef.current) {selectElementRef.current.removeAttribute('contenteditable')}
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

const _clearAddTag = (e, CONSTRUCTOR, workSpaceBody, selectElementRef,
                      addFocus, removeFocus, selectElement, action, clear) => {
    e.preventDefault()
    console.log('clear')
    removeEventsListener(workSpaceBody, addFocus, removeFocus, selectElement, action, clear)
    workSpaceBody.querySelectorAll('.focus').forEach((item) => {item.classList.remove('focus')})
    workSpaceBody.querySelectorAll('[class=""]').forEach((item) => {item.removeAttribute('class')})
    selectElementRef.current = undefined
    CONSTRUCTOR.querySelectorAll('.tools__block').forEach((item) => {item.classList.remove('hide-block')})
}

export {_focus, _selectElement, _joinTagAction, _clearAddTag, _editTextNodeAction, _clearTextNode,
        _moveTagAction, _clearMoveTag, _editTagAction, _clearEditTag}