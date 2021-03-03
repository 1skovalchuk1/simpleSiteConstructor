const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require("fs");

const app = express()

app.use(cors())
app.use(bodyParser.text())
const port = 3001

const pathNewDir = '/home/user/Desktop/js_projects/site-constructor/my-app/myApp.html'
const workSpace = '/home/user/Desktop/js_projects/site-constructor/react-site-constructor/public/work-space.html'

const createDocument = (text, path) => {
    fs.writeFileSync(path, text);
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', function (req, res) {
    res.send('112');
    createDocument(req.body, pathNewDir)
    createDocument(req.body, workSpace)
    console.log(req.body)
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})