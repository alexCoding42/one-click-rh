import * as React from 'react';

import { ChakraProvider, theme } from '@chakra-ui/react';
import { Route, Switch } from 'react-router-dom';

import { FC } from 'react';
import HomePage from './pages/HomePage';
import MyAppointmentsPage from './pages/MyAppointmentsPage';
import NavBar from './components/NavBar';

export const App: FC = () => (
  <ChakraProvider theme={theme}>
    <NavBar />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/my-appointments" component={MyAppointmentsPage} />
    </Switch>
  </ChakraProvider>
);
