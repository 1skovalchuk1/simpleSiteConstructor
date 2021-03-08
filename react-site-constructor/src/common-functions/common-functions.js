
const addEventsListener = (workSpaceBody, addFocus, removeFocus, selectElement, action, clear) => {
    workSpaceBody.addEventListener('mouseover', addFocus)
    workSpaceBody.addEventListener('mouseout', removeFocus)
    workSpaceBody.addEventListener('dblclick', selectElement)
    workSpaceBody.addEventListener('click', action)
    workSpaceBody.addEventListener('contextmenu', clear)
}

const removeEventsListener = (workSpaceBody, addFocus, removeFocus, selectElement, action, clear) => {
    workSpaceBody.removeEventListener('mouseover', addFocus)
    workSpaceBody.removeEventListener('mouseout', removeFocus)
    workSpaceBody.removeEventListener('dblclick', selectElement)
    workSpaceBody.removeEventListener('click', action)
    workSpaceBody.removeEventListener('contextmenu', clear)
}

const _emptyTag = (newElementRef, showEmptyTag, EMPTY_TAGS) => {
    const workSpaceBody = document.getElementById('WORKSPACE').contentDocument.body
    console.log()
    const previewTag = newElementRef.current
    if (showEmptyTag) {
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

export {_emptyTag, addEventsListener, removeEventsListener}