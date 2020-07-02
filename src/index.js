import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TimePicker from './TimePicker';

const jsx = 
<div>
  <TimePicker/>
  <TimePicker label="label"/>
  <TimePicker isError/>
  <TimePicker isError errorMessage="error label"/>
  <TimePicker isDisabled/>
  
  

</div>

ReactDOM.render(jsx,document.getElementById('root'));