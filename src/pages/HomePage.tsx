import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { DataStore } from '@aws-amplify/datastore';
import { AlertStatus, Box, Center, Container, Flex, Text, useToast } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import CustomForm from '../components/CustomForm';
import calendarBooking from '../assets/calendarBooking.json';
import { themesAndSubthemes } from '../data';
import { Appointment } from '../models';
import { IAppointment } from '../types';
import { APPOINTMENT_CREATE_ERROR, APPOINTMENT_CREATE_SUCCESS, APPOINTMENT_TITLE } from '../constants';

const HomePage: FC = () => {
  const toast = useToast();
  const history = useHistory();

  const [themes, setThemes] = useState<string[]>([]);
  const [subThemes, setSubThemes] = useState<any[]>([]);
  const [theme, setTheme] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (themesAndSubthemes) {
      const themesData = Object.entries(themesAndSubthemes).map((theme: any) => theme[0]);
      setThemes(themesData);
    }

    if (theme) {
      const subThemesData = Object.entries(themesAndSubthemes).filter((subTheme: any) => subTheme[0] === theme);

      if (subThemesData) {
        setSubThemes(subThemesData[0][1]);
      }
    } else {
      setSubThemes([]);
    }
  }, [theme]);

  const changeTheme = (theme: string) => {
    setTheme(theme.toUpperCase());
    return theme;
  };

  const handleSubmit = async (values: IAppointment) => {
    try {
      setIsSubmitting(true);
      const appointment = { ...values };
      const newAppointment = await DataStore.save(new Appointment(appointment));

      showToast(APPOINTMENT_TITLE, APPOINTMENT_CREATE_SUCCESS, 'success');
      setIsSubmitting(false);
      history.push('/my-appointments');
      return newAppointment;
    } catch (error) {
      showToast(APPOINTMENT_TITLE, APPOINTMENT_CREATE_ERROR, 'error');
      setIsSubmitting(false);
    }
  };

  const showToast = (title: string, description: string, status: AlertStatus) => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      position: 'top-right',
      isClosable: true,
    });
  };

  return (
    <Container maxW="6xl" my={4}>
      <Flex direction="column">
        <Box mb={8}>
          <Text
            data-testid="title"
            bgGradient="linear(to-l, #7928CA,#FF0080)"
            bgClip="text"
            fontSize={{ base: 'lg', md: '2xl' }}
            fontWeight="extrabold"
            textAlign="center"
          >
            Prenez un rendez-vous téléphonique au Click et Kiosque RH
          </Text>
          <Text
            data-testid="subtitle"
            color="gray.500"
            fontSize={{ base: 'md', md: 'lg' }}
            fontWeight="bold"
            textAlign="center"
          >
            Les experts de l'administration et de la paie vous répondent
          </Text>
          <Center>
            <Box width="800px">
              <Lottie animationData={calendarBooking} />
            </Box>
          </Center>
          <Box mt={4}>
            <Text data-testid="required-fields-message" as="i" fontSize={{ base: 'xs', md: 'lg' }}>
              Tous les champs de saisie sont obligatoires pour prendre un rendez-vous
            </Text>
          </Box>
        </Box>
        <CustomForm
          handleSubmit={handleSubmit}
          changeTheme={changeTheme}
          themes={themes}
          subThemes={subThemes}
          isSubmitting={isSubmitting}
        />
      </Flex>
    </Container>
  );
};

export default HomePage;
