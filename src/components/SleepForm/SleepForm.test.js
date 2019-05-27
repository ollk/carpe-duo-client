import React from 'react';
import ReactDOM from 'react-dom';
import SleepForm from './SleepForm';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <SleepForm />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});