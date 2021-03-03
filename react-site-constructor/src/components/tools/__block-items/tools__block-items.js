import {React} from 'react';
import './tools__block-items.css';

const LabelInput = (props) => {
    return (
        <div className="label-wrapper">
            <label className="label-text">
                {props.children}
            </label>
            <input className="input" 
                   spellCheck="false" 
                   {...props.attributes}/>
        </div>
    )
}

const LabelRadioInput = (props) => {
    return (
        <label className="label-radio">
            {props.children}
            <input className="input" 
                   type="radio"
                {...props.attributes}/>
        </label>
    )
}

const LabelCheckboxInput = (props) => {
    return (
        <label className={`label-radio ${props.classLabel}`}>
            {props.children}
            <input className="input"
                   type="checkbox"
                {...props.attributes}/>
        </label>
    )
}

LabelCheckboxInput.defaultProps = {
    classLabel: ''
}

const Button = (props) => {
    return (
        <button className="button" {...props.attributes}>{props.children}</button>
    )
}

const CheckIcon = (props) => {
    if (props.value) {
        return <span className="check-icon-true">&#10004;</span>
    }else {
        return <span className="check-icon-false">&#10006;</span>
    }
}

const LabelRadioInputs = (props) => {
    const newList =  props.listPath.map((item) => {
        if (item === props.radioInputRef){
            return <LabelRadioInput key={item} 
                                    attributes={{name: props.name, 
                                                 value:item, 
                                                 defaultChecked:true}}>{item}</LabelRadioInput>
        }
        return <LabelRadioInput key={item} 
                                attributes={{name: props.name, 
                                             value:item}}>{item}</LabelRadioInput>
    })
    return <>{newList}</>
}

export {LabelInput, Button, CheckIcon, LabelRadioInput, LabelCheckboxInput, LabelRadioInputs}