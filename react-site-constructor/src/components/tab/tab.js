import React from 'react'

import {TabButton} from './__button/tab__button'
import {CONSTRUCTOR} from '../../constants/constants';
import './tab.css';

const Tab = () => {

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

    return (
        <div className="tab">
            <TabButton value="Add Tag" 
                       attributes={{'data-bind': "add-tag",
                                    onClick: (e) => {ShowBlock(e)}}}/>
            <TabButton value="Change Tag" 
                       attributes={{'data-bind': "change-tag",
                                    onClick: (e) => {ShowBlock(e)}}}/>
        </div>
    )
}

export {Tab}