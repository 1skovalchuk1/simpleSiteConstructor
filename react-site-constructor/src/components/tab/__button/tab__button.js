import {React} from 'react';

import './tab__button.css';

const TabButton = (props) => {
    return (
        <div className="tab__button"
             {...props.attributes}>{props.value}</div>
    )
}

TabButton.defaultProps = {
    bindclass: ''
  };

export {TabButton}