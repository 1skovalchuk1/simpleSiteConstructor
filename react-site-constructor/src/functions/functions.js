// import { CONSTRUCTOR } from "../constants/constants"

const _focus = (e, workSpaceBody, action) => {
    if (e.target !== workSpaceBody){
        e.target.classList[action]('focus')
    }
}

const _selectElement = (e, workSpaceBody, selectElementRef) => {
    if (e.target !== workSpaceBody && !selectElementRef.current){
        console.log('select')
        selectElementRef.current = e.target
    }
}

const _joinTag = (selectElementRef, radioInputRef, newElement) => {
    console.log(selectElementRef.current)
    if(selectElementRef.current){
        console.log('join')
        console.log(selectElementRef.current)
        selectElementRef.current[radioInputRef.current](newElement.cloneNode(true))
    }
}

const _moveTagActions = (e, actionRadioInputRef, withChildren, selectElementRef, 
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

const _editTagActions = (oldTagNameRef, selectElementRef, setAttributesObj, setEditTagName, tagBodyRef) => {
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

const _editTextNode = (e, selectElementRef, workSpaceBody) => {
    if (e.target !== workSpaceBody && !selectElementRef.current){
        console.log('select')
        selectElementRef.current = e.target
    }
    selectElementRef.current.setAttribute('contenteditable', 'true')
}

const _clearTextNode = (e, workSpaceBody, addFocus, removeFocus, editTextNode,
                        clear, selectElementRef, emptyTag) => {
    e.preventDefault()
    console.log('clear')
    console.log(selectElementRef.current)
    selectElementRef.current.removeAttribute('contenteditable')
    workSpaceBody.removeEventListener('mouseover', addFocus)
    workSpaceBody.removeEventListener('mouseout', removeFocus)
    workSpaceBody.removeEventListener('click', editTextNode)
    workSpaceBody.removeEventListener('contextmenu', clear)
    workSpaceBody.querySelectorAll('.focus').forEach((item) => {item.classList.remove('focus')})
    workSpaceBody.querySelectorAll('[class=""]').forEach((item) => {item.removeAttribute('class')})
    selectElementRef.current = undefined
    emptyTag()
}

const _clearMoveTag = (e, workSpaceBody, addFocus, removeFocus, selectElement, 
                       moveTagActions, clear, selectElementRef, emptyTag) => {
    e.preventDefault()
    console.log('clear')
    workSpaceBody.removeEventListener('mouseover', addFocus)
    workSpaceBody.removeEventListener('mouseout', removeFocus)
    workSpaceBody.removeEventListener('dblclick', selectElement)
    workSpaceBody.removeEventListener('click', moveTagActions)
    workSpaceBody.removeEventListener('contextmenu', clear)
    workSpaceBody.querySelectorAll('.focus').forEach((item) => {item.classList.remove('focus')})
    workSpaceBody.querySelectorAll('[class=""]').forEach((item) => {item.removeAttribute('class')})
    selectElementRef.current = undefined
    emptyTag()
}

const saveEditTag = (selectElementRef, CONSTRUCTOR) => {
    if(selectElementRef.current){
        const newTag = CONSTRUCTOR.querySelector('.tag-editor').firstChild
        selectElementRef.current.after(newTag)
        selectElementRef.current.remove()
    }
}

const _clearEditTag = (e, workSpaceBody, CONSTRUCTOR, addFocus, removeFocus, selectElement, 
                       editTagActions, clear, selectElementRef, emptyTag, setEditTagName,
                       setAttributesObj, setEditAttributeName, setEditAttributeValue, tagBodyRef,
                       oldTagNameRef, editElementRef) => {
    e.preventDefault()
    console.log('clear')
    CONSTRUCTOR.querySelector('.change-tag .tools__block:nth-child(4)').classList.add('hide-block')
    saveEditTag(selectElementRef, CONSTRUCTOR)
    workSpaceBody.removeEventListener('mouseover', addFocus)
    workSpaceBody.removeEventListener('mouseout', removeFocus)
    workSpaceBody.removeEventListener('dblclick', selectElement)
    workSpaceBody.removeEventListener('click', editTagActions)
    workSpaceBody.removeEventListener('contextmenu', clear)
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
                      addFocus, removeFocus, selectElement, joinTag, clear) => {
    e.preventDefault()
    console.log('clear')
    workSpaceBody.removeEventListener('mouseover', addFocus)
    workSpaceBody.removeEventListener('mouseout', removeFocus)
    workSpaceBody.removeEventListener('dblclick', selectElement)
    workSpaceBody.removeEventListener('click', joinTag)
    workSpaceBody.removeEventListener('contextmenu', clear)
    workSpaceBody.querySelectorAll('.focus').forEach((item) => {item.classList.remove('focus')})
    workSpaceBody.querySelectorAll('[class=""]').forEach((item) => {item.removeAttribute('class')})
    selectElementRef.current = undefined
    emptyTag()
    // TODO make function
    CONSTRUCTOR.querySelectorAll('.tools__block')
                   .forEach((item) => {item.classList.remove('hide-block')})
    // TODO make function
}

const _emptyTag = (newElementRef, showEmptyTag, EMPTY_TAGS) => {
    const workSpaceBody = document.getElementById('WORKSPACE').contentDocument.body
    const previewTag = newElementRef.current
    if (showEmptyTag && workSpaceBody) {
        workSpaceBody.querySelectorAll('*:empty')
                     .forEach((item) => {if(!EMPTY_TAGS.includes(item.tagName.toLowerCase())){
                                                item.classList.add('show-empty-tag')}})
        workSpaceBody.querySelectorAll('.show-empty-tag')
                     .forEach((item) => {if (item.childNodes.length){item.classList.remove('show-empty-tag')}})
        if(previewTag && !previewTag.childNodes.length && !EMPTY_TAGS.includes(previewTag.tagName.toLowerCase())){
            previewTag.classList.add('show-empty-tag')
        }
    }else if (workSpaceBody) {
                workSpaceBody.querySelectorAll('.show-empty-tag')
                             .forEach((item) => {item.classList.remove('show-empty-tag')});
                workSpaceBody.querySelectorAll('[class=""]').forEach((item) => {item.removeAttribute('class')})
                if (previewTag) {previewTag.classList.remove('show-empty-tag')}
    }
                
}


export {_focus, _selectElement, _joinTag, _clearAddTag, _editTextNode, _clearTextNode,
        _moveTagActions, _emptyTag, _clearMoveTag, _editTagActions, _clearEditTag}