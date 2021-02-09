import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import {
  AlertStatus,
  Box,
  Button,
  chakra,
  Flex,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Appointment } from '../models';
import { IAppointment } from '../types';
import SkeletonCard from '../components/SkeletonCard';
import {
  DELETE_APPOINTMENT_ERROR,
  DELETE_APPOINTMENT_SUCCESS,
  MY_APPOINTMENT_ERROR_TITLE,
} from '../constants';

const MyAppointmentsPage = () => {
  const toast = useToast();
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, []);

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

  const showToast = (
    title: string,
    description: string,
    status: AlertStatus
  ) => {
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

  return (
    <Box>
      {appointments.map((appointment: IAppointment) => (
        <Flex p={50} w='full' alignItems='center' justifyContent='center'>
          <Box
            key={appointment.id}
            mx='auto'
            px={8}
            py={4}
            borderRadius='lg'
            boxShadow='lg'
            bg='white'
            w='2xl'
          >
            <Flex justifyContent='space-between' alignItems='center'>
              <chakra.span fontSize='sm' color='gray.600'>
                {appointment.hour}
              </chakra.span>
              <Button
                size='sm'
                bg='red.600'
                color='white'
                fontSize='sm'
                fontWeight='700'
                borderRadius='md'
                _hover={{ bg: 'red.500' }}
                onClick={() => handleDelete(appointment.id)}
              >
                Delete
              </Button>
            </Flex>

            <Box mt={2}>
              <Text href='#' fontSize='2xl' color='gray.700' fontWeight='700'>
                Sujet du rendez-vous: {appointment.theme.toLowerCase()}
              </Text>
              <chakra.p mt={2} color='gray.600'>
                {appointment.subTheme.toLowerCase()}
              </chakra.p>
            </Box>
          </Box>
        </Flex>
      ))}
    </Box>
  );
};

export default MyAppointmentsPage;
