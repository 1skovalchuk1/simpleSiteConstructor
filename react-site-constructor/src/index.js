import React from 'react'
import ReactDOM from 'react-dom';
import {Tab} from './components/tab/tab'
import {Tools} from './components/tools/tools'
import {WORKSPACE} from './constants/constants'
import './index.css';


WORKSPACE.onload = () => {
  ReactDOM.render(
    <></>,
    document.getElementById('WORKSPACE')
  )
}

ReactDOM.render(
  <>
    <Tab/>
    <Tools/>
  </>,
  document.getElementById('CONSTRUCTOR')
)