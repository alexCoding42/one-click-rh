import * as React from 'react';
import { FC } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import MyAppointmentsPage from './pages/MyAppointmentsPage';

export const App: FC = () => (
  <ChakraProvider theme={theme}>
    <NavBar />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/my-appointments" component={MyAppointmentsPage} />
    </Switch>
  </ChakraProvider>
);
