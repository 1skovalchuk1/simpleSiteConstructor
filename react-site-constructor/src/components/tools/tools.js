import {React} from 'react'
import {AddTag} from './add-tag/add-tag';
import {ChangeTag} from './change-tag/change-tag';

import './tools.css';

const Tools = () => {


    return (
        <div className="tools">
            <AddTag/>
            <ChangeTag/>
        </div>
    )
}

export {Tools}