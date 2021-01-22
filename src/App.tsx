import * as React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import HomePage from './pages/HomePage';

export const App = () => (
  <ChakraProvider theme={theme}>
    <HomePage />
  </ChakraProvider>
);
