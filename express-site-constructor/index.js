const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require("fs");
const {CSS_OBJECT} = require("./CSSobj");

const app = express()

app.use(cors())
app.use(bodyParser.text())
app.use(bodyParser.json())
const port = 3001

const pathGlobalObj = '/home/user/Desktop/js_projects/site-constructor/express-site-constructor/CSSobj.js'

const pathNewDirHTML = '/home/user/Desktop/js_projects/site-constructor/my-app/myApp.html'
const pathNewDirCSS = '/home/user/Desktop/js_projects/site-constructor/my-app/myApp.css'

const workSpaceHTML = '/home/user/Desktop/js_projects/site-constructor/react-site-constructor/public/work-space.html'
const workSpaceCSS = '/home/user/Desktop/js_projects/site-constructor/react-site-constructor/public/work-space-mutable.css'

const writeDocument = (text, path) => {
  fs.writeFileSync(path, text);
}

const appendDocument = (text, path) => {
  fs.appendFileSync(path, text);
}

const createHTMLdocument = (text, path) => {
    writeDocument(text, path)
}

const transformNewGlobalObjtoString = (obj) => {

  const transformNewGlobalObjValuestoString = (objValue) => {
    const ObjValueToString = Object.entries(objValue).map(([key, value]) => {
      return `\t\t"${key}": "${value}",\n`
    })
    return ObjValueToString.join('')
  }

  const ObjToString = Object.entries(obj).map(([key, value]) => {
    return `\t"${key}": {
  ${transformNewGlobalObjValuestoString(value)}\t},\n`

  })
  return ObjToString.join('\n')
}

const writeNewGlobalObj = (newGlobalObj) => {
    writeDocument('', pathGlobalObj)
    appendDocument('const CSS_OBJECT = {\n\n', pathGlobalObj)
    appendDocument(transformNewGlobalObjtoString(newGlobalObj), pathGlobalObj)
    appendDocument('}\n\n', pathGlobalObj)
    appendDocument('module.exports.CSS_OBJECT = CSS_OBJECT;', pathGlobalObj)
}

const addItemToGlobalObj = (postObj, oldGlobalObj) => {
  const globalObjvalues = Object.keys(oldGlobalObj)
  const postObjvalue = Object.keys(postObj)[0]

  if (globalObjvalues.includes(postObjvalue)) {

    Object.assign(oldGlobalObj[postObjvalue], postObj[postObjvalue])
    const newGlobalObj = oldGlobalObj
    writeNewGlobalObj(newGlobalObj)

  }else {

    const newGlobalObj = Object.assign(oldGlobalObj, postObj)
    writeNewGlobalObj(newGlobalObj)

  }
}

const removeItemToGlobalObj = (postObj, oldGlobalObj) => {
  const postObjValue = Object.values(postObj)[0]
  const postObjKey = Object.keys(postObj)[0]
  if (postObjValue !== '') {
    delete oldGlobalObj[postObjKey][postObjValue]
    console.log('1')
    console.log(postObjKey)
    const newGlobalObj = oldGlobalObj
    writeNewGlobalObj(newGlobalObj)
  }else {
    const postObjKey = Object.keys(postObj)[0]
    delete oldGlobalObj[postObjKey]
    console.log(postObjKey)
    console.log('2')
    const newGlobalObj = oldGlobalObj
    writeNewGlobalObj(newGlobalObj)
  }


}

const transformNewCSSToString = (obj) => {

  const transformNewCSSvaluesToString = (objValue) => {
    const CSSvalueToString = Object.entries(objValue).map(([key, value]) => {
      return `\t${key}: ${value};\n`
    })
    return CSSvalueToString.join('')
  }

  const CSStoString = Object.entries(obj).map(([key, value]) => {
    return `${key} {
  ${transformNewCSSvaluesToString(value)}}\n`})
  return CSStoString.join('\n')
}

const writeNewCSSfile = () => {

    writeDocument('', pathNewDirCSS)
    writeDocument('', workSpaceCSS)
    appendDocument(transformNewCSSToString(CSS_OBJECT), pathNewDirCSS)
    appendDocument(transformNewCSSToString(CSS_OBJECT), workSpaceCSS)

}



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/html', function (req, res) {
  res.send();
  createHTMLdocument(req.body, pathNewDirHTML)
  createHTMLdocument(req.body, workSpaceHTML)
});

app.post('/addcss', function (req, res) {
  res.send();
  addItemToGlobalObj(req.body, CSS_OBJECT)
  writeNewCSSfile()

});

app.post('/removecss', function (req, res) {
  res.send();
  removeItemToGlobalObj(req.body, CSS_OBJECT)
  writeNewCSSfile()
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})