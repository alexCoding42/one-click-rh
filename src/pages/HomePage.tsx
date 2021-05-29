import { APPOINTMENT_CREATE_ERROR, APPOINTMENT_CREATE_SUCCESS, APPOINTMENT_TITLE } from '../constants';
import { DataStore } from '@aws-amplify/datastore';
import { AlertStatus, Box, Center, Container, Flex, Text, useToast } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';

import { Appointment, SubTheme, Theme } from '../models';
import { IAppointment } from '../types';
import Lottie from 'lottie-react';
import calendarBooking from '../assets/calendarBooking.json';
import { useHistory } from 'react-router';
import CreateAppointment from '../components/CreateAppointment';

const HomePage: FC = () => {
  const toast = useToast();
  const history = useHistory();

  const [themes, setThemes] = useState<Theme[]>([]);
  const [allSubThemesOfTheme, setAllSubThemesOfTheme] = useState<SubTheme[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchThemes = async () => {
      const data = await DataStore.query(Theme);
      setThemes(data);
    };
    fetchThemes();
  }, []);

  useEffect(() => {
    const fetchSubThemes = async () => {
      const subThemes = await DataStore.query(SubTheme);
      if (selectedTheme) {
        const foundTheme = themes.find(t => t.name === selectedTheme);
        const filteredSubThemes = subThemes.filter((sub) => sub.themeID === foundTheme?.id);
        setAllSubThemesOfTheme(filteredSubThemes);
      }
    };
    fetchSubThemes();
  }, [selectedTheme]);

  const changeTheme = (selectedValue: string) => {
    setSelectedTheme(selectedValue);
    return selectedValue;
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
        <CreateAppointment
          handleSubmit={handleSubmit}
          changeTheme={changeTheme}
          themes={themes}
          subThemes={allSubThemesOfTheme}
          isSubmitting={isSubmitting}
        />
      </Flex>
    </Container>
  );
};

export default HomePage;
