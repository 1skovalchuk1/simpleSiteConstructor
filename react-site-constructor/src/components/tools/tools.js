import {React} from 'react'
import {AddHTML} from './add-HTML/add-HTML';
import {EditHTML} from './edit-HTML/edit-HTML';
import {AddCSS} from './add-CSS/add-CSS';

import './tools.css';

const Tools = () => {

    return (
        <div className="tools">
            <AddHTML/>
            <EditHTML/>
            <AddCSS/>
        </div>
    )
}

export {Tools}