import React, { useEffect, useState } from 'react';
import {
  AlertStatus,
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { AiOutlinePhone as PhoneIcon } from 'react-icons/ai';
import { hourOptions, themesAndSubthemes } from '../data';

import { DataStore } from '@aws-amplify/datastore';
import { Appointment } from '../models';
import { formSchema } from '../utils/validationSchema/formSchema';
import { IAppointment } from '../types';

const initialValues: IAppointment = {
  id: '',
  theme: '',
  subTheme: '',
  closedRequest: '',
  requestId: '',
  contactPreference: '',
  otherLinePhoneNumber: '',
  precision: '',
  hour: '',
};

const APPOINTMENT_TITLE = 'Rendez-vous';
const APPOINTMENT_CREATE_SUCCESS = 'Votre rendez-vous a été créé avec succès';
const APPOINTMENT_CREATE_ERROR = 'Erreur lors de la création du rendez-vous';

const HomePage = () => {
  const toast = useToast();

  const [closedRequest, setClosedRequest] = useState<string>('');
  const [contactPreference, setContactPreference] = useState<string>('');
  const [hour, setHour] = useState<string>('');
  const [themes, setThemes] = useState<string[]>([]);
  const [subThemes, setSubThemes] = useState<any[]>([]);
  const [theme, setTheme] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (themesAndSubthemes) {
      const themesData = Object.entries(themesAndSubthemes).map(
        (theme: any) => theme[0]
      );
      setThemes(themesData);
    }

    if (theme) {
      const subThemesData = Object.entries(themesAndSubthemes).filter(
        (subTheme: any) => subTheme[0] === theme
      );

      if (subThemesData) {
        setSubThemes(subThemesData[0][1]);
      }
    } else {
      setSubThemes([]);
    }
  }, [theme]);

  const handleChangeSubTheme = (theme: string) => {
    setTheme(theme.toUpperCase());
  };

  const handleSubmit = async (values: IAppointment) => {
    try {
      setIsSubmitting(true);
      const appointment = { ...values };
      const newAppointment = await DataStore.save(new Appointment(appointment));

      showToast(APPOINTMENT_TITLE, APPOINTMENT_CREATE_SUCCESS, 'success');
      setIsSubmitting(false);
      return newAppointment;
    } catch (error) {
      showToast(APPOINTMENT_TITLE, APPOINTMENT_CREATE_ERROR, 'error');
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

  return (
    <Container maxW='6xl' my={4}>
      <Flex direction='column'>
        <Box mb={8}>
          <Center>
            <Text
              bgGradient='linear(to-l, #7928CA,#FF0080)'
              bgClip='text'
              fontSize='2xl'
              fontWeight='extrabold'
            >
              Prenez un rendez-vous téléphonique au Click et Kiosque RH
            </Text>
          </Center>
          <Center>
            <Text color='gray.500' fontWeight='bold'>
              Les experts de l'administration et de la paie vous répondent
            </Text>
          </Center>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={(values, actions) => {
            handleSubmit(values);
          }}
        >
          {({ isValid, setFieldValue }) => (
            <Form>
              <HStack mb={8}>
                <Field name='theme'>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.theme && form.touched.theme}
                    >
                      <FormLabel htmlFor='theme'>
                        Thème de votre question
                      </FormLabel>
                      <Select
                        {...field}
                        name='theme'
                        placeholder='---'
                        onChange={(e: any) => {
                          const { value } = e.target;
                          handleChangeSubTheme(value);
                          setFieldValue('theme', value);
                        }}
                      >
                        {themes &&
                          themes.map((theme: any) => (
                            <option key={theme} value={theme}>
                              {theme.toLowerCase()}
                            </option>
                          ))}
                      </Select>
                      <FormErrorMessage>{form.errors.theme}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='subTheme'>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.subTheme && form.touched.subTheme}
                    >
                      <FormLabel htmlFor='subTheme'>
                        Sous thème de votre question
                      </FormLabel>
                      <Select {...field} name='subTheme' placeholder='---'>
                        {subThemes &&
                          subThemes.map((subTheme: any) => (
                            <option key={subTheme.id} value={subTheme.subTheme}>
                              {subTheme.subTheme.toLowerCase()}
                            </option>
                          ))}
                      </Select>
                      <FormErrorMessage>
                        {form.errors.subTheme}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </HStack>

              <Stack align='center' mb={8}>
                <Field name='closedRequest'>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={
                        form.errors.closedRequest && form.touched.closedRequest
                      }
                    >
                      <FormLabel>
                        Votre question concerne-t-elle une demande RH en cours
                        ou cloturée ?
                      </FormLabel>
                      <RadioGroup
                        {...field}
                        name='closedRequest'
                        onChange={(request: string) => {
                          setClosedRequest(request);
                          setFieldValue('closedRequest', request);
                          setFieldValue('requestId', '');
                        }}
                      >
                        <HStack>
                          <Radio
                            value='Non'
                            isChecked={'Non' === closedRequest}
                          >
                            Non
                          </Radio>
                          <Radio
                            value='Oui'
                            isChecked={'Oui' === closedRequest}
                          >
                            Oui
                          </Radio>
                          <Box width='40%'>
                            <Field name='requestId'>
                              {({ field, form }: any) => (
                                <FormControl
                                  isInvalid={
                                    form.errors.requestId &&
                                    form.touched.requestId
                                  }
                                >
                                  <Input
                                    {...field}
                                    type='text'
                                    placeholder='Préciser le n° de la demande'
                                    isDisabled={closedRequest !== 'Oui'}
                                  />
                                  <FormErrorMessage>
                                    {form.errors.requestId}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                          </Box>
                        </HStack>
                      </RadioGroup>

                      <FormHelperText>
                        Vous pouvez retrouver le numéro de votre demande RH
                        depuis le portail RH, dans la rubrique mes demandes.
                      </FormHelperText>
                      <FormErrorMessage>
                        {form.errors.closedRequest}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Stack>

              <Stack mb={8}>
                <Field name='contactPreference'>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={
                        form.errors.contactPreference &&
                        form.touched.contactPreference
                      }
                    >
                      <FormLabel>Votre souhaitez être contacté sur :</FormLabel>
                      <RadioGroup
                        {...field}
                        name='contactPreference'
                        onChange={(contact: string) => {
                          setContactPreference(contact);
                          setFieldValue('contactPreference', contact);
                          setFieldValue('otherLinePhoneNumber', '');
                        }}
                      >
                        <HStack>
                          <Radio
                            value='proLine'
                            isChecked={'proLine' === contactPreference}
                          >
                            Votre ligne professionnelle
                          </Radio>
                          <Radio
                            value='otherLine'
                            isChecked={'otherLine' === contactPreference}
                          >
                            Une autre ligne
                          </Radio>
                          <Field name='otherLinePhoneNumber'>
                            {({ field, form }: any) => (
                              <FormControl
                                isInvalid={
                                  form.errors.otherLinePhoneNumber &&
                                  form.touched.otherLinePhoneNumber
                                }
                              >
                                <InputGroup width='30%'>
                                  <InputLeftElement
                                    pointerEvents='none'
                                    children={<PhoneIcon color='gray.300' />}
                                  />
                                  <Input
                                    {...field}
                                    type='tel'
                                    placeholder='XX XX XX XX XX'
                                    isDisabled={
                                      contactPreference !== 'otherLine'
                                    }
                                  />
                                </InputGroup>
                                <FormErrorMessage>
                                  {form.errors.otherLinePhoneNumber}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </HStack>
                      </RadioGroup>
                      <FormHelperText>
                        Le jour du rendez-vous, vous serez contacté sur cette
                        ligne par l'expert RH en charge de votre demande.
                      </FormHelperText>
                      <FormErrorMessage>
                        {form.errors.contactPreference}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Stack>

              <Stack mb={8}>
                <Field name='precision'>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={
                        form.errors.precision && form.touched.precision
                      }
                    >
                      <FormLabel htmlFor='precision'>
                        Merci de préciser votre question :
                      </FormLabel>
                      <Textarea {...field} name='precision' />
                      <FormErrorMessage>
                        {form.errors.precision}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Stack>

              <Stack mb={8}>
                <Field name='hour'>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.hour && form.touched.hour}
                    >
                      <FormLabel htmlFor='hour'>
                        Choisissez votre créneau :
                      </FormLabel>
                      <RadioGroup
                        {...field}
                        name='hour'
                        onChange={(hourValue: string) => {
                          setHour(hourValue);
                          setFieldValue('hour', hourValue);
                        }}
                      >
                        <HStack spacing={4} direction='column'>
                          {hourOptions.map((value, index) => {
                            return (
                              <Radio
                                key={index}
                                value={value}
                                isChecked={value === hour}
                              >
                                {value}
                              </Radio>
                            );
                          })}
                        </HStack>
                      </RadioGroup>
                      <FormErrorMessage>{form.errors.hour}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Stack>

              <Button
                type='submit'
                colorScheme='blue'
                isLoading={isSubmitting}
                isDisabled={!isValid}
              >
                Prendre rendez-vous
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </Container>
  );
};

export default HomePage;
