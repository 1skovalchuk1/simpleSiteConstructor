const clearForm = (props) => {
    props.setAddTagName('')
    props.setAddTagBody('')
    props.setAddAttributesObj({})
    props.setAddAttributeName('')
    props.setAddAttributeValue('')
    props.pathRadioInputRef.current = 'append'
}

const saveHTML = () => {
    fetch('http://localhost:3001/html', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain;charset=UTF-8'
        },
        body: document.getElementById('WORKSPACE').contentDocument.children[0].outerHTML
    });
}

export {clearForm, saveHTML}