import React from 'react'

import {TabButton} from './__button/tab__button'
import {CONSTRUCTOR} from '../../constants/constants';
import './tab.css';

const Tab = (props) => {

    const ShowBlock = (e) => {
        let tabActiveElem = e.target
        const tabElem = CONSTRUCTOR.querySelector('.tab__button--active');
        const blockActiveElem = CONSTRUCTOR.querySelector(`.${tabActiveElem.dataset.bind}`);
        const blockElem = CONSTRUCTOR.querySelector(`.active`);
        if (tabElem) {  
            tabActiveElem.classList.add('tab__button--active')
            blockActiveElem.classList.add('active')
            tabElem.classList.remove('tab__button--active')
            blockElem.classList.remove('active')
        }else {
            blockActiveElem.classList.add('active')
            tabActiveElem.classList.add('tab__button--active')
        }

    }

    const clearForm = () => {
        props.setTagName('')
        props.setAttributesObj({})
        props.setAttributeName('')
        props.setAttributeValue('')
        props.pathRadioInputRef.current = 'append'
    }

    return (
        <div className="tab">
            <TabButton value="Add HTML" 
                       attributes={{'data-bind': "add-HTML",
                                    onClick: (e) => {ShowBlock(e); clearForm()}}}/>
            <TabButton value="Edit HTML" 
                       attributes={{'data-bind': "edit-HTML",
                                    onClick: (e) => {ShowBlock(e); clearForm()}}}/>
            <TabButton value="Add CSS" 
                        attributes={{'data-bind': "add-CSS",
                                    onClick: (e) => {ShowBlock(e)}}}/>
        </div>
    )
}

export {Tab}