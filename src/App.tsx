import React, { FC, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Auth, Hub } from 'aws-amplify';
import { ChakraProvider } from '@chakra-ui/react';

import HomePage from './pages/HomePage';
import MyAppointmentsPage from './pages/MyAppointmentsPage';
import ProfilePage from './pages/ProfilePage';
import NavBar from './components/NavBar';
import { theme } from './styles/theme';
import { withAuthenticator } from '@aws-amplify/ui-react';

const App: FC = () => {
  const [signedInUser, setSignedInUser] = useState<boolean>(false);

  useEffect(() => {
    authListener();
  }, []);

  const authListener = async () => {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          return setSignedInUser(true);
        case 'signOut':
          return setSignedInUser(false);
      }
    });
    try {
      await Auth.currentAuthenticatedUser();
      setSignedInUser(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ChakraProvider theme={theme}>
      <NavBar />
      <Switch>
        {signedInUser && (
          <>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/my-appointments" component={MyAppointmentsPage} />
            <Route exact path="/profile" component={ProfilePage} />
          </>
        )}
      </Switch>
    </ChakraProvider>
  );
};

export default withAuthenticator(App);
