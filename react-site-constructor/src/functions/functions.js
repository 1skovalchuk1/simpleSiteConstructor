const _focus = (e, workSpaceBody, action) => {
    if (e.target !== workSpaceBody){
        console.log('focus')
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
    if(selectElementRef.current){
        console.log('join')
        selectElementRef.current[radioInputRef.current](newElement.cloneNode(true))
    }
}

const _clear = (e, CONSTRUCTOR, workSpaceBody, selectElementRef, EmptyTag, addFocus, removeFocus, selectElement, joinTag, clear) => {
    e.preventDefault()
    console.log('clear')
    workSpaceBody.removeEventListener('mouseover', addFocus)
    workSpaceBody.removeEventListener('mouseout', removeFocus)
    workSpaceBody.removeEventListener('click', selectElement)
    workSpaceBody.removeEventListener('click', joinTag)
    workSpaceBody.removeEventListener('contextmenu', clear)
    workSpaceBody.querySelectorAll('.focus').forEach((item) => {item.classList.remove('focus')})
    workSpaceBody.querySelectorAll('[class=""]').forEach((item) => {item.removeAttribute('class')})
    selectElementRef.current = undefined
    EmptyTag()
    // TODO make function
    CONSTRUCTOR.querySelectorAll('.tools__block')
                   .forEach((item) => {item.classList.remove('hide-block')})
    // TODO make function
}


export {_focus, _selectElement, _joinTag, _clear}