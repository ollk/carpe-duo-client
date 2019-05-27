import React from 'react';
import ReactDOM from 'react-dom';
import Timeline from './Timeline';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Timeline />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});