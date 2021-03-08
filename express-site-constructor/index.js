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
const workSpaceCSS = '/home/user/Desktop/js_projects/site-constructor/react-site-constructor/public/work-space.css'

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
    const ObjValueString = Object.entries(objValue).map(([key, value]) => {
      return `\t\t${key}: "${value}",\n`
    })
    return ObjValueString.join('')
  }

  const ObjString =  Object.entries(obj).map(([key, value]) => {
    return `\t${key}: {
  ${transformNewGlobalObjValuestoString(value)}\t},\n`

  })
  return ObjString.join('\n')
}

const newGlobalObj = (postObj, oldGlobalObj) => {
  const globalObjvalues = Object.keys(oldGlobalObj)
  const postObjvalue = Object.keys(postObj)[0]

  if (globalObjvalues.includes(postObjvalue)) {

    Object.assign(oldGlobalObj[postObjvalue], postObj[postObjvalue])
    const newGlobalObj = oldGlobalObj

    writeDocument('', pathGlobalObj)
    appendDocument('const CSS_OBJECT = {\n\n', pathGlobalObj)
    appendDocument(transformNewGlobalObjtoString(newGlobalObj), pathGlobalObj)
    appendDocument('}\n\n', pathGlobalObj)
    appendDocument('module.exports.CSS_OBJECT = CSS_OBJECT;', pathGlobalObj)


  }else {

    const newGlobalObj = Object.assign(oldGlobalObj, postObj) 
    writeDocument('', pathGlobalObj)
    appendDocument('const CSS_OBJECT = {\n\n', pathGlobalObj)
    appendDocument(transformNewGlobalObjtoString(newGlobalObj), pathGlobalObj)
    appendDocument('}\n\n', pathGlobalObj)
    appendDocument('module.exports.CSS_OBJECT = CSS_OBJECT;', pathGlobalObj)

  }
}



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/html', function (req, res) {
  res.send();
  createHTMLdocument(req.body, pathNewDirHTML)
  createHTMLdocument(req.body, workSpaceHTML)
  console.log(req.body)
});

app.post('/css', function (req, res) {
  res.send();
  newGlobalObj(req.body, CSS_OBJECT)

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})