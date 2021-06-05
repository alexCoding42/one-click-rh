import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import HomePage from './pages/HomePage';
import MyAppointmentsPage from './pages/MyAppointmentsPage';
import ProfilePage from './pages/ProfilePage';
import NavBar from './components/NavBar';
import { theme } from './styles/theme';

export const App: FC = () => (
  <ChakraProvider theme={theme}>
    <NavBar />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/my-appointments" component={MyAppointmentsPage} />
      <Route exact path="/profile" component={ProfilePage} />
    </Switch>
  </ChakraProvider>
);
