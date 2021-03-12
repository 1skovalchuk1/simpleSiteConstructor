import {React, useEffect} from 'react'
import {AddHTML} from './add-HTML/add-HTML';
import {EditHTML} from './edit-HTML/edit-HTML';
import {AddCSS} from './add-CSS/add-CSS';
import {EMPTY_TAGS, CONSTRUCTOR} from '../../constants/constants'
import {_emptyTag} from '../../common-functions/common-functions'

import './tools.css';

const Tools = (props) => {

    const emptyTag = () => _emptyTag(props.showElementRef, props.showEmptyTag, EMPTY_TAGS)

    const addAttribute = () => {
      const newObj = {...props.attributesObj, [props.attributeName]: props.attributeValue}
      props.setAttributesObj(newObj)
    }

    const removeAttribute = () => {
      const newObj = {...props.attributesObj}
      delete newObj[props.attributeName]
      props.setAttributesObj(newObj)
    }

    useEffect(() => {props.showElementRef.current = CONSTRUCTOR.querySelector('.tools__preview-tag').lastChild;
                     emptyTag()})

    return (
        <div className="tools">

            <AddHTML emptyTag={emptyTag}
                     addAttribute={addAttribute}
                     removeAttribute={removeAttribute}
                     
                     showEmptyTag={props.showEmptyTag}
                     setShowEmptyTag={props.setShowEmptyTag}

                     addTagName={props.tagName}
                     setAddTagName={props.setTagName}

                     addAttributesObj={props.attributesObj}
                     setAddAttributesObj={props.setAttributesObj}

                     addAttributeName={props.attributeName}
                     setAddAttributeName={props.setAttributeName}

                     addAttributeValue={props.attributeValue}
                     setAddAttributeValue={props.setAttributeValue}

                     setAddTagBody={props.setTagBody}
                     addTagBody={props.tagBody}

                     addElementRef={props.showElementRef}
                     pathRadioInputRef={props.addHTMLpathRadioInputRef}
                     selectElementRef={props.selectElementRef}/>

            <EditHTML emptyTag={emptyTag}
                      addAttribute={addAttribute}
                      removeAttribute={removeAttribute}
                      
                      showEmptyTag={props.showEmptyTag}
                      setShowEmptyTag={props.setShowEmptyTag}

                      editTagName={props.tagName}
                      setEditTagName={props.setTagName}

                      editAttributesObj={props.attributesObj}
                      setEditAttributesObj={props.setAttributesObj}

                      editAttributeName={props.attributeName}
                      setEditAttributeName={props.setAttributeName}

                      editAttributeValue={props.attributeValue}
                      setEditAttributeValue={props.setAttributeValue}

                      withChildren={props.withChildren}
                      setWithChildren={props.setWithChildren}
                      
                      actionRadioInputRef={props.actionRadioInputRef}
                      oldTagNameRef={props.oldTagNameRef}
                      tagBodyRef={props.tagBodyRef}
                      editElementRef={props.showElementRef}
                      pathRadioInputRef={props.editHTMLpathRadioInputRef}
                      selectElementRef={props.selectElementRef}/>
            <AddCSS/>
        </div>
    )
}

export {Tools}