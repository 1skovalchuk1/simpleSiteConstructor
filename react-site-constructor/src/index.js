import React, {useRef, useState} from 'react'
import ReactDOM from 'react-dom';
import {Tab} from './components/tab/tab'
import {Tools} from './components/tools/tools'
import './index.css';

const App = () => {

  const [tagName, setTagName] = useState('')
  const [tagBody, setTagBody] = useState('')
  const [attributesObj, setAttributesObj] = useState({})
  const [attributeName, setAttributeName] = useState('')
  const [attributeValue, setAttributeValue] = useState('')
  const [showEmptyTag, setShowEmptyTag] = useState(false)
  const [withChildren, setWithChildren] = useState(true)

  const actionRadioInputRef = useRef('copy')
  const oldTagNameRef = useRef('')
  const tagBodyRef = useRef('')
  const showElementRef = useRef()
  const pathRadioInputRef = useRef('append')
  const selectElementRef = useRef()

  return (
        <>
          <Tab setTagName={setTagName}
               setAttributesObj={setAttributesObj}
               setAttributeName={setAttributeName}
               setAttributeValue={setAttributeValue}
               pathRadioInputRef={pathRadioInputRef}/>

          <Tools showEmptyTag={showEmptyTag}
                 setShowEmptyTag={setShowEmptyTag}

                 tagName={tagName}
                 setTagName={setTagName}

                 attributesObj={attributesObj}
                 setAttributesObj={setAttributesObj}

                 attributeName={attributeName}
                 setAttributeName={setAttributeName}

                 attributeValue={attributeValue}
                 setAttributeValue={setAttributeValue}

                 tagBody={tagBody}
                 setTagBody={setTagBody}

                 withChildren={withChildren}
                 setWithChildren={setWithChildren}
                
                 actionRadioInputRef={actionRadioInputRef}
                 oldTagNameRef={oldTagNameRef}
                 tagBodyRef={tagBodyRef}
                 showElementRef={showElementRef}
                 pathRadioInputRef={pathRadioInputRef}
                 selectElementRef={selectElementRef}/>
      </>
  )
}

ReactDOM.render(
    <App/>,
document.getElementById('CONSTRUCTOR'))
