import * as React from 'react';
import '../HtmlStyles/App.css';
import { Keyboardio } from './Keyboardio';

export class App extends React.Component<{}, {}>
{
  render()
  {
    return <Keyboardio />;
  }
}
