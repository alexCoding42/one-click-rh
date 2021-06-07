import { AlertStatus, createStandaloneToast } from '@chakra-ui/react';

const useCustomToast = (title: string, description: string, status: AlertStatus) => {
  const toast = createStandaloneToast();

  toast({
    title,
    description,
    status,
    duration: 5000,
    position: 'top-right',
    isClosable: true,
  });
};

export default useCustomToast;
