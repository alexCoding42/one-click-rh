import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { format} from 'date-fns';

import { DataStore } from '@aws-amplify/datastore';
import { AlertStatus, Box, Button, Flex, Text, chakra, useToast } from '@chakra-ui/react';

import { DELETE_APPOINTMENT_ERROR, DELETE_APPOINTMENT_SUCCESS, MY_APPOINTMENT_ERROR_TITLE } from '../constants';

import { Appointment } from '../models';
import { IAppointment } from '../types';
import SkeletonCard from '../components/SkeletonCard';

const MyAppointmentsPage: FC = () => {
  const toast = useToast();
  const history = useHistory();

  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, []);

  const getNewAppointmentButton = () => (
    <Button colorScheme="telegram" my={2} onClick={() => history.push('/')}>
      Create a new appointment
    </Button>
  );

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const appts = await DataStore.query(Appointment);
      setAppointments(appts);
      setIsLoading(false);
    } catch (error) {
      showToast(MY_APPOINTMENT_ERROR_TITLE, '', 'error');
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const appointmentToDelete = await DataStore.query(Appointment, id);
      if (appointmentToDelete) {
        DataStore.delete(appointmentToDelete);
        showToast(DELETE_APPOINTMENT_SUCCESS, '', 'success');
        fetchAppointments();
        return appointmentToDelete;
      }
    } catch (error) {
      showToast(DELETE_APPOINTMENT_ERROR, '', 'error');
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
      {getNewAppointmentButton()}
      {appointments.map((appointment: IAppointment) => (
        <Flex key={appointment.id} p={50} w="full" alignItems="center" justifyContent="center">
          <Box key={appointment.id} mx="auto" px={8} py={4} borderRadius="lg" boxShadow="lg" bg="white" w="2xl">
            <Flex justifyContent="space-between" alignItems="center">
              <chakra.span fontSize="sm" color="gray.600">
                {format(new Date(appointment.date), "PPPPpp")}
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
                Delete
              </Button>
            </Flex>

            <Box mt={2}>
              <Text fontSize="2xl" color="gray.700" fontWeight="700" mb={2}>
                Thème : {appointment.theme.toLowerCase()}
              </Text>
              <Text fontSize="l" color="gray.700" fontWeight="500" mb={6}>
                Sous-thème : {appointment.subTheme.toLowerCase()}
              </Text>
              <Text fontSize="m" color="gray.700" as="i">
                Question : {appointment.precision}
              </Text>
            </Box>
          </Box>
        </Flex>
      ))}
    </Flex>
  ) : (
    <Flex direction="column" alignItems="center" justifyContent="center" padding={4}>
      {getNewAppointmentButton()}
      <Text fontSize="xl" fontWeight="700" textAlign="center">
        You don't have any appointment yet. You can create a new one.
      </Text>
    </Flex>
  );
};

export default MyAppointmentsPage;
