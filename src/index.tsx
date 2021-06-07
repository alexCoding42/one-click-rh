import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Amplify from 'aws-amplify';
import { ColorModeScript } from '@chakra-ui/react';

import awsExports from './aws-exports';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();

reportWebVitals();
