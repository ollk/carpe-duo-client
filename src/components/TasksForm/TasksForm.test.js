import React from 'react';
import ReactDOM from 'react-dom';
import TasksForm from './TasksForm';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <TasksForm />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});