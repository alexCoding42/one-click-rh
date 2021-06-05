import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { API } from 'aws-amplify';
import { v4 as uuid } from 'uuid';
import Lottie from 'lottie-react';
import { AlertStatus, Box, Center, Container, Flex, Text, useToast } from '@chakra-ui/react';
import { withAuthenticator } from '@aws-amplify/ui-react';

import {
  APPOINTMENT_CREATE_ERROR,
  APPOINTMENT_CREATE_SUCCESS,
  FETCH_DB_ERROR,
} from '../constants';
import { IAppointment } from '../types';
import calendarBooking from '../assets/calendarBooking.json';
import CreateAppointment from '../components/CreateAppointment';
import { listSubThemes, listThemes } from '../graphql/queries';
import { createAppointment } from '../graphql/mutations';
import { SubTheme, Theme } from '../API';

const HomePage: FC = () => {
  const toast = useToast();
  const history = useHistory();

  const [themes, setThemes] = useState<Theme[]>([]);
  const [allSubThemesOfTheme, setAllSubThemesOfTheme] = useState<SubTheme[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const allThemes: any = await API.graphql({ query: listThemes });
        setThemes(allThemes.data.listThemes.items);
      } catch (error) {
        showToast('', FETCH_DB_ERROR, 'error');
      }
    };
    fetchThemes();
  }, []);

  useEffect(() => {
    const fetchSubThemes = async () => {
      try {
        const subThemesData: any = await API.graphql({ query: listSubThemes });
        const subThemes = subThemesData.data.listSubThemes.items;
        if (selectedTheme) {
          const foundTheme = themes && themes.find((t: Theme) => t.name === selectedTheme);
          const filteredSubThemes = subThemes.filter((sub: SubTheme) => sub.themeID === foundTheme?.id);
          setAllSubThemesOfTheme(filteredSubThemes);
        }
      } catch (error) {
        showToast('', FETCH_DB_ERROR, 'error');
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
      const id = uuid();
      values.id = id;

      await API.graphql({
        query: createAppointment,
        variables: { input: values },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      showToast('', APPOINTMENT_CREATE_SUCCESS, 'success');
      setIsSubmitting(false);
      history.push('/my-appointments');
    } catch (error) {
      showToast('', APPOINTMENT_CREATE_ERROR, 'error');
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

export default withAuthenticator(HomePage);
