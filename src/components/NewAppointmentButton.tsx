import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '@chakra-ui/react';

const NewAppointmentButton: FC = () => {
  const history = useHistory();

  return (
    <Button colorScheme="telegram" my={2} onClick={() => history.push('/')}>
      Prendre un nouveau rendez-vous
    </Button>
  );
};

export default NewAppointmentButton;
