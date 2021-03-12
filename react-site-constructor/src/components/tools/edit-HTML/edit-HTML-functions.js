import {EMPTY_TAGS, CONSTRUCTOR, TAGS} from '../../../constants/constants'

const getTag = (props) => {
    const attributes = Object.entries(props.editAttributesObj).map(([key, value]) => {
       return `${key}="${value}"`
    })
    if (TAGS.includes(props.editTagName)  && !EMPTY_TAGS.includes(props.editTagName)) {
        return {
            __html: `<${props.editTagName} ${attributes.join(' ')}>${props.tagBodyRef.current}</${props.editTagName}>`};
               
    }else if (EMPTY_TAGS.includes(props.editTagName)) {
        return {__html: `<${props.editTagName} ${attributes.join(' ')}/>`};
    }else {
        return {__html: ''};
    }
}

const hideBlock = (props, querySelector) => {
    if (props.actionRadioInputRef.current === 'remove') {
        CONSTRUCTOR.querySelector(querySelector).classList.add('hide-block')
    }else {CONSTRUCTOR.querySelector(querySelector).classList.remove('hide-block')}
}

export {getTag, hideBlock}