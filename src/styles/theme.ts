import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: () => ({
      ':root': {
        '--amplify-primary-color': '#7928ca',
        '--amplify-primary-tint': '#7928ca',
        '--amplify-primary-shade': '#7928ca',
      },
      'html, body': {
        background: '#f4f5f7',
        minHeight: '100vh',
      },
    }),
  },
});
