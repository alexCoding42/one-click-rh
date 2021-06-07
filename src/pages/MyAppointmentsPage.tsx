import React, { FC, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { API, Auth } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import { Box, Button, Flex, Text, chakra } from '@chakra-ui/react';

import { DELETE_APPOINTMENT_ERROR, DELETE_APPOINTMENT_SUCCESS, MY_APPOINTMENTS_ERROR } from '../constants';
import { appointmentsByUsername } from '../graphql/queries';
import { deleteAppointment } from '../graphql/mutations';

import { IAppointment } from '../types';
import SkeletonCard from '../components/SkeletonCard';
import NewAppointmentButton from '../components/NewAppointmentButton';
import useCustomToast from '../hooks/useCustomToast';

const MyAppointmentsPage: FC = () => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, []);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const { username } = await Auth.currentAuthenticatedUser();
      const appointmentsData: any = await API.graphql({ query: appointmentsByUsername, variables: { username } });
      setAppointments(appointmentsData.data.appointmentsByUsername.items);
      setIsLoading(false);
    } catch (error) {
      useCustomToast('', MY_APPOINTMENTS_ERROR, 'error');
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await API.graphql({
        query: deleteAppointment,
        variables: { input: { id } },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      useCustomToast('', DELETE_APPOINTMENT_SUCCESS, 'success');
      fetchAppointments();
    } catch (error) {
      useCustomToast('', DELETE_APPOINTMENT_ERROR, 'error');
    }
  };

  if (isLoading) {
    return (
      <>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </>
    );
  }

  return appointments.length ? (
    <Flex direction="column" alignItems="center" justifyContent="center">
      <NewAppointmentButton />
      {appointments.map((appointment: IAppointment) => (
        <Flex key={appointment.id} p={50} w="full" alignItems="center" justifyContent="center">
          <Box key={appointment.id} mx="auto" px={8} py={4} borderRadius="lg" boxShadow="lg" bg="white" w="2xl">
            <Flex justifyContent="space-between" alignItems="center">
              <chakra.span fontSize="sm" color="gray.600">
                {format(new Date(appointment.date), 'PPPPp', { locale: fr })}
              </chakra.span>
              <Button
                size="sm"
                bg="red.600"
                color="white"
                fontSize="sm"
                fontWeight="700"
                borderRadius="md"
                _hover={{ bg: 'red.500' }}
                onClick={() => handleDelete(appointment.id)}
              >
                Supprimer
              </Button>
            </Flex>

            <Text fontSize="sm" as="i">{appointment.username}</Text>

            <Box mt={2}>
              <Text fontSize="2xl" color="gray.700" fontWeight="700" mb={2}>
                Thème : {appointment.theme.toLowerCase()}
              </Text>
              <Text fontSize="l" color="gray.700" fontWeight="500" mb={6}>
                Sous-thème : {appointment.subTheme.toLowerCase()}
              </Text>
              <Text fontSize="m" color="gray.700" as="i">
                Question : {appointment.description}
              </Text>
            </Box>
          </Box>
        </Flex>
      ))}
    </Flex>
  ) : (
    <Flex direction="column" alignItems="center" justifyContent="center" padding={4}>
      <NewAppointmentButton />
      <Text fontSize="xl" fontWeight="700" textAlign="center">
        Vous n'avez pas de rendez-vous pour le moment.
      </Text>
    </Flex>
  );
};

export default withAuthenticator(MyAppointmentsPage);
